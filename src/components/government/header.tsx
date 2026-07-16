"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Landmark, Menu, X, IdCard, Building2, ShieldCheck, Bell, User, Settings, LogOut, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useGovernment } from "@/components/government/providers"
import { t } from "@/components/government/i18n"
import { GOV_ROUTES, PORTAL_HOME, isLoggedInSection, activePortal, type Portal } from "@/components/government/routes"

const NAV: { key: "home" | "helpCenter"; href: string }[] = [
  { key: "home", href: GOV_ROUTES.home },
  { key: "helpCenter", href: GOV_ROUTES.help },
]

const PORTALS: { key: Portal; label: string; icon: typeof IdCard }[] = [
  { key: "citizen", label: "Công dân", icon: IdCard },
  { key: "business", label: "Doanh nghiệp", icon: Building2 },
  { key: "officer", label: "Cán bộ", icon: ShieldCheck },
]

/** Sticky, glass-effect header shared by every logged-in-chrome demo screen. `loggedIn`/`portal` are derived from the URL — this demo has no real session. */
export function GovernmentHeader({ unreadCount = 0 }: { unreadCount?: number }) {
  const pathname = usePathname()
  const router = useRouter()
  const { locale, toggleLocale } = useGovernment()
  const [mobileOpen, setMobileOpen] = useState(false)

  const loggedIn = isLoggedInSection(pathname)
  const portal = activePortal(pathname)

  function switchPortal(next: Portal) {
    router.push(PORTAL_HOME[next])
  }

  function logout() {
    router.push(GOV_ROUTES.home)
  }

  return (
    <header className="glass sticky top-0 z-50 border-b border-border">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-6">
        <Link href={GOV_ROUTES.home} className="flex shrink-0 items-center gap-2.5 font-heading text-[15px] font-bold">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),black_25%)] text-primary-foreground shadow-sm">
            <Landmark className="size-4.5" strokeWidth={2} />
          </span>
          <span className="hidden sm:inline">Cổng Dịch vụ công Số</span>
        </Link>

        {loggedIn ? (
          <div className="hidden items-center gap-1 rounded-full border border-border p-1 lg:flex" role="group" aria-label="Chuyển cổng dịch vụ">
            {PORTALS.map(({ key, label, icon: PortalIcon }) => (
              <button
                key={key}
                type="button"
                aria-pressed={portal === key}
                onClick={() => switchPortal(key)}
                className={
                  "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors " +
                  (portal === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")
                }
              >
                <PortalIcon className="size-3.5" strokeWidth={2} />
                {label}
              </button>
            ))}
          </div>
        ) : (
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
            {NAV.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground " +
                  (pathname === href ? "text-primary" : "text-muted-foreground")
                }
              >
                {t(locale, key)}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="hidden h-9 items-center gap-1.5 rounded-full border border-border px-3 text-[13px] font-medium sm:flex"
          >
            {locale === "vi" ? "🇻🇳 VI" : "🇺🇸 EN"}
          </button>

          {loggedIn && (
            <Link
              href={GOV_ROUTES.notifications}
              aria-label="Thông báo"
              className="relative flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Bell className="size-4" />
              {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive" />}
            </Link>
          )}

          {loggedIn ? (
            <div className="hidden sm:block">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-full border border-border py-1 pr-2 pl-1 outline-none">
                  <Avatar size="sm">
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8}>
                  <DropdownMenuItem onClick={() => router.push(GOV_ROUTES.profile)}>
                    <User className="size-4 text-muted-foreground" /> {t(locale, "profile")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push(GOV_ROUTES.settings)}>
                    <Settings className="size-4 text-muted-foreground" /> {t(locale, "settings")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={logout}>
                    <LogOut className="size-4" /> {t(locale, "logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="sm" nativeButton={false} render={<Link href={GOV_ROUTES.register} />}>
                {t(locale, "register")}
              </Button>
              <Button variant="default" size="sm" nativeButton={false} render={<Link href={GOV_ROUTES.login} />}>
                {t(locale, "login")}
              </Button>
            </div>
          )}

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg border border-border lg:hidden"
            aria-label="Mở menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-3 lg:hidden" aria-label="Điều hướng di động">
          {loggedIn ? (
            <>
              {PORTALS.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    switchPortal(key)
                    setMobileOpen(false)
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted"
                >
                  {label}
                </button>
              ))}
              <Link
                href={GOV_ROUTES.profile}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted"
              >
                {t(locale, "profile")}
              </Link>
              <Link
                href={GOV_ROUTES.settings}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted"
              >
                {t(locale, "settings")}
              </Link>
            </>
          ) : (
            <>
              {NAV.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted"
                >
                  {t(locale, key)}
                </Link>
              ))}
              <Link
                href={GOV_ROUTES.register}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-muted"
              >
                {t(locale, "register")}
              </Link>
            </>
          )}
          <Button
            variant="default"
            size="sm"
            className="mt-2 w-full"
            onClick={() => {
              if (loggedIn) logout()
              else router.push(GOV_ROUTES.login)
              setMobileOpen(false)
            }}
          >
            {loggedIn ? t(locale, "logout") : t(locale, "login")}
          </Button>
        </nav>
      )}
    </header>
  )
}
