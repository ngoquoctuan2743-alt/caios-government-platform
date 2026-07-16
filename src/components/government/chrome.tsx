"use client"

import type { ReactNode } from "react"

import { GovernmentHeader } from "@/components/government/header"
import { GovernmentFooter } from "@/components/government/footer"
import { AIAssistantPanel } from "@/components/government/ai-assistant-panel"
import { useGovernment } from "@/components/government/providers"

/** Header + content + Footer + floating AI assistant — the chrome shared by every logged-in-section and Landing page. Must render inside <GovernmentProviders>. */
export function GovernmentChrome({ children }: { children: ReactNode }) {
  const { aiOpen, setAiOpen } = useGovernment()

  return (
    <>
      <GovernmentHeader unreadCount={2} />
      {children}
      <GovernmentFooter />
      <AIAssistantPanel open={aiOpen} onOpenChange={setAiOpen} />
    </>
  )
}
