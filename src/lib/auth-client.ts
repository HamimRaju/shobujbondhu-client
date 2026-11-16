"use client";

import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
import { getBetterAuthBaseURL } from "@/lib/auth-config";

export const authServerURL = getBetterAuthBaseURL();
export const authServerConfigured = Boolean(authServerURL);

export const authClient = createAuthClient({
  baseURL: authServerURL ?? undefined,
  plugins: [jwtClient()],
  fetchOptions: {
    credentials: "include",
  },
});

export function getSafeRedirectPath(candidate: string | null) {
  if (
    !candidate ||
    !candidate.startsWith("/") ||
    candidate.startsWith("//") ||
    candidate.includes("\\")
  ) {
    return "/";
  }

  try {
    const url = new URL(candidate, "https://shobujbondhu.invalid");
    if (url.origin !== "https://shobujbondhu.invalid") return "/";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

export function getAuthCallbackURL(path: string) {
  return new URL(path, window.location.origin).toString();
}

export function getAuthErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message.trim()
  ) {
    return error.message;
  }

  return fallback;
}
