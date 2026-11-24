"use client";

import { useEffect, useState } from "react";
import { CalendarCheck2, RefreshCw, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UpcomingEventCard } from "@/components/events/upcoming-event-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EventCardSkeleton } from "@/components/events/event-card-skeleton";
import {
  getJoinedCommunityEvents,
  getManagedEventsErrorMessage,
  isManagedEventsUnauthorized,
} from "@/lib/managed-events-api";
import type { JoinedCommunityEvent } from "@/types/managed-event";

function formatJoinedDate(value: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date(value));
}

export function JoinedEventsDashboard() {
  const router = useRouter();
  const [events, setEvents] = useState<JoinedCommunityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let active = true;

    getJoinedCommunityEvents()
      .then((joinedEvents) => {
        if (active) setEvents(joinedEvents);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        const message = isManagedEventsUnauthorized(requestError)
          ? "Your session has expired. Please sign in again."
          : getManagedEventsErrorMessage(
              requestError,
              "We couldn’t load your joined events.",
            );
        setError(message);
        toast.error(message);
        if (isManagedEventsUnauthorized(requestError)) {
          router.replace(
            `/login?callbackURL=${encodeURIComponent("/joined-events")}`,
          );
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadCount, router]);

  function retryLoading() {
    setIsLoading(true);
    setError("");
    setReloadCount((count) => count + 1);
  }

  return (
    <section className="relative isolate overflow-hidden py-8 sm:py-12 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 -z-10 size-[32rem] rounded-full bg-brand-sage/45 blur-3xl dark:bg-brand-forest/30"
      />
      <Container className="max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-muted">
              <CalendarCheck2 className="size-4" aria-hidden="true" />
              Your saved plans
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Joined events
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Keep track of the community events you’ve signed up to support.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={retryLoading}
            disabled={isLoading}
            className="self-start sm:self-auto"
          >
            <RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} aria-hidden="true" />
            Refresh
          </Button>
        </header>

        {isLoading ? (
          <div
            role="status"
            aria-label="Loading joined events"
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 3 }, (_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface px-6 py-12 text-center"
          >
            <TriangleAlert className="size-8 text-amber-700 dark:text-amber-200" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">We couldn’t load your events</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-muted">{error}</p>
            <Button
              type="button"
              onClick={retryLoading}
              className="mt-5"
            >
              Try again
            </Button>
          </div>
        ) : events.length === 0 ? (
          <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface px-6 py-12 text-center">
            <CalendarCheck2 className="size-9 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">Your event list is ready</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted">
              When you join a community event, you’ll find its date and details here.
            </p>
            <Button href="/events" className="mt-5">
              Explore upcoming events
            </Button>
          </div>
        ) : (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map(({ event, joinedAt }) => (
              <li key={event._id} className="flex flex-col gap-2">
                <p className="px-1 text-xs font-semibold text-muted">
                  Joined {formatJoinedDate(joinedAt)}
                </p>
                <UpcomingEventCard event={event} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
