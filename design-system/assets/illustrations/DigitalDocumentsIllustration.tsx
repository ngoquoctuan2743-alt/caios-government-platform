import { IllustrationFrame } from "../shared/IllustrationFrame";
import type { VdgAssetProps } from "../shared/types";

/** A stack of three offset document cards -- for Electronic Records / Digital Documents surfaces. */
export function DigitalDocumentsIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-text-secondary)",
  className,
}: VdgAssetProps) {
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Tài liệu điện tử" className={className}>
      <circle cx="160" cy="160" r="110" fill={primaryColor} opacity={0.06} />
      {[
        { x: 96, y: 90, rot: -8, active: false },
        { x: 106, y: 100, rot: 4, active: false },
        { x: 100, y: 96, rot: 0, active: true },
      ].map((doc, i) => (
        <g key={i} transform={`translate(${doc.x} ${doc.y}) rotate(${doc.rot})`}>
          <rect width="120" height="150" rx="6" fill="var(--vdg-color-surface)" stroke={doc.active ? primaryColor : secondaryColor} strokeWidth={2} opacity={doc.active ? 1 : 0.55} />
          {doc.active && (
            <>
              <line x1="18" y1="30" x2="102" y2="30" stroke={primaryColor} strokeWidth={4} strokeLinecap="round" />
              <line x1="18" y1="50" x2="90" y2="50" stroke={secondaryColor} strokeWidth={3} strokeLinecap="round" opacity={0.5} />
              <line x1="18" y1="66" x2="96" y2="66" stroke={secondaryColor} strokeWidth={3} strokeLinecap="round" opacity={0.5} />
              <line x1="18" y1="82" x2="70" y2="82" stroke={secondaryColor} strokeWidth={3} strokeLinecap="round" opacity={0.5} />
              <rect x="18" y="108" width="30" height="14" rx="7" fill={primaryColor} opacity={0.15} />
            </>
          )}
        </g>
      ))}
    </IllustrationFrame>
  );
}
