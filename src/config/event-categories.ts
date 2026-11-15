import {
  BookOpen,
  Flower2,
  HeartPulse,
  Recycle,
  TreePine,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { EventCategory, PhotoTone } from "@/types";

export const eventCategories: Record<
  EventCategory,
  { label: string; icon: LucideIcon; tone: PhotoTone }
> = {
  "tree-plantation": { label: "Tree planting", icon: TreePine, tone: "forest" },
  cleanup: { label: "Clean-up", icon: Recycle, tone: "sage" },
  education: { label: "Education", icon: BookOpen, tone: "amber" },
  health: { label: "Health", icon: HeartPulse, tone: "ivory" },
  "urban-gardening": { label: "Gardening", icon: Flower2, tone: "sage" },
  coastal: { label: "Coastal care", icon: Waves, tone: "forest" },
};
