import { LayoutGrid, FileText, Workflow, Bell, Settings, Sparkles, type LucideIcon } from "lucide-react"

import { StatusBadge } from "@/components/government/status-badge"

export interface SidebarItem {
  label: string
  icon: LucideIcon
  active?: boolean
  badge?: string
}

const DEFAULT_NAV: SidebarItem[] = [
  { label: "Bảng điều khiển", icon: LayoutGrid, active: true },
  { label: "Hồ sơ của tôi", icon: FileText, badge: "3" },
  { label: "Quy trình", icon: Workflow },
  { label: "Thông báo", icon: Bell, badge: "5" },
  { label: "Trợ lý AI", icon: Sparkles },
  { label: "Cài đặt", icon: Settings },
]

/** Dashboard navigation. Desktop: fixed-width vertical sidebar. Below `lg` it collapses to a horizontally-scrollable icon bar instead of disappearing. */
export function GovernmentSidebar({ items = DEFAULT_NAV }: { items?: SidebarItem[] }) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card px-3 py-6 lg:block">
        <nav className="flex flex-col gap-1" aria-label="Điều hướng bảng điều khiển">
          {items.map(({ label, icon: NavIcon, active, badge }) => (
            <button
              key={label}
              type="button"
              aria-current={active ? "page" : undefined}
              className={
                "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors " +
                (active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")
              }
            >
              <span className="flex items-center gap-3">
                <NavIcon className="size-4.5" strokeWidth={2} />
                {label}
              </span>
              {badge && <StatusBadge tone={active ? "primary" : "neutral"}>{badge}</StatusBadge>}
            </button>
          ))}
        </nav>
      </aside>

      <nav
        className="sticky top-16 z-40 flex h-fit shrink-0 gap-1.5 self-start overflow-x-auto border-b border-border bg-card px-3 py-2.5 lg:hidden"
        aria-label="Điều hướng bảng điều khiển"
      >
        {items.map(({ label, icon: NavIcon, active, badge }) => (
          <button
            key={label}
            type="button"
            aria-current={active ? "page" : undefined}
            className={
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors " +
              (active ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:text-foreground")
            }
          >
            <NavIcon className="size-3.5" strokeWidth={2} />
            {label}
            {badge && <span className={"rounded-full px-1.5 text-[10px] " + (active ? "bg-white/20" : "bg-border")}>{badge}</span>}
          </button>
        ))}
      </nav>
    </>
  )
}
