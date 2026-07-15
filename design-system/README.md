# Vietnam Digital Government Design System (VDG-DS)

**Status: DEMO FREEZE.** Phase 1 (tokens/theme/components) → Phase 2 (visual identity) → Phase 3 (connected clickable prototype) → UI Polish are all complete. From this point, only bug fixes, visual-consistency fixes, accessibility fixes, performance optimization, responsive fixes, code cleanup, and documentation are in scope — no new pages/components/features/workflows/animations/assets. See **`DEMO_REPORT.md`** (this folder) for the full summary, and **`docs/`** for the complete documentation set (project structure, design system, component catalog, page map, user flow, design tokens, responsive guide, accessibility report, performance report, demo checklist).
**Isolation:** `design-system` is an npm **workspace member** of the `citizen-ai-case-manager` repo (declared in the root `package.json`'s `"workspaces"` field), but it is **not imported by, and does not affect, the CAIOS application** in `src/`. It has its own `package.json`, `tsconfig.json`, and `eslint.config.mjs` — completely independent scripts, completely independent lint rules. Nothing here changes CAIOS's build, typecheck, lint, or runtime behavior; both are verified after every change in this package.
**Stack:** React 19 + TypeScript + Tailwind CSS v4 + `@base-ui/react` + `class-variance-authority`, all already-installed root dependencies. The one genuinely new addition is **Vite** (+ `@vitejs/plugin-react`), needed for this package's own real build pipeline (the Design Preview app) — declared as `design-system`'s own `devDependencies`, not the root app's.

This is **not** a clone of the Vietnam National Public Service Portal (dichvucong.gov.vn). No icons, layouts, illustrations, images, or assets were copied from it. It borrows only spacing discipline, information hierarchy, and "trustworthy government" tone, and reinterprets them through a 2026 enterprise design language influenced by GOV.UK Design System, Fluent 2, Material 3, IBM Carbon, and Apple HIG.

---

## Running this package

Every command below is scoped to this workspace only — it never touches the root CAIOS app's build.

```bash
npm run typecheck -w design-system   # tsc --noEmit, this package's own tsconfig.json
npm run lint -w design-system        # eslint ., this package's own eslint.config.mjs (no Next.js rules)
npm run dev -w design-system         # Vite dev server for the Design Preview app, http://localhost:4300
npm run build -w design-system       # production build of the Design Preview app -> preview-app/dist
```

## Design Principles

1. **Trust before delight.** Every visual decision (color, motion, density) should read as reliable and official first, modern second. When those two goals conflict, trust wins.
2. **Vietnamese-first, not Vietnamese-only.** Vietnamese is the default language and the primary design target (diacritics, line length, font support) — English is a first-class second citizen, not an afterthought translation layer. This is why the heading typeface is **Be Vietnam Pro**, not Poppins (see below).
3. **One state machine.** Every component has an explicit default / hover / focus / active / disabled / loading / error state defined in tokens, never improvised per-page.
4. **Accessible by construction, not by audit.** Color pairs are chosen to pass WCAG AA at the token level; `eslint-plugin-jsx-a11y` runs on every file in this package's own lint pass, not bolted on later.
5. **Restraint in motion.** Animation confirms an action happened; it never performs for its own sake. No animation exceeds ~300ms; nothing loops or auto-plays.
6. **Flat, geometric, non-literal illustration.** No stock-photo realism, no cartoon mascots. Phase 2's pattern/illustration work uses abstract geometry, not depictions of specific people/offices.
7. **Verify against the real thing, not a mockup.** Every component is checked by actually importing it into the Design Preview app and driving it — clicking, tabbing, toggling theme — not by re-describing its intended behavior in prose.

## Why Be Vietnam Pro, not Poppins

The original brief specified Poppins for headings. Checked against Google Fonts' own subset data: **Poppins ships no Vietnamese-script glyph range at all** — none of its `latin`, `latin-ext`, or `devanagari` subsets cover `U+1EA0-1EF9`, where most Vietnamese tone-marked vowels (ệ, ữ, ợ, ...) live. Given principle #2, a Vietnamese-first platform cannot ship a heading face that mis-renders Vietnamese headings. **Be Vietnam Pro** is a geometric sans purpose-built for Vietnamese with full Latin coverage too, so it replaces Poppins outright rather than being layered alongside it. Fonts are self-hosted in `preview-app/public/fonts/` (not linked from a Google CDN) — see `preview-app/src/globals.css` for the `@font-face` declarations.

## Folder Structure

```
design-system/
├── README.md
├── package.json               — workspace member: own scripts (typecheck/lint/dev/build)
├── tsconfig.json               — own TS project
├── eslint.config.mjs           — own lint rules (no Next.js-specific rules)
├── vite.config.ts              — build pipeline for the Design Preview app
├── postcss.config.mjs          — Tailwind v4 processing for the Design Preview app
├── tokens/                     — ✅ raw design tokens (color, type, space, radius, shadow, motion, z-index, border, breakpoints, i18n starter)
├── theme/                      — ✅ light + dark theme (CSS custom properties + TS mirror)
├── components/                 — ✅ 11 core components (Button, Input, Card, Badge, Avatar, Tabs, Table, Modal, Accordion, EmptyState, Skeleton)
├── lib/                        — ✅ shared `cn()` class-merge utility
├── preview-app/                — ✅ real Vite + React app, imports components/tokens/theme directly — replaces the old static preview.html
│   ├── index.html
│   ├── public/fonts/            — self-hosted Be Vietnam Pro + Inter woff2 files
│   └── src/
│       ├── main.tsx, App.tsx (full navigation shell), globals.css
│       └── sections/            — Color, Typography, Token, Component, Background, Pattern, Icon, Illustration (the "Xem Design System" reference view)
├── assets/
│   ├── shared/                  — ✅ cross-cutting: `VdgAssetProps`/`VdgPatternProps` contract, `BackgroundFrame`, `IllustrationFrame`, `FlatPerson`
│   ├── patterns/                — ✅ 16 tileable SVG pattern components
│   ├── backgrounds/             — ✅ 17 full-scene SVG background components
│   ├── icons/                   — ✅ 12-category map on top of `lucide-react`
│   ├── illustrations/           — ✅ 16 flat SVG illustration components (each reuses a pattern from `assets/patterns`)
│   └── logos/                   — not started
└── pages/prototype/             — ✅ Phase 3: the connected clickable prototype (default view when running the Design Preview app)
    ├── navigation.ts             — single source of truth for `Screen`/`Portal` types + `PORTAL_HOME`/`AUTH_SCREENS`
    ├── Header.tsx, Sidebar.tsx   — shared chrome; Header switches between logged-out nav and the logged-in Portal switcher
    ├── LandingPage.tsx           — Hero, Smart Search, Popular Services, Statistics, News, AI Assistant teaser
    ├── AuthPage.tsx, MfaPage.tsx, ForgotPasswordPage.tsx — Login (password + Digital Identity tabs), 2FA, password reset
    ├── CitizenDashboardPage.tsx  — Personal Overview, Applications, Notifications, Quick Actions, Timeline
    ├── BusinessDashboardPage.tsx — Enterprise Summary, Licenses, Tax, Documents, Reports
    ├── OfficerDashboardPage.tsx  — Pending Cases, Approval Queue, SLA gauge, Weekly Analytics
    ├── CaseDetailPage.tsx        — Timeline, Approval Flow actions, Documents, AI Summary, Activity Log
    ├── WorkflowTimeline.tsx      — shared 4-step status timeline used by both dashboards and Case Detail
    └── AIAssistantPanel.tsx      — persistent floating assistant, bottom-right, on every non-auth screen
```

## Every visual asset is a component, not a file

`assets/shared/types.ts` defines one contract (`VdgAssetProps`) used by every pattern, background, and illustration:

```tsx
<HeroBackground />                                   // zero props needed — colors default to theme tokens
<WorkflowBackground animated />
<LotusPattern opacity={0.03} />                        // no `id` prop — auto via useId()
<DigitalMeshPattern primaryColor="var(--vdg-color-info)" />
<CitizenIllustration secondaryColor="var(--vdg-color-gold)" />
```

No raw `.svg` file is ever imported anywhere in this package. Every asset: repaints automatically on theme change (colors default to `var(--vdg-color-*)`, never a hardcoded hex), accepts `primaryColor` / `secondaryColor` / `opacity` / `animated` / `className`, tree-shakes normally (named exports, not a sprite sheet or icon font), and needs no `id` bookkeeping from the consumer.

## Naming changed since the first Phase 2 pass

Patterns were renamed for consistency with the final category list and to drop the now-unnecessary required `id` prop: `LotusOutlinePattern` → `LotusPattern`, `CircuitLinesPattern` → `CircuitPattern`, `WavePattern` → `WavesPattern`, `FlowLinesPattern` → `WorkflowLinesPattern`. Three patterns are new: `AINetworkPattern`, `GovernmentSecurityPattern`, `DataFlowPattern`.

## A real bug the Design Preview app caught (worth knowing)

Replacing the static mockup with real rendering immediately paid for itself: `@base-ui/react`'s `Tabs.Panel` marks the outgoing panel `inert` synchronously on tab change, but its `data-hidden` / native `hidden` attribute is gated behind an animation-completion promise (`element.getAnimations()`) that, in this Vite + React 19 dev setup, never resolved — so without a fix, **every tab panel stayed visible and stacked** after the first switch. `components/Tabs/Tabs.tsx`'s `TabsPanel` now hides on `[inert]` directly (confirmed to update synchronously with tab selection) instead of relying on the animation-gated attribute. This was caught by clicking through the real component in the real preview app, not by reading the static mockup.

## i18n (starting point, not full architecture)

`tokens/i18n-sample.ts` contains the example vi/en string pairs from the brief as a literal starting dictionary shape. The prototype's Header has a working `🇻🇳 VI` / `🇺🇸 EN` toggle (state exists, click it and it flips), but the Phase 3 pages themselves are authored Vietnamese-only content — the toggle does not yet re-render page copy in English. Wiring every page's strings through a real dictionary is real, non-trivial work (every one of the ~9 new pages), and was not silently done — flagged here rather than claimed as complete.

## Accessibility notes on the given color palette

The brand palette in the brief was honored exactly (hex values unchanged) — see `tokens/colors.ts` for computed contrast notes. One flag worth knowing: **Gold (`#F4C542`) fails WCAG AA as a text color on both white and the light background** (~1.6:1, needs ≥4.5:1) — it is usable as a fill, badge background (with dark text on top), icon accent, or border, but must never be used as body/label text color on a light surface. This is documented at the token level so it can't be used wrong by accident.

## Phase 2 status

Complete: 17 backgrounds (Hero, Dashboard, Authentication, Workflow, Citizen/Business/Officer/Admin Portal, Search, Reports, AI Assistant, Empty State, 404, 500, Success, Warning, Maintenance), 16 patterns, 12 icon categories, 16 illustrations (Citizen, Business, Government Officer, AI Assistant, Workflow, Digital Documents, Digital Signature, Payment, Notification, Analytics, Authentication, Empty States, Smart Search, Support Center, Smart City, National Data Platform). All previewable live in the Design Preview app (`npm run dev -w design-system`).

**Execution order note:** patterns were built before backgrounds in this pass (shared types → patterns → backgrounds → illustrations), not backgrounds-first as originally requested — because backgrounds and illustrations both compose patterns as layers, having the pattern library finished first meant every background/illustration could consistently reuse a real pattern component instead of some being written against not-yet-existing ones. Same consistency goal, different ordering; noted here rather than silently diverging from the ask.

**Not started:** SVG Background/Pattern/Illustration set for `logos/`.

## Phase 3 status

Complete: a single connected, clickable prototype (`design-system/pages/prototype/`, the default view of the Design Preview app). Real navigation, not separate disconnected screens:

- **Landing** → "Đăng nhập" → **Auth** (password or Digital Identity tab) → **MFA** → lands on **Citizen Dashboard**, now "logged in."
- Header's Portal switcher (visible only while logged in) jumps between **Citizen / Business / Officer** dashboards instantly.
- Citizen Dashboard and Officer Dashboard: clicking any case row opens **Case Detail**; "Quay lại" returns to whichever dashboard it was opened from (tracked, not hardcoded to one screen).
- Auth screen's "Quên mật khẩu?" → **Forgot Password** (with its own sent-confirmation state) → back to Auth.
- "Đăng xuất" (logout) returns to Landing and clears the logged-in state.

Verified by actually clicking through every transition above in the running dev server (not just reading the code) — see the exchange right before this status section for the click-by-click trace.

**Known gaps, stated plainly:**
- Locale toggle is cosmetic on Phase 3 pages (see i18n note above) — Vietnamese-only content.
- Business Dashboard has no drill-down (its rows aren't clickable to a detail screen) — only Citizen/Officer flows into Case Detail were requested to connect.
- No admin console screen was requested or built in this pass.
- `Header`'s desktop nav intentionally shows only 2 links pre-login (`Trang chủ`, `Hồ sơ của tôi`) rather than a full site-map — kept small since most of the real destinations only make sense once "logged in" (dashboards), matching how a real gated portal would behave.
