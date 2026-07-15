import { useState } from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import { ColorSection } from "./sections/ColorSection";
import { TypographySection } from "./sections/TypographySection";
import { TokenSection } from "./sections/TokenSection";
import { ComponentSection } from "./sections/ComponentSection";
import { BackgroundSection } from "./sections/BackgroundSection";
import { PatternSection } from "./sections/PatternSection";
import { IconSection } from "./sections/IconSection";
import { IllustrationSection } from "./sections/IllustrationSection";

type Viewport = "full" | "laptop" | "tablet" | "mobile";

const VIEWPORT_WIDTH: Record<Viewport, string> = {
  full: "100%",
  laptop: "1024px",
  tablet: "768px",
  mobile: "375px",
};

/** The original Phase 1/2 token-and-component reference -- kept intact behind the "Xem Design System" toggle in App.tsx. */
export function ReferenceView() {
  const [viewport, setViewport] = useState<Viewport>("full");
  const [locale, setLocale] = useState<"vi" | "en">("vi");

  return (
    <div>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)]/90 px-8 py-3.5 backdrop-blur">
        <div className="flex items-center gap-2.5 text-[15px] font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
          <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--vdg-color-primary)] to-[var(--vdg-color-primary-dark)] text-xs text-white">
            CP
          </span>
          VDG Design Preview
        </div>
        <div className="flex items-center gap-2">
          <ViewportSwitch viewport={viewport} onChange={setViewport} />
          <button
            type="button"
            onClick={() => setLocale((l) => (l === "vi" ? "en" : "vi"))}
            className="flex h-8.5 items-center gap-1.5 rounded-full border border-[var(--vdg-color-border)] px-3 text-[13px] font-medium transition-colors hover:border-[var(--vdg-color-primary)]"
          >
            {locale === "vi" ? "🇻🇳 Tiếng Việt" : "🇺🇸 English"}
          </button>
        </div>
      </header>

      <div
        className="mx-auto transition-[max-width] duration-200"
        style={{ maxWidth: VIEWPORT_WIDTH[viewport], boxShadow: viewport !== "full" ? "var(--vdg-shadow-lg)" : undefined }}
      >
        <Hero locale={locale} />
        <ColorSection />
        <TypographySection />
        <TokenSection />
        <ComponentSection />
        <BackgroundSection />
        <PatternSection />
        <IconSection />
        <IllustrationSection />
        <A11yNote />
        <Footer />
      </div>
    </div>
  );
}

function ViewportSwitch({ viewport, onChange }: { viewport: Viewport; onChange: (v: Viewport) => void }) {
  const options: { key: Viewport; icon: typeof Monitor; label: string }[] = [
    { key: "full", icon: Monitor, label: "Full" },
    { key: "tablet", icon: Tablet, label: "Tablet" },
    { key: "mobile", icon: Smartphone, label: "Mobile" },
  ];
  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--vdg-color-border)] p-1" role="group" aria-label="Chọn kích thước xem thử">
      {options.map(({ key, icon: OptionIcon, label }) => (
        <button
          key={key}
          type="button"
          aria-pressed={viewport === key}
          onClick={() => onChange(key)}
          title={label}
          className={
            "flex size-7 items-center justify-center rounded-full transition-colors " +
            (viewport === key ? "bg-[var(--vdg-color-primary)] text-white" : "text-[var(--vdg-color-text-secondary)] hover:bg-[var(--vdg-color-border)]/60")
          }
        >
          <OptionIcon className="size-3.5" />
        </button>
      ))}
    </div>
  );
}

function Hero({ locale }: { locale: "vi" | "en" }) {
  const copy =
    locale === "vi"
      ? {
          eyebrow: "PHASE 1+2 — TOKENS · THEME · COMPONENTS · VISUAL IDENTITY",
          title: "Hệ thống Thiết kế Chính phủ số Việt Nam",
          body: "Design Preview thật — mọi thứ dưới đây import trực tiếp từ design-system/, không phải bản mock CSS.",
        }
      : {
          eyebrow: "PHASE 1+2 — TOKENS · THEME · COMPONENTS · VISUAL IDENTITY",
          title: "Vietnam Digital Government Design System",
          body: "A real Design Preview — everything below is imported directly from design-system/, not a CSS mockup.",
        };
  return (
    <section className="px-8 pb-16 pt-18">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">{copy.eyebrow}</span>
      <h1 className="max-w-[16ch] text-[clamp(2.25rem,1.7rem+2.2vw,3.25rem)] font-bold leading-[1.08]" style={{ fontFamily: "var(--vdg-font-heading)" }}>
        {copy.title}
      </h1>
      <p className="mt-4 max-w-[56ch] text-[17px] text-[var(--vdg-color-text-secondary)]">{copy.body}</p>
    </section>
  );
}

function A11yNote() {
  return (
    <section className="border-t border-[var(--vdg-color-border)] px-8 py-10 text-sm text-[var(--vdg-color-text-secondary)]">
      <strong className="text-[var(--vdg-color-text)]">Kiểm tra khả năng tiếp cận:</strong> component dùng nguyên bản{" "}
      <code>@base-ui/react</code> primitives (focus trap, ARIA roles, keyboard nav có sẵn). Để validate thật, chạy{" "}
      <code>npm run lint -w design-system</code> (đã bật <code>eslint-plugin-jsx-a11y</code>) và dùng axe DevTools / Lighthouse
      trên trang này — không đưa thêm runtime a11y-checker để giữ bundle nhẹ.
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-8 pb-20 pt-6 text-[13px] text-[var(--vdg-color-text-secondary)]">
      Vietnam Digital Government Design System — chạy bằng <code>npm run dev -w design-system</code>. Xem{" "}
      <code>design-system/README.md</code> cho roadmap Phase 2/3.
    </footer>
  );
}
