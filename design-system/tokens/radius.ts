/** Radius tokens. "Rounded corners" per the brief — nothing sharp except focus rings. */
export const radius = {
  none: "0px",
  sm: "0.375rem", // 6px — inputs, tags
  md: "0.625rem", // 10px — buttons
  lg: "0.875rem", // 14px — cards
  xl: "1.25rem", // 20px — modals, hero panels
  full: "9999px", // pills, avatars, badges
} as const;

export type RadiusToken = keyof typeof radius;
