import type { ReactNode } from "react";

/**
 * Shared outer `<svg>` scaffold for illustrations. Unlike `BackgroundFrame`
 * (always decorative), illustrations sometimes carry real meaning next to
 * sparse text (e.g. an empty-state illustration next to "No cases yet") --
 * so this accepts an optional `label` and only defaults to `aria-hidden`
 * when none is given, instead of always hiding from assistive tech.
 */
export function IllustrationFrame({
  viewBox = "0 0 320 320",
  label,
  className,
  children,
}: {
  viewBox?: string;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {children}
    </svg>
  );
}
