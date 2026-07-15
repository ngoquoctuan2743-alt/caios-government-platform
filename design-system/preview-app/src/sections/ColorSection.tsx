import { lightPalette, darkPalette } from "@ds/tokens/colors";

const NOTES: Record<string, { note: string; tone: "pass" | "warn" | "neutral" }> = {
  primary: { note: "5.9:1 trên nền trắng — PASS AA", tone: "pass" },
  gold: { note: "1.6:1 — FAIL. Chỉ dùng làm fill/icon, không dùng làm chữ", tone: "warn" },
  text: { note: "16.1:1 — PASS AA", tone: "pass" },
  textSecondary: { note: "4.6:1 — biên AA, không dùng nhỏ hơn 14px", tone: "neutral" },
};

const LIGHT_ORDER: (keyof typeof lightPalette)[] = [
  "primary", "primaryDark", "gold", "blue", "success", "warning", "danger", "info", "background", "surface", "text", "textSecondary",
];

const LABEL: Record<string, string> = {
  primary: "Primary", primaryDark: "Primary Dark", gold: "Gold", blue: "Blue", success: "Success",
  warning: "Warning", danger: "Danger", info: "Info", background: "Background", surface: "Surface",
  text: "Text", textSecondary: "Text Secondary",
};

export function ColorSection() {
  return (
    <section className="border-b border-[var(--vdg-color-border)] py-16">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">
              01 — Màu sắc
            </span>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              Color System
            </h2>
          </div>
          <p className="max-w-[32ch] text-sm text-[var(--vdg-color-text-secondary)]">
            Giá trị hex render trực tiếp từ <code>tokens/colors.ts</code> — không phải bản sao chép tay.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3.5">
          {LIGHT_ORDER.map((key) => {
            const hex = lightPalette[key];
            const meta = NOTES[key];
            return (
              <div key={key} className="overflow-hidden rounded-[var(--vdg-radius-lg)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)]">
                <div className="h-18 border-b border-black/5" style={{ background: hex, height: "72px" }} />
                <div className="p-3">
                  <div className="text-sm font-semibold">{LABEL[key]}</div>
                  <span className="mt-0.5 block font-mono text-[11px] text-[var(--vdg-color-text-secondary)]">{hex}</span>
                  {meta && (
                    <div
                      className="mt-1.5 text-[11px] leading-tight"
                      style={{
                        color:
                          meta.tone === "pass"
                            ? "var(--vdg-color-success)"
                            : meta.tone === "warn"
                              ? "var(--vdg-color-warning)"
                              : "var(--vdg-color-text-secondary)",
                        fontWeight: meta.tone === "neutral" ? 400 : 600,
                      }}
                    >
                      {meta.note}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-text-secondary)]">
            Dark theme
          </h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3.5">
            {(Object.keys(darkPalette) as (keyof typeof darkPalette)[]).map((key) => (
              <div key={key} className="overflow-hidden rounded-[var(--vdg-radius-lg)] border border-[var(--vdg-color-border)] bg-[#111827]">
                <div style={{ background: darkPalette[key], height: "56px" }} />
                <div className="p-2.5">
                  <div className="text-xs font-semibold text-white">{key}</div>
                  <span className="font-mono text-[10px] text-slate-400">{darkPalette[key]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
