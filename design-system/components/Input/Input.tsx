"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn";

const inputVariants = cva(
  "vdg-input w-full rounded-[var(--vdg-radius-sm)] border bg-[var(--vdg-color-surface)] px-3 text-sm text-[var(--vdg-color-text)] placeholder:text-[var(--vdg-color-text-secondary)] outline-none transition-colors disabled:opacity-40",
  {
    variants: {
      state: {
        default:
          "border-[var(--vdg-color-border)] focus-visible:border-[var(--vdg-color-primary)] focus-visible:shadow-[var(--vdg-focus-ring)]",
        error:
          "border-[var(--vdg-color-danger)] focus-visible:shadow-[0_0_0_3px_rgba(220,38,38,0.25)]",
      },
      size: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: { state: "default", size: "md" },
  }
);

export interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  label?: string;
  helperText?: string;
  errorText?: string;
  size?: "sm" | "md" | "lg";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

/** Labeled text input with helper/error slots. Error state is conveyed by color + icon + text, never color alone (WCAG 1.4.1). */
export function Input({
  className,
  label,
  helperText,
  errorText,
  size = "md",
  startIcon,
  endIcon,
  id,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const hasError = Boolean(errorText);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--vdg-color-text)]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {startIcon && (
          <span className="pointer-events-none absolute left-3 flex items-center text-[var(--vdg-color-text-secondary)]">
            {startIcon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            inputVariants({ state: hasError ? "error" : "default", size }),
            startIcon && "pl-9",
            endIcon && "pr-9",
            className
          )}
          aria-invalid={hasError}
          aria-describedby={helperText || errorText ? helperId : undefined}
          {...props}
        />
        {endIcon && (
          <span className="pointer-events-none absolute right-3 flex items-center text-[var(--vdg-color-text-secondary)]">
            {endIcon}
          </span>
        )}
      </div>
      {(helperText || errorText) && (
        <p
          id={helperId}
          className={cn(
            "text-xs",
            hasError ? "text-[var(--vdg-color-danger)]" : "text-[var(--vdg-color-text-secondary)]"
          )}
        >
          {errorText ?? helperText}
        </p>
      )}
    </div>
  );
}
