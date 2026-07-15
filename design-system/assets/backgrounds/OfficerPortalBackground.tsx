import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { GovernmentSecurityPattern } from "../patterns/GovernmentSecurityPattern";
import { DongSonPattern } from "../patterns/DongSonPattern";
import type { VdgAssetProps } from "../shared/types";

/** Authority-signaling surface for the Officer console: shield watermark field, with a single Đông Sơn sunburst motif anchored in one corner as the "official" accent. */
export function OfficerPortalBackground({
  primaryColor = "var(--vdg-color-primary)",
  opacity = 1,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 1200 700" opacity={opacity} className={className}>
      <svg width="1200" height="700">
        <GovernmentSecurityPattern id={`${gid}-shield`} primaryColor={primaryColor} opacity={0.03} size={70} />
      </svg>
      <svg x="960" y="20" width="220" height="220">
        <DongSonPattern id={`${gid}-dongson`} primaryColor={primaryColor} opacity={0.06} size={220} />
      </svg>
    </BackgroundFrame>
  );
}
