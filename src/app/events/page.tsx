import type { Metadata } from "next";
import { ArrowDown, Leaf, Sprout, TreePine } from "lucide-react";
import { EventsBrowser } from "@/components/events/events-browser";
import { Container } from "@/components/ui/container";
import { upcomingEvents } from "@/data/upcoming-events";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description:
    "Explore sample community volunteering events across Bangladesh, from tree planting and clean-ups to local donation drives.",
};

export default function EventsPage() {
  return (
    <>
      <section
        aria-labelledby="events-page-title"
        className="relative isolate overflow-hidden bg-brand-forest text-brand-ivory"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-48 size-[34rem] rounded-full border border-brand-sage/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-32 size-[22rem] rounded-full border border-brand-amber/25"
        />
        <Container className="relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:gap-16 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.17em] text-brand-sage sm:text-sm">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand-sage/10 text-brand-amber ring-1 ring-inset ring-brand-sage/20">
                <Leaf className="size-4" aria-hidden="true" />
              </span>
              Find your next good thing
            </p>
            <h1
              id="events-page-title"
              className="mt-7 max-w-3xl text-balance font-display text-4xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
            >
              Make room for
              <span className="block font-medium italic text-brand-sage">
                something good.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-brand-ivory/75 sm:text-lg sm:leading-8">
              Find a small way to show up for your community. Explore sample
              volunteer opportunities from neighbourhoods across Bangladesh.
            </p>
            <a
              href="#browse-events"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-sage/25 bg-brand-sage/10 px-5 text-sm font-semibold text-brand-ivory transition-colors hover:bg-brand-sage/20"
            >
              Browse events
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 size-20 rounded-full border border-brand-amber/60 sm:-right-5 sm:-top-5 sm:size-28"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-brand-sage/20 bg-brand-forest p-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)] sm:p-9">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#dce9d8_1px,transparent_0)] [background-size:20px_20px]"
              />
              <div className="relative flex aspect-[1.2] flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-amber text-brand-forest">
                    <Sprout className="size-6" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-brand-sage/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-sage">
                    Neighbour to neighbour
                  </span>
                </div>
                <div className="relative">
                  <TreePine
                    className="absolute -bottom-10 right-0 size-40 text-brand-sage/15 sm:size-48"
                    strokeWidth={1}
                    aria-hidden="true"
                  />
                  <p className="relative max-w-[15ch] font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                    Every good change starts close to home.
                  </p>
                  <div className="relative mt-5 h-px w-16 bg-brand-amber" />
                  <p className="relative mt-4 text-sm text-brand-sage/80">
                    Find your people. Start where you are.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="browse-events"
        aria-labelledby="browse-events-title"
        className="scroll-mt-24 py-12 sm:py-16 lg:py-20"
      >
        <Container>
          <div className="mb-8 flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                Good things are growing
              </p>
              <h2
                id="browse-events-title"
                className="mt-2 text-3xl font-bold tracking-[-0.035em] sm:text-4xl"
              >
                Upcoming events
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                Search by event or place, then find an opportunity that feels
                right for you.
              </p>
            </div>
            <p className="max-w-md rounded-xl border border-border bg-surface-muted px-4 py-3 text-xs leading-5 text-muted sm:text-sm">
              <span className="font-semibold text-foreground">Preview listings.</span>{" "}
              These fictional examples are for layout preview only; registration
              is not available yet.
            </p>
          </div>

          <EventsBrowser events={upcomingEvents} />
        </Container>
      </section>
    </>
  );
}
