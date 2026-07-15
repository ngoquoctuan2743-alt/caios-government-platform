const ROWS: { meta: string; size: string; weight: number; text: string }[] = [
  { meta: "4xl / 700", size: "3rem", weight: 700, text: "Dịch vụ công Trực tuyến" },
  { meta: "3xl / 700", size: "2.25rem", weight: 700, text: "Nền tảng Chính phủ số" },
  { meta: "2xl / 600", size: "1.75rem", weight: 600, text: "Hồ sơ điện tử & Chữ ký số" },
  { meta: "xl / 600", size: "1.375rem", weight: 600, text: "Trợ lý AI hỗ trợ công dân" },
];

export function TypographySection() {
  return (
    <section className="border-b border-[var(--vdg-color-border)] py-16">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">
              02 — Chữ
            </span>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              Typography
            </h2>
          </div>
          <p className="max-w-[36ch] text-sm text-[var(--vdg-color-text-secondary)]">
            Heading: <strong>Be Vietnam Pro</strong> (không phải Poppins — xem <code>theme/light/theme.css</code> để biết lý do). Body: Inter.
          </p>
        </div>
        {ROWS.map((row) => (
          <div key={row.meta} className="flex items-baseline gap-6 border-b border-dashed border-[var(--vdg-color-border)] py-4 last:border-0">
            <div className="w-40 shrink-0 font-mono text-xs text-[var(--vdg-color-text-secondary)]">{row.meta}</div>
            <div style={{ fontFamily: "var(--vdg-font-heading)", fontSize: row.size, fontWeight: row.weight }}>{row.text}</div>
          </div>
        ))}
        <div className="flex items-baseline gap-6 py-4">
          <div className="w-40 shrink-0 font-mono text-xs text-[var(--vdg-color-text-secondary)]">base / Inter 400</div>
          <div>Công dân, doanh nghiệp và cán bộ nhà nước cùng sử dụng một nền tảng minh bạch, đáng tin cậy và hiện đại.</div>
        </div>
        <div className="flex items-baseline gap-6 py-4">
          <div className="w-40 shrink-0 font-mono text-xs text-[var(--vdg-color-text-secondary)]">sm / mono</div>
          <div className="font-mono text-sm">Mã hồ sơ: CP-2026-014822</div>
        </div>
      </div>
    </section>
  );
}
