import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/** Sparse dots at varied sizes, unconnected -- a quieter sibling of ConnectionsPattern for surfaces that need less visual noise. */
export function NodesPattern({ id, size = 72, primaryColor = "var(--vdg-color-primary)", opacity = 0.04, className }: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-nodes-${id ?? autoId}`;
  const s = size;
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={s} height={s} patternUnits="userSpaceOnUse">
          <circle cx={s * 0.2} cy={s * 0.25} r={2.5} fill={primaryColor} opacity={opacity} />
          <circle cx={s * 0.75} cy={s * 0.15} r={1.5} fill={primaryColor} opacity={opacity} />
          <circle cx={s * 0.55} cy={s * 0.6} r={2} fill={primaryColor} opacity={opacity} />
          <circle cx={s * 0.15} cy={s * 0.8} r={1.5} fill={primaryColor} opacity={opacity} />
          <circle cx={s * 0.85} cy={s * 0.7} r={2.5} fill={primaryColor} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
