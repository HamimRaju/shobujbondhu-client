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
                "group relative block rounded-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-muted focus-visible:outline-offset-2",
                orientation === "vertical" && "rounded-xl px-4 py-3.5 text-base",
                active && "bg-surface-muted font-semibold",
              )}
            >
              <span>{item.label}</span>
              {orientation === "horizontal" ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100",
                    active && "scale-x-100",
                  )}
                />
              ) : null}
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
