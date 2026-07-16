import { useState } from "react";
import { Search, ArrowRight, IdCard, Building2, Home, Briefcase, GraduationCap, HeartPulse, Sparkles, Megaphone, Newspaper, CalendarClock } from "lucide-react";
import { Button, Card, CardContent, Badge } from "@ds/components";
import { HeroBackground } from "@ds/assets/backgrounds";
import { AIAssistantIllustration, SmartCityIllustration } from "@ds/assets/illustrations";
import type { Locale } from "./i18n";

const ICONS = [IdCard, Home, Building2, Briefcase, GraduationCap, HeartPulse] as const;
const NEWS_ICONS = [Megaphone, Newspaper, CalendarClock] as const;

const CONTENT: Record<Locale, {
  aiBadge: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  searchButton: string;
  mostSearched: string;
  quickTags: string[];
  stats: { value: string; label: string }[];
  servicesEyebrow: string;
  servicesTitle: string;
  servicesAll: string;
  services: { label: string; desc: string }[];
  newsEyebrow: string;
  newsTitle: string;
  newsAll: string;
  news: { date: string; title: string; excerpt: string }[];
  aiEyebrow: string;
  aiTitle: string;
  aiSubtitle: string;
  aiCta: string;
  platformTitle: string;
  platformSubtitle: string;
}> = {
  vi: {
    aiBadge: "Hỗ trợ bởi Trợ lý AI",
    heroTitle: "Dịch vụ công",
    heroTitleAccent: "trong tầm tay bạn",
    heroSubtitle: "Nộp hồ sơ, theo dõi tiến độ và nhận kết quả trực tuyến — minh bạch, nhanh chóng, mọi lúc mọi nơi.",
    searchPlaceholder: "Tìm thủ tục, ví dụ: “cấp lại căn cước công dân”",
    searchButton: "Tìm kiếm",
    mostSearched: "Tìm nhiều nhất:",
    quickTags: ["Căn cước công dân", "Hộ khẩu", "Đăng ký kinh doanh"],
    stats: [
      { value: "12.4M", label: "Công dân đã sử dụng" },
      { value: "2,180", label: "Thủ tục trực tuyến" },
      { value: "3.2 ngày", label: "Thời gian xử lý trung bình" },
      { value: "94%", label: "Mức độ hài lòng" },
    ],
    servicesEyebrow: "Dịch vụ phổ biến",
    servicesTitle: "Bạn cần hỗ trợ điều gì?",
    servicesAll: "Xem tất cả dịch vụ",
    services: [
      { label: "Căn cước công dân", desc: "Cấp mới, cấp lại, đổi thẻ" },
      { label: "Hộ khẩu & cư trú", desc: "Đăng ký, thay đổi nơi ở" },
      { label: "Đăng ký kinh doanh", desc: "Thành lập, thay đổi doanh nghiệp" },
      { label: "Bảo hiểm xã hội", desc: "Tra cứu, đăng ký, hưởng chế độ" },
      { label: "Giáo dục", desc: "Tuyển sinh, văn bằng, chứng chỉ" },
      { label: "Y tế", desc: "Bảo hiểm y tế, hồ sơ sức khoẻ" },
    ],
    newsEyebrow: "Tin tức & Thông báo",
    newsTitle: "Cập nhật mới nhất",
    newsAll: "Xem tất cả tin tức",
    news: [
      {
        date: "12/07/2026",
        title: "Ra mắt Trợ lý AI hỗ trợ 24/7 cho 12 nhóm thủ tục",
        excerpt: "Công dân có thể mô tả nhu cầu bằng ngôn ngữ tự nhiên để được hướng dẫn đúng thủ tục.",
      },
      {
        date: "05/07/2026",
        title: "Tích hợp Định danh điện tử vào toàn bộ dịch vụ công",
        excerpt: "Một tài khoản định danh điện tử dùng chung cho cổng dịch vụ công và các nền tảng liên thông.",
      },
      {
        date: "28/06/2026",
        title: "Rút ngắn thời gian xử lý cấp đổi CCCD còn 3 ngày làm việc",
        excerpt: "Áp dụng từ tháng 8/2026 tại các đơn vị đã hoàn tất kết nối cơ sở dữ liệu dân cư.",
      },
    ],
    aiEyebrow: "Trợ lý AI",
    aiTitle: "Không biết bắt đầu từ đâu? Hỏi trợ lý AI.",
    aiSubtitle: "Mô tả nhu cầu của bạn bằng ngôn ngữ tự nhiên — trợ lý AI xác định đúng thủ tục, kiểm tra điều kiện và chuẩn bị hồ sơ giúp bạn.",
    aiCta: "Trải nghiệm ngay",
    platformTitle: "Một nền tảng, kết nối toàn bộ dịch vụ công",
    platformSubtitle: "Dữ liệu công dân, doanh nghiệp và cơ quan nhà nước được đồng bộ trên một nền tảng duy nhất — không cần nộp lại giấy tờ đã có.",
  },
  en: {
    aiBadge: "Powered by AI Assistant",
    heroTitle: "Public services,",
    heroTitleAccent: "right at your fingertips",
    heroSubtitle: "Submit applications, track progress, and receive results online — transparent, fast, anytime, anywhere.",
    searchPlaceholder: "Search a procedure, e.g. “renew national ID card”",
    searchButton: "Search",
    mostSearched: "Most searched:",
    quickTags: ["National ID card", "Household registration", "Business registration"],
    stats: [
      { value: "12.4M", label: "Citizens served" },
      { value: "2,180", label: "Online procedures" },
      { value: "3.2 days", label: "Average processing time" },
      { value: "94%", label: "Satisfaction rate" },
    ],
    servicesEyebrow: "Popular services",
    servicesTitle: "What do you need help with?",
    servicesAll: "View all services",
    services: [
      { label: "National ID card", desc: "New issue, reissue, renewal" },
      { label: "Household registration", desc: "Register or change residence" },
      { label: "Business registration", desc: "Set up or amend a business" },
      { label: "Social insurance", desc: "Look up, register, claim benefits" },
      { label: "Education", desc: "Admissions, degrees, certificates" },
      { label: "Healthcare", desc: "Health insurance, medical records" },
    ],
    newsEyebrow: "News & Announcements",
    newsTitle: "Latest updates",
    newsAll: "View all news",
    news: [
      {
        date: "Jul 12, 2026",
        title: "24/7 AI Assistant launched for 12 procedure groups",
        excerpt: "Citizens can describe their needs in plain language to be guided to the right procedure.",
      },
      {
        date: "Jul 5, 2026",
        title: "Electronic identity now integrated across all public services",
        excerpt: "One electronic ID account shared across the public service portal and connected platforms.",
      },
      {
        date: "Jun 28, 2026",
        title: "ID card renewal processing time cut to 3 working days",
        excerpt: "Effective August 2026 at agencies that have completed population database integration.",
      },
    ],
    aiEyebrow: "AI Assistant",
    aiTitle: "Not sure where to start? Ask the AI assistant.",
    aiSubtitle: "Describe what you need in plain language — the AI assistant finds the right procedure, checks eligibility, and helps prepare your application.",
    aiCta: "Try it now",
    platformTitle: "One platform, connecting all public services",
    platformSubtitle: "Citizen, business, and government agency data synced on a single platform — no need to resubmit documents you've already provided.",
  },
};

export function LandingPage({
  onOpenDashboard,
  onSearch,
  locale,
}: {
  onOpenDashboard: () => void;
  onSearch: (query: string) => void;
  locale: Locale;
}) {
  const [query, setQuery] = useState("");
  const c = CONTENT[locale];
  const SERVICES = c.services.map((s, i) => ({ ...s, icon: ICONS[i] }));
  const NEWS = c.news.map((n, i) => ({ ...n, icon: NEWS_ICONS[i] }));

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
            {c.aiBadge}
          </Badge>
          <h1
            className="vdg-in max-w-[18ch] text-[clamp(2.5rem,1.8rem+3vw,4.25rem)] font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--vdg-font-heading)", animationDelay: "60ms" }}
          >
            {c.heroTitle}{" "}
            <span className="bg-gradient-to-r from-[var(--vdg-color-primary)] to-[var(--vdg-color-primary-dark)] bg-clip-text text-transparent">
              {c.heroTitleAccent}
            </span>
          </h1>
          <p className="vdg-in mt-5 max-w-[52ch] text-lg text-[var(--vdg-color-text-secondary)]" style={{ animationDelay: "120ms" }}>
            {c.heroSubtitle}
          </p>

          {/* Search area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(query);
            }}
            className="vdg-in group mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-[var(--vdg-color-border)] bg-[var(--vdg-color-surface)] p-2 shadow-[var(--vdg-shadow-lg)] transition-shadow duration-300 focus-within:border-[var(--vdg-color-primary)]/50 focus-within:shadow-[var(--vdg-shadow-xl),0_0_0_4px_rgba(200,16,46,0.08)] sm:flex-row sm:items-center"
            style={{ animationDelay: "180ms" }}
          >
            <div className="flex flex-1 items-center gap-2.5 px-3 py-2">
              <Search className="size-4.5 shrink-0 text-[var(--vdg-color-text-secondary)] transition-colors group-focus-within:text-[var(--vdg-color-primary)]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={c.searchPlaceholder}
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--vdg-color-text-secondary)]"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              {c.searchButton}
            </Button>
          </form>
          <div className="vdg-in mt-4 flex flex-wrap gap-2 text-xs text-[var(--vdg-color-text-secondary)]" style={{ animationDelay: "220ms" }}>
            <span>{c.mostSearched}</span>
            {c.quickTags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onSearch(t)}
                className="rounded-full border border-[var(--vdg-color-border)] px-3 py-1 transition-colors hover:border-[var(--vdg-color-primary)] hover:text-[var(--vdg-color-primary)]"
              >
                {t}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="vdg-in mt-16 grid grid-cols-2 gap-6 border-t border-[var(--vdg-color-border)] pt-8 sm:grid-cols-4" style={{ animationDelay: "280ms" }}>
            {c.stats.map((s) => (
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
                {c.servicesEyebrow}
              </span>
              <h2 className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--vdg-font-heading)" }}>
                {c.servicesTitle}
              </h2>
            </div>
            <button type="button" onClick={() => onSearch("")} className="flex items-center gap-1.5 text-sm font-medium text-[var(--vdg-color-primary)]">
              {c.servicesAll} <ArrowRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ icon: ServiceIcon, label, desc }) => (
              <button key={label} type="button" onClick={() => onSearch(label)} className="text-left">
                <Card variant="solid" interactive className="h-full">
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
              </button>
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
                {c.newsEyebrow}
              </span>
              <h2 className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--vdg-font-heading)" }}>
                {c.newsTitle}
              </h2>
            </div>
            <button type="button" onClick={() => onSearch("")} className="flex items-center gap-1.5 text-sm font-medium text-[var(--vdg-color-primary)]">
              {c.newsAll} <ArrowRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {NEWS.map(({ icon: NewsIcon, date, title, excerpt }) => (
              <button key={title} type="button" onClick={() => onSearch(title)} className="text-left">
                <Card variant="solid" interactive className="h-full">
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
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Citizen + AI teaser */}
      <section className="border-t border-[var(--vdg-color-border)] py-20">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--vdg-color-primary)]">
              {c.aiEyebrow}
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--vdg-font-heading)" }}>
              {c.aiTitle}
            </h2>
            <p className="mt-4 max-w-[48ch] text-[var(--vdg-color-text-secondary)]">
              {c.aiSubtitle}
            </p>
            <Button variant="primary" className="mt-6" onClick={onOpenDashboard}>
              {c.aiCta}
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
              {c.platformTitle}
            </h3>
            <p className="mt-3 max-w-[46ch] text-sm text-[var(--vdg-color-text-secondary)] sm:text-base">
              {c.platformSubtitle}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
