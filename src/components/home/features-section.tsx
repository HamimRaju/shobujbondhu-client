import {
  ClipboardCheck,
  Search,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type Feature = { title: string; description: string; icon: LucideIcon };

const features: Feature[] = [
  {
    title: "Discover events near you",
    description:
      "Browse volunteering opportunities by place and cause, so finding something close to home is simple.",
    icon: Search,
  },
  {
    title: "Start an initiative",
    description:
      "Turn an idea for your neighbourhood into an organised event that others can find and join.",
    icon: Sprout,
  },
  {
    title: "Coordinate with volunteers",
    description:
      "Share clear details such as time, place and what to bring, so everyone arrives prepared.",
    icon: Users,
  },
  {
    title: "Keep progress visible",
    description:
      "Organisers can share what happened after an event, so communities see real outcomes.",
    icon: ClipboardCheck,
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative isolate scroll-mt-20 overflow-hidden bg-brand-forest py-9 text-brand-ivory sm:py-11"
    >
      <Sprout
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 top-1/2 hidden size-36 -translate-y-1/2 -rotate-[38deg] text-brand-amber/45 xl:block"
        strokeWidth={1.1}
      />
      <Sprout
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-1/2 hidden size-36 -translate-y-1/2 rotate-[38deg] text-brand-amber/45 xl:block"
        strokeWidth={1.1}
      />
      <Container className="relative">
        <h2 id="features-title" className="sr-only">
          Local volunteering, made simpler
        </h2>
        <p className="sr-only">
          ShobujBondhu is being built to make community action easier to find,
          organise and follow through.
        </p>

        <ul className="grid gap-x-7 gap-y-7 sm:grid-cols-2 xl:grid-cols-4">
          {features.map(({ title, description, icon: Icon }, index) => (
            <li key={title}>
              <Reveal className="h-full" delay={index * 0.06}>
                <div className="flex h-full items-start gap-3.5 sm:gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-ivory text-brand-forest shadow-[0_5px_18px_-8px_rgba(0,0,0,0.5)] sm:size-12">
                    <Icon
                      className="size-5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold leading-snug tracking-tight sm:text-base">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-5 text-brand-ivory/75 sm:text-[0.8rem]">
                      {description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
