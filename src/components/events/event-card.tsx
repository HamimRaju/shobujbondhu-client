import { CalendarDays, Clock, MapPin } from "lucide-react";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { eventCategories } from "@/config/event-categories";
import { formatEventDate, formatEventTimeRange } from "@/lib/format";
import type { EventPreview } from "@/types";

export function EventCard({ event }: { event: EventPreview }) {
  const category = eventCategories[event.category];
  const CategoryIcon = category.icon;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        <PhotoFrame
          image={event.image}
          icon={CategoryIcon}
          tone={category.tone}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="aspect-[16/10] w-full"
          slotHint={`event-${event.id}.jpg`}
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
          <CategoryIcon className="size-3.5" aria-hidden="true" />
          {category.label}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-brand-forest/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-ivory">
          Preview
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="flex items-center gap-2 text-sm font-medium text-muted">
          <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
          <time dateTime={event.startsAt}>{formatEventDate(event.startsAt)}</time>
        </p>

        <h3 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight">
          {event.title}
        </h3>

        <p className="line-clamp-3 text-sm leading-6 text-muted">
          {event.summary}
        </p>

        <dl className="mt-auto space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin className="size-4 shrink-0 text-muted" aria-hidden="true" />
            <dd className="truncate">
              {event.area}, {event.city}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Time</dt>
            <Clock className="size-4 shrink-0 text-muted" aria-hidden="true" />
            <dd>{formatEventTimeRange(event.startsAt, event.endsAt)}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
