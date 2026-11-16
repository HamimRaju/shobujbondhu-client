import { Leaf } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Brand() {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className="group inline-flex items-center gap-2.5 rounded-md font-display text-lg font-bold tracking-tight"
    >
      <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 group-hover:rotate-[-8deg]">
        <Leaf className="size-[1.125rem]" aria-hidden="true" />
      </span>
      <span>{siteConfig.name}</span>
    </Link>
  );
}
