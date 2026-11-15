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
        <div className="grid items-center gap-8 rounded-[2rem] border border-border bg-surface px-6 py-10 shadow-sm sm:px-12 sm:py-14 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <MailOpen className="size-6" aria-hidden="true" />
            </span>
            <h2
              id="newsletter-title"
              className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Stay in the loop
            </h2>
            <p className="mt-3 max-w-md text-pretty leading-7 text-muted">
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
