export type UpcomingEventCategory =
  | "tree-plantation"
  | "cleanup"
  | "blood-donation"
  | "food-distribution"
  | "winter-donation"
  | "community-support";

export type UpcomingEvent = {
  id: string;
  title: string;
  category: UpcomingEventCategory;
  /** Short preview text used in the event browser and detail hero. */
  description: string;
  /** Expanded event description for the details page. */
  fullDescription: string;
  area: string;
  city: string;
  /** ISO 8601 date and time with Bangladesh's +06:00 offset. */
  startsAt: string;
  endsAt: string;
  objectives: string[];
  guidelines: string[];
  bring: string[];
  activities: string[];
  organizer: {
    name: string;
    description: string;
  };
  participation: string;
  image: {
    /** Local cover artwork path under /public. */
    src: string | null;
    alt: string;
    objectPosition?: string;
    credit?: string;
    creditUrl?: string;
    license?: string;
    licenseUrl?: string;
  };
};
