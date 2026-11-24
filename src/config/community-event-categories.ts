import {
  Droplets,
  HeartHandshake,
  Recycle,
  TreePine,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { PhotoTone } from "@/types";
import type { ManagedEventCategory } from "@/types/managed-event";

export const communityEventCategories: Record<
  ManagedEventCategory,
  { label: string; icon: LucideIcon; tone: PhotoTone }
> = {
  "Tree Plantation": { label: "Tree Plantation", icon: TreePine, tone: "forest" },
  Cleanup: { label: "Cleanup", icon: Recycle, tone: "sage" },
  "Blood Donation": { label: "Blood Donation", icon: Droplets, tone: "amber" },
  "Food Distribution": { label: "Food Distribution", icon: Utensils, tone: "ivory" },
  "Winter Donation": { label: "Winter Donation", icon: HeartHandshake, tone: "amber" },
  "Community Support": { label: "Community Support", icon: HeartHandshake, tone: "sage" },
};

export const communityEventCategoryOptions: Array<{
  value: "all" | ManagedEventCategory;
  label: string;
}> = [
  { value: "all", label: "All Events" },
  ...Object.entries(communityEventCategories).map(([value, { label }]) => ({
    value: value as ManagedEventCategory,
    label,
  })),
];
