"use client"

import { useState } from "react"
import { Sparkles, X, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AIAssistantBackground } from "@/components/government/assets/backgrounds"

const MESSAGES = [
  { role: "assistant" as const, text: "Xin chào! Tôi là trợ lý AI. Bạn cần hỗ trợ thủ tục gì hôm nay?" },
  { role: "citizen" as const, text: "CCCD của tôi sắp hết hạn, tôi cần làm gì?" },
  { role: "assistant" as const, text: "Bạn cần cấp đổi CCCD. Tôi đã chuẩn bị danh sách giấy tờ cần thiết — bạn muốn bắt đầu ngay không?" },
]

/** Persistent floating assistant, bottom-right. Accepts optional external control so other screens (e.g. Help Center's "Chat với AI") can open it programmatically. */
export function AIAssistantPanel({
  open: controlledOpen,
  onOpenChange,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
} = {}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = (v: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(open) : v
    setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <div className="fixed right-5 bottom-5 z-[700] flex flex-col items-end gap-3">
      {open && (
        <div
          className="relative flex h-[26rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl"
          style={{ transformOrigin: "bottom right" }}
        >
          <div className="absolute inset-0 opacity-40">
            <AIAssistantBackground animated />
          </div>
          <div className="glass relative flex items-center justify-between border-b border-border px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <span className="relative flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[color-mix(in_oklch,var(--primary),black_25%)] text-primary-foreground">
                <Sparkles className="size-3.5" />
              </span>
              Trợ lý AI
              <span className="flex items-center gap-1 rounded-full bg-[color-mix(in_oklch,var(--vdg-color-success),transparent_90%)] px-2 py-0.5 text-[10px] font-medium text-[var(--vdg-color-success)]">
                <span className="size-1.5 rounded-full bg-[var(--vdg-color-success)]" /> Trực tuyến
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng trợ lý AI"
              className="rounded-md p-1 transition-colors hover:bg-muted"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="relative flex-1 space-y-3 overflow-y-auto p-4">
            {MESSAGES.map((m, i) => (
              <div key={i} className={"flex " + (m.role === "citizen" ? "justify-end" : "justify-start")}>
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm " +
                    (m.role === "citizen" ? "bg-primary text-primary-foreground" : "bg-background ring-1 ring-border")
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="relative flex items-center gap-2 border-t border-border p-3">
            <input
              type="text"
              placeholder="Nhập câu hỏi của bạn..."
              className="h-9 flex-1 rounded-full border border-border bg-background px-3.5 text-sm outline-none transition-colors focus-visible:border-primary"
            />
            <button
              type="button"
              aria-label="Gửi"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}

      <Button
        variant="default"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="relative size-14 rounded-full p-0 shadow-lg hover:-translate-y-0.5"
        aria-label={open ? "Đóng trợ lý AI" : "Mở trợ lý AI"}
      >
        {!open && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary opacity-30" style={{ animationDuration: "2.5s" }} />
        )}
        {open ? <X className="size-5" /> : <Sparkles className="size-5" />}
      </Button>
    </div>
  )
}
