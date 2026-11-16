"use client";

import {
  ArrowRight,
  CalendarDays,
  Mail,
  Pencil,
  RefreshCw,
  TriangleAlert,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthAvatar } from "@/components/auth/user-avatar";
import { EditProfileModal } from "@/components/auth/edit-profile-modal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProtectedPageSkeleton } from "@/components/ui/protected-page-skeleton";
import { useAuthSession } from "@/components/providers/auth-session-provider";
import {
  getCurrentProfile,
  getProfileErrorMessage,
  isProfileUnauthorized,
} from "@/lib/profile-api";
import type { ProfileDTO } from "@/types/profile";

function formatCreationDate(value: string | null) {
  if (!value || !Number.isFinite(Date.parse(value))) return null;
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function ProfilePageContent() {
  const router = useRouter();
  const { refetch } = useAuthSession();
  const [profile, setProfile] = useState<ProfileDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleProfileError = useCallback(
    (error: unknown) => {
      if (isProfileUnauthorized(error)) {
        toast.error("Your session has expired. Please sign in again.");
        router.replace(`/login?callbackURL=${encodeURIComponent("/profile")}`);
        return;
      }
      setLoadError(
        getProfileErrorMessage(
          error,
          "We couldn’t load your profile. Please try again.",
        ),
      );
    },
    [router],
  );

  useEffect(() => {
    let active = true;
    void getCurrentProfile()
      .then((currentProfile) => {
        if (!active) return;
        setProfile(currentProfile);
        setLoadError("");
      })
      .catch((error: unknown) => {
        if (active) handleProfileError(error);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [handleProfileError]);

  async function handleProfileSaved(updatedProfile: ProfileDTO) {
    setProfile(updatedProfile);
    try {
      // Bypass Better Auth's session cookie cache so the account menu receives
      // the name and image persisted by the profile API.
      await refetch({ query: { disableCookieCache: true } });
    } catch {
      // The profile API already persisted and returned the authoritative data.
    }
  }

  if (isLoading) {
    return <ProtectedPageSkeleton variant="profile" />;
  }

  if (loadError || !profile) {
    return (
      <section className="relative isolate overflow-hidden py-10 sm:py-16">
        <Container className="max-w-3xl">
          <div
            role="alert"
            className="flex min-h-80 flex-col items-center justify-center rounded-[1.75rem] border border-border bg-surface px-6 py-12 text-center shadow-sm"
          >
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-800 dark:text-amber-200">
              <TriangleAlert className="size-6" aria-hidden="true" />
            </span>
            <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">
              Your profile is unavailable
            </h1>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted">
              {loadError || "We couldn’t load your profile. Please try again."}
            </p>
            <Button
              type="button"
              onClick={() => {
                setIsLoading(true);
                setLoadError("");
                void getCurrentProfile()
                  .then(setProfile)
                  .catch(handleProfileError)
                  .finally(() => setIsLoading(false));
              }}
              className="mt-6"
            >
              <RefreshCw className="size-4" aria-hidden="true" />
              Try again
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  const createdAt = formatCreationDate(profile.createdAt);

  return (
    <section className="relative isolate overflow-hidden py-10 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-0 -z-10 size-80 rounded-full bg-brand-sage/60 blur-3xl dark:bg-brand-forest/50"
      />
      <Container className="max-w-3xl">
        <div className="overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface shadow-[0_26px_75px_-46px_rgba(18,59,45,0.5)]">
          <div className="relative overflow-hidden bg-brand-forest px-6 py-8 text-brand-ivory sm:px-10 sm:py-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-20 size-64 rounded-full border-[30px] border-brand-ivory/10"
            />
            <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-brand-amber">
              ShobujBondhu account
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Your profile
            </h1>
            <p className="mt-2 text-sm leading-6 text-brand-ivory/75">
              Your community account details, in one place.
            </p>
          </div>

          <div className="p-5 sm:p-10">
            <div className="flex flex-col items-start gap-5 border-b border-border pb-7 sm:flex-row sm:items-center">
              <AuthAvatar
                user={{ name: profile.name, image: profile.image }}
                size="lg"
              />
              <div className="min-w-0 flex-1">
                <h2 className="break-words text-2xl font-bold tracking-tight">
                  {profile.name}
                </h2>
                <p className="mt-1 break-all text-sm text-muted">
                  {profile.email}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="w-full shrink-0 sm:w-auto"
              >
                <Pencil className="size-4" aria-hidden="true" />
                Edit profile
              </Button>
            </div>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="min-w-0 rounded-2xl border border-border bg-background/70 p-4">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted">
                  <UserRound className="size-4" aria-hidden="true" />
                  Full name
                </dt>
                <dd className="mt-2 break-words text-sm font-semibold text-foreground">
                  {profile.name}
                </dd>
              </div>
              <div className="min-w-0 rounded-2xl border border-border bg-background/70 p-4">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted">
                  <Mail className="size-4" aria-hidden="true" />
                  Email address
                </dt>
                <dd className="mt-2 break-all text-sm font-semibold text-foreground">
                  {profile.email}
                </dd>
              </div>
              {createdAt ? (
                <div className="rounded-2xl border border-border bg-background/70 p-4 sm:col-span-2">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    Member since
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-foreground">
                    {createdAt}
                  </dd>
                </div>
              ) : null}
            </dl>

            <Button href="/events" className="mt-7">
              Explore community events
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>

      {isEditing ? (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditing(false)}
          onSaved={handleProfileSaved}
        />
      ) : null}
    </section>
  );
}
