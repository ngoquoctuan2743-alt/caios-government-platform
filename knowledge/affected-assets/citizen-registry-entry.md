---
assetId: CITIZEN_REGISTRY_ENTRY
citizenFriendlyName: "Citizen Registry Entry / Bản ghi trong cơ sở dữ liệu quốc gia về dân cư"
description: "The citizen's entry in the national population database itself — created at birth registration, and updated (not deleted) to reflect death when a citizen passes away."
typicalCitizenExpressions:
  - "my record in the system"
  - "thông tin của tôi trong cơ sở dữ liệu dân cư"
relatedLifeEvents: ["BIRTH_OF_CHILD", "DEATH_OF_RELATIVE"]
relatedProcedures: ["BIRTH_REGISTRATION", "DEATH_REGISTRATION"]
governmentAuthority: "Ministry of Public Security — national population database"
priorityLevel: "High in both directions — creation is time-bound at birth, and accurate deceased-status marking matters for downstream processes (benefits, inheritance, fraud prevention)"
riskLevel: "Medium — an inaccurate registry entry (in either direction) can cause downstream administrative harm"
verificationNeeded: "Yes — the exact update mechanics distinguishing 'created' from 'marked deceased' are unverified"
escalationConditions: "Same as BIRTH_REGISTRATION_RECORD and DEATH_REGISTRATION_RECORD respectively"
dependencies: "Creation depends on BIRTH_REGISTRATION_RECORD; the deceased-marking update depends on DEATH_REGISTRATION_RECORD"
futureExpansionNotes: "Modeled here as a single asset with two opposite-direction update triggers, rather than two separate assets, since it is genuinely the same underlying registry record across a citizen's lifetime — this is a deliberate design choice worth a reviewer's confirmation"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for structure; Low for exact mechanics of either update"
---

# Affected Asset: Citizen Registry Entry

The one asset in this pack deliberately spanning a citizen's entire lifetime — the same underlying record is created by `BIRTH_REGISTRATION` and, decades later, updated by `DEATH_REGISTRATION`. Modeling it as one asset rather than two makes that continuity explicit instead of accidental.
