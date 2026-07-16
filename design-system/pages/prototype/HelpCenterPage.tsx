import { useState } from "react";
import { Search, PlayCircle, Sparkles, FileText, CreditCard, IdCard, Headset } from "lucide-react";
import { Card, CardContent, Accordion, AccordionItem, AccordionTrigger, AccordionPanel, Button } from "@ds/components";
import { SupportCenterIllustration } from "@ds/assets/illustrations";

const FAQS = [
  { q: "Làm sao để nộp hồ sơ trực tuyến?", a: "Đăng nhập, chọn dịch vụ cần thực hiện từ trang chủ hoặc hỏi Trợ lý AI, làm theo hướng dẫn từng bước." },
  { q: "Tôi quên mật khẩu thì làm thế nào?", a: "Tại trang đăng nhập, chọn \"Quên mật khẩu?\" và làm theo hướng dẫn gửi tới email đã đăng ký." },
  { q: "Thời gian xử lý hồ sơ mất bao lâu?", a: "Tuỳ thủ tục, thường từ 3–7 ngày làm việc. Thời gian cụ thể hiển thị trong chi tiết từng hồ sơ." },
  { q: "Tôi có thể theo dõi tiến độ hồ sơ ở đâu?", a: "Mục \"Hồ sơ của tôi\" trên Bảng điều khiển hiển thị trạng thái và dòng thời gian xử lý theo thời gian thực." },
];

const VIDEOS = [
  { title: "Hướng dẫn nộp hồ sơ CCCD trực tuyến", duration: "3:24" },
  { title: "Sử dụng Định danh điện tử để đăng nhập", duration: "2:10" },
  { title: "Theo dõi và bổ sung hồ sơ", duration: "4:02" },
];

const QUICK_LINKS = [
  { icon: IdCard, label: "Thủ tục CCCD" },
  { icon: FileText, label: "Đăng ký kinh doanh" },
  { icon: CreditCard, label: "Thanh toán phí, lệ phí" },
];

export function HelpCenterPage({ onOpenAI }: { onOpenAI: () => void }) {
  const [query, setQuery] = useState("");
  const filtered = FAQS.filter((f) => f.q.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="mx-auto max-w-[900px] space-y-8 px-6 py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
          Trung tâm hỗ trợ
        </h1>
        <p className="mt-1 text-[var(--vdg-color-text-secondary)]">Tìm câu trả lời nhanh hoặc trò chuyện với Trợ lý AI.</p>
        <div className="mx-auto mt-5 flex max-w-md items-center gap-2.5 rounded-full border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] px-4 py-2 shadow-[var(--vdg-shadow-sm)]">
          <Search className="size-4 text-[var(--vdg-color-text-secondary)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm câu hỏi thường gặp..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {QUICK_LINKS.map(({ icon: Icon, label }) => (
          <Card key={label} variant="solid" interactive>
            <CardContent className="flex items-center gap-3 py-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-[var(--vdg-color-primary)]/10 text-[var(--vdg-color-primary)]">
                <Icon className="size-4" />
              </span>
              <span className="text-sm font-medium">{label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card variant="solid">
        <CardContent className="py-6">
          <h2 className="mb-3 text-base font-semibold">Câu hỏi thường gặp</h2>
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-[var(--vdg-color-text-secondary)]">Không tìm thấy câu hỏi phù hợp.</p>
          ) : (
            <Accordion>
              {filtered.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionPanel>{f.a}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      <Card variant="solid">
        <CardContent className="py-6">
          <h2 className="mb-3 text-base font-semibold">Video hướng dẫn</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {VIDEOS.map((v) => (
              <div key={v.title} className="overflow-hidden rounded-[var(--vdg-radius-md)] border border-[var(--vdg-color-border)]">
                <div className="flex aspect-video items-center justify-center bg-[var(--vdg-color-background)]">
                  <PlayCircle className="size-9 text-[var(--vdg-color-primary)]" />
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium leading-snug">{v.title}</p>
                  <p className="mt-1 text-[10px] text-[var(--vdg-color-text-secondary)]">{v.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card variant="solid" className="border-[var(--vdg-color-primary)]/20 bg-[var(--vdg-color-primary)]/[0.03]">
        <CardContent className="flex flex-wrap items-center justify-between gap-4 py-6">
          <div className="flex items-center gap-4">
            <div className="size-14 shrink-0">
              <SupportCenterIllustration />
            </div>
            <div>
              <p className="flex items-center gap-1.5 font-semibold">
                <Sparkles className="size-4 text-[var(--vdg-color-primary)]" /> Chưa tìm được câu trả lời?
              </p>
              <p className="text-sm text-[var(--vdg-color-text-secondary)]">Hỏi Trợ lý AI hoặc liên hệ tổng đài hỗ trợ.</p>
            </div>
          </div>
          <Button variant="primary" onClick={onOpenAI} data-icon="inline-start">
            <Headset className="size-4" /> Chat với AI
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
