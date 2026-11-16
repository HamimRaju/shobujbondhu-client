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
 * Home/gallery photographs live in /public/images/home/. Check ATTRIBUTION.md
 * before replacing these photos; only use images with compatible licenses.
 * Fill `credit` for any photo that needs attribution.
 * Only use photos you own or have permission to use.
 */
export const heroMedia: { main: SiteImage; secondary: SiteImage } = {
  main: {
    src: "/images/home/hero-planting.jpg",
    alt: "Volunteers planting young trees together in a field",
    objectPosition: "50% 50%",
  },
  secondary: {
    src: "/images/home/hero-coast-care.jpg",
    alt: "Volunteers collecting debris from a beach",
    objectPosition: "50% 50%",
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
    image: {
      src: "/images/home/gallery-neighborhood-planting.jpg",
      alt: "A community leader planting a lemon tree with neighbours in Kalibari, Bangladesh",
      objectPosition: "50% 50%",
      credit: "SuSanA Secretariat",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Community_leader_helps_plant_a_lemon_tree_using_used_toilet_bag_as_fertilizer_(3683082357).jpg",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
  },
  {
    id: "riverbank",
    caption: "Riverbank clean-up mornings",
    tone: "sage",
    icon: Recycle,
    image: {
      src: "/images/home/gallery-river-cleanup.jpg",
      alt: "A child picking plastic bottles from the bank of the River Benue",
      objectPosition: "50% 50%",
      credit: "Ummigarba",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Cleaning_the_rivers.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  },
  {
    id: "reading",
    caption: "Reading circles for children",
    tone: "amber",
    icon: BookOpen,
    image: {
      src: "/images/home/gallery-reading-circle.jpg",
      alt: "Children learning together in a classroom at International Bangladesh Hope School",
      objectPosition: "50% 50%",
      credit: "Jubair1985",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Class_Room_International_Bangladesh_Hope_School.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  },
  {
    id: "coast",
    caption: "Caring for the coastline",
    tone: "ivory",
    icon: Waves,
    image: {
      src: "/images/home/gallery-coastline.jpg",
      alt: "Volunteers collecting debris from a beach at Cape Hatteras National Seashore",
      objectPosition: "50% 50%",
      credit: "Cape Hatteras National Seashore",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Volunteers_participate_in_beach_debris_cleanup.jpg",
      license: "Public domain",
    },
  },
  {
    id: "gardens",
    caption: "Shared gardens and rooftops",
    tone: "sage",
    icon: Sprout,
    image: {
      src: "/images/home/gallery-rooftop-garden.jpg",
      alt: "A rooftop garden filled with rows of potted plants in Bangladesh",
      objectPosition: "50% 50%",
      credit: "Prititunna",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Rooftop_garden_in_Bangladesh.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  },
  {
    id: "teams",
    caption: "Neighbours working side by side",
    tone: "forest",
    icon: Users,
    image: {
      src: "/images/home/gallery-volunteer-team.jpg",
      alt: "Community members working together on a tree-growing project in Mymensingh, Bangladesh",
      objectPosition: "50% 50%",
      credit: "SuSanA Secretariat",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Members_of_Kalibari_community_and_Mymensingh_Pourashava_help_with_demo_plot_(3683094837).jpg",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
  },
];
