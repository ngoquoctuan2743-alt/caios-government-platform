import { GovernmentProviders } from "@/components/government/providers"
import { GovernmentChrome } from "@/components/government/chrome"
import { LandingPage } from "@/components/government/landing-page"

/**
 * Government Platform demo landing page — this subdomain is dedicated to
 * the demo, so this replaces what used to be a session-based redirect to
 * /login. The real CAIOS app (Prisma, auth, RBAC) is untouched and still
 * reachable directly at /login, /citizen/**, /officer/**, /admin -- this
 * page just no longer routes to it automatically.
 */
export default function Home() {
  return (
    <GovernmentProviders>
      <GovernmentChrome>
        <LandingPage />
      </GovernmentChrome>
    </GovernmentProviders>
  )
}
