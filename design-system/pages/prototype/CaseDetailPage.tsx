import { ArrowLeft, Sparkles, FileText, CheckCircle2, Clock3, MessageSquareText, ShieldCheck, ListChecks } from "lucide-react";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@ds/components";
import { WorkflowTimeline } from "./WorkflowTimeline";

const DOCUMENTS = [
  { name: "CCCD hiện tại", status: "success" as const, label: "Đã xác minh" },
  { name: "Ảnh chân dung 4x6", status: "success" as const, label: "Đã xác minh" },
  { name: "Tờ khai đăng ký kinh doanh", status: "primary" as const, label: "Đang kiểm tra" },
  { name: "Giấy uỷ quyền (nếu có)", status: "neutral" as const, label: "Không bắt buộc" },
];

const ACTIVITY = [
  { time: "15/07/2026 · 09:12", actor: "Hệ thống", text: "Hồ sơ được tạo từ hội thoại với Trợ lý AI." },
  { time: "15/07/2026 · 09:12", actor: "Trợ lý AI", text: "Đã nhận diện thủ tục: Đăng ký kinh doanh. Độ tin cậy: Cao." },
  { time: "15/07/2026 · 09:13", actor: "Trợ lý AI", text: "Đã tạo checklist 4 giấy tờ, đối chiếu 3 căn cứ pháp lý." },
  { time: "15/07/2026 · 14:40", actor: "Cán bộ Nguyễn Thị H", text: "Đã tiếp nhận và bắt đầu thẩm định hồ sơ." },
];

export function CaseDetailPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-8">
      <button type="button" onClick={onBack} className="mb-6 flex items-center gap-1.5 text-sm font-medium text-[var(--vdg-color-text-secondary)] hover:text-[var(--vdg-color-text)]">
        <ArrowLeft className="size-4" /> Quay lại
      </button>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
            CP-2026-014901
          </h1>
          <p className="mt-1 text-[var(--vdg-color-text-secondary)]">Đăng ký kinh doanh · Trần Thị B</p>
        </div>
        <Badge variant="primary">Đang xử lý</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card variant="solid">
            <CardHeader>
              <CardTitle>Tiến độ xử lý</CardTitle>
            </CardHeader>
            <CardContent>
              <WorkflowTimeline currentStep={1} />
            </CardContent>
          </Card>

          <Card variant="solid">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[var(--vdg-color-primary)]" /> Luồng phê duyệt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                rows={3}
                placeholder="Ghi chú thẩm định (không bắt buộc)..."
                className="w-full rounded-[var(--vdg-radius-sm)] border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] p-3 text-sm outline-none focus-visible:border-[var(--vdg-color-primary)]"
              />
              <div className="flex flex-wrap gap-2.5">
                <Button variant="primary" data-icon="inline-start">
                  <CheckCircle2 className="size-4" /> Phê duyệt
                </Button>
                <Button variant="secondary">Yêu cầu bổ sung</Button>
                <Button variant="danger">Từ chối</Button>
              </div>
            </CardContent>
          </Card>

          <Card variant="solid">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-4 text-[var(--vdg-color-primary)]" /> Giấy tờ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {DOCUMENTS.map((d) => (
                <div key={d.name} className="flex items-center justify-between rounded-[var(--vdg-radius-sm)] border border-[var(--vdg-color-border)] px-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2.5">
                    <ListChecks className="size-4 text-[var(--vdg-color-text-secondary)]" />
                    {d.name}
                  </span>
                  <Badge variant={d.status}>{d.label}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card variant="solid">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock3 className="size-4 text-[var(--vdg-color-primary)]" /> Nhật ký hoạt động
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 border-l-2 border-[var(--vdg-color-border)] pl-4">
                {ACTIVITY.map((a, i) => (
                  <li key={i} className="relative">
                    <span className="absolute top-1 -left-[21px] size-2.5 rounded-full bg-[var(--vdg-color-primary)]" />
                    <p className="text-xs text-[var(--vdg-color-text-secondary)]">
                      {a.time} · {a.actor}
                    </p>
                    <p className="mt-0.5 text-sm">{a.text}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* AI Summary sidebar */}
        <div className="space-y-6">
          <Card variant="solid" className="border-[var(--vdg-color-primary)]/20 bg-[var(--vdg-color-primary)]/[0.03]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-4 text-[var(--vdg-color-primary)]" /> Tóm tắt AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion>
                <AccordionItem value="procedure">
                  <AccordionTrigger>Thủ tục nhận diện</AccordionTrigger>
                  <AccordionPanel>Đăng ký kinh doanh hộ cá thể — độ tin cậy Cao, khớp theo từ khoá do công dân cung cấp.</AccordionPanel>
                </AccordionItem>
                <AccordionItem value="eligibility">
                  <AccordionTrigger>Điều kiện</AccordionTrigger>
                  <AccordionPanel>Đủ điều kiện nộp hồ sơ — không phát hiện xung đột với quy định hiện hành.</AccordionPanel>
                </AccordionItem>
                <AccordionItem value="citation">
                  <AccordionTrigger>Căn cứ pháp lý</AccordionTrigger>
                  <AccordionPanel>Luật Doanh nghiệp 2020, Nghị định 01/2021/NĐ-CP về đăng ký doanh nghiệp.</AccordionPanel>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card variant="solid">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareText className="size-4 text-[var(--vdg-color-text-secondary)]" /> Liên hệ công dân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-[var(--vdg-color-text-secondary)]">Gửi yêu cầu bổ sung hoặc câu hỏi trực tiếp tới công dân.</p>
              <Button variant="outline" className="w-full">
                Soạn tin nhắn
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
