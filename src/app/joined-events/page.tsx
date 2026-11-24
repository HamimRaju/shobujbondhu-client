import type { Metadata } from "next";
import { Suspense } from "react";
import { JoinedEventsDashboard } from "@/components/events/joined-events-dashboard";
import { EventCardSkeleton } from "@/components/events/event-card-skeleton";
import { Container } from "@/components/ui/container";
import { requireAuthenticatedSession } from "@/lib/auth-session-server";

export const metadata: Metadata = {
  title: "Joined events",
  description:
    "See the community-service events you have joined with ShobujBondhu.",
};

function JoinedEventsLoading() {
  return (
    <section role="status" aria-label="Loading joined events" className="py-12 sm:py-16">
      <span className="sr-only">Loading joined events</span>
      <Container>
        <div aria-hidden="true" className="animate-pulse">
          <div className="h-4 w-36 rounded-full bg-surface-muted" />
          <div className="mt-5 h-10 w-64 max-w-full rounded-lg bg-surface-muted" />
          <div className="mt-4 h-4 w-full max-w-xl rounded-full bg-surface-muted" />
        </div>
        <ul
          aria-hidden="true"
          className="mt-8 grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {Array.from({ length: 3 }, (_, index) => (
            <li key={index}>
              <EventCardSkeleton />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

async function ProtectedJoinedEvents() {
  await requireAuthenticatedSession("/joined-events");
  return <JoinedEventsDashboard />;
}

export default function JoinedEventsPage() {
  return (
    <Suspense fallback={<JoinedEventsLoading />}>
      <ProtectedJoinedEvents />
    </Suspense>
  );
}
