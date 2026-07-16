import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/** Repeating soft wave -- for hero and empty-state surfaces where a calmer, less structured texture reads better. */
export function WavesPattern({ id, size = 96, primaryColor = "var(--vdg-color-primary)", opacity = 0.04, className }: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-waves-${id ?? autoId}`;
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={size} height={size / 3} patternUnits="userSpaceOnUse">
          <path
            d={`M 0 ${size / 6} Q ${size / 4} 0, ${size / 2} ${size / 6} T ${size} ${size / 6}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
