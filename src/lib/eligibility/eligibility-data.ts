/**
 * Sprint 02A -- Eligibility Engine.
 *
 * Rule metadata transcribed directly from `RULE_PACK_CCCD_PILOT.md`
 * (Volume 43) -- only the rules whose Rule Type is Eligibility, Age, or
 * Exception, since those are the rules `AI_REASONING_PIPELINE_SPECIFICATION.md`
 * (Volume 41) Stage 06 "Eligibility Evaluation" consumes. Validation, Time
 * (fee/processing-time disclosure), and the shared governance/escalation
 * rules (`RULE_PHOTO_SPEC`, `RULE_IDENTITY_CONSISTENCY`,
 * `RULE_RESIDENCE_DIGITAL_LOOKUP`, `RULE_ESCALATION_CANONICAL`,
 * `RULE_CONFIDENCE_MIN_AGGREGATION`, `RULE_OFFICER_REVIEW_MANDATORY`,
 * `RULE_PROCESSING_TIME_DISCLOSURE`) belong to later stages (Checklist
 * Generation, Legal Citation Retrieval) or are cross-cutting governance
 * rules this Specification-scoped sprint does not re-derive.
 *
 * Nothing here is a new legal fact -- every Legal Citation and Confidence
 * value is transcribed verbatim from the Rule Pack.
 */

export interface EligibilityRuleDefinition {
  ruleId: string;
  ruleType: "Eligibility" | "Age" | "Exception";
  purpose: string;
  /** Verbatim from the Rule Pack -- a real citation ID + verified=false, or an explicit N/A for governance rules. */
  legalCitation: string;
  /** The primary confidence value governing this rule's own determination, transcribed from the Rule Pack (never upgraded). */
  confidence: "High" | "Medium" | "Low";
}

export const ELIGIBILITY_RULES: Record<string, EligibilityRuleDefinition> = {
  ELIGIBILITY_FIRST_ISSUANCE_AGE: {
    ruleId: "ELIGIBILITY_FIRST_ISSUANCE_AGE",
    ruleType: "Age",
    purpose: "Confirm the citizen has reached the qualifying first-issuance age.",
    legalCitation: "LUAT_CAN_CUOC_2023 — UNKNOWN, verified=false",
    confidence: "Low",
  },
  ELIGIBILITY_FIRST_ISSUANCE_NO_PRIOR_RECORD: {
    ruleId: "ELIGIBILITY_FIRST_ISSUANCE_NO_PRIOR_RECORD",
    ruleType: "Eligibility",
    purpose: "Confirm no prior Căn cước/CCCD record exists for this citizen.",
    legalCitation: "LUAT_CAN_CUOC_2023 — UNKNOWN, verified=false",
    confidence: "Medium",
  },
  EXCEPTION_FIRST_ISSUANCE_ADULT_NO_PRIOR_ID: {
    ruleId: "EXCEPTION_FIRST_ISSUANCE_ADULT_NO_PRIOR_ID",
    ruleType: "Exception",
    purpose: "Flag the edge case of an adult citizen with no prior identity record.",
    legalCitation: "LUAT_CAN_CUOC_2023 — UNKNOWN, verified=false",
    confidence: "Medium",
  },
  ELIGIBILITY_RENEWAL_PRIOR_RECORD: {
    ruleId: "ELIGIBILITY_RENEWAL_PRIOR_RECORD",
    ruleType: "Eligibility",
    purpose: "Confirm a genuine prior Căn cước/CCCD record exists.",
    legalCitation: "LUAT_CAN_CUOC_2023 — UNKNOWN, verified=false",
    confidence: "Medium",
  },
  AGE_RENEWAL_CYCLE: {
    ruleId: "AGE_RENEWAL_CYCLE",
    ruleType: "Age",
    purpose: "Determine whether the citizen has reached a mandatory renewal age milestone.",
    legalCitation: "LUAT_CAN_CUOC_2023 — UNKNOWN, verified=false",
    confidence: "Low",
  },
  EXCEPTION_RENEWAL_EARLY_WINDOW: {
    ruleId: "EXCEPTION_RENEWAL_EARLY_WINDOW",
    ruleType: "Exception",
    purpose: "Determine whether early renewal (before actual expiry) is permitted and within window.",
    legalCitation: "LUAT_CAN_CUOC_2023 — UNKNOWN, verified=false",
    confidence: "Low",
  },
  ELIGIBILITY_REPLACEMENT_DAMAGE_OR_CHANGE: {
    ruleId: "ELIGIBILITY_REPLACEMENT_DAMAGE_OR_CHANGE",
    ruleType: "Eligibility",
    purpose: "Confirm the citizen has either a damaged card or an official information change, not neither.",
    legalCitation: "LUAT_CAN_CUOC_2023 — UNKNOWN, verified=false",
    confidence: "Medium",
  },
  EXCEPTION_REPLACEMENT_MUTUALLY_EXCLUSIVE_BRANCH: {
    ruleId: "EXCEPTION_REPLACEMENT_MUTUALLY_EXCLUSIVE_BRANCH",
    ruleType: "Exception",
    purpose: "Prevent both damage and information-change branches from being required simultaneously.",
    legalCitation: "N/A — governance/data-integrity rule, not a legal requirement",
    confidence: "High",
  },
  ELIGIBILITY_REISSUE_LOSS_DECLARED: {
    ruleId: "ELIGIBILITY_REISSUE_LOSS_DECLARED",
    ruleType: "Eligibility",
    purpose: "Confirm a genuine loss declaration is on record.",
    legalCitation: "LUAT_CAN_CUOC_2023 — UNKNOWN, verified=false",
    confidence: "Medium",
  },
  EXCEPTION_REISSUE_SUSPECTED_THEFT: {
    ruleId: "EXCEPTION_REISSUE_SUSPECTED_THEFT",
    ruleType: "Exception",
    purpose: "Determine whether a police incident report is relevant (theft) versus not required (ordinary loss).",
    legalCitation: "LUAT_CAN_CUOC_2023 — UNKNOWN, verified=false",
    confidence: "Low",
  },
};

/** Which Eligibility/Age/Exception rules apply to each procedure, in evaluation order, per the Rule Pack's own Rule Dependency Graph for each procedure. */
export const PROCEDURE_ELIGIBILITY_RULES: Record<string, string[]> = {
  CCCD_FIRST_ISSUANCE: [
    "ELIGIBILITY_FIRST_ISSUANCE_AGE",
    "ELIGIBILITY_FIRST_ISSUANCE_NO_PRIOR_RECORD",
    "EXCEPTION_FIRST_ISSUANCE_ADULT_NO_PRIOR_ID",
  ],
  CCCD_RENEWAL: ["ELIGIBILITY_RENEWAL_PRIOR_RECORD", "AGE_RENEWAL_CYCLE", "EXCEPTION_RENEWAL_EARLY_WINDOW"],
  CCCD_REPLACEMENT: [
    "ELIGIBILITY_REPLACEMENT_DAMAGE_OR_CHANGE",
    "EXCEPTION_REPLACEMENT_MUTUALLY_EXCLUSIVE_BRANCH",
  ],
  CCCD_REISSUE: ["ELIGIBILITY_REISSUE_LOSS_DECLARED", "EXCEPTION_REISSUE_SUSPECTED_THEFT"],
};

/** Commonly-cited qualifying age for first issuance -- unverified article-level figure, per the Rule Pack's own disclosure. */
export const FIRST_ISSUANCE_QUALIFYING_AGE = 14;

/** Deterministic threshold used only to detect the "well past" adult edge case -- the Rule Pack gives no exact figure for this; see Known Issues. */
export const ADULT_EDGE_CASE_AGE_THRESHOLD = 18;

/** Commonly-cited mandatory renewal age milestones -- unverified, per the Rule Pack's own disclosure. */
export const RENEWAL_AGE_MILESTONES = [25, 40, 60];
