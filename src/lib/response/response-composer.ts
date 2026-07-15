import type { ProcedureRecognitionResult } from "@/lib/knowledge/procedure-recognizer";
import type { ProcedureCitationResult } from "@/lib/knowledge/legal-citation-resolver";
import type { ChecklistGenerationResult } from "@/lib/checklist/checklist-generator";

/**
 * Sprint 01E -- Natural Language Response (Response Composer).
 *
 * `ENGINEERING_SPRINT_01_SPECIFICATION.md` §12 specifies this as "the single
 * LLM call ... grounded exclusively in [01B/01C/01D's] outputs ... the LLM is
 * never the source of a legal or eligibility claim, only of its phrasing."
 *
 * This sandbox has no configured LLM provider, and this project's own
 * governance (`AI_OPERATING_SYSTEM.md`'s swappable-vendor principle;
 * `AI_ORCHESTRATION_SPECIFICATION.md` Vol. 47 Ch05's Capability Registry)
 * treats the generative call as a replaceable implementation detail behind a
 * stable interface, never something the surrounding architecture should be
 * built around. So this Composer is implemented as a **deterministic
 * template**, not a real model call: it phrases exactly the three grounded
 * inputs below and nothing else. This is a stricter, not a weaker,
 * satisfaction of Sprint 01E's own risk warning ("the single most important
 * thing to test adversarially ... never letting the LLM 'helpfully' embellish
 * beyond what 01B/01C/01D actually established") -- a template cannot
 * embellish. `composeResponse()`'s signature is the seam a real generative
 * call would later be substituted behind, unchanged for every caller.
 *
 * Never invents a procedure, citation, or document beyond what its three
 * inputs already state. Never presents an unverified citation as confirmed.
 */

export interface ComposedResponse {
  message: string;
  status: "ANSWERED" | "CLARIFYING_QUESTION";
  groundedProcedureId: string | null;
  groundedCitationIds: string[];
  groundedChecklistDocumentIds: string[];
}

/** English half of a bilingual "English / Vietnamese" authored string -- a mechanical split, never a rewording. */
function englishSegment(bilingualText: string): string {
  return bilingualText.split(" / ")[0]!.trim();
}

const PROCEDURE_DISPLAY_NAMES: Record<string, string> = {
  CCCD_RENEWAL: "Renew my Citizen ID (CCCD) / Gia hạn thẻ Căn cước của tôi",
  CCCD_FIRST_ISSUANCE: "Get my first Citizen ID (CCCD) / Làm thẻ Căn cước lần đầu",
  CCCD_REPLACEMENT: "Replace my Citizen ID because it's damaged or my information changed / Đổi thẻ Căn cước",
  CCCD_REISSUE: "Get a replacement for my lost Citizen ID / Xin cấp lại CCCD bị mất",
};

function composeClarifyingQuestion(): ComposedResponse {
  return {
    message:
      "I want to make sure I connect you with the right service before I go further. " +
      "Could you tell me a bit more about what's going on — for example, is your ID card " +
      "lost, expired, damaged, or is this your first time getting one?",
    status: "CLARIFYING_QUESTION",
    groundedProcedureId: null,
    groundedCitationIds: [],
    groundedChecklistDocumentIds: [],
  };
}

function composeCitationSection(citations: ProcedureCitationResult | null): string {
  if (!citations || citations.status === "NOT_FOUND" || citations.citations.length === 0) {
    return "I don't have a confirmed legal citation on file for this yet, so please don't take the details below as final until an officer reviews them.";
  }

  const lines = citations.citations.map((c) => {
    const name = c.sourceName ?? c.sourceId;
    const verification =
      c.citationLevel === "VERIFIED"
        ? "independently verified"
        : "not yet independently verified — treat as provisional";
    return `- ${name} (${verification})`;
  });

  return `This is grounded in the following legal source(s) on file:\n${lines.join("\n")}`;
}

function composeChecklistSection(checklist: ChecklistGenerationResult | null): string {
  if (!checklist || checklist.status !== "GENERATED" || checklist.items.length === 0) {
    return "I can't generate your document checklist yet — an officer will confirm exactly what you'll need.";
  }

  const required = checklist.items.filter((item) => !item.optional);
  const optional = checklist.items.filter((item) => item.optional);

  const lines: string[] = ["You'll likely need:"];
  for (const item of required) {
    lines.push(`- ${item.documentType}`);
  }
  if (optional.length > 0) {
    lines.push("You may also be asked for:");
    for (const item of optional) {
      lines.push(`- ${item.documentType}`);
    }
  }
  return lines.join("\n");
}

/**
 * Phrases the final citizen-facing turn response, grounded exclusively in
 * `recognition`, `citations`, and `checklist`. Never fabricates a claim none
 * of the three inputs already established.
 */
export function composeResponse(input: {
  recognition: ProcedureRecognitionResult;
  citations: ProcedureCitationResult | null;
  checklist: ChecklistGenerationResult | null;
}): ComposedResponse {
  const { recognition, citations, checklist } = input;

  if (recognition.status === "UNKNOWN" || !recognition.procedureId) {
    return composeClarifyingQuestion();
  }

  const displayName = PROCEDURE_DISPLAY_NAMES[recognition.procedureId];
  const procedureLine = displayName
    ? `I can help with: ${englishSegment(displayName)}.`
    : `I can help with this — matched procedure: ${recognition.procedureId}.`;

  const message = [
    procedureLine,
    "",
    composeCitationSection(citations),
    "",
    composeChecklistSection(checklist),
    "",
    "This is guidance to help you prepare, not a final decision — a human officer reviews every case.",
  ].join("\n");

  return {
    message,
    status: "ANSWERED",
    groundedProcedureId: recognition.procedureId,
    groundedCitationIds: citations?.citations.map((c) => c.citationId) ?? [],
    groundedChecklistDocumentIds: checklist?.items.map((item) => item.documentId) ?? [],
  };
}
