import { recognizeProcedure } from "@/lib/knowledge/procedure-recognizer";
import { resolveCitationsForProcedure } from "@/lib/knowledge/legal-citation-resolver";
import { generateChecklist } from "@/lib/checklist/checklist-generator";
import { composeResponse, type ComposedResponse } from "./response-composer";

/**
 * Sprint 01E -- Natural Language Response (pipeline wiring).
 *
 * The real, deterministic first-turn pipeline this sprint exists to wire
 * together, per `SPRINT_BREAKDOWN.md`'s diagram:
 *
 *   Citizen Message -> 01B Procedure Recognition -> 01C Citation Resolution
 *     -> 01D Checklist Generation -> 01E Natural Language Response
 *
 * No LLM call, no fuzzy inference anywhere in this chain -- every step is
 * the pure, already-verified function built in its own sprint.
 *
 * Eligibility note: `generateChecklist()` requires an eligibility result,
 * but no Eligibility Check module exists yet anywhere in this project (it is
 * not one of Sprints 01A-01E, and `ENGINEERING_SPRINT_01_SPECIFICATION.md`
 * §12 lists it as a distinct backend responsibility this sprint set does not
 * implement). This pipeline passes a fixed `{ status: "ELIGIBLE" }` so the
 * checklist stage can run end-to-end for this sprint's demo scope -- this is
 * a deliberate, explicitly-flagged stand-in, not a real eligibility
 * determination, and must not be read as this pipeline having verified
 * anything about the citizen's actual eligibility.
 */
export function generateTurnResponse(citizenMessage: string): ComposedResponse {
  const recognition = recognizeProcedure(citizenMessage);

  if (recognition.status === "UNKNOWN" || !recognition.procedureId) {
    return composeResponse({ recognition, citations: null, checklist: null });
  }

  const citations = resolveCitationsForProcedure(recognition.procedureId);
  const checklist = generateChecklist(recognition.procedureId, { status: "ELIGIBLE" });

  return composeResponse({ recognition, citations, checklist });
}
