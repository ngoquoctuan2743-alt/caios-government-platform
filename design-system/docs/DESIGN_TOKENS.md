# Design Tokens

Source of truth: `design-system/tokens/*.ts`. Compiled into CSS custom properties in `design-system/theme/{light,dark}/theme.css` (prefix `--vdg-*`). Every value below is read directly from the token files, not retyped from memory.

## Color

### Light theme (`tokens/colors.ts` → `lightPalette`)

| Token | Hex | Role |
|---|---|---|
| `primary` | `#C8102E` | Government Red — brand accent |
| `primaryDark` | `#991B1B` | hover/active state for primary |
| `gold` | `#F4C542` | AI/highlight accent — **fill/icon only, never text** (see `ACCESSIBILITY_REPORT.md`) |
| `blue` | `#2563EB` | informational accent |
| `success` | `#22C55E` | |
| `warning` | `#F59E0B` | pair with dark text, not white, for small text |
| `danger` | `#DC2626` | |
| `info` | `#3B82F6` | |
| `background` | `#F6F8FB` | |
| `surface` | `#FFFFFF` | |
| `border` | `#E5E7EB` | |
| `text` | `#111827` | |
| `textSecondary` | `#6B7280` | |

### Dark theme (`tokens/colors.ts` → `darkPalette`)

| Token | Hex | Role |
|---|---|---|
| `background` | `#0F172A` | |
| `card` | `#1E293B` | |
| `surface` | `#111827` | |
| `text` | `#FFFFFF` | |
| `accent` | `#C8102E` | Government Red, unchanged from light theme — deliberate brand consistency |
| `accentOnDark` | `#F0455C` | lighter red for small interactive text on the darkest background, where the base red's margin is tighter |
| `border` | `rgba(255,255,255,0.12)` | |
| `textSecondary` | `#94A3B8` | |

## Typography (`tokens/typography.ts`)

- **Heading:** Be Vietnam Pro
- **Body:** Inter
- **Code:** JetBrains Mono
- **Weights:** regular 400 · medium 500 · semibold 600 · bold 700

| Scale | Size | Line-height |
|---|---|---|
| `xs` | 0.75rem (12px) | 1.5 |
| `sm` | 0.875rem (14px) | 1.5 |
| `base` | 1rem (16px) | 1.6 |
| `lg` | 1.125rem (18px) | 1.6 |
| `xl` | clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem) | 1.4 |
| `2xl` | clamp(1.5rem, 1.3rem + 0.9vw, 1.875rem) | 1.3 |
| `3xl` | clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem) | 1.2 |
| `4xl` | clamp(2.25rem, 1.7rem + 2.2vw, 3.25rem) | 1.1 |

## Spacing (`tokens/spacing.ts`) — 4px base unit

`0`=0 · `1`=4px · `2`=8px · `3`=12px · `4`=16px · `5`=20px · `6`=24px · `8`=32px · `10`=40px · `12`=48px · `16`=64px · `20`=80px · `24`=96px · `32`=128px

## Radius (`tokens/radius.ts`)

`none`=0 · `sm`=6px (inputs, tags) · `md`=10px (buttons) · `lg`=14px (cards) · `xl`=20px (modals, hero panels) · `full`=9999px (pills, avatars, badges)

## Shadow (`tokens/shadow.ts`)

Light: `sm` `0 1px 2px rgba(17,24,39,.04)` · `md` `0 4px 12px rgba(17,24,39,.06)` · `lg` `0 12px 32px -8px rgba(17,24,39,.12)` · `xl` `0 24px 48px -12px rgba(17,24,39,.18)` · `glass` `0 8px 32px rgba(17,24,39,.08)`.

Dark: same scale names, deeper/larger values (`sm`…`xl` from `rgba(0,0,0,.4)` to `rgba(0,0,0,.6)`) — dark surfaces need more spread to read as elevated.

## Opacity (`tokens/opacity.ts`)

`disabled`=0.4 · `hover`=0.08 · `pressed`=0.12 · `watermarkLow`=0.02 · `watermarkHigh`=0.04 (pattern watermark range) · `overlay`=0.5 · `full`=1

## Motion (`tokens/animation.ts`)

- **Durations:** instant 100ms · fast 150ms · base 200ms · slow 300ms
- **Easing:** standard `[0.4,0,0.2,1]` · decelerate `[0,0,0.2,1]` (entrances) · accelerate `[0.4,0,1,1]` (exits)
- **Presets:** `fadeIn`, `slideUp`, `scaleIn`, `lift` — ready-to-spread values for either CSS-in-JS or manual keyframe authoring (no animation library is currently wired in; see `PERFORMANCE_REPORT.md`).
- Global CSS (`preview-app/src/globals.css`) additionally defines `.vdg-in` (a single `fade + 10px rise` entrance keyframe, used with staggered `animationDelay`) and honors `prefers-reduced-motion` by collapsing all animation/transition durations to ~0.

## Z-index (`tokens/z-index.ts`)

`base`=0 · `dropdown`=100 · `sticky`=200 · `overlay`=300 · `modal`=400 · `popover`=500 · `toast`=600 · `aiAssistant`=700 · `tooltip`=800

## Border width (`tokens/border.ts`)

`0`=0 · `hairline`=1px (default for cards/inputs/dividers) · `thick`=2px (icon strokes, focus rings, selected states)

## Breakpoints (`tokens/breakpoints.ts`) — mobile-first, `min-width`

`mobile`=0 · `tablet`=640px · `laptop`=1024px · `desktop`=1280px · `wide`=1536px

See `RESPONSIVE_GUIDE.md` for how these map to actual Tailwind `sm/lg` usage in the prototype.
