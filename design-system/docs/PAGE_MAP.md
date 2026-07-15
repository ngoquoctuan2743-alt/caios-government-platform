# Page Map

Every screen in the clickable prototype, its file, and its sections. The `Screen` union type (`pages/prototype/navigation.ts`) is the authoritative list — this doc mirrors it.

| Screen ID | File | Sections |
|---|---|---|
| `landing` | `LandingPage.tsx` | Government Hero (with search), Smart Search, Popular Services (6 cards), Statistics (4 stats), News (3 cards), AI Assistant teaser, National Data Platform strip, Footer |
| `auth` | `AuthPage.tsx` | Split layout: brand panel (background + illustration + tagline) / form panel with **Mật khẩu** (password) and **Định danh điện tử** (Digital Identity / QR) tabs, "Quên mật khẩu?" link |
| `mfa` | `MfaPage.tsx` | 6-digit OTP input, resend-countdown affordance |
| `forgot-password` | `ForgotPasswordPage.tsx` | Email input → "sent" confirmation state |
| `citizen-dashboard` | `CitizenDashboardPage.tsx` | Personal Overview (4 stat cards), active-case Timeline, Applications table (clickable rows → Case Detail), Notifications, Quick Actions |
| `business-dashboard` | `BusinessDashboardPage.tsx` | Enterprise Summary (4 stat cards), Licenses, Tax obligations table, Documents list, Reports (bar chart) |
| `officer-dashboard` | `OfficerDashboardPage.tsx` | Pending Cases (4 stat cards), Approval Queue table (clickable rows → Case Detail, per-row SLA bar), SLA compliance gauge, Weekly productivity chart |
| `case-detail` | `CaseDetailPage.tsx` | Timeline, Approval Flow (Approve / Request Info / Reject actions + note field), Documents checklist, Activity Log, AI Summary (accordion: procedure/eligibility/citation), Contact Citizen |

Every screen shares:
- `Header` (all screens except `auth`/`mfa`/`forgot-password`, which are full-bleed standalone)
- `AIAssistantPanel` (all screens except `auth`/`mfa`/`forgot-password`)
- `Sidebar` (the three dashboard screens only, `items` list differs per portal)

## Reference view (not part of the demo narrative)

A second top-level mode, `"Xem Design System"` (toggled top-right, independent of the `Screen` state), shows the raw design-system reference: Color/Typography/Token/Component/Background/Pattern/Icon/Illustration sections. This is the Phase 1/2 deliverable view — useful for auditing the system in isolation, not part of the Government Platform demo narrative itself. See `DEMO_CHECKLIST.md` for which mode to present.
