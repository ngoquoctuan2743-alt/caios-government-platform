import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/** Evenly spaced dots -- the quietest pattern; safe under dense text (auth screens, form backgrounds). */
export function DotMatrixPattern({ id, size = 24, primaryColor = "var(--vdg-color-primary)", opacity = 0.04, className }: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-dots-${id ?? autoId}`;
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={size} height={size} patternUnits="userSpaceOnUse">
          <circle cx={size / 2} cy={size / 2} r={1.4} fill={primaryColor} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
