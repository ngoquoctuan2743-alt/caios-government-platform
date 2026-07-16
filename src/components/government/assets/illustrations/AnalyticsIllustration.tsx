import { IllustrationFrame } from "../shared/IllustrationFrame";
import type { VdgAssetProps } from "../shared/types";

/** A simple bar chart with a rising trend line -- for the Reporting Dashboard. */
export function AnalyticsIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-info)",
  className,
}: VdgAssetProps) {
  const bars = [60, 100, 80, 140, 110, 170];
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Phân tích và báo cáo" className={className}>
      <circle cx="160" cy="160" r="110" fill={primaryColor} opacity={0.06} />
      <g transform="translate(80 240)">
        {bars.map((h, i) => (
          <rect key={i} x={i * 28} y={-h} width="18" height={h} rx="4" fill={primaryColor} opacity={0.18 + i * 0.1} />
        ))}
        <polyline points={bars.map((h, i) => `${i * 28 + 9},${-h - 14}`).join(" ")} fill="none" stroke={secondaryColor} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        {bars.map((h, i) => (
          <circle key={i} cx={i * 28 + 9} cy={-h - 14} r="4" fill={secondaryColor} />
        ))}
      </g>
    </IllustrationFrame>
  );
}
