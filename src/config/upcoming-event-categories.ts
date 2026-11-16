import {
  Droplets,
  HeartHandshake,
  Recycle,
  TreePine,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { UpcomingEventCategory } from "@/types/upcoming-event";
import type { PhotoTone } from "@/types";

export const eventCategoryOptions: {
  value: "all" | UpcomingEventCategory;
  label: string;
}[] = [
  { value: "all", label: "All Events" },
  { value: "tree-plantation", label: "Tree Plantation" },
  { value: "cleanup", label: "Cleanup" },
  { value: "blood-donation", label: "Blood Donation" },
  { value: "food-distribution", label: "Food Distribution" },
  { value: "winter-donation", label: "Winter Donation" },
  { value: "community-support", label: "Community Support" },
];

export const upcomingEventCategories: Record<
  UpcomingEventCategory,
  { label: string; icon: LucideIcon; tone: PhotoTone }
> = {
  "tree-plantation": {
    label: "Tree Plantation",
    icon: TreePine,
    tone: "forest",
  },
  cleanup: { label: "Cleanup", icon: Recycle, tone: "sage" },
  "blood-donation": {
    label: "Blood Donation",
    icon: Droplets,
    tone: "amber",
  },
  "food-distribution": {
    label: "Food Distribution",
    icon: Utensils,
    tone: "ivory",
  },
  "winter-donation": {
    label: "Winter Donation",
    icon: HeartHandshake,
    tone: "amber",
  },
  "community-support": {
    label: "Community Support",
    icon: HeartHandshake,
    tone: "sage",
  },
};
