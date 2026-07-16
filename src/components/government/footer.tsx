import Link from "next/link"
import { Landmark, Phone, Mail, Database, Accessibility, Share2 } from "lucide-react"

import { GOV_ROUTES } from "@/components/government/routes"

const LINK_COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Dịch vụ",
    links: [
      { label: "Công dân", href: GOV_ROUTES.citizen },
      { label: "Doanh nghiệp", href: GOV_ROUTES.business },
      { label: "Tìm kiếm", href: GOV_ROUTES.search },
      { label: "Trung tâm hỗ trợ", href: GOV_ROUTES.help },
    ],
  },
  {
    heading: "Pháp lý",
    links: [
      { label: "Điều khoản sử dụng", href: GOV_ROUTES.legal("terms") },
      { label: "Chính sách bảo mật", href: GOV_ROUTES.legal("privacy") },
      { label: "Chính sách dữ liệu", href: GOV_ROUTES.legal("data") },
      { label: "Khả năng tiếp cận", href: GOV_ROUTES.legal("accessibility") },
    ],
  },
]

export function GovernmentFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-[1320px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 font-heading text-[15px] font-bold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),black_25%)] text-primary-foreground">
                <Landmark className="size-4" strokeWidth={2} />
              </span>
              Cổng Dịch vụ công Số
            </div>
            <p className="mt-3 max-w-[38ch] text-sm text-muted-foreground">
              Nền tảng dịch vụ công trực tuyến quốc gia — minh bạch, hiện đại, kết nối công dân, doanh nghiệp và cơ quan nhà nước.
            </p>
            <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
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
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
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
  )
}
