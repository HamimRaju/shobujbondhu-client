import { MailOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "./newsletter-form";

export function NewsletterSection() {
  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-title"
      className="scroll-mt-20 py-16 sm:py-24"
    >
      <Container>
        <div className="relative isolate grid items-center gap-8 overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-10 shadow-sm sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-24 -z-10 size-64 rounded-full border-[36px] border-surface-muted/70"
          />
          <div>
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-sm">
              <MailOpen className="size-6" aria-hidden="true" />
            </span>
            <h2
              id="newsletter-title"
              className="mt-5 text-balance text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl"
            >
              Stay in the loop
            </h2>
            <p className="mt-3 max-w-md text-pretty leading-7 text-muted sm:leading-8">
              Leave your email to hear about new volunteering opportunities and
              community stories when ShobujBondhu opens up.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </Container>
    </section>
  );
}
