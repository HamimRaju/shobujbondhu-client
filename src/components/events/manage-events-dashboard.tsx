"use client";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Leaf,
  LoaderCircle,
  MapPin,
  Plus,
  RefreshCw,
  Sprout,
  Trash2,
  TriangleAlert,
  UsersRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EditManagedEventModal } from "@/components/events/edit-managed-event-modal";
import { EventCardSkeleton } from "@/components/events/event-card-skeleton";
import {
  deleteManagedEvent,
  getManagedEventsErrorMessage,
  getMyManagedEvents,
  isManagedEventsUnauthorized,
} from "@/lib/managed-events-api";
import { trapDialogFocus } from "@/lib/dialog-focus";
import type { ManagedEvent } from "@/types/managed-event";

function sortSoonestFirst(events: ManagedEvent[]) {
  return [...events].sort((first, second) => {
    const dateDifference =
      Date.parse(first.startsAt) - Date.parse(second.startsAt);
    return dateDifference || first.title.localeCompare(second.title);
  });
}

function formatEventDate(dateValue: string) {
  const date = new Date(dateValue);
  return new Intl.DateTimeFormat("en-BD", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatEventTime(timeValue: string) {
  const [hour, minute] = timeValue.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function ManagedEventImage({
  imageUrl,
  title,
}: {
  imageUrl: string;
  title: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`No preview available for ${title}`}
        className="flex aspect-[16/10] items-center justify-center bg-[radial-gradient(circle_at_25%_20%,rgba(220,233,216,0.65),transparent_38%),linear-gradient(145deg,#123B2D,#24563F)] text-brand-amber"
      >
        <Sprout className="size-12" aria-hidden="true" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl}
      alt={title}
      onError={() => setFailed(true)}
      className="aspect-[16/10] w-full bg-surface-muted object-cover transition-transform duration-500 group-hover:scale-[1.025]"
    />
  );
}

function ManagedEventCard({
  event,
  index,
  reduceMotion,
  onEdit,
  onDelete,
}: {
  event: ManagedEvent;
  index: number;
  reduceMotion: boolean | null;
  onEdit: (event: ManagedEvent) => void;
  onDelete: (event: ManagedEvent) => void;
}) {
  return (
    <motion.li
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.25,
        delay: reduceMotion ? 0 : Math.min(index % 3, 2) * 0.04,
      }}
      className="h-full"
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none">
        <div className="relative isolate overflow-hidden">
          <ManagedEventImage imageUrl={event.imageUrl} title={event.title} />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-background/95 px-3 py-1.5 text-xs font-bold text-foreground shadow-sm backdrop-blur">
            <Leaf
              className="size-3.5 text-brand-forest dark:text-brand-amber"
              aria-hidden="true"
            />
            {event.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h2 className="line-clamp-2 min-h-[3.5rem] text-xl font-bold leading-snug tracking-tight">
            {event.title}
          </h2>
          <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted">
            {event.description}
          </p>

          <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
            <div className="flex items-center gap-2.5">
              <CalendarDays
                className="size-4 shrink-0 text-brand-forest dark:text-brand-amber"
                aria-hidden="true"
              />
              <dt className="sr-only">Date</dt>
              <dd>
                <time dateTime={event.eventDate}>
                  {formatEventDate(event.eventDate)}
                </time>
              </dd>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock3 className="size-4 shrink-0 text-muted" aria-hidden="true" />
              <dt className="sr-only">Time</dt>
              <dd>{formatEventTime(event.eventTime)}</dd>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-brand-forest dark:text-brand-amber"
                aria-hidden="true"
              />
              <dt className="sr-only">Location</dt>
              <dd className="line-clamp-2">{event.location}</dd>
            </div>
          </dl>

          <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 border-t border-border pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => onEdit(event)}
              aria-label={`Edit ${event.title}`}
              className="rounded-xl"
            >
              Edit event
            </Button>
            <button
              type="button"
              onClick={() => onDelete(event)}
              aria-label={`Delete ${event.title}`}
              className="inline-flex size-11 items-center justify-center rounded-xl border border-red-700/20 bg-red-700/[0.04] text-red-800 transition-colors hover:border-red-700/40 hover:bg-red-700/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-700/15 dark:text-red-300"
            >
              <Trash2 className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    </motion.li>
  );
}

export function ManageEventsDashboard() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const deleteLock = useRef(false);
  const [events, setEvents] = useState<ManagedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [editingEvent, setEditingEvent] = useState<ManagedEvent | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<ManagedEvent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const sortedEvents = useMemo(() => sortSoonestFirst(events), [events]);

  const reportLoadError = useCallback(
    (error: unknown) => {
      if (isManagedEventsUnauthorized(error)) {
        toast.error("Your session has expired. Please sign in again.");
        router.replace(
          `/login?callbackURL=${encodeURIComponent("/manage-events")}`,
        );
        return "Your session has expired. Redirecting to sign in…";
      }
      const message = getManagedEventsErrorMessage(
        error,
        "We couldn’t load your events. Please try again.",
      );
      toast.error(message);
      return message;
    },
    [router],
  );

  const refreshEvents = useCallback(
    async (quiet = false) => {
      if (quiet) setIsRefreshing(true);
      else setIsLoading(true);
      setLoadError("");
      try {
        setEvents(sortSoonestFirst(await getMyManagedEvents()));
      } catch (error) {
        setLoadError(reportLoadError(error));
      } finally {
        if (quiet) setIsRefreshing(false);
        else setIsLoading(false);
      }
    },
    [reportLoadError],
  );

  useEffect(() => {
    let active = true;

    async function loadInitialEvents() {
      try {
        const loadedEvents = await getMyManagedEvents();
        if (active) setEvents(sortSoonestFirst(loadedEvents));
      } catch (error) {
        if (active) setLoadError(reportLoadError(error));
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void loadInitialEvents();
    return () => {
      active = false;
    };
  }, [reportLoadError]);

  async function confirmDelete() {
    if (!deletingEvent || deleteLock.current) return;
    const eventToDelete = deletingEvent;

    deleteLock.current = true;
    setIsDeleting(true);
    try {
      await deleteManagedEvent(eventToDelete._id);
      setEvents((current) =>
        current.filter((event) => event._id !== eventToDelete._id),
      );
      setDeletingEvent(null);
      toast.success("Event deleted.");
      await refreshEvents(true);
    } catch (error) {
      if (isManagedEventsUnauthorized(error)) {
        toast.error("Your session has expired. Please sign in again.");
        router.replace(
          `/login?callbackURL=${encodeURIComponent("/manage-events")}`,
        );
        return;
      }
      const message = getManagedEventsErrorMessage(
        error,
        "We couldn’t delete this event. Please try again.",
      );
      toast.error(message);
      if (error instanceof Error && "status" in error && error.status === 404) {
        setDeletingEvent(null);
        await refreshEvents(true);
      }
    } finally {
      deleteLock.current = false;
      setIsDeleting(false);
    }
  }

  return (
    <section className="relative isolate overflow-hidden py-8 sm:py-12 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 -z-10 size-[32rem] rounded-full bg-brand-sage/50 blur-3xl dark:bg-brand-forest/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[28rem] -z-10 size-[28rem] rounded-full bg-brand-amber/10 blur-3xl"
      />

      <Container className="max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between sm:pb-9">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-muted shadow-sm">
              <UsersRound
                className="size-3.5 text-brand-forest dark:text-brand-amber"
                aria-hidden="true"
              />
              Your community work
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-5xl">
              Manage events
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Keep your plans up to date and make it easy for neighbours to
              take part.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              aria-live="polite"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-semibold text-foreground shadow-sm"
            >
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand-sage text-xs font-extrabold text-brand-forest dark:bg-brand-amber/15 dark:text-brand-amber">
                {isLoading ? "…" : events.length}
              </span>
              {events.length === 1 ? "event" : "events"}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => void refreshEvents(true)}
              disabled={isLoading || isRefreshing}
              aria-label="Refresh events"
              className="size-11 px-0"
            >
              {isRefreshing ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <RefreshCw className="size-4" aria-hidden="true" />
              )}
            </Button>
            <Button href="/create-event" className="h-11">
              <Plus className="size-4" aria-hidden="true" />
              Create event
            </Button>
          </div>
        </header>

        {loadError && events.length > 0 ? (
          <div
            role="alert"
            className="mt-6 flex flex-col gap-3 rounded-2xl border border-red-500/25 bg-red-500/5 p-4 text-sm text-red-800 sm:flex-row sm:items-center sm:justify-between dark:text-red-200"
          >
            <p>{loadError}</p>
            <Button
              type="button"
              variant="outline"
              onClick={() => void refreshEvents(true)}
              className="h-9 self-start rounded-full sm:self-auto"
            >
              Try again
            </Button>
          </div>
        ) : null}

        {isLoading ? (
          <div
            aria-label="Loading your events"
            className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {Array.from({ length: 3 }, (_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : loadError && events.length === 0 ? (
          <div className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface px-6 py-12 text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-800 dark:text-red-300">
              <TriangleAlert className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-display text-xl font-bold tracking-tight">
              We couldn’t load your events
            </h2>
            <p role="alert" className="mt-2 max-w-md text-sm leading-6 text-muted">
              {loadError}
            </p>
            <Button
              type="button"
              onClick={() => void refreshEvents(false)}
              className="mt-6"
            >
              <RefreshCw className="size-4" aria-hidden="true" />
              Try again
            </Button>
          </div>
        ) : sortedEvents.length === 0 ? (
          <div className="mt-8 flex min-h-[26rem] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-border bg-surface px-6 py-12 text-center shadow-sm">
            <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-brand-sage text-brand-forest dark:bg-brand-amber/15 dark:text-brand-amber">
              <Sprout className="size-8" aria-hidden="true" />
            </span>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-muted">
              A fresh start
            </p>
            <h2 className="mt-2 max-w-lg font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Your next good idea starts here.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              Create an event to bring people together around something that
              matters to your community.
            </p>
            <Button href="/create-event" className="mt-6">
              Create your first event
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-7 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-muted">
                {sortedEvents.length}{" "}
                {sortedEvents.length === 1 ? "event" : "events"} · Soonest first
              </p>
              {isRefreshing ? (
                <span
                  role="status"
                  className="inline-flex items-center gap-2 text-xs font-medium text-muted"
                >
                  <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
                  Updating list…
                </span>
              ) : null}
            </div>
            <motion.ul
              layout={!reduceMotion}
              className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence initial={false} mode="popLayout">
                {sortedEvents.map((event, index) => (
                  <ManagedEventCard
                    key={event._id}
                    event={event}
                    index={index}
                    reduceMotion={reduceMotion}
                    onEdit={setEditingEvent}
                    onDelete={setDeletingEvent}
                  />
                ))}
              </AnimatePresence>
            </motion.ul>
          </>
        )}
      </Container>

      {editingEvent ? (
        <EditManagedEventModal
          key={editingEvent._id}
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSaved={() => refreshEvents(true)}
        />
      ) : null}

      {deletingEvent ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-5">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close delete confirmation"
            onClick={isDeleting ? undefined : () => setDeletingEvent(null)}
            className="fixed inset-0 bg-brand-forest/65 backdrop-blur-sm"
          />
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-event-title"
            aria-describedby="delete-event-description"
            onKeyDown={(keyEvent) => {
              if (keyEvent.key === "Escape") {
                if (!isDeleting) setDeletingEvent(null);
                return;
              }
              trapDialogFocus(keyEvent);
            }}
            tabIndex={-1}
            className="relative z-[81] my-auto w-full max-w-lg rounded-t-[1.75rem] border border-border bg-surface p-6 shadow-2xl sm:rounded-[1.75rem] sm:p-8"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-red-600/10 text-red-800 dark:text-red-300">
              <Trash2 className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.15em] text-muted">
              Delete event
            </p>
            <h2
              id="delete-event-title"
              className="mt-2 font-display text-2xl font-bold tracking-tight"
            >
              Are you sure?
            </h2>
            <p
              id="delete-event-description"
              className="mt-3 text-sm leading-6 text-muted"
            >
              You’re about to permanently delete{" "}
              <span className="font-bold text-foreground">
                “{deletingEvent.title}”
              </span>
              . This action can’t be undone.
            </p>
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeletingEvent(null)}
                disabled={isDeleting}
                autoFocus
              >
                Keep event
              </Button>
              <button
                type="button"
                onClick={() => void confirmDelete()}
                disabled={isDeleting}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red-700 px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-700/20 disabled:pointer-events-none disabled:opacity-60"
              >
                {isDeleting ? (
                  <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Trash2 className="size-4" aria-hidden="true" />
                )}
                {isDeleting ? "Deleting…" : "Delete event"}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
