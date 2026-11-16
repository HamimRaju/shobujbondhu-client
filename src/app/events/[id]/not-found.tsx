import { ArrowLeft, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function EventNotFound() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex max-w-2xl flex-col items-center text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-surface-muted text-foreground">
          <Leaf className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-muted">
          Event not found
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          This event has moved on.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          We couldn’t find that event in the current listings. Explore the
          upcoming events to find another way to get involved.
        </p>
        <Button href="/events" className="mt-7">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to events
        </Button>
      </Container>
    </section>
  );
}
