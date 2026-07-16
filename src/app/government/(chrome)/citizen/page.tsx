import Link from "next/link"
import { Clock, Eye, AlertTriangle, CheckCircle2, Plus, FilePlus2, Search, CreditCard, Headset, Bell, FileWarning, BadgeCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DashboardBackground } from "@/components/government/assets/backgrounds"
import { GovernmentSidebar } from "@/components/government/sidebar"
import { WorkflowTimeline } from "@/components/government/workflow-timeline"
import { StatusBadge, type StatusTone } from "@/components/government/status-badge"
import { GOV_ROUTES } from "@/components/government/routes"

const STATS = [
  { label: "Tổng hồ sơ", value: 128, icon: Clock, tone: "primary" as const },
  { label: "Đang xử lý", value: 34, icon: Eye, tone: "primary" as const },
  { label: "Cần bổ sung", value: 5, icon: AlertTriangle, tone: "danger" as const },
  { label: "Đã hoàn tất", value: 89, icon: CheckCircle2, tone: "success" as const },
]

const CASES: { id: string; citizen: string; type: string; status: StatusTone; statusLabel: string }[] = [
  { id: "CP-2026-014822", citizen: "Nguyễn Văn A", type: "Cấp lại CCCD", status: "success", statusLabel: "Đã duyệt" },
  { id: "CP-2026-014901", citizen: "Trần Thị B", type: "Đăng ký kinh doanh", status: "primary", statusLabel: "Đang xử lý" },
  { id: "CP-2026-015002", citizen: "Lê Văn C", type: "Đổi hộ khẩu", status: "warning", statusLabel: "Cần bổ sung" },
  { id: "CP-2026-015110", citizen: "Phạm Thị D", type: "Cấp mới CCCD", status: "primary", statusLabel: "Đang xử lý" },
]

const NOTIFICATIONS: { icon: typeof Bell; tone: StatusTone; text: string; time: string }[] = [
  { icon: BadgeCheck, tone: "success", text: "Hồ sơ CP-2026-014822 đã được phê duyệt.", time: "2 giờ trước" },
  { icon: FileWarning, tone: "warning", text: "Hồ sơ CP-2026-015002 cần bổ sung ảnh chân dung.", time: "1 ngày trước" },
  { icon: Bell, tone: "primary", text: "Trợ lý AI đã chuẩn bị sẵn danh sách giấy tờ cho yêu cầu mới.", time: "2 ngày trước" },
]

const QUICK_ACTIONS = [
  { icon: FilePlus2, label: "Nộp hồ sơ mới" },
  { icon: Search, label: "Tra cứu thủ tục" },
  { icon: CreditCard, label: "Thanh toán phí" },
  { icon: Headset, label: "Liên hệ hỗ trợ" },
]

const TONE_ICON_CLASS: Record<StatusTone, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-[var(--vdg-color-success)]/10 text-[var(--vdg-color-success)]",
  warning: "bg-[var(--vdg-color-warning)]/10 text-[var(--vdg-color-warning)]",
  danger: "bg-destructive/10 text-destructive",
  neutral: "bg-muted text-muted-foreground",
}

export default function CitizenDashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <GovernmentSidebar />
      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60">
          <DashboardBackground />
        </div>
        <div className="relative mx-auto max-w-[1240px] space-y-8 px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl font-bold">Xin chào, Nguyễn Văn A</h1>
              <p className="mt-1 text-sm text-muted-foreground">Đây là tổng quan hồ sơ của bạn hôm nay.</p>
            </div>
            <Button variant="default">
              <Plus className="size-4" /> Tạo hồ sơ mới
            </Button>
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

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hồ sơ CP-2026-014901 · Đăng ký kinh doanh</CardTitle>
                </CardHeader>
                <CardContent>
                  <WorkflowTimeline currentStep={1} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>Hồ sơ của tôi</CardTitle>
                  <StatusBadge tone="neutral">{CASES.length} hồ sơ</StatusBadge>
                </CardHeader>
                <CardContent className="px-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã hồ sơ</TableHead>
                        <TableHead>Công dân</TableHead>
                        <TableHead>Thủ tục</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {CASES.map((c) => (
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
                            <StatusBadge tone={c.status}>{c.statusLabel}</StatusBadge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông báo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {NOTIFICATIONS.map((n, i) => (
                    <div key={i} className="flex gap-3">
                      <span className={"flex size-8 shrink-0 items-center justify-center rounded-full " + TONE_ICON_CLASS[n.tone]}>
                        <n.icon className="size-3.5" strokeWidth={2} />
                      </span>
                      <div>
                        <p className="text-sm leading-snug">{n.text}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Thao tác nhanh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2.5">
                    {QUICK_ACTIONS.map(({ icon: ActionIcon, label }) => (
                      <button
                        key={label}
                        type="button"
                        className="flex flex-col items-center gap-2 rounded-lg border border-border px-3 py-4 text-center text-xs font-medium transition-colors hover:border-primary hover:bg-primary/5"
                      >
                        <ActionIcon className="size-4.5 text-primary" strokeWidth={2} />
                        {label}
                      </button>
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
