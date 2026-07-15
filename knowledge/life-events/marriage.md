---
lifeEventId: MARRIAGE
citizenLanguage: "Getting married / just got married / Kết hôn"
typicalExpressions:
  - "I just got married, what do I need to update?"
  - "We're registering our marriage next month"
  - "Tôi mới kết hôn, cần làm thủ tục gì?"
  - "Đăng ký kết hôn cần giấy tờ gì"
relatedProcedures:
  - { procedureId: "MARRIAGE_REGISTRATION", status: "planned_not_yet_authored" }
  - { procedureId: "HOUSEHOLD_REGISTRATION_UPDATE", status: "planned_not_yet_authored" }
  - { procedureId: "TAX_INFORMATION_UPDATE", status: "planned_not_yet_authored" }
  - { procedureId: "CITIZEN_INFORMATION_UPDATE", status: "planned_not_yet_authored" }
priority: "Medium — administrative housekeeping following a positive life event, rarely urgent, but easy to forget once the immediate celebration has passed"
riskLevel: "Low, with one exception: unresolved household/tax registration can compound into confusion at a later, less convenient time (e.g., when applying for something else that depends on current marital status records)"
recommendedFirstAction: "Confirm whether civil marriage registration itself is already complete — if not, that is the prerequisite step before any of the follow-on updates apply"
frequentlyForgottenDocuments: "The marriage certificate itself is frequently not yet in hand when a citizen starts asking about follow-on updates, since registration and the follow-on administrative updates are often mentally treated as one single event by citizens even though they are procedurally sequential"
commonMistakes:
  - "Assuming a name change happens automatically as part of marriage registration — in Vietnam, spouses generally retain their own names, so this assumption should be corrected gently rather than acted on"
  - "Not realizing household registration and tax information updates are separate actions from the marriage registration itself"
escalationTriggers:
  - "Either party is a foreign national — a materially different legal path applies, per the same principle already established for domestic-vs-mixed-nationality cases in AI_OPERATING_SYSTEM.md's Marriage Registration workflow example"
  - "Any indication of a prior undissolved marriage on either side"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for the follow-on-updates framing; Low for exact procedure scope of each linked item, since none of the four related procedures exist yet in this pack's Procedure Library"
---

# Life Event: Marriage

## Why This Life Event Exists

The clearest example in this initial set of one life event fanning out to several procedures a citizen would not otherwise think to connect — "I got married" does not obviously imply "I need to update my tax information" to most citizens, but it does.

## Citizen Journey Notes

This life event should be handled with a warmer, more celebratory tone than most others in this pack — it is administrative housekeeping wrapped around a happy occasion, and the AI's framing should reflect that rather than treating it identically to a routine compliance update, per `CITIZEN_CONSTITUTION.md`'s persona-aware communication principle.

## Assumption Made

This pack assumes marriage registration itself may or may not already be complete when a citizen raises this life event, and treats the three follow-on updates as conditional on it being complete. This sequencing should be confirmed once `MARRIAGE_REGISTRATION` is authored as a full procedure.
