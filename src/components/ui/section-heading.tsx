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
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-7 text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
