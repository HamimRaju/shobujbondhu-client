import {
  ClipboardCheck,
  Search,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

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
      className="scroll-mt-20 bg-surface-muted py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="features-title"
          eyebrow="How it helps"
          title="Local volunteering, made simpler"
          description="ShobujBondhu is being built to make community action easier to find, organise and follow through."
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, icon: Icon }, index) => (
            <li key={title}>
              <Reveal className="h-full" delay={index * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
