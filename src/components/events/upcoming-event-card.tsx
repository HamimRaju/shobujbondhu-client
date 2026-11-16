import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { upcomingEventCategories } from "@/config/upcoming-event-categories";
import { formatEventDate, formatEventTimeRange } from "@/lib/format";
import type { UpcomingEvent } from "@/types/upcoming-event";

export function UpcomingEventCard({ event }: { event: UpcomingEvent }) {
  const category = upcomingEventCategories[event.category];
  const CategoryIcon = category.icon;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl motion-reduce:transform-none">
        <div className="relative">
          <PhotoFrame
            image={event.image}
            icon={CategoryIcon}
            tone={category.tone}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="aspect-[16/10] w-full bg-surface-muted"
          />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
            <CategoryIcon className="size-3.5" aria-hidden="true" />
            {category.label}
          </span>
          {event.image.credit && event.image.creditUrl ? (
            <a
              href={event.image.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`${event.image.credit} · ${event.image.license ?? "Image source"}`}
              className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-10rem)] items-center rounded-full bg-brand-forest/90 px-2.5 py-1.5 text-[10px] font-semibold text-brand-ivory shadow-sm backdrop-blur transition-colors hover:bg-brand-forest"
            >
              <span className="truncate">Photo · {event.image.credit}</span>
              <span className="sr-only">, opens photo source in a new tab</span>
            </a>
          ) : null}
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            <time dateTime={event.startsAt}>{formatEventDate(event.startsAt)}</time>
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3.5 p-5 sm:p-6">
          <h2 className="line-clamp-2 min-h-[3.5rem] text-xl font-bold leading-snug tracking-tight">
            {event.title}
          </h2>

          <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted">
            {event.description}
          </p>

          <dl className="mt-auto space-y-2.5 border-t border-border pt-4 text-sm">
            <div className="flex items-start gap-2">
              <dt className="sr-only">Location</dt>
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-brand-forest dark:text-brand-amber"
                aria-hidden="true"
              />
              <dd className="font-medium">
                {event.area}, {event.city}
              </dd>
            </div>
            <div className="flex items-start gap-2">
              <dt className="sr-only">Time</dt>
              <Clock3 className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />
              <dd>{formatEventTimeRange(event.startsAt, event.endsAt)}</dd>
            </div>
          </dl>

          <Button
            href={`/events/${event.id}`}
            variant="outline"
            aria-label={`View details for ${event.title}`}
            className="mt-1 w-full justify-between rounded-xl"
          >
            View Details
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
        </div>
      </article>
  );
}
