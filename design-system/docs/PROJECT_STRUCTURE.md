# Project Structure

`design-system/` is an npm **workspace member** of the `citizen-ai-case-manager` repository — fully isolated from the CAIOS application in `src/`. It has its own `package.json`, `tsconfig.json`, and `eslint.config.mjs`, and its own build pipeline (Vite). Nothing in this folder is imported by, or affects, CAIOS.

```
citizen-ai-case-manager/
├── package.json                 — root; "workspaces": ["design-system"]
├── src/, prisma/, ...            — CAIOS app (untouched by this design system)
└── design-system/
    ├── README.md                 — architecture overview, "why" decisions
    ├── package.json               — own scripts: typecheck / lint / dev / build
    ├── tsconfig.json               — own TS project (excluded from root tsconfig)
    ├── eslint.config.mjs           — own lint rules (no Next.js-specific rules)
    ├── vite.config.ts              — build pipeline for the Design Preview app
    ├── postcss.config.mjs          — Tailwind v4 processing
    │
    ├── docs/                       — this folder — the 10 deliverable docs + DEMO_REPORT.md
    │
    ├── tokens/                     — raw design tokens (source of truth)
    │   ├── colors.ts, typography.ts, spacing.ts, radius.ts, shadow.ts
    │   ├── opacity.ts, animation.ts, z-index.ts, border.ts, breakpoints.ts
    │   └── i18n-sample.ts          — starting-point vi/en dictionary shape
    │
    ├── theme/                      — tokens compiled into CSS custom properties
    │   ├── light/theme.css
    │   ├── dark/theme.css
    │   └── theme.ts                — TS mirror of the same values
    │
    ├── lib/
    │   └── cn.ts                   — clsx + tailwind-merge class helper, used by every component
    │
    ├── components/                 — 11 core UI components (see COMPONENT_CATALOG.md)
    │   └── <Name>/<Name>.tsx       — one folder per component
    │
    ├── assets/
    │   ├── shared/                 — cross-cutting: `VdgAssetProps` contract, `BackgroundFrame`,
    │   │                             `IllustrationFrame`, `FlatPerson`
    │   ├── patterns/                — 16 tileable SVG pattern components
    │   ├── backgrounds/             — 17 full-scene SVG background components
    │   ├── icons/                   — 12-category map on top of `lucide-react`
    │   ├── illustrations/           — 16 flat SVG illustration components
    │   └── logos/                   — not started (see DEMO_REPORT.md roadmap)
    │
    ├── pages/prototype/            — the connected, clickable demo (see PAGE_MAP.md)
    │   ├── navigation.ts            — single source of truth for `Screen`/`Portal` types
    │   ├── Header.tsx, Sidebar.tsx  — shared chrome
    │   ├── LandingPage.tsx
    │   ├── AuthPage.tsx, MfaPage.tsx, ForgotPasswordPage.tsx
    │   ├── CitizenDashboardPage.tsx, BusinessDashboardPage.tsx, OfficerDashboardPage.tsx
    │   ├── CaseDetailPage.tsx
    │   ├── WorkflowTimeline.tsx
    │   └── AIAssistantPanel.tsx
    │
    └── preview-app/                — the Vite app that renders everything above for real
        ├── index.html
        ├── public/fonts/            — self-hosted Be Vietnam Pro + Inter woff2 files
        └── src/
            ├── main.tsx, App.tsx     — full navigation shell (this is what boots the demo)
            ├── globals.css           — Tailwind entry, @font-face, global focus/animation styles
            ├── ReferenceView.tsx     — the "Xem Design System" toggle target
            └── sections/             — Color/Typography/Token/Component/Background/Pattern/Icon/Illustration
                                        reference sections shown by ReferenceView
```

## Running it

All commands are scoped to this workspace and never touch the root CAIOS app:

```bash
npm run dev -w design-system         # http://localhost:4300 — opens directly on the prototype
npm run build -w design-system       # production build → preview-app/dist
npm run typecheck -w design-system   # tsc --noEmit, this package's own tsconfig
npm run lint -w design-system        # eslint ., this package's own config (no Next.js rules)
```

## Import convention

Everything resolves through the `@ds/*` path alias (mapped to the `design-system/` root in both `tsconfig.json` and `vite.config.ts`):

```tsx
import { Button, Card } from "@ds/components";
import { HeroBackground } from "@ds/assets/backgrounds";
import { LotusPattern } from "@ds/assets/patterns";
import { CitizenIllustration } from "@ds/assets/illustrations";
import type { Screen, Portal } from "@ds/pages/prototype/navigation";
```
