export const managedEventCategories = [
  "Tree Plantation",
  "Cleanup",
  "Blood Donation",
  "Food Distribution",
  "Winter Donation",
  "Community Support",
] as const;

export type ManagedEventCategory = (typeof managedEventCategories)[number];

/** Event shape returned by the backend's eventResponse serializer. */
export type ManagedEvent = {
  _id: string;
  title: string;
  description: string;
  category: ManagedEventCategory;
  imageUrl: string;
  location: string;
  /** Serialized MongoDB Date, stored as midnight UTC by the API. */
  eventDate: string;
  /** Local event time in HH:mm format. */
  eventTime: string;
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
