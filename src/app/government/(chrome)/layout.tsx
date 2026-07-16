import type { ReactNode } from "react"

import { GovernmentChrome } from "@/components/government/chrome"

export default function ChromeLayout({ children }: { children: ReactNode }) {
  return <GovernmentChrome>{children}</GovernmentChrome>
}
