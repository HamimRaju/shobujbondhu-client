import type { NavItem } from "@/types";

// Routes other than "/" belong to later phases and will 404 until built.
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "About", href: "/about" },
];

export const loginLink: NavItem = { label: "Login", href: "/login" };

export const startInitiativeLink: NavItem = {
  label: "Start an Initiative",
  href: "/start-initiative",
};

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Upcoming Events", href: "/events" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Get involved",
    links: [
      startInitiativeLink,
      loginLink,
      { label: "Newsletter", href: "/#newsletter" },
    ],
  },
  {
    title: "On this site",
    links: [
      { label: "How it helps", href: "/#features" },
      { label: "Our approach to impact", href: "/#impact" },
      { label: "Community gallery", href: "/#gallery" },
    ],
  },
];
