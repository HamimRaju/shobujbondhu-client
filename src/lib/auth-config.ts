/**
 * The client and server both use the Better Auth server's origin.
 * Set NEXT_PUBLIC_BETTER_AUTH_URL at build/runtime configuration time.
 */
export function getBetterAuthBaseURL() {
  const configuredURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim();
  if (!configuredURL) return null;

  try {
    const url = new URL(configuredURL);
    if (
      (url.protocol !== "http:" && url.protocol !== "https:") ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}
