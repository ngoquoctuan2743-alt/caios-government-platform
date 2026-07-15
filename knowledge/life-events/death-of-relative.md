---
lifeEventId: DEATH_OF_RELATIVE
citizenLanguage: "A family member passed away / I need to register a death / Người thân qua đời / Đăng ký khai tử"
typicalExpressions:
  - "My father passed away, what do I need to do?"
  - "I need to register my mother's death"
  - "Người thân tôi vừa mất, cần làm thủ tục gì"
relatedProcedures:
  - { procedureId: "DEATH_REGISTRATION", status: "planned_not_yet_authored" }
  - { procedureId: "HOUSEHOLD_REGISTRATION_UPDATE", status: "planned_not_yet_authored" }
  - { procedureId: "INHERITANCE_PROCEDURES", status: "planned_not_yet_authored" }
priority: "High — death registration is typically time-bound, and other matters (inheritance, benefits) often depend on it being completed first"
riskLevel: "Medium — primarily an emotional-harm risk if handled with the wrong tone, in addition to the administrative consequences of delay"
recommendedFirstAction: "Acknowledge the loss briefly and respectfully before any procedural detail, then state clearly what the single next step is — do not lead with process"
frequentlyForgottenDocuments: "A medical certificate of death from the attending facility is easy to overlook amid the immediate demands of the moment; family members are sometimes unsure who is the correct declarant"
commonMistakes:
  - "Delaying registration due to grief, without realizing other time-sensitive matters (benefits, inheritance, household updates) depend on it"
  - "Assuming inheritance matters are handled by the same process as death registration itself, when they are a distinct and often more complex procedure"
escalationTriggers:
  - "Any indication of citizen distress beyond ordinary grief — this life event's threshold for escalating to a human is deliberately lower than any other in this pack"
  - "Complex or disputed inheritance questions"
  - "Disputed family relationship to the deceased (affecting who may act as declarant)"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for structure; Low for exact deadline and required documents, since DEATH_REGISTRATION does not yet exist as an authored procedure"
---

# Life Event: Death of Relative

## Why This Life Event Exists

The most emotionally sensitive life event in this initial set, and treated accordingly — this is the one entry in this pack where tone guidance is not a secondary note but the single most important field.

## Citizen Journey Notes

Per `CITIZEN_CONSTITUTION.md`'s "never judged," "always encouraging," and respect principles, this life event's escalation threshold is deliberately set lower than any other in this pack — not because the administrative content is unusually complex, but because a grieving citizen deserves a human's attention sooner rather than later, even for a routine question. This is a considered, explicit design choice, not an oversight in an otherwise-consistent escalation policy.
