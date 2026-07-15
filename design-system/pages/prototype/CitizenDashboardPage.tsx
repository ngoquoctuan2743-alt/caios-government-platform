import { Clock, Eye, AlertTriangle, CheckCircle2, Plus, FilePlus2, Search, CreditCard, Headset, Bell, FileWarning, BadgeCheck } from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Avatar,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@ds/components";
import { DashboardBackground } from "@ds/assets/backgrounds";
import { Sidebar } from "./Sidebar";
import { WorkflowTimeline } from "./WorkflowTimeline";

const STATS = [
  { label: "Tổng hồ sơ", value: 128, icon: Clock, tone: "primary" },
  { label: "Đang xử lý", value: 34, icon: Eye, tone: "primary" },
  { label: "Cần bổ sung", value: 5, icon: AlertTriangle, tone: "danger" },
  { label: "Đã hoàn tất", value: 89, icon: CheckCircle2, tone: "success" },
] as const;

const CASES = [
  { id: "CP-2026-014822", citizen: "Nguyễn Văn A", type: "Cấp lại CCCD", status: "success" as const, statusLabel: "Đã duyệt" },
  { id: "CP-2026-014901", citizen: "Trần Thị B", type: "Đăng ký kinh doanh", status: "primary" as const, statusLabel: "Đang xử lý" },
  { id: "CP-2026-015002", citizen: "Lê Văn C", type: "Đổi hộ khẩu", status: "warning" as const, statusLabel: "Cần bổ sung" },
  { id: "CP-2026-015110", citizen: "Phạm Thị D", type: "Cấp mới CCCD", status: "primary" as const, statusLabel: "Đang xử lý" },
];

const NOTIFICATIONS = [
  { icon: BadgeCheck, tone: "success", text: "Hồ sơ CP-2026-014822 đã được phê duyệt.", time: "2 giờ trước" },
  { icon: FileWarning, tone: "warning", text: "Hồ sơ CP-2026-015002 cần bổ sung ảnh chân dung.", time: "1 ngày trước" },
  { icon: Bell, tone: "primary", text: "Trợ lý AI đã chuẩn bị sẵn danh sách giấy tờ cho yêu cầu mới.", time: "2 ngày trước" },
];

const QUICK_ACTIONS = [
  { icon: FilePlus2, label: "Nộp hồ sơ mới" },
  { icon: Search, label: "Tra cứu thủ tục" },
  { icon: CreditCard, label: "Thanh toán phí" },
  { icon: Headset, label: "Liên hệ hỗ trợ" },
];

export function CitizenDashboardPage({ onOpenCase }: { onOpenCase: () => void }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60">
          <DashboardBackground />
        </div>
        <div className="relative mx-auto max-w-[1240px] space-y-8 px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
                Xin chào, Nguyễn Văn A
              </h1>
              <p className="mt-1 text-sm text-[var(--vdg-color-text-secondary)]">Đây là tổng quan hồ sơ của bạn hôm nay.</p>
            </div>
            <Button variant="primary" data-icon="inline-start">
              <Plus className="size-4" /> Tạo hồ sơ mới
            </Button>
          </div>

          {/* Personal overview */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map(({ label, value, icon: StatIcon, tone }) => (
              <Card key={label} variant="solid">
                <CardContent className="flex items-center gap-3">
                  <span
                    className={
                      "flex size-10 shrink-0 items-center justify-center rounded-full " +
                      (tone === "danger"
                        ? "bg-[var(--vdg-color-danger)]/10 text-[var(--vdg-color-danger)]"
                        : tone === "success"
                          ? "bg-[var(--vdg-color-success)]/10 text-[var(--vdg-color-success)]"
                          : "bg-[var(--vdg-color-primary)]/10 text-[var(--vdg-color-primary)]")
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

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            {/* Left column: timeline + applications */}
            <div className="space-y-6">
              <Card variant="solid">
                <CardHeader>
                  <CardTitle>Hồ sơ CP-2026-014901 · Đăng ký kinh doanh</CardTitle>
                </CardHeader>
                <CardContent>
                  <WorkflowTimeline currentStep={1} />
                </CardContent>
              </Card>

              <Card variant="solid">
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>Hồ sơ của tôi</CardTitle>
                  <Badge variant="neutral">{CASES.length} hồ sơ</Badge>
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
                        <TableRow key={c.id} onClick={onOpenCase} className="cursor-pointer">
                          <TableCell className="font-mono text-xs text-[var(--vdg-color-primary)]">{c.id}</TableCell>
                          <TableCell>
                            <span className="flex items-center gap-2.5">
                              <Avatar size="sm" fallback={c.citizen.split(" ").pop()?.[0] ?? "?"} />
                              {c.citizen}
                            </span>
                          </TableCell>
                          <TableCell>{c.type}</TableCell>
                          <TableCell>
                            <Badge variant={c.status}>{c.statusLabel}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Right column: notifications + quick actions */}
            <div className="space-y-6">
              <Card variant="solid">
                <CardHeader>
                  <CardTitle>Thông báo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {NOTIFICATIONS.map((n, i) => (
                    <div key={i} className="flex gap-3">
                      <span
                        className={
                          "flex size-8 shrink-0 items-center justify-center rounded-full " +
                          (n.tone === "success"
                            ? "bg-[var(--vdg-color-success)]/10 text-[var(--vdg-color-success)]"
                            : n.tone === "warning"
                              ? "bg-[var(--vdg-color-warning)]/10 text-[var(--vdg-color-warning)]"
                              : "bg-[var(--vdg-color-primary)]/10 text-[var(--vdg-color-primary)]")
                        }
                      >
                        <n.icon className="size-3.5" strokeWidth={2} />
                      </span>
                      <div>
                        <p className="text-sm leading-snug">{n.text}</p>
                        <p className="mt-1 text-xs text-[var(--vdg-color-text-secondary)]">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card variant="solid">
                <CardHeader>
                  <CardTitle>Thao tác nhanh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2.5">
                    {QUICK_ACTIONS.map(({ icon: ActionIcon, label }) => (
                      <button
                        key={label}
                        type="button"
                        className="flex flex-col items-center gap-2 rounded-[var(--vdg-radius-md)] border border-[var(--vdg-color-border)] px-3 py-4 text-center text-xs font-medium transition-colors hover:border-[var(--vdg-color-primary)] hover:bg-[var(--vdg-color-primary)]/5"
                      >
                        <ActionIcon className="size-4.5 text-[var(--vdg-color-primary)]" strokeWidth={2} />
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
  );
}
