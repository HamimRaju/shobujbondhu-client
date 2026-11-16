import Link from "next/link";
import { ArrowUpRight, Leaf, Sprout, Users } from "lucide-react";
import type { ReactNode } from "react";
import { AuthConfigNotice } from "@/components/auth/auth-config-notice";
import { Container } from "@/components/ui/container";

type AuthPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  footerPrompt: string;
  footerLabel: string;
  footerHref: string;
  children: ReactNode;
};

export function AuthPageShell({
  eyebrow,
  title,
  description,
  footerPrompt,
  footerLabel,
  footerHref,
  children,
}: AuthPageShellProps) {
  return (
    <section className="relative isolate overflow-hidden py-7 sm:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 -z-10 size-96 rounded-full bg-brand-sage/70 blur-3xl dark:bg-brand-forest/50"
      />
      <Container className="max-w-6xl">
        <div className="grid overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface shadow-[0_30px_90px_-48px_rgba(18,59,45,0.55)] lg:min-h-[40rem] lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="relative isolate flex min-h-[17rem] flex-col justify-between overflow-hidden bg-brand-forest px-6 py-7 text-brand-ivory sm:px-9 sm:py-9 lg:min-h-full lg:px-11 lg:py-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 -z-10 size-72 rounded-full border-[34px] border-brand-sage/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -left-20 -z-10 size-80 rounded-full bg-brand-sage/10 blur-2xl"
            />

            <div>
              <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-ivory/10 text-brand-amber ring-1 ring-inset ring-brand-ivory/15">
                <Leaf className="size-5" aria-hidden="true" />
              </div>
              <p className="mt-8 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-brand-amber">
                People · place · purpose
              </p>
              <h2 className="mt-3 max-w-sm font-display text-3xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-4xl">
                Good things grow when we grow them together.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-brand-ivory/75 sm:text-base sm:leading-7">
                Find your neighbours, take part in local action, and help make
                every community a little greener.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-brand-ivory/10 bg-brand-ivory/5 p-3.5">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-amber/15 text-brand-amber">
                  <Sprout className="size-[1.125rem]" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold leading-5 text-brand-ivory/90">
                  Start where you are
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-brand-ivory/10 bg-brand-ivory/5 p-3.5">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-sage/15 text-brand-sage">
                  <Users className="size-[1.125rem]" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold leading-5 text-brand-ivory/90">
                  Make change together
                </span>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-6 right-7 hidden text-brand-amber/20 lg:block">
              <Sprout className="size-36 rotate-[18deg]" strokeWidth={1} aria-hidden="true" />
            </div>
          </aside>

          <div className="flex items-center bg-surface px-5 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <div className="mx-auto w-full max-w-md">
              <AuthConfigNotice />
              <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-muted">
                {eyebrow}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted sm:text-base sm:leading-7">
                {description}
              </p>

              <div className="mt-7">{children}</div>

              <p className="mt-7 border-t border-border pt-5 text-center text-sm text-muted">
                {footerPrompt}{" "}
                <Link
                  href={footerHref}
                  className="inline-flex items-center gap-1 font-bold text-primary underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
                >
                  {footerLabel}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </p>
              <Link
                href="/"
                className="mx-auto mt-5 inline-flex items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold text-muted transition-colors hover:text-foreground focus-visible:outline-offset-2"
              >
                Back to ShobujBondhu
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
