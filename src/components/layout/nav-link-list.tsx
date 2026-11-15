"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/cn";

type NavLinkListProps = {
  pathname: string | null;
  orientation: "horizontal" | "vertical";
  onNavigate?: () => void;
};

function isActive(pathname: string | null, href: string) {
  if (pathname === null) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Presentational list, also used as the Suspense fallback without an active state. */
export function NavLinkList({
  pathname,
  orientation,
  onNavigate,
}: NavLinkListProps) {
  return (
    <ul
      className={cn(
        "flex gap-1",
        orientation === "vertical" ? "flex-col" : "items-center",
      )}
    >
      {primaryNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "block rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-muted",
                active && "bg-surface-muted font-semibold",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function ActiveNavLinkList(
  props: Omit<NavLinkListProps, "pathname">,
) {
  const pathname = usePathname();
  return <NavLinkList pathname={pathname} {...props} />;
}
