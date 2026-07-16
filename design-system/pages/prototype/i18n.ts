/**
 * Prototype-scoped i18n dictionary. Deliberately a new file under
 * pages/prototype/, not an edit to tokens/i18n-sample.ts (core
 * design-system, covered by Demo Freeze) -- this extends the same
 * `Locale`/dictionary shape established there with the additional strings
 * Phase 4's new screens need.
 */
export type Locale = "vi" | "en";

export const dictionary = {
  vi: {
    home: "Trang chủ",
    helpCenter: "Trung tâm hỗ trợ",
    register: "Đăng ký",
    login: "Đăng nhập",
    logout: "Đăng xuất",
    profile: "Hồ sơ cá nhân",
    settings: "Cài đặt",
    notifications: "Thông báo",
    citizen: "Công dân",
    business: "Doanh nghiệp",
    officer: "Cán bộ",
    continue: "Tiếp tục",
    back: "Quay lại",
    search: "Tìm kiếm",
  },
  en: {
    home: "Home",
    helpCenter: "Help Center",
    register: "Register",
    login: "Sign in",
    logout: "Sign out",
    profile: "My Profile",
    settings: "Settings",
    notifications: "Notifications",
    citizen: "Citizen",
    business: "Business",
    officer: "Officer",
    continue: "Continue",
    back: "Back",
    search: "Search",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type DictionaryKey = keyof (typeof dictionary)["vi"];

export function t(locale: Locale, key: DictionaryKey): string {
  return dictionary[locale][key];
}
