"use client";

import { useState } from "react";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/cn";

export function EventCoverImage({
  imageUrl,
  title,
  className,
  priority = false,
}: {
  imageUrl: string;
  title: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-gradient-to-br from-brand-forest via-[#1c5642] to-[#2f7a5c]",
        className,
      )}
    >
      {!failed ? (
        // Event URLs are supplied by users, so arbitrary remote hosts must be supported.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={title}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          onError={() => setFailed(true)}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transform-none"
        />
      ) : (
        <div
          role="img"
          aria-label={`Cover image unavailable for ${title}`}
          className="flex size-full items-center justify-center text-brand-sage"
        >
          <Sprout className="size-14 opacity-70" strokeWidth={1.4} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
