import "server-only";
import { getBetterAuthBaseURL } from "@/lib/auth-config";
import type { AuthenticatedSessionResponse } from "@/types/auth";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseAuthSession(value: unknown): AuthenticatedSessionResponse | null {
  if (!isRecord(value) || !isRecord(value.user) || !isRecord(value.session)) {
    return null;
  }

  const { user, session } = value;
  if (
    typeof user.id !== "string" ||
    typeof user.name !== "string" ||
    typeof user.email !== "string" ||
    typeof user.emailVerified !== "boolean" ||
    (user.image !== null && user.image !== undefined && typeof user.image !== "string") ||
    typeof session.id !== "string" ||
    typeof session.createdAt !== "string" ||
    typeof session.updatedAt !== "string" ||
    typeof session.expiresAt !== "string"
  ) {
    return null;
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: typeof user.image === "string" ? user.image : null,
    },
    session: {
      id: session.id,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      expiresAt: session.expiresAt,
    },
  };
}

/**
 * Validates the incoming Better Auth cookie with the server's protected
 * /api/auth/me endpoint. The cookie is forwarded unchanged; no cookie name or
 * session format is reimplemented in the frontend.
 */
export async function validateAuthSession(cookieHeader: string) {
  const baseURL = getBetterAuthBaseURL();
  if (!baseURL || !cookieHeader.trim()) return null;

  try {
    const response = await fetch(new URL("/api/auth/me", baseURL), {
      headers: {
        accept: "application/json",
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;
    return parseAuthSession(await response.json());
  } catch {
    return null;
  }
}
