import {
  BookOpen,
  Recycle,
  Sprout,
  TreePine,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { PhotoTone, SiteImage } from "@/types";

/**
 * PHOTO SLOTS
 * Add licensed photographs to /public/images/home/ and set `src` below
 * (e.g. "/images/home/hero-main.jpg"). Until then a designed fallback is shown.
 * Fill `credit` for any photo that needs attribution.
 * Only use photos you own or have permission to use.
 */
export const heroMedia: { main: SiteImage; secondary: SiteImage } = {
  main: {
    src: null,
    alt: "Volunteers planting saplings together in a Bangladeshi neighbourhood",
  },
  secondary: {
    src: null,
    alt: "Neighbours sharing tools during a community clean-up",
  },
};

export type GalleryItem = {
  id: string;
  caption: string;
  tone: PhotoTone;
  icon: LucideIcon;
  image: SiteImage;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "planting",
    caption: "Tree planting in the neighbourhood",
    tone: "forest",
    icon: TreePine,
    image: { src: null, alt: "Volunteers planting a sapling" },
  },
  {
    id: "riverbank",
    caption: "Riverbank clean-up mornings",
    tone: "sage",
    icon: Recycle,
    image: { src: null, alt: "Volunteers collecting waste along a riverbank" },
  },
  {
    id: "reading",
    caption: "Reading circles for children",
    tone: "amber",
    icon: BookOpen,
    image: { src: null, alt: "Children reading together with a volunteer" },
  },
  {
    id: "coast",
    caption: "Caring for the coastline",
    tone: "ivory",
    icon: Waves,
    image: { src: null, alt: "Volunteers cleaning a beach" },
  },
  {
    id: "gardens",
    caption: "Shared gardens and rooftops",
    tone: "sage",
    icon: Sprout,
    image: { src: null, alt: "Neighbours tending a community garden" },
  },
  {
    id: "teams",
    caption: "Neighbours working side by side",
    tone: "forest",
    icon: Users,
    image: { src: null, alt: "A volunteer team gathered after an event" },
  },
];
