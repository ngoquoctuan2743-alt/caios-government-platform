import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { DataFlowPattern } from "../patterns/DataFlowPattern";
import type { VdgAssetProps } from "../shared/types";

/** Analytics/reporting surfaces: data-flow chevron texture plus a row of abstract bar shapes fading up the right edge, evoking a chart without being one. */
export function ReportsBackground({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-info)",
  opacity = 1,
  className,
}: VdgAssetProps) {
  const gid = useId();
  const bars = [40, 70, 50, 90, 65, 100];
  return (
    <BackgroundFrame viewBox="0 0 1200 700" opacity={opacity} className={className}>
      <svg width="1200" height="700">
        <DataFlowPattern id={`${gid}-flow`} primaryColor={primaryColor} opacity={0.03} size={44} />
      </svg>
      <g transform="translate(900 560)" opacity={0.08}>
        {bars.map((h, i) => (
          <rect key={i} x={i * 34} y={-h} width={18} height={h} rx={3} fill={secondaryColor} />
        ))}
      </g>
    </BackgroundFrame>
  );
}
