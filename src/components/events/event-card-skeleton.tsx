export function EventCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="flex h-full animate-pulse flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="aspect-[16/10] bg-surface-muted" />
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="h-3 w-32 rounded-full bg-surface-muted" />
        <div className="space-y-2">
          <div className="h-5 w-4/5 rounded-full bg-surface-muted" />
          <div className="h-5 w-2/3 rounded-full bg-surface-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded-full bg-surface-muted" />
          <div className="h-3 w-5/6 rounded-full bg-surface-muted" />
          <div className="h-3 w-2/3 rounded-full bg-surface-muted" />
        </div>
        <div className="mt-auto space-y-3 border-t border-border pt-4">
          <div className="h-3 w-3/4 rounded-full bg-surface-muted" />
          <div className="h-3 w-1/2 rounded-full bg-surface-muted" />
        </div>
        <div className="h-10 rounded-full bg-surface-muted" />
      </div>
    </article>
  );
}
