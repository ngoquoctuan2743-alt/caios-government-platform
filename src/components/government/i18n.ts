import type { Locale } from "./providers"

/** Shared chrome strings (nav, header, footer). Ported from design-system/pages/prototype/i18n.ts. */
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
} as const satisfies Record<Locale, Record<string, string>>

export type DictionaryKey = keyof (typeof dictionary)["vi"]

export function t(locale: Locale, key: DictionaryKey): string {
  return dictionary[locale][key]
}
