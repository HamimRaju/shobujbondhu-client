import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { upcomingEventCategories } from "@/config/upcoming-event-categories";
import { formatEventDate } from "@/lib/format";
import type { UpcomingEvent } from "@/types/upcoming-event";

export function RelatedEventCard({ event }: { event: UpcomingEvent }) {
  const category = upcomingEventCategories[event.category];
  const CategoryIcon = category.icon;

  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-offset-4"
    >
      <div className="relative">
        <PhotoFrame
          image={event.image}
          icon={CategoryIcon}
          tone={category.tone}
          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
          className="aspect-[16/10] w-full bg-surface-muted"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
          <CategoryIcon className="size-3.5" aria-hidden="true" />
          {category.label}
        </span>
        {event.image.credit ? (
          <span className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] rounded-full bg-brand-forest/90 px-2.5 py-1.5 text-[10px] font-semibold text-brand-ivory shadow-sm backdrop-blur">
            <span className="truncate">Photo · {event.image.credit}</span>
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-snug tracking-tight">
          {event.title}
        </h3>
        <div className="mt-auto space-y-2.5 border-t border-border pt-4 text-sm text-muted">
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
            <time dateTime={event.startsAt}>{formatEventDate(event.startsAt)}</time>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">
              {event.area}, {event.city}
            </span>
          </p>
        </div>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
          Explore event
          <ArrowUpRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
