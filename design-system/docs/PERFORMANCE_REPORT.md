# Performance Report

## Production bundle (measured, `npm run build -w design-system`)

```
dist/index.html                  0.40 kB │ gzip:   0.27 kB
dist/assets/index-*.css         62.39 kB │ gzip:  10.35 kB
dist/assets/index-*.js         453.46 kB │ gzip: 132.18 kB
2086 modules transformed, built in ~4.6s
```

For context: this single JS bundle contains the *entire* demo — 8 full page compositions, 11 core components, 17 backgrounds, 16 patterns, 16 illustrations, and the full navigation shell. No code-splitting/route-based chunking has been set up (a single-bundle Vite SPA build), which is appropriate for a demo (one initial load, then everything is instant client-side navigation) but would need addressing before this became a real multi-route production app — see roadmap.

## Why the asset strategy is fast by construction

- **Every visual asset is inline SVG rendered by React, not a network request.** 17 backgrounds + 16 patterns + 16 illustrations = 49 assets, and none of them costs a single HTTP round-trip — they're compiled into the JS bundle as component code. The trade-off (larger JS bundle vs. many small image requests) favors JS here because Vite/esbuild tree-shakes and minifies the SVG-as-JSX efficiently, and there's no image-decode cost or layout-shift-while-loading risk that bitmap assets would carry.
- **Zero bitmap images anywhere in the design system** — no PNG/JPG/WebP. Nothing to lazy-load, no responsive `srcset` complexity, no CLS (Cumulative Layout Shift) risk from late-loading images.
- **Fonts are self-hosted and subsetted**, not loaded from Google's CDN at runtime (`preview-app/public/fonts/`, referenced via local `@font-face` in `globals.css`). Each of Be Vietnam Pro (4 weights) and Inter is split into `latin` and `vietnamese` unicode-range subsets — the browser only downloads the subset actually needed for the text on screen, per Google Fonts' own subsetting split. `font-display: swap` on every `@font-face` avoids invisible-text-on-load (FOIT).

## Rendering cost

- All entrance/hover/pulse animations are CSS `transform`/`opacity`-only (`.vdg-in` keyframe, Tailwind `hover:-translate-y-*`, `active:scale-*`, `animate-ping`) — these are compositor-only properties that don't trigger layout or paint, the cheapest possible animations for the browser.
- The two continuously-running animations (`AIAssistantPanel`'s idle-pulse ring, `WorkflowTimeline`'s active-step pulse) are both scoped to a single small element each, not full-page — negligible paint cost, and both stop entirely under `prefers-reduced-motion`.
- No client-side data fetching, no `useEffect` polling, no re-render loops — every dashboard/table is static demo data (`const CASES = [...]` etc.), so there's no runtime cost beyond the initial render for any screen.

## What was not done (measured, not just assumed)

- **No Lighthouse/PageSpeed run was performed** against the built `dist/` output — the numbers above are build-tool-reported (Vite's own gzip sizes), not a real-browser performance trace (First Contentful Paint, Time to Interactive, etc.). Flagged rather than implied.
- **No route-based code splitting.** Everything ships in one JS bundle regardless of which of the 8 screens is viewed first. Fine for a demo (small enough total size, single audience session); would need `React.lazy` + route-level chunks if this became a real deployed multi-page app with cold-start-sensitive users.
- **No image compression pipeline to evaluate** — moot, since there are no bitmap images in the system at all.

## Recommendation if this becomes a real deployment

1. Run an actual Lighthouse pass against `dist/` served statically, to get real FCP/TTI/CLS numbers instead of build-tool byte counts.
2. Add route-level code splitting once there's a real router (React Router / Next.js App Router) instead of the current in-memory `Screen` state switch, since a real app wouldn't want to ship the Officer Dashboard's code to a citizen who never logs in as an officer.
3. Consider a `font-display` + preload strategy for the two heading weights used above the fold (400/700) if Largest Contentful Paint on the Landing hero becomes a measured concern.
