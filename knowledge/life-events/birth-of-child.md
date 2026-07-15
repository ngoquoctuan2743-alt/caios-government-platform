---
lifeEventId: BIRTH_OF_CHILD
citizenLanguage: "We just had a baby / registering my child's birth / Sinh con / Đăng ký khai sinh"
typicalExpressions:
  - "We just had a baby, what do we need to register?"
  - "How do I register my child's birth?"
  - "Chúng tôi vừa sinh con, cần đăng ký khai sinh"
relatedProcedures:
  - { procedureId: "BIRTH_REGISTRATION", status: "planned_not_yet_authored" }
  - { procedureId: "HOUSEHOLD_REGISTRATION_UPDATE", status: "planned_not_yet_authored" }
  - { procedureId: "HEALTH_INSURANCE_REGISTRATION", status: "planned_not_yet_authored" }
priority: "High — birth registration is time-sensitive against a legal deadline"
riskLevel: "Medium — real legal consequences attach to a missed registration deadline for the family, distinct from most other life events in this set where delay is merely inconvenient"
recommendedFirstAction: "Confirm the registration deadline first and state it clearly and immediately, ahead of any other detail — this is the one piece of information that must never be buried"
frequentlyForgottenDocuments: "The hospital-issued birth notification is sometimes not yet in hand when parents start asking, and the marriage certificate (where relevant to which parent registers) is easy to overlook in the emotional context of a new birth"
commonMistakes:
  - "Assuming the registration deadline is flexible or informal when it in fact carries real legal weight"
  - "Not realizing household registration and health insurance registration for the child are separate follow-on actions, not automatically completed alongside birth registration itself"
escalationTriggers:
  - "Parents are not married"
  - "One parent is a foreign national"
  - "Any custody-related ambiguity"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for structure and escalation triggers (directly reused from AI_OPERATING_SYSTEM.md's own Birth Registration workflow example); Low for exact deadline length and fee, both unverified"
---

# Life Event: Birth of Child

## Why This Life Event Exists

One of the two highest-stakes life events in this initial set (alongside Death of Relative), because a real legal deadline attaches to the core procedure — this is not a life event where "start whenever you're ready" is an acceptable framing.

## Citizen Journey Notes

`AI_OPERATING_SYSTEM.md` §8.3 already worked through this exact scenario in detail; this life event file exists specifically to be the plain-language front door into that same worked example, and its escalation triggers are deliberately identical to that example's, not independently re-derived.
