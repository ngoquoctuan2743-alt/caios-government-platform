import { notFound } from "next/navigation"
import { FileText } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const CONTENT = {
  terms: {
    title: "Điều khoản sử dụng",
    updated: "Cập nhật lần cuối: 01/07/2026",
    sections: [
      { heading: "1. Phạm vi áp dụng", body: "Điều khoản này áp dụng cho mọi công dân và doanh nghiệp sử dụng Cổng Dịch vụ công Số để nộp, theo dõi và nhận kết quả xử lý thủ tục hành chính trực tuyến." },
      { heading: "2. Trách nhiệm người dùng", body: "Người dùng chịu trách nhiệm về tính chính xác của thông tin cung cấp và bảo mật thông tin đăng nhập của mình." },
      { heading: "3. Giới hạn trách nhiệm", body: "Hệ thống nỗ lực đảm bảo tính liên tục của dịch vụ nhưng không chịu trách nhiệm cho gián đoạn ngoài tầm kiểm soát hợp lý." },
    ],
  },
  privacy: {
    title: "Chính sách bảo mật",
    updated: "Cập nhật lần cuối: 01/07/2026",
    sections: [
      { heading: "1. Thông tin thu thập", body: "Bao gồm thông tin định danh cá nhân, thông tin liên hệ và dữ liệu hồ sơ cần thiết để xử lý thủ tục." },
      { heading: "2. Mục đích sử dụng", body: "Thông tin chỉ được dùng để xác thực danh tính, xử lý hồ sơ và cải thiện chất lượng dịch vụ công." },
      { heading: "3. Chia sẻ thông tin", body: "Không chia sẻ thông tin cá nhân cho bên thứ ba ngoài các cơ quan nhà nước có thẩm quyền liên quan trực tiếp tới thủ tục." },
    ],
  },
  data: {
    title: "Chính sách dữ liệu",
    updated: "Cập nhật lần cuối: 01/07/2026",
    sections: [
      { heading: "1. Lưu trữ dữ liệu", body: "Dữ liệu được lưu trữ trên hạ tầng trong nước, tuân thủ quy định về an toàn thông tin mạng." },
      { heading: "2. Thời gian lưu trữ", body: "Hồ sơ điện tử được lưu trữ theo thời hạn quy định của từng loại thủ tục hành chính." },
      { heading: "3. Quyền của công dân", body: "Công dân có quyền yêu cầu tra cứu, chỉnh sửa hoặc xoá dữ liệu cá nhân theo quy định pháp luật hiện hành." },
    ],
  },
  accessibility: {
    title: "Tuyên bố về khả năng tiếp cận",
    updated: "Cập nhật lần cuối: 01/07/2026",
    sections: [
      { heading: "1. Cam kết", body: "Cổng Dịch vụ công Số cam kết cung cấp trải nghiệm truy cập được cho mọi công dân, bao gồm người khuyết tật." },
      { heading: "2. Tiêu chuẩn áp dụng", body: "Hệ thống được xây dựng theo hướng tuân thủ WCAG 2.1 mức AA — độ tương phản màu, điều hướng bàn phím, hỗ trợ trình đọc màn hình." },
      { heading: "3. Phản hồi", body: "Nếu bạn gặp khó khăn khi truy cập bất kỳ nội dung nào, vui lòng liên hệ qua Trung tâm hỗ trợ để được trợ giúp." },
    ],
  },
} as const

type LegalDoc = keyof typeof CONTENT

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params
  const entry = CONTENT[doc as LegalDoc]
  if (!entry) notFound()

  const { title, updated, sections } = entry

  return (
    <div className="mx-auto max-w-[720px] space-y-6 px-6 py-10">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FileText className="size-4.5" />
        </span>
        <div>
          <h1 className="font-heading text-2xl font-bold">{title}</h1>
          <p className="text-xs text-muted-foreground">{updated}</p>
        </div>
      </div>
      <Card>
        <CardContent className="space-y-6 py-8">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="mb-1.5 text-sm font-semibold">{s.heading}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
