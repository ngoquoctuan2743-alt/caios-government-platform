import { IllustrationFrame } from "../shared/IllustrationFrame";
import { FlatPerson } from "../shared/FlatPerson";
import type { VdgAssetProps } from "../shared/types";

/** A citizen figure beside a lock-in-shield -- for login/register screens. */
export function AuthenticationIllustration({
  primaryColor = "var(--vdg-color-primary)",
  secondaryColor = "var(--vdg-color-text-secondary)",
  className,
}: VdgAssetProps) {
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Xác thực và đăng nhập" className={className}>
      <circle cx="160" cy="230" r="90" fill={primaryColor} opacity={0.06} />
      <FlatPerson x={120} y={230} scale={1.3} skinColor={secondaryColor} clothColor={primaryColor} />
      <g transform="translate(206 172)">
        <path d="M -22 -6 L 0 -14 L 22 -6 V 22 Q 22 38 0 46 Q -22 38 -22 22 Z" fill="var(--vdg-color-surface)" stroke={primaryColor} strokeWidth={2.5} strokeLinejoin="round" />
        <rect x="-9" y="6" width="18" height="16" rx="3" fill={primaryColor} />
        <path d="M -6 6 V -2 Q -6 -9 0 -9 Q 6 -9 6 -2 V 6" fill="none" stroke={primaryColor} strokeWidth={2.5} />
      </g>
    </IllustrationFrame>
  );
}
