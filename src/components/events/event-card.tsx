import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { eventCategories } from "@/config/event-categories";
import { formatEventDate, formatEventTimeRange } from "@/lib/format";
import type { EventPreview } from "@/types";

export function EventCard({ event }: { event: EventPreview }) {
  const category = eventCategories[event.category];
  const CategoryIcon = category.icon;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl">
      <div className="relative">
        <PhotoFrame
          image={event.image}
          icon={CategoryIcon}
          tone={category.tone}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="aspect-[16/10] w-full bg-surface-muted"
          slotHint={`event-${event.id}.jpg`}
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
          <CategoryIcon className="size-3.5" aria-hidden="true" />
          {category.label}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-brand-forest/95 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-ivory shadow-sm">
          Preview
        </span>
        {event.image.credit ? (
          <span className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1 rounded-full bg-brand-forest/90 px-2.5 py-1.5 text-[10px] font-semibold text-brand-ivory shadow-sm backdrop-blur">
            <span>Photo ·</span>
            <a
              href={event.image.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate underline decoration-white/50 underline-offset-2 hover:decoration-white"
            >
              {event.image.credit}
              <span className="sr-only">, opens photo source in a new tab</span>
            </a>
            {event.image.license ? (
              <>
                <span>·</span>
                {event.image.licenseUrl ? (
                  <a
                    href={event.image.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 underline decoration-white/50 underline-offset-2 hover:decoration-white"
                  >
                    {event.image.license}
                    <span className="sr-only">, opens the license in a new tab</span>
                  </a>
                ) : (
                  <span className="shrink-0">{event.image.license}</span>
                )}
              </>
            ) : null}
          </span>
        ) : null}
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
          {event.summary}
        </p>

        <dl className="mt-auto space-y-2.5 border-t border-border pt-4 text-sm">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin className="size-4 shrink-0 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
            <dd className="truncate font-medium">
              {event.area}, {event.city}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Time</dt>
            <Clock className="size-4 shrink-0 text-muted" aria-hidden="true" />
            <dd>{formatEventTimeRange(event.startsAt, event.endsAt)}</dd>
          </div>
        </dl>
        <Link
          href="/events"
          aria-label={`Browse events like ${event.title}`}
          className="mt-1 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-muted focus-visible:rounded-sm"
        >
          Explore events
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
