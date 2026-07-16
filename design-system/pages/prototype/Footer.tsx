import { Landmark, Phone, Mail, Database, Accessibility, Share2 } from "lucide-react";
import type { Screen } from "./navigation";

const LINK_COLUMNS: { heading: string; links: { label: string; target: Screen }[] }[] = [
  {
    heading: "Dịch vụ",
    links: [
      { label: "Công dân", target: "citizen-dashboard" },
      { label: "Doanh nghiệp", target: "business-dashboard" },
      { label: "Tìm kiếm", target: "search-results" },
      { label: "Trung tâm hỗ trợ", target: "help-center" },
    ],
  },
  {
    heading: "Pháp lý",
    links: [
      { label: "Điều khoản sử dụng", target: "legal" },
      { label: "Chính sách bảo mật", target: "legal" },
      { label: "Chính sách dữ liệu", target: "legal" },
      { label: "Khả năng tiếp cận", target: "legal" },
    ],
  },
];

export function Footer({ onNavigate, onOpenLegal }: { onNavigate: (s: Screen) => void; onOpenLegal: (doc: "terms" | "privacy" | "data" | "accessibility") => void }) {
  const legalDocs: Array<"terms" | "privacy" | "data" | "accessibility"> = ["terms", "privacy", "data", "accessibility"];
  return (
    <footer className="border-t border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)]">
      <div className="mx-auto max-w-[1320px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 text-[15px] font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--vdg-color-primary)] to-[var(--vdg-color-primary-dark)] text-white">
                <Landmark className="size-4" strokeWidth={2} />
              </span>
              Cổng Dịch vụ công Số
            </div>
            <p className="mt-3 max-w-[38ch] text-sm text-[var(--vdg-color-text-secondary)]">
              Nền tảng dịch vụ công trực tuyến quốc gia — minh bạch, hiện đại, kết nối công dân, doanh nghiệp và cơ quan nhà nước.
            </p>
            <div className="mt-4 space-y-1.5 text-sm text-[var(--vdg-color-text-secondary)]">
              <p className="flex items-center gap-2">
                <Phone className="size-3.5" /> Tổng đài hỗ trợ: 1900 xxxx
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-3.5" /> hotro@dichvucong.gov.vn
              </p>
            </div>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold">{col.heading}</h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--vdg-color-text-secondary)]">
                {col.links.map((l, i) => (
                  <li key={l.label}>
                    <button
                      type="button"
                      onClick={() => (col.heading === "Pháp lý" ? onOpenLegal(legalDocs[i]) : onNavigate(l.target))}
                      className="text-left hover:text-[var(--vdg-color-primary)]"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--vdg-color-border)] pt-6 text-xs text-[var(--vdg-color-text-secondary)]">
          <p>© 2026 Cổng Dịch vụ công Số — Bản dựng trình diễn, không phải sản phẩm chính thức.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Database className="size-3.5" /> Dữ liệu mở
            </span>
            <span className="flex items-center gap-1.5">
              <Accessibility className="size-3.5" /> Cam kết tiếp cận
            </span>
            <span className="flex items-center gap-1.5">
              <Share2 className="size-3.5" /> Mạng xã hội
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
