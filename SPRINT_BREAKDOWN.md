# SPRINT_BREAKDOWN.md
### Sprint 01 Refactor — One Capability Per Sprint
**Status:** Approved
**Supersedes:** `ENGINEERING_SPRINT_01_SPECIFICATION.md` (Volume 40) as the *execution* plan for Sprint 01 — Volume 40 remains the authoritative requirements document (acceptance criteria, edge cases, security/performance/accessibility requirements, traceability); this document only breaks its delivery into smaller, independently demonstrable units. No requirement from Volume 40 is changed, removed, or duplicated here.
**Architecture Decision governing this refactor:** one sprint produces one demonstrable capability, never one workflow. Each of the five sub-sprints below must independently pass **Build → Run → Demo → Review → Merge** before the next one begins.

---

## Why Five Sub-Sprints, Not One

The original Sprint 01 conversation flow has five distinct moving parts (`ENGINEERING_SPRINT_01_SPECIFICATION.md` §5): a UI shell, procedure recognition, legal citation lookup, checklist generation, and response composition. Building all five together means nothing is demonstrable until all five work — the worst possible failure mode for a competition timeline, where partial progress needs to be visible and reviewable at every step, not just at the end.

Splitting them means four of the five (01A–01D) can be built, demoed, and merged **independently and even in parallel**, each proving exactly one capability on its own, with only the last (01E) requiring the others to already exist.

## Work Breakdown Structure

```
Sprint 01 (original, Volume 40)
   │
   ├── Sprint 01A — Conversation UI              (no dependencies)
   ├── Sprint 01B — Procedure Recognition          (no dependencies)
   ├── Sprint 01C — Legal Citation                 (no dependencies)
   ├── Sprint 01D — Checklist Generation            (depends on 01B)
   │
   └── Sprint 01E — Natural Language Response        (depends on 01A + 01B + 01C + 01D)
```

**Recommended build order:** 01A, 01B, and 01C in parallel first (zero cross-dependencies, each independently demoable) → 01D once 01B exists → 01E last, as the integration sprint that turns four independent capabilities into the one conversation experience `ENGINEERING_SPRINT_01_SPECIFICATION.md` originally specified.

---

## Sprint 01A — Conversation UI

- **Work Items:** `ChatThread`, `ChatMessage`, `ChatInput`, typing indicator (per `DEMO_DIRECTOR_BOOK.md` §4 timing), wired to a **stubbed** backend that returns one fixed, canned response after the expected delay.
- **Dependencies:** none — this can be built against a hardcoded response before any real logic exists.
- **Estimated Complexity:** S (small) — pure frontend, no new backend logic, reuses existing shadcn components.
- **Risk:** Low. The only real risk is timing/animation polish (§4–§7 of the Demo Director Book) not landing right — a rehearsal risk, not a technical one.
- **Definition of Done:** a citizen can type a message, see the typing indicator for the specified duration, and see a (stubbed) response render with correct styling; keyboard-only and screen-reader navigation both work (`ENGINEERING_SPRINT_01_SPECIFICATION.md` §17).
- **Expected Demo:** type a message, watch the full UI interaction play out convincingly — even though the response content is fixed, the *experience* is real and reviewable on its own.

## Sprint 01B — Procedure Recognition

- **Work Items:** the single-procedure recognition check (§12 of Volume 40) — given a citizen message, determine whether it describes an ID Card Renewal need, or route to the ambiguous-message path (§7 of Volume 40).
- **Dependencies:** none — pure logic, testable independent of any UI.
- **Estimated Complexity:** S–M. Small if implemented as a narrow, deterministic check scoped to one procedure (as specified); would be M only if scope creeps toward a general classifier, which is explicitly out of scope for this sprint.
- **Risk:** Medium — the main risk is under- or over-matching (treating too narrow or too broad a set of phrasings as a match), which directly affects how "smart" the demo feels in Sprint 01E.
- **Definition of Done:** a representative set of sample citizen messages (including at least one ambiguous and one out-of-scope example, per Volume 40 §7) all produce the correct match/no-match/ambiguous result.
- **Expected Demo:** a short, standalone walkthrough — a handful of sample messages fed in, correct recognition shown for each, independent of any chat UI.

## Sprint 01C — Legal Citation

- **Work Items:** the Legal Citation Lookup module, reading only from the verified dataset (`MVD_IMPLEMENTATION_PLAN.md` §7); the `CitationBadge` component's data contract (component itself may already exist from 01A as a static example — this sprint gives it real data).
- **Dependencies:** none — the dataset and lookup are independent of both the UI and procedure recognition.
- **Estimated Complexity:** S — the dataset is small (3–4 entries) and the lookup is a simple keyed match, not search or retrieval.
- **Risk:** Low technically; the real risk is **legal accuracy**, not engineering — the dataset must be verified by a qualified reviewer before this sprint is considered done, per Volume 40 §7 and `MVD_IMPLEMENTATION_PLAN.md` §7's explicit disclaimer. This is a content risk, not a code risk, and must not be waived to hit a deadline.
- **Definition of Done:** every topic the pilot procedure needs (renewal cycle, required documents, photo requirement) returns its correct, verified citation; a query with no matching entry correctly returns "not found" rather than a nearest-guess.
- **Expected Demo:** query the lookup directly (script or minimal harness) for each of the three known topics and show the correct citation returned, plus one deliberate miss showing the "not found" path.

## Sprint 01D — Checklist Generation

- **Work Items:** the deterministic Checklist Generator — given a procedure and an eligibility result, produce the required document list as `ChecklistItem` rows.
- **Dependencies:** **01B** — needs a procedure match result (or a stubbed one) to know which checklist to generate; does not need 01C or 01A.
- **Estimated Complexity:** S — reuses the existing `ChecklistItem` Prisma model and seed data shape already proven in Phase 0.
- **Risk:** Low. The only real risk is the same `CaseStage`/`WorkflowState` reconciliation gap already flagged in `IMPLEMENTATION_ALIGNMENT_REVIEW.md` §5 — this sprint should not attempt to resolve that gap, only avoid making it worse.
- **Definition of Done:** given the pilot procedure and a confirmed-eligible citizen, the correct three-item checklist is generated and persisted; given an ineligible or incomplete eligibility result, the generator does not silently produce a checklist it shouldn't.
- **Expected Demo:** show the checklist being generated and persisted for a test case, visible via the existing citizen case page's checklist card (already built in Phase 0) — no new UI needed for this sprint's own demo.

## Sprint 01E — Natural Language Response

- **Work Items:** the Response Composer — the single LLM call that takes 01B's match, 01C's citation, and 01D's checklist as grounded input and produces the final phrased response; wiring all of it into 01A's UI; the full audit event write (`ENGINEERING_SPRINT_01_SPECIFICATION.md` §14).
- **Dependencies:** **01A, 01B, 01C, 01D** — this is the integration sprint; it cannot start meaningfully before the other four exist, even in a rough form.
- **Estimated Complexity:** M — the individual pieces are already built; the complexity here is entirely in grounding the LLM call correctly (never letting it originate a claim, only phrase existing ones) and handling the failure states in Volume 40 §8, especially the no-citation-found disclosure path.
- **Risk:** **Highest of the five.** This is the sprint where a subtly wrong prompt could cause the LLM to "helpfully" embellish beyond what 01B/01C/01D actually established — the single most important thing to test adversarially before calling this sprint done.
- **Definition of Done:** every Acceptance Criterion in `ENGINEERING_SPRINT_01_SPECIFICATION.md` §4 passes end-to-end; every Failure State in §8 has been manually triggered, especially the no-citation path; the full Definition of Done checklist in Volume 40 §18 passes as a whole.
- **Expected Demo:** the complete first-turn conversation, live, matching `DEMO_DIRECTOR_BOOK.md`'s 0:40–1:40 beat exactly — this is the demo the entire original Sprint 01 was scoped around, now finally assembled from four already-proven parts instead of built as one untested whole.

---

## Build → Run → Demo → Review → Merge — Applied to Every Sub-Sprint

No sub-sprint above advances to the next until it clears all five gates, in order:

1. **Build** — the work items for that sub-sprint exist and compile/typecheck cleanly.
2. **Run** — the capability executes correctly in a live environment, not just in isolation.
3. **Demo** — the "Expected Demo" for that sub-sprint is performed, live, exactly as described above — not described, not screenshotted, actually run.
4. **Review** — a second person (or a deliberate self-review against this document's Definition of Done) confirms the demo actually satisfied the sub-sprint's DoD.
5. **Merge** — only after Review passes; a sub-sprint's code is not merged on the promise that it will be fixed alongside the next one.

01D may not begin Build until 01B has cleared Merge. 01E may not begin Build until 01A, 01B, 01C, and 01D have all cleared Merge.

---

## Closing Note

This breakdown changes nothing about *what* Sprint 01 must deliver — `ENGINEERING_SPRINT_01_SPECIFICATION.md` remains the single source of truth for requirements. It changes only *how* that delivery is sequenced, so that a reviewer — or a judge, or a teammate joining midway — can see real, working progress after each of five short cycles instead of waiting for one long one to either fully succeed or fully fail.
