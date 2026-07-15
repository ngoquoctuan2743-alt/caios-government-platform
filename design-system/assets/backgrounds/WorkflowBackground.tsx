import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { WorkflowLinesPattern } from "../patterns/WorkflowLinesPattern";
import type { VdgAssetProps } from "../shared/types";

/** Process/automation surfaces: workflow-line texture plus a few large connected step-nodes tracing a diagonal path, echoing an approval flow without being a literal diagram. */
export function WorkflowBackground({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-success)",
  opacity = 1,
  animated = false,
  className,
}: VdgAssetProps) {
  const gid = useId();
  const steps: [number, number][] = [
    [120, 560],
    [420, 420],
    [720, 300],
    [1020, 160],
  ];
  return (
    <BackgroundFrame viewBox="0 0 1200 700" opacity={opacity} className={className}>
      <svg width="1200" height="700">
        <WorkflowLinesPattern id={`${gid}-lines`} primaryColor={primaryColor} opacity={0.035} size={140} />
      </svg>
      <polyline
        points={steps.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke={secondaryColor}
        strokeWidth={2}
        strokeDasharray="2 10"
        strokeLinecap="round"
        opacity={0.14}
      />
      {steps.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={7} fill="none" stroke={secondaryColor} strokeWidth={2} opacity={0.18}>
          {animated && <animate attributeName="r" values="7;9;7" dur="2s" begin={`${i * 0.25}s`} repeatCount="indefinite" />}
        </circle>
      ))}
    </BackgroundFrame>
  );
}
