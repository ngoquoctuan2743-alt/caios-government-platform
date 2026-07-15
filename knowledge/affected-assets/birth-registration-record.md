---
assetId: BIRTH_REGISTRATION_RECORD
citizenFriendlyName: "Birth Registration Record / Giấy khai sinh đã đăng ký"
description: "The official civil registration record created when a birth is registered — the foundational record every other identity asset for that citizen builds on for the rest of their life."
typicalCitizenExpressions:
  - "registering the birth"
  - "đăng ký khai sinh"
relatedLifeEvents: ["BIRTH_OF_CHILD"]
relatedProcedures: ["BIRTH_REGISTRATION"]
governmentAuthority: "Commune/ward-level People's Committee (civil registration)"
priorityLevel: "High — time-bound legal deadline"
riskLevel: "Medium — real legal consequences attach to a missed deadline"
verificationNeeded: "Yes — exact deadline length is unverified"
escalationConditions: "Parents are not married; one parent is a foreign national; any custody-related ambiguity — identical to BIRTH_OF_CHILD's own escalation triggers"
dependencies: "None upstream; CITIZEN_REGISTRY_ENTRY and HEALTH_INSURANCE_CARD (for the child) both depend on this record existing first"
futureExpansionNotes: "The natural upstream anchor for a future 'Child's First Documents' bundle, once HEALTH_INSURANCE_REGISTRATION and any future child-specific procedures are authored"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for structure (directly reuses AI_OPERATING_SYSTEM.md's own worked example); Low for exact deadline"
---

# Affected Asset: Birth Registration Record

The upstream anchor of a small dependency chain within this pack — `CITIZEN_REGISTRY_ENTRY` and the child's `HEALTH_INSURANCE_CARD` both depend on this record existing first, making it a useful test case for how `Dependencies` fields should be read across files rather than only within one.
