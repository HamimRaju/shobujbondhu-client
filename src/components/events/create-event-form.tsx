"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Image as ImageIcon,
  Leaf,
  LoaderCircle,
  MapPin,
  ShieldCheck,
  Sparkles,
  Sprout,
} from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Container } from "@/components/ui/container";
import { authServerURL } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const categories = [
  "Tree Plantation",
  "Cleanup",
  "Blood Donation",
  "Food Distribution",
  "Winter Donation",
  "Community Support",
] as const;

type EventCategory = (typeof categories)[number];

type EventFormValues = {
  title: string;
  description: string;
  category: EventCategory | "";
  imageUrl: string;
  location: string;
  eventDate: string;
  eventTime: string;
};

type EventField = keyof EventFormValues;
type EventFieldErrors = Partial<Record<EventField, string>>;

type CreateEventFormProps = {
  creatorName: string;
  creatorEmail: string;
};

const initialValues: EventFormValues = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  location: "",
  eventDate: "",
  eventTime: "",
};

function getTodayUTC() {
  return new Date().toISOString().slice(0, 10);
}

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

function validateDate(value: string) {
  if (!value) return "Choose an event date.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return "Enter a valid event date.";
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return "Enter a valid event date.";
  }
  if (value < getTodayUTC()) return "Event date cannot be in the past.";
  return undefined;
}

function validateField(field: EventField, value: string) {
  switch (field) {
    case "title":
      if (!value.trim()) return "Add a title for your event.";
      if (value.trim().length > 120) return "Keep the title under 120 characters.";
      return undefined;
    case "description":
      if (!value.trim()) return "Tell people what this event is about.";
      if (value.trim().length > 5000) {
        return "Keep the description under 5,000 characters.";
      }
      return undefined;
    case "category":
      return categories.includes(value as EventCategory)
        ? undefined
        : "Choose an event category.";
    case "imageUrl":
      if (!value.trim()) return "Add an image URL for your event.";
      return isValidImageURL(value)
        ? undefined
        : "Enter a valid image URL using HTTP or HTTPS.";
    case "location":
      if (!value.trim()) return "Add a location for your event.";
      if (value.trim().length > 250) {
        return "Keep the location under 250 characters.";
      }
      return undefined;
    case "eventDate":
      return validateDate(value);
    case "eventTime":
      if (!value) return "Choose an event time.";
      return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value)
        ? undefined
        : "Enter a valid event time.";
  }
}

function validateForm(values: EventFormValues): EventFieldErrors {
  const errors: EventFieldErrors = {};
  (Object.keys(values) as EventField[]).forEach((field) => {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  });
  return errors;
}

function getCreatedEventId(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null) return null;
  const data = (payload as { data?: unknown }).data;
  if (typeof data !== "object" || data === null) return null;
  const event = (data as { event?: unknown }).event;
  if (typeof event !== "object" || event === null) return null;
  const id = (event as { _id?: unknown })._id;
  return typeof id === "string" && id.trim() ? id : null;
}

function getApiError(payload: unknown) {
  if (typeof payload !== "object" || payload === null) return null;
  const error = (payload as { error?: unknown }).error;
  if (typeof error !== "object" || error === null) return null;
  return error as {
    message?: unknown;
    details?: unknown;
  };
}

function formatDate(value: string) {
  if (!value) return "Your event date";
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("en-BD", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function fieldClass(hasError: boolean) {
  return `h-12 w-full rounded-xl border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted/75 focus:border-primary focus:ring-4 focus:ring-primary/10 ${
    hasError ? "border-red-500/70" : "border-border"
  }`;
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 text-xs font-medium text-red-700 dark:text-red-300">
      {children}
    </p>
  );
}

export function CreateEventForm({
  creatorName,
  creatorEmail,
}: CreateEventFormProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const submitLock = useRef(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<EventFieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const imageURLIsValid = isValidImageURL(values.imageUrl);

  function updateField<K extends EventField>(
    field: K,
    value: EventFormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setFormError("");
    if (field === "imageUrl") setImageFailed(false);
    setErrors((current) => {
      if (!current[field]) return current;
      const error = validateField(field, value);
      return { ...current, [field]: error };
    });
  }

  function handleBlur(field: EventField) {
    const error = validateField(field, values[field]);
    setErrors((current) => ({ ...current, [field]: error }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current) return;

    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0];
      document.getElementById(firstInvalidField)?.focus();
      toast.error("Please check the highlighted fields.");
      return;
    }

    if (!authServerURL) {
      const message =
        "Event services are not configured. Set NEXT_PUBLIC_BETTER_AUTH_URL to your server origin.";
      setFormError(message);
      toast.error(message);
      return;
    }

    submitLock.current = true;
    setIsSubmitting(true);

    try {
      const response = await fetch(new URL("/api/events", authServerURL), {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title.trim(),
          description: values.description.trim(),
          category: values.category,
          imageUrl: values.imageUrl.trim(),
          location: values.location.trim(),
          eventDate: values.eventDate,
          eventTime: values.eventTime,
        }),
      });
      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const apiError = getApiError(payload);
        const message =
          typeof apiError?.message === "string"
            ? apiError.message
            : "We couldn’t create your event. Please try again.";

        if (response.status === 401) {
          toast.error("Your session has expired. Please sign in again.");
          router.replace(
            `/login?callbackURL=${encodeURIComponent("/create-event")}`,
          );
          return;
        }

        if (Array.isArray(apiError?.details)) {
          const serverErrors: EventFieldErrors = {};
          for (const detail of apiError.details) {
            if (
              typeof detail === "object" &&
              detail !== null &&
              "path" in detail &&
              "message" in detail &&
              typeof detail.path === "string" &&
              typeof detail.message === "string" &&
              detail.path in initialValues
            ) {
              serverErrors[detail.path as EventField] = detail.message;
            }
          }
          setErrors((current) => ({ ...current, ...serverErrors }));
        }

        setFormError(message);
        toast.error(message);
        return;
      }

      const eventId = getCreatedEventId(payload);
      if (!eventId) {
        const message =
          "The event was submitted, but its details link could not be confirmed. Please check your events.";
        setFormError(message);
        toast.error(message);
        return;
      }

      toast.success("Your community event has been created.");
      router.push(`/events/${encodeURIComponent(eventId)}`);
    } catch {
      const message =
        "We couldn’t reach the event service. Check your connection and try again.";
      setFormError(message);
      toast.error(message);
    } finally {
      submitLock.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative isolate overflow-hidden py-8 sm:py-12 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-8 -z-10 size-[30rem] rounded-full bg-brand-sage/50 blur-3xl dark:bg-brand-forest/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[34rem] -z-10 size-[28rem] rounded-full bg-brand-amber/10 blur-3xl"
      />

      <Container className="max-w-7xl">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to events
        </Link>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.72fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-muted shadow-sm">
              <Sprout
                className="size-3.5 text-brand-forest dark:text-brand-amber"
                aria-hidden="true"
              />
              Start something good
            </p>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.08] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Make room for{" "}
              <span className="text-brand-forest dark:text-brand-amber">
                good things
              </span>{" "}
              to grow.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Bring your neighbours together around a simple idea. Share the
              details, invite your community, and turn a little effort into
              lasting impact.
            </p>
          </div>
          <div className="hidden justify-self-end rounded-3xl border border-border bg-surface/80 p-5 shadow-sm sm:flex sm:max-w-sm sm:items-start sm:gap-4">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-sage text-brand-forest dark:bg-brand-amber/15 dark:text-brand-amber">
              <Leaf className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-sm font-bold">
                Every local action counts
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                Thoughtful details help people feel welcome and ready to join.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid items-start gap-6 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.72fr)] lg:gap-8">
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            aria-busy={isSubmitting}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            className="min-w-0 overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[0_28px_80px_-48px_rgba(18,59,45,0.45)]"
          >
            <div className="border-b border-border bg-surface/80 px-5 py-5 sm:px-8 sm:py-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-muted">
                    Create an event
                  </p>
                  <h2 className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl">
                    The details that bring it to life
                  </h2>
                </div>
                <span className="hidden size-11 items-center justify-center rounded-2xl bg-brand-forest text-brand-ivory sm:inline-flex">
                  <Sparkles className="size-5 text-brand-amber" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">
                Fields marked with <span className="font-bold text-foreground">*</span>{" "}
                are required.
              </p>
            </div>

            <div className="space-y-8 px-5 py-6 sm:px-8 sm:py-8">
              <section aria-labelledby="event-basics-heading">
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-surface-muted text-foreground">
                    <span className="text-xs font-extrabold">01</span>
                  </span>
                  <div>
                    <h3
                      id="event-basics-heading"
                      className="font-display text-base font-bold"
                    >
                      Event basics
                    </h3>
                    <p className="mt-0.5 text-xs text-muted">
                      Tell your community what you’re planning.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Event title <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="title"
                      name="title"
                      value={values.title}
                      onChange={(event) => updateField("title", event.target.value)}
                      onBlur={() => handleBlur("title")}
                      maxLength={120}
                      required
                      aria-invalid={Boolean(errors.title)}
                      aria-describedby={errors.title ? "title-error" : "title-hint"}
                      placeholder="e.g. Green Dhaka: A neighbourhood tree-planting day"
                      className={fieldClass(Boolean(errors.title))}
                    />
                    <p id="title-hint" className="mt-2 text-xs text-muted">
                      Make it easy to understand at a glance.
                    </p>
                    <FieldError id="title-error">{errors.title}</FieldError>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Event description <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={values.description}
                      onChange={(event) =>
                        updateField("description", event.target.value)
                      }
                      onBlur={() => handleBlur("description")}
                      maxLength={5000}
                      required
                      rows={5}
                      aria-invalid={Boolean(errors.description)}
                      aria-describedby={
                        errors.description
                          ? "description-error"
                          : "description-hint"
                      }
                      placeholder="Share what you’ll do, who can join, and how this event will help your community."
                      className={`min-h-32 w-full resize-y rounded-xl border bg-background px-4 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted/75 focus:border-primary focus:ring-4 focus:ring-primary/10 ${
                        errors.description ? "border-red-500/70" : "border-border"
                      }`}
                    />
                    <div className="mt-2 flex items-start justify-between gap-4">
                      <p id="description-hint" className="text-xs leading-5 text-muted">
                        A few practical details can help people feel prepared.
                      </p>
                      <span className="shrink-0 text-[0.68rem] text-muted">
                        {values.description.length}/5,000
                      </span>
                    </div>
                    <FieldError id="description-error">
                      {errors.description}
                    </FieldError>
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Event category <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={values.category}
                      onChange={(event) =>
                        updateField(
                          "category",
                          event.target.value as EventFormValues["category"],
                        )
                      }
                      onBlur={() => handleBlur("category")}
                      required
                      aria-invalid={Boolean(errors.category)}
                      aria-describedby={
                        errors.category ? "category-error" : "category-hint"
                      }
                      className={`${fieldClass(Boolean(errors.category))} ${
                        values.category ? "" : "text-muted"
                      }`}
                    >
                      <option value="" disabled>
                        Choose the kind of action
                      </option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <p id="category-hint" className="mt-2 text-xs text-muted">
                      This helps neighbours find the right events.
                    </p>
                    <FieldError id="category-error">{errors.category}</FieldError>
                  </div>
                </div>
              </section>

              <section
                aria-labelledby="event-when-heading"
                className="border-t border-border pt-7"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-surface-muted text-foreground">
                    <span className="text-xs font-extrabold">02</span>
                  </span>
                  <div>
                    <h3
                      id="event-when-heading"
                      className="font-display text-base font-bold"
                    >
                      Where &amp; when
                    </h3>
                    <p className="mt-0.5 text-xs text-muted">
                      Give people a clear plan for joining.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="location"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Location <span aria-hidden="true">*</span>
                    </label>
                    <span className="relative block">
                      <MapPin
                        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
                        aria-hidden="true"
                      />
                      <input
                        id="location"
                        name="location"
                        value={values.location}
                        onChange={(event) =>
                          updateField("location", event.target.value)
                        }
                        onBlur={() => handleBlur("location")}
                        maxLength={250}
                        required
                        aria-invalid={Boolean(errors.location)}
                        aria-describedby={
                          errors.location ? "location-error" : "location-hint"
                        }
                        placeholder="e.g. Ramna Park, Dhaka"
                        className={`${fieldClass(Boolean(errors.location))} pl-11`}
                      />
                    </span>
                    <p id="location-hint" className="mt-2 text-xs text-muted">
                      Add a venue, neighbourhood, and city if you can.
                    </p>
                    <FieldError id="location-error">{errors.location}</FieldError>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="eventDate"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Event date <span aria-hidden="true">*</span>
                      </label>
                      <span className="relative block">
                        <CalendarDays
                          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
                          aria-hidden="true"
                        />
                        <input
                          id="eventDate"
                          name="eventDate"
                          type="date"
                          value={values.eventDate}
                          onFocus={(event) => {
                            event.currentTarget.min = getTodayUTC();
                          }}
                          onChange={(event) =>
                            updateField("eventDate", event.target.value)
                          }
                          onBlur={() => handleBlur("eventDate")}
                          required
                          aria-invalid={Boolean(errors.eventDate)}
                          aria-describedby={
                            errors.eventDate ? "eventDate-error" : "eventDate-hint"
                          }
                          className={`${fieldClass(Boolean(errors.eventDate))} pl-11`}
                        />
                      </span>
                      <p id="eventDate-hint" className="mt-2 text-xs text-muted">
                        Choose today or a future date.
                      </p>
                      <FieldError id="eventDate-error">
                        {errors.eventDate}
                      </FieldError>
                    </div>

                    <div>
                      <label
                        htmlFor="eventTime"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Event time <span aria-hidden="true">*</span>
                      </label>
                      <span className="relative block">
                        <Clock3
                          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
                          aria-hidden="true"
                        />
                        <input
                          id="eventTime"
                          name="eventTime"
                          type="time"
                          value={values.eventTime}
                          onChange={(event) =>
                            updateField("eventTime", event.target.value)
                          }
                          onBlur={() => handleBlur("eventTime")}
                          required
                          aria-invalid={Boolean(errors.eventTime)}
                          aria-describedby={
                            errors.eventTime ? "eventTime-error" : "eventTime-hint"
                          }
                          className={`${fieldClass(Boolean(errors.eventTime))} pl-11`}
                        />
                      </span>
                      <p id="eventTime-hint" className="mt-2 text-xs text-muted">
                        Local time at your event location.
                      </p>
                      <FieldError id="eventTime-error">
                        {errors.eventTime}
                      </FieldError>
                    </div>
                  </div>
                </div>
              </section>

              <section
                aria-labelledby="event-image-heading"
                className="border-t border-border pt-7"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-surface-muted text-foreground">
                    <span className="text-xs font-extrabold">03</span>
                  </span>
                  <div>
                    <h3
                      id="event-image-heading"
                      className="font-display text-base font-bold"
                    >
                      Event image
                    </h3>
                    <p className="mt-0.5 text-xs text-muted">
                      Add a welcoming cover photo for your event.
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="imageUrl"
                  className="mb-2 block text-sm font-semibold"
                >
                  Event image URL <span aria-hidden="true">*</span>
                </label>
                <span className="relative block">
                  <ImageIcon
                    className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                  />
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    inputMode="url"
                    value={values.imageUrl}
                    onChange={(event) =>
                      updateField("imageUrl", event.target.value)
                    }
                    onBlur={() => handleBlur("imageUrl")}
                    required
                    aria-invalid={Boolean(errors.imageUrl)}
                    aria-describedby={
                      errors.imageUrl ? "imageUrl-error" : "imageUrl-hint"
                    }
                    placeholder="https://example.com/community-event.jpg"
                    className={`${fieldClass(Boolean(errors.imageUrl))} pl-11`}
                  />
                </span>
                <p id="imageUrl-hint" className="mt-2 text-xs text-muted">
                  Use a publicly accessible image link (HTTP or HTTPS).
                </p>
                <FieldError id="imageUrl-error">{errors.imageUrl}</FieldError>
                {imageURLIsValid && imageFailed ? (
                  <p className="mt-2 text-xs font-medium text-amber-800 dark:text-amber-200">
                    This URL looks valid, but the image could not be loaded.
                  </p>
                ) : null}
              </section>

              <div className="border-t border-border pt-6">
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-4">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-sage text-brand-forest dark:bg-brand-amber/15 dark:text-brand-amber">
                    <ShieldCheck className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-muted">
                      Event creator
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-foreground">
                      {creatorName}
                    </p>
                    <p className="mt-0.5 break-all text-xs leading-5 text-muted">
                      {creatorEmail}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted">
                      This event will be created under your signed-in account.
                    </p>
                  </div>
                  <Check
                    className="ml-auto mt-1 size-4 shrink-0 text-brand-forest dark:text-brand-amber"
                    aria-label="Verified account"
                  />
                </div>
              </div>

              {formError ? (
                <p
                  role="alert"
                  className="rounded-xl border border-red-500/25 bg-red-500/5 px-4 py-3 text-sm leading-6 text-red-800 dark:text-red-200"
                >
                  {formError}
                </p>
              ) : null}

              <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/events"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/15 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                      Creating event…
                    </>
                  ) : (
                    <>
                      Create event
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.form>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[0_24px_70px_-42px_rgba(18,59,45,0.45)]">
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-muted">
                    Live preview
                  </p>
                  <h2 className="mt-1 font-display text-lg font-bold tracking-tight">
                    Your event card
                  </h2>
                </div>
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-amber/20 text-brand-forest dark:text-brand-amber">
                  <Sparkles className="size-4" aria-hidden="true" />
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-muted">
                  {imageURLIsValid && !imageFailed ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={values.imageUrl.trim()}
                      alt={
                        values.title.trim()
                          ? `Preview for ${values.title.trim()}`
                          : "Event image preview"
                      }
                      onError={() => setImageFailed(true)}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div
                      aria-label="Image preview unavailable"
                      role="img"
                      className="flex size-full flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(220,233,216,0.9),transparent_42%),linear-gradient(145deg,rgba(18,59,45,0.96),rgba(28,83,62,0.88))] px-6 text-center text-brand-ivory"
                    >
                      <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-brand-ivory/20 bg-brand-ivory/10 text-brand-amber">
                        <Sprout className="size-7" aria-hidden="true" />
                      </span>
                      <p className="mt-4 font-display text-sm font-bold">
                        Your event image
                      </p>
                      <p className="mt-1 max-w-56 text-xs leading-5 text-brand-ivory/70">
                        A valid image URL will appear here as you type.
                      </p>
                    </div>
                  )}
                  {values.category ? (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-background/95 px-3 py-1.5 text-[0.68rem] font-bold text-foreground shadow-sm backdrop-blur">
                      <Leaf
                        className="size-3.5 text-brand-forest dark:text-brand-amber"
                        aria-hidden="true"
                      />
                      {values.category}
                    </span>
                  ) : null}
                </div>

                <div className="px-1 pb-1 pt-5">
                  <h3 className="text-balance font-display text-xl font-bold leading-snug tracking-tight">
                    {values.title.trim() || "Your event title"}
                  </h3>
                  <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted">
                    {values.description.trim() ||
                      "A short description of your community event will show here."}
                  </p>
                  <div className="mt-4 space-y-2.5 border-t border-border pt-4 text-xs font-medium text-muted">
                    <p className="flex items-center gap-2">
                      <CalendarDays
                        className="size-4 shrink-0 text-brand-forest dark:text-brand-amber"
                        aria-hidden="true"
                      />
                      {formatDate(values.eventDate)}
                      {values.eventTime ? ` · ${values.eventTime}` : ""}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin
                        className="size-4 shrink-0 text-brand-forest dark:text-brand-amber"
                        aria-hidden="true"
                      />
                      <span className="truncate">
                        {values.location.trim() || "Your event location"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-brand-forest/10 bg-brand-sage/60 p-5 dark:border-border dark:bg-surface">
              <div className="flex items-start gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-forest text-brand-ivory dark:bg-brand-amber/15 dark:text-brand-amber">
                  <Leaf className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-bold">A thoughtful host makes a difference</h2>
                  <p className="mt-1.5 text-xs leading-5 text-muted">
                    Include clear directions, a realistic start time, and any
                    helpful details people need before they arrive.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 px-1 text-xs leading-5 text-muted">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0 text-brand-forest dark:text-brand-amber"
                aria-hidden="true"
              />
              <p>
                Your creator identity is verified from your signed-in account.
                It can’t be changed in this form.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs font-medium text-muted">
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand-sage text-brand-forest dark:bg-brand-amber/15 dark:text-brand-amber">
            <Check className="size-3.5" aria-hidden="true" />
          </span>
          Made for neighbours, by neighbours.
        </div>
      </Container>
    </section>
  );
}
