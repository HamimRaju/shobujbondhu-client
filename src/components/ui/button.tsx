import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border border-transparent font-semibold tracking-[-0.01em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25",
  accent:
    "bg-accent text-accent-foreground shadow-md shadow-accent/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25",
  outline:
    "border-border/80 bg-surface text-foreground shadow-sm hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface-muted hover:shadow-md",
  ghost:
    "bg-transparent text-foreground hover:bg-surface-muted hover:shadow-sm",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const {
      href,
      variant = "primary",
      size = "md",
      className,
      children,
      ...linkProps
    } = props;
    return (
      <Link
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const {
    variant = "primary",
    size = "md",
    className,
    children,
    type = "button",
    ...buttonProps
  } = props;
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
