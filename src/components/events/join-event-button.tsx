"use client";

import { useId, useState } from "react";
import { ArrowRight, LockKeyhole, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginLink } from "@/config/navigation";

type JoinEventButtonProps = {
  eventTitle: string;
  className?: string;
};

/**
 * Frontend-only auth gate. Replace this check with the session/API flow once
 * authentication and event registration are available.
 */
export function JoinEventButton({
  eventTitle,
  className,
}: JoinEventButtonProps) {
  const noticeId = useId();
  const [showLoginNotice, setShowLoginNotice] = useState(false);

  return (
    <div className={className}>
      <Button
        type="button"
        onClick={() => setShowLoginNotice((visible) => !visible)}
        aria-expanded={showLoginNotice}
        aria-controls={showLoginNotice ? `join-notice-${noticeId}` : undefined}
        className="w-full"
        size="lg"
      >
        Join This Event
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>

      {showLoginNotice ? (
        <div
          id={`join-notice-${noticeId}`}
          role="region"
          aria-live="polite"
          aria-labelledby={`join-notice-title-${noticeId}`}
          className="mt-3 rounded-2xl border border-border bg-surface p-4 text-left shadow-lg"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-foreground">
              <LockKeyhole className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p
                id={`join-notice-title-${noticeId}`}
                className="font-semibold"
              >
                Login required
              </p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Sign in to continue with <span className="font-medium text-foreground">{eventTitle}</span>.
                This is a sample event preview, so joining and registration are
                not active yet.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button href={loginLink.href} size="sm">
                  Go to login
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowLoginNotice(false)}
                  variant="ghost"
                  size="sm"
                  className="text-muted hover:text-foreground"
                >
                  <X className="size-3.5" aria-hidden="true" />
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
