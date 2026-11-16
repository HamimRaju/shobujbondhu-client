import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { PhotoTone, SiteImage } from "@/types";

const tones: Record<PhotoTone, string> = {
  forest:
    "bg-gradient-to-br from-brand-forest via-[#1c5642] to-[#2f7a5c] text-brand-sage",
  sage:
    "bg-gradient-to-br from-brand-sage to-[#bcd3b8] text-brand-forest dark:from-brand-forest dark:to-surface-muted dark:text-brand-sage",
  amber:
    "bg-gradient-to-br from-brand-ivory to-brand-amber text-brand-forest dark:from-brand-forest dark:to-[#3b3020] dark:text-brand-amber",
  ivory:
    "bg-gradient-to-br from-brand-ivory to-brand-sage text-brand-forest dark:from-surface-muted dark:to-surface dark:text-brand-amber",
};

type PhotoFrameProps = {
  image: SiteImage;
  icon: LucideIcon;
  tone?: PhotoTone;
  sizes: string;
  /** Tailwind aspect/size classes, e.g. "aspect-[4/3]". */
  className?: string;
  priority?: boolean;
  /** Expected file name, shown only in development when the photo is missing. */
  slotHint?: string;
};

/**
 * Renders a photograph with a fixed aspect ratio. If no photo has been supplied,
 * a decorative fallback keeps the layout identical until real images are added.
 */
export function PhotoFrame({
  image,
  icon: Icon,
  tone = "forest",
  sizes,
  className,
  priority = false,
  slotHint,
}: PhotoFrameProps) {
  const frame = cn("relative isolate overflow-hidden", className);

  if (image.src) {
    return (
      <div className={frame}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition: image.objectPosition }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
        />
      </div>
    );
  }

  return (
    <div className={cn(frame, tones[tone])} aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:18px_18px]" />
      <Icon
        className="absolute -bottom-6 -right-4 size-40 opacity-20"
        strokeWidth={1.25}
      />
      <Icon className="absolute left-5 top-5 size-7 opacity-70" strokeWidth={1.5} />
      {slotHint && process.env.NODE_ENV !== "production" ? (
        <span className="absolute bottom-2 left-3 right-3 truncate rounded bg-black/30 px-2 py-0.5 text-[10px] text-white">
          Photo slot: {slotHint}
        </span>
      ) : null}
    </div>
  );
}
