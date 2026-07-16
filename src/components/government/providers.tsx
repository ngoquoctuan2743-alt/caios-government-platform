"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type DemoTheme = "light" | "dark"
export type Locale = "vi" | "en"

interface GovernmentContextValue {
  theme: DemoTheme
  toggleTheme: () => void
  locale: Locale
  toggleLocale: () => void
  aiOpen: boolean
  setAiOpen: (open: boolean | ((prev: boolean) => boolean)) => void
}

const GovernmentContext = createContext<GovernmentContextValue | null>(null)

const THEME_KEY = "gov-demo-theme"
const LOCALE_KEY = "gov-demo-locale"

/**
 * Theme/locale state for the Government Platform demo route group only —
 * intentionally not the real app's theming (CAIOS has none today). Scoped
 * by wrapping children in a `.dark`-toggled div rather than touching
 * `<html>`/`<body>` from the root layout, so it can never leak into the
 * real `/login`, `/citizen/**`, `/officer/**` pages.
 */
export function GovernmentProviders({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<DemoTheme>("light")
  const [locale, setLocale] = useState<Locale>("vi")
  const [aiOpen, setAiOpen] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as DemoTheme | null
    const storedLocale = localStorage.getItem(LOCALE_KEY) as Locale | null
    if (storedTheme) {
      setTheme(storedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
    if (storedLocale) setLocale(storedLocale)
  }, [])

  function toggleTheme() {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark"
      localStorage.setItem(THEME_KEY, next)
      return next
    })
  }

  function toggleLocale() {
    setLocale((l) => {
      const next: Locale = l === "vi" ? "en" : "vi"
      localStorage.setItem(LOCALE_KEY, next)
      return next
    })
  }

  return (
    <GovernmentContext.Provider value={{ theme, toggleTheme, locale, toggleLocale, aiOpen, setAiOpen }}>
      <div className={theme === "dark" ? "dark" : undefined} suppressHydrationWarning>
        {children}
      </div>
    </GovernmentContext.Provider>
  )
}

export function useGovernment() {
  const ctx = useContext(GovernmentContext)
  if (!ctx) throw new Error("useGovernment must be used within GovernmentProviders")
  return ctx
}
