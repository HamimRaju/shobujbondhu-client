"use client";

import { ArrowRight, LoaderCircle, Mail, UserRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { AuthTextField, PasswordField } from "@/components/auth/auth-fields";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { authClient, authServerConfigured, getAuthCallbackURL, getAuthErrorMessage, getSafeRedirectPath } from "@/lib/auth-client";

type RegistrationErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  image?: string;
};

function isValidImageURL(value: string) {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      Boolean(url.hostname) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export function RegisterPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const returnTo = getSafeRedirectPath(
    searchParams.get("callbackURL") || searchParams.get("redirectTo"),
  );
  const callbackURL =
    typeof window === "undefined" ? returnTo : getAuthCallbackURL(returnTo);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [formError, setFormError] = useState("");

  function validateForm() {
    const nextErrors: RegistrationErrors = {};
    const normalizedEmail = email.trim();
    const normalizedImage = image.trim();

    if (!name.trim()) nextErrors.name = "Enter your full name.";
    else if (name.trim().length > 120) {
      nextErrors.name = "Your name must be 120 characters or fewer.";
    }
    if (!normalizedEmail) {
      nextErrors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (password.length < 6) {
      nextErrors.password = "Use at least 6 characters.";
    } else if (password.length > 128) {
      nextErrors.password = "Use 128 characters or fewer.";
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      nextErrors.password =
        "Include at least one uppercase and one lowercase letter.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "The passwords don’t match.";
    }

    if (normalizedImage && normalizedImage.length > 2048) {
      nextErrors.image = "Keep the profile image URL under 2,048 characters.";
    } else if (normalizedImage && !isValidImageURL(normalizedImage)) {
      nextErrors.image = "Use a valid public image URL with HTTP or HTTPS.";
    }

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
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        ...(image.trim() ? { image: image.trim() } : {}),
        callbackURL,
      });

      if (error) {
        const message = getAuthErrorMessage(
          error,
          "We couldn’t create your account. Check the details and try again.",
        );
        setFormError(message);
        toast.error(message);
        return;
      }

      toast.success("Your ShobujBondhu account is ready.");
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
      eyebrow="Grow with your community"
      title="Create your account."
      description="Join neighbours who are bringing people together around local action."
      footerPrompt="Already have an account?"
      footerLabel="Sign in"
      footerHref={`/login?callbackURL=${encodeURIComponent(returnTo)}`}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isPending}
        className="space-y-3.5"
      >
        <AuthTextField
          id="name"
          label="Full name"
          type="text"
          icon={UserRound}
          value={name}
          onChange={(value) => {
            setName(value);
            setErrors((current) => ({ ...current, name: undefined }));
            setFormError("");
          }}
          autoComplete="name"
          placeholder="Your name"
          error={errors.name}
        />
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
          autoComplete="new-password"
          hint="At least 6 characters, with an uppercase and lowercase letter."
          error={errors.password}
        />
        <PasswordField
          id="confirm-password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(value) => {
            setConfirmPassword(value);
            setErrors((current) => ({
              ...current,
              confirmPassword: undefined,
            }));
            setFormError("");
          }}
          autoComplete="new-password"
          error={errors.confirmPassword}
        />
        <AuthTextField
          id="image"
          label="Profile image URL"
          type="url"
          icon={UserRound}
          value={image}
          onChange={(value) => {
            setImage(value);
            setErrors((current) => ({ ...current, image: undefined }));
            setFormError("");
          }}
          autoComplete="url"
          placeholder="https://example.com/photo.jpg"
          error={errors.image}
          required={false}
        />

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
              Creating account…
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>

        <div className="flex items-center gap-3 py-0.5" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-muted">
            Or sign up with
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <GoogleSignInButton
          callbackURL={callbackURL}
          label="Sign up with Google"
        />
      </form>
    </AuthPageShell>
  );
}
