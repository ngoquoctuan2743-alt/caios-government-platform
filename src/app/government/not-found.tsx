import Link from "next/link"

import { Button } from "@/components/ui/button"
import { NotFoundBackground } from "@/components/government/assets/backgrounds"
import { GOV_ROUTES } from "@/components/government/routes"

/** Next.js's own not-found convention, scoped to the /government/** segment — triggered for real by any unmatched path under it, not a manually-linked demo page. */
export default function GovernmentNotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="size-[36rem]">
          <NotFoundBackground />
        </div>
      </div>
      <div className="relative flex flex-col items-center gap-3 text-center">
        <span className="font-heading text-6xl font-bold text-muted-foreground">404</span>
        <h1 className="font-heading text-xl font-bold">Không tìm thấy trang</h1>
        <p className="max-w-[36ch] text-sm text-muted-foreground">Đường dẫn bạn truy cập không tồn tại hoặc đã được di chuyển.</p>
        <div className="mt-3 flex gap-2.5">
          <Button variant="secondary" nativeButton={false} render={<Link href={GOV_ROUTES.home} />}>
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  )
}
