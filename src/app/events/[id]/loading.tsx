import { Container } from "@/components/ui/container";
import { EventCardSkeleton } from "@/components/events/event-card-skeleton";

export default function EventDetailsLoading() {
  return (
    <div role="status" aria-label="Loading event details">
      <span className="sr-only">Loading event details</span>
      <section aria-hidden="true" className="py-8 sm:py-12">
        <Container>
          <div className="h-4 w-44 animate-pulse rounded-full bg-surface-muted" />
          <div className="mt-6 aspect-[4/3] animate-pulse rounded-[1.5rem] bg-surface-muted sm:aspect-[16/8] lg:aspect-[2.2/1]" />
          <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div>
              <div className="h-3 w-36 animate-pulse rounded-full bg-surface-muted" />
              <div className="mt-4 h-10 max-w-2xl animate-pulse rounded-lg bg-surface-muted" />
              <div className="mt-4 h-5 max-w-3xl animate-pulse rounded-full bg-surface-muted" />
            </div>
            <div className="h-12 animate-pulse rounded-full bg-surface-muted" />
          </div>
        </Container>
      </section>
      <section aria-hidden="true" className="border-y border-border bg-surface-muted/60 py-12">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="grid gap-8 sm:grid-cols-2">
            <EventCardSkeleton />
            <EventCardSkeleton />
          </div>
          <div className="h-[28rem] animate-pulse rounded-3xl bg-surface" />
        </Container>
      </section>
    </div>
  );
}
