import { authClient, authServerURL } from "@/lib/auth-client";
import {
  getEventStartsAt,
  getTomorrowInBangladesh,
} from "@/lib/event-datetime";
import {
  managedEventCategories,
  type JoinedCommunityEvent,
  type ManagedEvent,
  type ManagedEventFormValues,
} from "@/types/managed-event";

type ApiErrorDetail = {
  path: string;
  message: string;
};

export class ManagedEventsApiError extends Error {
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
    this.name = "ManagedEventsApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseEvent(value: unknown): ManagedEvent {
  if (
    !isRecord(value) ||
    typeof value._id !== "string" ||
    !/^[a-f\d]{24}$/i.test(value._id) ||
    typeof value.title !== "string" ||
    typeof value.description !== "string" ||
    typeof value.category !== "string" ||
    !managedEventCategories.includes(
      value.category as ManagedEvent["category"],
    ) ||
    typeof value.imageUrl !== "string" ||
    typeof value.location !== "string" ||
    typeof value.eventDate !== "string" ||
    !Number.isFinite(Date.parse(value.eventDate)) ||
    typeof value.eventTime !== "string" ||
    !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value.eventTime) ||
    typeof value.startsAt !== "string" ||
    !Number.isFinite(Date.parse(value.startsAt)) ||
    typeof value.isUpcoming !== "boolean" ||
    typeof value.createdBy !== "string" ||
    (value.createdById !== undefined &&
      typeof value.createdById !== "string") ||
    typeof value.createdAt !== "string" ||
    typeof value.updatedAt !== "string"
  ) {
    throw new ManagedEventsApiError(
      "The event service returned an unexpected event format.",
      200,
      "INVALID_EVENT_RESPONSE",
    );
  }

  return {
    _id: value._id,
    title: value.title,
    description: value.description,
    category: value.category as ManagedEvent["category"],
    imageUrl: value.imageUrl,
    location: value.location,
    eventDate: value.eventDate,
    eventTime: value.eventTime,
    startsAt: value.startsAt,
    isUpcoming: value.isUpcoming,
    createdBy: value.createdBy,
    ...(typeof value.createdById === "string"
      ? { createdById: value.createdById }
      : {}),
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
  };
}

function parseError(payload: unknown, status: number) {
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

  return new ManagedEventsApiError(
    typeof error?.message === "string"
      ? error.message
      : typeof payload === "object" &&
          payload !== null &&
          "message" in payload &&
          typeof payload.message === "string"
        ? payload.message
        : "The event service could not complete your request.",
    status,
    typeof error?.code === "string" ? error.code : undefined,
    details,
  );
}

async function getAccessToken() {
  if (!authServerURL) {
    throw new ManagedEventsApiError(
      "Authentication is not configured. Set NEXT_PUBLIC_BETTER_AUTH_URL to your server origin.",
      0,
      "AUTH_NOT_CONFIGURED",
    );
  }

  try {
    const { data, error } = await authClient.token();
    if (error) {
      throw new ManagedEventsApiError(
        error.message || "Your sign-in session could not be verified.",
        error.status,
        "TOKEN_REQUEST_FAILED",
      );
    }
    if (!data?.token) {
      throw new ManagedEventsApiError(
        "A session token was not returned. Please sign in again.",
        401,
        "TOKEN_MISSING",
      );
    }
    return data.token;
  } catch (error) {
    if (error instanceof ManagedEventsApiError) throw error;
    throw new ManagedEventsApiError(
      "The authentication service could not be reached.",
      0,
      "AUTH_SERVICE_UNAVAILABLE",
    );
  }
}

async function requestEventApi(path: string, init: RequestInit = {}) {
  if (!authServerURL) {
    throw new ManagedEventsApiError(
      "Event services are not configured. Set NEXT_PUBLIC_BETTER_AUTH_URL to your server origin.",
      0,
      "API_NOT_CONFIGURED",
    );
  }

  const token = await getAccessToken();
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  if (init.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;
  try {
    response = await fetch(new URL(path, authServerURL), {
      ...init,
      cache: "no-store",
      credentials: "include",
      headers,
    });
  } catch {
    throw new ManagedEventsApiError(
      "The event service could not be reached. Check your connection and try again.",
      0,
      "EVENT_SERVICE_UNAVAILABLE",
    );
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) throw parseError(payload, response.status);
  return payload;
}

export async function getMyManagedEvents(): Promise<ManagedEvent[]> {
  const payload = await requestEventApi("/api/events/my-events");
  if (
    !isRecord(payload) ||
    !isRecord(payload.data) ||
    !Array.isArray(payload.data.events)
  ) {
    throw new ManagedEventsApiError(
      "The event service returned an unexpected events list.",
      200,
      "INVALID_EVENTS_RESPONSE",
    );
  }

  return payload.data.events.map(parseEvent);
}

function parseJoinedEvent(value: unknown): JoinedCommunityEvent {
  if (!isRecord(value) || !isRecord(value.event)) {
    throw new ManagedEventsApiError(
      "The event service returned an unexpected joined event.",
      200,
      "INVALID_JOINED_EVENT_RESPONSE",
    );
  }

  const event = value.event;
  if (
    typeof event._id !== "string" ||
    !/^[a-f\d]{24}$/i.test(event._id) ||
    typeof event.title !== "string" ||
    typeof event.description !== "string" ||
    typeof event.category !== "string" ||
    !managedEventCategories.includes(event.category as ManagedEvent["category"]) ||
    typeof event.imageUrl !== "string" ||
    typeof event.location !== "string" ||
    typeof event.eventDate !== "string" ||
    !Number.isFinite(Date.parse(event.eventDate)) ||
    typeof event.eventTime !== "string" ||
    !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(event.eventTime) ||
    typeof event.startsAt !== "string" ||
    !Number.isFinite(Date.parse(event.startsAt)) ||
    typeof value.joinedAt !== "string" ||
    !Number.isFinite(Date.parse(value.joinedAt))
  ) {
    throw new ManagedEventsApiError(
      "The event service returned an unexpected joined event.",
      200,
      "INVALID_JOINED_EVENT_RESPONSE",
    );
  }

  return {
    joinedAt: value.joinedAt,
    event: {
      _id: event._id,
      title: event.title,
      description: event.description,
      category: event.category as ManagedEvent["category"],
      imageUrl: event.imageUrl,
      location: event.location,
      eventDate: event.eventDate,
      eventTime: event.eventTime,
      startsAt: event.startsAt,
    },
  };
}

export async function createCommunityEvent(
  values: ManagedEventFormValues,
): Promise<ManagedEvent> {
  const payload = await requestEventApi("/api/events", {
    method: "POST",
    body: JSON.stringify(values),
  });
  if (!isRecord(payload) || !isRecord(payload.data) || !("event" in payload.data)) {
    throw new ManagedEventsApiError(
      "The event service returned an unexpected response.",
      200,
      "INVALID_CREATE_RESPONSE",
    );
  }
  return parseEvent(payload.data.event);
}

export async function getJoinedCommunityEvents(): Promise<JoinedCommunityEvent[]> {
  const payload = await requestEventApi("/api/joined-events");
  if (
    !isRecord(payload) ||
    !isRecord(payload.data) ||
    !Array.isArray(payload.data.joinedEvents)
  ) {
    throw new ManagedEventsApiError(
      "The event service returned an unexpected joined events list.",
      200,
      "INVALID_JOINED_EVENTS_RESPONSE",
    );
  }
  return payload.data.joinedEvents.map(parseJoinedEvent);
}

export type EventParticipation = {
  joined: boolean;
  participantCount: number;
  isUpcoming: boolean;
};

export async function getEventParticipation(
  id: string,
): Promise<EventParticipation> {
  const payload = await requestEventApi(
    `/api/events/${encodeURIComponent(id)}/participation`,
  );
  const participation =
    isRecord(payload) && isRecord(payload.data) && isRecord(payload.data.participation)
      ? payload.data.participation
      : null;

  if (
    !participation ||
    typeof participation.joined !== "boolean" ||
    typeof participation.participantCount !== "number" ||
    !Number.isInteger(participation.participantCount) ||
    participation.participantCount < 0 ||
    typeof participation.isUpcoming !== "boolean"
  ) {
    throw new ManagedEventsApiError(
      "The event service returned unexpected participation details.",
      200,
      "INVALID_PARTICIPATION_RESPONSE",
    );
  }

  return {
    joined: participation.joined,
    participantCount: participation.participantCount,
    isUpcoming: participation.isUpcoming,
  };
}

export async function joinCommunityEvent(id: string): Promise<void> {
  await requestEventApi(`/api/events/${encodeURIComponent(id)}/join`, {
    method: "POST",
  });
}

export async function updateManagedEvent(
  id: string,
  values: Partial<ManagedEventFormValues>,
): Promise<ManagedEvent> {
  const payload = await requestEventApi(
    `/api/events/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify(values),
    },
  );

  if (
    !isRecord(payload) ||
    !isRecord(payload.data) ||
    !("event" in payload.data)
  ) {
    throw new ManagedEventsApiError(
      "The event was updated, but the service returned an unexpected response.",
      200,
      "INVALID_UPDATE_RESPONSE",
    );
  }
  return parseEvent(payload.data.event);
}

export async function deleteManagedEvent(id: string): Promise<void> {
  await requestEventApi(`/api/events/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export function isManagedEventsUnauthorized(error: unknown) {
  return (
    error instanceof ManagedEventsApiError &&
    (error.status === 401 || error.code === "TOKEN_MISSING")
  );
}

export function getManagedEventsErrorMessage(
  error: unknown,
  fallback: string,
) {
  if (!(error instanceof ManagedEventsApiError)) {
    return error instanceof Error && error.message ? error.message : fallback;
  }
  if (error.status === 401) return "Your session has expired. Please sign in again.";
  if (error.status === 403) return "You do not have permission to change this event.";
  if (error.status === 404) return "This event could not be found. It may have been removed.";
  if (error.status >= 500) return "The event service is having trouble. Please try again.";
  return error.message || fallback;
}

export function isValidManagedEventImageURL(value: string) {
  if (value.trim().length > 2048) return false;
  try {
    const url = new URL(value.trim());
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      Boolean(url.hostname) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export function validateManagedEventForm(
  values: ManagedEventFormValues,
  original?: ManagedEventFormValues,
) {
  const errors: Partial<Record<keyof ManagedEventFormValues, string>> = {};

  if (!values.title.trim()) errors.title = "Add a title for your event.";
  else if (values.title.trim().length > 120) {
    errors.title = "Keep the title under 120 characters.";
  }

  if (!values.description.trim()) {
    errors.description = "Tell people what this event is about.";
  } else if (values.description.trim().length > 5000) {
    errors.description = "Keep the description under 5,000 characters.";
  }

  if (!managedEventCategories.includes(values.category)) {
    errors.category = "Choose an event category.";
  }

  if (!values.imageUrl.trim()) {
    errors.imageUrl = "Add an image URL for your event.";
  } else if (!isValidManagedEventImageURL(values.imageUrl)) {
    errors.imageUrl = "Enter a valid image URL using HTTP or HTTPS.";
  }

  if (!values.location.trim()) {
    errors.location = "Add a location for your event.";
  } else if (values.location.trim().length > 250) {
    errors.location = "Keep the location under 250 characters.";
  }

  if (!values.eventDate) {
    errors.eventDate = "Choose an event date.";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.eventDate)) {
    errors.eventDate = "Enter a valid event date.";
  } else {
    const [year, month, day] = values.eventDate.split("-").map(Number);
    const parsed = new Date(Date.UTC(year, month - 1, day));
    if (
      parsed.getUTCFullYear() !== year ||
      parsed.getUTCMonth() !== month - 1 ||
      parsed.getUTCDate() !== day
    ) {
      errors.eventDate = "Enter a valid event date.";
    } else if (
      values.eventDate < getTomorrowInBangladesh() &&
      values.eventDate !== original?.eventDate
    ) {
      errors.eventDate = "Choose an event date in the future.";
    }
  }

  if (!values.eventTime) {
    errors.eventTime = "Choose an event time.";
  } else if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(values.eventTime)) {
    errors.eventTime = "Enter a valid event time.";
  }

  if (
    !errors.eventDate &&
    !errors.eventTime &&
    (values.eventDate !== original?.eventDate ||
      values.eventTime !== original?.eventTime) &&
    getEventStartsAt(values.eventDate, values.eventTime).getTime() <= Date.now()
  ) {
    errors.eventTime = "Choose a start time in the future.";
  }

  return errors;
}

export function toManagedEventFormValues(
  event: ManagedEvent,
): ManagedEventFormValues {
  return {
    title: event.title,
    description: event.description,
    category: event.category,
    imageUrl: event.imageUrl,
    location: event.location,
    eventDate: event.eventDate.slice(0, 10),
    eventTime: event.eventTime,
  };
}
