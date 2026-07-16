import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  {
    variants: {
      size: {
        sm: "h-7 text-[0.8rem]",
        default: "h-8",
        lg: "h-9 text-base",
      },
    },
    defaultVariants: { size: "default" },
  }
)

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  label?: string
  helperText?: string
  errorText?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

/** Labeled text input with helper/error slots. Error state is conveyed by color + icon + text, never color alone. */
function Input({
  className,
  label,
  helperText,
  errorText,
  size = "default",
  startIcon,
  endIcon,
  id,
  ...props
}: InputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const helperId = `${inputId}-helper`
  const hasError = Boolean(errorText)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {startIcon && (
          <span className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
            {startIcon}
          </span>
        )}
        <input
          id={inputId}
          data-slot="input"
          className={cn(
            inputVariants({ size }),
            startIcon && "pl-9",
            endIcon && "pr-9",
            className
          )}
          aria-invalid={hasError}
          aria-describedby={helperText || errorText ? helperId : undefined}
          {...props}
        />
        {endIcon && (
          <span className="pointer-events-none absolute right-3 flex items-center text-muted-foreground">
            {endIcon}
          </span>
        )}
      </div>
      {(helperText || errorText) && (
        <p id={helperId} className={cn("text-xs", hasError ? "text-destructive" : "text-muted-foreground")}>
          {errorText ?? helperText}
        </p>
      )}
    </div>
  )
}

export { Input, inputVariants }
