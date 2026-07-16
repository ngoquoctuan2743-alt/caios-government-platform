import { IllustrationFrame } from "../shared/IllustrationFrame";
import type { VdgAssetProps } from "../shared/types";

/** Three connected step-nodes, the last one checked -- for workflow/approval-flow empty states. */
export function WorkflowIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-success)",
  className,
}: VdgAssetProps) {
  const steps: [number, number][] = [
    [80, 220],
    [160, 150],
    [240, 100],
  ];
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Quy trình xử lý hồ sơ" className={className}>
      <polyline points={steps.map((p) => p.join(",")).join(" ")} fill="none" stroke={primaryColor} strokeWidth={3} strokeDasharray="2 10" strokeLinecap="round" opacity={0.35} />
      {steps.map(([x, y], i) => {
        const done = i < steps.length - 1;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r={22} fill="var(--vdg-color-surface)" stroke={done ? secondaryColor : primaryColor} strokeWidth={2.5} />
            {done ? (
              <path d="M -9 0 L -2 8 L 10 -8" fill="none" stroke={secondaryColor} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <circle r={7} fill={primaryColor} />
            )}
          </g>
        );
      })}
    </IllustrationFrame>
  );
}
