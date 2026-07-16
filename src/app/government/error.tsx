"use client"

import Link from "next/link"
import { RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ServerErrorBackground } from "@/components/government/assets/backgrounds"
import { GOV_ROUTES } from "@/components/government/routes"

/** Next.js's own error boundary convention, scoped to the /government/** segment. */
export default function GovernmentError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="size-[36rem]">
          <ServerErrorBackground />
        </div>
      </div>
      <div className="relative flex flex-col items-center gap-3 text-center">
        <span className="font-heading text-6xl font-bold text-muted-foreground">500</span>
        <h1 className="font-heading text-xl font-bold">Đã có lỗi xảy ra</h1>
        <p className="max-w-[36ch] text-sm text-muted-foreground">Hệ thống gặp sự cố ngoài dự kiến. Vui lòng thử lại sau ít phút.</p>
        <div className="mt-3 flex gap-2.5">
          <Button variant="default" onClick={() => reset()}>
            <RefreshCcw className="size-4" /> Thử lại
          </Button>
          <Button variant="secondary" nativeButton={false} render={<Link href={GOV_ROUTES.home} />}>
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  )
}
