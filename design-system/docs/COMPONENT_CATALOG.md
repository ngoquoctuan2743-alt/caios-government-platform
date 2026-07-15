# Component Catalog

All imports go through `@ds/components`, `@ds/assets/patterns`, `@ds/assets/backgrounds`, `@ds/assets/illustrations`, or `@ds/assets/icons`.

## Core Components (11) — `@ds/components`

| Component | Variants / Props | Notes |
|---|---|---|
| `Button` | `variant`: primary · secondary · outline · ghost · danger. `size`: sm · md · lg. `loading`, `disabled` | `loading` swaps the leading content for a spinner without changing button width. Active state has a `scale-[0.97]` micro-interaction; primary has a colored shadow that lifts on hover. |
| `Input` | `size`: sm · md · lg. `startIcon`, `endIcon`, `label`, `helperText`, `errorText` | Error state switches the border/ring to `--vdg-color-danger` and shows `errorText` under the field. |
| `Card` + `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter` | `Card` `variant`: solid · elevated · glass. `interactive`: boolean | `glass` is light-mode-only glassmorphism — it automatically becomes a flat solid card in dark mode via the `--vdg-glass-bg`/`--vdg-glass-blur` tokens, no dark-mode class branch needed. `interactive` adds the standard hover-lift + shadow + border-tint treatment used by every clickable card (service cards, news cards). |
| `Badge` | `variant`: neutral · primary · success · warning · danger · info · gold. `icon` | Also serves as "Tag" from the original brief (same primitive, different semantic use). `gold` is always paired with dark text, never white — gold fails contrast as a background for white text too. |
| `Avatar` | `size`: sm · md · lg · xl. `src`, `alt`, `fallback` (required) | `fallback` should be 1-2 initials, never a generic silhouette — an official record should always show a concrete identifier. |
| `Tabs` + `TabsList` / `TabsTrigger` / `TabsPanel` | `value` / `defaultValue` / `onValueChange` (controlled or uncontrolled) | Built on `@base-ui/react/tabs`. `TabsPanel` hides on the `[inert]` attribute directly rather than the animation-gated `data-hidden` attribute — see `DEMO_REPORT.md`'s known-issues history for why. |
| `Table` + `TableHeader` / `TableBody` / `TableRow` / `TableHead` / `TableCell` | Plain `<table>` primitives, `TableRow` accepts `onClick` | Used for every list surface (Applications, Approval Queue, Tax rows). |
| `Modal` + `ModalTrigger` / `ModalContent` / `ModalClose` | `title`, `description` on `ModalContent` | Built on `@base-ui/react/dialog` — focus trap and `Escape`-to-close are free. |
| `Accordion` + `AccordionItem` / `AccordionTrigger` / `AccordionPanel` | `value` per item | Used for the AI Summary panel on Case Detail and the Landing FAQ-style content. |
| `EmptyState` | `icon`, `title`, `description`, `action` | Single primitive reused by every "no data yet" surface. |
| `Skeleton` | plain `className`-driven `<div>` | Loading placeholder, pulses via the shared `animate-pulse` utility. |

## Patterns (16) — `@ds/assets/patterns`

Every pattern implements `VdgPatternProps` (`primaryColor`, `opacity`, `animated`, `className`, optional `id`/`size`) — no `id` is required, it auto-generates via `useId()`.

`GridPattern` · `HexagonPattern` · `DotMatrixPattern` · `DigitalMeshPattern` · `CircuitPattern` · `NodesPattern` · `ConnectionsPattern` · `WorkflowLinesPattern` · `AbstractVietnamPattern` · `LotusPattern` · `DongSonPattern` · `WavesPattern` · `CloudPattern` · `AINetworkPattern` · `GovernmentSecurityPattern` · `DataFlowPattern`

Used at 2–4% opacity as watermark texture behind content; the Design Preview app shows them at 25% for visibility.

## Backgrounds (17) — `@ds/assets/backgrounds`

Every background implements `VdgAssetProps` (`primaryColor`, `secondaryColor`, `opacity`, `animated`, `className`) and is a full-scene, responsive (`viewBox` + `preserveAspectRatio`) SVG.

`HeroBackground` · `DashboardBackground` · `AuthenticationBackground` · `WorkflowBackground` · `CitizenPortalBackground` · `BusinessPortalBackground` · `OfficerPortalBackground` · `AdminPortalBackground` · `SearchBackground` · `ReportsBackground` · `AIAssistantBackground` · `EmptyStateBackground` · `NotFoundBackground` · `ServerErrorBackground` · `SuccessBackground` · `WarningBackground` · `MaintenanceBackground`

`ServerErrorBackground`, `SuccessBackground`, and `WarningBackground` default `primaryColor` to the matching semantic token (danger/success/warning) rather than the brand primary, since those are inherently state-specific surfaces — still overridable via props.

## Icons (12 categories) — `@ds/assets/icons`

A category map on top of `lucide-react` (2px stroke, 20/24/32px sizes per the brief): Government, Citizen, Business, Workflow, AI, Documents, Payment, Notification, Security, Analytics, Support, Settings. No new icon set was drawn — this maps the brief's requested categories onto the already-installed Lucide library so usage is consistent (which icon for which concept) across every page.

## Illustrations (16) — `@ds/assets/illustrations`

Every illustration implements `VdgAssetProps` and is flat, geometric, Vietnamese-first. Each one reuses at least one pattern or the shared `FlatPerson` figure for visual consistency:

`CitizenIllustration` · `BusinessIllustration` · `GovernmentOfficerIllustration` · `AIAssistantIllustration` · `WorkflowIllustration` · `DigitalDocumentsIllustration` · `DigitalSignatureIllustration` · `PaymentIllustration` · `NotificationIllustration` · `AnalyticsIllustration` · `AuthenticationIllustration` · `EmptyStatesIllustration` · `SmartSearchIllustration` · `SupportCenterIllustration` · `SmartCityIllustration` · `NationalDataPlatformIllustration`

## The shared asset contract

```tsx
export interface VdgAssetProps {
  primaryColor?: string;   // defaults to var(--vdg-color-primary)
  secondaryColor?: string; // defaults to var(--vdg-color-text-secondary)
  opacity?: number;
  animated?: boolean;      // enables the asset's built-in micro-interaction, where one exists
  className?: string;
}
```

No raw `.svg` file is imported anywhere in this package — every visual asset is a named, tree-shakeable React component that repaints automatically on theme change.

## Prototype-only composite components — `@ds/pages/prototype`

These are not part of the reusable design-system surface (they compose the above into specific screens) but are worth knowing about since other pages reuse them:

- `Header` — shared top nav; switches between logged-out nav links and the logged-in Portal switcher.
- `Sidebar` — dashboard nav; desktop vertical list, mobile horizontal scrollable pill bar (same `items` data, see `RESPONSIVE_GUIDE.md`).
- `WorkflowTimeline` — the 4-step status timeline used by all three dashboards and Case Detail.
- `AIAssistantPanel` — the persistent floating assistant, present on every non-auth screen.
