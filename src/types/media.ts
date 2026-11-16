export type PhotoTone = "forest" | "sage" | "amber" | "ivory";

/**
 * A photo slot. When `src` is null the UI renders a designed fallback.
 * `src` must be a local path under /public (e.g. "/images/home/hero-main.jpg").
 */
export type SiteImage = {
  src: string | null;
  alt: string;
  /** Optional focal point for object-fit crops, such as "50% 38%". */
  objectPosition?: string;
  /** Photographer / licence line, shown next to the image when present. */
  credit?: string;
  /** Source page for a credited photo. */
  creditUrl?: string;
  /** Image license label and URL, when applicable. */
  license?: string;
  licenseUrl?: string;
};
