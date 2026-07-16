import * as React from "react"

import { cn } from "@/lib/utils"

/** Loading placeholder. `pulse` defaults on; pass `pulse={false}` when many skeletons on one screen would otherwise read as "flashing". */
function Skeleton({ className, pulse = true, ...props }: React.ComponentProps<"div"> & { pulse?: boolean }) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn("rounded-md bg-muted", pulse && "animate-pulse", className)}
      {...props}
    />
  )
}

export { Skeleton }
