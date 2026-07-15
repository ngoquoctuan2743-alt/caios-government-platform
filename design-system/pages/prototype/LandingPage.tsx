import { Search, ArrowRight, IdCard, Building2, Home, Briefcase, GraduationCap, HeartPulse, Sparkles, Megaphone, Newspaper, CalendarClock } from "lucide-react";
import { Button, Card, CardContent, Badge } from "@ds/components";
import { HeroBackground } from "@ds/assets/backgrounds";
import { AIAssistantIllustration, SmartCityIllustration } from "@ds/assets/illustrations";

const SERVICES = [
  { icon: IdCard, label: "Căn cước công dân", desc: "Cấp mới, cấp lại, đổi thẻ" },
  { icon: Home, label: "Hộ khẩu & cư trú", desc: "Đăng ký, thay đổi nơi ở" },
  { icon: Building2, label: "Đăng ký kinh doanh", desc: "Thành lập, thay đổi doanh nghiệp" },
  { icon: Briefcase, label: "Bảo hiểm xã hội", desc: "Tra cứu, đăng ký, hưởng chế độ" },
  { icon: GraduationCap, label: "Giáo dục", desc: "Tuyển sinh, văn bằng, chứng chỉ" },
  { icon: HeartPulse, label: "Y tế", desc: "Bảo hiểm y tế, hồ sơ sức khoẻ" },
];

const STATS = [
  { value: "12.4M", label: "Công dân đã sử dụng" },
  { value: "2,180", label: "Thủ tục trực tuyến" },
  { value: "3.2 ngày", label: "Thời gian xử lý trung bình" },
  { value: "94%", label: "Mức độ hài lòng" },
];

const NEWS = [
  {
    icon: Megaphone,
    date: "12/07/2026",
    title: "Ra mắt Trợ lý AI hỗ trợ 24/7 cho 12 nhóm thủ tục",
    excerpt: "Công dân có thể mô tả nhu cầu bằng ngôn ngữ tự nhiên để được hướng dẫn đúng thủ tục.",
  },
  {
    icon: Newspaper,
    date: "05/07/2026",
    title: "Tích hợp Định danh điện tử vào toàn bộ dịch vụ công",
    excerpt: "Một tài khoản định danh điện tử dùng chung cho cổng dịch vụ công và các nền tảng liên thông.",
  },
  {
    icon: CalendarClock,
    date: "28/06/2026",
    title: "Rút ngắn thời gian xử lý cấp đổi CCCD còn 3 ngày làm việc",
    excerpt: "Áp dụng từ tháng 8/2026 tại các đơn vị đã hoàn tất kết nối cơ sở dữ liệu dân cư.",
  },
];

export function LandingPage({ onOpenDashboard }: { onOpenDashboard: () => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <HeroBackground />
        </div>
        {/* Soft floating accent — pure decoration, echoes the AI badge's gold tone at the opposite corner */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-[420px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--vdg-color-primary) 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-[1320px] px-6 pb-20 pt-20 sm:pt-28">
          <Badge variant="gold" icon={<Sparkles className="size-3" />} className="vdg-in mb-6">
            Hỗ trợ bởi Trợ lý AI
          </Badge>
          <h1
            className="vdg-in max-w-[18ch] text-[clamp(2.5rem,1.8rem+3vw,4.25rem)] font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--vdg-font-heading)", animationDelay: "60ms" }}
          >
            Dịch vụ công{" "}
            <span className="bg-gradient-to-r from-[var(--vdg-color-primary)] to-[var(--vdg-color-primary-dark)] bg-clip-text text-transparent">
              trong tầm tay bạn
            </span>
          </h1>
          <p className="vdg-in mt-5 max-w-[52ch] text-lg text-[var(--vdg-color-text-secondary)]" style={{ animationDelay: "120ms" }}>
            Nộp hồ sơ, theo dõi tiến độ và nhận kết quả trực tuyến — minh bạch, nhanh chóng, mọi lúc mọi nơi.
          </p>

          {/* Search area */}
          <div
            className="vdg-in group mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] p-2 shadow-[var(--vdg-shadow-lg)] transition-shadow duration-300 focus-within:border-[var(--vdg-color-primary)]/50 focus-within:shadow-[var(--vdg-shadow-xl),0_0_0_4px_rgba(200,16,46,0.08)] sm:flex-row sm:items-center"
            style={{ animationDelay: "180ms" }}
          >
            <div className="flex flex-1 items-center gap-2.5 px-3 py-2">
              <Search className="size-4.5 shrink-0 text-[var(--vdg-color-text-secondary)] transition-colors group-focus-within:text-[var(--vdg-color-primary)]" />
              <input
                type="search"
                placeholder="Tìm thủ tục, ví dụ: “cấp lại căn cước công dân”"
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--vdg-color-text-secondary)]"
              />
            </div>
            <Button variant="primary" className="w-full sm:w-auto">
              Tìm kiếm
            </Button>
          </div>
          <div className="vdg-in mt-4 flex flex-wrap gap-2 text-xs text-[var(--vdg-color-text-secondary)]" style={{ animationDelay: "220ms" }}>
            <span>Tìm nhiều nhất:</span>
            {["Căn cước công dân", "Hộ khẩu", "Đăng ký kinh doanh"].map((t) => (
              <button
                key={t}
                type="button"
                className="rounded-full border border-[var(--vdg-color-border)] px-3 py-1 transition-colors hover:border-[var(--vdg-color-primary)] hover:text-[var(--vdg-color-primary)]"
              >
                {t}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="vdg-in mt-16 grid grid-cols-2 gap-6 border-t border-[var(--vdg-color-border)] pt-8 sm:grid-cols-4" style={{ animationDelay: "280ms" }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold tabular-nums sm:text-3xl" style={{ fontFamily: "var(--vdg-font-heading)" }}>
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-[var(--vdg-color-text-secondary)] sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular services */}
      <section className="border-t border-[var(--vdg-color-border)] py-20">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">
                Dịch vụ phổ biến
              </span>
              <h2 className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--vdg-font-heading)" }}>
                Bạn cần hỗ trợ điều gì?
              </h2>
            </div>
            <button type="button" className="flex items-center gap-1.5 text-sm font-medium text-[var(--vdg-color-primary)]">
              Xem tất cả dịch vụ <ArrowRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ icon: ServiceIcon, label, desc }) => (
              <Card key={label} variant="solid" interactive>
                <CardContent className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--vdg-color-primary)]/10 text-[var(--vdg-color-primary)]">
                    <ServiceIcon className="size-5" strokeWidth={2} />
                  </span>
                  <div>
                    <div className="font-semibold">{label}</div>
                    <div className="mt-0.5 text-sm text-[var(--vdg-color-text-secondary)]">{desc}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="border-t border-[var(--vdg-color-border)] py-20">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">
                Tin tức &amp; Thông báo
              </span>
              <h2 className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--vdg-font-heading)" }}>
                Cập nhật mới nhất
              </h2>
            </div>
            <button type="button" className="flex items-center gap-1.5 text-sm font-medium text-[var(--vdg-color-primary)]">
              Xem tất cả tin tức <ArrowRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {NEWS.map(({ icon: NewsIcon, date, title, excerpt }) => (
              <Card key={title} variant="solid" interactive>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs font-medium text-[var(--vdg-color-text-secondary)]">
                    <span className="flex size-7 items-center justify-center rounded-full bg-[var(--vdg-color-primary)]/10 text-[var(--vdg-color-primary)]">
                      <NewsIcon className="size-3.5" strokeWidth={2} />
                    </span>
                    {date}
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug">{title}</h3>
                  <p className="mt-2 text-sm text-[var(--vdg-color-text-secondary)]">{excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Citizen + AI teaser */}
      <section className="border-t border-[var(--vdg-color-border)] py-20">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">
              Trợ lý AI
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              Không biết bắt đầu từ đâu? Hỏi trợ lý AI.
            </h2>
            <p className="mt-4 max-w-[48ch] text-[var(--vdg-color-text-secondary)]">
              Mô tả nhu cầu của bạn bằng ngôn ngữ tự nhiên — trợ lý AI xác định đúng thủ tục, kiểm tra điều kiện và chuẩn bị hồ sơ giúp bạn.
            </p>
            <Button variant="primary" className="mt-6" onClick={onOpenDashboard}>
              Trải nghiệm ngay
            </Button>
          </div>
          <div className="mx-auto aspect-square w-full max-w-sm">
            <AIAssistantIllustration animated />
          </div>
        </div>
      </section>

      {/* National data platform strip */}
      <section className="border-t border-[var(--vdg-color-border)] py-16">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
          <div className="mx-auto aspect-square w-full max-w-xs lg:order-2">
            <SmartCityIllustration />
          </div>
          <div className="lg:order-1">
            <h3 className="text-xl font-bold sm:text-2xl" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              Một nền tảng, kết nối toàn bộ dịch vụ công
            </h3>
            <p className="mt-3 max-w-[46ch] text-sm text-[var(--vdg-color-text-secondary)] sm:text-base">
              Dữ liệu công dân, doanh nghiệp và cơ quan nhà nước được đồng bộ trên một nền tảng duy nhất — không cần nộp lại giấy tờ đã có.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--vdg-color-border)] py-10">
        <div className="mx-auto max-w-[1320px] px-6 text-center text-xs text-[var(--vdg-color-text-secondary)] sm:text-left">
          © 2026 Cổng Dịch vụ công Số — Bản dựng trình diễn, không phải sản phẩm chính thức.
        </div>
      </footer>
    </div>
  );
}
