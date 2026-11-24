import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Sprout,
  TriangleAlert,
} from "lucide-react";
import { JoinEventButton } from "@/components/events/join-event-button";
import { EventCoverImage } from "@/components/events/event-cover-image";
import { RelatedEventCard } from "@/components/events/related-event-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { communityEventCategories } from "@/config/community-event-categories";
import { formatEventDate } from "@/lib/format";
import { formatEventTime } from "@/lib/event-datetime";
import {
  getCommunityEventById,
  getUpcomingCommunityEvents,
} from "@/lib/events-server";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: event } = await getCommunityEventById(id);
  return event
    ? {
        title: event.title,
        description: event.description,
        openGraph: { title: event.title, description: event.description },
      }
    : { title: "Event details" };
}

export default async function EventDetailsPage({ params }: EventPageProps) {
  const { id } = await params;
  const { data: event, error } = await getCommunityEventById(id);

  if (!event && !error) notFound();

  if (error || !event) {
    return (
      <section className="py-20 sm:py-28">
        <Container className="flex max-w-2xl flex-col items-center text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-200">
            <TriangleAlert className="size-6" aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            Event details aren’t available
          </h1>
          <p className="mt-4 text-base leading-7 text-muted">
            {error}
          </p>
          <Button href="/events" variant="outline" className="mt-7">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to events
          </Button>
        </Container>
      </section>
    );
  }

  const category = communityEventCategories[event.category];
  const CategoryIcon = category.icon;
  const { data: upcomingEvents } = await getUpcomingCommunityEvents();
  const relatedEvents = (upcomingEvents ?? [])
    .filter((item) => item._id !== event._id)
    .sort(
      (first, second) =>
        Number(second.category === event.category) -
        Number(first.category === event.category),
    )
    .slice(0, 3);

  return (
    <>
      <section className="pb-10 pt-6 sm:pb-14 sm:pt-10">
        <Container>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Upcoming events
          </Link>

          <div className="group relative mt-6 overflow-hidden rounded-[1.5rem] border border-border shadow-[0_28px_75px_-45px_rgba(18,59,45,0.4)] sm:rounded-[2rem]">
            <EventCoverImage
              imageUrl={event.imageUrl}
              title={event.title}
              priority
              className="aspect-[4/3] w-full sm:aspect-[16/8] lg:aspect-[2.2/1]"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/50 bg-background/95 px-4 py-2 text-xs font-bold text-foreground shadow-md backdrop-blur sm:left-6 sm:top-6 sm:text-sm">
              <CategoryIcon className="size-4" aria-hidden="true" />
              {category.label}
            </span>
          </div>

          <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                Community-led opportunity
              </p>
              <h1 className="mt-3 max-w-4xl text-balance font-display text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                {event.title}
              </h1>
              <p className="mt-4 max-w-3xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
                {event.description}
              </p>
              <div className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
                <p className="inline-flex items-center gap-2 font-semibold">
                  <CalendarDays className="size-4 shrink-0 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
                  <time dateTime={event.startsAt}>{formatEventDate(event.startsAt)}</time>
                </p>
                <p className="inline-flex items-center gap-2 font-semibold">
                  <Clock3 className="size-4 shrink-0 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
                  {formatEventTime(event.eventTime)} Bangladesh time
                </p>
                <p className="inline-flex items-center gap-2 font-semibold">
                  <MapPin className="size-4 shrink-0 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
                  {event.location}
                </p>
              </div>
            </div>
            <JoinEventButton
              eventId={event._id}
              eventTitle={event.title}
              isUpcoming={event.isUpcoming}
              className="w-full lg:justify-self-end"
            />
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface-muted/60 py-12 sm:py-16">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
          <article className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
              About this event
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              A little time can make a local difference.
            </h2>
            <p className="mt-5 whitespace-pre-line text-base leading-7 text-muted">
              {event.description}
            </p>
            <div className="mt-9 flex items-start gap-3 rounded-2xl border border-border bg-surface p-5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted">
                <Sprout className="size-5 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">What to expect</h3>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Meet your neighbours, help with a practical local project, and
                  make a positive difference together. Check the event details
                  before you leave so you know where to meet.
                </p>
              </div>
            </div>
          </article>

          <aside className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
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
                  <dd className="mt-1 text-sm text-muted">
                    {formatEventDate(event.startsAt)}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock3 className="mt-0.5 size-5 shrink-0 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold">Time</dt>
                  <dd className="mt-1 text-sm text-muted">
                    {formatEventTime(event.eventTime)} · Bangladesh time
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold">Location</dt>
                  <dd className="mt-1 text-sm leading-6 text-muted">
                    {event.location}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <CategoryIcon className="mt-0.5 size-5 shrink-0 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold">Event type</dt>
                  <dd className="mt-1 text-sm text-muted">{category.label}</dd>
                </div>
              </div>
            </dl>
            <div className="border-t border-border p-6">
              <p className="text-sm leading-6 text-muted">
                Join to save this event to your personal list and keep the date
                easy to find.
              </p>
            </div>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="related-events-title" className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
                Keep exploring
              </p>
              <h2 id="related-events-title" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Related upcoming events
              </h2>
            </div>
            <Button href="/events" variant="outline">
              All events
            </Button>
          </div>
          {relatedEvents.length > 0 ? (
            <ul className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedEvents.map((relatedEvent) => (
                <li key={relatedEvent._id}>
                  <RelatedEventCard event={relatedEvent} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-7 rounded-3xl border border-dashed border-border bg-surface px-6 py-8 text-sm text-muted">
              There are no other upcoming events to recommend just yet.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
