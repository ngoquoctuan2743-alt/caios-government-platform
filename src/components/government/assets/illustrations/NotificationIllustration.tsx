import { IllustrationFrame } from "../shared/IllustrationFrame";
import type { VdgAssetProps } from "../shared/types";

/** A bell with an unread badge and soft radiating rings -- for the Notification Center. */
export function NotificationIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-danger)",
  animated = false,
  className,
}: VdgAssetProps) {
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Trung tâm thông báo" className={className}>
      <circle cx="160" cy="160" r="110" fill={primaryColor} opacity={0.06} />
      {[40, 60].map((r) => (
        <circle key={r} cx="160" cy="140" r={r} fill="none" stroke={primaryColor} strokeWidth={1.5} opacity={0.15} />
      ))}
      <g transform="translate(160 140)" fill={primaryColor}>
        <path d="M -30 20 Q -30 -30 0 -34 Q 30 -30 30 20 L 38 32 L -38 32 Z" />
        <path d="M -10 32 Q -10 44 0 44 Q 10 44 10 32 Z" opacity={0.7} />
      </g>
      <circle cx="196" cy="112" r="12" fill={secondaryColor}>
        {animated && <animate attributeName="r" values="12;14;12" dur="1.4s" repeatCount="indefinite" />}
      </circle>
    </IllustrationFrame>
  );
}
