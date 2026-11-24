"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthConfigNotice } from "@/components/auth/auth-config-notice";
import { useAuthSession } from "@/components/providers/auth-session-provider";

type ProtectedRouteProps = {
  returnTo: string;
  fallback: ReactNode;
  children: ReactNode;
};

export function ProtectedRoute({
  returnTo,
  fallback,
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isPending, isConfigured, error, refetch } = useAuthSession();

  useEffect(() => {
    if (!isPending && isConfigured && !error && !user) {
      router.replace(`/login?callbackURL=${encodeURIComponent(returnTo)}`);
    }
  }, [error, isConfigured, isPending, returnTo, router, user]);

  if (isPending) return fallback;

  if (!isConfigured) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="mb-4 text-2xl font-bold">Sign-in is unavailable</h1>
        <AuthConfigNotice />
      </section>
    );
  }

  if (error) {
    return (
      <section
        role="alert"
        className="mx-auto flex min-h-72 w-full max-w-3xl flex-col items-center justify-center px-4 py-12 text-center sm:px-6"
      >
        <h1 className="text-2xl font-bold">We couldn’t verify your session</h1>
        <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
          Check your connection and try again. You’ll stay on this page while we
          reconnect.
        </p>
        <Button type="button" onClick={() => void refetch()} className="mt-5">
          Try again
        </Button>
      </section>
    );
  }

  if (!user) return fallback;
  return children;
}
