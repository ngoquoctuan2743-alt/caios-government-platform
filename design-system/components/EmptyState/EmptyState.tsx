import * as React from "react";
import { cn } from "../../lib/cn";

export interface EmptyStateProps extends React.ComponentProps<"div"> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

/**
 * Empty states in a government product must never feel like an error —
 * neutral icon tone, informative copy, and an optional next action instead
 * of a dead end.
 */
export function EmptyState({ className, icon, title, description, action, ...props }: EmptyStateProps) {
  return (
    <div
      data-slot="vdg-empty-state"
      className={cn(
        "flex flex-col items-center gap-3 rounded-[var(--vdg-radius-lg)] border border-dashed border-[var(--vdg-color-border)] px-6 py-14 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex size-12 items-center justify-center rounded-[var(--vdg-radius-full)] bg-[var(--vdg-color-primary)]/8 text-[var(--vdg-color-primary)]">
          {icon}
        </div>
      )}
      <p className="text-sm font-medium text-[var(--vdg-color-text)]">{title}</p>
      {description && <p className="max-w-sm text-sm text-[var(--vdg-color-text-secondary)]">{description}</p>}
      {action}
    </div>
  );
}
