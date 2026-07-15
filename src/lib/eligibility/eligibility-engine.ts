import {
  ADULT_EDGE_CASE_AGE_THRESHOLD,
  ELIGIBILITY_RULES,
  FIRST_ISSUANCE_QUALIFYING_AGE,
  PROCEDURE_ELIGIBILITY_RULES,
  RENEWAL_AGE_MILESTONES,
} from "./eligibility-data";

/**
 * Sprint 02A -- Eligibility Engine.
 *
 * Pure, deterministic evaluation only. No LLM, no fuzzy inference. Input is
 * a recognized Procedure ID (Sprint 01B's output) and whatever citizen facts
 * are already known -- this module never invents a missing fact and never
 * infers eligibility from an incomplete fact set, per
 * `AI_REASONING_PIPELINE_SPECIFICATION.md` (Vol. 41) Stage 06's own Failure
 * Modes ("Inferring eligibility from an incomplete fact set").
 *
 * Output status follows Stage 06 exactly: `eligible | not_eligible |
 * unknown_pending_fact` (named `ELIGIBLE | BLOCKED | UNKNOWN` here). A
 * missing fact always yields `UNKNOWN`, never a default. `BLOCKED` means a
 * deterministic rule concluded the citizen does not (or does not yet)
 * qualify, or an Exception rule fired requiring human review -- per this
 * sprint's own instruction, "Blocked means a deterministic rule failed."
 */

export type EligibilityDetermination = "ELIGIBLE" | "UNKNOWN" | "BLOCKED";
export type TriggeredRuleOutcome = "PASSED" | "FAILED" | "ESCALATE" | "UNKNOWN";

export interface CitizenFacts {
  dateOfBirth?: string; // ISO date string
  hasPriorCccdRecord?: boolean;
  cardExpiryDate?: string; // ISO date string
  hasDamagedCard?: boolean;
  hasOfficialInformationChange?: boolean;
  hasLossDeclaration?: boolean;
  theftOrRobberyIndicated?: boolean;
}

export interface TriggeredRule {
  ruleId: string;
  outcome: TriggeredRuleOutcome;
  reason: string;
  /** The rule's own transcribed confidence, per `eligibility-data.ts` -- null only for PROCEDURE_NOT_FOUND. */
  confidence: "High" | "Medium" | "Low" | null;
}

export type ConfidenceLevel = "High" | "Medium" | "Low";

export interface EligibilityEvaluationResult {
  procedureId: string;
  status: EligibilityDetermination | "PROCEDURE_NOT_FOUND";
  triggeredRules: TriggeredRule[];
  missingInformation: string[];
  /** min() across every triggered rule's confidence -- never averaged, per this project's standing propagation rule. Null only when no rule was evaluated at all. */
  confidence: ConfidenceLevel | null;
  traceability: string[];
}

const CONFIDENCE_RANK: Record<ConfidenceLevel, number> = { High: 0, Medium: 1, Low: 2 };

function worstConfidence(confidences: ConfidenceLevel[]): ConfidenceLevel | null {
  if (confidences.length === 0) return null;
  return confidences.reduce((worst, level) => (CONFIDENCE_RANK[level] > CONFIDENCE_RANK[worst] ? level : worst));
}

function ageInYears(dateOfBirth: string, asOf: Date): number {
  const dob = new Date(dateOfBirth);
  let age = asOf.getFullYear() - dob.getFullYear();
  const monthDiff = asOf.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && asOf.getDate() < dob.getDate())) {
    age -= 1;
  }
  return age;
}

function rule(ruleId: string): TriggeredRule["confidence"] {
  return ELIGIBILITY_RULES[ruleId]?.confidence ?? null;
}

function evaluateFirstIssuance(facts: CitizenFacts, asOf: Date): TriggeredRule[] {
  const results: TriggeredRule[] = [];

  if (facts.dateOfBirth === undefined) {
    results.push({
      ruleId: "ELIGIBILITY_FIRST_ISSUANCE_AGE",
      outcome: "UNKNOWN",
      reason: "dateOfBirth not on record.",
      confidence: rule("ELIGIBILITY_FIRST_ISSUANCE_AGE"),
    });
  } else {
    const age = ageInYears(facts.dateOfBirth, asOf);
    results.push({
      ruleId: "ELIGIBILITY_FIRST_ISSUANCE_AGE",
      outcome: age >= FIRST_ISSUANCE_QUALIFYING_AGE ? "PASSED" : "FAILED",
      reason:
        age >= FIRST_ISSUANCE_QUALIFYING_AGE
          ? `Age ${age} meets the qualifying first-issuance age (${FIRST_ISSUANCE_QUALIFYING_AGE}).`
          : `Age ${age} is below the qualifying first-issuance age (${FIRST_ISSUANCE_QUALIFYING_AGE}).`,
      confidence: rule("ELIGIBILITY_FIRST_ISSUANCE_AGE"),
    });
  }

  if (facts.hasPriorCccdRecord === undefined) {
    results.push({
      ruleId: "ELIGIBILITY_FIRST_ISSUANCE_NO_PRIOR_RECORD",
      outcome: "UNKNOWN",
      reason: "Prior-record lookup inconclusive.",
      confidence: rule("ELIGIBILITY_FIRST_ISSUANCE_NO_PRIOR_RECORD"),
    });
  } else {
    results.push({
      ruleId: "ELIGIBILITY_FIRST_ISSUANCE_NO_PRIOR_RECORD",
      outcome: facts.hasPriorCccdRecord ? "FAILED" : "PASSED",
      reason: facts.hasPriorCccdRecord
        ? "A prior record was found unexpectedly -- citizen may need CCCD_RENEWAL or CCCD_REISSUE instead."
        : "No prior record found; first-issuance applies.",
      confidence: rule("ELIGIBILITY_FIRST_ISSUANCE_NO_PRIOR_RECORD"),
    });
  }

  if (facts.dateOfBirth !== undefined && facts.hasPriorCccdRecord !== undefined) {
    const age = ageInYears(facts.dateOfBirth, asOf);
    if (age >= ADULT_EDGE_CASE_AGE_THRESHOLD && !facts.hasPriorCccdRecord) {
      results.push({
        ruleId: "EXCEPTION_FIRST_ISSUANCE_ADULT_NO_PRIOR_ID",
        outcome: "ESCALATE",
        reason: `Citizen is age ${age} (at or beyond the adult edge-case threshold) with no prior identity record -- not the standard first-issuance path.`,
        confidence: rule("EXCEPTION_FIRST_ISSUANCE_ADULT_NO_PRIOR_ID"),
      });
    }
  }

  return results;
}

function evaluateRenewal(facts: CitizenFacts, asOf: Date): TriggeredRule[] {
  const results: TriggeredRule[] = [];

  if (facts.hasPriorCccdRecord === undefined) {
    results.push({
      ruleId: "ELIGIBILITY_RENEWAL_PRIOR_RECORD",
      outcome: "UNKNOWN",
      reason: "Prior-record lookup inconclusive.",
      confidence: rule("ELIGIBILITY_RENEWAL_PRIOR_RECORD"),
    });
  } else {
    results.push({
      ruleId: "ELIGIBILITY_RENEWAL_PRIOR_RECORD",
      outcome: facts.hasPriorCccdRecord ? "PASSED" : "FAILED",
      reason: facts.hasPriorCccdRecord
        ? "A genuine prior record was found."
        : "No prior record found -- citizen may need CCCD_FIRST_ISSUANCE instead.",
      confidence: rule("ELIGIBILITY_RENEWAL_PRIOR_RECORD"),
    });
  }

  if (facts.dateOfBirth === undefined) {
    results.push({
      ruleId: "AGE_RENEWAL_CYCLE",
      outcome: "UNKNOWN",
      reason: "dateOfBirth not on record.",
      confidence: rule("AGE_RENEWAL_CYCLE"),
    });
  } else {
    const age = ageInYears(facts.dateOfBirth, asOf);
    const atMilestone = RENEWAL_AGE_MILESTONES.includes(age);
    results.push({
      ruleId: "AGE_RENEWAL_CYCLE",
      outcome: atMilestone ? "PASSED" : "UNKNOWN",
      reason: atMilestone
        ? `Age ${age} matches a mandatory renewal milestone (${RENEWAL_AGE_MILESTONES.join("/")}).`
        : `Age ${age} does not match a known renewal milestone -- renewal may still apply due to card expiry, which this rule does not evaluate.`,
      confidence: rule("AGE_RENEWAL_CYCLE"),
    });
  }

  if (facts.cardExpiryDate === undefined) {
    results.push({
      ruleId: "EXCEPTION_RENEWAL_EARLY_WINDOW",
      outcome: "UNKNOWN",
      reason: "cardExpiryDate not on record -- cannot determine whether this is an early-renewal request.",
      confidence: rule("EXCEPTION_RENEWAL_EARLY_WINDOW"),
    });
  } else {
    const expiry = new Date(facts.cardExpiryDate);
    if (asOf <= expiry) {
      // Early renewal request -- the Rule Pack itself states the exact
      // window length is unverified, so this can never be confirmed PASSED.
      results.push({
        ruleId: "EXCEPTION_RENEWAL_EARLY_WINDOW",
        outcome: "UNKNOWN",
        reason: "Card is not yet expired (early-renewal request); the accepted pre-expiry window length is unverified.",
        confidence: rule("EXCEPTION_RENEWAL_EARLY_WINDOW"),
      });
    }
    // If already expired, the early-window exception does not apply at all
    // -- correctly not triggered, per the Rule Pack's own scope for this rule.
  }

  return results;
}

function evaluateReplacement(facts: CitizenFacts): TriggeredRule[] {
  const results: TriggeredRule[] = [];

  if (facts.hasDamagedCard === undefined && facts.hasOfficialInformationChange === undefined) {
    results.push({
      ruleId: "ELIGIBILITY_REPLACEMENT_DAMAGE_OR_CHANGE",
      outcome: "UNKNOWN",
      reason: "Neither damage nor information-change status is on record.",
      confidence: rule("ELIGIBILITY_REPLACEMENT_DAMAGE_OR_CHANGE"),
    });
  } else {
    const damage = facts.hasDamagedCard === true;
    const change = facts.hasOfficialInformationChange === true;
    const exactlyOne = damage !== change && (damage || change);
    results.push({
      ruleId: "ELIGIBILITY_REPLACEMENT_DAMAGE_OR_CHANGE",
      outcome: exactlyOne ? "PASSED" : "FAILED",
      reason: exactlyOne
        ? `Confirmed branch: ${damage ? "damage" : "information change"}.`
        : "Neither a damaged card nor an official information change is confirmed.",
      confidence: rule("ELIGIBILITY_REPLACEMENT_DAMAGE_OR_CHANGE"),
    });

    if (damage && change) {
      results.push({
        ruleId: "EXCEPTION_REPLACEMENT_MUTUALLY_EXCLUSIVE_BRANCH",
        outcome: "ESCALATE",
        reason: "Both the damage and information-change branches appear to apply at once -- a data inconsistency, not a citizen with two needs.",
        confidence: rule("EXCEPTION_REPLACEMENT_MUTUALLY_EXCLUSIVE_BRANCH"),
      });
    }
  }

  return results;
}

function evaluateReissue(facts: CitizenFacts): TriggeredRule[] {
  const results: TriggeredRule[] = [];

  if (facts.hasLossDeclaration === undefined) {
    results.push({
      ruleId: "ELIGIBILITY_REISSUE_LOSS_DECLARED",
      outcome: "UNKNOWN",
      reason: "Loss declaration status not on record.",
      confidence: rule("ELIGIBILITY_REISSUE_LOSS_DECLARED"),
    });
  } else {
    results.push({
      ruleId: "ELIGIBILITY_REISSUE_LOSS_DECLARED",
      outcome: facts.hasLossDeclaration ? "PASSED" : "FAILED",
      reason: facts.hasLossDeclaration
        ? "A loss declaration is on record."
        : "No loss declaration on record.",
      confidence: rule("ELIGIBILITY_REISSUE_LOSS_DECLARED"),
    });
  }

  if (facts.theftOrRobberyIndicated === undefined) {
    results.push({
      ruleId: "EXCEPTION_REISSUE_SUSPECTED_THEFT",
      outcome: "UNKNOWN",
      reason: "Whether theft/robbery is indicated is not on record.",
      confidence: rule("EXCEPTION_REISSUE_SUSPECTED_THEFT"),
    });
  } else if (facts.theftOrRobberyIndicated) {
    results.push({
      ruleId: "EXCEPTION_REISSUE_SUSPECTED_THEFT",
      outcome: "ESCALATE",
      reason: "Citizen indicated theft, robbery, or a personal-safety concern.",
      confidence: rule("EXCEPTION_REISSUE_SUSPECTED_THEFT"),
    });
  } else {
    results.push({
      ruleId: "EXCEPTION_REISSUE_SUSPECTED_THEFT",
      outcome: "PASSED",
      reason: "Ordinary loss indicated; no police report required.",
      confidence: rule("EXCEPTION_REISSUE_SUSPECTED_THEFT"),
    });
  }

  return results;
}

function deriveStatus(triggeredRules: TriggeredRule[]): EligibilityDetermination {
  if (triggeredRules.some((r) => r.outcome === "ESCALATE" || r.outcome === "FAILED")) {
    return "BLOCKED";
  }
  if (triggeredRules.some((r) => r.outcome === "UNKNOWN")) {
    return "UNKNOWN";
  }
  return "ELIGIBLE";
}

/**
 * Deterministically evaluates whether the citizen qualifies for the given
 * recognized Procedure, per `AI_REASONING_PIPELINE_SPECIFICATION.md` Stage
 * 06. Never infers eligibility from an incomplete fact set, never fabricates
 * a missing fact -- an unknown fact always yields UNKNOWN for the rule(s)
 * that depend on it.
 */
export function evaluateEligibility(
  procedureId: string,
  facts: CitizenFacts,
  asOf: Date = new Date(),
): EligibilityEvaluationResult {
  const applicableRuleIds = PROCEDURE_ELIGIBILITY_RULES[procedureId];

  if (!applicableRuleIds) {
    return {
      procedureId,
      status: "PROCEDURE_NOT_FOUND",
      triggeredRules: [],
      missingInformation: [],
      confidence: null,
      traceability: [],
    };
  }

  let triggeredRules: TriggeredRule[];
  switch (procedureId) {
    case "CCCD_FIRST_ISSUANCE":
      triggeredRules = evaluateFirstIssuance(facts, asOf);
      break;
    case "CCCD_RENEWAL":
      triggeredRules = evaluateRenewal(facts, asOf);
      break;
    case "CCCD_REPLACEMENT":
      triggeredRules = evaluateReplacement(facts);
      break;
    case "CCCD_REISSUE":
      triggeredRules = evaluateReissue(facts);
      break;
    default:
      triggeredRules = [];
  }

  const missingInformation = triggeredRules
    .filter((r) => r.outcome === "UNKNOWN")
    .map((r) => `${r.ruleId}: ${r.reason}`);

  const confidences = triggeredRules
    .map((r) => r.confidence)
    .filter((c): c is ConfidenceLevel => c !== null);

  return {
    procedureId,
    status: deriveStatus(triggeredRules),
    triggeredRules,
    missingInformation,
    confidence: worstConfidence(confidences),
    traceability: ["RULE_PACK_CCCD_PILOT.md", ...applicableRuleIds],
  };
}

/**
 * Prepares a plain, serializable payload shaped for a future Audit Event,
 * without writing one -- this sprint does not implement Notification or
 * Escalation, and does not call `writeAuditEvent` itself.
 */
export function prepareEligibilityAuditPayload(result: EligibilityEvaluationResult): Record<string, unknown> {
  return {
    action: "eligibility.evaluated",
    procedureId: result.procedureId,
    status: result.status,
    triggeredRules: result.triggeredRules,
    missingInformation: result.missingInformation,
    confidence: result.confidence,
    traceability: result.traceability,
  };
}
