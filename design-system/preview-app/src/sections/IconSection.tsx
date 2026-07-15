import { Icon, ICON_CATEGORIES, type IconCategory } from "@ds/assets/icons";

const ORDER: IconCategory[] = [
  "government",
  "citizen",
  "business",
  "workflow",
  "ai",
  "documents",
  "payment",
  "notification",
  "security",
  "analytics",
  "support",
  "settings",
];

export function IconSection() {
  return (
    <section className="border-b border-[var(--vdg-color-border)] py-16">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">
              07 — Phase 2 · Icon Library
            </span>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              Icons
            </h2>
          </div>
          <p className="max-w-[40ch] text-sm text-[var(--vdg-color-text-secondary)]">
            12 danh mục trên nền <code>lucide-react</code> (đã có sẵn) — outline, 2px stroke, 3 cỡ chuẩn 20/24/32.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {ORDER.map((key) => {
            const category = ICON_CATEGORIES[key];
            return (
              <div key={key} className="rounded-[var(--vdg-radius-lg)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] p-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--vdg-color-text-secondary)]">
                  {category.label}
                </div>
                <div className="flex gap-3">
                  {Object.entries(category.icons).map(([name, LucideIconComponent]) => (
                    <div key={name} className="flex flex-col items-center gap-1 text-[var(--vdg-color-text)]" title={name}>
                      <Icon icon={LucideIconComponent} size="md" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
