import { useState } from "react";
import { Search, IdCard, Newspaper, FileText, HelpCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, Badge } from "@ds/components";

type ResultType = "service" | "news" | "document" | "faq";

const RESULTS: { type: ResultType; icon: typeof IdCard; title: string; excerpt: string }[] = [
  { type: "service", icon: IdCard, title: "Cấp lại Căn cước công dân", excerpt: "Thủ tục cấp lại CCCD khi bị mất, hư hỏng." },
  { type: "service", icon: IdCard, title: "Cấp đổi Căn cước công dân", excerpt: "Đổi CCCD khi hết hạn hoặc thay đổi thông tin." },
  { type: "news", icon: Newspaper, title: "Rút ngắn thời gian xử lý cấp đổi CCCD", excerpt: "Áp dụng từ tháng 8/2026 tại các đơn vị đã kết nối dữ liệu." },
  { type: "document", icon: FileText, title: "Mẫu tờ khai Căn cước công dân", excerpt: "Biểu mẫu chuẩn dùng cho hồ sơ cấp mới/cấp lại/cấp đổi." },
  { type: "faq", icon: HelpCircle, title: "Làm CCCD mất bao lâu?", excerpt: "Thời gian xử lý trung bình 3–7 ngày làm việc." },
];

const FILTERS: { key: "all" | ResultType; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "service", label: "Dịch vụ" },
  { key: "news", label: "Tin tức" },
  { key: "document", label: "Tài liệu" },
  { key: "faq", label: "Câu hỏi" },
];

const TYPE_LABEL: Record<ResultType, string> = { service: "Dịch vụ", news: "Tin tức", document: "Tài liệu", faq: "Câu hỏi" };

export function SearchResultsPage({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<"all" | ResultType>("all");

  const results = RESULTS.filter((r) => {
    const matchesFilter = filter === "all" || r.type === filter;
    const matchesQuery = query.trim() === "" || r.title.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-[820px] space-y-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
          Kết quả tìm kiếm
        </h1>
        <div className="mt-4 flex items-center gap-2.5 rounded-full border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] px-4 py-2.5 shadow-[var(--vdg-shadow-sm)]">
          <Search className="size-4 shrink-0 text-[var(--vdg-color-text-secondary)]" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm dịch vụ, tin tức, tài liệu..." className="w-full bg-transparent text-sm outline-none" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors " +
              (filter === f.key ? "border-[var(--vdg-color-primary)] bg-[var(--vdg-color-primary)] text-white" : "border-[var(--vdg-color-border)] text-[var(--vdg-color-text-secondary)] hover:text-[var(--vdg-color-text)]")
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-[var(--vdg-color-text-secondary)]">{results.length} kết quả</p>

      <div className="space-y-3">
        {results.map((r) => (
          <Card key={r.title} variant="solid" interactive>
            <CardContent className="flex items-start gap-3 py-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--vdg-color-primary)]/10 text-[var(--vdg-color-primary)]">
                <r.icon className="size-4" />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{r.title}</h3>
                  <Badge variant="neutral">{TYPE_LABEL[r.type]}</Badge>
                </div>
                <p className="mt-1 text-sm text-[var(--vdg-color-text-secondary)]">{r.excerpt}</p>
              </div>
              <ArrowRight className="mt-1 size-4 shrink-0 text-[var(--vdg-color-text-secondary)]" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
