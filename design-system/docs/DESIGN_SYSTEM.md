# Design System — Vietnam Digital Government Design System (VDG-DS)

## What this is

A from-scratch 2026 enterprise design language for a Vietnamese national digital government platform. It is **not** a clone of the Vietnam National Public Service Portal (dichvucong.gov.vn) — no icons, layouts, illustrations, images, or assets were copied from it. It borrows only spacing discipline, information hierarchy, and "trustworthy government" tone, reinterpreted through influences from GOV.UK Design System, Microsoft Fluent 2, Material 3, IBM Carbon, and Apple HIG.

## Design Principles

1. **Trust before delight.** Color, motion, and density read as reliable and official first, modern second. When the two conflict, trust wins.
2. **Vietnamese-first, not Vietnamese-only.** Vietnamese is the default language and the primary design target (diacritics, line length, font support). English is a first-class second citizen. This is why the heading typeface is **Be Vietnam Pro**, not the originally-briefed Poppins — Poppins ships no Vietnamese glyph coverage at all (verified against Google Fonts' own subset data), so a Vietnamese-first platform cannot use it for headings without visibly mis-rendering Vietnamese text.
3. **One state machine.** Every interactive component has an explicit default / hover / focus / active / disabled / loading / error state defined at the token level, never improvised per-page.
4. **Accessible by construction, not by audit.** Color pairs are chosen to pass WCAG AA at the token level (see `docs/ACCESSIBILITY_REPORT.md` for the computed numbers); `eslint-plugin-jsx-a11y` runs on every file in this package's own independent lint pass.
5. **Restraint in motion.** Animation confirms an action happened; it never performs for its own sake. Nothing exceeds ~500ms, nothing loops indefinitely except the two explicit "system is alive" signals (AI Assistant idle pulse, workflow active-step pulse), and everything respects `prefers-reduced-motion`.
6. **Flat, geometric, non-literal illustration.** No stock-photo realism, no cartoon mascots. All 16 illustrations and 16 patterns are hand-built from primitive shapes (circles, rects, simple bezier paths) — including geometry inspired by the lotus flower and Đông Sơn drum motifs, reduced to abstract line-work rather than reproductions of specific artwork.
7. **Verify against the real thing, not a mockup.** Every component and page is checked by actually importing it into the running Design Preview app and driving it — clicking, tabbing, toggling theme, resizing to mobile — not by re-describing intended behavior in prose. (This is how the one real responsive bug documented in `docs/RESPONSIVE_GUIDE.md` was caught.)

## Brand Identity

- **Primary color:** Government Red `#C8102E` — the single accent that appears across buttons, links, active states, and the logo mark. Same value in light and dark theme (a deliberate brand-consistency choice, not an oversight — see `docs/DESIGN_TOKENS.md`).
- **Secondary accent:** Gold `#F4C542` — used for the "AI-assisted" badge and celebratory/highlight moments only. Never used as text color (fails contrast — see accessibility report).
- **Typography:** Be Vietnam Pro (headings) + Inter (body) + JetBrains Mono (code/IDs). Both display faces are self-hosted, subsetted for Latin + Vietnamese.
- **Shape language:** Rounded corners throughout (6px–20px depending on component scale), soft multi-layer shadows (never a hard drop-shadow), light-mode-only glassmorphism on the header and select cards.
- **Iconography:** Lucide icons, 2px stroke, used at 14/16/18/20px depending on context — see `docs/COMPONENT_CATALOG.md`'s icon section.

## Governance

- **No new dependencies beyond what's justified.** The only additions beyond what CAIOS already had installed are Vite + `@vitejs/plugin-react` (this package's own build tool) — everything else (React, Tailwind, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `@base-ui/react`, ESLint + its plugins) was already present in the monorepo's root `node_modules` and is reused, not duplicated.
- **Every visual asset is a component, not a file.** No raw `.svg` is ever imported. See `docs/COMPONENT_CATALOG.md` for the shared `VdgAssetProps` contract every pattern/background/illustration implements.
- **Phased delivery, each phase verified before the next.** Phase 1 (tokens/theme/components) → Phase 2 (visual identity: backgrounds/patterns/icons/illustrations) → Phase 3 (page composition, connected clickable prototype) → UI Polish → Demo Freeze (current). See `DEMO_REPORT.md` for what each phase actually shipped.

## Where the rest of the detail lives

This file is the philosophy. For specifics:

| Topic | File |
|---|---|
| Folder layout, how to run | `docs/PROJECT_STRUCTURE.md` |
| Every component/pattern/background/illustration, with props | `docs/COMPONENT_CATALOG.md` |
| Every screen in the prototype | `docs/PAGE_MAP.md` |
| How a user moves between screens | `docs/USER_FLOW.md` |
| Exact token values | `docs/DESIGN_TOKENS.md` |
| Breakpoints and mobile-specific patterns | `docs/RESPONSIVE_GUIDE.md` |
| Contrast ratios, keyboard nav, ARIA | `docs/ACCESSIBILITY_REPORT.md` |
| Bundle size, load strategy | `docs/PERFORMANCE_REPORT.md` |
| How to actually run the demo | `docs/DEMO_CHECKLIST.md` |
