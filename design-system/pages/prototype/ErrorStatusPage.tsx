import { Home, RefreshCcw, LogIn, ShieldAlert } from "lucide-react";
import { Button } from "@ds/components";
import {
  NotFoundBackground,
  ServerErrorBackground,
  MaintenanceBackground,
  WarningBackground,
} from "@ds/assets/backgrounds";
import type { ErrorType } from "./navigation";

const CONTENT: Record<
  ErrorType,
  { code: string; title: string; description: string; Background: typeof NotFoundBackground; action: "home" | "retry" | "login" }
> = {
  "404": {
    code: "404",
    title: "Không tìm thấy trang",
    description: "Đường dẫn bạn truy cập không tồn tại hoặc đã được di chuyển.",
    Background: NotFoundBackground,
    action: "home",
  },
  "500": {
    code: "500",
    title: "Đã có lỗi xảy ra",
    description: "Hệ thống gặp sự cố ngoài dự kiến. Vui lòng thử lại sau ít phút.",
    Background: ServerErrorBackground,
    action: "retry",
  },
  maintenance: {
    code: "",
    title: "Hệ thống đang bảo trì",
    description: "Chúng tôi đang nâng cấp hệ thống để phục vụ bạn tốt hơn. Vui lòng quay lại sau.",
    Background: MaintenanceBackground,
    action: "home",
  },
  "access-denied": {
    code: "403",
    title: "Không có quyền truy cập",
    description: "Tài khoản của bạn không có quyền xem nội dung này.",
    Background: WarningBackground,
    action: "home",
  },
  "session-expired": {
    code: "",
    title: "Phiên đăng nhập đã hết hạn",
    description: "Vì lý do bảo mật, vui lòng đăng nhập lại để tiếp tục.",
    Background: WarningBackground,
    action: "login",
  },
};

export function ErrorStatusPage({ type, onHome, onLogin }: { type: ErrorType; onHome: () => void; onLogin: () => void }) {
  const { code, title, description, Background, action } = CONTENT[type];
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="size-[36rem]">
          <Background />
        </div>
      </div>
      <div className="vdg-in relative flex flex-col items-center gap-3 text-center">
        {!code && (
          <span className="flex size-14 items-center justify-center rounded-full bg-[var(--vdg-color-warning)]/10 text-[var(--vdg-color-warning)]">
            <ShieldAlert className="size-7" />
          </span>
        )}
        {code && (
          <span className="text-6xl font-bold text-[var(--vdg-color-text-secondary)]" style={{ fontFamily: "var(--vdg-font-heading)" }}>
            {code}
          </span>
        )}
        <h1 className="text-xl font-bold" style={{ fontFamily: "var(--vdg-font-heading)" }}>
          {title}
        </h1>
        <p className="max-w-[36ch] text-sm text-[var(--vdg-color-text-secondary)]">{description}</p>
        <div className="mt-3 flex gap-2.5">
          {action === "retry" && (
            <Button variant="primary" onClick={() => window.location.reload()} data-icon="inline-start">
              <RefreshCcw className="size-4" /> Thử lại
            </Button>
          )}
          {action === "login" && (
            <Button variant="primary" onClick={onLogin} data-icon="inline-start">
              <LogIn className="size-4" /> Đăng nhập lại
            </Button>
          )}
          <Button variant="secondary" onClick={onHome} data-icon="inline-start">
            <Home className="size-4" /> Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
