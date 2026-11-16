import type { EventPreview } from "@/types";

/**
 * PREVIEW DATA ONLY.
 * These are sample events used to design the homepage layout. They are not real,
 * registered events. Replace with data from the events API in a later phase.
 */
export const previewEvents: EventPreview[] = [
  {
    id: "preview-mirpur-plantation",
    title: "Neighbourhood Tree Plantation",
    category: "tree-plantation",
    summary:
      "Plant native saplings along a residential street with neighbours and local volunteers.",
    area: "Mirpur",
    city: "Dhaka",
    startsAt: "2026-11-27T08:00:00+06:00",
    endsAt: "2026-11-27T11:00:00+06:00",
    image: {
      src: "/images/events/tree-plantation.jpg",
      alt: "Volunteers planting saplings together; illustrative community photo",
      objectPosition: "50% 48%",
      credit: "Press Information Dept. · Bangladesh",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Aminul_Haque_planting_tree_saplings_with_students_at_Mirpur_Bangla_School_and_College_in_Dhaka,_2026-08-16.jpg",
      license: "Public domain",
    },
  },
  {
    id: "preview-savar-cleanup",
    title: "Riverside Clean-up Morning",
    category: "cleanup",
    summary:
      "Help clear plastic and household waste from a riverbank and sort it for recycling.",
    area: "Savar",
    city: "Dhaka",
    startsAt: "2026-12-04T07:30:00+06:00",
    endsAt: "2026-12-04T10:30:00+06:00",
    image: {
      src: "/images/events/cleanup.jpg",
      alt: "Volunteers cleaning a canal; illustrative community photo",
      objectPosition: "50% 50%",
      credit: "Press Information Dept. · Bangladesh",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Rampura_Jirani_Canal_Cleaning_Campaign_Dhaka_2024-11-01_(PID-0005503).jpg",
      license: "Public domain",
    },
  },
  {
    id: "preview-mohammadpur-reading",
    title: "Weekend Reading Circle for Children",
    category: "education",
    summary:
      "Read aloud and share stories with children from the neighbourhood in a relaxed group setting.",
    area: "Mohammadpur",
    city: "Dhaka",
    startsAt: "2026-12-05T10:00:00+06:00",
    endsAt: "2026-12-05T12:00:00+06:00",
    image: {
      src: "/images/events/community-support.jpg",
      alt: "Community participants gathered together; illustrative photo",
      objectPosition: "50% 50%",
      credit: "Md. Joni Hossain",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:A_group_of_Participants_at_Wikipedia_25_events_in_Dhaka_(2).jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  },
  {
    id: "preview-patenga-coastal",
    title: "Coastal Clean-up and Mangrove Care",
    category: "coastal",
    summary:
      "Spend a morning caring for the shoreline by collecting litter and tending young mangroves.",
    area: "Patenga",
    city: "Chattogram",
    startsAt: "2026-12-11T08:00:00+06:00",
    endsAt: "2026-12-11T11:30:00+06:00",
    image: {
      src: "/images/events/sundarbans-mangrove.jpg",
      alt: "Mangrove forest at sunset in the Sundarbans, Bangladesh",
      objectPosition: "50% 50%",
      credit: "Hiroki Ogawa",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Sunset_Mangrove_Forest_Katka_Sundarban_National_Park_Bangladesh_-_panoramio.jpg",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    },
  },
  {
    id: "preview-sylhet-health",
    title: "Community Health Awareness Day",
    category: "health",
    summary:
      "Support a neighbourhood awareness day with simple, practical health information for families.",
    area: "Sylhet city",
    city: "Sylhet",
    startsAt: "2026-12-12T09:30:00+06:00",
    endsAt: "2026-12-12T13:00:00+06:00",
    image: {
      src: "/images/events/blood-donation.jpg",
      alt: "A community blood donation event; illustrative health-awareness photo",
      objectPosition: "50% 50%",
      credit: "Press Information Dept. · Bangladesh",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Bangladesh_National_Museum_Blood_Donation_Program,_Dhaka,_2022-08-31_(PID-0021388).jpg",
      license: "Public domain",
    },
  },
  {
    id: "preview-khulna-gardening",
    title: "Rooftop and Balcony Gardening Workshop",
    category: "urban-gardening",
    summary:
      "Learn to grow vegetables and herbs in small urban spaces, and share cuttings with neighbours.",
    area: "Khulna city",
    city: "Khulna",
    startsAt: "2026-12-18T10:00:00+06:00",
    endsAt: "2026-12-18T12:30:00+06:00",
    image: {
      src: "/images/events/rooftop-tomato-garden.jpg",
      alt: "Tomatoes growing in a rooftop garden in Rangpur, Bangladesh",
      objectPosition: "50% 50%",
      credit: "Nature of Mostakim",
      creditUrl:
        "https://commons.wikimedia.org/wiki/File:Rooftop_tomato_cultivation_in_Rangpur,_Bangladesh.jpg",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
  },
];
