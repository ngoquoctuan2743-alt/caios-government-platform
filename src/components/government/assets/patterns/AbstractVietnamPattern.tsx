import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/**
 * Abstracted terraced-field bands -- stepped horizontal contour lines
 * evoking Vietnam's rice terraces, drawn as pure geometry (no map outline,
 * no flag, no national emblem). Deliberately not literal.
 */
export function AbstractVietnamPattern({ id, size = 80, primaryColor = "var(--vdg-color-primary)", opacity = 0.04, className }: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-terrace-${id ?? autoId}`;
  const s = size;
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={s} height={s * 0.5} patternUnits="userSpaceOnUse">
          <path
            d={`M 0 ${s * 0.1} Q ${s * 0.25} ${s * 0.02}, ${s * 0.5} ${s * 0.1} T ${s} ${s * 0.1}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth={1}
            opacity={opacity}
          />
          <path
            d={`M 0 ${s * 0.25} Q ${s * 0.25} ${s * 0.17}, ${s * 0.5} ${s * 0.25} T ${s} ${s * 0.25}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth={1}
            opacity={opacity}
          />
          <path
            d={`M 0 ${s * 0.4} Q ${s * 0.25} ${s * 0.32}, ${s * 0.5} ${s * 0.4} T ${s} ${s * 0.4}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth={1}
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
