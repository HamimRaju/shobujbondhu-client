export type PhotoTone = "forest" | "sage" | "amber" | "ivory";

/**
 * A photo slot. When `src` is null the UI renders a designed fallback.
 * `src` must be a local path under /public (e.g. "/images/home/hero-main.jpg").
 */
export type SiteImage = {
  src: string | null;
  alt: string;
  /** Photographer / licence line, shown next to the image when present. */
  credit?: string;
};
