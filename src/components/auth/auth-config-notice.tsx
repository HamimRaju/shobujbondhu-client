"use client";

import { Info } from "lucide-react";
import { authServerConfigured } from "@/lib/auth-client";

export function AuthConfigNotice() {
  if (authServerConfigured) return null;

  return (
    <p
      role="status"
      className="mb-5 flex items-start gap-2.5 rounded-xl border border-brand-amber/50 bg-brand-amber/10 px-3.5 py-3 text-xs leading-5 text-foreground"
    >
      <Info className="mt-0.5 size-4 shrink-0 text-brand-forest dark:text-brand-amber" aria-hidden="true" />
      <span>
        Authentication is not configured in this frontend yet. Set{" "}
        <code className="font-semibold">NEXT_PUBLIC_BETTER_AUTH_URL</code> in
        <code className="ml-1 font-semibold">.env.local</code> to your server
        origin.
      </span>
    </p>
  );
}
