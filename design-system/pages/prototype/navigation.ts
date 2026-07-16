/** Shared navigation vocabulary for the clickable prototype -- one source of truth instead of each screen re-typing the same string unions. */
export type Screen =
  | "landing"
  | "auth"
  | "mfa"
  | "forgot-password"
  | "register-landing"
  | "register-citizen"
  | "register-business"
  | "register-otp"
  | "register-success"
  | "citizen-dashboard"
  | "business-dashboard"
  | "officer-dashboard"
  | "case-detail"
  | "profile"
  | "settings"
  | "notifications"
  | "help-center"
  | "legal"
  | "error"
  | "search-results";

export type Portal = "citizen" | "business" | "officer";

export const PORTAL_HOME: Record<Portal, Screen> = {
  citizen: "citizen-dashboard",
  business: "business-dashboard",
  officer: "officer-dashboard",
};

/** Screens that render full-bleed (no shared Header/Footer chrome) -- focused single-task flows. */
export const STANDALONE_SCREENS: Screen[] = [
  "auth",
  "mfa",
  "forgot-password",
  "register-landing",
  "register-citizen",
  "register-business",
  "register-otp",
  "register-success",
  "error",
];

/** Legacy alias -- kept so any earlier reference to "auth screens" still resolves to the login sub-flow specifically. */
export const AUTH_SCREENS: Screen[] = ["auth", "mfa", "forgot-password"];

export type LegalDoc = "terms" | "privacy" | "data" | "accessibility";

export type ErrorType = "404" | "500" | "maintenance" | "access-denied" | "session-expired";

export type RegisterAccountType = "citizen" | "business";
