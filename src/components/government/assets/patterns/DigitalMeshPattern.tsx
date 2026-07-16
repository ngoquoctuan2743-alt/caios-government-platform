import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/** Triangulated mesh -- for AI Assistant and analytics surfaces; reads as "data fabric" without being a literal chart. */
export function DigitalMeshPattern({ id, size = 56, primaryColor = "var(--vdg-color-primary)", opacity = 0.04, className }: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-mesh-${id ?? autoId}`;
  const s = size;
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={s} height={s} patternUnits="userSpaceOnUse">
          <path
            d={`M 0 0 L ${s} ${s / 2} L 0 ${s} M ${s} 0 L 0 ${s / 2} L ${s} ${s}`}
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
