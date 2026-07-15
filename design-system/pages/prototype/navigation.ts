/** Shared navigation vocabulary for the clickable prototype -- one source of truth instead of each screen re-typing the same string unions. */
export type Screen =
  | "landing"
  | "auth"
  | "mfa"
  | "forgot-password"
  | "citizen-dashboard"
  | "business-dashboard"
  | "officer-dashboard"
  | "case-detail";

export type Portal = "citizen" | "business" | "officer";

export const PORTAL_HOME: Record<Portal, Screen> = {
  citizen: "citizen-dashboard",
  business: "business-dashboard",
  officer: "officer-dashboard",
};

export const AUTH_SCREENS: Screen[] = ["auth", "mfa", "forgot-password"];
