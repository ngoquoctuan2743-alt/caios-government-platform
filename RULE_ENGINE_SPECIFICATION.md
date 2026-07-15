# RULE_ENGINE_SPECIFICATION.md
### The Constitutional Rule Engine Specification — Volume 14
**Version:** 1.0
**Status:** Approved
**Class:** Specification — architecture only. No implementation, code, or framework is prescribed here.
**Precedence:** Subordinate to every Constitution and to `EPIC_A_AI_CORE_ARCHITECTURE.md` (Volume 38). Fills `MASTER_INDEX.md`'s long-reserved Volume 14 slot — this is that slot's first authored content, not a reassignment of anything else, so no ADR is required (unlike ADR-0005 through 0011, which each resolved a genuine naming conflict). Directly fulfills the recommendation at the close of `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Volume 42).
**Companion documents:** `PROJECT_OPERATING_SYSTEM.md`, `MASTER_INDEX.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SUCCESS_METRICS_CONSTITUTION.md`, `AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`, `SYSTEM_ARCHITECTURE_SPECIFICATION.md` (Vol. 37), `EPIC_A_AI_CORE_ARCHITECTURE.md` (Vol. 38), `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41), `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Vol. 42), `knowledge/procedures/`, `knowledge/citations/`.
**Ownership:** Owner — Chief Rule Architect · Architect — Government Decision Designer / Enterprise AI Architect · Reviewer — Technical Steering Committee + Administrative Law Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 1.0 | This revision | Architecture Review | Initial authorship, filling `MASTER_INDEX.md`'s Volume 14 slot for the first time. Generalizes Volume 41 Stage 06 and Volume 42's rule evaluation into one shared, deterministic core. |

---

## Preface

**LLMs never decide eligibility. Rules decide. LLMs explain.** Every prior Specification in this project has approached this principle from a different angle — Epic A's Decision Model, the Legal Intelligence Constitution's citation-or-refuse discipline, the Document Gap Analysis Engine's deterministic checks. This Specification is where that principle finally gets one shared, auditable mechanism instead of being independently reasoned about in each consuming component. If Stage 06 (Eligibility Evaluation) and the Document Gap Analysis Engine each built their own rule logic, CAIOS would have two different, potentially inconsistent definitions of "deterministic." This Engine exists so there is exactly one.

---

## 1. Rule Categories

| Category | Purpose | Worked Example (ID Card Renewal pilot) |
|---|---|---|
| Eligibility | Determines whether a citizen qualifies for a procedure at all | Citizen holds a prior CCCD/Căn cước record |
| Requirement | Determines what must be true or present for the case to proceed | Application form submitted |
| Exception | A specific, legally-grounded carve-out that overrides a general rule | A citizen with no prior ID record due to a documented gap — see `CCCD_FIRST_ISSUANCE`'s escalation note |
| Mandatory Document | A document whose absence blocks submission-readiness | `CURRENT_ID_DOCUMENT` for renewal |
| Optional Document | A document whose absence is recorded but never blocking | `HOUSEHOLD_REGISTRATION_EXTRACT` where digitally verifiable |
| Age Rule | A rule keyed on the citizen's age | The renewal cycle at ages 25/40/60 |
| Time Rule | A rule keyed on elapsed or remaining time | A processing-time or validity-window check |
| Validity Rule | Whether a document or fact is still within its valid period | A document past its expiry (feeds Volume 42's `EXPIRED` status) |
| Conflict Rule | Detects when two facts or documents disagree | A name mismatch across two documents (feeds Volume 42's `CONFLICTING` status) |
| Escalation Rule | Formalizes a human-in-the-loop trigger as an evaluable rule, not just a narrative principle | Any of the canonical triggers already named across `AI_OPERATING_SYSTEM.md` Ch. 9, `WORKFLOW_CONSTITUTION.md` Ch. 7, `GOVERNMENT_CONSTITUTION.md` Ch. 9 |

## 2. Rule Template (12 fields)

Every rule, in every category, is defined by exactly these fields — no rule instance may omit one:

| Field | Description |
|---|---|
| Rule ID | Stable, unique, versionable identifier |
| Purpose | One sentence: what this rule determines |
| Inputs | The specific facts/fields this rule reads |
| Outputs | `Verified Fact` / `Unknown — pending fact` / `Escalate`, per Epic A's Decision Model — never a fourth kind of output |
| Priority | Numeric; governs evaluation and conflict order (Section 4) |
| Dependencies | Other Rule IDs this rule's evaluation requires first (Section 6) |
| Legal Basis | A citation ID from `knowledge/citations/` — this rule's own confidence is capped at that citation's verified status |
| Related Constitution | Which Constitution this rule's principle derives from |
| Related Procedure | Which `knowledge/procedures/` entry this rule applies to (or "all," for universal rules like the canonical escalation triggers) |
| Failure Modes | What happens if this rule is evaluated on incomplete or contradictory input |
| Audit Events | What the audit payload captures when this rule fires |
| Versioning | This rule's own version, and what legal-basis change would require a new one |

**Worked example:**

```
Rule ID: ELIGIBILITY_CCCD_FIRST_ISSUANCE_AGE
Purpose: Confirm the citizen has reached the qualifying first-issuance age.
Inputs: citizen.dateOfBirth
Outputs: Verified Fact (age >= threshold) | Unknown (date of birth not on record) | Escalate (age edge case per CCCD_FIRST_ISSUANCE's own escalation note)
Priority: 100 (Eligibility rules evaluate before Requirement rules for the same procedure)
Dependencies: none
Legal Basis: LUAT_CAN_CUOC_2023 (verified: false — see knowledge/citations/luat-can-cuoc-2023.md)
Related Constitution: LEGAL_INTELLIGENCE_CONSTITUTION.md Ch. 4
Related Procedure: CCCD_FIRST_ISSUANCE
Failure Modes: Evaluating against a missing date of birth as if it were present (must instead yield Unknown)
Audit Events: rule ID, version, input value used, output, legal basis citation ID
Versioning: v0.1.0-draft; a new version required if LUAT_CAN_CUOC_2023's qualifying age is ever confirmed to differ from the currently assumed value
```

## 3. Rule Evaluation Pipeline

```
Resolved Procedure (Stage 05, Volume 41)
        │
        ▼
Load applicable rules (filtered by procedure + category)
        │
        ▼
Sort by Priority (Section 4/5)
        │
        ▼
Evaluate in order, respecting Dependencies (Section 6)
        │
        ▼
Each rule → { Verified Fact | Unknown | Escalate }
        │
        ▼
Aggregate result returned to caller:
   - Stage 06 (Eligibility Evaluation) for Eligibility/Exception/Age rules
   - Document Gap Analysis Engine (Volume 42) for Requirement/Document/Validity/Conflict rules
   - Stage 10 (Escalation Decision) for Escalation rules, fed from either caller
```

This is the single shared core `AI_REASONING_PIPELINE_SPECIFICATION.md` Stage 06 and `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md`'s Rule Evaluation both consume — not two independently-built mechanisms arriving at the same idea differently.

## 4. Conflict Resolution

When two rules produce contradictory outputs for the same case, resolution follows the same three-step ordering `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 2 already established for legal sources, applied here to rules:

1. **Category precedence first** — Exception rules outrank Eligibility rules, which outrank Requirement rules, which outrank the rest (see the Conflict Resolution Matrix below).
2. **Priority value second, within the same category** — the higher-priority rule governs.
3. **Specificity third** — a rule scoped to a specific procedure outranks a universal rule, at equal category and priority.

If all three still leave a genuine tie, the rule engine does not break it by any internal judgment — it returns `Escalate`, exactly as `LEGAL_INTELLIGENCE_CONSTITUTION.md` requires of an unresolved legal-source conflict.

### Conflict Resolution Matrix

| ↓ overrides → | Eligibility | Requirement | Age | Time | Validity | Conflict |
|---|---|---|---|---|---|---|
| **Exception** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Eligibility** | — | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Requirement** | ❌ | — | ❌ | ❌ | ✅ | ✅ |
| **Escalation** | overrides all — an escalation-triggering rule always wins regardless of category, since it does not compete to produce a case outcome, it removes the case from automated resolution entirely |

## 5. Priority Resolution

Every rule carries a numeric priority (Section 2). Rules within the same category evaluate in descending priority order; a rule with `Dependencies` (Section 6) always evaluates after every rule it depends on, regardless of numeric priority — dependency order is a hard constraint, priority only orders rules with no dependency relationship to each other.

## 6. Rule Chaining

Rules may depend on other rules' output (e.g., an Age Rule's output feeds an Eligibility Rule, which feeds a Requirement Rule). This is modeled as a **directed acyclic graph** — cycles are structurally forbidden, and a rule set containing one is a defect caught before any case is ever evaluated against it, not a runtime failure discovered mid-case.

### Rule Dependency Graph (worked example — `CCCD_FIRST_ISSUANCE`)

```
ELIGIBILITY_CCCD_FIRST_ISSUANCE_AGE
        │
        ▼
ELIGIBILITY_CCCD_FIRST_ISSUANCE_NO_PRIOR_RECORD
        │
        ▼
REQUIREMENT_CCCD_FIRST_ISSUANCE_BIRTH_CERTIFICATE
        │
        ▼
REQUIREMENT_CCCD_FIRST_ISSUANCE_GUARDIAN_PRESENT (Exception rule if citizen is already an adult)
```

## 7. Rule Versioning

A rule's version is tied to its Legal Basis. When a citation in `knowledge/citations/` is verified or amended, every rule whose Legal Basis references it is flagged for mandatory re-review — this is not automatic re-approval, it is a forced checkpoint, per `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 3's Version Control stage applied to rules instead of raw legal text.

## 8. Rule Lifecycle

```
Draft → Reviewed → Active → Deprecated → Retired
```

Mirrors `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 3's six-stage Legal Knowledge Lifecycle, condensed to five stages appropriate to a rule object rather than a raw legal source: **Draft** (authored, not yet reviewed), **Reviewed** (checked against its Legal Basis and Related Procedure by a qualified reviewer), **Active** (in force, evaluated against real cases), **Deprecated** (superseded by a newer version but not yet fully retired, e.g., during a transition window), **Retired** (no longer evaluated, permanently retained for historical case reconstruction — never deleted, per this project's standing Knowledge Preservation principle).

## 9. Human Override

- An officer may override a specific rule's output for a specific case during review — logged as a distinct audit event, feeding the same institutional-learning loop `LEGAL_INTELLIGENCE_CONSTITUTION.md` Chapter 9 already establishes.
- Amending or retiring a rule *in general* (not just for one case) requires the same rigor `PROJECT_OPERATING_SYSTEM.md` Chapter 04 already applies to amending a Specification — a rule is not silently edited by whoever notices it should change.

## 10. Legal Traceability

Every rule's Legal Basis field is a citation ID, never free text describing "what the law probably says." **Every rule authored against today's four pilot procedures inherits a `verified: false` citation** (per `knowledge/citations/`), and therefore no rule in this initial set can produce a High-confidence output — this is the correct, honest state of the system today, not a defect to hide.

## 11. Auditability

Every rule evaluation, successful or not, writes to the case's audit trail: rule ID, version, the specific input values used, the output produced, and the Legal Basis citation referenced — sufficient for a reviewer to reconstruct exactly why a case was deemed eligible, ineligible, or escalated, without needing to re-run anything.

### Audit Flow

```
Rule evaluated
      │
      ▼
Structured result { ruleId, version, inputs, output, legalBasis }
      │
      ▼
Folded into the case's single per-turn audit event
(NOT a separate event per rule — consistent with Volume 41 and Volume 42's
"one event per meaningful unit of reasoning" discipline)
```

## 12. Performance

Every rule in this Engine is deterministic — no LLM call, no network retrieval beyond a static lookup. Full evaluation of a typical procedure's rule set (Eligibility + Requirement + a handful of Document/Validity/Conflict rules) should complete in **under 100ms**, consistent with the performance discipline already established in `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` Section 14 — this is what makes the Competition Demo's recognition beat (Section 15 below) feel instantaneous rather than "loading."

## 13. Trust Mapping

| `TRUST_CONSTITUTION.md` Ch. 4 Mechanism | How This Engine Implements It |
|---|---|
| Legal Citation | Every rule's mandatory Legal Basis field |
| Human Escalation | Escalation Rules, and any unresolved conflict per Section 4 |
| Auditability | Section 11's Audit Flow |
| Traceability | The full rule dependency chain (Section 6) is reconstructable from the audit payload |
| Evidence | Every rule output is grounded in specific input values, never inferred |
| Consistency | Deterministic evaluation guarantees identical inputs always produce identical outputs |

## 14. Future Rule Editor

Rules are modeled as structured, versioned data objects from the start — never embedded in code — specifically so a future no-code Rule Editor (resolving the open question already raised in `TECHNICAL_PRD` §11: "do legal/policy staff need a no-code interface to update eligibility rules") can let legal and policy staff author and version rules directly, without an engineering deploy cycle, while still passing through the same Draft → Reviewed → Active lifecycle (Section 8) every rule already must.

## 15. Future Government Rule Import

Once an authoritative external government rule or regulation source exists in machine-readable form, this Engine's rule set could be partially or fully synchronized from it rather than hand-authored — consistent with `GOVERNMENT_CONSTITUTION.md` Chapter 9's interoperability principle that an external authoritative system is referenced and verified against, never duplicated into a competing internal copy of the truth.

## 16. Competition Demo Mapping

| Demo Director Book Beat | Rule Categories Involved |
|---|---|
| 0:40–1:05 (recognition, eligibility confirmation) | Eligibility, Age |
| 1:40–2:05 (checklist generation) | Requirement, Mandatory/Optional Document |
| 2:05–2:35 (missing document — Volume 42's engine) | Validity, Conflict |
| Throughout | Escalation rules run continuously, silently, ready to fire at any point |

---

## Architecture Diagram

```
                 ┌────────────────────────────┐
                 │   Constitutional Rule Engine │
                 │        (this Specification)   │
                 └──────┬─────────────┬─────────┘
                         │             │
             ┌───────────▼──┐   ┌─────▼─────────────────────┐
             │ Stage 06        │   │ Document Gap Analysis       │
             │ Eligibility     │   │ Engine (Volume 42)           │
             │ Evaluation      │   │ Requirement/Validity/Conflict │
             │ (Volume 41)     │   └──────────────────────────────┘
             └─────────────────┘
                         │             │
                         └──────┬──────┘
                                ▼
                    Stage 10 Escalation Decision
                          (Volume 41)
```

---

## Known Risks

- **Every rule's confidence is currently capped by an unverified citation** — correct and honest, but it means the entire eligibility and requirement determination chain cannot exceed Medium confidence until `knowledge/citations/` entries are legally reviewed.
- **Only one procedure (`CCCD_FIRST_ISSUANCE`) has a worked dependency graph in this initial Specification** — the other three pilot procedures' full rule sets are implied by the same template but not individually authored here; a real implementation effort must author all four before Stage 06 can run against the whole pilot scope.
- **The Conflict Resolution Matrix's category precedence is a proposed default, not yet reviewed by an Administrative Law Expert** — worth explicit sign-off before being treated as final, since getting Eligibility vs. Requirement precedence wrong could produce a wrongly-favorable or wrongly-unfavorable outcome for a real citizen.

## Recommendation for Volume 44

Author the four pilot procedures' complete rule sets (all 10 categories, per procedure) as structured rule data conforming to this Specification's template — the natural next step now that the template itself, its evaluation pipeline, and its conflict-resolution discipline are all Approved, and the one substantive gap remaining before Stage 06 and Volume 42's engine can actually run is real, procedure-specific rule content rather than more architecture.
