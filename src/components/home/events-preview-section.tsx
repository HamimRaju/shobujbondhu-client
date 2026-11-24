import { ArrowRight, CalendarDays, TriangleAlert } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getUpcomingCommunityEvents } from "@/lib/events-server";

export async function EventsPreviewSection() {
  // The API applies MongoDB .limit(6) for this recent upcoming-events preview.
  const { data: events, error } = await getUpcomingCommunityEvents(6);

  return (
    <section
      id="upcoming-events"
      aria-labelledby="events-title"
      className="scroll-mt-20 py-16 sm:py-24"
    >
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="events-title"
            eyebrow="Upcoming events"
            title="Find something to join near you"
            description="The latest community-led opportunities across Bangladesh, starting soon."
          />
          <Button href="/events" variant="outline" className="self-start sm:self-auto">
            View all events
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        {error ? (
          <div
            role="status"
            className="mt-8 flex flex-col items-start gap-4 rounded-3xl border border-amber-500/30 bg-surface px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-7"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-200">
                <TriangleAlert className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">Events are taking a moment to load</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{error}</p>
              </div>
            </div>
            <Button href="/events" variant="outline" className="shrink-0">
              Browse events
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        ) : events && events.length > 0 ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <li key={event._id}>
                <Reveal className="h-full" delay={(index % 3) * 0.06}>
                  <EventCard event={event} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 flex flex-col items-start gap-4 rounded-3xl border border-dashed border-border bg-surface px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-foreground">
                <CalendarDays className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">No upcoming events yet</h3>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Be the first to bring your neighbourhood together.
                </p>
              </div>
            </div>
            <Button href="/create-event" className="shrink-0">
              Create an event
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
