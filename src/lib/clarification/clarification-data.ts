import { ASSETS } from "@/lib/knowledge/recognition-data";
import type { CitizenFacts } from "@/lib/eligibility/eligibility-engine";

/**
 * Sprint 02B -- Clarification Engine.
 *
 * Which facts are genuinely worth a conversational clarification question,
 * per recognized procedure, and why. This is a deliberate, disclosed
 * editorial selection over Sprint 02A's full Eligibility rule set
 * (`RULE_PACK_CCCD_PILOT.md`), not every missing eligibility fact --
 * documented explicitly below and in the sprint report, since the
 * underlying Specifications do not themselves spell out this selection.
 *
 * Principle applied to every inclusion/exclusion:
 * 1. Never ask for a fact already structurally implied by which Life Event
 *    Sprint 01B matched (e.g. `FIRST_TIME_CITIZEN_ID` already means
 *    "no prior record" by definition of that Life Event -- asking again
 *    would violate "never ask for information already known").
 * 2. Never ask for a fact that a required Document (Checklist Generation,
 *    Sprint 01D) will naturally supply instead (e.g. `LOSS_DECLARATION`,
 *    `DAMAGE_OR_CHANGE_EVIDENCE`) -- the pipeline can continue to Checklist
 *    without asking about these conversationally first.
 * 3. Never ask for a fact whose governing rule's own Rule Pack text already
 *    discloses the target value as unverified regardless (e.g.
 *    `AGE_RENEWAL_CYCLE`'s milestone ages) -- asking would not let that rule
 *    reach a more definitive resolution, so it is deferred, not asked here.
 * 4. Only ask for a fact that can move a genuinely blocking rule from
 *    Unknown to a definitive resolution the rest of the deterministic
 *    pipeline cannot otherwise obtain.
 */

export interface ClarificationRuleDefinition {
  factName: keyof CitizenFacts;
  ruleId: string;
  question: string;
}

export const PROCEDURE_CLARIFICATION_RULES: Record<string, ClarificationRuleDefinition[]> = {
  CCCD_FIRST_ISSUANCE: [
    {
      factName: "dateOfBirth",
      ruleId: "ELIGIBILITY_FIRST_ISSUANCE_AGE",
      question: "What is your date of birth?",
    },
  ],
  CCCD_RENEWAL: [
    {
      factName: "cardExpiryDate",
      ruleId: "EXCEPTION_RENEWAL_EARLY_WINDOW",
      question: "What is the expiry date printed on your CCCD?",
    },
  ],
  // hasPriorCccdRecord is implied by the matched CHANGE_OF_NAME Life Event
  // (this branch replaces an existing card); hasDamagedCard /
  // hasOfficialInformationChange are resolved via the required
  // DAMAGE_OR_CHANGE_EVIDENCE document (Sprint 01D), never asked here.
  CCCD_REPLACEMENT: [],
  // hasLossDeclaration is resolved via the required LOSS_DECLARATION
  // document (Sprint 01D). theftOrRobberyIndicated's absence does not block
  // the deterministic pipeline -- Checklist/Citation proceed identically
  // either way; the theft/loss distinction is deferred, not asked here.
  CCCD_REISSUE: [],
};

/**
 * Generic domain-relevance keywords for the "which CCCD procedure" question
 * (e.g. "I need a CCCD"), reused verbatim from the Knowledge Library's own
 * authored `CITIZEN_ID_CARD` asset (Sprint 01B's `recognition-data.ts`)
 * rather than inventing a new keyword list.
 */
export const CCCD_DOMAIN_KEYWORDS: string[] = [...ASSETS.CITIZEN_ID_CARD.matchPhrases, "cccd", "căn cước"];

export interface ProcedureDisambiguationOption {
  procedureId: string;
  /** Short label, matching each procedure's own citizenFriendlyName gloss. */
  label: string;
}

/** The 4 authored CCCD procedures, per `knowledge/life-events/index.json`'s procedureLibraryStatus.inLibrary. */
export const PROCEDURE_DISAMBIGUATION_OPTIONS: ProcedureDisambiguationOption[] = [
  { procedureId: "CCCD_FIRST_ISSUANCE", label: "First issuance" },
  { procedureId: "CCCD_RENEWAL", label: "Renewal" },
  { procedureId: "CCCD_REPLACEMENT", label: "Replacement" },
  { procedureId: "CCCD_REISSUE", label: "Reissue" },
];
