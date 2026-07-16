import { useState } from "react";
import { Landmark, Menu, X, IdCard, Building2, ShieldCheck, Bell, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { Button, Avatar } from "@ds/components";
import type { Screen, Portal } from "./navigation";
import { PORTAL_HOME } from "./navigation";
import { t, type Locale } from "./i18n";

const NAV: { key: "home" | "helpCenter"; target: Screen }[] = [
  { key: "home", target: "landing" },
  { key: "helpCenter", target: "help-center" },
];

const PORTALS: { key: Portal; label: string; icon: typeof IdCard }[] = [
  { key: "citizen", label: "Công dân", icon: IdCard },
  { key: "business", label: "Doanh nghiệp", icon: Building2 },
  { key: "officer", label: "Cán bộ", icon: ShieldCheck },
];

/** Sticky, glass-effect header shared by every non-standalone prototype screen. */
export function Header({
  active,
  portal,
  loggedIn,
  locale,
  unreadCount = 0,
  onNavigate,
  onSwitchPortal,
  onToggleLocale,
  onLogout,
}: {
  active: Screen;
  portal: Portal;
  loggedIn: boolean;
  locale: Locale;
  unreadCount?: number;
  onNavigate: (screen: Screen) => void;
  onSwitchPortal: (portal: Portal) => void;
  onToggleLocale: () => void;
  onLogout: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--vdg-color-border)] bg-[var(--vdg-glass-bg)] backdrop-blur-[var(--vdg-glass-blur)]">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-6">
        <button
          type="button"
          onClick={() => onNavigate("landing")}
          className="flex shrink-0 items-center gap-2.5 text-[15px] font-bold"
          style={{ fontFamily: "var(--vdg-font-heading)" }}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--vdg-color-primary)] to-[var(--vdg-color-primary-dark)] text-white shadow-[var(--vdg-shadow-sm)]">
            <Landmark className="size-4.5" strokeWidth={2} />
          </span>
          <span className="hidden sm:inline">Cổng Dịch vụ công Số</span>
        </button>

        {loggedIn ? (
          <div className="hidden items-center gap-1 rounded-full border border-[var(--vdg-color-border)] p-1 lg:flex" role="group" aria-label="Chuyển cổng dịch vụ">
            {PORTALS.map(({ key, label, icon: PortalIcon }) => (
              <button
                key={key}
                type="button"
                aria-pressed={portal === key}
                onClick={() => onSwitchPortal(key)}
                className={
                  "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors " +
                  (portal === key ? "bg-[var(--vdg-color-primary)] text-white" : "text-[var(--vdg-color-text-secondary)] hover:text-[var(--vdg-color-text)]")
                }
              >
                <PortalIcon className="size-3.5" strokeWidth={2} />
                {label}
              </button>
            ))}
          </div>
        ) : (
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
            {NAV.map(({ key, target }) => (
              <button
                key={key}
                type="button"
                onClick={() => onNavigate(target)}
                aria-current={active === target ? "page" : undefined}
                className={
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--vdg-color-border)]/50 hover:text-[var(--vdg-color-text)] " +
                  (active === target ? "text-[var(--vdg-color-primary)]" : "text-[var(--vdg-color-text-secondary)]")
                }
              >
                {t(locale, key)}
              </button>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLocale}
            className="hidden h-9 items-center gap-1.5 rounded-full border border-[var(--vdg-color-border)] px-3 text-[13px] font-medium sm:flex"
          >
            {locale === "vi" ? "🇻🇳 VI" : "🇺🇸 EN"}
          </button>

          {loggedIn && (
            <button
              type="button"
              onClick={() => onNavigate("notifications")}
              aria-label="Thông báo"
              className="relative flex size-9 items-center justify-center rounded-full border border-[var(--vdg-color-border)] text-[var(--vdg-color-text-secondary)] transition-colors hover:text-[var(--vdg-color-text)]"
            >
              <Bell className="size-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[var(--vdg-color-danger)]" />
              )}
            </button>
          )}

          {loggedIn ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                className="flex items-center gap-1.5 rounded-full border border-[var(--vdg-color-border)] py-1 pr-2 pl-1"
              >
                <Avatar size="sm" fallback="A" />
                <ChevronDown className="size-3.5 text-[var(--vdg-color-text-secondary)]" />
              </button>
              {menuOpen && (
                <div
                  className="vdg-in absolute top-11 right-0 w-48 overflow-hidden rounded-[var(--vdg-radius-md)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] py-1 shadow-[var(--vdg-shadow-lg)]"
                  style={{ animationDuration: "0.15s" }}
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate("profile");
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm hover:bg-[var(--vdg-color-border)]/40"
                  >
                    <User className="size-4 text-[var(--vdg-color-text-secondary)]" /> {t(locale, "profile")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate("settings");
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm hover:bg-[var(--vdg-color-border)]/40"
                  >
                    <Settings className="size-4 text-[var(--vdg-color-text-secondary)]" /> {t(locale, "settings")}
                  </button>
                  <div className="my-1 border-t border-[var(--vdg-color-border)]" />
                  <button
                    type="button"
                    onClick={() => {
                      onLogout();
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-[var(--vdg-color-danger)] hover:bg-[var(--vdg-color-danger)]/10"
                  >
                    <LogOut className="size-4" /> {t(locale, "logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="sm" onClick={() => onNavigate("register-landing")}>
                {t(locale, "register")}
              </Button>
              <Button variant="primary" size="sm" onClick={() => onNavigate("auth")}>
                {t(locale, "login")}
              </Button>
            </div>
          )}

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg border border-[var(--vdg-color-border)] lg:hidden"
            aria-label="Mở menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-[var(--vdg-color-border)] px-6 py-3 lg:hidden" aria-label="Điều hướng di động">
          {loggedIn
            ? [
                ...PORTALS.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      onSwitchPortal(key);
                      onNavigate(PORTAL_HOME[key]);
                      setMobileOpen(false);
                    }}
                    className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[var(--vdg-color-text)] hover:bg-[var(--vdg-color-border)]/50"
                  >
                    {label}
                  </button>
                )),
                <button
                  key="profile"
                  type="button"
                  onClick={() => {
                    onNavigate("profile");
                    setMobileOpen(false);
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[var(--vdg-color-text)] hover:bg-[var(--vdg-color-border)]/50"
                >
                  {t(locale, "profile")}
                </button>,
                <button
                  key="settings"
                  type="button"
                  onClick={() => {
                    onNavigate("settings");
                    setMobileOpen(false);
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[var(--vdg-color-text)] hover:bg-[var(--vdg-color-border)]/50"
                >
                  {t(locale, "settings")}
                </button>,
              ]
            : [
                ...NAV.map(({ key, target }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      onNavigate(target);
                      setMobileOpen(false);
                    }}
                    className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[var(--vdg-color-text)] hover:bg-[var(--vdg-color-border)]/50"
                  >
                    {t(locale, key)}
                  </button>
                )),
                <button
                  key="register"
                  type="button"
                  onClick={() => {
                    onNavigate("register-landing");
                    setMobileOpen(false);
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[var(--vdg-color-text)] hover:bg-[var(--vdg-color-border)]/50"
                >
                  {t(locale, "register")}
                </button>,
              ]}
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (loggedIn) onLogout();
              else onNavigate("auth");
              setMobileOpen(false);
            }}
            className="mt-2 w-full"
          >
            {loggedIn ? t(locale, "logout") : t(locale, "login")}
          </Button>
        </nav>
      )}
    </header>
  );
}
