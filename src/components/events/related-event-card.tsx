import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { EventCoverImage } from "@/components/events/event-cover-image";
import { communityEventCategories } from "@/config/community-event-categories";
import { formatEventDate } from "@/lib/format";
import type { JoinedCommunityEvent } from "@/types/managed-event";

export function RelatedEventCard({
  event,
}: {
  event: JoinedCommunityEvent["event"];
}) {
  const category = communityEventCategories[event.category];
  const CategoryIcon = category.icon;

  return (
    <Link
      href={`/events/${event._id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-offset-4"
    >
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
            <span className="line-clamp-2">{event.location}</span>
          </p>
        </div>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
          Explore event
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
