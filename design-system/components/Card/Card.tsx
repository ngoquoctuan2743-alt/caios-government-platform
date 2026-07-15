import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const cardVariants = cva("vdg-card rounded-[var(--vdg-radius-lg)] text-[var(--vdg-color-text)] transition-all duration-200 ease-out", {
  variants: {
    variant: {
      solid: "bg-[var(--vdg-color-surface)] border border-[var(--vdg-color-border)] shadow-[var(--vdg-shadow-sm)]",
      elevated: "bg-[var(--vdg-color-surface)] shadow-[var(--vdg-shadow-lg)]",
      /**
       * Glassmorphism — light mode only per brief. Implemented purely via
       * the `--vdg-glass-bg` / `--vdg-glass-blur` custom properties, which
       * `.vdg-dark` (theme/dark/theme.css) redefines to a flat card color
       * and 0 blur — so this variant automatically becomes a solid card in
       * dark mode without needing a separate dark-mode class branch here.
       */
      glass:
        "border border-white/40 shadow-[var(--vdg-shadow-glass)] backdrop-blur-[var(--vdg-glass-blur)] bg-[var(--vdg-glass-bg)]",
    },
    interactive: {
      true: "cursor-pointer hover:-translate-y-1 hover:shadow-[var(--vdg-shadow-lg)] hover:border-[var(--vdg-color-primary)]/30 active:translate-y-0 active:shadow-[var(--vdg-shadow-sm)]",
      false: "",
    },
  },
  defaultVariants: { variant: "solid", interactive: false },
});

export function Card({
  className,
  variant,
  interactive,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return <div data-slot="vdg-card" className={cn(cardVariants({ variant, interactive }), className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="vdg-card-header"
      className={cn("flex flex-col gap-1 border-b border-[var(--vdg-color-border)] p-6", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    // jsx-a11y/heading-has-content can't see through the `{...props}` spread
    // to know `children` is always supplied by callers -- it is, this is a
    // generic wrapper, not a case of a genuinely empty heading.
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h3
      data-slot="vdg-card-title"
      style={{ fontFamily: "var(--vdg-font-heading)" }}
      className={cn("text-lg font-semibold leading-snug", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="vdg-card-description"
      className={cn("text-sm text-[var(--vdg-color-text-secondary)]", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="vdg-card-content" className={cn("p-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="vdg-card-footer"
      className={cn("flex items-center gap-3 border-t border-[var(--vdg-color-border)] p-6", className)}
      {...props}
    />
  );
}
