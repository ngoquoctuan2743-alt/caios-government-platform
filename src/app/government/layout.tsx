import type { ReactNode } from "react"

import { GovernmentProviders } from "@/components/government/providers"

export default function GovernmentLayout({ children }: { children: ReactNode }) {
  return <GovernmentProviders>{children}</GovernmentProviders>
}
