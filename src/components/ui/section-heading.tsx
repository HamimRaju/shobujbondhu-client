import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

export function SectionHeading({
  title,
  eyebrow,
  description,
  align = "left",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-muted sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className="text-balance text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
