"use client"

import { useState } from "react"
import { BadgeCheck, FileWarning, Sparkles, Server, Bell } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StatusBadge, type StatusTone } from "@/components/government/status-badge"

type Category = "case" | "system" | "ai"

const NOTIFICATIONS: { id: string; category: Category; icon: typeof Bell; tone: StatusTone; text: string; time: string; read: boolean }[] = [
  { id: "1", category: "case", icon: BadgeCheck, tone: "success", text: "Hồ sơ CP-2026-014822 đã được phê duyệt.", time: "2 giờ trước", read: false },
  { id: "2", category: "case", icon: FileWarning, tone: "warning", text: "Hồ sơ CP-2026-015002 cần bổ sung ảnh chân dung.", time: "1 ngày trước", read: false },
  { id: "3", category: "ai", icon: Sparkles, tone: "primary", text: "Trợ lý AI đã chuẩn bị sẵn danh sách giấy tờ cho yêu cầu mới.", time: "2 ngày trước", read: true },
  { id: "4", category: "system", icon: Server, tone: "primary", text: "Hệ thống sẽ bảo trì định kỳ vào 02:00 ngày 20/07/2026.", time: "3 ngày trước", read: true },
  { id: "5", category: "case", icon: BadgeCheck, tone: "success", text: "Hồ sơ CP-2026-014901 đã chuyển sang bước Thẩm định.", time: "4 ngày trước", read: true },
]

const TONE_CLASS: Record<StatusTone, string> = {
  success: "bg-[var(--vdg-color-success)]/10 text-[var(--vdg-color-success)]",
  warning: "bg-[var(--vdg-color-warning)]/10 text-[var(--vdg-color-warning)]",
  primary: "bg-primary/10 text-primary",
  danger: "bg-destructive/10 text-destructive",
  neutral: "bg-muted text-muted-foreground",
}

export default function NotificationsPage() {
  const [tab, setTab] = useState("all")
  const filtered = NOTIFICATIONS.filter((n) => {
    if (tab === "all") return true
    if (tab === "unread") return !n.read
    return n.category === tab
  })
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length

  return (
    <div className="mx-auto max-w-[720px] space-y-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Thông báo</h1>
          <p className="mt-1 text-sm text-muted-foreground">{unreadCount} thông báo chưa đọc</p>
        </div>
        <StatusBadge tone="primary">{NOTIFICATIONS.length} tổng cộng</StatusBadge>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="unread">Chưa đọc</TabsTrigger>
          <TabsTrigger value="case">Hồ sơ</TabsTrigger>
          <TabsTrigger value="system">Hệ thống</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-3">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Không có thông báo nào.</p>
          ) : (
            filtered.map((n) => (
              <Card key={n.id} className={n.read ? "opacity-70" : undefined}>
                <CardContent className="flex items-start gap-3 py-4">
                  <span className={"flex size-9 shrink-0 items-center justify-center rounded-full " + TONE_CLASS[n.tone]}>
                    <n.icon className="size-4" strokeWidth={2} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm">{n.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
                  </div>
                  {!n.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
