import { LayoutGrid, FileText, Workflow, Bell, Settings, Sparkles, type LucideIcon } from "lucide-react";
import { Badge } from "@ds/components";

export interface SidebarItem {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  badge?: string;
}

const DEFAULT_NAV: SidebarItem[] = [
  { label: "Bảng điều khiển", icon: LayoutGrid, active: true },
  { label: "Hồ sơ của tôi", icon: FileText, badge: "3" },
  { label: "Quy trình", icon: Workflow },
  { label: "Thông báo", icon: Bell, badge: "5" },
  { label: "Trợ lý AI", icon: Sparkles },
  { label: "Cài đặt", icon: Settings },
];

/**
 * Dashboard navigation. Desktop: fixed-width vertical sidebar. Below `lg`
 * it collapses to a horizontally-scrollable icon bar instead of
 * disappearing entirely — same `items`, no functionality lost on mobile.
 */
export function Sidebar({ items = DEFAULT_NAV }: { items?: SidebarItem[] }) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] px-3 py-6 lg:block">
        <nav className="flex flex-col gap-1" aria-label="Điều hướng bảng điều khiển">
          {items.map(({ label, icon: NavIcon, active, badge }) => (
            <button
              key={label}
              type="button"
              aria-current={active ? "page" : undefined}
              className={
                "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors " +
                (active
                  ? "bg-[var(--vdg-color-primary)]/10 text-[var(--vdg-color-primary)]"
                  : "text-[var(--vdg-color-text-secondary)] hover:bg-[var(--vdg-color-border)]/50 hover:text-[var(--vdg-color-text)]")
              }
            >
              <span className="flex items-center gap-3">
                <NavIcon className="size-4.5" strokeWidth={2} />
                {label}
              </span>
              {badge && <Badge variant={active ? "primary" : "neutral"}>{badge}</Badge>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile / tablet: horizontal icon bar, sticky under the header.
          `self-start` is load-bearing: the parent (`<div className="flex ...">`
          in each dashboard page) is a flex ROW alongside <main>, and flex's
          default `align-items: stretch` would otherwise stretch this nav to
          match <main>'s full page height. */}
      <nav
        className="sticky top-16 z-40 flex h-fit shrink-0 gap-1.5 self-start overflow-x-auto border-b border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] px-3 py-2.5 lg:hidden"
        aria-label="Điều hướng bảng điều khiển"
      >
        {items.map(({ label, icon: NavIcon, active, badge }) => (
          <button
            key={label}
            type="button"
            aria-current={active ? "page" : undefined}
            className={
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors " +
              (active
                ? "bg-[var(--vdg-color-primary)] text-white"
                : "bg-[var(--vdg-color-background)] text-[var(--vdg-color-text-secondary)] hover:text-[var(--vdg-color-text)]")
            }
          >
            <NavIcon className="size-3.5" strokeWidth={2} />
            {label}
            {badge && (
              <span className={"rounded-full px-1.5 text-[10px] " + (active ? "bg-white/20" : "bg-[var(--vdg-color-border)]")}>{badge}</span>
            )}
          </button>
        ))}
      </nav>
    </>
  );
}
