"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  // Both icons are rendered and switched with CSS so server and client markup match.
  return (
    <Button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === "dark"}
      title={`Switch to ${nextTheme} theme`}
      variant="outline"
      size="sm"
      className="size-12 px-0"
    >
      <Moon className="size-6 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-6 dark:block" aria-hidden="true" />
    </Button>
  );
}
