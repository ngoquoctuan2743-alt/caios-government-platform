# Demo Checklist

## Before you present

1. `npm run build -w design-system` — confirm it finishes clean (no errors). This is the same command CI/a reviewer would run.
2. `npm run typecheck -w design-system && npm run lint -w design-system` — both should print nothing but the command header (0 errors, 0 warnings).
3. `npm run dev -w design-system` — opens on `http://localhost:4300`. **It boots directly into the prototype** (Landing page) — no extra click needed.
4. Pick your window size *before* you start clicking: 1280px+ width shows every layout as designed; resize live during the demo only if you're specifically showing off responsive behavior (see step 9).
5. Decide light or dark mode ahead of time (top-right moon/sun toggle) — both are fully polished, pick whichever suits the room.

## Suggested walkthrough (≈4–5 minutes)

1. **Land on the Landing Page.** Point out: the gradient headline, the AI badge, the search bar (click into it to show the focus glow), the stats row, Popular Services, News, and the floating AI Assistant button (note the pulsing ring — it's alive, not static).
2. **Open the AI Assistant** (bottom-right sparkle button). Show the chat bubbles, the "Trực tuyến" status, close it.
3. **Click "Đăng nhập."** On the Auth screen, show both tabs — **Mật khẩu** (password) and **Định danh điện tử** (the QR-code Digital Identity flow) — this is the two-method login the brief asked for.
4. **Submit login → MFA screen.** Point out the 6-digit OTP boxes auto-advance as you type. Click "Xác nhận."
5. **You're now on the Citizen Dashboard**, logged in. Point out the Header's Portal switcher (Công dân / Doanh nghiệp / Cán bộ) — this is the fastest way to show breadth.
6. **Click a case row** in "Hồ sơ của tôi" → Case Detail opens. Walk through Timeline, Approval Flow actions, Documents, Activity Log, and the AI Summary accordion on the right. Click "Quay lại" — note it returns to the Citizen Dashboard specifically.
7. **Switch portal to Doanh nghiệp** (Business Dashboard) — Enterprise Summary, Licenses, Tax table, Reports chart.
8. **Switch portal to Cán bộ** (Officer Dashboard) — Pending Cases, the SLA gauge, weekly productivity chart. Click a queue row → same Case Detail screen, click "Quay lại" → note it returns to the *Officer* Dashboard this time, not Citizen.
9. **(Optional) Resize to a phone width** on the Citizen or Officer Dashboard to show the Sidebar collapsing into a horizontal scrollable pill bar instead of disappearing.
10. **Click "Đăng xuất"** to return to Landing, closing the loop.

## If someone asks to see the raw design system

Click **"Xem Design System"** (top-right, always visible) — this swaps to the token/component/pattern/background/icon/illustration reference view (Phase 1/2 deliverable). Click "Xem Prototype" to return to the flow above.

## Known rough edges to pre-empt, not hide

If asked directly, these are honestly documented (not discovered live and improvised):
- The 🇻🇳/🇺🇸 language toggle in the Header changes its own label but does not yet translate page content — Vietnamese-only content today (`DEMO_REPORT.md`).
- Table rows (case lists) open on click but aren't yet independently keyboard/Enter-reachable (`ACCESSIBILITY_REPORT.md`).
- Business Dashboard rows don't drill into a detail screen — only Citizen/Officer → Case Detail was in scope.
- This is a demo dataset — every number/name is hardcoded, nothing is wired to a backend (this is a design-system prototype, not the CAIOS application).
