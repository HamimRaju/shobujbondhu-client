import { Container } from "@/components/ui/container";

type ProtectedPageSkeletonProps = {
  variant: "create-event" | "manage-events" | "profile";
};

const loadingLabels = {
  "create-event": "Loading the event form",
  "manage-events": "Loading your events",
  profile: "Loading your profile",
} satisfies Record<ProtectedPageSkeletonProps["variant"], string>;

export function ProtectedPageSkeleton({
  variant,
}: ProtectedPageSkeletonProps) {
  const containerClass =
    variant === "profile"
      ? "max-w-3xl"
      : variant === "manage-events"
        ? "max-w-7xl"
        : "max-w-7xl";

  return (
    <section
      role="status"
      aria-label={loadingLabels[variant]}
      className="py-8 sm:py-12 lg:py-16"
    >
      <span className="sr-only">{loadingLabels[variant]}</span>
      <Container className={containerClass}>
        {variant === "profile" ? (
          <div
            aria-hidden="true"
            className="animate-pulse overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-sm"
          >
            <div className="h-36 bg-brand-forest/90 p-6 sm:h-40 sm:p-9">
              <div className="h-3 w-32 rounded-full bg-brand-ivory/20" />
              <div className="mt-5 h-8 w-52 max-w-full rounded-lg bg-brand-ivory/20" />
              <div className="mt-3 h-3 w-64 max-w-full rounded-full bg-brand-ivory/15" />
            </div>
            <div className="p-5 sm:p-9">
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <div className="size-16 shrink-0 rounded-full bg-surface-muted sm:size-20" />
                <div className="min-w-0 flex-1">
                  <div className="h-5 w-48 max-w-full rounded-full bg-surface-muted" />
                  <div className="mt-3 h-3 w-56 max-w-full rounded-full bg-surface-muted" />
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="h-24 rounded-2xl bg-surface-muted" />
                <div className="h-24 rounded-2xl bg-surface-muted" />
                <div className="h-24 rounded-2xl bg-surface-muted sm:col-span-2" />
              </div>
            </div>
          </div>
        ) : variant === "manage-events" ? (
          <>
            <div
              aria-hidden="true"
              className="animate-pulse border-b border-border pb-7 sm:pb-9"
            >
              <div className="h-4 w-40 rounded-full bg-surface-muted" />
              <div className="mt-5 h-10 w-72 max-w-full rounded-lg bg-surface-muted" />
              <div className="mt-4 h-4 w-full max-w-xl rounded-full bg-surface-muted" />
            </div>
            <div
              aria-hidden="true"
              className="mt-7 grid animate-pulse gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-3xl border border-border bg-surface"
                >
                  <div className="aspect-[16/10] bg-surface-muted" />
                  <div className="space-y-4 p-5">
                    <div className="h-5 w-4/5 rounded-full bg-surface-muted" />
                    <div className="h-3 w-full rounded-full bg-surface-muted" />
                    <div className="h-3 w-2/3 rounded-full bg-surface-muted" />
                    <div className="h-10 rounded-xl bg-surface-muted" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div aria-hidden="true" className="animate-pulse">
              <div className="h-3 w-40 rounded-full bg-surface-muted" />
              <div className="mt-5 h-10 w-full max-w-2xl rounded-lg bg-surface-muted" />
              <div className="mt-4 h-4 w-full max-w-xl rounded-full bg-surface-muted" />
            </div>
            <div
              aria-hidden="true"
              className="mt-8 grid animate-pulse items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.72fr)]"
            >
              <div className="space-y-6 rounded-[1.75rem] border border-border bg-surface p-5 sm:p-8">
                <div className="h-5 w-40 rounded-full bg-surface-muted" />
                <div className="h-12 rounded-xl bg-surface-muted" />
                <div className="h-32 rounded-xl bg-surface-muted" />
                <div className="h-12 rounded-xl bg-surface-muted" />
                <div className="h-24 rounded-xl bg-surface-muted" />
              </div>
              <div className="space-y-4 rounded-[1.75rem] border border-border bg-surface p-5">
                <div className="aspect-[16/10] rounded-2xl bg-surface-muted" />
                <div className="h-5 w-4/5 rounded-full bg-surface-muted" />
                <div className="h-3 w-full rounded-full bg-surface-muted" />
              </div>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
