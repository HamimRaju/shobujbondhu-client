import type {
  UpcomingEvent,
  UpcomingEventCategory,
} from "@/types/upcoming-event";

/**
 * Fictional sample listings for the events-page preview.
 * Replace these with API data when event registration is available.
 */
const categoryDetails: Record<
  UpcomingEventCategory,
  Pick<UpcomingEvent, "objectives" | "guidelines" | "bring" | "activities">
> = {
  "tree-plantation": {
    objectives: [
      "Plant native greenery suited to the chosen neighbourhood site.",
      "Share simple after-care tasks so new saplings can be looked after.",
    ],
    guidelines: [
      "Follow the site host's briefing before planting or using tools.",
      "Keep paths clear and leave existing plants and wildlife undisturbed.",
      "These are sample guidelines; a verified organiser would confirm the final plan.",
    ],
    bring: [
      "Comfortable, closed-toe shoes.",
      "A reusable water bottle and sun protection.",
      "Garden gloves, if you already have a pair.",
    ],
    activities: [
      "Meet the group and hear a short site and safety introduction.",
      "Prepare planting spots and plant native saplings together.",
      "Discuss a simple watering and after-care plan for the new trees.",
    ],
  },
  cleanup: {
    objectives: [
      "Tidy a shared public area through a coordinated community clean-up.",
      "Separate recyclable materials where local collection allows.",
    ],
    guidelines: [
      "Stay with the group and use the designated collection area.",
      "Do not handle sharp, hazardous, or unknown materials; alert the coordinator.",
      "These are sample guidelines; a verified organiser would confirm the final plan.",
    ],
    bring: [
      "Closed-toe shoes and comfortable clothing.",
      "A reusable water bottle and sun protection.",
      "Reusable gloves, if available; collection supplies would be confirmed by a host.",
    ],
    activities: [
      "Gather for a location and safety briefing.",
      "Work in small groups to collect and sort ordinary litter.",
      "Bring collected material to the agreed hand-off point and wrap up together.",
    ],
  },
  "blood-donation": {
    objectives: [
      "Offer practical volunteer support at a community donor-day preview.",
      "Help guests find check-in and receive information from qualified staff.",
    ],
    guidelines: [
      "Any donation is subject to screening and guidance from qualified medical staff.",
      "Use only verified medical advice; this sample page is not medical guidance.",
      "Do not share personal or medical information through this preview page.",
    ],
    bring: [
      "No items are required for this fictional preview.",
      "A verified medical organiser would share any event-specific preparation details.",
    ],
    activities: [
      "Welcome guests and direct them to the event check-in.",
      "Let qualified staff explain screening and donation procedures.",
      "Support an orderly close and help guests find post-donation guidance from staff.",
    ],
  },
  "food-distribution": {
    objectives: [
      "Prepare and share a simple meal in a thoughtful neighbourhood setting.",
      "Coordinate packing, serving, and clean-up with local volunteers.",
    ],
    guidelines: [
      "Follow the organiser's food-safety and hand-washing instructions.",
      "Treat guests respectfully and follow the agreed serving process.",
      "These are sample guidelines; a verified organiser would confirm the final plan.",
    ],
    bring: [
      "Comfortable, closed-toe shoes.",
      "A reusable water bottle.",
      "No food donations are being collected for this fictional preview.",
    ],
    activities: [
      "Set up a clean preparation and packing area.",
      "Prepare meal packs and organise a calm, respectful serving flow.",
      "Clean the shared space and sort reusable materials after serving.",
    ],
  },
  "winter-donation": {
    objectives: [
      "Sort clean winter clothing into practical, easy-to-carry bundles.",
      "Plan a respectful hand-off through local community contacts.",
    ],
    guidelines: [
      "A real organiser should confirm which items are useful before anything is collected.",
      "Only clean, safe, and gently used items would be considered for a verified drive.",
      "No donations are being collected through this fictional preview.",
    ],
    bring: [
      "No items are being collected for this sample listing.",
      "A verified organiser would publish a confirmed collection list and drop-off point.",
    ],
    activities: [
      "Review the confirmed collection list with the event host.",
      "Sort and bundle suitable clothing by type and size.",
      "Prepare a clear hand-off plan with local community contacts.",
    ],
  },
  "community-support": {
    objectives: [
      "Help neighbours care for a shared local space.",
      "Exchange practical ideas and build a simple plan for ongoing upkeep.",
    ],
    guidelines: [
      "Choose tasks that are safe and comfortable for you.",
      "Ask before moving personal or community property.",
      "These are sample guidelines; a verified organiser would confirm the final plan.",
    ],
    bring: [
      "Comfortable clothes suited to outdoor activity.",
      "A reusable water bottle and sun protection.",
      "Any gardening tools only if the confirmed organiser requests them.",
    ],
    activities: [
      "Meet neighbours and agree on a few practical tasks.",
      "Tend the shared space together and exchange local knowledge.",
      "Leave the area tidy and note simple next steps for its upkeep.",
    ],
  },
};

const categoryImageCredits: Record<
  UpcomingEventCategory,
  Pick<
    UpcomingEvent["image"],
    "credit" | "creditUrl" | "license" | "licenseUrl"
  >
> = {
  "tree-plantation": {
    credit: "Press Information Dept. · Bangladesh",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Aminul_Haque_planting_tree_saplings_with_students_at_Mirpur_Bangla_School_and_College_in_Dhaka,_2026-08-16.jpg",
    license: "Public domain",
    licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Copyright_rules_by_territory/Bangladesh",
  },
  cleanup: {
    credit: "Press Information Dept. · Bangladesh",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Rampura_Jirani_Canal_Cleaning_Campaign_Dhaka_2024-11-01_(PID-0005503).jpg",
    license: "Public domain",
    licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Copyright_rules_by_territory/Bangladesh",
  },
  "blood-donation": {
    credit: "Press Information Dept. · Bangladesh",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Bangladesh_National_Museum_Blood_Donation_Program,_Dhaka,_2022-08-31_(PID-0021388).jpg",
    license: "Public domain",
    licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Copyright_rules_by_territory/Bangladesh",
  },
  "food-distribution": {
    credit: "Needy Foundation",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Ramadan_Food_Distribution_By_Needy_Foundation_01.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "winter-donation": {
    credit: "Needy Foundation",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:Winter_Clothes_Distribution_Among_Orphans_of_Yatimkhana_of_Bangladesh_by_Needy_Foundation._03.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "community-support": {
    credit: "Md. Joni Hossain",
    creditUrl:
      "https://commons.wikimedia.org/wiki/File:A_group_of_Participants_at_Wikipedia_25_events_in_Dhaka_(2).jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
};

const sampleOrganizer = {
  name: "Host to be confirmed",
  description:
    "These preview listings do not have verified local organisers yet. Host details will be shown once an event is confirmed.",
};

const sampleParticipation =
  "This is a fictional sample listing. Registration is not open and no participation is being recorded.";

const sampleEventSeeds: Omit<
  UpcomingEvent,
  | "objectives"
  | "guidelines"
  | "bring"
  | "activities"
  | "organizer"
  | "participation"
>[] = [
  {
    id: "mirpur-neighbourhood-planting",
    title: "A Greener Morning in Mirpur",
    category: "tree-plantation",
    description:
      "Plant native shade trees around a neighbourhood green space and learn simple after-care tips to help each sapling take root.",
    fullDescription:
      "Spend a morning with neighbours adding native shade trees to a shared green space near Mirpur's National Botanical Garden. The sample plan includes a short introduction to choosing a planting spot, hands-on planting, and a conversation about how nearby residents can help care for the saplings. The exact site and host would be confirmed before a real event.",
    area: "National Botanical Garden, Mirpur",
    city: "Dhaka",
    startsAt: "2026-11-22T08:00:00+06:00",
    endsAt: "2026-11-22T11:00:00+06:00",
    image: {
      src: "/images/events/tree-plantation.jpg",
      alt: "Students and a local organiser planting saplings together in Mirpur, Dhaka; illustrative photo",
      objectPosition: "50% 48%",
    },
  },
  {
    id: "buriganga-bank-cleanup",
    title: "A Cleaner Buriganga Riverside",
    category: "cleanup",
    description:
      "Join a small riverside clean-up, separate recyclable materials, and help leave a busy stretch of the Buriganga tidier than we found it.",
    fullDescription:
      "A sample clean-up morning along the Sadarghat riverfront, focused on ordinary litter and responsible sorting. Volunteers would work in small groups, use a clearly agreed collection point, and avoid handling hazardous materials. A verified local host would confirm the exact meeting point and waste hand-off plan.",
    area: "Sadarghat riverfront",
    city: "Dhaka",
    startsAt: "2026-11-25T07:30:00+06:00",
    endsAt: "2026-11-25T10:30:00+06:00",
    image: {
      src: "/images/events/cleanup.jpg",
      alt: "Young volunteers taking part in a canal clean-up campaign in Dhaka; illustrative photo",
      objectPosition: "50% 50%",
    },
  },
  {
    id: "dhanmondi-blood-donation",
    title: "Dhanmondi Community Blood Drive",
    category: "blood-donation",
    description:
      "Support a local blood-donation drive with volunteer check-in, donor guidance, and refreshments. Donors should meet the organiser's eligibility guidance.",
    fullDescription:
      "This Dhanmondi donor-day preview is centred on non-medical volunteer support such as welcoming guests and helping them find check-in. Any screening, donor eligibility, and donation procedures would be managed by qualified medical staff at a verified event. This page is not medical advice and does not confirm an active blood drive.",
    area: "Dhanmondi 27",
    city: "Dhaka",
    startsAt: "2026-11-28T09:00:00+06:00",
    endsAt: "2026-11-28T14:00:00+06:00",
    image: {
      src: "/images/events/blood-donation.jpg",
      alt: "A blood donation programme at the Bangladesh National Museum in Dhaka; illustrative photo",
      objectPosition: "50% 50%",
    },
  },
  {
    id: "agargaon-shared-meal",
    title: "A Neighbourhood Meal in Agargaon",
    category: "food-distribution",
    description:
      "Help prepare and share a warm midday meal with nearby families. Volunteers can assist with packing, serving, and keeping the community space clean.",
    fullDescription:
      "A neighbourhood meal preview in Agargaon, with sample volunteer tasks spanning clean set-up, meal packing, serving, and tidying the shared space. Any real distribution would need a confirmed local host, food-safety plan, and respectful serving process before it could go ahead.",
    area: "Agargaon",
    city: "Dhaka",
    startsAt: "2026-11-29T10:00:00+06:00",
    endsAt: "2026-11-29T13:00:00+06:00",
    image: {
      src: "/images/events/food-distribution.jpg",
      alt: "A community food distribution in Bangladesh; illustrative photo",
      objectPosition: "50% 50%",
    },
  },
  {
    id: "gaibandha-winter-warmth",
    title: "Winter Warmth for Gaibandha",
    category: "winter-donation",
    description:
      "Sort clean, gently used winter clothing by size and help prepare bundles for distribution through local community contacts.",
    fullDescription:
      "This Gaibandha winter-drive preview shows how volunteers might sort clean seasonal clothing and prepare practical bundles for a local hand-off. No items are being collected through this listing. A verified organiser would first publish the requested items, collection point, and distribution plan.",
    area: "Gaibandha Sadar",
    city: "Gaibandha",
    startsAt: "2026-12-03T09:00:00+06:00",
    endsAt: "2026-12-03T12:00:00+06:00",
    image: {
      src: "/images/events/winter-donation.jpg",
      alt: "A winter clothing distribution hosted by a local Bangladeshi foundation; illustrative photo",
      objectPosition: "50% 50%",
    },
  },
  {
    id: "satkhira-community-garden",
    title: "Growing Together in Satkhira",
    category: "community-support",
    description:
      "Spend a morning helping neighbours prepare a shared growing space, tidy the beds, and exchange practical ideas for keeping it thriving.",
    fullDescription:
      "A shared-space morning in Kaliganj, Satkhira, bringing neighbours together to tend garden beds and talk through simple ways to keep the space cared for. The activities are illustrative; a real host would confirm the site, tools, and any seasonal planting plan.",
    area: "Kaliganj",
    city: "Satkhira",
    startsAt: "2026-12-05T08:30:00+06:00",
    endsAt: "2026-12-05T11:30:00+06:00",
    image: {
      src: "/images/events/community-support.jpg",
      alt: "A group of participants at a community gathering in Dhaka; illustrative photo",
      objectPosition: "50% 50%",
    },
  },
  {
    id: "kuakata-coastal-planting",
    title: "Coastal Greenery in Kuakata",
    category: "tree-plantation",
    description:
      "Work with local volunteers to plant suitable native greenery and learn how careful site selection can support the coastal landscape.",
    fullDescription:
      "A coastal planting preview in Kuakata focused on site-appropriate native greenery and careful after-care. Volunteers would first hear from a local host about the selected area and what planting is suitable there. The exact location and planting plan would need local confirmation before a real event.",
    area: "Kuakata",
    city: "Patuakhali",
    startsAt: "2026-12-06T07:30:00+06:00",
    endsAt: "2026-12-06T10:30:00+06:00",
    image: {
      src: "/images/events/tree-plantation.jpg",
      alt: "Students and a local organiser planting saplings together in Mirpur, Dhaka; illustrative photo",
      objectPosition: "50% 48%",
    },
  },
  {
    id: "chattogram-neighbourhood-cleanup",
    title: "A Fresh Start for a Chattogram Lane",
    category: "cleanup",
    description:
      "Team up with nearby residents to clear litter from a shared lane, sort reusable materials, and make the space more welcoming for everyone.",
    fullDescription:
      "A sample neighbourhood clean-up in Panchlaish, Chattogram. The proposed flow is to agree on a safe shared area, collect ordinary litter as a group, and sort reusable material where local collection supports it. A verified organiser would confirm the route and disposal arrangements.",
    area: "Panchlaish",
    city: "Chattogram",
    startsAt: "2026-12-09T08:00:00+06:00",
    endsAt: "2026-12-09T11:00:00+06:00",
    image: {
      src: "/images/events/cleanup.jpg",
      alt: "Young volunteers taking part in a canal clean-up campaign in Dhaka; illustrative photo",
      objectPosition: "50% 50%",
    },
  },
  {
    id: "bogura-donor-day",
    title: "Give the Gift of a Blood Donation",
    category: "blood-donation",
    description:
      "Lend a hand at a community donor day in Bogura, from welcoming guests to helping donors find their way through the event.",
    fullDescription:
      "This Shibganj donor-day preview describes practical welcome and wayfinding support for a community blood-drive setting. Any medical screening or donation would only take place under qualified medical staff, following their eligibility checks and instructions. The sample listing does not confirm a scheduled or active drive.",
    area: "Shibganj",
    city: "Bogura",
    startsAt: "2026-12-12T09:00:00+06:00",
    endsAt: "2026-12-12T13:30:00+06:00",
    image: {
      src: "/images/events/blood-donation.jpg",
      alt: "A blood donation programme at the Bangladesh National Museum in Dhaka; illustrative photo",
      objectPosition: "50% 50%",
    },
  },
  {
    id: "bakalia-community-meal",
    title: "A Shared Table in Bakalia",
    category: "food-distribution",
    description:
      "Prepare simple meal packs with local volunteers, then help share them respectfully with people in the surrounding neighbourhood.",
    fullDescription:
      "A shared-meal preview for Bakalia, Chattogram, with sample tasks for preparing a clean packing area, organising meal packs, and keeping the serving process calm and respectful. Food-safety arrangements, host details, and the final location would need to be confirmed for any real event.",
    area: "Bakalia",
    city: "Chattogram",
    startsAt: "2026-12-14T10:30:00+06:00",
    endsAt: "2026-12-14T13:30:00+06:00",
    image: {
      src: "/images/events/food-distribution.jpg",
      alt: "A community food distribution in Bangladesh; illustrative photo",
      objectPosition: "50% 50%",
    },
  },
  {
    id: "kurigram-winter-clothing",
    title: "Warm Layers for Kurigram",
    category: "winter-donation",
    description:
      "Help organise winter clothing donations and prepare thoughtful, easy-to-carry bundles for local distribution.",
    fullDescription:
      "This Kurigram winter-clothing preview outlines a possible sorting and bundling session. It does not request or accept donations. A real local host would confirm which items are needed and how they would be handed over before inviting contributions.",
    area: "Kurigram Sadar",
    city: "Kurigram",
    startsAt: "2026-12-20T09:00:00+06:00",
    endsAt: "2026-12-20T12:00:00+06:00",
    image: {
      src: "/images/events/winter-donation.jpg",
      alt: "A winter clothing distribution hosted by a local Bangladeshi foundation; illustrative photo",
      objectPosition: "50% 50%",
    },
  },
  {
    id: "jashore-community-day",
    title: "Neighbourhood Care Day in Jashore",
    category: "community-support",
    description:
      "Share a morning of practical neighbour-to-neighbour support, from preparing a common space to lending a hand with small local tasks.",
    fullDescription:
      "A sample community-support morning in Jashore Sadar, inviting neighbours to identify a few useful, manageable tasks for a shared space. The group could work together on basic upkeep and agree on simple next steps. The exact host, location, and activity plan would be confirmed before a real event.",
    area: "Jashore Sadar",
    city: "Jashore",
    startsAt: "2026-12-22T08:30:00+06:00",
    endsAt: "2026-12-22T11:30:00+06:00",
    image: {
      src: "/images/events/community-support.jpg",
      alt: "A group of participants at a community gathering in Dhaka; illustrative photo",
      objectPosition: "50% 50%",
    },
  },
];

export const upcomingEvents: UpcomingEvent[] = sampleEventSeeds.map((event) => ({
  ...event,
  image: {
    ...event.image,
    ...categoryImageCredits[event.category],
  },
  ...categoryDetails[event.category],
  organizer: sampleOrganizer,
  participation: sampleParticipation,
}));
