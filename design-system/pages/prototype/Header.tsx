import { useState } from "react";
import { Landmark, Menu, X, IdCard, Building2, ShieldCheck } from "lucide-react";
import { Button } from "@ds/components";
import type { Screen, Portal } from "./navigation";
import { PORTAL_HOME } from "./navigation";

const NAV_VI: { label: string; target: Screen }[] = [
  { label: "Trang chủ", target: "landing" },
  { label: "Hồ sơ của tôi", target: "citizen-dashboard" },
];

const PORTALS: { key: Portal; label: string; icon: typeof IdCard }[] = [
  { key: "citizen", label: "Công dân", icon: IdCard },
  { key: "business", label: "Doanh nghiệp", icon: Building2 },
  { key: "officer", label: "Cán bộ", icon: ShieldCheck },
];

/** Sticky, glass-effect header shared by every non-auth prototype screen. */
export function Header({
  active,
  portal,
  loggedIn,
  onNavigate,
  onSwitchPortal,
}: {
  active: Screen;
  portal: Portal;
  loggedIn: boolean;
  onNavigate: (screen: Screen) => void;
  onSwitchPortal: (portal: Portal) => void;
}) {
  const [locale, setLocale] = useState<"vi" | "en">("vi");
  const [mobileOpen, setMobileOpen] = useState(false);

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
            {NAV_VI.map(({ label, target }) => (
              <button
                key={label}
                type="button"
                onClick={() => onNavigate(target)}
                aria-current={active === target ? "page" : undefined}
                className={
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--vdg-color-border)]/50 hover:text-[var(--vdg-color-text)] " +
                  (active === target ? "text-[var(--vdg-color-primary)]" : "text-[var(--vdg-color-text-secondary)]")
                }
              >
                {label}
              </button>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLocale((l) => (l === "vi" ? "en" : "vi"))}
            className="hidden h-9 items-center gap-1.5 rounded-full border border-[var(--vdg-color-border)] px-3 text-[13px] font-medium sm:flex"
          >
            {locale === "vi" ? "🇻🇳 VI" : "🇺🇸 EN"}
          </button>
          {loggedIn ? (
            <Button variant="secondary" size="sm" onClick={() => onNavigate("landing")} className="hidden sm:inline-flex">
              Đăng xuất
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={() => onNavigate("auth")} className="hidden sm:inline-flex">
              Đăng nhập
            </Button>
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
            ? PORTALS.map(({ key, label }) => (
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
              ))
            : NAV_VI.map(({ label, target }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    onNavigate(target);
                    setMobileOpen(false);
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[var(--vdg-color-text)] hover:bg-[var(--vdg-color-border)]/50"
                >
                  {label}
                </button>
              ))}
          <Button variant="primary" size="sm" onClick={() => onNavigate(loggedIn ? "landing" : "auth")} className="mt-2 w-full">
            {loggedIn ? "Đăng xuất" : "Đăng nhập"}
          </Button>
        </nav>
      )}
    </header>
  );
}
