import { IllustrationFrame } from "../shared/IllustrationFrame";
import { CircuitPattern } from "../patterns/CircuitPattern";
import type { VdgAssetProps } from "../shared/types";

/** A server stack radiating connections to satellite nodes -- for the National Data Platform / cloud-services surfaces. */
export function NationalDataPlatformIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-info)",
  animated = false,
  className,
}: VdgAssetProps) {
  const nodes: [number, number][] = [
    [90, 100],
    [230, 100],
    [90, 220],
    [230, 220],
  ];
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Nền tảng dữ liệu quốc gia" className={className}>
      <svg x="10" y="10" width="300" height="300">
        <CircuitPattern primaryColor={primaryColor} opacity={0.04} size={60} />
      </svg>
      {nodes.map(([x, y], i) => (
        <line key={i} x1="160" y1="160" x2={x} y2={y} stroke={secondaryColor} strokeWidth={1.5} opacity={0.3} />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8" fill={secondaryColor} opacity={0.6}>
          {animated && <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />}
        </circle>
      ))}
      <g transform="translate(160 160)">
        <rect x="-34" y="-40" width="68" height="80" rx="6" fill="var(--vdg-color-surface)" stroke={primaryColor} strokeWidth={2.5} />
        {[-20, -2, 16].map((y) => (
          <rect key={y} x="-22" y={y} width="44" height="10" rx="2" fill={primaryColor} opacity={0.3} />
        ))}
      </g>
    </IllustrationFrame>
  );
}
