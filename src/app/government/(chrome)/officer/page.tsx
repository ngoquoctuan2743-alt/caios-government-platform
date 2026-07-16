import Link from "next/link"
import { ClipboardList, Workflow, CheckSquare, Gauge, BarChart3, AlertTriangle } from "lucide-react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { OfficerPortalBackground } from "@/components/government/assets/backgrounds"
import { GovernmentSidebar } from "@/components/government/sidebar"
import { StatusBadge, type StatusTone } from "@/components/government/status-badge"
import { GOV_ROUTES } from "@/components/government/routes"

const STATS = [
  { label: "Hồ sơ chờ xử lý", value: 22, icon: ClipboardList, tone: "primary" as const },
  { label: "Trong hàng đợi duyệt", value: 9, icon: CheckSquare, tone: "primary" as const },
  { label: "Trễ SLA", value: 2, icon: AlertTriangle, tone: "danger" as const },
  { label: "Xử lý hôm nay", value: 15, icon: BarChart3, tone: "success" as const },
]

const QUEUE: { id: string; citizen: string; type: string; sla: number; status: StatusTone; label: string }[] = [
  { id: "CP-2026-014901", citizen: "Trần Thị B", type: "Đăng ký kinh doanh", sla: 92, status: "primary", label: "Đúng hạn" },
  { id: "CP-2026-015002", citizen: "Lê Văn C", type: "Đổi hộ khẩu", sla: 40, status: "warning", label: "Sắp trễ" },
  { id: "CP-2026-015110", citizen: "Phạm Thị D", type: "Cấp mới CCCD", sla: 78, status: "primary", label: "Đúng hạn" },
  { id: "CP-2026-015221", citizen: "Hoàng Văn E", type: "Cấp lại CCCD", sla: 12, status: "danger", label: "Trễ SLA" },
]

const TONE_ICON_CLASS: Record<StatusTone, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-[var(--vdg-color-success)]/10 text-[var(--vdg-color-success)]",
  warning: "bg-[var(--vdg-color-warning)]/10 text-[var(--vdg-color-warning)]",
  danger: "bg-destructive/10 text-destructive",
  neutral: "bg-muted text-muted-foreground",
}

export default function OfficerDashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <GovernmentSidebar
        items={[
          { label: "Hồ sơ chờ xử lý", icon: ClipboardList, active: true, badge: "22" },
          { label: "Quy trình", icon: Workflow },
          { label: "Hàng đợi phê duyệt", icon: CheckSquare, badge: "9" },
          { label: "Phân tích", icon: BarChart3 },
        ]}
      />
      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-70">
          <OfficerPortalBackground />
        </div>
        <div className="relative mx-auto max-w-[1240px] space-y-8 px-6 py-8">
          <div>
            <span className="mb-1 block text-xs font-semibold tracking-wide text-muted-foreground uppercase">Cán bộ thụ lý · Sở Tư pháp Hà Nội</span>
            <h1 className="font-heading text-2xl font-bold">Hàng đợi xử lý hồ sơ</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map(({ label, value, icon: StatIcon, tone }) => (
              <Card key={label}>
                <CardContent className="flex items-center gap-3">
                  <span className={"flex size-10 shrink-0 items-center justify-center rounded-full " + TONE_ICON_CLASS[tone]}>
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

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Hàng đợi phê duyệt</CardTitle>
                <StatusBadge tone="neutral">{QUEUE.length} hồ sơ</StatusBadge>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã hồ sơ</TableHead>
                      <TableHead>Công dân</TableHead>
                      <TableHead>Thủ tục</TableHead>
                      <TableHead>SLA</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {QUEUE.map((c) => (
                      <TableRow key={c.id} className="cursor-pointer">
                        <TableCell className="p-0">
                          <Link href={GOV_ROUTES.case(c.id)} className="block px-2 py-2 font-mono text-xs text-primary">
                            {c.id}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={GOV_ROUTES.case(c.id)} className="flex items-center gap-2.5">
                            <Avatar size="sm">
                              <AvatarFallback>{c.citizen.split(" ").pop()?.[0] ?? "?"}</AvatarFallback>
                            </Avatar>
                            {c.citizen}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={GOV_ROUTES.case(c.id)} className="block">
                            {c.type}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-border">
                            <div
                              className={"h-full rounded-full " + (c.sla > 60 ? "bg-[var(--vdg-color-success)]" : c.sla > 25 ? "bg-[var(--vdg-color-warning)]" : "bg-destructive")}
                              style={{ width: `${c.sla}%` }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge tone={c.status}>{c.label}</StatusBadge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="size-4 text-primary" /> Tuân thủ SLA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-2">
                    <svg viewBox="0 0 120 70" className="w-full max-w-[180px]">
                      <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke="var(--border)" strokeWidth="10" strokeLinecap="round" />
                      <path
                        d="M 10 65 A 50 50 0 0 1 110 65"
                        fill="none"
                        stroke="var(--vdg-color-success)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="157"
                        strokeDashoffset="24"
                      />
                      <text x="60" y="55" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--foreground)">
                        85%
                      </text>
                    </svg>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">Hồ sơ xử lý đúng hạn trong 30 ngày qua</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Năng suất tuần</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2" style={{ height: 90 }}>
                    {[6, 9, 5, 11, 8, 4, 2].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm bg-primary" style={{ height: `${(h / 11) * 100}%`, opacity: 0.35 + i * 0.08 }} />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                    {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
