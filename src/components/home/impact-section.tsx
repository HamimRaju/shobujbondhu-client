import { Eye, FileCheck2, ShieldCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type Principle = { title: string; description: string; icon: LucideIcon };

const principles: Principle[] = [
  {
    title: "Recorded, not estimated",
    description:
      "We only want to show numbers that come from real participation on the platform.",
    icon: FileCheck2,
  },
  {
    title: "Reported by organisers",
    description:
      "Organisers will be able to share what happened and what was achieved after each event.",
    icon: ShieldCheck,
  },
  {
    title: "Open to the community",
    description:
      "Results are meant to be visible to everyone, so communities can see and learn from them.",
    icon: Eye,
  },
];

export function ImpactSection() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-title"
      className="scroll-mt-20 py-16 sm:py-24"
    >
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-border bg-brand-forest px-6 py-12 text-brand-ivory sm:px-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-amber">
                Our approach to impact
              </p>
              <h2
                id="impact-title"
                className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Impact that can be checked, not just claimed.
              </h2>
              <p className="mt-4 text-pretty leading-7 text-brand-ivory/80">
                ShobujBondhu is new, and we don&rsquo;t publish numbers we
                can&rsquo;t verify. As real events take place, verified results
                will appear here.
              </p>
              <p className="mt-6 inline-flex rounded-full border border-brand-amber/60 px-4 py-1.5 text-sm text-brand-amber">
                No statistics yet — by design
              </p>
            </div>

            <ul className="grid gap-4 lg:col-span-7">
              {principles.map(({ title, description, icon: Icon }, index) => (
                <li key={title}>
                  <Reveal delay={index * 0.06}>
                    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-sage text-brand-forest">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
                        <p className="mt-1 text-sm leading-6 text-brand-ivory/80">
                          {description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
