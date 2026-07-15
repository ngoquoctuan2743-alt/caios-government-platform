---
assetId: HOUSEHOLD_INFORMATION
citizenFriendlyName: "Household Information / Thông tin hộ gia đình"
description: "The record of who belongs to a citizen's household in the national population database — added to at marriage and birth, updated at death, and re-anchored when a household moves."
typicalCitizenExpressions:
  - "my household registration"
  - "hộ khẩu của tôi"
  - "cập nhật thông tin hộ gia đình"
relatedLifeEvents: ["MARRIAGE", "BIRTH_OF_CHILD", "DEATH_OF_RELATIVE", "MOVING_RESIDENCE", "CHANGE_OF_NAME"]
relatedProcedures: ["HOUSEHOLD_REGISTRATION_UPDATE"]
governmentAuthority: "Commune/ward-level police (residence and household management)"
priorityLevel: "Medium, except High in the Birth of Child context where it interacts with a legally time-bound registration"
riskLevel: "Low to Medium — an outdated household record can surface as friction in unrelated later procedures"
verificationNeeded: "Yes — exact update triggers and any locality-specific variation are unverified"
escalationConditions: "Disputed household composition (e.g., contested inclusion or removal of a member)"
dependencies: "Birth-related updates depend on BIRTH_REGISTRATION_RECORD; death-related updates depend on DEATH_REGISTRATION_RECORD"
futureExpansionNotes: "The single busiest node in this entire Affected Assets layer (five life events) — the strongest evidence in this pack for why one shared asset definition, not five duplicated ones, was the correct design choice"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for structure; Low for the related procedure, which is not yet authored"
---

# Affected Asset: Household Information

The most-connected asset in this pack. Five separate life events touch it, and every one of them references this single file rather than five independent descriptions of what a household record update involves — the direct, load-bearing example of this layer's "no duplicated information" rule actually doing work.
