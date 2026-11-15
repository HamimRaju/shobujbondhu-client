"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { loginLink } from "@/config/navigation";
import { Brand } from "./brand";
import { ActiveNavLinkList, NavLinkList } from "./nav-link-list";

const MOBILE_MENU_ID = "mobile-menu";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <MotionConfig reducedMotion="user">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Brand />

          <nav aria-label="Primary" className="hidden md:block">
            <Suspense
              fallback={<NavLinkList pathname={null} orientation="horizontal" />}
            >
              <ActiveNavLinkList orientation="horizontal" />
            </Suspense>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <div className="hidden md:block">
              <Button href={loginLink.href} size="sm">
                {loginLink.label}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls={MOBILE_MENU_ID}
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-surface-muted md:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>

        <AnimatePresence>
          {open ? (
            <motion.div
              id={MOBILE_MENU_ID}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="border-t border-border bg-background md:hidden"
            >
              <Container as="nav" aria-label="Mobile" className="py-3">
                <Suspense
                  fallback={<NavLinkList pathname={null} orientation="vertical" />}
                >
                  <ActiveNavLinkList
                    orientation="vertical"
                    onNavigate={() => setOpen(false)}
                  />
                </Suspense>
                <div className="mt-3 border-t border-border pt-3">
                  <Button
                    href={loginLink.href}
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    {loginLink.label}
                  </Button>
                </div>
              </Container>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}
