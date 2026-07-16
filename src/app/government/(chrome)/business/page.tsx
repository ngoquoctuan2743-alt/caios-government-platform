import { Building2, FileCheck2, Receipt, FileStack, TrendingUp, ArrowUpRight } from "lucide-react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { BusinessPortalBackground } from "@/components/government/assets/backgrounds"
import { GovernmentSidebar } from "@/components/government/sidebar"
import { StatusBadge, type StatusTone } from "@/components/government/status-badge"

const SUMMARY: { label: string; value: string | number; icon: typeof Building2; tone: "success" | "blue" }[] = [
  { label: "Giấy phép còn hiệu lực", value: 6, icon: FileCheck2, tone: "success" },
  { label: "Nghĩa vụ thuế kỳ này", value: "42.5tr₫", icon: Receipt, tone: "blue" },
  { label: "Hồ sơ đang xử lý", value: 3, icon: FileStack, tone: "blue" },
  { label: "Doanh thu kê khai (quý)", value: "8.2 tỷ₫", icon: TrendingUp, tone: "success" },
]

const LICENSES: { name: string; expiry: string; status: StatusTone; label: string }[] = [
  { name: "Giấy chứng nhận đăng ký kinh doanh", expiry: "Vô thời hạn", status: "success", label: "Hiệu lực" },
  { name: "Giấy phép kinh doanh có điều kiện", expiry: "14/03/2027", status: "success", label: "Hiệu lực" },
  { name: "Chứng nhận đủ điều kiện PCCC", expiry: "02/08/2026", status: "warning", label: "Sắp hết hạn" },
]

const TAX_ROWS: { period: string; type: string; amount: string; status: StatusTone; label: string }[] = [
  { period: "Quý 4/2025", type: "Thuế GTGT", amount: "18,200,000₫", status: "success", label: "Đã nộp" },
  { period: "Quý 4/2025", type: "Thuế TNDN", amount: "24,300,000₫", status: "primary", label: "Chờ duyệt" },
  { period: "Quý 1/2026", type: "Thuế GTGT", amount: "—", status: "neutral", label: "Chưa đến hạn" },
]

const DOCUMENTS = ["Điều lệ công ty", "Báo cáo tài chính 2025", "Hợp đồng lao động mẫu", "Giấy uỷ quyền người đại diện"]

export default function BusinessDashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <GovernmentSidebar
        items={[
          { label: "Tổng quan doanh nghiệp", icon: Building2, active: true },
          { label: "Giấy phép", icon: FileCheck2 },
          { label: "Thuế", icon: Receipt },
          { label: "Tài liệu", icon: FileStack },
          { label: "Báo cáo", icon: TrendingUp },
        ]}
      />
      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-70">
          <BusinessPortalBackground />
        </div>
        <div className="relative mx-auto max-w-[1240px] space-y-8 px-6 py-8">
          <div>
            <span className="mb-1 flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              <Building2 className="size-3.5" /> Công ty TNHH Công nghệ Sao Việt · MST 0312345678
            </span>
            <h1 className="font-heading text-2xl font-bold">Tổng quan doanh nghiệp</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {SUMMARY.map(({ label, value, icon: StatIcon, tone }) => (
              <Card key={label}>
                <CardContent className="flex items-center gap-3">
                  <span
                    className={
                      "flex size-10 shrink-0 items-center justify-center rounded-full " +
                      (tone === "success" ? "bg-[var(--vdg-color-success)]/10 text-[var(--vdg-color-success)]" : "bg-[var(--vdg-color-blue)]/10 text-[var(--vdg-color-blue)]")
                    }
                  >
                    <StatIcon className="size-4.5" strokeWidth={2} />
                  </span>
                  <div>
                    <div className="text-xl leading-none font-bold tabular-nums">{value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Giấy phép</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {LICENSES.map((l) => (
                  <div key={l.name} className="flex items-center justify-between gap-3 border-b border-border pb-3 text-sm last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{l.name}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">Hết hạn: {l.expiry}</div>
                    </div>
                    <StatusBadge tone={l.status}>{l.label}</StatusBadge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nghĩa vụ thuế</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kỳ</TableHead>
                      <TableHead>Loại thuế</TableHead>
                      <TableHead>Số tiền</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TAX_ROWS.map((t, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs">{t.period}</TableCell>
                        <TableCell>{t.type}</TableCell>
                        <TableCell className="tabular-nums">{t.amount}</TableCell>
                        <TableCell>
                          <StatusBadge tone={t.status}>{t.label}</StatusBadge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tài liệu doanh nghiệp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {DOCUMENTS.map((d) => (
                  <div key={d} className="flex items-center justify-between rounded-md border border-border px-3 py-2.5 text-sm">
                    <span className="flex items-center gap-2.5">
                      <FileStack className="size-4 text-muted-foreground" />
                      {d}
                    </span>
                    <ArrowUpRight className="size-3.5 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Báo cáo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2.5" style={{ height: 140 }}>
                  {[52, 68, 46, 80, 64, 92].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm bg-[var(--vdg-color-blue)]" style={{ height: `${h}%`, opacity: 0.25 + i * 0.1 }} />
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Doanh thu kê khai theo quý, 6 quý gần nhất.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
