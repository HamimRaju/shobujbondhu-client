import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import Link from "next/link";
import { EventCoverImage } from "@/components/events/event-cover-image";
import { communityEventCategories } from "@/config/community-event-categories";
import { formatEventDate } from "@/lib/format";
import { formatEventTime } from "@/lib/event-datetime";
import type { CommunityEvent } from "@/types/managed-event";

export function EventCard({ event }: { event: CommunityEvent }) {
  const category = communityEventCategories[event.category];
  const CategoryIcon = category.icon;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl motion-reduce:transform-none">
      <div className="relative">
        <EventCoverImage
          imageUrl={event.imageUrl}
          title={event.title}
          className="aspect-[16/10] w-full"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
          <CategoryIcon className="size-3.5" aria-hidden="true" />
          {category.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-5 sm:p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
          <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
          <time dateTime={event.startsAt}>{formatEventDate(event.startsAt)}</time>
        </p>
        <h3 className="line-clamp-2 min-h-[3.25rem] text-lg font-bold leading-snug tracking-tight">
          {event.title}
        </h3>
        <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted">
          {event.description}
        </p>

        <dl className="mt-auto space-y-2.5 border-t border-border pt-4 text-sm">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin className="size-4 shrink-0 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
            <dd className="truncate font-medium">{event.location}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Time</dt>
            <Clock3 className="size-4 shrink-0 text-muted" aria-hidden="true" />
            <dd>{formatEventTime(event.eventTime)} · Bangladesh time</dd>
          </div>
        </dl>
        <Link
          href={`/events/${event._id}`}
          aria-label={`View details for ${event.title}`}
          className="mt-1 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-muted focus-visible:rounded-sm"
        >
          View event
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
