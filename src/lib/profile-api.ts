import { authServerURL } from "@/lib/auth-client";
import type {
  ProfileDTO,
  ProfileFieldErrors,
  UpdateProfileInput,
} from "@/types/profile";

type ApiErrorDetail = {
  path: string;
  message: string;
};

export class ProfileApiError extends Error {
  status: number;
  code?: string;
  details?: ApiErrorDetail[];

  constructor(
    message: string,
    status: number,
    code?: string,
    details?: ApiErrorDetail[],
  ) {
    super(message);
    this.name = "ProfileApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseProfile(payload: unknown): ProfileDTO {
  const data = isRecord(payload) && isRecord(payload.data) ? payload.data : null;
  const profile =
    data && isRecord(data.profile) ? data.profile : null;

  if (
    !profile ||
    typeof profile.name !== "string" ||
    typeof profile.email !== "string" ||
    (profile.image !== null && typeof profile.image !== "string") ||
    (profile.createdAt !== null &&
      (typeof profile.createdAt !== "string" ||
        !Number.isFinite(Date.parse(profile.createdAt))))
  ) {
    throw new ProfileApiError(
      "The profile service returned an unexpected response.",
      200,
      "INVALID_PROFILE_RESPONSE",
    );
  }

  return {
    name: profile.name,
    email: profile.email,
    image: profile.image,
    createdAt: profile.createdAt,
  };
}

function parseApiError(payload: unknown, status: number) {
  const error = isRecord(payload) && isRecord(payload.error) ? payload.error : null;
  const details = Array.isArray(error?.details)
    ? error.details.flatMap((detail) =>
        isRecord(detail) &&
        typeof detail.path === "string" &&
        typeof detail.message === "string"
          ? [{ path: detail.path, message: detail.message }]
          : [],
      )
    : undefined;

  return new ProfileApiError(
    typeof error?.message === "string"
      ? error.message
      : "The profile service could not complete your request.",
    status,
    typeof error?.code === "string" ? error.code : undefined,
    details,
  );
}

async function requestProfile(
  method: "GET" | "PATCH",
  body?: UpdateProfileInput,
) {
  if (!authServerURL) {
    throw new ProfileApiError(
      "Profile services are not configured. Set NEXT_PUBLIC_BETTER_AUTH_URL to your server origin.",
      0,
      "PROFILE_API_NOT_CONFIGURED",
    );
  }

  let response: Response;
  try {
    response = await fetch(new URL("/api/profile", authServerURL), {
      method,
      cache: "no-store",
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new ProfileApiError(
      "The profile service could not be reached. Check your connection and try again.",
      0,
      "PROFILE_SERVICE_UNAVAILABLE",
    );
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) throw parseApiError(payload, response.status);
  return parseProfile(payload);
}

export function getCurrentProfile() {
  return requestProfile("GET");
}

export function updateCurrentProfile(input: UpdateProfileInput) {
  // Keep the request body limited to fields accepted by updateProfileSchema.
  return requestProfile("PATCH", {
    name: input.name,
    image: input.image,
  });
}

export function validateProfileInput(input: UpdateProfileInput): ProfileFieldErrors {
  const errors: ProfileFieldErrors = {};

  if (!input.name.trim()) {
    errors.name = "Enter your full name.";
  } else if (input.name.trim().length > 120) {
    errors.name = "Your name must be 120 characters or fewer.";
  }

  if (input.image !== null && input.image.trim()) {
    try {
      const url = new URL(input.image.trim());
      if (
        (url.protocol !== "http:" && url.protocol !== "https:") ||
        !url.hostname ||
        url.username ||
        url.password
      ) {
        errors.image = "Enter a public image URL using HTTP or HTTPS.";
      }
    } catch {
      errors.image = "Enter a valid image URL using HTTP or HTTPS.";
    }
  }

  return errors;
}

export function isProfileUnauthorized(error: unknown) {
  return error instanceof ProfileApiError && error.status === 401;
}

export function getProfileErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (!(error instanceof ProfileApiError)) {
    return error instanceof Error && error.message ? error.message : fallback;
  }
  if (error.status === 401) return "Your session has expired. Please sign in again.";
  if (error.status === 403) return "You do not have permission to update this profile.";
  if (error.status === 404) return "Your profile could not be found.";
  if (error.status >= 500) return "The profile service is having trouble. Please try again.";
  return error.message || fallback;
}

export function getProfileFieldErrors(error: unknown): ProfileFieldErrors {
  if (!(error instanceof ProfileApiError) || !error.details) return {};
  const fieldErrors: ProfileFieldErrors = {};
  for (const detail of error.details) {
    if ((detail.path === "name" || detail.path === "image") && detail.message) {
      fieldErrors[detail.path] = detail.message;
    }
  }
  return fieldErrors;
}
