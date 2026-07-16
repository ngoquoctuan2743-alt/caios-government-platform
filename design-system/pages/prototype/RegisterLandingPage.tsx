import { ArrowLeft, IdCard, Building2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@ds/components";
import { AuthenticationBackground } from "@ds/assets/backgrounds";
import { CitizenIllustration, BusinessIllustration } from "@ds/assets/illustrations";
import type { RegisterAccountType } from "./navigation";

export function RegisterLandingPage({
  onChoose,
  onBack,
}: {
  onChoose: (type: RegisterAccountType) => void;
  onBack: () => void;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <AuthenticationBackground />
      </div>
      <div className="relative w-full max-w-3xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 flex items-center gap-1.5 text-sm font-medium text-[var(--vdg-color-text-secondary)] hover:text-[var(--vdg-color-text)]"
        >
          <ArrowLeft className="size-4" /> Quay lại
        </button>

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
            Đăng ký tài khoản
          </h1>
          <p className="mt-2 text-[var(--vdg-color-text-secondary)]">Chọn loại tài khoản phù hợp với bạn để bắt đầu.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <button type="button" onClick={() => onChoose("citizen")} className="text-left">
            <Card variant="solid" interactive className="h-full">
              <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="size-28">
                  <CitizenIllustration />
                </div>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <IdCard className="size-5 text-[var(--vdg-color-primary)]" /> Công dân
                </div>
                <p className="text-sm text-[var(--vdg-color-text-secondary)]">
                  Đăng ký để nộp hồ sơ, theo dõi thủ tục hành chính cá nhân.
                </p>
                <span className="flex items-center gap-1 text-sm font-medium text-[var(--vdg-color-primary)]">
                  Tiếp tục <ArrowRight className="size-4" />
                </span>
              </CardContent>
            </Card>
          </button>

          <button type="button" onClick={() => onChoose("business")} className="text-left">
            <Card variant="solid" interactive className="h-full">
              <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="size-28">
                  <BusinessIllustration />
                </div>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Building2 className="size-5 text-[var(--vdg-color-blue)]" /> Doanh nghiệp
                </div>
                <p className="text-sm text-[var(--vdg-color-text-secondary)]">
                  Đăng ký cho tổ chức, doanh nghiệp để quản lý giấy phép, thuế, hồ sơ.
                </p>
                <span className="flex items-center gap-1 text-sm font-medium text-[var(--vdg-color-blue)]">
                  Tiếp tục <ArrowRight className="size-4" />
                </span>
              </CardContent>
            </Card>
          </button>
        </div>
      </div>
    </div>
  );
}
