/** Central path constants for the Government Platform demo route group, so no page hand-types a URL string more than once. */
export const GOV_ROUTES = {
  home: "/",
  login: "/government/login",
  mfa: "/government/login/mfa",
  forgotPassword: "/government/login/forgot-password",
  register: "/government/register",
  registerCitizen: "/government/register/citizen",
  registerBusiness: "/government/register/business",
  registerOtp: "/government/register/otp",
  registerSuccess: "/government/register/success",
  citizen: "/government/citizen",
  business: "/government/business",
  officer: "/government/officer",
  case: (id: string) => `/government/case/${id}`,
  profile: "/government/profile",
  settings: "/government/settings",
  notifications: "/government/notifications",
  help: "/government/help",
  legal: (doc: string) => `/government/legal/${doc}`,
  search: "/government/search",
} as const

export type Portal = "citizen" | "business" | "officer"

export const PORTAL_HOME: Record<Portal, string> = {
  citizen: GOV_ROUTES.citizen,
  business: GOV_ROUTES.business,
  officer: GOV_ROUTES.officer,
}

/** Pages under /government/** that render inside the logged-in chrome (Header portal switcher + avatar menu, not Đăng ký/Đăng nhập). Derived from the URL instead of a session, since this demo has no real auth. */
export function isLoggedInSection(pathname: string): boolean {
  return (
    pathname.startsWith(GOV_ROUTES.citizen) ||
    pathname.startsWith(GOV_ROUTES.business) ||
    pathname.startsWith(GOV_ROUTES.officer) ||
    pathname.startsWith("/government/case") ||
    pathname.startsWith(GOV_ROUTES.profile) ||
    pathname.startsWith(GOV_ROUTES.settings) ||
    pathname.startsWith(GOV_ROUTES.notifications)
  )
}

export function activePortal(pathname: string): Portal {
  if (pathname.startsWith(GOV_ROUTES.business)) return "business"
  if (pathname.startsWith(GOV_ROUTES.officer)) return "officer"
  return "citizen"
}
