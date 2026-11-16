"use client";

import {
  Image as ImageIcon,
  LoaderCircle,
  Save,
  UserRound,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { trapDialogFocus } from "@/lib/dialog-focus";
import {
  getProfileErrorMessage,
  getProfileFieldErrors,
  isProfileUnauthorized,
  updateCurrentProfile,
  validateProfileInput,
} from "@/lib/profile-api";
import type { ProfileDTO, ProfileFieldErrors } from "@/types/profile";

type EditProfileModalProps = {
  profile: ProfileDTO;
  onClose: () => void;
  onSaved: (profile: ProfileDTO) => Promise<void>;
};

function isValidImageURL(value: string) {
  try {
    const url = new URL(value.trim());
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

function fieldClass(hasError: boolean) {
  return `h-12 w-full rounded-xl border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted/75 focus:border-primary focus:ring-4 focus:ring-primary/10 ${
    hasError ? "border-red-500/70" : "border-border"
  }`;
}

export function EditProfileModal({
  profile,
  onClose,
  onSaved,
}: EditProfileModalProps) {
  const router = useRouter();
  const submitLock = useRef(false);
  const [name, setName] = useState(profile.name);
  const [image, setImage] = useState(profile.image ?? "");
  const [errors, setErrors] = useState<ProfileFieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const hasValidPreview = Boolean(image.trim()) && isValidImageURL(image);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current) return;

    const input = {
      name: name.trim(),
      image: image.trim() || null,
    };
    const nextErrors = validateProfileInput(input);
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length > 0) {
      const firstError = Object.keys(nextErrors)[0];
      document.getElementById(`profile-edit-${firstError}`)?.focus();
      toast.error("Please check the highlighted fields.");
      return;
    }

    submitLock.current = true;
    setIsSaving(true);
    void saveProfile(input);
  }

  async function saveProfile(input: { name: string; image: string | null }) {
    try {
      const updatedProfile = await updateCurrentProfile(input);
      await onSaved(updatedProfile);
      toast.success("Your profile has been updated.");
      onClose();
    } catch (error) {
      if (isProfileUnauthorized(error)) {
        toast.error("Your session has expired. Please sign in again.");
        router.replace(`/login?callbackURL=${encodeURIComponent("/profile")}`);
        return;
      }

      setErrors(getProfileFieldErrors(error));
      const message = getProfileErrorMessage(
        error,
        "We couldn’t save your profile. Please try again.",
      );
      setFormError(message);
      toast.error(message);
    } finally {
      submitLock.current = false;
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-5">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close edit profile dialog"
        onClick={isSaving ? undefined : onClose}
        className="fixed inset-0 bg-brand-forest/65 backdrop-blur-sm"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
        onKeyDown={(keyEvent) => {
          if (keyEvent.key === "Escape") {
            if (!isSaving) onClose();
            return;
          }
          trapDialogFocus(keyEvent);
        }}
        tabIndex={-1}
        className="relative z-[81] my-auto max-h-[min(92vh,46rem)] w-full max-w-3xl overflow-y-auto rounded-t-[1.75rem] border border-border bg-surface shadow-2xl sm:rounded-[1.75rem]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-border bg-background px-5 py-4 sm:px-7 sm:py-5">
          <div>
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.15em] text-muted">
              Account settings
            </p>
            <h2
              id="edit-profile-title"
              className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl"
            >
              Edit your profile
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close edit profile dialog"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:opacity-50"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-busy={isSaving}
          className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_15rem]"
        >
          <div className="space-y-5 p-5 sm:p-7">
            <div>
              <label
                htmlFor="profile-edit-name"
                className="mb-2 block text-sm font-semibold"
              >
                Full name <span aria-hidden="true">*</span>
              </label>
              <input
                autoFocus
                id="profile-edit-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={120}
                required
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setErrors((current) => ({ ...current, name: undefined }));
                  setFormError("");
                }}
                onBlur={() =>
                  setErrors((current) => ({
                    ...current,
                    name: validateProfileInput({
                      name,
                      image: image.trim() || null,
                    }).name,
                  }))
                }
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "profile-edit-name-error" : undefined}
                placeholder="Your full name"
                className={fieldClass(Boolean(errors.name))}
              />
              {errors.name ? (
                <p
                  id="profile-edit-name-error"
                  className="mt-1.5 text-xs font-medium text-red-700 dark:text-red-300"
                >
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="profile-edit-image"
                className="mb-2 block text-sm font-semibold"
              >
                Profile photo URL{" "}
                <span className="font-normal text-muted">(optional)</span>
              </label>
              <span className="relative block">
                <ImageIcon
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  id="profile-edit-image"
                  name="image"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  value={image}
                  onChange={(event) => {
                    setImage(event.target.value);
                    setPreviewFailed(false);
                    setErrors((current) => ({ ...current, image: undefined }));
                    setFormError("");
                  }}
                  onBlur={() =>
                    setErrors((current) => ({
                      ...current,
                      image: validateProfileInput({
                        name,
                        image: image.trim() || null,
                      }).image,
                    }))
                  }
                  aria-invalid={Boolean(errors.image)}
                  aria-describedby={
                    errors.image ? "profile-edit-image-error" : "profile-edit-image-help"
                  }
                  placeholder="https://example.com/photo.jpg"
                  className={`${fieldClass(Boolean(errors.image))} pl-11`}
                />
              </span>
              <p id="profile-edit-image-help" className="mt-2 text-xs leading-5 text-muted">
                Leave blank to remove your current profile photo.
              </p>
              {errors.image ? (
                <p
                  id="profile-edit-image-error"
                  className="mt-1.5 text-xs font-medium text-red-700 dark:text-red-300"
                >
                  {errors.image}
                </p>
              ) : null}
            </div>

            {formError ? (
              <p
                role="alert"
                className="rounded-xl border border-red-500/25 bg-red-500/5 px-3.5 py-3 text-sm leading-5 text-red-800 dark:text-red-200"
              >
                {formError}
              </p>
            ) : null}

            <div className="flex flex-col-reverse gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                {isSaving ? (
                  <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Save className="size-4" aria-hidden="true" />
                )}
                {isSaving ? "Saving…" : "Save profile"}
              </Button>
            </div>
          </div>

          <aside className="border-t border-border bg-background p-5 sm:border-l sm:border-t-0 sm:p-6">
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.15em] text-muted">
              Live photo preview
            </p>
            <div className="mt-4 flex min-h-48 flex-col items-center justify-center rounded-2xl border border-border bg-surface p-5 text-center">
              <span className="relative inline-flex size-24 items-center justify-center overflow-hidden rounded-full bg-brand-sage text-brand-forest ring-4 ring-brand-sage/40 dark:bg-brand-amber/15 dark:text-brand-amber dark:ring-brand-amber/10">
                {hasValidPreview && !previewFailed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image.trim()}
                    alt={`Preview of ${name.trim() || "your profile photo"}`}
                    onError={() => setPreviewFailed(true)}
                    className="size-full object-cover"
                  />
                ) : (
                  <UserRound className="size-10" aria-hidden="true" />
                )}
              </span>
              <p className="mt-4 max-w-full truncate text-sm font-semibold">
                {name.trim() || "Your name"}
              </p>
              {previewFailed ? (
                <p className="mt-1 text-xs leading-5 text-muted">
                  This image could not be loaded. Check the URL and try again.
                </p>
              ) : (
                <p className="mt-1 text-xs text-muted">
                  Preview updates as you type.
                </p>
              )}
            </div>
          </aside>
        </form>
      </section>
    </div>
  );
}
