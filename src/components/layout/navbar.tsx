"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuthSession } from "@/components/providers/auth-session-provider";
import { loginLink } from "@/config/navigation";
import { Brand } from "./brand";
import { ActiveNavLinkList, NavLinkList } from "./nav-link-list";
import { UserMenu } from "./user-menu";

const MOBILE_MENU_ID = "mobile-menu";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isPending } = useAuthSession();

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
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 shadow-[0_1px_0_rgba(18,59,45,0.02)] backdrop-blur-xl">
        <Container className="flex h-[4.5rem] items-center justify-between gap-4">
          <Brand />

          <nav aria-label="Primary" className="hidden md:block">
            <Suspense
              fallback={<NavLinkList pathname={null} orientation="horizontal" />}
            >
              <ActiveNavLinkList orientation="horizontal" />
            </Suspense>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <div className="hidden items-center gap-2 md:flex">
              {isPending ? (
                <span
                  aria-hidden="true"
                  className="h-9 w-28 animate-pulse rounded-full bg-surface-muted"
                />
              ) : user ? (
                <UserMenu user={user} />
              ) : (
                <>
                  <Button href={loginLink.href} variant="outline" size="sm">
                    {loginLink.label}
                  </Button>
                  <Button href="/register" size="sm">
                    Get Started
                  </Button>
                </>
              )}
            </div>
            <Button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls={MOBILE_MENU_ID}
              aria-label={open ? "Close menu" : "Open menu"}
              variant="outline"
              size="sm"
              className="size-10 px-0 md:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </Button>
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
              className="border-t border-border/80 bg-background/95 shadow-lg shadow-foreground/5 md:hidden"
            >
              <Container as="nav" aria-label="Mobile" className="py-4">
                <Suspense
                  fallback={<NavLinkList pathname={null} orientation="vertical" />}
                >
                  <ActiveNavLinkList
                    orientation="vertical"
                    onNavigate={() => setOpen(false)}
                  />
                </Suspense>
                <div className="mt-4 space-y-2 border-t border-border pt-4">
                  {isPending ? (
                    <span
                      aria-hidden="true"
                      className="block h-20 animate-pulse rounded-2xl bg-surface-muted"
                    />
                  ) : user ? (
                    <UserMenu
                      user={user}
                      compact
                      onNavigate={() => setOpen(false)}
                    />
                  ) : (
                    <>
                      <Button
                        href={loginLink.href}
                        variant="outline"
                        className="w-full"
                        onClick={() => setOpen(false)}
                      >
                        {loginLink.label}
                      </Button>
                      <Button
                        href="/register"
                        className="w-full"
                        onClick={() => setOpen(false)}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </Container>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}
