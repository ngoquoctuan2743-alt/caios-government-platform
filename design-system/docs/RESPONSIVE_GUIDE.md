# Responsive Guide

Mobile-first, built with Tailwind's default breakpoint scale (matches `tokens/breakpoints.ts`: `sm`=640px, `lg`=1024px are the two actually used in the prototype's CSS).

## Per-screen behavior

| Screen | Mobile (<1024px) | Desktop (≥1024px) |
|---|---|---|
| **Header** | Logo + hamburger; nav/portal-switcher/locale/login collapse into a slide-down mobile menu (`Header.tsx`'s `mobileOpen` state) | Full horizontal nav / Portal switcher pill group inline |
| **Sidebar** (dashboards) | Horizontal, scrollable pill bar, sticky under the header (`Sidebar.tsx`, `lg:hidden` branch) | Fixed 256px vertical list (`lg:block` branch) |
| **Dashboard content grids** | Stat cards: 2-column (`grid-cols-2`); Citizen Dashboard's timeline/applications + notifications/quick-actions columns stack full-width | Stat cards: 4-column; two-column layouts (`lg:grid-cols-[1fr_320px]` etc.) |
| **AuthPage** | Left brand panel (`hidden lg:block`) drops entirely — form panel becomes the full screen | Split 2-column: brand panel + form panel |
| **AI Assistant Panel** | Same floating panel, width capped via `max-w-[calc(100vw-2.5rem)]` so it never overflows a narrow viewport | Fixed 22rem width |
| **Landing hero / services / news grids** | Single column | `sm:grid-cols-2 lg:grid-cols-3` |

## A real bug, caught and fixed here

When the Sidebar's mobile horizontal nav was first added, it broke catastrophically: the nav bar stretched to **~3000px tall**. Root cause: each dashboard page wraps `<Sidebar />` and `<main>` in a plain `flex` (row) container. Flexbox's default `align-items: stretch` makes every flex child match the tallest sibling's height — and `<main>` (the full page content) is very tall. The desktop `<aside>` never triggered this because it was `hidden` (removed from layout) below `lg`; but the new mobile `<nav>` was a real, visible flex-row sibling with no height constraint of its own, so it stretched to match `<main>`.

**Fix, in two parts:**
1. `Sidebar.tsx`'s mobile `<nav>` got `self-start h-fit shrink-0` so it never stretches regardless of the parent's `align-items`.
2. Every dashboard wrapper (`CitizenDashboardPage.tsx`, `BusinessDashboardPage.tsx`, `OfficerDashboardPage.tsx`) changed from `className="flex ..."` to `className="flex flex-col lg:flex-row ..."` — so on mobile, Sidebar and main content stack vertically (as intended: nav bar on top, content below) instead of sitting side-by-side as flex-row items.

This was only caught by actually resizing the running app to a mobile viewport and taking a screenshot — reading the JSX alone did not reveal it (the classes looked reasonable in isolation; the bug was in how two files' layout assumptions interacted). Documented here as the concrete example behind this design system's "verify against the real thing" principle (`DESIGN_SYSTEM.md` principle #7).

## Testing checklist (what was actually exercised)

- 1280×900 (desktop) — all 8 screens, both themes
- 375×812 (mobile, iPhone-class) — Landing, Auth, Citizen Dashboard (post-fix), light and dark
- Portal switcher, AI Assistant panel open/close, and Workflow Timeline states checked at both sizes

Not yet exercised: tablet (768px) as its own explicit breakpoint (the prototype only branches at `sm` and `lg` today — a genuine tablet viewport falls into the "mobile" branch's styling, which is functional but not tablet-optimized). Flagged as a known limitation in `DEMO_REPORT.md`, not silently left untested.
