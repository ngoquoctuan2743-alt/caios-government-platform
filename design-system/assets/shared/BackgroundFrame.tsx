import type { ReactNode } from "react";

/**
 * Shared outer `<svg>` scaffold for every background asset -- guarantees
 * every one of the 17 backgrounds is responsive (`preserveAspectRatio`,
 * fills its container) and accessible (decorative, so `aria-hidden`) the
 * same way, instead of each file reinventing the wrapper.
 */
export function BackgroundFrame({
  viewBox = "0 0 800 600",
  opacity = 1,
  className,
  children,
}: {
  viewBox?: string;
  opacity?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      style={{ opacity }}
      className={className}
      role="img"
      aria-hidden
      focusable="false"
    >
      {children}
    </svg>
  );
}
