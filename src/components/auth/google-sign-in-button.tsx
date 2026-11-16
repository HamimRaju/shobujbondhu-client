"use client";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient, authServerConfigured, getAuthErrorMessage } from "@/lib/auth-client";

type GoogleSignInButtonProps = {
  callbackURL: string;
  label?: string;
};

function getGoogleErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string" &&
    /provider not found|not configured/i.test(error.message)
  ) {
    return "Google sign-in is not enabled on the server. Configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.";
  }

  return getAuthErrorMessage(
    error,
    "Google sign-in could not be started. Check the server OAuth configuration.",
  );
}

export function GoogleSignInButton({
  callbackURL,
  label = "Continue with Google",
}: GoogleSignInButtonProps) {
  const [isPending, setIsPending] = useState(false);

  async function signInWithGoogle() {
    if (!authServerConfigured) {
      toast.error("Set NEXT_PUBLIC_BETTER_AUTH_URL before connecting to authentication.");
      return;
    }

    setIsPending(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });

      if (error) {
        toast.error(getGoogleErrorMessage(error));
      }
    } catch (error) {
      toast.error(getGoogleErrorMessage(error));
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={signInWithGoogle}
      disabled={isPending || !authServerConfigured}
      aria-busy={isPending}
      className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-surface-muted hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10 disabled:pointer-events-none disabled:opacity-55"
    >
      {isPending ? (
        <LoaderCircle className="size-[1.125rem] animate-spin" aria-hidden="true" />
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 48 48"
          className="size-[1.125rem]"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
            transform="translate(0 3)"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.68 5.96c4.48-4.14 7.1-10.24 7.1-17.61Z"
            transform="translate(0 -3)"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.89.93 7.57 2.56 10.78l7.97-6.19Z"
            transform="translate(0 0)"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.91-5.84l-7.68-5.96c-2.13 1.43-4.85 2.27-8.23 2.27-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
            transform="translate(0 -3)"
          />
        </svg>
      )}
      {label}
    </button>
  );
}
