import type { SiteImage } from "./media";

export type EventCategory =
  | "tree-plantation"
  | "cleanup"
  | "education"
  | "health"
  | "urban-gardening"
  | "coastal";

/** Shape of an event card. Mirrors what the events API is expected to return later. */
export type EventPreview = {
  id: string;
  title: string;
  category: EventCategory;
  summary: string;
  area: string;
  city: string;
  /** ISO 8601 with the Bangladesh offset, e.g. 2026-11-27T08:00:00+06:00 */
  startsAt: string;
  endsAt: string;
  image: SiteImage;
};
