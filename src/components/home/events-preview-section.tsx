import { ArrowRight, CalendarDays, Info } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { previewEvents } from "@/data/preview-events";

export function EventsPreviewSection() {
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
            description="A preview of how volunteering events will appear across Bangladesh."
          />
          <Button href="/events" variant="outline" className="self-start sm:self-auto">
            View all events
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <p
          role="note"
          className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm text-muted"
        >
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-foreground">Preview data.</strong>{" "}
            These sample events show the planned layout. They are not real,
            registered events.
          </span>
        </p>

        {previewEvents.length > 0 ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previewEvents.map((event, index) => (
              <li key={event.id}>
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
                <h3 className="font-semibold">No events to preview yet</h3>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Browse upcoming opportunities and find a way to take part.
                </p>
              </div>
            </div>
            <Button href="/events" variant="outline" className="shrink-0">
              Explore events
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
