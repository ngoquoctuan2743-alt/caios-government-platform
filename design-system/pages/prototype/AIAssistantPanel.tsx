import { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { Button } from "@ds/components";
import { AIAssistantBackground } from "@ds/assets/backgrounds";

const MESSAGES = [
  { role: "assistant" as const, text: "Xin chào! Tôi là trợ lý AI. Bạn cần hỗ trợ thủ tục gì hôm nay?" },
  { role: "citizen" as const, text: "CCCD của tôi sắp hết hạn, tôi cần làm gì?" },
  { role: "assistant" as const, text: "Bạn cần cấp đổi CCCD. Tôi đã chuẩn bị danh sách giấy tờ cần thiết — bạn muốn bắt đầu ngay không?" },
];

/** Persistent floating assistant, bottom-right, per the brief's "AI Assistant" requirement. */
export function AIAssistantPanel() {
  const [open, setOpen] = useState(false);

  return (
    // z-index matches tokens/z-index.ts's `aiAssistant` value (700).
    <div className="fixed right-5 bottom-5 z-[700] flex flex-col items-end gap-3">
      {open && (
        <div
          className="vdg-in relative flex h-[26rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-[var(--vdg-radius-xl)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] shadow-[var(--vdg-shadow-xl)]"
          style={{ animationDuration: "0.3s", transformOrigin: "bottom right" }}
        >
          <div className="absolute inset-0 opacity-40">
            <AIAssistantBackground animated />
          </div>
          <div className="relative flex items-center justify-between border-b border-[var(--vdg-color-border)] bg-[var(--vdg-glass-bg)] px-4 py-3 backdrop-blur-[var(--vdg-glass-blur)]">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <span className="relative flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-[var(--vdg-color-primary)] to-[var(--vdg-color-primary-dark)] text-white">
                <Sparkles className="size-3.5" />
              </span>
              Trợ lý AI
              <span className="flex items-center gap-1 rounded-full bg-[var(--vdg-color-success)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--vdg-color-success)]">
                <span className="size-1.5 rounded-full bg-[var(--vdg-color-success)]" /> Trực tuyến
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng trợ lý AI"
              className="rounded-md p-1 transition-colors hover:bg-[var(--vdg-color-border)]/60"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="relative flex-1 space-y-3 overflow-y-auto p-4">
            {MESSAGES.map((m, i) => (
              <div
                key={i}
                className={"vdg-in flex " + (m.role === "citizen" ? "justify-end" : "justify-start")}
                style={{ animationDelay: `${i * 120}ms`, animationDuration: "0.35s" }}
              >
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-[var(--vdg-shadow-sm)] " +
                    (m.role === "citizen" ? "bg-[var(--vdg-color-primary)] text-white" : "bg-[var(--vdg-color-background)] ring-1 ring-[var(--vdg-color-border)]")
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="relative flex items-center gap-2 border-t border-[var(--vdg-color-border)] p-3">
            <input
              type="text"
              placeholder="Nhập câu hỏi của bạn..."
              className="h-9 flex-1 rounded-full border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] px-3.5 text-sm outline-none transition-colors focus-visible:border-[var(--vdg-color-primary)]"
            />
            <button
              type="button"
              aria-label="Gửi"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--vdg-color-primary)] text-white transition-transform hover:scale-105 hover:bg-[var(--vdg-color-primary-dark)] active:scale-95"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}

      <Button
        variant="primary"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="relative size-14 rounded-full p-0 shadow-[var(--vdg-shadow-lg)] hover:-translate-y-0.5"
        aria-label={open ? "Đóng trợ lý AI" : "Mở trợ lý AI"}
      >
        {!open && (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--vdg-color-primary)] opacity-30" style={{ animationDuration: "2.5s" }} />
        )}
        {open ? <X className="size-5" /> : <Sparkles className="size-5" />}
      </Button>
    </div>
  );
}
