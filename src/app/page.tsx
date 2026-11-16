import { EventsPreviewSection } from "@/components/home/events-preview-section";
import { FeaturesSection } from "@/components/home/features-section";
import { GallerySection } from "@/components/home/gallery-section";
import { Hero } from "@/components/home/hero";
import { ImpactSection } from "@/components/home/impact-section";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <EventsPreviewSection />
      <ImpactSection />
      <GallerySection />
      <NewsletterSection />
    </>
  );
}
