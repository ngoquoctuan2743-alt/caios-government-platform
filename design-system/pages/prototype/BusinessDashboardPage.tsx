import { Building2, FileCheck2, Receipt, FileStack, TrendingUp, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@ds/components";
import { BusinessPortalBackground } from "@ds/assets/backgrounds";
import { Sidebar } from "./Sidebar";

const SUMMARY = [
  { label: "Giấy phép còn hiệu lực", value: 6, icon: FileCheck2, tone: "success" },
  { label: "Nghĩa vụ thuế kỳ này", value: "42.5tr₫", icon: Receipt, tone: "primary" },
  { label: "Hồ sơ đang xử lý", value: 3, icon: FileStack, tone: "primary" },
  { label: "Doanh thu kê khai (quý)", value: "8.2 tỷ₫", icon: TrendingUp, tone: "success" },
] as const;

const LICENSES = [
  { name: "Giấy chứng nhận đăng ký kinh doanh", expiry: "Vô thời hạn", status: "success" as const, label: "Hiệu lực" },
  { name: "Giấy phép kinh doanh có điều kiện", expiry: "14/03/2027", status: "success" as const, label: "Hiệu lực" },
  { name: "Chứng nhận đủ điều kiện PCCC", expiry: "02/08/2026", status: "warning" as const, label: "Sắp hết hạn" },
];

const TAX_ROWS = [
  { period: "Quý 4/2025", type: "Thuế GTGT", amount: "18,200,000₫", status: "success" as const, label: "Đã nộp" },
  { period: "Quý 4/2025", type: "Thuế TNDN", amount: "24,300,000₫", status: "primary" as const, label: "Chờ duyệt" },
  { period: "Quý 1/2026", type: "Thuế GTGT", amount: "—", status: "neutral" as const, label: "Chưa đến hạn" },
];

const DOCUMENTS = ["Điều lệ công ty", "Báo cáo tài chính 2025", "Hợp đồng lao động mẫu", "Giấy uỷ quyền người đại diện"];

export function BusinessDashboardPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
      <Sidebar
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
            <span className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--vdg-color-text-secondary)]">
              <Building2 className="size-3.5" /> Công ty TNHH Công nghệ Sao Việt · MST 0312345678
            </span>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              Tổng quan doanh nghiệp
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {SUMMARY.map(({ label, value, icon: StatIcon, tone }) => (
              <Card key={label} variant="solid">
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
                    <div className="text-xl font-bold tabular-nums leading-none">{value}</div>
                    <div className="mt-1 text-xs text-[var(--vdg-color-text-secondary)]">{label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card variant="solid">
              <CardHeader>
                <CardTitle>Giấy phép</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {LICENSES.map((l) => (
                  <div key={l.name} className="flex items-center justify-between gap-3 border-b border-[var(--vdg-color-border)] pb-3 text-sm last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{l.name}</div>
                      <div className="mt-0.5 text-xs text-[var(--vdg-color-text-secondary)]">Hết hạn: {l.expiry}</div>
                    </div>
                    <Badge variant={l.status}>{l.label}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card variant="solid">
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
                          <Badge variant={t.status}>{t.label}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card variant="solid">
              <CardHeader>
                <CardTitle>Tài liệu doanh nghiệp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {DOCUMENTS.map((d) => (
                  <div key={d} className="flex items-center justify-between rounded-[var(--vdg-radius-sm)] border border-[var(--vdg-color-border)] px-3 py-2.5 text-sm">
                    <span className="flex items-center gap-2.5">
                      <FileStack className="size-4 text-[var(--vdg-color-text-secondary)]" />
                      {d}
                    </span>
                    <ArrowUpRight className="size-3.5 text-[var(--vdg-color-text-secondary)]" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card variant="solid">
              <CardHeader>
                <CardTitle>Báo cáo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2.5" style={{ height: 140 }}>
                  {[52, 68, 46, 80, 64, 92].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-[var(--vdg-radius-sm)] bg-[var(--vdg-color-blue)]" style={{ height: `${h}%`, opacity: 0.25 + i * 0.1 }} />
                  ))}
                </div>
                <p className="mt-3 text-xs text-[var(--vdg-color-text-secondary)]">Doanh thu kê khai theo quý, 6 quý gần nhất.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
