---
lifeEventId: MOVING_RESIDENCE
citizenLanguage: "I'm moving house / changing my address / Chuyển nhà / Thay đổi nơi cư trú"
typicalExpressions:
  - "I just moved to a new address, what do I need to update?"
  - "How do I register my new place of residence?"
  - "Tôi vừa chuyển nhà, cần đăng ký thường trú ở đâu"
relatedProcedures:
  - { procedureId: "RESIDENCE_REGISTRATION", status: "planned_not_yet_authored" }
  - { procedureId: "CITIZEN_INFORMATION_UPDATE", status: "planned_not_yet_authored" }
priority: "Medium — not usually urgent in itself, but other services (schooling, healthcare access, voting rolls) can depend on current residence records"
riskLevel: "Low"
recommendedFirstAction: "Register the new residence promptly even if no other service is immediately affected — this avoids the more common failure mode of realizing records are outdated only when another procedure unexpectedly needs them"
frequentlyForgottenDocuments: "Proof of the new residence (e.g., a lease or ownership document, exact accepted forms unverified) is commonly not on hand at the moment a citizen first asks about this"
commonMistakes:
  - "Assuming residence updates automatically once a citizen's mail or utility address changes"
  - "Not realizing this can also affect where certain other procedures (e.g., a future CCCD renewal) should be processed"
escalationTriggers:
  - "Citizen reports a dispute about their registered residence (e.g., contested tenancy)"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for structure; Low for exact required proof-of-residence documents, since RESIDENCE_REGISTRATION does not yet exist as an authored procedure"
---

# Life Event: Moving Residence

## Why This Life Event Exists

A quietly high-frequency life event that citizens rarely connect to a formal government procedure at all — "I moved" does not feel like it should require paperwork, which makes the AI proactively surfacing this life event's relevance more valuable than in cases where a citizen already suspects government involvement is required.

## Citizen Journey Notes

Low emotional stakes, but real practical consequences if skipped — the tone here should be light and efficient, not urgent, while still making clear why it's worth doing promptly.
