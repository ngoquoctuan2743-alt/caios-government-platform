/**
 * Starting-point i18n dictionary shape (the literal examples from the
 * brief). This is NOT the full i18n architecture — routing strategy,
 * pluralization, and date/number formatting per-locale are scoped to
 * Phase 2 once page composition exists. This exists now so Phase 1
 * components can already accept a `dictionary` prop with the correct shape
 * instead of hardcoding English or Vietnamese strings internally.
 */
export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export const localeLabel: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

export const sampleDictionary: Record<Locale, Record<string, string>> = {
  vi: {
    dashboard: "Bảng điều khiển",
    citizen: "Công dân",
    business: "Doanh nghiệp",
    workflow: "Quy trình",
    notification: "Thông báo",
    administration: "Quản trị",
    profile: "Hồ sơ",
    search: "Tìm kiếm",
    aiAssistant: "Trợ lý AI",
    settings: "Cài đặt",
    helpCenter: "Trung tâm hỗ trợ",
  },
  en: {
    dashboard: "Dashboard",
    citizen: "Citizen",
    business: "Business",
    workflow: "Workflow",
    notification: "Notification",
    administration: "Administration",
    profile: "Profile",
    search: "Search",
    aiAssistant: "AI Assistant",
    settings: "Settings",
    helpCenter: "Help Center",
  },
};
