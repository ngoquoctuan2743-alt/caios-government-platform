"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  "vdg-button inline-flex items-center justify-center gap-2 rounded-[var(--vdg-radius-md)] font-medium whitespace-nowrap transition-all duration-150 ease-out outline-none select-none disabled:pointer-events-none disabled:opacity-40 focus-visible:shadow-[var(--vdg-focus-ring)] active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--vdg-color-primary)] text-[var(--vdg-color-on-primary)] shadow-[0_1px_2px_rgba(200,16,46,0.15),0_4px_10px_-2px_rgba(200,16,46,0.35)] hover:bg-[var(--vdg-color-primary-dark)] hover:shadow-[0_2px_6px_rgba(200,16,46,0.2),0_8px_20px_-4px_rgba(200,16,46,0.45)] hover:-translate-y-px active:bg-[var(--vdg-color-primary-dark)] active:translate-y-0 active:shadow-[0_1px_2px_rgba(200,16,46,0.15)]",
        secondary:
          "bg-[var(--vdg-color-surface)] text-[var(--vdg-color-text)] border border-[var(--vdg-color-border)] hover:bg-[var(--vdg-color-background)] hover:border-[var(--vdg-color-text-secondary)]/40",
        outline:
          "bg-transparent text-[var(--vdg-color-primary)] border border-[var(--vdg-color-primary)] hover:bg-[var(--vdg-color-primary)]/8",
        ghost:
          "bg-transparent text-[var(--vdg-color-text)] hover:bg-[var(--vdg-color-border)]/50",
        danger:
          "bg-[var(--vdg-color-danger)] text-white hover:opacity-90 active:opacity-95",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ComponentProps<typeof ButtonPrimitive>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

/**
 * Primary interactive control. `loading` disables the button and swaps the
 * leading content for a spinner without shifting layout width (label stays
 * mounted, visually hidden) — avoids the "button jumps when clicked" defect
 * common in ad-hoc loading-state buttons.
 */
export function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="vdg-button"
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      <span className={loading ? "opacity-90" : undefined}>{children}</span>
    </ButtonPrimitive>
  );
}
