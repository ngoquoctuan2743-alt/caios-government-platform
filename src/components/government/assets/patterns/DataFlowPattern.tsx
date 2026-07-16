import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/** Repeating directional chevrons -- for report/analytics surfaces where the motif should read as "data moving through a pipeline." */
export function DataFlowPattern({
  id,
  size = 40,
  primaryColor = "var(--vdg-color-primary)",
  opacity = 0.04,
  animated = false,
  className,
}: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-dataflow-${id ?? autoId}`;
  const s = size;
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={s} height={s} patternUnits="userSpaceOnUse">
          <path d={`M ${s * 0.15} ${s * 0.3} L ${s * 0.4} ${s * 0.5} L ${s * 0.15} ${s * 0.7}`} fill="none" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
            {animated && <animate attributeName="opacity" values={`${opacity};${opacity * 2.5};${opacity}`} dur="1.6s" repeatCount="indefinite" />}
          </path>
          <path d={`M ${s * 0.6} ${s * 0.3} L ${s * 0.85} ${s * 0.5} L ${s * 0.6} ${s * 0.7}`} fill="none" stroke={primaryColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
            {animated && <animate attributeName="opacity" values={`${opacity};${opacity * 2.5};${opacity}`} dur="1.6s" begin="0.4s" repeatCount="indefinite" />}
          </path>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
