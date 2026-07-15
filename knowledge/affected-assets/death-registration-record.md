---
assetId: DEATH_REGISTRATION_RECORD
citizenFriendlyName: "Death Registration Record / Giấy chứng tử đã đăng ký"
description: "The official civil registration record created when a death is registered — the prerequisite for household record updates, benefit claims, and inheritance matters, none of which this system handles directly beyond the registration itself."
typicalCitizenExpressions:
  - "registering the death"
  - "đăng ký khai tử"
relatedLifeEvents: ["DEATH_OF_RELATIVE"]
relatedProcedures: ["DEATH_REGISTRATION"]
governmentAuthority: "Commune/ward-level People's Committee (civil registration)"
priorityLevel: "High — typically time-bound, and other matters depend on it being completed first"
riskLevel: "Medium — both administrative and emotional-harm risk if handled with the wrong tone or pace"
verificationNeeded: "Yes — exact deadline and accepted declarant relationships are unverified"
escalationConditions: "Any indication of citizen distress beyond ordinary grief; disputed family relationship to the deceased; complex or disputed inheritance questions — identical to DEATH_OF_RELATIVE's own escalation triggers"
dependencies: "None upstream; HOUSEHOLD_INFORMATION's death-related update and CITIZEN_REGISTRY_ENTRY's deceased-marking both depend on this record existing first"
futureExpansionNotes: "Inheritance and estate matters are explicitly not modeled as their own asset in this initial pack — they are noted only as a related, out-of-immediate-scope consequence, consistent with keeping this layer to concrete government-held records rather than open-ended legal proceedings"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for structure (reuses DEATH_OF_RELATIVE's own tone and escalation guidance); Low for exact deadline"
---

# Affected Asset: Death Registration Record

Carries the same deliberately lower escalation threshold as its parent life event, `DEATH_OF_RELATIVE` — this asset file does not restate that reasoning, it simply inherits it, consistent with this layer's "no duplicated information" rule.
