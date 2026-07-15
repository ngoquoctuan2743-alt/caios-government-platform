# ENGINEERING_SPRINT_01_SPECIFICATION.md
### Engineering Sprint 01 Specification — Conversation Experience — Volume 40
**Version:** 1.0
**Status:** Approved
**Class:** Specification (implementation-ready, technology-independent). Bridges `EPIC_A_AI_CORE_ARCHITECTURE.md` (Vol. 38) and `EPIC_A_EXECUTION_PLAN.md` (Vol. 39) to actual source code. This is the authoritative specification for Sprint 01 — no implementation may diverge from it without a revision.
**Companion documents:** `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SYSTEM_ARCHITECTURE_SPECIFICATION.md` (Vol. 37), `EPIC_A_AI_CORE_ARCHITECTURE.md` (Vol. 38), `EPIC_A_EXECUTION_PLAN.md` (Vol. 39), `DEMO_DIRECTOR_BOOK.md`, `MVD_IMPLEMENTATION_PLAN.md`, `IMPLEMENTATION_ALIGNMENT_REVIEW.md`.

---

## 1. Sprint Objective

Enable a citizen to send one plain-language message describing their need and receive a single, complete, correctly-grounded first response: the matched procedure, an eligibility confirmation, at least one cited legal basis, and a generated checklist. This is **turn one only** — no follow-up conversation, no missing-document detection, no officer interaction. Those are later sprints (§20).

## 2. Business Value

This is the first point in the entire project where a citizen experiences an actual AI capability rather than a static form — it is the foundation the Demo Director Book's centerpiece beat (the legal citation reveal, 1:10–1:40) depends on, and the first concrete step toward the North Star Metric (`PRODUCT_CONSTITUTION.md` §10): a case cannot reach First-Submission Success if it was never correctly understood and grounded in the first place.

## 3. User Story

*As a citizen, I want to describe my need in my own words and immediately receive an accurate, cited explanation of what applies to me, so that I don't have to know bureaucratic terminology or guess whether I qualify.*

## 4. Acceptance Criteria

- A citizen with no open case can type a message describing an ID Card Renewal need and receive a response within this sprint's performance target (§16).
- The response states, in plain language: the matched procedure, an eligibility confirmation (or a clear statement of what's still unknown), at least one legal citation (law name, article, effective/verified date), and a checklist of the required documents.
- A `Case` record is created on the first message if none already exists for that citizen and procedure; an existing open case is reused, never duplicated (§7).
- Every legal claim in the response traces to an entry in the verified legal dataset (`MVD_IMPLEMENTATION_PLAN.md` §7) — no claim is generated without one.
- The conversation turn is fully audited (§14) before the response is considered complete.
- If no citation can be found for a claim the citizen's question requires, the system discloses this rather than answering without one (§9).

## 5. Conversation Flow

```
Citizen message
     │
     ▼
Procedure Match  ──(no match / ambiguous)──► Clarify (§7)
     │
     ▼
Eligibility Check ──(missing fact)──► Ask for the specific fact (§7)
     │
     ▼
Legal Citation Lookup ──(no citation found)──► Disclose uncertainty, do not proceed to claim (§9)
     │
     ▼
Checklist Generation
     │
     ▼
Response Composition (single LLM call, grounded in the above)
     │
     ▼
Persist (Case + ChecklistItems) + Audit Event
     │
     ▼
Render to citizen
```

Every step above is deterministic except Response Composition, which only phrases what the deterministic steps already established — consistent with `EPIC_A_AI_CORE_ARCHITECTURE.md` Chapter 7's three-outcome Decision Model.

## 6. Conversation States

Turn-level states, distinct from `Case.workflowState` (already implemented, Milestone M1):

- **Idle** — no message sent yet; input is focused and ready.
- **Awaiting Response** — message sent, backend processing; typing indicator shown (`DEMO_DIRECTOR_BOOK.md` §4/§7 timing).
- **Response Rendered** — the complete first-turn response is on screen.
- **Errored** — see Failure States (§8); input remains available to retry.

On a successful first turn, the underlying `Case.workflowState` transitions `DRAFT → PREPARING` via the existing `transitionCase()` function (`src/lib/orchestration/workflow-state-machine.ts`) — Sprint 01 reuses this, it does not modify it.

## 7. Edge Cases

- **Ambiguous message** (doesn't clearly describe a recognizable need) — the system asks one plain, non-technical clarifying question rather than guessing a procedure.
- **Citizen already has an open case for this procedure** — the existing case is resumed, per `WORKFLOW_CONSTITUTION.md` Chapter 5's duplicate-case handling; a second case is never silently created.
- **Out-of-scope message** (unrelated to any government procedure, or a request for legal advice) — refused per `PRODUCT_CONSTITUTION.md` Chapter 7's Non-Goals, with a redirect to what the system can actually help with.
- **Non-English input** — explicitly out of scope for Sprint 01 (English-only, per `MVD_IMPLEMENTATION_PLAN.md`'s disclosed demo scope); the system must not crash, but a degraded or clarifying response is acceptable and expected.
- **Empty or whitespace-only message** — rejected client-side before any backend call is made.

## 8. Failure States

- **LLM call fails or times out** — the citizen sees an honest, specific error ("something went wrong, please try again") — never a fabricated or partial response presented as complete.
- **Legal citation lookup returns nothing for a claim the response would otherwise need** — the response does not proceed to state that claim; it discloses the gap instead, per `LEGAL_INTELLIGENCE_CONSTITUTION.md`'s retrieval-or-refuse principle. This is a hard rule, not a fallback to be relaxed for demo smoothness.
- **Persistence failure** (Case or ChecklistItem write fails) — the citizen is told the message wasn't saved and is invited to retry; a response is never shown as if it were saved when it wasn't.
- **Session expiry mid-conversation** — redirected to login; an unsent draft may be lost, but no already-rendered or already-saved turn is ever lost or altered.

## 9. AI Decision Points

Mapped to `EPIC_A_AI_CORE_ARCHITECTURE.md` Chapter 7's three permitted outcomes:

| Decision Point | Verified Fact | Recommendation | Escalation |
|---|---|---|---|
| Eligibility Check | Fact confirmed against known citizen data | — (deterministic, no recommendation state at this step) | A required fact is unknown → ask, not escalate at this sprint's scope |
| Legal Citation Lookup | Citation found and current | — | No citation found → disclose uncertainty (Sprint 01 has no human escalation queue integration yet; disclosure to the citizen is the Sprint 01 substitute, with true escalation arriving in a later sprint) |
| Checklist Generation | Deterministic list from procedure + eligibility | — | — |
| Response Composition | N/A — phrasing only, no new claims | The overall response is framed as informative guidance, not a final determination | — |

No decision point in this sprint produces a fourth kind of output — an unsupported, confident-sounding claim is explicitly disallowed by Failure States (§8) and Acceptance Criteria (§4).

## 10. Officer Interaction

**None in this sprint.** Officers see no new UI. The only visible change from an officer's perspective is that a `Case` created through this conversation flow contains real, citizen-authored content instead of only seed data. Officer-facing actions (approve/reject) are Sprint 03 scope (§20).

## 11. UI Components

Per `MVD_IMPLEMENTATION_PLAN.md` §6, scoped to exactly what a single turn requires:

- `ChatThread` / `ChatMessage` — message list, citizen and AI turns visually distinct.
- `ChatInput` — text entry with a send action; disabled while Awaiting Response.
- Typing indicator — per `DEMO_DIRECTOR_BOOK.md` §4 timing (2.5–3.0s before the response begins rendering).
- `CitationBadge` — renders each legal citation distinctly from surrounding prose, per `DEMO_DIRECTOR_BOOK.md` §12's staging requirement that it read as a deliberate, checkable claim.
- A minimal checklist preview (full interactive checklist confirmation is Sprint 02 scope).

## 12. Backend Responsibilities

- Procedure Match — for this sprint, a single-procedure recognition check (ID Card Renewal only); anything else routes to the ambiguous-message path (§7).
- Eligibility Check — deterministic evaluation against known citizen facts.
- Legal Citation Lookup — reads only from the verified dataset (`MVD_IMPLEMENTATION_PLAN.md` §7); never falls back to generating a citation.
- Checklist Generator — deterministic, derived from the procedure's requirement set and the eligibility result.
- Response Composer — the single LLM call, grounded exclusively in the outputs above; the LLM is never the source of a legal or eligibility claim, only of its phrasing.
- Persistence — creates or resumes the `Case`, creates `ChecklistItem` rows, writes the audit event (§14) — all through the existing Prisma schema and Memory Subsystem mediator (no new data-access pattern introduced).

## 13. Logging Requirements

- Every turn is logged with a correlation identifier linking the citizen message, the procedure match result, the citation(s) used, and the LLM call's latency.
- Citation lookup hit/miss is logged distinctly — this is the raw signal `SUCCESS_METRICS_CONSTITUTION.md` Chapter 4's Citation Accuracy metric will eventually be computed from.
- No log entry ever contains a raw national identifier or full message content alongside any identifier that isn't already hashed — consistent with existing practice (`AI_OPERATING_SYSTEM.md` Chapter 4).

## 14. Audit Requirements

Every conversation turn writes exactly one `AuditEvent` (reusing `writeAuditEvent`, `src/lib/audit/log.ts`) with: `actorType: AI_AGENT`, the case id, an action of `"conversation.turn"`, and a payload containing the matched procedure, the citation reference(s) used, and the checklist generated — sufficient to fully reconstruct why the AI said what it said, per `TRUST_CONSTITUTION.md` Chapter 4's Auditability and Traceability mechanisms. The append-only guarantee already enforced at the schema level is unchanged by this sprint.

## 15. Security Requirements

- A citizen may only start or continue a conversation attached to their own case — enforced through the existing session/RBAC layer and the Memory Subsystem mediator pattern (`src/lib/memory/case-memory.ts`), not through a new, independent check.
- The citizen's message is treated as data to be reasoned over, never as an instruction to the underlying model — per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 8, the system's grounding rules (procedure scope, citation-or-disclose) are not something the message content can override, regardless of phrasing.
- The LLM provider credential is never exposed to the client; all model calls originate server-side.
- Rate limiting is **not** implemented in this sprint — flagged explicitly as an accepted, disclosed gap (§20), not an oversight.

## 16. Performance Requirements

- Target end-to-end turn latency: **under 6 seconds**, including the LLM call — a deliberate relaxation of `TECHNICAL_PRD`'s general 3-second checklist-generation target, justified by the typing-indicator UX (`DEMO_DIRECTOR_BOOK.md` §7) that makes this pacing read as reasoning rather than lag.
- Checklist and citation lookup themselves (the deterministic steps) must complete in well under 1 second combined — only the LLM call is expected to consume the bulk of the latency budget.

## 17. Accessibility Requirements

- The message list uses an ARIA live region so a new AI response is announced to screen readers without requiring the user to navigate to it manually.
- The chat input and send action are fully operable by keyboard alone.
- The citation badge and any status indicator communicate their meaning through text, not color alone.
- This sprint must not regress the accessibility floor `CITIZEN_CONSTITUTION.md` Chapters 4 and 7 already establish project-wide, even though the formal Accessibility Compliance Specification (Vol. 12) has not yet been written.

## 18. Definition of Done

- [ ] All Acceptance Criteria (§4) pass on a live run against the seeded pilot procedure.
- [ ] Every Failure State (§8) has been manually triggered at least once and behaves as specified — especially the no-citation-found path, which must never be allowed to silently fall through to a fabricated claim.
- [ ] The full turn is captured in the audit log (§14) and independently reviewable.
- [ ] Performance target (§16) met on a typical run.
- [ ] Accessibility requirements (§17) manually verified with keyboard-only navigation and a screen reader.
- [ ] The exact Demo Director Book beat this sprint underpins (0:40–1:40) has been rehearsed against the real, implemented flow — not a mock.

## 19. Traceability Matrix

| Sprint Element | Traces To |
|---|---|
| Citation-or-disclose rule (§8, §9) | `LEGAL_INTELLIGENCE_CONSTITUTION.md` |
| Three-outcome Decision Model (§9) | `EPIC_A_AI_CORE_ARCHITECTURE.md` Ch. 7 |
| Human-authority framing (response is guidance, not a determination) | `GOVERNMENT_CONSTITUTION.md` Ch. 3; `PRODUCT_CONSTITUTION.md` Ch. 12 |
| Duplicate-case handling (§7) | `WORKFLOW_CONSTITUTION.md` Ch. 5 |
| Auditability (§14) | `TRUST_CONSTITUTION.md` Ch. 4 |
| Accessibility floor (§17) | `CITIZEN_CONSTITUTION.md` Ch. 4, 7 |
| North Star alignment (§2) | `PRODUCT_CONSTITUTION.md` Ch. 10 |
| Demo beat this sprint enables | `DEMO_DIRECTOR_BOOK.md` §3, 0:40–1:40 |
| MVD scope boundary | `MVD_IMPLEMENTATION_PLAN.md` §4, §5 |
| Known gaps this sprint accepts | `IMPLEMENTATION_ALIGNMENT_REVIEW.md` §6, §7 |

## 20. Future Sprint Dependencies

- **Sprint 02 (Checklist Confirmation & Missing Document Detection)** depends on this sprint's Checklist Generator and persisted `ChecklistItem` rows; implements the citizen-facing confirmation control and the instantaneous gap detection specified in `DEMO_DIRECTOR_BOOK.md` §3 (2:05–2:35).
- **Sprint 03 (Officer Review & Case Completion)** depends on this sprint's `Case` creation and audit trail; implements the officer approve/request-info actions and the completion banner (`DEMO_DIRECTOR_BOOK.md` §13–14).
- **Rate limiting and abuse protection** (accepted gap, §15) should be addressed before any environment beyond a controlled demo.
- **Multi-procedure Procedure Match** (this sprint is single-procedure only) is deferred to whichever future sprint first onboards a second procedure, consistent with `WORKFLOW_CONSTITUTION.md`'s configuration-over-reinvention principle.

---

## Closing Note

This is the first Specification written specifically to be coded against, not merely governed by. Every section above exists so an engineer can build Sprint 01 without needing to re-derive a single constitutional principle from first conversation — and so that when it's done, it is checkable against this document line by line, not against anyone's memory of what was intended.
