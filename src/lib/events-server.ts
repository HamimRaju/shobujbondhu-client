import "server-only";

import { getBetterAuthBaseURL } from "@/lib/auth-config";
import {
  managedEventCategories,
  type CommunityEvent,
} from "@/types/managed-event";

export type EventQueryResult<T> = {
  data: T | null;
  error: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseCommunityEvent(value: unknown): CommunityEvent {
  if (
    !isRecord(value) ||
    typeof value._id !== "string" ||
    !/^[a-f\d]{24}$/i.test(value._id) ||
    typeof value.title !== "string" ||
    typeof value.description !== "string" ||
    typeof value.category !== "string" ||
    !managedEventCategories.includes(value.category as CommunityEvent["category"]) ||
    typeof value.imageUrl !== "string" ||
    typeof value.location !== "string" ||
    typeof value.eventDate !== "string" ||
    !Number.isFinite(Date.parse(value.eventDate)) ||
    typeof value.eventTime !== "string" ||
    !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value.eventTime) ||
    typeof value.startsAt !== "string" ||
    !Number.isFinite(Date.parse(value.startsAt)) ||
    typeof value.isUpcoming !== "boolean"
  ) {
    throw new Error("INVALID_EVENT_RESPONSE");
  }

  return {
    _id: value._id,
    title: value.title,
    description: value.description,
    category: value.category as CommunityEvent["category"],
    imageUrl: value.imageUrl,
    location: value.location,
    eventDate: value.eventDate,
    eventTime: value.eventTime,
    startsAt: value.startsAt,
    isUpcoming: value.isUpcoming,
  };
}

async function requestEventAPI(path: string): Promise<unknown> {
  const baseURL = getBetterAuthBaseURL();
  if (!baseURL) {
    throw new Error("EVENT_SERVICE_NOT_CONFIGURED");
  }

  const response = await fetch(new URL(path, baseURL), {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`EVENT_SERVICE_${response.status}`);
  return response.json();
}

export async function getUpcomingCommunityEvents(
  limit?: number,
): Promise<EventQueryResult<CommunityEvent[]>> {
  try {
    const suffix = limit === undefined ? "" : `?limit=${limit}`;
    const payload = await requestEventAPI(`/api/events/upcoming${suffix}`);
    const events =
      isRecord(payload) && isRecord(payload.data) && Array.isArray(payload.data.events)
        ? payload.data.events.map(parseCommunityEvent)
        : null;

    if (!events) throw new Error("INVALID_EVENTS_RESPONSE");
    return { data: events, error: null };
  } catch {
    return {
      data: null,
      error: "We couldn’t load community events right now. Please try again shortly.",
    };
  }
}

export async function getCommunityEventById(
  id: string,
): Promise<EventQueryResult<CommunityEvent>> {
  if (!/^[a-f\d]{24}$/i.test(id)) return { data: null, error: null };

  try {
    const payload = await requestEventAPI(`/api/events/${encodeURIComponent(id)}`);
    const event =
      isRecord(payload) && isRecord(payload.data) && "event" in payload.data
        ? parseCommunityEvent(payload.data.event)
        : null;
    if (!event) throw new Error("INVALID_EVENT_RESPONSE");
    return { data: event, error: null };
  } catch (error) {
    const unavailable = error instanceof Error && error.message === "EVENT_SERVICE_404";
    return {
      data: null,
      error: unavailable
        ? null
        : "We couldn’t load this event right now. Please try again shortly.",
    };
  }
}
