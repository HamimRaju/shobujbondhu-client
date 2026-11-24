import { Suspense } from "react";
import { EventCardSkeleton } from "@/components/events/event-card-skeleton";
import { EventsPreviewSection } from "@/components/home/events-preview-section";
import { FeaturesSection } from "@/components/home/features-section";
import { GallerySection } from "@/components/home/gallery-section";
import { Hero } from "@/components/home/hero";
import { ImpactSection } from "@/components/home/impact-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { Container } from "@/components/ui/container";

function EventsPreviewFallback() {
  return (
    <section aria-label="Loading upcoming events" className="py-16 sm:py-24">
      <span className="sr-only">Loading upcoming events</span>
      <Container>
        <div className="h-10 w-full max-w-lg animate-pulse rounded-xl bg-surface-muted" />
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => (
            <li key={index}>
              <EventCardSkeleton />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <Suspense fallback={<EventsPreviewFallback />}>
        <EventsPreviewSection />
      </Suspense>
      <ImpactSection />
      <GallerySection />
      <NewsletterSection />
    </>
  );
}
