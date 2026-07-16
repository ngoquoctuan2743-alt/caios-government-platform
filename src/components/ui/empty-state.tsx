import * as React from "react"

import { cn } from "@/lib/utils"

export interface EmptyStateProps extends React.ComponentProps<"div"> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

/** Empty states in a government product should never feel like an error — neutral icon tone, informative copy, optional next action instead of a dead end. */
function EmptyState({ className, icon, title, description, action, ...props }: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center gap-3 rounded-lg border border-dashed border-border px-6 py-14 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      )}
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action}
    </div>
  )
}

export { EmptyState }
