---
lifeEventId: EXPIRED_CITIZEN_ID
citizenLanguage: "My ID card is expiring / expired / CCCD của tôi hết hạn"
typicalExpressions:
  - "My ID card expires next month"
  - "I think my CCCD is already expired"
  - "CCCD của tôi sắp hết hạn"
  - "Tôi cần gia hạn căn cước"
relatedProcedures:
  - { procedureId: "CCCD_RENEWAL", status: "in_library" }
priority: "Medium by default; escalates to High if the citizen states a specific near-term need (travel, a bank or employment requirement) that depends on a valid card"
riskLevel: "Low if handled proactively; Medium once already expired, since some other services may refuse an expired card in the interim"
recommendedFirstAction: "Start the renewal process immediately regardless of stated urgency — early action is always correct here, since there is no scenario where renewing sooner is a mistake"
frequentlyForgottenDocuments: "None specific beyond CCCD_RENEWAL's own checklist — this life event maps to exactly one procedure with no additional documents of its own"
commonMistakes:
  - "Waiting until the card is already expired before starting, then being surprised the process isn't instantaneous"
  - "Not realizing the mandatory age-based renewal cycle can apply even if the printed expiry date hasn't passed yet"
escalationTriggers:
  - "Citizen states a hard deadline (e.g., a flight) that the stated processing time may not be able to meet"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "High for the mapping itself (single, direct, unambiguous procedure match); Low for any specific timing claim, which inherits CCCD_RENEWAL's own unverified processing-time field"
---

# Life Event: Expired Citizen ID

## Why This Life Event Exists

The simplest life event in this initial set — a single, direct, unambiguous mapping to one procedure. Included specifically to prove the Life Event layer correctly handles the trivial case without overcomplicating it, alongside the genuinely many-to-many cases elsewhere in this pack.

## Citizen Journey Notes

Mirrors `CCCD_RENEWAL`'s own Citizen Journey section directly — this life event does not add new emotional framing beyond what that procedure file already establishes, since it is simply the plain-language entry point into the same experience.
