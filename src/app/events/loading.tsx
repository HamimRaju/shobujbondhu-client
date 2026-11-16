import { Container } from "@/components/ui/container";
import { EventCardSkeleton } from "@/components/events/event-card-skeleton";

export default function EventsLoading() {
  return (
    <div role="status" aria-label="Loading upcoming events">
      <span className="sr-only">Loading upcoming events</span>
      <section aria-hidden="true" className="bg-brand-forest py-16 sm:py-24">
        <Container>
          <div className="h-4 w-44 animate-pulse rounded-full bg-brand-sage/20" />
          <div className="mt-7 h-12 max-w-2xl animate-pulse rounded-xl bg-brand-sage/20 sm:h-16" />
          <div className="mt-4 h-5 max-w-xl animate-pulse rounded-full bg-brand-sage/15" />
          <div className="mt-3 h-5 max-w-md animate-pulse rounded-full bg-brand-sage/15" />
        </Container>
      </section>
      <section aria-hidden="true" className="py-12 sm:py-16">
        <Container>
          <div className="h-9 w-56 animate-pulse rounded-lg bg-surface-muted" />
          <div className="mt-6 h-40 animate-pulse rounded-3xl border border-border bg-surface" />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <li key={index}>
                <EventCardSkeleton />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
