import { useId } from "react";
import type { VdgPatternProps } from "../shared/types";

/** Gentle diagonal curves suggesting throughput/process movement -- for workflow and automation surfaces. */
export function WorkflowLinesPattern({
  id,
  size = 120,
  primaryColor = "var(--vdg-color-primary)",
  opacity = 0.04,
  animated = false,
  className,
}: VdgPatternProps) {
  const autoId = useId();
  const patternId = `vdg-workflow-lines-${id ?? autoId}`;
  return (
    <svg className={className} width="100%" height="100%" aria-hidden focusable="false">
      <defs>
        <pattern id={patternId} width={size} height={size / 2} patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          <path
            d={`M 0 ${size / 4} C ${size * 0.25} 0, ${size * 0.75} ${size / 2}, ${size} ${size / 4}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray={animated ? "6 6" : undefined}
            opacity={opacity}
          >
            {animated && (
              <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2s" repeatCount="indefinite" />
            )}
          </path>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
