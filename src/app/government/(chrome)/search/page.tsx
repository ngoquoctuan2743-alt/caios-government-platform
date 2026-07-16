"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search, IdCard, Newspaper, FileText, HelpCircle, ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/government/status-badge"

type ResultType = "service" | "news" | "document" | "faq"

const RESULTS: { type: ResultType; icon: typeof IdCard; title: string; excerpt: string }[] = [
  { type: "service", icon: IdCard, title: "Cấp lại Căn cước công dân", excerpt: "Thủ tục cấp lại CCCD khi bị mất, hư hỏng." },
  { type: "service", icon: IdCard, title: "Cấp đổi Căn cước công dân", excerpt: "Đổi CCCD khi hết hạn hoặc thay đổi thông tin." },
  { type: "news", icon: Newspaper, title: "Rút ngắn thời gian xử lý cấp đổi CCCD", excerpt: "Áp dụng từ tháng 8/2026 tại các đơn vị đã kết nối dữ liệu." },
  { type: "document", icon: FileText, title: "Mẫu tờ khai Căn cước công dân", excerpt: "Biểu mẫu chuẩn dùng cho hồ sơ cấp mới/cấp lại/cấp đổi." },
  { type: "faq", icon: HelpCircle, title: "Làm CCCD mất bao lâu?", excerpt: "Thời gian xử lý trung bình 3–7 ngày làm việc." },
]

const FILTERS: { key: "all" | ResultType; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "service", label: "Dịch vụ" },
  { key: "news", label: "Tin tức" },
  { key: "document", label: "Tài liệu" },
  { key: "faq", label: "Câu hỏi" },
]

const TYPE_LABEL: Record<ResultType, string> = { service: "Dịch vụ", news: "Tin tức", document: "Tài liệu", faq: "Câu hỏi" }

export default function SearchResultsPage() {
  return (
    <Suspense>
      <SearchResultsContent />
    </Suspense>
  )
}

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const [filter, setFilter] = useState<"all" | ResultType>("all")

  const results = RESULTS.filter((r) => {
    const matchesFilter = filter === "all" || r.type === filter
    const matchesQuery = query.trim() === "" || r.title.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQuery
  })

  return (
    <div className="mx-auto max-w-[820px] space-y-6 px-6 py-10">
      <div>
        <h1 className="font-heading text-2xl font-bold">Kết quả tìm kiếm</h1>
        <div className="mt-4 flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2.5 shadow-sm">
          <Search className="size-4 shrink-0 text-muted-foreground" />
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
              (filter === f.key ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground")
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{results.length} kết quả</p>

      <div className="space-y-3">
        {results.map((r) => (
          <Card key={r.title} className="transition-shadow hover:shadow-md hover:ring-primary/30">
            <CardContent className="flex items-start gap-3 py-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <r.icon className="size-4" />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{r.title}</h3>
                  <StatusBadge tone="neutral">{TYPE_LABEL[r.type]}</StatusBadge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.excerpt}</p>
              </div>
              <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
