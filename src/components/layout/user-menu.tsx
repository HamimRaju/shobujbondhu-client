"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CalendarDays, ChevronDown, LogOut, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { AuthAvatar } from "@/components/auth/user-avatar";
import type { AuthenticatedUser } from "@/components/providers/auth-session-provider";
import { authClient, getAuthErrorMessage } from "@/lib/auth-client";

type UserMenuProps = {
  user: AuthenticatedUser;
  compact?: boolean;
  onNavigate?: () => void;
};

export function UserMenu({
  user,
  compact = false,
  onNavigate,
}: UserMenuProps) {
  const router = useRouter();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!open || compact) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [compact, open]);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(
          getAuthErrorMessage(error, "We couldn’t sign you out. Try again."),
        );
        return;
      }

      setOpen(false);
      toast.success("You have been signed out.");
      onNavigate?.();
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(
        getAuthErrorMessage(error, "We couldn’t sign you out. Try again."),
      );
    } finally {
      setIsLoggingOut(false);
    }
  }

  if (compact) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-3">
        <div className="flex items-center gap-3 px-1 py-1">
          <AuthAvatar user={user} />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-foreground">
              {user.name}
            </p>
            <p className="truncate text-xs text-muted">{user.email}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
          <Link
            href="/profile"
            onClick={onNavigate}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-surface-muted px-3 text-sm font-semibold text-foreground transition-colors hover:bg-background"
          >
            <UserRound className="size-4" aria-hidden="true" />
            Profile
          </Link>
          <Link
            href="/manage-events"
            onClick={onNavigate}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-surface-muted px-3 text-sm font-semibold text-foreground transition-colors hover:bg-background"
          >
            <CalendarDays className="size-4" aria-hidden="true" />
            Manage events
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="col-span-2 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border px-3 text-sm font-semibold text-foreground transition-colors hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-700 disabled:opacity-60 dark:hover:text-red-300"
          >
            <LogOut className="size-4" aria-hidden="true" />
            {isLoggingOut ? "Signing out…" : "Logout"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Open account menu for ${user.name}`}
        className="inline-flex h-10 max-w-56 items-center gap-2 rounded-full border border-border/80 bg-surface px-1.5 pr-3 text-left transition-colors hover:border-primary/35 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10"
      >
        <AuthAvatar user={user} size="sm" />
        <span className="hidden min-w-0 max-w-28 truncate text-sm font-semibold text-foreground md:block">
          {user.name}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          id={menuId}
          className="absolute right-0 top-[calc(100%+0.65rem)] z-[60] w-64 origin-top-right rounded-2xl border border-border bg-surface p-2.5 text-foreground shadow-[0_18px_55px_-24px_rgba(18,59,45,0.55)]"
        >
          <div className="flex items-center gap-3 border-b border-border px-2.5 pb-3 pt-1">
            <AuthAvatar user={user} />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
          </div>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="mt-2 flex h-10 items-center gap-2.5 rounded-xl px-3 text-sm font-semibold transition-colors hover:bg-surface-muted focus-visible:outline-offset-2"
          >
            <UserRound className="size-4 text-muted" aria-hidden="true" />
            Profile
          </Link>
          <Link
            href="/manage-events"
            onClick={() => setOpen(false)}
            className="flex h-10 items-center gap-2.5 rounded-xl px-3 text-sm font-semibold transition-colors hover:bg-surface-muted focus-visible:outline-offset-2"
          >
            <CalendarDays className="size-4 text-muted" aria-hidden="true" />
            Manage events
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-left text-sm font-semibold text-foreground transition-colors hover:bg-red-500/5 hover:text-red-700 focus-visible:outline-offset-2 disabled:opacity-60 dark:hover:text-red-300"
          >
            <LogOut className="size-4" aria-hidden="true" />
            {isLoggingOut ? "Signing out…" : "Logout"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
