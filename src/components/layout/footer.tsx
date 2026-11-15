import { ExternalLink, Mail } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { contactEmail, socialLinks } from "@/config/social";
import { Brand } from "./brand";

const linkClass =
  "rounded-sm text-sm text-muted transition-colors hover:text-foreground";

export function Footer() {
  const hasConnect = socialLinks.length > 0 || Boolean(contactEmail);

  return (
    <footer className="border-t border-border bg-surface-muted">
      <Container className="grid gap-10 py-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Brand />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            {siteConfig.description}
          </p>
          <p lang="bn" className="mt-3 max-w-sm text-sm leading-6 text-muted">
            আপনার এলাকার স্বেচ্ছাসেবী উদ্যোগ খুঁজুন, যোগ দিন, অথবা নিজেই শুরু করুন।
          </p>

          {hasConnect ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social and contact links">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium transition-colors hover:bg-background"
                  >
                    {link.label}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              {contactEmail ? (
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium transition-colors hover:bg-background"
                  >
                    <Mail className="size-3.5" aria-hidden="true" />
                    Email us
                  </a>
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>

        <nav
          aria-label="Footer"
          className="grid gap-8 sm:grid-cols-3 lg:col-span-7"
        >
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="font-display text-sm font-semibold">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {siteConfig.name}. All rights reserved.</p>
          <p>Built for communities across Bangladesh.</p>
        </Container>
      </div>
    </footer>
  );
}
