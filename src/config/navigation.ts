import type { NavItem } from "@/types";

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Our impact", href: "/#impact" },
];

export const loginLink: NavItem = { label: "Login", href: "/login" };

export const startInitiativeLink: NavItem = {
  label: "Create an Event",
  href: "/create-event",
};

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Upcoming Events", href: "/events" },
      { label: "Our impact", href: "/#impact" },
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
