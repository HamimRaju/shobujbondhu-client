import { ArrowRight, Leaf, Sprout, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { heroMedia } from "@/config/home-media";
import { startInitiativeLink } from "@/config/navigation";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-surface-muted opacity-70 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted">
            <Leaf className="size-4" aria-hidden="true" />
            Community volunteering across Bangladesh
          </p>

          <h1 id="hero-title" className="mt-6">
            <span
              lang="bn"
              className="block text-4xl font-bold leading-[1.3] tracking-tight sm:text-5xl lg:text-6xl"
            >
              একসাথে গড়ি{" "}
              <span className="rounded-lg bg-surface-muted px-2">সবুজ,</span>{" "}
              সুন্দর বাংলাদেশ।
            </span>
            <span className="mt-4 block font-display text-xl font-semibold tracking-tight text-muted sm:text-2xl">
              Together, let&rsquo;s grow a greener, more beautiful Bangladesh.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg">
            Find volunteering events near you, join your neighbours, or start an
            initiative of your own, from tree planting to clean-ups and learning
            circles.
          </p>
          <p
            lang="bn"
            className="mt-3 max-w-xl text-pretty text-base leading-7 text-muted"
          >
            আপনার এলাকার স্বেচ্ছাসেবী উদ্যোগ খুঁজুন, যোগ দিন, অথবা নিজেই শুরু করুন।
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/events" size="lg">
              Explore Events
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href={startInitiativeLink.href} size="lg" variant="outline">
              <Sprout className="size-4" aria-hidden="true" />
              {startInitiativeLink.label}
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <PhotoFrame
            image={heroMedia.main}
            icon={TreePine}
            tone="forest"
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="aspect-[4/5] w-full rounded-[2rem] shadow-xl"
            slotHint="hero-main.jpg"
          />
          <div className="absolute -bottom-6 -left-4 w-36 sm:-left-8 sm:w-44">
            <PhotoFrame
              image={heroMedia.secondary}
              icon={Sprout}
              tone="amber"
              sizes="176px"
              className="aspect-square w-full rounded-2xl border-4 border-background shadow-lg"
              slotHint="hero-secondary.jpg"
            />
          </div>
          <div className="absolute -right-2 top-6 hidden items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2 text-sm font-semibold shadow-md sm:flex">
            <Leaf className="size-4 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
            Volunteer. Organise. Grow.
          </div>
        </div>
      </Container>
    </section>
  );
}
