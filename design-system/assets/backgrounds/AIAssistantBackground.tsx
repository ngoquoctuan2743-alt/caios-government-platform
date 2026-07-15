import { useId } from "react";
import { BackgroundFrame } from "../shared/BackgroundFrame";
import { AINetworkPattern } from "../patterns/AINetworkPattern";
import type { VdgAssetProps } from "../shared/types";

/** AI Assistant panel surface: neural-network texture plus a soft central glow -- the "thinking" backdrop behind the chat panel. */
export function AIAssistantBackground({
  primaryColor = "var(--vdg-color-primary)",
  opacity = 1,
  animated = false,
  className,
}: VdgAssetProps) {
  const gid = useId();
  return (
    <BackgroundFrame viewBox="0 0 800 900" opacity={opacity} className={className}>
      <defs>
        <radialGradient id={`vdg-ai-glow-${gid}`} cx="50%" cy="30%" r="45%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity={0.1} />
          <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width="800" height="900" fill={`url(#vdg-ai-glow-${gid})`} />
      <svg width="800" height="900">
        <AINetworkPattern id={`${gid}-network`} primaryColor={primaryColor} opacity={0.045} size={90} animated={animated} />
      </svg>
    </BackgroundFrame>
  );
}
