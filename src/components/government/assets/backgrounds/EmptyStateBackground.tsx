import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { DotMatrixPattern } from "../patterns/DotMatrixPattern";
import type { VdgAssetProps } from "../shared/types";

/** Minimal, never alarming: faint dot field behind a single large soft outline circle -- an empty container silhouette, not an error. */
export function EmptyStateBackground({
  primaryColor = "var(--vdg-color-text-secondary)",
  opacity = 1,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 600 400" opacity={opacity} className={className}>
      <svg width="600" height="400">
        <DotMatrixPattern id={`${gid}-dots`} primaryColor={primaryColor} opacity={0.05} size={24} />
      </svg>
      <circle cx="300" cy="180" r="90" fill="none" stroke={primaryColor} strokeWidth={1.5} strokeDasharray="4 8" opacity={0.15} />
    </BackgroundFrame>
  );
}
