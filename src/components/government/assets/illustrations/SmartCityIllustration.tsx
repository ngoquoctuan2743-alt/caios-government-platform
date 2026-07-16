import { IllustrationFrame } from "../shared/IllustrationFrame";
import { ConnectionsPattern } from "../patterns/ConnectionsPattern";
import type { VdgAssetProps } from "../shared/types";

/** An abstract skyline (varied-height rounded blocks) with a connections layer overhead -- "smart city," not a specific real skyline. */
export function SmartCityIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-blue)",
  className,
}: VdgAssetProps) {
  const buildings = [
    { x: 70, h: 90, w: 34 },
    { x: 108, h: 140, w: 30 },
    { x: 142, h: 110, w: 36 },
    { x: 182, h: 170, w: 28 },
    { x: 214, h: 100, w: 34 },
  ];
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Đô thị thông minh" className={className}>
      <svg x="40" y="30" width="240" height="120">
        <ConnectionsPattern primaryColor={secondaryColor} opacity={0.4} size={120} />
      </svg>
      <g>
        {buildings.map((b, i) => (
          <rect key={i} x={b.x} y={230 - b.h} width={b.w} height={b.h} rx="4" fill={primaryColor} opacity={0.16 + i * 0.06} />
        ))}
        <line x1="60" y1="230" x2="260" y2="230" stroke={primaryColor} strokeWidth={2} opacity={0.3} />
      </g>
    </IllustrationFrame>
  );
}
