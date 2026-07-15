import { spacing } from "@ds/tokens/spacing";
import { radius } from "@ds/tokens/radius";

const SPACING_KEYS: (keyof typeof spacing)[] = [1, 2, 4, 6, 8, 12, 16];
const RADIUS_KEYS: (keyof typeof radius)[] = ["sm", "md", "lg", "xl", "full"];

export function TokenSection() {
  return (
    <section className="border-b border-[var(--vdg-color-border)] py-16">
      <div className="mx-auto max-w-[1180px] px-8">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">
          03 — Token nền tảng
        </span>
        <h2 className="mb-9 text-3xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
          Spacing · Radius · Shadow
        </h2>
        <div className="flex flex-wrap gap-10">
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--vdg-color-text-secondary)]">
              Spacing (4px base)
            </h4>
            <div className="flex items-end gap-3">
              {SPACING_KEYS.map((key) => (
                <div key={key} className="text-center">
                  <div className="h-2 bg-[var(--vdg-color-primary)]" style={{ width: spacing[key] }} />
                  <div className="mt-1.5 font-mono text-[10px] text-[var(--vdg-color-text-secondary)]">{key}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--vdg-color-text-secondary)]">Radius</h4>
            <div className="flex items-end gap-3">
              {RADIUS_KEYS.map((key) => (
                <div key={key} className="text-center">
                  <div className="size-12 bg-[var(--vdg-color-primary)]" style={{ borderRadius: radius[key] }} />
                  <div className="mt-1.5 font-mono text-[10px] text-[var(--vdg-color-text-secondary)]">{key}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--vdg-color-text-secondary)]">Elevation</h4>
            <div className="flex items-end gap-3">
              {(["sm", "md", "lg", "xl"] as const).map((key) => (
                <div key={key} className="text-center">
                  <div className="h-12 w-16 rounded-[var(--vdg-radius-md)] bg-[var(--vdg-color-surface)]" style={{ boxShadow: `var(--vdg-shadow-${key})` }} />
                  <div className="mt-1.5 font-mono text-[10px] text-[var(--vdg-color-text-secondary)]">{key}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
