export const managedEventCategories = [
  "Tree Plantation",
  "Cleanup",
  "Blood Donation",
  "Food Distribution",
  "Winter Donation",
  "Community Support",
] as const;

export type ManagedEventCategory = (typeof managedEventCategories)[number];

/** Public event fields; never contains owner email or internal user identifiers. */
export type CommunityEvent = {
  _id: string;
  title: string;
  description: string;
  category: ManagedEventCategory;
  imageUrl: string;
  location: string;
  /** Serialized MongoDB Date, stored as midnight UTC by the API. */
  eventDate: string;
  /** Local event time in HH:mm format (Bangladesh time). */
  eventTime: string;
  /** Absolute ISO start instant derived from eventDate and eventTime. */
  startsAt: string;
  isUpcoming: boolean;
};

/** Private event shape returned by the authenticated owner endpoint. */
export type ManagedEvent = CommunityEvent & {
  createdBy: string;
  createdById?: string;
  createdAt: string;
  updatedAt: string;
};

export type ManagedEventFormValues = {
  title: string;
  description: string;
  category: ManagedEventCategory;
  imageUrl: string;
  location: string;
  eventDate: string;
  eventTime: string;
};

export type JoinedCommunityEvent = {
  joinedAt: string;
  event: Omit<CommunityEvent, "isUpcoming">;
};
