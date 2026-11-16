import { ArrowRight, Leaf, Sprout, TreePine, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { galleryItems, heroMedia } from "@/config/home-media";
import { startInitiativeLink } from "@/config/navigation";

const collageItems = [
  {
    image: heroMedia.main,
    icon: TreePine,
    tone: "forest" as const,
    slotHint: "hero-main.jpg",
  },
  {
    image: heroMedia.secondary,
    icon: Waves,
    tone: "sage" as const,
    slotHint: "hero-secondary.jpg",
  },
  ...galleryItems.slice(0, 2).map((item) => ({
    image: item.image,
    icon: item.icon,
    tone: item.tone,
    slotHint: `gallery-${item.id}.jpg`,
  })),
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden py-5 sm:py-8"
    >
      <Container>
        <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-border/70 bg-background shadow-[0_26px_75px_-46px_rgba(18,59,45,0.6)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(#123b2d_0.65px,transparent_0.65px)] [background-size:14px_14px] dark:opacity-15"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-28 -z-10 size-80 rounded-full bg-brand-sage/60 blur-3xl dark:bg-brand-forest"
          />

          <div className="grid items-center gap-8 px-5 py-8 sm:gap-10 sm:px-9 sm:py-10 lg:min-h-[29rem] lg:grid-cols-[1.04fr_0.96fr] lg:gap-5 lg:px-12 lg:py-9">
            <div className="relative z-10 max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-amber/40 bg-background/80 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-brand-forest shadow-sm">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-brand-amber/20">
                  <Leaf className="size-3" aria-hidden="true" />
                </span>
                Community-led change in Bangladesh
              </p>

              <h1 id="hero-title" className="mt-5">
                <span
                  lang="bn"
                  className="font-bengali-display block max-w-[14ch] text-[clamp(2.5rem,5.8vw,4.5rem)] font-bold leading-[1.3] tracking-normal text-brand-forest dark:text-foreground"
                >
                  একসাথে গড়ি{" "}
                  <span className="relative z-0 mx-1 inline-block whitespace-nowrap text-primary">
                    সবুজ,
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 -z-10 h-[0.2em] w-full rounded-full bg-brand-amber"
                    />
                  </span>{" "}
                  সুন্দর বাংলাদেশ।
                </span>
                <span className="mt-3 block font-display text-lg font-bold leading-snug tracking-tight text-muted sm:text-xl">
                  Together, let&rsquo;s grow a greener, more beautiful Bangladesh.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-pretty text-sm leading-6 text-muted sm:text-base sm:leading-7">
                Find volunteering events near you, join your neighbours, or
                start an initiative of your own, from tree planting to clean-ups
                and learning circles.
              </p>
              <p
                lang="bn"
                className="mt-2 max-w-xl text-pretty text-sm leading-7 text-muted sm:text-base"
              >
                আপনার এলাকার স্বেচ্ছাসেবী উদ্যোগ খুঁজুন, যোগ দিন, অথবা নিজেই শুরু করুন।
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/events" size="lg" className="group w-full sm:w-auto">
                  Explore Events
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
                <Button
                  href={startInitiativeLink.href}
                  size="lg"
                  variant="outline"
                  className="w-full border-border/80 bg-surface/70 sm:w-auto"
                >
                  <Sprout className="size-4" aria-hidden="true" />
                  {startInitiativeLink.label}
                </Button>
              </div>
              <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted/80">
                Find your people. Start where you are.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[34rem] px-2 py-2 sm:px-5 lg:px-0">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rotate-[5deg] bg-brand-amber [clip-path:polygon(7%_5%,93%_0,100%_12%,96%_88%,87%_100%,5%_95%,0_14%)] sm:-inset-3"
              />
              <div className="relative grid aspect-[1.08/1] grid-cols-2 grid-rows-2 gap-2 p-2.5 sm:gap-3 sm:p-3.5 lg:rotate-[2deg]">
                {collageItems.map(({ image, icon, tone, slotHint }) => (
                  <PhotoFrame
                    key={slotHint}
                    image={image}
                    icon={icon}
                    tone={tone}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 88vw"
                    priority={slotHint === "hero-main.jpg"}
                    className="group h-full min-h-0 rounded-[1.1rem] border-[3px] border-brand-amber shadow-[0_12px_25px_-14px_rgba(18,59,45,0.65)] sm:rounded-[1.4rem] sm:border-4"
                    slotHint={slotHint}
                  />
                ))}
              </div>
              <div className="absolute -bottom-1 -left-2 hidden items-center gap-2 rounded-full border border-border/70 bg-background/95 px-3 py-2 text-xs font-bold shadow-lg sm:flex lg:-left-6">
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-sage text-brand-forest">
                  <Sprout className="size-4" aria-hidden="true" />
                </span>
                Neighbours growing a stronger Bangladesh.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
