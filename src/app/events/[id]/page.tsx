import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import Link from "next/link";
import { JoinEventButton } from "@/components/events/join-event-button";
import { RelatedEventCard } from "@/components/events/related-event-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { upcomingEventCategories } from "@/config/upcoming-event-categories";
import { upcomingEvents } from "@/data/upcoming-events";
import { formatEventDate, formatEventTimeRange } from "@/lib/format";
import type { UpcomingEvent } from "@/types/upcoming-event";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return upcomingEvents.map((event) => ({ id: event.id }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = upcomingEvents.find((item) => item.id === id);

  if (!event) {
    return { title: "Event not found" };
  }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.image.src ? [event.image.src] : undefined,
    },
  };
}

function getRelatedEvents(event: UpcomingEvent) {
  return upcomingEvents
    .filter((item) => item.id !== event.id)
    .sort((first, second) => {
      const firstIsSameCategory = first.category === event.category ? 1 : 0;
      const secondIsSameCategory = second.category === event.category ? 1 : 0;
      return (
        secondIsSameCategory - firstIsSameCategory ||
        new Date(first.startsAt).getTime() - new Date(second.startsAt).getTime()
      );
    })
    .slice(0, 3);
}

function DetailList({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon: typeof Sprout;
}) {
  return (
    <section aria-labelledby={`section-${title.toLowerCase().replaceAll(" ", "-")}`}>
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h2
          id={`section-${title.toLowerCase().replaceAll(" ", "-")}`}
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          {title}
        </h2>
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
            <Check
              className="mt-1 size-4 shrink-0 text-brand-forest dark:text-brand-amber"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function EventDetailsPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = upcomingEvents.find((item) => item.id === id);

  if (!event) {
    notFound();
  }

  const category = upcomingEventCategories[event.category];
  const CategoryIcon = category.icon;
  const relatedEvents = getRelatedEvents(event);

  return (
    <>
      <section aria-labelledby="event-title" className="pb-10 pt-6 sm:pb-14 sm:pt-10">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Upcoming events
            </Link>
            <ChevronRight className="size-4 text-muted/70" aria-hidden="true" />
            <span aria-current="page" className="truncate font-semibold text-foreground">
              {event.title}
            </span>
          </nav>

          <div className="group relative mt-6 overflow-hidden rounded-[1.5rem] border border-border shadow-[0_28px_75px_-45px_rgba(18,59,45,0.4)] sm:rounded-[2rem]">
            <PhotoFrame
              image={event.image}
              icon={CategoryIcon}
              tone={category.tone}
              priority
              sizes="(min-width: 1280px) 1152px, (min-width: 640px) 94vw, 100vw"
              className="aspect-[4/3] w-full bg-surface-muted sm:aspect-[16/8] lg:aspect-[2.2/1]"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/50 bg-background/95 px-4 py-2 text-xs font-bold text-foreground shadow-md backdrop-blur sm:left-6 sm:top-6 sm:text-sm">
              <CategoryIcon className="size-4" aria-hidden="true" />
              {category.label}
            </span>
            {event.image.credit && event.image.creditUrl ? (
              <a
                href={event.image.creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`${event.image.credit} · ${event.image.license ?? "Image source"}`}
                className="absolute bottom-4 left-4 inline-flex max-w-[calc(100%-11rem)] rounded-full bg-brand-forest/90 px-3 py-2 text-[10px] font-semibold text-brand-ivory shadow-sm backdrop-blur transition-colors hover:bg-brand-forest sm:bottom-6 sm:left-6 sm:text-xs"
              >
                <span className="truncate">
                  Photo · {event.image.credit} · {event.image.license}
                </span>
                <span className="sr-only">, opens photo source in a new tab</span>
              </a>
            ) : null}
            <span className="absolute bottom-4 right-4 rounded-full border border-white/40 bg-brand-forest/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-ivory shadow-sm backdrop-blur sm:bottom-6 sm:right-6">
              Sample event
            </span>
          </div>

          <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end lg:gap-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                {event.city} · Bangladesh
              </p>
              <h1
                id="event-title"
                className="mt-3 max-w-4xl text-balance font-display text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl"
              >
                {event.title}
              </h1>
              <p className="mt-4 max-w-3xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
                {event.description}
              </p>
              <div className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
                <p className="inline-flex items-center gap-2 font-semibold">
                  <CalendarDays
                    className="size-4 shrink-0 text-brand-forest dark:text-brand-amber"
                    aria-hidden="true"
                  />
                  <time dateTime={event.startsAt}>
                    {formatEventDate(event.startsAt)}
                  </time>
                </p>
                <p className="inline-flex items-center gap-2 font-semibold">
                  <MapPin
                    className="size-4 shrink-0 text-brand-forest dark:text-brand-amber"
                    aria-hidden="true"
                  />
                  {event.area}, {event.city}
                </p>
              </div>
            </div>
            <JoinEventButton
              eventTitle={event.title}
              className="w-full lg:justify-self-end"
            />
          </div>
        </Container>
      </section>

      <section
        aria-label="Event information and details"
        className="border-y border-border bg-surface-muted/60 py-12 sm:py-16"
      >
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
          <article className="min-w-0">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
                About this event
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                A little time can make a local difference.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted">
                {event.fullDescription}
              </p>
            </div>

            <div className="mt-10 grid gap-9 border-t border-border pt-9 sm:grid-cols-2">
              <DetailList title="Event objectives" items={event.objectives} icon={Sprout} />
              <DetailList
                title="What to bring"
                items={event.bring}
                icon={Check}
              />
            </div>

            <div className="mt-10 grid gap-9 border-t border-border pt-9 sm:grid-cols-2">
              <DetailList
                title="Participation guidelines"
                items={event.guidelines}
                icon={ShieldCheck}
              />
              <section aria-labelledby="event-activities-title">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-foreground">
                    <CalendarDays className="size-5" aria-hidden="true" />
                  </span>
                  <h2
                    id="event-activities-title"
                    className="text-xl font-bold tracking-tight sm:text-2xl"
                  >
                    Activities
                  </h2>
                </div>
                <ol className="mt-5 space-y-4">
                  {event.activities.map((activity, index) => (
                    <li key={activity} className="flex gap-3">
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-background text-xs font-bold text-muted ring-1 ring-inset ring-border">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-0.5 text-sm leading-6 text-muted">
                        {activity}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </article>

          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
              <div className="border-b border-border bg-background px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                  Event information
                </p>
                <h2 className="mt-1 text-xl font-bold tracking-tight">
                  Plan your visit
                </h2>
              </div>
              <dl className="space-y-5 p-6">
                <div className="flex gap-3">
                  <CalendarDays className="mt-0.5 size-5 shrink-0 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
                  <div>
                    <dt className="text-sm font-semibold">Date</dt>
                    <dd className="mt-1 text-sm leading-6 text-muted">
                      <time dateTime={event.startsAt}>
                        {formatEventDate(event.startsAt)}
                      </time>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock3 className="mt-0.5 size-5 shrink-0 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
                  <div>
                    <dt className="text-sm font-semibold">Time</dt>
                    <dd className="mt-1 text-sm leading-6 text-muted">
                      {formatEventTimeRange(event.startsAt, event.endsAt)}{" "}
                      <span className="block">Bangladesh time</span>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
                  <div>
                    <dt className="text-sm font-semibold">Full location</dt>
                    <dd className="mt-1 text-sm leading-6 text-muted">
                      {event.area}, {event.city}, Bangladesh
                    </dd>
                  </div>
                </div>
              </dl>
              <div className="border-t border-border px-6 py-5">
                <p className="text-sm font-semibold">Organiser</p>
                <p className="mt-1 text-sm font-medium text-muted">
                  {event.organizer.name}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted">
                  {event.organizer.description}
                </p>
              </div>
              <div className="border-t border-border px-6 py-5">
                <p className="text-sm font-semibold">Participation</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {event.participation}
                </p>
              </div>
              <div className="border-t border-border p-6">
                <JoinEventButton eventTitle={event.title} />
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section
        aria-labelledby="related-events-title"
        className="py-12 sm:py-16 lg:py-20"
      >
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
                Keep exploring
              </p>
              <h2
                id="related-events-title"
                className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Related upcoming events
              </h2>
            </div>
            <Button href="/events" variant="outline">
              All events
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
          {relatedEvents.length > 0 ? (
            <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedEvents.map((relatedEvent) => (
                <li key={relatedEvent.id}>
                  <RelatedEventCard event={relatedEvent} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-7 flex flex-col items-start gap-4 rounded-3xl border border-dashed border-border bg-surface px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div className="flex items-start gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-foreground">
                  <Sprout className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">No related events just yet</h3>
                  <p className="mt-1 max-w-xl text-sm leading-6 text-muted">
                    Explore all upcoming community events to find another way
                    to get involved.
                  </p>
                </div>
              </div>
              <Button href="/events" variant="outline" className="shrink-0">
                Browse events
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
