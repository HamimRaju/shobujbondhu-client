"use client";

import {
  CalendarDays,
  Check,
  Clock3,
  Image as ImageIcon,
  LoaderCircle,
  MapPin,
  Save,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import {
  getManagedEventsErrorMessage,
  isManagedEventsUnauthorized,
  isValidManagedEventImageURL,
  toManagedEventFormValues,
  updateManagedEvent,
  validateManagedEventForm,
} from "@/lib/managed-events-api";
import { trapDialogFocus } from "@/lib/dialog-focus";
import { getTomorrowInBangladesh } from "@/lib/event-datetime";
import { ManagedEventsApiError } from "@/lib/managed-events-api";
import type {
  ManagedEvent,
  ManagedEventCategory,
  ManagedEventFormValues,
} from "@/types/managed-event";
import { managedEventCategories } from "@/types/managed-event";
import { Button } from "@/components/ui/button";

type FormErrors = Partial<Record<keyof ManagedEventFormValues, string>>;

type EditManagedEventModalProps = {
  event: ManagedEvent;
  onClose: () => void;
  onSaved: () => Promise<void>;
};

function formatDate(value: string) {
  if (!value) return "Select a date";
  const date = new Date(`${value}T00:00:00.000Z`);
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function inputClass(error: boolean) {
  return `h-11 w-full rounded-xl border bg-background px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted/75 focus:border-primary focus:ring-4 focus:ring-primary/10 ${
    error ? "border-red-500/70" : "border-border"
  }`;
}

function InlineError({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p className="mt-1.5 text-xs font-medium text-red-700 dark:text-red-300">
      {children}
    </p>
  );
}

export function EditManagedEventModal({
  event,
  onClose,
  onSaved,
}: EditManagedEventModalProps) {
  const router = useRouter();
  const saveLock = useRef(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const originalValues = toManagedEventFormValues(event);
  const [values, setValues] = useState(originalValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const validImageURL = isValidManagedEventImageURL(values.imageUrl);

  function updateField<K extends keyof ManagedEventFormValues>(
    field: K,
    value: ManagedEventFormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setFormError("");
    if (field === "imageUrl") setImageFailed(false);
    setErrors((current) => {
      if (!current[field]) return current;
      const nextValues = { ...values, [field]: value };
      return {
        ...current,
        [field]: validateManagedEventForm(nextValues, originalValues)[field],
      };
    });
  }

  function handleBlur(field: keyof ManagedEventFormValues) {
    setErrors((current) => ({
      ...current,
      [field]: validateManagedEventForm(values, originalValues)[field],
    }));
  }

  async function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (saveLock.current) return;

    const nextErrors = validateManagedEventForm(values, originalValues);
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(`edit-${Object.keys(nextErrors)[0]}`)?.focus();
      toast.error("Please check the highlighted fields.");
      return;
    }

    saveLock.current = true;
    setIsSaving(true);
    try {
      const changedFields = Object.fromEntries(
        Object.entries(values).filter(
          ([field, value]) =>
            value !== originalValues[field as keyof ManagedEventFormValues],
        ),
      ) as Partial<ManagedEventFormValues>;

      if (Object.keys(changedFields).length === 0) {
        toast.success("No changes to save.");
        onClose();
        return;
      }

      await updateManagedEvent(event._id, {
        ...changedFields,
        ...(changedFields.title ? { title: changedFields.title.trim() } : {}),
        ...(changedFields.description
          ? { description: changedFields.description.trim() }
          : {}),
        ...(changedFields.imageUrl
          ? { imageUrl: changedFields.imageUrl.trim() }
          : {}),
        ...(changedFields.location
          ? { location: changedFields.location.trim() }
          : {}),
      });
      toast.success("Event details updated.");
      onClose();
      await onSaved();
    } catch (error) {
      if (isManagedEventsUnauthorized(error)) {
        toast.error("Your session has expired. Please sign in again.");
        router.replace(
          `/login?callbackURL=${encodeURIComponent("/manage-events")}`,
        );
        return;
      }

      if (
        error instanceof ManagedEventsApiError &&
        error.details?.length
      ) {
        const serverErrors: FormErrors = {};
        for (const detail of error.details) {
          if (detail.path in values) {
            serverErrors[detail.path as keyof ManagedEventFormValues] =
              detail.message;
          }
        }
        setErrors((current) => ({ ...current, ...serverErrors }));
      }

      const message = getManagedEventsErrorMessage(
        error,
        "We couldn’t save your changes. Please try again.",
      );
      setFormError(message);
      toast.error(message);
      if (error instanceof ManagedEventsApiError && error.status === 404) {
        onClose();
        await onSaved();
      }
    } finally {
      saveLock.current = false;
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-5">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close edit event dialog"
        onClick={isSaving ? undefined : onClose}
        className="fixed inset-0 bg-brand-forest/65 backdrop-blur-sm"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-event-title"
        onKeyDown={(keyEvent) => {
          if (keyEvent.key === "Escape") {
            if (!isSaving) onClose();
            return;
          }
          trapDialogFocus(keyEvent);
        }}
        tabIndex={-1}
        className="relative z-[81] my-auto flex max-h-[min(92vh,56rem)] w-full max-w-5xl flex-col overflow-hidden rounded-t-[1.75rem] border border-border bg-surface shadow-2xl sm:rounded-[1.75rem]"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-border bg-background px-5 py-4 sm:px-7 sm:py-5">
          <div>
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.15em] text-muted">
              Update your event
            </p>
            <h2
              id="edit-event-title"
              className="mt-1 line-clamp-2 font-display text-xl font-bold tracking-tight sm:text-2xl"
            >
              {event.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close edit event dialog"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:opacity-50"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </header>

        <div className="overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-busy={isSaving}
            className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_19rem]"
          >
            <div className="space-y-4 px-5 py-5 sm:px-7 sm:py-6">
              <div>
                <label
                  htmlFor="edit-title"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Event title <span aria-hidden="true">*</span>
                </label>
                <input
                  ref={titleRef}
                  autoFocus
                  id="edit-title"
                  value={values.title}
                  onChange={(changeEvent) =>
                    updateField("title", changeEvent.target.value)
                  }
                  onBlur={() => handleBlur("title")}
                  maxLength={120}
                  required
                  aria-invalid={Boolean(errors.title)}
                  className={inputClass(Boolean(errors.title))}
                />
                <InlineError>{errors.title}</InlineError>
              </div>

              <div>
                <label
                  htmlFor="edit-description"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Description <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="edit-description"
                  value={values.description}
                  onChange={(changeEvent) =>
                    updateField("description", changeEvent.target.value)
                  }
                  onBlur={() => handleBlur("description")}
                  rows={4}
                  maxLength={5000}
                  required
                  aria-invalid={Boolean(errors.description)}
                  className={`w-full resize-y rounded-xl border bg-background px-3.5 py-3 text-sm leading-6 text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 ${
                    errors.description ? "border-red-500/70" : "border-border"
                  }`}
                />
                <div className="mt-1 flex items-center justify-between gap-3">
                  <InlineError>{errors.description}</InlineError>
                  <span className="shrink-0 text-[0.68rem] text-muted">
                    {values.description.length}/5,000
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="edit-category"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Category <span aria-hidden="true">*</span>
                </label>
                <select
                  id="edit-category"
                  value={values.category}
                  onChange={(changeEvent) =>
                    updateField(
                      "category",
                      changeEvent.target.value as ManagedEventCategory,
                    )
                  }
                  onBlur={() => handleBlur("category")}
                  required
                  aria-invalid={Boolean(errors.category)}
                  className={inputClass(Boolean(errors.category))}
                >
                  {managedEventCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <InlineError>{errors.category}</InlineError>
              </div>

              <div>
                <label
                  htmlFor="edit-imageUrl"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Image URL <span aria-hidden="true">*</span>
                </label>
                <span className="relative block">
                  <ImageIcon
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                  <input
                    id="edit-imageUrl"
                    type="url"
                    inputMode="url"
                    value={values.imageUrl}
                    onChange={(changeEvent) =>
                      updateField("imageUrl", changeEvent.target.value)
                    }
                    onBlur={() => handleBlur("imageUrl")}
                    required
                    aria-invalid={Boolean(errors.imageUrl)}
                    placeholder="https://example.com/event.jpg"
                    className={`${inputClass(Boolean(errors.imageUrl))} pl-10`}
                  />
                </span>
                <InlineError>{errors.imageUrl}</InlineError>
              </div>

              <div>
                <label
                  htmlFor="edit-location"
                  className="mb-1.5 block text-sm font-semibold"
                >
                  Location <span aria-hidden="true">*</span>
                </label>
                <span className="relative block">
                  <MapPin
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                  <input
                    id="edit-location"
                    value={values.location}
                    onChange={(changeEvent) =>
                      updateField("location", changeEvent.target.value)
                    }
                    onBlur={() => handleBlur("location")}
                    maxLength={250}
                    required
                    aria-invalid={Boolean(errors.location)}
                    className={`${inputClass(Boolean(errors.location))} pl-10`}
                  />
                </span>
                <InlineError>{errors.location}</InlineError>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="edit-eventDate"
                    className="mb-1.5 block text-sm font-semibold"
                  >
                    Event date <span aria-hidden="true">*</span>
                  </label>
                  <span className="relative block">
                    <CalendarDays
                      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
                      aria-hidden="true"
                    />
                    <input
                      id="edit-eventDate"
                      type="date"
                      min={getTomorrowInBangladesh()}
                      value={values.eventDate}
                      onChange={(changeEvent) =>
                        updateField("eventDate", changeEvent.target.value)
                      }
                      onBlur={() => handleBlur("eventDate")}
                      required
                      aria-invalid={Boolean(errors.eventDate)}
                      className={`${inputClass(Boolean(errors.eventDate))} pl-10`}
                    />
                  </span>
                  <InlineError>{errors.eventDate}</InlineError>
                </div>
                <div>
                  <label
                    htmlFor="edit-eventTime"
                    className="mb-1.5 block text-sm font-semibold"
                  >
                    Event time <span aria-hidden="true">*</span>
                  </label>
                  <span className="relative block">
                    <Clock3
                      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
                      aria-hidden="true"
                    />
                    <input
                      id="edit-eventTime"
                      type="time"
                      value={values.eventTime}
                      onChange={(changeEvent) =>
                        updateField("eventTime", changeEvent.target.value)
                      }
                      onBlur={() => handleBlur("eventTime")}
                      required
                      aria-invalid={Boolean(errors.eventTime)}
                      className={`${inputClass(Boolean(errors.eventTime))} pl-10`}
                    />
                  </span>
                  <InlineError>{errors.eventTime}</InlineError>
                </div>
              </div>

              {formError ? (
                <p
                  role="alert"
                  className="rounded-xl border border-red-500/25 bg-red-500/5 px-3.5 py-3 text-sm leading-5 text-red-800 dark:text-red-200"
                >
                  {formError}
                </p>
              ) : null}

              <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
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
                    <LoaderCircle
                      className="size-4 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <Save className="size-4" aria-hidden="true" />
                  )}
                  {isSaving ? "Saving…" : "Save changes"}
                </Button>
              </div>
            </div>

            <aside className="border-t border-border bg-background p-5 lg:border-l lg:border-t-0">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.15em] text-muted">
                Live preview
              </p>
              <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                <div className="relative aspect-[16/10] bg-surface-muted">
                  {validImageURL && !imageFailed ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={values.imageUrl.trim()}
                      alt={`Preview for ${values.title || event.title}`}
                      onError={() => setImageFailed(true)}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label="Event image preview unavailable"
                      className="flex size-full items-center justify-center bg-brand-forest text-brand-amber"
                    >
                      <ImageIcon className="size-10" aria-hidden="true" />
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full border border-white/50 bg-background/95 px-3 py-1.5 text-[0.68rem] font-bold text-foreground shadow-sm">
                    {values.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 font-display text-base font-bold">
                    {values.title || "Your event title"}
                  </h3>
                  <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-xs leading-5 text-muted">
                    {values.description || "Your event description"}
                  </p>
                  <div className="mt-3 space-y-2 border-t border-border pt-3 text-xs text-muted">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="size-3.5 text-primary" aria-hidden="true" />
                      {formatDate(values.eventDate)}
                      {values.eventTime ? ` · ${values.eventTime}` : ""}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                      <span className="truncate">{values.location || "Event location"}</span>
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-muted">
                <Check
                  className="mt-0.5 size-3.5 shrink-0 text-brand-forest dark:text-brand-amber"
                  aria-hidden="true"
                />
                Changes are saved to this event only.
              </p>
            </aside>
          </form>
        </div>
      </section>
    </div>
  );
}
