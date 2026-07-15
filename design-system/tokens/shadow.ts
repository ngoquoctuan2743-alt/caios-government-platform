/**
 * Shadow tokens. Soft, low-opacity, government-appropriate — never a hard
 * drop shadow. Dark mode uses deeper/larger shadows since dark surfaces
 * need more spread to read as elevated (a shadow near-black on near-black
 * is nearly invisible otherwise).
 */
export const shadowLight = {
  sm: "0 1px 2px rgba(17, 24, 39, 0.04)",
  md: "0 4px 12px rgba(17, 24, 39, 0.06)",
  lg: "0 12px 32px -8px rgba(17, 24, 39, 0.12)",
  xl: "0 24px 48px -12px rgba(17, 24, 39, 0.18)",
  /** Glassmorphism — light mode only, per brief. Pair with `backdrop-blur`. */
  glass: "0 8px 32px rgba(17, 24, 39, 0.08)",
} as const;

export const shadowDark = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.4)",
  md: "0 4px 16px rgba(0, 0, 0, 0.45)",
  lg: "0 16px 40px -8px rgba(0, 0, 0, 0.55)",
  xl: "0 28px 56px -12px rgba(0, 0, 0, 0.6)",
} as const;

export type ShadowToken = keyof typeof shadowLight;
