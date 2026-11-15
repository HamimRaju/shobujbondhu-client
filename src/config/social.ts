/**
 * Social and contact links are read from environment variables so no unverified
 * account URLs ship in the code. Anything left unset is simply not rendered.
 */
export type SocialLink = { label: string; href: string };

const candidates: Array<{ label: string; href: string | undefined }> = [
  { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL },
  { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
];

export const socialLinks: SocialLink[] = candidates.filter(
  (link): link is SocialLink => Boolean(link.href),
);

export const contactEmail: string | undefined =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined;
