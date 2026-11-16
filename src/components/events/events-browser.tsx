"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Search, SlidersHorizontal, X } from "lucide-react";
import { UpcomingEventCard } from "@/components/events/upcoming-event-card";
import { Button } from "@/components/ui/button";
import { eventCategoryOptions } from "@/config/upcoming-event-categories";
import type {
  UpcomingEvent,
  UpcomingEventCategory,
} from "@/types/upcoming-event";

type SortOrder = "soonest" | "latest";

type EventsBrowserProps = {
  events: UpcomingEvent[];
};

export function EventsBrowser({ events }: EventsBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | UpcomingEventCategory>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("soonest");
  const reduceMotion = useReducedMotion();

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return events
      .filter((event) => {
        const matchesCategory = category === "all" || event.category === category;
        const matchesQuery =
          normalizedQuery.length === 0 ||
          `${event.title} ${event.area} ${event.city}`
            .toLocaleLowerCase()
            .includes(normalizedQuery);

        return matchesCategory && matchesQuery;
      })
      .sort((first, second) => {
        const difference =
          new Date(first.startsAt).getTime() - new Date(second.startsAt).getTime();
        return sortOrder === "soonest" ? difference : -difference;
      });
  }, [category, events, query, sortOrder]);

  const hasActiveFilters =
    query.trim().length > 0 || category !== "all" || sortOrder !== "soonest";

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setSortOrder("soonest");
  }

  return (
    <div>
      <div className="rounded-3xl border border-border bg-surface p-4 shadow-sm sm:p-6">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Find an event</span>
            <span className="relative block">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(changeEvent) => setQuery(changeEvent.target.value)}
                placeholder="Search by event or location"
                className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted/80 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </span>
          </label>

          <div className="flex flex-wrap items-end gap-3">
            <label className="min-w-44 flex-1 md:flex-none">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <SlidersHorizontal className="size-4 text-muted" aria-hidden="true" />
                Sort by
              </span>
              <select
                value={sortOrder}
                onChange={(changeEvent) =>
                  setSortOrder(changeEvent.target.value as SortOrder)
                }
                className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                <option value="soonest">Soonest First</option>
                <option value="latest">Latest First</option>
              </select>
            </label>
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="h-12 rounded-xl px-4"
            >
              <X className="size-4" aria-hidden="true" />
              Clear filters
            </Button>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.13em] text-muted">
            Browse by category
          </p>
          <div
            role="group"
            aria-label="Filter events by category"
            className="flex flex-wrap gap-2"
          >
            {eventCategoryOptions.map((option) => {
              const selected = category === option.value;

              return (
                <Button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setCategory(option.value)}
                  variant={selected ? "primary" : "outline"}
                  size="sm"
                  className="h-10 px-4"
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex min-h-6 items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm text-muted">
          Showing {filteredEvents.length}{" "}
          {filteredEvents.length === 1 ? "event" : "events"}
        </p>
        {hasActiveFilters ? (
          <Button
            type="button"
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            Reset search
          </Button>
        ) : null}
      </div>

      {filteredEvents.length > 0 ? (
        <motion.ul
          layout={!reduceMotion}
          className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.li
                key={event.id}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.24,
                  delay: reduceMotion ? 0 : Math.min(index % 3, 2) * 0.035,
                }}
                className="h-full"
              >
                <UpcomingEventCard event={event} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : events.length === 0 ? (
        <div className="mt-4 flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface px-6 py-12 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-surface-muted text-foreground">
            <CalendarDays className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-xl font-bold tracking-tight">
            No upcoming events yet
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            There aren’t any events to explore right now. You can start one for
            your neighbourhood or check back soon.
          </p>
          <Button href="/create-event" className="mt-6">
            Create an event
          </Button>
        </div>
      ) : (
        <div className="mt-4 flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface px-6 py-12 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-surface-muted text-foreground">
            <Search className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-xl font-bold tracking-tight">
            No events found
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            Try another event name or location, or choose a different category.
          </p>
          <Button type="button" onClick={clearFilters} className="mt-6">
            <X className="size-4" aria-hidden="true" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
