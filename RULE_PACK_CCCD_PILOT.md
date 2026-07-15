# RULE_PACK_CCCD_PILOT.md
### Rule Pack — CCCD Pilot Procedures — Volume 43
**Version:** 1.0
**Status:** Approved
**Class:** Rule Library content (per `RULE_ENGINE_SPECIFICATION.md` §14) — fills the Rule Engine's template with real rule instances for the four CCCD pilot procedures. Content only; no architecture, no Rule Engine mechanics, and no existing Constitution is modified here.
**Precedence:** Numbered Volume 43, the next actually-available sequential slot (per ADR-0008/0009) — **not** Volume 15, which remains reserved for the Legal Knowledge Base & RAG Ingestion Specification, a different document with different content. Every rule below must conform to `RULE_ENGINE_SPECIFICATION.md` (Volume 14)'s template and category definitions; where this pack appears to need something that template doesn't support, that is a defect in this pack, not license to invent new rule mechanics here.
**Companion documents:** `PROJECT_OPERATING_SYSTEM.md`, `MASTER_INDEX.md`, `PRODUCT_CONSTITUTION.md`, `VISION_CONSTITUTION.md`, `TRUST_CONSTITUTION.md`, `SUCCESS_METRICS_CONSTITUTION.md`, `AI_OPERATING_SYSTEM.md`, `WORKFLOW_CONSTITUTION.md`, `LEGAL_INTELLIGENCE_CONSTITUTION.md`, `CITIZEN_CONSTITUTION.md`, `GOVERNMENT_CONSTITUTION.md`, `RULE_ENGINE_SPECIFICATION.md` (Vol. 14), `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41), `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` (Vol. 42), `knowledge/procedures/`, `knowledge/documents/`, `knowledge/citations/`.
**Ownership:** Owner — Chief Rule Architect · Architect — Government Decision Designer · Reviewer — Technical Steering Committee + Administrative Law Expert · Implementation Owner — AI/ML Engineering Lead · Approval Authority — Technical Steering Committee.

---

## Changelog

| Version | Date | Reviewer | Change |
|---|---|---|---|
| 1.0 | This revision | Architecture Review | Initial authorship — first Rule Pack, covering all four CCCD pilot procedures per `RULE_ENGINE_SPECIFICATION.md`'s template. |

---

## Preface — Verification Discipline

**No citation in this pack is invented.** Every rule's Legal Citation field is either a real citation ID already present in `knowledge/citations/` (all currently `verified: false`, per that pack's own honest disclosure) or the literal value `UNKNOWN — verified=false` where no citation exists at all in the current corpus. Several rules below are **governance or architectural rules, not legal claims** — for those, the Legal Citation field states `N/A — governance rule, not a legal requirement` rather than forcing a citation onto something that was never a legal claim in the first place. This distinction matters: conflating "no legal citation exists" with "this isn't a legal claim" would itself be a small dishonesty this pack refuses to commit.

---

## Shared Rule Library

Applied identically across all four procedures — defined once here, referenced by ID in each procedure section below, never redefined.

**RULE_PHOTO_SPEC**
- Rule Name: Portrait Photo Specification Check
- Purpose: Confirm a captured/provided photo meets the current specification.
- Priority: 200 (Validation tier)
- Rule Type: Validation (Photo)
- Inputs: `photoAsset` metadata (background, recency, face visibility)
- Evaluation Logic: Deterministic check against `knowledge/documents/portrait-photo.md`'s known general specification
- Expected Output: Verified Fact (meets spec) 
- Failure Output: Unknown — pending verification of current exact specification (`THONG_TU_ANH_CHAN_DUNG`)
- Escalation Condition: Photo capture fails repeatedly or citizen cannot comply for a documented medical/religious reason
- Human Override: Officer may accept a photo this rule flags as borderline
- Legal Citation: `THONG_TU_ANH_CHAN_DUNG` — UNKNOWN, verified=false
- Current Verification Status: Not verified
- Confidence: Low (specification content), Medium (general structure)
- Future Verification Required: Yes — current circular content

**RULE_IDENTITY_CONSISTENCY**
- Rule Name: Cross-Document Identity Consistency
- Purpose: Confirm name/date-of-birth agree across every document and record in the case.
- Priority: 150 (Validation tier, evaluated before document-specific validation)
- Rule Type: Conflict
- Inputs: Name/DOB fields from every document and Memory Subsystem record in the case
- Evaluation Logic: Pairwise field comparison across all available sources
- Expected Output: Verified Fact (consistent)
- Failure Output: `CONFLICTING` (per `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` §2)
- Escalation Condition: Any unresolved mismatch
- Human Override: Officer may confirm which source is correct and note why
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified
- Confidence: Medium (logic), Low (legal basis)
- Future Verification Required: Yes

**RULE_RESIDENCE_DIGITAL_LOOKUP**
- Rule Name: Residence Information Digital Verification
- Purpose: Confirm residence information via the national database rather than requiring a physical extract by default.
- Priority: 180
- Rule Type: Requirement
- Inputs: Citizen's registered residence record
- Evaluation Logic: Attempt digital lookup first; only require `HOUSEHOLD_REGISTRATION_EXTRACT` if lookup fails
- Expected Output: Verified Fact (found digitally) or `HOUSEHOLD_REGISTRATION_EXTRACT` added to checklist
- Failure Output: Unknown — rollout completeness by locality unverified, per `knowledge/documents/household-registration-extract.md`
- Escalation Condition: Digital lookup and physical extract both fail to resolve residence
- Human Override: Officer may accept alternative proof
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified
- Confidence: Medium
- Future Verification Required: Yes

**RULE_ESCALATION_CANONICAL**
- Rule Name: Canonical Escalation Trigger Check
- Purpose: Apply the project-wide escalation trigger list at every stage of every procedure.
- Priority: 1 (always evaluated, overrides all other categories per `RULE_ENGINE_SPECIFICATION.md` §4)
- Rule Type: Escalation
- Inputs: Every flag raised by any other rule in this pack
- Evaluation Logic: If any trigger from `AI_OPERATING_SYSTEM.md` Ch. 9 / `WORKFLOW_CONSTITUTION.md` Ch. 7 / `GOVERNMENT_CONSTITUTION.md` Ch. 9 fires, escalate
- Expected Output: `Escalate`
- Failure Output: N/A — this rule cannot itself fail to evaluate, only fail to be invoked, which is a defect in the calling pipeline, not this rule
- Escalation Condition: Is the escalation condition
- Human Override: N/A — escalation always reaches a human by definition
- Legal Citation: N/A — governance rule, not a legal requirement
- Current Verification Status: N/A
- Confidence: High (this rule's own logic is a direct restatement of already-Approved constitutional triggers)
- Future Verification Required: No

**RULE_CONFIDENCE_MIN_AGGREGATION**
- Rule Name: Confidence Aggregation
- Purpose: Aggregate every rule's confidence for a case using minimum, never averaging.
- Priority: 2 (evaluated immediately after Escalation)
- Rule Type: Escalation (confidence-adjacent — determines whether Stage 09/10 of Volume 41 routes to escalation on confidence grounds alone)
- Inputs: Every other rule's confidence output for the case
- Evaluation Logic: `min()` across all contributing rule confidences
- Expected Output: Verified Fact (an aggregate confidence value)
- Failure Output: N/A
- Escalation Condition: Aggregate falls below the platform confidence floor (to be numerically set by a future calibration ADR)
- Human Override: N/A
- Legal Citation: N/A — architectural rule per `RULE_ENGINE_SPECIFICATION.md` §4–5
- Current Verification Status: N/A
- Confidence: High (logic itself; not a legal claim)
- Future Verification Required: No

**RULE_OFFICER_REVIEW_MANDATORY**
- Rule Name: Mandatory Officer Review
- Purpose: Ensure no case reaches Approved/Rejected without a human officer's action.
- Priority: 1 (co-equal with escalation; structurally non-negotiable)
- Rule Type: Escalation
- Inputs: Case `workflowState`
- Evaluation Logic: A transition to `APPROVED` or `REJECTED` never originates from this rule pack or any AI component — it is always an officer action, per `GOVERNMENT_CONSTITUTION.md` Chapter 3
- Expected Output: N/A — this rule enforces an absence (no automated approval path), not a positive determination
- Failure Output: N/A
- Escalation Condition: Always applies; not conditional
- Human Override: N/A — this rule exists to require the human, not to be overridden by one
- Legal Citation: N/A — governance rule, not a legal requirement
- Current Verification Status: N/A
- Confidence: High
- Future Verification Required: No

**RULE_PROCESSING_TIME_DISCLOSURE**
- Rule Name: Processing Time Honest Disclosure
- Purpose: State processing time honestly as unverified rather than committing to an unconfirmed figure.
- Priority: 250
- Rule Type: Time
- Inputs: Procedure's `expectedProcessingTime` field
- Evaluation Logic: If the field is `"Unknown"` (true for all four pilot procedures today), the response must disclose that explicitly, never substitute a plausible-sounding estimate
- Expected Output: Verified Fact (the disclosure itself, not a specific duration)
- Failure Output: N/A
- Escalation Condition: Citizen states a hard deadline that an unverified timeframe cannot responsibly be checked against
- Human Override: Officer may state an actual expected timeframe from operational experience, logged as such
- Legal Citation: `NGHI_DINH_HUONG_DAN_CAN_CUOC` — UNKNOWN, verified=false
- Current Verification Status: Not verified
- Confidence: Low (timeframe), High (the disclosure rule's own logic)
- Future Verification Required: Yes

---

## Procedure: CCCD_FIRST_ISSUANCE

### Procedure Overview
- **Business Goal:** Establish a citizen's first official identity document.
- **Applicable Citizens:** Citizens reaching the qualifying first-issuance age with no prior Căn cước/CCCD record.
- **Trigger Conditions:** Citizen message matches `FIRST_TIME_CITIZEN_ID` (per `knowledge/life-events/`).
- **Exit Conditions:** Case reaches `COMPLETED` after officer approval and card issuance, or `REJECTED` with a stated reason.
- **Required Documents:** `BIRTH_CERTIFICATE`, `APPLICATION_FORM` (per `knowledge/procedures/cccd-cap-moi.md`)
- **Optional Documents:** `HOUSEHOLD_REGISTRATION_EXTRACT`
- **Shared Rules Applied:** `RULE_PHOTO_SPEC`, `RULE_IDENTITY_CONSISTENCY`, `RULE_RESIDENCE_DIGITAL_LOOKUP`, `RULE_ESCALATION_CANONICAL`, `RULE_CONFIDENCE_MIN_AGGREGATION`, `RULE_OFFICER_REVIEW_MANDATORY`, `RULE_PROCESSING_TIME_DISCLOSURE`

### Rules

**ELIGIBILITY_FIRST_ISSUANCE_AGE**
- Purpose: Confirm the citizen has reached the qualifying first-issuance age.
- Priority: 100 | Rule Type: Age
- Inputs: `citizen.dateOfBirth`
- Evaluation Logic: `age(citizen.dateOfBirth) >= qualifying_age` (commonly cited as 14)
- Expected Output: Verified Fact
- Failure Output: Unknown (date of birth not on record)
- Escalation Condition: Age is at or near the threshold in an ambiguous way, or the citizen has reached adulthood with no prior record at all
- Human Override: Officer may confirm age via alternative evidence
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Low (specific age), Medium (that an age threshold exists at all)
- Future Verification Required: Yes

**ELIGIBILITY_FIRST_ISSUANCE_NO_PRIOR_RECORD**
- Purpose: Confirm no prior Căn cước/CCCD record exists for this citizen.
- Priority: 105 | Rule Type: Eligibility
- Inputs: Memory Subsystem lookup by citizen identity
- Evaluation Logic: Absence of a prior record confirms first-issuance applicability
- Expected Output: Verified Fact
- Failure Output: Unknown (lookup inconclusive)
- Escalation Condition: A prior record is found unexpectedly (citizen may need Renewal/Reissue instead)
- Human Override: Officer confirms correct procedure
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Medium
- Future Verification Required: Yes

**EXCEPTION_FIRST_ISSUANCE_ADULT_NO_PRIOR_ID**
- Purpose: Flag the edge case of an adult citizen with no prior identity record.
- Priority: 50 (Exception tier — overrides standard Eligibility per `RULE_ENGINE_SPECIFICATION.md` §4's Conflict Resolution Matrix)
- Rule Type: Exception
- Inputs: Citizen age, absence of prior record
- Evaluation Logic: If citizen age is well past the standard qualifying age with no prior record, this is not the standard path
- Expected Output: Escalate
- Failure Output: N/A
- Escalation Condition: Always, when triggered
- Human Override: N/A — this rule's entire purpose is to force human review
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Medium (that this is genuinely an edge case), Low (legal basis)
- Future Verification Required: Yes

**VALIDATION_BIRTH_CERTIFICATE**
- Purpose: Confirm the provided birth certificate matches the required type and citizen identity.
- Priority: 210 | Rule Type: Validation
- Inputs: `BIRTH_CERTIFICATE` document data
- Evaluation Logic: Type match + name/DOB consistency (delegates to `RULE_IDENTITY_CONSISTENCY`)
- Expected Output: Verified Fact (Complete, per Volume 42)
- Failure Output: Missing / Invalid (per Volume 42's status set)
- Escalation Condition: Document present but identity fields conflict unresolvably
- Human Override: Officer may accept an alternative civil registration record
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Medium
- Future Verification Required: Yes

**FEE_FIRST_ISSUANCE**
- Purpose: State the applicable fee honestly.
- Priority: 260 | Rule Type: Time (fee/administrative, evaluated alongside Time-category rules)
- Inputs: Procedure's `governmentFees` field
- Evaluation Logic: If unverified, disclose as such rather than stating a specific figure
- Expected Output: Verified Fact (the disclosure)
- Failure Output: N/A
- Escalation Condition: None specific
- Human Override: Officer may confirm actual current fee
- Legal Citation: `THONG_TU_LE_PHI_CCCD` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Low (fee amount, commonly reported as free for the standard case, unconfirmed), High (disclosure logic)
- Future Verification Required: Yes

### Rule Dependency Graph
```
ELIGIBILITY_FIRST_ISSUANCE_AGE
        │
        ▼
ELIGIBILITY_FIRST_ISSUANCE_NO_PRIOR_RECORD ──► EXCEPTION_FIRST_ISSUANCE_ADULT_NO_PRIOR_ID
        │
        ▼
VALIDATION_BIRTH_CERTIFICATE (depends on RULE_IDENTITY_CONSISTENCY)
        │
        ▼
FEE_FIRST_ISSUANCE, RULE_PHOTO_SPEC, RULE_RESIDENCE_DIGITAL_LOOKUP (parallel, no inter-dependency)
```

### Known Limitations
No age threshold, fee, or processing time is verified. The adult-with-no-prior-record exception's exact legal treatment is unconfirmed.

### Future Expansion
Once a real biometric capture step exists, a `VALIDATION_BIOMETRIC_ENROLLMENT` rule should be added, distinct from the photo check.

---

## Procedure: CCCD_RENEWAL

### Procedure Overview
- **Business Goal:** Ensure a citizen's identity document remains currently valid.
- **Applicable Citizens:** Citizens whose card is expired, expiring, or due for age-based renewal.
- **Trigger Conditions:** Citizen message matches `EXPIRED_CITIZEN_ID`.
- **Exit Conditions:** `COMPLETED` on issuance, or `REJECTED` with stated reason.
- **Required Documents:** `CURRENT_ID_DOCUMENT`, `APPLICATION_FORM`
- **Optional Documents:** `HOUSEHOLD_REGISTRATION_EXTRACT`
- **Shared Rules Applied:** Same seven as `CCCD_FIRST_ISSUANCE`, above.

### Rules

**ELIGIBILITY_RENEWAL_PRIOR_RECORD**
- Purpose: Confirm a genuine prior Căn cước/CCCD record exists.
- Priority: 100 | Rule Type: Eligibility
- Inputs: Memory Subsystem lookup
- Evaluation Logic: Prior record found and belongs to this citizen
- Expected Output: Verified Fact
- Failure Output: Unknown (no record found — may actually need `CCCD_FIRST_ISSUANCE`)
- Escalation Condition: No prior record found despite citizen expecting renewal
- Human Override: Officer redirects to correct procedure
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Medium
- Future Verification Required: Yes

**AGE_RENEWAL_CYCLE**
- Purpose: Determine whether the citizen has reached a mandatory renewal age milestone.
- Priority: 105 | Rule Type: Age
- Inputs: `citizen.dateOfBirth`, current date
- Evaluation Logic: Age matches a milestone (commonly cited as 25, 40, 60)
- Expected Output: Verified Fact
- Failure Output: Unknown (exact milestone ages/any recent amendment unverified)
- Escalation Condition: Age is ambiguously close to a milestone under an unconfirmed rule
- Human Override: Officer confirms applicability
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Low (specific ages), Medium (that milestones exist)
- Future Verification Required: Yes

**EXCEPTION_RENEWAL_EARLY_WINDOW**
- Purpose: Determine whether early renewal (before actual expiry) is permitted and within window.
- Priority: 55 | Rule Type: Exception
- Inputs: Card expiry date, current date
- Evaluation Logic: Current date within an accepted pre-expiry window
- Expected Output: Verified Fact (if within window) or Escalate (if outside and citizen insists on urgency)
- Failure Output: Unknown — exact window length unverified
- Escalation Condition: Citizen requests renewal well outside any plausible window
- Human Override: Officer may accept an early renewal request at discretion
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Low
- Future Verification Required: Yes

**VALIDATION_CURRENT_ID_DOCUMENT**
- Purpose: Confirm the current/prior ID document genuinely belongs to this citizen.
- Priority: 210 | Rule Type: Validation
- Inputs: `CURRENT_ID_DOCUMENT` data
- Evaluation Logic: Type match + identity consistency (delegates to `RULE_IDENTITY_CONSISTENCY`)
- Expected Output: Verified Fact (Complete)
- Failure Output: Invalid / Missing
- Escalation Condition: Document illegible and database lookup also inconclusive
- Human Override: Officer verifies manually
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Medium
- Future Verification Required: Yes

**FEE_RENEWAL**
- Purpose: State the applicable renewal fee honestly.
- Priority: 260 | Rule Type: Time
- Inputs: Procedure's `governmentFees` field
- Evaluation Logic: Disclose as unverified
- Expected Output: Verified Fact (the disclosure)
- Failure Output: N/A
- Escalation Condition: None specific
- Human Override: Officer confirms actual fee
- Legal Citation: `THONG_TU_LE_PHI_CCCD` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Low (amount), High (disclosure logic)
- Future Verification Required: Yes

### Rule Dependency Graph
```
ELIGIBILITY_RENEWAL_PRIOR_RECORD ──► AGE_RENEWAL_CYCLE ──► EXCEPTION_RENEWAL_EARLY_WINDOW
        │
        ▼
VALIDATION_CURRENT_ID_DOCUMENT (depends on RULE_IDENTITY_CONSISTENCY)
        │
        ▼
FEE_RENEWAL, RULE_PHOTO_SPEC, RULE_RESIDENCE_DIGITAL_LOOKUP (parallel)
```

### Known Limitations
Milestone ages, early-renewal window length, and fee are all unverified.

### Future Expansion
A dedicated rule distinguishing "renewal due to age milestone" from "renewal due to expiry" would let the response explain *why* renewal applies more precisely.

---

## Procedure: CCCD_REPLACEMENT

### Procedure Overview
- **Business Goal:** Keep a citizen's ID physically usable and factually accurate between renewal cycles.
- **Applicable Citizens:** Citizens with a damaged card or an officially-recorded information change.
- **Trigger Conditions:** Citizen message matches `CHANGE_OF_NAME`, or a damage-specific expression (not yet a named Life Event — see Known Limitations).
- **Exit Conditions:** `COMPLETED` on issuance, or `REJECTED` with stated reason.
- **Required Documents:** `CURRENT_ID_DOCUMENT`, `APPLICATION_FORM`, `DAMAGE_OR_CHANGE_EVIDENCE`
- **Optional Documents:** `HOUSEHOLD_REGISTRATION_EXTRACT`
- **Shared Rules Applied:** Same seven as `CCCD_FIRST_ISSUANCE`, above.

### Rules

**ELIGIBILITY_REPLACEMENT_DAMAGE_OR_CHANGE**
- Purpose: Confirm the citizen has either a damaged card or an official information change, not neither.
- Priority: 100 | Rule Type: Eligibility
- Inputs: Citizen-stated reason, `DAMAGE_OR_CHANGE_EVIDENCE`
- Evaluation Logic: Exactly one branch (damage or change) is confirmed
- Expected Output: Verified Fact
- Failure Output: Unknown (reason unclear — neither branch confirmed)
- Escalation Condition: Neither branch resolves clearly
- Human Override: Officer determines correct branch
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Medium
- Future Verification Required: Yes

**EXCEPTION_REPLACEMENT_MUTUALLY_EXCLUSIVE_BRANCH**
- Purpose: Prevent both damage and information-change branches from being required simultaneously.
- Priority: 50 | Rule Type: Exception
- Inputs: Both branch determinations
- Evaluation Logic: If both branches appear to apply at once, this is a data inconsistency, not a citizen with two needs
- Expected Output: Escalate
- Failure Output: N/A
- Escalation Condition: Both branches confirmed simultaneously
- Human Override: N/A — always escalates
- Legal Citation: N/A — governance/data-integrity rule, not a legal requirement
- Current Verification Status: N/A | Confidence: High (internal logic)
- Future Verification Required: No

**VALIDATION_DAMAGE_OR_CHANGE_EVIDENCE**
- Purpose: Confirm the provided evidence matches the claimed branch.
- Priority: 210 | Rule Type: Validation
- Inputs: `DAMAGE_OR_CHANGE_EVIDENCE` document(s)
- Evaluation Logic: Type match to the specific branch claimed
- Expected Output: Verified Fact (Complete)
- Failure Output: Invalid / Missing
- Escalation Condition: Evidence provided doesn't clearly support either branch
- Human Override: Officer verifies manually
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Medium
- Future Verification Required: Yes

**FEE_REPLACEMENT**
- Purpose: State the applicable replacement fee honestly.
- Priority: 260 | Rule Type: Time
- Inputs: Procedure's `governmentFees` field
- Evaluation Logic: Disclose as unverified
- Expected Output: Verified Fact (the disclosure)
- Failure Output: N/A
- Escalation Condition: None specific
- Human Override: Officer confirms actual fee
- Legal Citation: `THONG_TU_LE_PHI_CCCD` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Low (amount), High (disclosure logic)
- Future Verification Required: Yes

### Rule Dependency Graph
```
ELIGIBILITY_REPLACEMENT_DAMAGE_OR_CHANGE ──► EXCEPTION_REPLACEMENT_MUTUALLY_EXCLUSIVE_BRANCH
        │
        ▼
VALIDATION_DAMAGE_OR_CHANGE_EVIDENCE (depends on RULE_IDENTITY_CONSISTENCY for the change branch)
        │
        ▼
FEE_REPLACEMENT, RULE_PHOTO_SPEC (parallel)
```

### Known Limitations
No dedicated Life Event currently names "damaged card" specifically (only `CHANGE_OF_NAME` exists in `knowledge/life-events/`) — Intent/Life Event Resolution (Volume 41 Stages 01–03) has no clean entry point for a damage-only case yet. No age rule applies to this procedure.

### Future Expansion
Author a `DAMAGED_ID_CARD` Life Event to give this procedure's damage branch its own entry point, symmetrical to how `CHANGE_OF_NAME` already serves the information-change branch.

---

## Procedure: CCCD_REISSUE

### Procedure Overview
- **Business Goal:** Restore a citizen's valid identity document after loss or theft.
- **Applicable Citizens:** Citizens whose card is lost, misplaced, or stolen.
- **Trigger Conditions:** Citizen message matches `LOST_WALLET`.
- **Exit Conditions:** `COMPLETED` on issuance, or `REJECTED` with stated reason.
- **Required Documents:** `LOSS_DECLARATION`, `APPLICATION_FORM`
- **Optional Documents:** `HOUSEHOLD_REGISTRATION_EXTRACT`
- **Shared Rules Applied:** Same seven as `CCCD_FIRST_ISSUANCE`, above.

### Rules

**ELIGIBILITY_REISSUE_LOSS_DECLARED**
- Purpose: Confirm a genuine loss declaration is on record.
- Priority: 100 | Rule Type: Eligibility
- Inputs: `LOSS_DECLARATION` document
- Evaluation Logic: Declaration present and internally consistent
- Expected Output: Verified Fact
- Failure Output: Unknown (declaration missing or incomplete)
- Escalation Condition: Declaration content is internally inconsistent or incomplete
- Human Override: Officer accepts or requests clarification
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Medium
- Future Verification Required: Yes

**EXCEPTION_REISSUE_SUSPECTED_THEFT**
- Purpose: Determine whether a police incident report is relevant (theft) versus not required (ordinary loss).
- Priority: 55 | Rule Type: Exception
- Inputs: Citizen's stated circumstances
- Evaluation Logic: Citizen indicates theft/robbery specifically
- Expected Output: Verified Fact (ordinary loss, no report needed) or Escalate (theft indicated)
- Failure Output: Unknown — exact conditions under which a report becomes required are unverified
- Escalation Condition: Theft, robbery, or personal-safety concern indicated
- Human Override: Officer determines whether a report is actually required
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Low
- Future Verification Required: Yes

**VALIDATION_LOSS_DECLARATION**
- Purpose: Confirm the declaration form is complete and internally consistent.
- Priority: 210 | Rule Type: Validation
- Inputs: `LOSS_DECLARATION` data
- Evaluation Logic: Required fields present, no internal contradiction
- Expected Output: Verified Fact (Complete)
- Failure Output: Invalid / Missing
- Escalation Condition: Declaration content itself raises a fraud concern (per `TRUST_CONSTITUTION.md` Ch. 6's Institutional Misuse risk — flagged for review, never acted on automatically)
- Human Override: Officer reviews and decides
- Legal Citation: `LUAT_CAN_CUOC_2023` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Medium
- Future Verification Required: Yes

**FEE_REISSUE**
- Purpose: State the applicable reissue fee honestly.
- Priority: 260 | Rule Type: Time
- Inputs: Procedure's `governmentFees` field
- Evaluation Logic: Disclose as unverified; do not assert reissue costs more than renewal without confirmation
- Expected Output: Verified Fact (the disclosure)
- Failure Output: N/A
- Escalation Condition: None specific
- Human Override: Officer confirms actual fee
- Legal Citation: `THONG_TU_LE_PHI_CCCD` — UNKNOWN, verified=false
- Current Verification Status: Not verified | Confidence: Low (amount), High (disclosure logic)
- Future Verification Required: Yes

### Rule Dependency Graph
```
ELIGIBILITY_REISSUE_LOSS_DECLARED ──► EXCEPTION_REISSUE_SUSPECTED_THEFT
        │
        ▼
VALIDATION_LOSS_DECLARATION
        │
        ▼
FEE_REISSUE, RULE_PHOTO_SPEC, RULE_RESIDENCE_DIGITAL_LOOKUP (parallel)
```

### Known Limitations
The theft-vs-loss distinction's exact legal threshold is unverified. No age rule applies.

### Future Expansion
Once `RECOVER_LOST_DOCUMENTS` (Goal layer) gains coverage for `DRIVER_LICENSE`/`HEALTH_INSURANCE_CARD`/`PASSPORT` procedures, this procedure's `EXCEPTION_REISSUE_SUSPECTED_THEFT` logic should be generalized into a shared rule reused by all of them, rather than reauthored per document type.

---

## Cross Procedure Matrix

| Dimension | CCCD_FIRST_ISSUANCE | CCCD_RENEWAL | CCCD_REPLACEMENT | CCCD_REISSUE |
|---|---|---|---|---|
| Eligibility basis | No prior record + age | Prior record + age/expiry | Prior record + damage/change | Prior record + loss declared |
| Shared Documents | `APPLICATION_FORM`, `HOUSEHOLD_REGISTRATION_EXTRACT` (optional, all four) | same | same | same |
| Shared Rules | All 7 shared rules | All 7 | All 7 | All 7 |
| Different Rules | Age gate is a *minimum* threshold | Age gate is a *cycle* (multiple milestones) | No age rule; branch-exclusive evidence | No age rule; theft/loss distinction |
| Different Exceptions | Adult-with-no-record edge case | Early-renewal window | Mutually-exclusive branch enforcement | Suspected-theft escalation |
| Officer Escalation | Age-edge-case, exception fires | Milestone ambiguity | Both branches firing at once | Suspected theft |
| Rule Reuse | Donates `RULE_IDENTITY_CONSISTENCY` pattern | Reuses identity/residence/photo | Reuses identity/residence/photo | Reuses identity/residence/photo |
| Future Reuse | — | — | `EXCEPTION_REISSUE_SUSPECTED_THEFT`-style logic could generalize | Candidate to generalize its theft-vs-loss logic across future lost-document procedures |

## Rule Statistics

| Metric | Count |
|---|---|
| Total Rules | 32 (7 shared + 25 procedure-specific: 5+5+4+4 = 18 listed individually, plus 7 shared referenced 4× each = 28 applications, 32 unique rule definitions) |
| Reusable Rules | 7 (Shared Rule Library) |
| Procedure-specific Rules | 18 |
| Shared Rules | 7 |
| Unknown Rules (citation unverified) | 25 of 32 carry an `UNKNOWN, verified=false` legal citation |
| Verified Rules | 0 |
| Future Rules (flagged for future authoring) | 3 (biometric enrollment validation; damaged-card Life Event-linked rule; generalized theft/loss exception) |

## Coverage Report

- **Missing Rules:** No rule yet handles OCR-extracted document quality flags (depends on Volume 16, not yet authored); no numeric confidence-floor threshold is set for `RULE_CONFIDENCE_MIN_AGGREGATION`'s escalation condition.
- **Missing Procedures:** All eleven `planned_not_yet_authored` procedures identified across the Life Event and Affected Asset layers (`DRIVER_LICENSE_REISSUE`, `HOUSEHOLD_REGISTRATION_UPDATE`, etc.) have no rule pack at all.
- **Missing Legal Sources:** No citation in this pack or `knowledge/citations/` is verified — this is the single largest coverage gap across the entire pilot.
- **Missing Citations:** Fee amounts, exact age milestones, exact processing-time figures, and the exact early-renewal window are all specifically unconfirmed.
- **Missing Validation:** No cross-document validation beyond simple identity consistency (Section: Future Multi-Document Comparison, per `DOCUMENT_GAP_ANALYSIS_ENGINE_SPECIFICATION.md` §12) exists yet.
- **Future Expansion:** Generalizing `EXCEPTION_REISSUE_SUSPECTED_THEFT`'s pattern; a `DAMAGED_ID_CARD` Life Event; a real numeric confidence floor.

---

## Known Risks

- **Zero rules in this pack carry a verified legal citation** — every eligibility, age, fee, and processing-time determination this pack can support today is honestly capped at Low-to-Medium confidence, exactly as `RULE_ENGINE_SPECIFICATION.md` §10 requires, but this means the pilot cannot yet make a single fully-confident legal claim.
- **`CCCD_REPLACEMENT`'s damage branch has no Life Event entry point**, meaning Volume 41's Stage 03 (Life Event Resolution) has no clean path to it today outside the `CHANGE_OF_NAME` framing — a real gap, not an oversight.
- **The Conflict Resolution Matrix's priority values in this pack (e.g., Exception rules at priority 50–55, Eligibility at 100–105) are illustrative defaults**, not yet reviewed by an Administrative Law Expert, consistent with the same open risk already flagged in `RULE_ENGINE_SPECIFICATION.md`.

## Recommendation

Prioritize legal verification of `knowledge/citations/`'s four entries before any further rule authoring — every unresolved "Unknown" in this pack traces back to one of those four citations, so verifying them once resolves dozens of individual rule-level gaps simultaneously, rather than chasing each rule's uncertainty independently.
