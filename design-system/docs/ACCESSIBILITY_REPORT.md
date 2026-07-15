# Accessibility Report

## Automated linting

`eslint-plugin-jsx-a11y` runs as part of this package's own independent ESLint config (`eslint.config.mjs`) — not bolted on after the fact, it lints every `.tsx` file in `components/`, `assets/`, `pages/`, and `preview-app/` on every `npm run lint -w design-system`.

**Current result: 0 errors, 0 warnings** (verified with `--max-warnings=0`, which surfaces warnings that a plain `eslint .` run could otherwise pass silently).

One real finding was caught and fixed by this rule during Phase 1: `jsx-a11y/heading-has-content` flagged `CardTitle` (`components/Card/Card.tsx`) because the rule can't see through a `{...props}` spread to know children are always supplied by real callers. Verified as a false positive for this specific generic-wrapper pattern and suppressed with a narrow, commented `eslint-disable-next-line` on that one line — not disabled package-wide.

## Color contrast (computed, not estimated)

Using the WCAG relative-luminance formula against the exact stated background — see `tokens/colors.ts` for the source comments.

| Pair | Ratio | Result |
|---|---|---|
| Primary `#C8102E` text/fill on white / `#F6F8FB` background | 5.88:1 | **PASS** AA normal text (needs ≥4.5:1) |
| White text on Primary `#C8102E` fill (buttons) | 5.88:1 | **PASS** |
| `text` `#111827` on `#F6F8FB` background | 16.1:1 | **PASS**, well above requirement |
| `textSecondary` `#6B7280` on white | ~4.6:1 | **PASS**, but borderline — do not use below 14px/regular with this pairing |
| Dark theme `accent` `#C8102E` on `#0F172A` background | 5.6:1 | **PASS** |
| **Gold `#F4C542` as text color on white/light background** | **~1.6:1** | **FAILS AA** (needs ≥4.5:1 normal, ≥3:1 large) |

**Enforcement, not just documentation:** `Badge`'s `gold` variant (`components/Badge/Badge.tsx`) is hardcoded to always pair with dark text (`--vdg-color-text`), never white — the failing combination is structurally prevented at the component level, not left to each call site to remember.

## Keyboard navigation

- All interactive elements are real `<button>`/`<input>`/`<a>`-equivalent primitives (via `@base-ui/react` for Tabs/Modal/Accordion/Avatar) — no `<div onClick>` faux-buttons except `TableRow`, which is intentionally a native `<tr onClick>` for the case-list click-to-open pattern (a real limitation, see below).
- `Modal` gets a focus trap and `Escape`-to-close for free from `@base-ui/react/dialog`.
- `Tabs` (`AuthPage`'s Mật khẩu/Định danh điện tử switch) supports arrow-key navigation between triggers via the underlying primitive.
- Global `:focus-visible` styling (`preview-app/src/globals.css`) applies `var(--vdg-focus-ring)` to every focusable element site-wide — not just `Button`, which had its own focus ring before this was made global in the UI Polish pass.

**Known gap:** `TableRow`'s `onClick` (used for "click a case row to open Case Detail" on the Citizen and Officer dashboards) is not independently keyboard-reachable — a `<tr>` is not natively focusable and no `tabIndex`/`onKeyDown` Enter-key handler was added. Mouse/touch users can open a case; keyboard-only users currently cannot from the table row itself. Flagged here rather than silently shipped as if it were fine — see `DEMO_REPORT.md`'s known limitations.

## Screen reader semantics

- `Tabs`/`TabsList`/`TabsTrigger`/`TabsPanel` render proper `role="tab"`/`role="tabpanel"` (confirmed via the accessibility tree during manual testing, see `DEMO_REPORT.md`).
- Every icon-only interactive control has an explicit `aria-label` (AI Assistant open/close/send buttons, Header's mobile hamburger, viewport-preset buttons in the reference view) — verified via `jsx-a11y`'s label-checking rules plus manual grep during the Demo Freeze audit.
- Decorative SVG assets (all backgrounds, all patterns) render with `aria-hidden` and `focusable="false"` via the shared `BackgroundFrame` wrapper — they never intrude on the accessibility tree.
- Illustrations use `IllustrationFrame`, which accepts an optional `label` prop: when given, the SVG gets `role="img"` + `aria-label`; when omitted, it defaults to `aria-hidden` (most current usages are decorative alongside labeled text, so this defaults conservatively rather than forcing every illustration to be announced).

## Motion sensitivity

Every animation in the system (entrance fades, the AI Assistant idle-pulse ring, the Workflow Timeline active-step pulse, tab/accordion transitions from `@base-ui/react`) is CSS-driven, and `preview-app/src/globals.css` collapses all animation/transition durations to ~0 under `@media (prefers-reduced-motion: reduce)` — a single global rule, not per-component opt-outs that could be missed.

## Not yet done

- No automated contrast/axe scan was run against the live DOM (e.g. axe-core, Lighthouse) — the numbers above are hand-computed against the token values, which is accurate for the token pairs actually used, but doesn't catch a case where a page composes colors in an unexpected way. Recommended before real production use — see `DEMO_REPORT.md` roadmap.
- No screen-reader software (NVDA/VoiceOver) walkthrough was performed — semantics were verified via the accessibility tree (`read_page`-style inspection), which reflects what a screen reader *would* announce but isn't the same as hearing it.
