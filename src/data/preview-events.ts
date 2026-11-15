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
    image: { src: null, alt: "Volunteers planting saplings in Mirpur" },
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
    image: { src: null, alt: "Volunteers cleaning a riverbank in Savar" },
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
    image: { src: null, alt: "A reading circle for children in Mohammadpur" },
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
    image: { src: null, alt: "Volunteers on the shoreline at Patenga" },
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
    image: { src: null, alt: "A community health awareness event in Sylhet" },
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
    image: { src: null, alt: "A gardening workshop in Khulna" },
  },
];
