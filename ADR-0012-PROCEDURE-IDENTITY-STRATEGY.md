# ADR-0012: Procedure Identity Strategy

**Status:** Accepted
**Class:** Architecture Decision Record — the first ADR extensive enough to warrant its own file rather than a single-paragraph row in `MASTER_INDEX.md` §10; that section is updated with a summary row pointing here.
**Numbering note:** Requested as "ADR-0010" — that number is already Accepted (Epics as a fifth document class, tied to Volume 38). Per the standing numbering discipline (ADR-0008/0009: sequential append, never renumber or reuse), this ADR is **ADR-0012**, the next actually-available sequential slot after ADR-0011.
**Follows only:** `PRODUCT_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SYSTEM_ARCHITECTURE_SPECIFICATION.md` (Vol. 37), `CASE_MANAGEMENT_SPECIFICATION.md` (Vol. 46), `MEMORY_AND_CONVERSATION_SPECIFICATION.md` (Vol. 45), `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41), `RULE_ENGINE_SPECIFICATION.md` (Vol. 14), `LEGAL_KNOWLEDGE_BASE_AND_RAG_INGESTION_SPECIFICATION.md` (Vol. 15), and the `knowledge/` Library itself.
**Scope:** Architecture decision only. No code, schema, Prisma model, UI, or API is changed by this ADR. Sprint 01F is not modified.

---

## 1. Problem Statement

CAIOS currently has **no single, authoritative identity for a procedure.** Instead, the same real-world administrative procedure is referred to by several independent, unlinked strings, and nothing in the architecture declares which one is canonical:

- **Knowledge IDs** — `knowledge/procedures/*.md`'s `procedureId` frontmatter field (e.g. `CCCD_RENEWAL`), authored by content writers, consumed natively by the Recognition Engine (Sprint 01B), Citation Resolver (Sprint 01C), and Checklist Generator (Sprint 01D).
- **Database IDs** — Prisma's `Procedure.code` (e.g. `ID_CARD_RENEWAL`) and `Procedure.id` (a generated cuid, the actual foreign-key target for `Case.procedureId`).
- **Display Names** — each procedure's authored `officialName` (formal Vietnamese) and `citizenFriendlyName` (bilingual, plain-language) — human-facing labels, not identifiers, but easily mistaken for one in prose.
- **Aliases** — each procedure's `aliases[]` list, a deliberately unbounded matching surface for Sprint 01B's recognizer — explicitly *not* an identity, but the closest thing to a queryable "name" in many code paths.
- **Future Government IDs** — an eventual official administrative-procedure code issued by a real government system, per `GOVERNMENT_CONSTITUTION.md`'s platform-integration goals. This does not exist yet, but nothing in the current architecture reserves a place for it.

This is dangerous for concrete, already-observable reasons, not merely hypothetical ones:

- **A single citizen turn already references two unlinked identities for what should be one procedure.** Sprint 01F's persistence layer stores `ProcedureResolution.procedureId`, `CitationResolution.procedureId`, and `ChecklistItem.procedureId` as the Knowledge ID (e.g. `"CCCD_RENEWAL"`) — plain strings, not foreign keys — while the very `Case` row those tables are attached to has its own `procedureId` foreign key permanently resolving to the Database ID `"ID_CARD_RENEWAL"` (set once, at Case creation, by `case-init.ts`'s `DEFAULT_PROCEDURE_CODE` constant, independent of whatever the citizen's message actually turned out to describe). Nothing in the schema expresses that these two values denote — or might not denote — the same real-world procedure.
- **This breaks Traceability** (`TRUST_CONSTITUTION.md`'s own mechanism): a citation, checklist item, or audit entry cannot be mechanically walked back to "the one procedure it concerns" without a human already knowing the informal Knowledge-ID-to-Database-ID mapping. Volume 44's own Citation Traceability chain (§8) names "Procedure" as a link in that chain — today, that link is ambiguous by construction.
- **This breaks Auditability.** An `AuditEvent.payload` embeds the Knowledge ID (via the recognition/citation/checklist results it logs), while `AuditEvent.caseId` points to a `Case` whose Procedure foreign key resolves to the Database ID. A reviewer reconciling records after the fact sees two different procedure references for one Case with no mechanical way to confirm they agree.
- **Future Government IDs would compound, not solve, this.** Layering a fourth identity space on top of an already-unreconciled Knowledge ID / Database ID pair — without a designed strategy — means integration will most likely add another silent, unlinked ID rather than plugging into an existing, extensible slot.
- **Aliases risk being conflated with identity.** A phrase that *identifies* a procedure to a citizen (an alias) is not the same thing as the procedure's *identity* — but without an explicit model naming the difference, a future contributor could reasonably (and wrongly) start keying data off an alias string.

The project must define **one** authoritative identity strategy before Sprint 01F's persistence layer — which already writes real data using the Knowledge ID as if it were durable and unambiguous — can be considered safe to build further sprints on.

---

## 2. Current State

Every procedure identity that exists today, by component:

| Component | Identity used | Notes |
|---|---|---|
| **Knowledge Library** (`knowledge/procedures/*.md`) | `procedureId` frontmatter (e.g. `CCCD_RENEWAL`, `CCCD_FIRST_ISSUANCE`, `CCCD_REPLACEMENT`, `CCCD_REISSUE`) | Only 4 procedures are authored as files. `knowledge/life-events/index.json`'s `procedureLibraryStatus.plannedNotYetAuthored` lists 11 more procedure IDs referenced by graph edges (`goals/index.json`, `affected-assets/index.json`) with no file yet. |
| **Database (Prisma)** | `Procedure.code` (unique string, exactly one seeded row: `"ID_CARD_RENEWAL"`) and `Procedure.id` (cuid, real PK) | `Case.procedureId` is a hard FK to `Procedure.id`. No Prisma row exists for `CCCD_RENEWAL` or any other Knowledge ID. |
| **Recognition Engine** (Sprint 01B, `procedure-recognizer.ts` / `recognition-data.ts`) | Knowledge ID exclusively | Never reads or writes `Procedure.code`. `ProcedureRecognitionResult.procedureId` is always a Knowledge ID. |
| **Checklist** (Sprint 01D, `checklist-data.ts`) | Knowledge ID exclusively | Keyed by the same 4 Knowledge IDs. |
| **Citation Resolver** (Sprint 01C, `citation-data.ts`) | Knowledge ID exclusively | Same. |
| **Persistence** (Sprint 01F, `persist-turn.ts`) | Both, unlinked | `Case.procedureId` (FK) → Database ID, fixed at Case creation. `ProcedureResolution.procedureId`, `CitationResolution.procedureId`, `ChecklistItem.procedureId` → plain-string Knowledge ID, no FK, no crosswalk. |
| **Audit** (`AuditEvent.payload`) | Knowledge ID (embedded in the logged recognition/citation/checklist results) | `AuditEvent.caseId` still points to a Case whose own Procedure FK resolves to the Database ID. |
| **Case** (`Case.procedureId`) | Database ID only | Chosen once, at Case creation, by `case-init.ts`'s hardcoded `DEFAULT_PROCEDURE_CODE = "ID_CARD_RENEWAL"` — independent of, and prior to, whatever Sprint 01B later recognizes for that Case's actual first message. |
| **Conversation** (`ConversationTurn`, Sprint 01F) | Neither directly | Carries no `procedureId` of its own; relies entirely on its optional one-to-one `ProcedureResolution` child row (Knowledge ID). |

This table is itself the first artifact this ADR requires (§2's own instruction) — every row above was independently flagged as a Known Issue or Known Risk in the Sprint 01B, 01D, and 01F reports that preceded this ADR; nothing here is newly discovered, only newly consolidated into one place.

---

## 3. Requirements

The chosen strategy must support:

- **Human-readable IDs** — legible in prose, `[cite: ...]` markers, and debugging output, matching how this project's content has always been authored.
- **Machine-stable IDs** — never renamed once assigned; safe as a durable key or FK target.
- **Future government integration** — a designed home for an eventual official administrative-procedure code, without forcing a second identity crisis later.
- **Backward compatibility** — the one existing seeded `Procedure.code = "ID_CARD_RENEWAL"` row, and every `Case` already pointing at it, must not require a synchronized flag-day rewrite.
- **Migration safety** — any transition must be additive and reversible, never a single destructive cutover risking orphaned foreign keys.
- **Traceability** — every derived record (recognition, citation, checklist, audit) must be walkable back to one unambiguous procedure identity, per `TRUST_CONSTITUTION.md`.
- **Audit** — every `AuditEvent` must reference the same identity space `Case.procedureId` ultimately resolves to, or an explicit, resolvable cross-reference to it.
- **Knowledge Library independence** — content authors must remain able to write a new procedure file in Markdown/YAML before any database row necessarily exists for it, exactly as today (11 of 15 referenced procedures currently have no file *or* database row at all).
- **Search** — Sprint 01B's deterministic matching must keep working purely off `knowledge/` content, with no live database round-trip, per Volume 16/41's technology-independence discipline.
- **Aliases** — must remain a separate, unbounded, many-per-procedure matching surface, never confused with identity.

---

## 4. Candidate Architectures

### Option A — Knowledge ID becomes canonical

The Knowledge Library's `procedureId` (e.g. `CCCD_RENEWAL`) becomes *the* identity everywhere, including as `Procedure.code` (or even `Procedure`'s own PK) in Prisma.

- **Advantages:** Zero change to Sprints 01B/01C/01D — they already speak this language natively. Human-readable by construction. Matches how `knowledge/` is already authored.
- **Disadvantages:** Requires an immediate data migration just to become true — the one existing seeded row (`"ID_CARD_RENEWAL"`) doesn't match any Knowledge ID today. No natural home for a future government code without overloading this one field's meaning; an official government code is often numeric/opaque and would sit awkwardly forced into a human-authored knowledge slug. Aliases and canonical ID both live in the same file with no structural signal distinguishing "this is the one key" from "this is a matching phrase."
- **Migration impact:** Moderate — renaming `Procedure.code` doesn't orphan any FK (`Case.procedureId` targets `Procedure.id`, not `.code`), but every place keying off the literal string `"ID_CARD_RENEWAL"` (`case-init.ts`'s `DEFAULT_PROCEDURE_CODE`) must be updated in lockstep.
- **Long-term maintenance:** Simplest mental model today; brittle the moment government integration needs a materially different code format than a human-authored slug.
- **Compatibility with existing Volumes:** Strong with Vol. 41/16 (human-authored knowledge remains authoritative). Weak against Vol. 46's own acceptance criterion that Case Management remain valid after "government platform" substitution — baking a knowledge-authoring slug in as the *sole* database identity works against that.

### Option B — Database ID becomes canonical

Prisma's `Procedure.id` (or `.code`) becomes canonical; the Knowledge Library must adopt a database-assigned identity as its own `procedureId`.

- **Advantages:** Referential integrity is trivially clean — every reference is a real FK, no plain-string duplication anywhere.
- **Disadvantages:** Inverts this project's entire authoring order. `knowledge/procedures/*.md` files are written *before* any database row necessarily exists for them — 11 of 15 referenced procedures have no file yet at all, let alone a database row. Option B would block a content author from ever writing a new procedure file until a database row (and its generated ID) exists first — the opposite of Volume 15's content-first Knowledge Object authoring lifecycle, which is entirely independent of runtime infrastructure. `Procedure.id` is an opaque cuid — leaking it into human-authored Markdown prose and `[cite: ...]` markers directly violates the technology-independence acceptance criteria every one of Volumes 14/15/16/41/44/45/46/47/48 already states in its own Acceptance Criteria chapter (none may presume a specific database technology).
- **Migration impact:** Severe — every `procedureId` reference across `knowledge/procedures/`, `knowledge/life-events/index.json`, `knowledge/goals/index.json`, and `knowledge/affected-assets/index.json` would need rewriting to values that don't exist yet for most of them.
- **Long-term maintenance:** Poor — every new procedure requires a database write *before* content can be committed, an unnatural, high-friction loop for a content-first Knowledge Library.
- **Compatibility with existing Volumes:** Directly conflicts with Volume 15's authoring-lifecycle model and every Specification's own technology-independence acceptance criteria.

### Option C — Introduce a Canonical Identity Layer

Neither existing identity is elevated over the other. A single, explicit **Canonical Procedure Identity** is introduced: the Knowledge Library's existing `procedureId` becomes the canonical slug (no new authoring step — it already is what every Sprint 01B–01F component already speaks), and Prisma's `Procedure` model gains an explicit `canonicalId` field, distinct from its existing `code`/`id`, that every Procedure row must declare. A future government code becomes its own clearly separate, optional field on the same record, never colliding with either existing space.

- **Advantages:** No existing identity is treated as inherently more "real" than another — each becomes a labeled, first-class field on one canonical record (§6). Government integration gets a designed home from day one. The Knowledge Library keeps authoring independently of any database round-trip. Backward compatible: the one existing seeded row is not deleted or destructively renamed, only explicitly mapped once a reconciliation decision is made (§7).
- **Disadvantages:** One more concept to maintain — the canonical slug and its explicit crosswalk to the database PK — marginally more moving parts than Option A on paper. Requires a deliberate, human decision (not automatic) about whether `"ID_CARD_RENEWAL"` and `"CCCD_RENEWAL"` denote the same real administrative procedure or not (§7, §Known Risks) — this ADR does not silently assume either answer.
- **Migration impact:** Lowest of the three — purely additive (new nullable column, no destructive rename), reversible at every step, rollout-able incrementally (§7).
- **Long-term maintenance:** Best — the crosswalk is the single place every future identity space (government, a future partner system, a future analytics platform) plugs into, rather than each integration inventing its own ad hoc mapping.
- **Compatibility with existing Volumes:** Highest — directly satisfies Volume 46's Case Object Model (a Case Identifier is already a distinct, first-class object there — a canonical procedure identifier is the same idea applied one layer over), Volume 45's Traceability/Reference discipline, Volume 41's grounding-without-technology-coupling principle, Volumes 14/15's technology independence, and Volume 44's Citation Traceability chain (§8), which already names "Procedure" as a link expecting exactly this kind of unambiguous resolution.

---

## 5. Final Decision

**Option C — Introduce a Canonical Identity Layer** is adopted.

The Knowledge Library's existing, human-authored `procedureId` becomes the **Canonical ID** — no new authoring burden, since every Sprint 01B–01F component already treats it this way in practice. Prisma's `Procedure` model gains an explicit `canonicalId` field (distinct from its existing `code` and `id`), and a clearly separated, optional future `governmentProcedureCode` field.

This best satisfies the required criteria:

- **Traceability** — every derived record (`ProcedureResolution`, `CitationResolution`, `ChecklistItem`, `Case`) can cite the same Canonical ID, with the crosswalk providing the one-hop resolution to the database PK whenever a real join is needed.
- **Maintainability** — new procedures continue to be authored exactly as today, Knowledge Library first; the database crosswalk is a lightweight follow-up, never a blocker.
- **Government compatibility** — a designed field exists before it is needed, avoiding a second identity crisis when real integration begins.
- **Future expansion** — additional external identity spaces plug into the same crosswalk pattern rather than each inventing its own.
- **Minimal technical debt** — the migration is purely additive; nothing existing is deleted or destructively renamed; every step is reversible.

---

## 6. Canonical Procedure Model

The logical model every Procedure record is understood to have going forward (fields, not code):

| Field | Description |
|---|---|
| **Canonical ID** | The stable, human-readable slug — identical to the Knowledge Library's `procedureId` today (e.g. `CCCD_RENEWAL`). Never reused; never reassigned to a different real-world procedure. |
| **Knowledge ID** | Named explicitly, even though defined to equal the Canonical ID today — so that if the two are ever deliberately allowed to diverge in the future, that is a visible, considered decision, not a silent one. |
| **Database ID** | The database-generated primary key — the real foreign-key target for `Case`, `ChecklistItem`, and every other relation. |
| **Government ID** | Optional. Populated once real government-platform integration exists. Null for every procedure today. |
| **Display Name** | The authored `officialName` — formal Vietnamese administrative name. |
| **Citizen-Friendly Name** | The authored `citizenFriendlyName` — bilingual, plain-language. |
| **Aliases** | The authored `aliases[]` list. Explicitly **not** an identity — a matching/search surface only (Sprint 01B). |
| **Status** | Draft / Approved / Deprecated — mirrors Volume 15's Knowledge Object lifecycle and this project's standing "never delete, mark superseded" discipline. |
| **Version** | The authored `dataVersion`, already present on every procedure file today. |

---

## 7. Migration Strategy

Data transition only — no implementation, no code.

1. **Additive schema step.** A nullable `canonicalId` field is added to `Procedure`. Nothing else changes. `ProcedureResolution.procedureId`, `CitationResolution.procedureId`, and `ChecklistItem.procedureId` (Sprint 01F) require **no change at all** — they already store the future Canonical ID value verbatim; they simply become resolvable once `Procedure.canonicalId` exists to join against.
2. **Reconciliation decision (human, not automatic).** An architect or legal reviewer must determine whether the one existing seeded row (`Procedure.code = "ID_CARD_RENEWAL"`) denotes the *same* real-world administrative procedure as the Knowledge Library's `CCCD_RENEWAL`.
   - **If yes:** set `canonicalId = "CCCD_RENEWAL"` on that existing row. This is a data update only — `.code` itself is never renamed, so nothing already keyed off the literal string `"ID_CARD_RENEWAL"` breaks.
   - **If no** (the legacy row was a distinct placeholder never meant to persist): mark the legacy row **Deprecated** (never deleted, per Volume 44/15's superseded-not-deleted discipline) and create a new `Procedure` row with `canonicalId = "CCCD_RENEWAL"` alongside it. New Cases are pointed at the new row going forward; existing Cases keep resolving through the deprecated one, unbroken.
3. **Backfill.** For each of the 4 currently-authored Knowledge Library procedures (`CCCD_RENEWAL`, `CCCD_FIRST_ISSUANCE`, `CCCD_REPLACEMENT`, `CCCD_REISSUE`), create or update a corresponding `Procedure` row with `canonicalId` set. The 11 "planned, not yet authored" procedure IDs receive no `Procedure` row yet — consistent with content-first authoring; a database row is created only once a procedure is actually authored and Approved, never speculatively.
4. **No retroactive rewrite of Sprint 01F's persisted rows.** Their string `procedureId` values already equal the Canonical ID; they become correct-by-construction the moment `Procedure.canonicalId` exists, without themselves needing to change.
5. **Reversibility.** Every step above is additive or a status-flag change. Nothing is deleted; no existing foreign key is repointed destructively — satisfying the Migration Safety requirement in full.

---

## 8. Impact Analysis

| Area | Impact |
|---|---|
| **Knowledge Library** | No content change. `procedureId`'s role is formally elevated to "the Canonical ID" — a governance clarification, not a content rewrite. |
| **Procedure Recognition** (Sprint 01B / Vol. 41) | No code change — already speaks the Canonical ID natively. |
| **Legal Citation** (Sprint 01C / Vol. 44) | No code change — `CitationResolution.procedureId` already stores the Canonical ID. |
| **Checklist** (Sprint 01D) | No code change, same reasoning. |
| **Persistence** (Sprint 01F) | No change to the three new tables' data; `Procedure` alone gains a field. `case-init.ts`'s hardcoded `DEFAULT_PROCEDURE_CODE` is the one place a future implementation phase would resolve a Case's Procedure via `canonicalId` instead — flagged as future work (§10), not performed by this ADR. |
| **Audit** | `AuditEvent` payloads already embed the Canonical ID; they become formally cross-referenceable against `Case.procedureId`'s target once the crosswalk exists. |
| **Case Management** (Vol. 46) | `Case.procedureId`'s foreign key gains a documented, resolvable path to the same Canonical ID the rest of a turn's records use — this is the Procedure-identity half of the "unified reconciliation pass" Vol. 46's own Known Risks already called for; the separate `CaseStage`/`WorkflowState` reconciliation remains open and untouched by this ADR. |
| **Memory** (Vol. 45) | Case Memory's Evidence/Observation objects referencing a procedure gain the same one-hop resolvability. |
| **Rule Engine** (Vol. 14) | Rule packs (e.g. `RULE_PACK_CCCD_PILOT.md`) already key off the Canonical ID naming — no change; confirms this was already the de facto convention there. |
| **Future Government Integration** | Gains its designed field (Government ID) instead of forcing another ad hoc identity crisis later. |

---

## 9. Compatibility

- **Volume 14 (Rule Engine)** — compatible; rule packs already reference procedures by Canonical ID.
- **Volume 15 (Legal Knowledge Base & RAG Ingestion)** — compatible; the Canonical ID is exactly the Knowledge Object identity that Specification's authoring lifecycle already assumes.
- **Volume 41 (AI Reasoning Pipeline)** — compatible; no reasoning stage depends on a specific database technology, and none is asked to here.
- **Volume 44 (Legal Citation Specification)** — compatible; §8's Citation Traceability chain names "Procedure" as a link — this ADR is what makes that link unambiguous.
- **Volume 45 (Memory & Conversation Specification)** — compatible; Evidence/Reference objects gain a cleaner resolution path, no change to Memory Domains or Trust Levels.
- **Volume 46 (Case Management Specification)** — compatible; directly advances (does not conflict with) that Specification's own flagged need for identity reconciliation.
- **Volume 47 (AI Orchestration Specification)** — compatible; orchestration calls capabilities by their own interfaces, none of which change here.
- **Volume 48 (Notification & Communication Specification)** — compatible; notification content derives from Case/Decision facts, unaffected by which identity field backs a Procedure lookup.

---

## 10. Implementation Guidance

Described only — not implemented by this ADR.

- **Phase 1** — Schema addition: add a nullable `canonicalId` field to `Procedure` (no existing data touched). In parallel, an architect/legal reviewer resolves the §7 reconciliation question (does `"ID_CARD_RENEWAL"` denote the same procedure as `"CCCD_RENEWAL"`).
- **Phase 2** — Backfill `canonicalId` for the 4 currently-authored procedures per the reconciliation decision. Update `case-init.ts`'s procedure-selection logic to resolve a Case's Procedure via `canonicalId` rather than the hardcoded `DEFAULT_PROCEDURE_CODE` constant — additively, so the old path can remain as a fallback during transition.
- **Phase 3** — Extend the Memory Subsystem mediator (`case-memory.ts`) to expose the resolved Canonical ID alongside Case reads, giving read-side traceability parity with what Sprint 01F already writes; extend the model to populate Government ID once real government-platform integration begins.

---

## Known Risks

- **The §7 reconciliation decision (whether `"ID_CARD_RENEWAL"` and `"CCCD_RENEWAL"` are the same procedure) is not made by this ADR.** It requires human/legal judgment this document cannot supply, and is the single blocking prerequisite before Phase 1's backfill can run correctly.
- **11 of 15 procedures referenced by the Knowledge Library's graph edges have no authored file and, under this strategy, will continue to have no `Procedure` row** until they are authored — this ADR does not accelerate that authoring work, only ensures the eventual database row for each will have a designed place to declare its Canonical ID.
- **This ADR does not implement anything.** `case-init.ts` still hardcodes `DEFAULT_PROCEDURE_CODE = "ID_CARD_RENEWAL"` and Sprint 01F's persisted rows remain, today, an un-cross-referenced pair of identity spaces until Phase 1–2 are actually carried out in a future sprint.
- **The `CaseStage` / `WorkflowState` duality flagged separately in `CASE_MANAGEMENT_SPECIFICATION.md`'s Known Risks is not addressed here** — this ADR resolves only the Procedure-identity strand of that Specification's broader reconciliation concern.
