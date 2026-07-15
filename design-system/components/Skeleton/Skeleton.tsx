import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Loading placeholder. Uses a static low-opacity fill by default; the
 * `pulse` prop adds the shimmer motion — off by default so a screen with
 * many skeletons doesn't read as "flashing" (a common motion-sensitivity
 * complaint), matching the brief's "no excessive animation" rule.
 */
export function Skeleton({
  className,
  pulse = true,
  ...props
}: React.ComponentProps<"div"> & { pulse?: boolean }) {
  return (
    <div
      data-slot="vdg-skeleton"
      aria-hidden
      className={cn(
        "rounded-[var(--vdg-radius-sm)] bg-[var(--vdg-color-border)]/70",
        pulse && "animate-pulse",
        className
      )}
      {...props}
    />
  );
}
