import { Leaf } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Brand() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-md font-display text-lg font-bold tracking-tight"
    >
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Leaf className="size-4" aria-hidden="true" />
      </span>
      {siteConfig.name}
    </Link>
  );
}
