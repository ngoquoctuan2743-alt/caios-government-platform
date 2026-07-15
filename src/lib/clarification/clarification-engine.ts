import { recognizeProcedure } from "@/lib/knowledge/procedure-recognizer";
import { ELIGIBILITY_RULES } from "@/lib/eligibility/eligibility-data";
import type { CitizenFacts, ConfidenceLevel } from "@/lib/eligibility/eligibility-engine";
import {
  CCCD_DOMAIN_KEYWORDS,
  PROCEDURE_CLARIFICATION_RULES,
  PROCEDURE_DISAMBIGUATION_OPTIONS,
} from "./clarification-data";

/**
 * Sprint 02B -- Clarification Engine.
 *
 * Sits between Procedure Recognition (Sprint 01B) and Eligibility
 * Evaluation (Sprint 02A) in the pipeline. Determines only one thing: can
 * the pipeline continue as-is, or must the citizen answer another question
 * first? Pure deterministic logic -- no LLM, no fuzzy matching, no
 * embeddings, no text generation, no OCR, no persistence.
 *
 * Reuses Sprint 01B's `recognizeProcedure()` and Sprint 02A's rule metadata
 * directly rather than re-deriving procedure recognition or rule confidence.
 */

export type ClarificationStatus = "READY" | "NEEDS_CLARIFICATION" | "UNKNOWN";

export interface ClarificationQuestion {
  question: string;
  missingFact: string;
  /** The deterministic rule this question resolves, or "PROCEDURE_DISAMBIGUATION" when the question is about which procedure applies at all. */
  ruleId: string;
  traceability: string[];
}

export interface ClarificationResult {
  status: ClarificationStatus;
  procedureId: string | null;
  clarificationQuestions: ClarificationQuestion[];
  missingFacts: string[];
  confidence: ConfidenceLevel | null;
  traceability: string[];
}

function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function mentionsCccdDomain(message: string): boolean {
  const normalized = normalize(message);
  return CCCD_DOMAIN_KEYWORDS.some((keyword) => normalized.includes(normalize(keyword)));
}

const CONFIDENCE_RANK: Record<ConfidenceLevel, number> = { High: 0, Medium: 1, Low: 2 };

function worstConfidence(confidences: ConfidenceLevel[]): ConfidenceLevel | null {
  if (confidences.length === 0) return null;
  return confidences.reduce((worst, level) => (CONFIDENCE_RANK[level] > CONFIDENCE_RANK[worst] ? level : worst));
}

/**
 * Deterministically decides whether the pipeline may continue to Eligibility
 * Evaluation, or whether the citizen must be asked one or more questions
 * first. Never infers missing information, never guesses citizen intent,
 * never fabricates a fact -- every question corresponds to exactly one
 * missing fact, references exactly one rule, and is never asked when that
 * fact is already present in `facts`.
 */
export function evaluateClarification(citizenMessage: string, facts: CitizenFacts = {}): ClarificationResult {
  const recognition = recognizeProcedure(citizenMessage);

  if (recognition.status === "RECOGNIZED" && recognition.procedureId) {
    const clarificationRules = PROCEDURE_CLARIFICATION_RULES[recognition.procedureId] ?? [];

    const questions: ClarificationQuestion[] = clarificationRules
      .filter((rule) => facts[rule.factName] === undefined)
      .map((rule) => ({
        question: rule.question,
        missingFact: rule.factName,
        ruleId: rule.ruleId,
        traceability: ["RULE_PACK_CCCD_PILOT.md", rule.ruleId],
      }));

    if (questions.length === 0) {
      return {
        status: "READY",
        procedureId: recognition.procedureId,
        clarificationQuestions: [],
        missingFacts: [],
        confidence: "High",
        traceability: ["RULE_PACK_CCCD_PILOT.md", recognition.procedureId],
      };
    }

    return {
      status: "NEEDS_CLARIFICATION",
      procedureId: recognition.procedureId,
      clarificationQuestions: questions,
      missingFacts: questions.map((q) => q.missingFact),
      confidence: worstConfidence(
        questions
          .map((q) => ELIGIBILITY_RULES[q.ruleId]?.confidence)
          .filter((c): c is ConfidenceLevel => c !== undefined),
      ),
      traceability: ["RULE_PACK_CCCD_PILOT.md", ...questions.map((q) => q.ruleId)],
    };
  }

  // Recognition did not resolve to a specific procedure. If the message is
  // at least within the CCCD domain (a Goal matched, or a recognized
  // domain keyword appears), ask which of the 4 authored procedures
  // applies -- never guessed, always an explicit menu of real, authored
  // options.
  if (recognition.matchedGoalId !== null || mentionsCccdDomain(citizenMessage)) {
    const optionsLabel = PROCEDURE_DISAMBIGUATION_OPTIONS.map((option) => option.label).join("\n• ");
    return {
      status: "NEEDS_CLARIFICATION",
      procedureId: null,
      clarificationQuestions: [
        {
          question: `Are you applying for:\n• ${optionsLabel}?`,
          missingFact: "procedureSelection",
          ruleId: "PROCEDURE_DISAMBIGUATION",
          traceability: [
            "knowledge/life-events/index.json",
            ...PROCEDURE_DISAMBIGUATION_OPTIONS.map((option) => option.procedureId),
          ],
        },
      ],
      missingFacts: ["procedureSelection"],
      confidence: "Low",
      traceability: ["knowledge/life-events/index.json"],
    };
  }

  // No procedure, Goal, or recognized domain keyword at all -- genuinely
  // unknown; the engine has no traceable basis to ask a specific question.
  return {
    status: "UNKNOWN",
    procedureId: null,
    clarificationQuestions: [],
    missingFacts: [],
    confidence: null,
    traceability: [],
  };
}

/**
 * Prepares a plain, serializable payload shaped for a future Clarification
 * Audit Event, without writing one -- this sprint does not write Audit
 * Events, implement Notification, or implement Escalation.
 */
export function prepareClarificationAuditPayload(result: ClarificationResult): Record<string, unknown> {
  return {
    action: "clarification.evaluated",
    status: result.status,
    procedureId: result.procedureId,
    clarificationQuestions: result.clarificationQuestions,
    missingFacts: result.missingFacts,
    confidence: result.confidence,
    traceability: result.traceability,
  };
}
