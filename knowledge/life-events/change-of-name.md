---
lifeEventId: CHANGE_OF_NAME
citizenLanguage: "I legally changed my name / Tôi đổi tên hợp pháp"
typicalExpressions:
  - "I legally changed my name, what do I need to update?"
  - "My court-approved name change just went through"
  - "Tôi vừa đổi tên, cần cập nhật CCCD không"
relatedProcedures:
  - { procedureId: "CCCD_REPLACEMENT", status: "in_library" }
  - { procedureId: "CITIZEN_INFORMATION_UPDATE", status: "planned_not_yet_authored" }
  - { procedureId: "HOUSEHOLD_REGISTRATION_UPDATE", status: "planned_not_yet_authored" }
priority: "Medium — not urgent in an emergency sense, but every day the ID remains unupdated is a day it doesn't match the citizen's other legal records"
riskLevel: "Low to Medium — a mismatch between ID and other legal documents can cause friction in unrelated future procedures until resolved"
recommendedFirstAction: "Confirm the underlying name change is already officially recorded (e.g., via court order or civil registration amendment) before starting the ID replacement — this procedure updates the ID to reflect an already-official change, it does not register the change itself"
frequentlyForgottenDocuments: "The official proof of the name change itself (see DAMAGE_OR_CHANGE_EVIDENCE) is the single most commonly forgotten item, since citizens sometimes assume stating the new name is sufficient"
commonMistakes:
  - "Attempting to update the ID before the underlying legal name change is officially finalized elsewhere"
  - "Not realizing household registration records also need updating separately"
escalationTriggers:
  - "The name change is contested or not yet finalized through the appropriate legal channel"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "High for the CCCD_REPLACEMENT mapping (direct, already authored); Low for the two follow-on placeholder procedures"
---

# Life Event: Change of Name

## Why This Life Event Exists

The cleanest example in this initial set of a life event connecting to an *already-authored* procedure (`CCCD_REPLACEMENT`) alongside still-unbuilt ones — proof that the Life Event layer can be partially useful today, not only once every downstream procedure exists.

## Citizen Journey Notes

Reflects `CCCD_REPLACEMENT`'s own information-change branch directly — the AI should recognize that this life event is often following an already-completed, sometimes personally significant legal process (a court-approved name change), and treat the ID update as the administrative follow-through, not the main event.
