"use client";

import { useEffect, useId, useState } from "react";
import { ArrowRight, Check, LoaderCircle, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthSession } from "@/components/providers/auth-session-provider";
import { Button } from "@/components/ui/button";
import {
  getEventParticipation,
  getManagedEventsErrorMessage,
  isManagedEventsUnauthorized,
  joinCommunityEvent,
  type EventParticipation,
} from "@/lib/managed-events-api";

type ParticipationResult = {
  userId: string;
  reloadCount: number;
  participation: EventParticipation | null;
  error: string | null;
};

type JoinEventButtonProps = {
  eventId: string;
  eventTitle: string;
  isUpcoming: boolean;
  className?: string;
};

export function JoinEventButton({
  eventId,
  eventTitle,
  isUpcoming,
  className,
}: JoinEventButtonProps) {
  const noticeId = useId();
  const router = useRouter();
  const { user, isAuthenticated, isPending, isConfigured } = useAuthSession();
  const [result, setResult] = useState<ParticipationResult | null>(null);
  const [reloadCount, setReloadCount] = useState(0);
  const [isJoining, setIsJoining] = useState(false);
  const [showLoginNotice, setShowLoginNotice] = useState(false);
  const userId = user?.id ?? "";
  const currentResult =
    result?.userId === userId &&
    result.reloadCount === reloadCount &&
    userId
      ? result
      : null;
  const participation = currentResult?.participation ?? null;
  const participationError = currentResult?.error ?? null;
  const isChecking = isAuthenticated && !currentResult;

  useEffect(() => {
    if (!isAuthenticated || !userId) return;

    let active = true;
    getEventParticipation(eventId)
      .then((data) => {
        if (active) {
          setResult({
            userId,
            reloadCount,
            participation: data,
            error: null,
          });
        }
      })
      .catch((error: unknown) => {
        if (!active) return;
        setResult({
          userId,
          reloadCount,
          participation: null,
          error: isManagedEventsUnauthorized(error)
            ? "Your session could not be confirmed. Sign in again to join."
            : getManagedEventsErrorMessage(
                error,
                "We couldn’t check your registration. Try again.",
              ),
        });
      });

    return () => {
      active = false;
    };
  }, [eventId, isAuthenticated, reloadCount, userId]);

  async function handleJoin() {
    if (!isAuthenticated) {
      setShowLoginNotice((current) => !current);
      return;
    }
    if (
      isJoining ||
      isChecking ||
      participationError ||
      participation?.joined ||
      participation?.isUpcoming !== true
    ) {
      return;
    }

    setIsJoining(true);
    try {
      await joinCommunityEvent(eventId);
      setResult((current) =>
        current?.userId === userId && current.participation
          ? {
              ...current,
              participation: {
                ...current.participation,
                joined: true,
                participantCount: current.participation.participantCount + 1,
              },
            }
          : current,
      );
      toast.success(`You’re in! You joined “${eventTitle}”.`);
      router.refresh();
    } catch (error) {
      if (isManagedEventsUnauthorized(error)) {
        toast.error("Your session has expired. Please sign in again.");
        router.push(`/login?callbackURL=${encodeURIComponent(`/events/${eventId}`)}`);
        return;
      }
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "EVENT_ALREADY_JOINED"
      ) {
        setReloadCount((count) => count + 1);
        toast.success("You’ve already joined this event.");
      } else {
        toast.error(
          getManagedEventsErrorMessage(error, "We couldn’t join this event."),
        );
      }
    } finally {
      setIsJoining(false);
    }
  }

  const loginHref = `/login?callbackURL=${encodeURIComponent(`/events/${eventId}`)}`;
  const joined = participation?.joined === true;
  const canJoin = isAuthenticated
    ? participation?.isUpcoming === true
    : isUpcoming;
  const disabled =
    isPending ||
    !isConfigured ||
    isChecking ||
    Boolean(participationError) ||
    isJoining ||
    joined ||
    !canJoin;

  return (
    <div className={className}>
      <Button
        type="button"
        onClick={() => void handleJoin()}
        disabled={disabled}
        aria-describedby={
          showLoginNotice && !isAuthenticated
            ? `join-notice-${noticeId}`
            : undefined
        }
        className="w-full"
        size="lg"
      >
        {isJoining || isChecking ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        ) : joined ? (
          <Check className="size-4" aria-hidden="true" />
        ) : null}
        {isJoining
          ? "Joining…"
          : isPending || isChecking
            ? "Checking registration…"
            : joined
              ? "You’ve joined"
              : !isConfigured
                ? "Sign-in unavailable"
                : !canJoin
                  ? "Event has started"
                  : "Join This Event"}
        {!joined && canJoin && !isChecking && !isJoining ? (
          <ArrowRight className="size-4" aria-hidden="true" />
        ) : null}
      </Button>

      {participation ? (
        <p className="mt-3 text-sm text-muted" aria-live="polite">
          {participation.participantCount}{" "}
          {participation.participantCount === 1 ? "neighbour is" : "neighbours are"}{" "}
          joining
        </p>
      ) : null}

      {participationError ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
          <p role="status">{participationError}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setReloadCount((count) => count + 1)}
          >
            Try again
          </Button>
        </div>
      ) : null}

      {!isConfigured ? (
        <p className="mt-3 text-sm text-muted">
          Sign-in is not configured. Please contact the site administrator.
        </p>
      ) : null}

      {!isAuthenticated && showLoginNotice ? (
        <div
          id={`join-notice-${noticeId}`}
          role="region"
          aria-live="polite"
          className="mt-3 rounded-2xl border border-border bg-surface p-4 text-left shadow-lg"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-foreground">
              <LockKeyhole className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">Login required</p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Sign in to join{" "}
                <span className="font-medium text-foreground">{eventTitle}</span>.
              </p>
              <Button href={loginHref} size="sm" className="mt-3">
                Go to login
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
