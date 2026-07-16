import { IllustrationFrame } from "../shared/IllustrationFrame";
import { AINetworkPattern } from "../patterns/AINetworkPattern";
import type { VdgAssetProps } from "../shared/types";

/** An abstract "thinking" orb built from the AI Network pattern -- no anthropomorphic robot, keeps the AI Assistant panel feeling like a system, not a character. */
export function AIAssistantIllustration({
  primaryColor = "var(--vdg-color-primary)",
  opacity = 1,
  animated = false,
  className,
}: VdgAssetProps) {
  return (
    <IllustrationFrame viewBox="0 0 320 320" label="Trợ lý AI" className={className}>
      <g style={{ opacity }}>
        <circle cx="160" cy="160" r="120" fill={primaryColor} opacity={0.06} />
        <circle cx="160" cy="160" r="82" fill="var(--vdg-color-surface)" stroke={primaryColor} strokeWidth={1.5} opacity={0.5} />
        <svg x="60" y="60" width="200" height="200">
          <AINetworkPattern primaryColor={primaryColor} opacity={0.5} size={200} animated={animated} />
        </svg>
        <g fill={primaryColor}>
          <path d="M 160 128 l 8 24 24 8 -24 8 -8 24 -8 -24 -24 -8 24 -8 z" opacity={0.9}>
            {animated && <animateTransform attributeName="transform" type="rotate" from="0 160 160" to="360 160 160" dur="8s" repeatCount="indefinite" />}
          </path>
        </g>
      </g>
    </IllustrationFrame>
  );
}
