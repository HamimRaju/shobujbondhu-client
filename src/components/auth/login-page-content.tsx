"use client";

import { ArrowRight, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { AuthTextField, PasswordField } from "@/components/auth/auth-fields";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { authClient, authServerConfigured, getAuthCallbackURL, getAuthErrorMessage, getSafeRedirectPath } from "@/lib/auth-client";

export function LoginPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const returnTo = getSafeRedirectPath(
    searchParams.get("callbackURL") || searchParams.get("redirectTo"),
  );
  const callbackURL =
    typeof window === "undefined" ? returnTo : getAuthCallbackURL(returnTo);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState("");

  function validateForm() {
    const nextErrors: typeof errors = {};
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      nextErrors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    if (!validateForm()) return;

    if (!authServerConfigured) {
      const message =
        "Set NEXT_PUBLIC_BETTER_AUTH_URL before connecting to authentication.";
      setFormError(message);
      toast.error(message);
      return;
    }

    setIsPending(true);
    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        rememberMe,
        callbackURL,
      });

      if (error) {
        const message = getAuthErrorMessage(
          error,
          "We couldn’t sign you in. Check your details and try again.",
        );
        setFormError(message);
        toast.error(message);
        return;
      }

      toast.success("Welcome back.");
      router.replace(returnTo);
      router.refresh();
    } catch (error) {
      const message = getAuthErrorMessage(
        error,
        "The authentication server could not be reached. Try again shortly.",
      );
      setFormError(message);
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <AuthPageShell
      eyebrow="Your community account"
      title="Welcome back."
      description="Sign in to find local events and keep up with the work happening around you."
      footerPrompt="New to ShobujBondhu?"
      footerLabel="Create an account"
      footerHref="/register"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isPending}
        className="space-y-4.5"
      >
        <AuthTextField
          id="email"
          label="Email address"
          type="email"
          icon={Mail}
          value={email}
          onChange={(value) => {
            setEmail(value);
            setErrors((current) => ({ ...current, email: undefined }));
            setFormError("");
          }}
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email}
        />
        <PasswordField
          id="password"
          label="Password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            setErrors((current) => ({ ...current, password: undefined }));
            setFormError("");
          }}
          autoComplete="current-password"
          error={errors.password}
        />

        <div className="flex items-center justify-between gap-3 py-0.5">
          <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-muted">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="size-4 rounded border-border accent-primary focus-visible:ring-4 focus-visible:ring-primary/20"
            />
            Remember this session
          </label>
        </div>

        {formError ? (
          <p
            role="alert"
            className="rounded-xl border border-red-500/25 bg-red-500/5 px-3.5 py-3 text-sm leading-5 text-red-800 dark:text-red-200"
          >
            {formError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending || !authServerConfigured}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/15 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-55"
        >
          {isPending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Signing in…
            </>
          ) : (
            <>
              <LockKeyhole className="size-4" aria-hidden="true" />
              Sign in
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>

        <div className="flex items-center gap-3 py-0.5" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted">
            Or continue with
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <GoogleSignInButton callbackURL={callbackURL} />
      </form>
    </AuthPageShell>
  );
}
