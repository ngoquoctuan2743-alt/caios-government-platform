import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

/**
 * Covers both "Badge" and "Tag" from the brief — same visual primitive,
 * different semantic use (Badge = status, Tag = category/label). `gold` is
 * intentionally always paired with dark text (`--vdg-color-text`), never
 * white, since gold fails contrast as a background for white text too
 * (~1.9:1) — see tokens/colors.ts.
 */
const badgeVariants = cva(
  "vdg-badge inline-flex w-fit items-center gap-1 rounded-[var(--vdg-radius-full)] px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral: "bg-[var(--vdg-color-border)]/60 text-[var(--vdg-color-text)]",
        primary: "bg-[var(--vdg-color-primary)]/10 text-[var(--vdg-color-primary)]",
        success: "bg-[var(--vdg-color-success)]/15 text-[#166534]",
        warning: "bg-[var(--vdg-color-warning)]/15 text-[#92400e]",
        danger: "bg-[var(--vdg-color-danger)]/10 text-[var(--vdg-color-danger)]",
        info: "bg-[var(--vdg-color-info)]/10 text-[var(--vdg-color-info)]",
        gold: "bg-[var(--vdg-color-gold)] text-[var(--vdg-color-text)]",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export function Badge({ className, variant, icon, children, ...props }: BadgeProps) {
  return (
    <span data-slot="vdg-badge" className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon}
      {children}
    </span>
  );
}
