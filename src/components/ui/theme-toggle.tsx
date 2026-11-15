"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  // Both icons are rendered and switched with CSS so server and client markup match.
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-muted"
    >
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
    </button>
  );
}
