# MVD_IMPLEMENTATION_PLAN.md
### Minimum Viable Demonstration — Implementation Plan
**Scope:** A single procedure (CCCD / Citizen ID Renewal), a single 3–5 minute demo flow, built to win the Vietnam AI Innovation Challenge — not to expand the platform. Deliberately lightweight document: this is a delivery plan, not a Constitution, Epic, or Specification, and carries no governance ceremony beyond what's needed to actually ship the demo.
**Governing constraint:** nothing here may violate the Constitutional Core, but nothing here expands it either. Where the full architecture (Epic A, Vol. 37) describes a general capability, this plan implements the narrowest slice of it that makes the demo real rather than simulated.

---

## 1. Demo Story

Mai, a citizen, needs to renew her Citizen ID (CCCD) before it expires next month. She opens the CAIOS citizen portal and types, in her own words, that her ID is expiring soon. The AI recognizes what she needs, confirms she's eligible, and tells her — with the actual legal basis cited — exactly what she needs to bring. It generates her personal checklist on the spot. She confirms she has two of the three items but is missing a recent photo; the AI catches this immediately and tells her clearly, before she wastes a trip. She uploads what she has. The case moves to an officer's queue. The officer opens it, sees a complete, well-prepared case with the citation and checklist already verified, and approves it in seconds. Mai sees her case marked complete, with a clear next step.

**Why this wins:** it is not a chatbot demo. It is a citizen never having to guess, a legal claim that is actually true and checkable, a wasted trip prevented in real time, and a human officer making the real decision quickly because the AI did the preparation — the exact story `PRODUCT_CONSTITUTION.md` and `TRUST_CONSTITUTION.md` already commit to, made visible in under five minutes.

## 2. User Journey

| Step | What Happens | Screen |
|---|---|---|
| Citizen | Mai logs in, sees her (empty) dashboard | Citizen Dashboard *(exists)* |
| Conversation | Mai types her need in plain language | **Conversation screen (new)** |
| AI reasoning | System matches her need to CCCD Renewal, confirms basic eligibility (age, prior ID on file) | Conversation screen (AI response) |
| Legal citation | AI states the specific legal basis for the renewal requirement | Conversation screen (cited response) |
| Checklist generation | AI presents the personalized, complete checklist | Conversation screen → Case page |
| Missing document detection | Mai confirms what she has; AI flags the missing photo immediately | Case page (checklist view) |
| Officer review | Officer opens the case, sees citation + checklist status, approves | Officer Case Review screen (enhanced) |
| Case completion | Mai sees a clear completion confirmation | Citizen Case page (completion banner) |

## 3. Required Screens

- **Citizen Conversation screen (new)** — a chat interface at `/citizen/cases/new` (or an entry point from the dashboard): message list, input box, and a "start my case" trigger that creates the Case record on the first meaningful message.
- **Citizen Case page (enhance existing)** — `src/app/citizen/cases/[id]/page.tsx` already renders the timeline and checklist; add citation display per checklist item and a completion banner state.
- **Officer Case Review screen (enhance existing)** — `src/app/officer/escalations/[id]/page.tsx` currently read-only; add Approve / Request More Information actions.
- **Officer Queue (existing, unchanged)** — already lists open cases; no changes needed for the demo.

No new screens beyond the Conversation screen — everything else is an enhancement of what Phase 0 already built.

## 4. Required AI Components (minimum viable, not the full Epic A architecture)

- **Procedure Match** — for the demo, only one procedure exists, so this is a lightweight intent check ("does this message describe an ID renewal need?") rather than a general classifier. Real enough to demonstrate understanding plain language, narrow enough to build in a day.
- **Eligibility Check** — a small, deterministic check (age over 14, prior ID on file) against the citizen's known facts — not a full Rule Engine, just enough real logic that eligibility isn't hard-coded to always pass.
- **Legal Citation Lookup** — a lookup against the small curated dataset in §7, matched by keyword/topic (photo requirement, renewal cycle, required documents) — not RAG, not a vector database. This is a deliberate, disclosed simplification (see Definition of Done, §10).
- **Checklist Generator** — deterministic: given the eligibility result and the procedure's requirement set, produce the personalized checklist. Reuses the existing `ChecklistItem` model.
- **Missing Document Detector** — compares citizen-confirmed/uploaded items against the required checklist and flags any gap immediately, in the same turn — this is the single most important moment in the demo and must never be delayed to a later screen.
- **Conversational Response Composer** — the one real LLM call in the demo: takes the structured outputs above (procedure match, eligibility, citation, checklist, gap) and phrases them in plain, warm language. This is what makes the demo an actual AI system rather than a scripted form wizard — everything upstream of this call is deterministic and grounded; only the phrasing is generated.

## 5. Required Backend Components

- `src/lib/ai/conversation.ts` (new) — orchestrates one request/response turn: run Eligibility Check → Legal Citation Lookup → Checklist Generator → Missing Document Detector → call the LLM once with all of the above as grounded context → return the composed response. This is a minimal, single-procedure stand-in for the full Orchestration Subsystem (Vol. 38) — not a redesign of it.
- `src/lib/legal/cccd-citations.ts` (new) — the static legal dataset from §7, typed and exported; the Legal Citation Lookup reads only from this file.
- `src/app/citizen/cases/new/actions.ts` (new) — server action handling an incoming citizen message, creating the `Case` on first turn, calling the conversation orchestrator, persisting the AI's structured outputs (checklist items, citation reference) and writing an audit event per turn.
- Officer approve/reject actions (new) — small server actions in `src/app/officer/escalations/[id]/actions.ts`, calling the existing `transitionCase()` (`src/lib/orchestration/workflow-state-machine.ts`) to move the case from `UNDER_REVIEW` to `APPROVED`, then a second call to `COMPLETED`.
- **Nothing else changes.** RBAC, audit log, Prisma schema, and the workflow state machine already built in Phase 0 / Milestone M1 are reused exactly as they are.

## 6. Required Frontend Components

- `ChatThread` / `ChatMessage` components — simple message list, no streaming required for the demo (a short deliberate "thinking" delay is acceptable and can even help the demo read as genuine reasoning rather than instant lookup).
- `ChatInput` — text box + send button.
- `CitationBadge` — small inline component showing "According to [Law], Article [N]" next to a checklist item or AI statement, reusing the `Badge` component already in `src/components/ui/`.
- `MissingDocumentAlert` — a visually distinct callout (not just another badge) for the one moment the demo depends on landing clearly.
- `CaseCompletionBanner` — a clear, celebratory-but-honest confirmation state for the citizen case page.
- Officer `ApproveButton` / `RequestInfoButton` — simple form-action buttons on the existing escalation/case review screen.

## 7. Required Legal Dataset

A small, curated, **explicitly reviewed-before-use** dataset — not an ingestion pipeline. Structure:

| Field | Example |
|---|---|
| `topic` | `"renewal_cycle"`, `"required_documents"`, `"photo_requirement"` |
| `lawName` | e.g. "Law on Identification 26/2023/QH15" |
| `article` | e.g. "Article 21" |
| `summary` | plain-language statement of what it requires |
| `effectiveDate` / `lastVerified` | dates, shown in the citation exactly as `LEGAL_INTELLIGENCE_CONSTITUTION.md`'s citation standard requires |

**3–4 entries only**, covering exactly what the demo's checklist and citations need: (1) the renewal age/cycle rule, (2) the required-documents list, (3) the current photo specification. **These must be verified against the actual current text of Vietnamese law by a qualified reviewer before the demo** — this plan specifies the dataset's shape and role, not its legal content, consistent with this project's own standing rule that legal claims are never fabricated or assumed correct without verification.

## 8. Implementation Order

1. Legal dataset (§7) — verified content, since everything downstream depends on it being real.
2. Backend: Eligibility Check + Checklist Generator + Missing Document Detector (deterministic, testable without any LLM call).
3. Backend: Legal Citation Lookup wired to the dataset.
4. Backend: Conversation orchestrator wiring the above together, LLM call added last.
5. Frontend: Conversation screen, wired to the orchestrator.
6. Frontend: Citation badges + missing-document alert on the case page.
7. Backend + Frontend: Officer approve/request-info actions.
8. Full run-through, timing the 3–5 minute flow end to end; trim dialogue and pacing.

## 9. Daily Milestones

*(A five-day sprint; compress or extend to the actual competition timeline available.)*

- **Day 1:** Legal dataset drafted and verified; Eligibility Check and Checklist Generator implemented and manually tested against the seeded pilot case.
- **Day 2:** Missing Document Detector implemented; Legal Citation Lookup wired; all four deterministic components verified together with no LLM involved yet.
- **Day 3:** Conversation orchestrator built, LLM call integrated and grounded; first real end-to-end AI response produced from a typed citizen message.
- **Day 4:** Conversation screen, citation badges, missing-document alert, and case-completion banner built on the frontend; connected to the Day 3 backend.
- **Day 5:** Officer approve/request-info actions built; full 3–5 minute run-through rehearsed at least three times; script and pacing finalized; Definition of Done (§10) checked line by line.

## 10. Definition of Done

- [ ] The full journey in §2 runs live, end to end, without manual data manipulation between steps, in 3–5 minutes.
- [ ] At least one real LLM call occurs during the demo, grounded in the deterministic outputs upstream of it — not a canned response.
- [ ] The legal citation shown on screen is real, verified, and correctly attributed (per §7) — not a placeholder.
- [ ] The Missing Document Detector visibly catches the gap in the same turn the citizen confirms their documents — this moment is rehearsed and never rushed.
- [ ] The officer can actually approve the case (a real state transition through `transitionCase()`), not a static screen.
- [ ] The citizen sees a real completion confirmation after the officer's action, closing the loop live.
- [ ] Presenters can state, honestly and specifically, what is deliberately out of scope for this demo (RAG/vector search, multi-procedure support, OCR, multi-language) — per this project's own Competition Readiness principle of disclosing gaps rather than hiding them.
- [ ] The demo has been rehearsed at least three times end-to-end with no crashes, no stalled loading state, and no visible placeholder text.
