import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateAuthSession } from "@/lib/auth-session-validation";

export const getCurrentAuthSession = cache(async () => {
  const cookieHeader = (await cookies()).toString();
  return validateAuthSession(cookieHeader);
});

/**
 * Use at the top of every protected Server Component, Server Action, or route
 * handler. Proxy redirects are only an early gate, not the data authorization
 * boundary.
 */
export async function requireAuthenticatedSession(returnTo: string) {
  const session = await getCurrentAuthSession();
  if (session) return session;

  const safeReturnTo =
    returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/";
  redirect(`/login?callbackURL=${encodeURIComponent(safeReturnTo)}`);
}
