---
goalId: HEALTHCARE
citizenFriendlyName: "Healthcare / Chăm sóc sức khỏe"
description: "The citizen wants to ensure they (or a family member) have valid health insurance coverage and access to care — currently only modeled for the newborn-enrollment case."
typicalCitizenExpressions:
  - "I need to sort out health insurance"
  - "Cần đăng ký bảo hiểm y tế"
relatedLifeEvents: ["BIRTH_OF_CHILD"]
relatedAffectedAssets: "Derived (see recover-lost-documents.md's Rule Note) -- HEALTH_INSURANCE_CARD, and transitively BIRTH_REGISTRATION_RECORD / CITIZEN_REGISTRY_ENTRY as its dependencies"
relatedProcedures: "Derived -- HEALTH_INSURANCE_REGISTRATION"
priority: "High — health access has direct wellbeing consequences"
urgency: "High for a newborn's first enrollment; unmodeled for any other healthcare scenario"
typicalJourney: "For the newborn case, follows BIRTH_OF_CHILD's own journey; for an adult managing their own ongoing coverage (a change in employment, a lapse, a general enrollment question), this pack currently has no coverage at all"
successDefinition: "Valid, current health insurance coverage confirmed for the specific person and situation in question — presently only demonstrable for a newborn"
commonObstacles: "A citizen asking a general healthcare-access question (unrelated to birth) will not currently be well served by this goal's coverage"
recommendedFirstAction: "For a newborn: proceed via BIRTH_OF_CHILD. For any other healthcare-access question: acknowledge the gap honestly rather than force-fit the newborn pathway to an unrelated situation"
futureExpansionNotes: "This goal is named far more broadly than its current single life event actually covers — a significant, clearly-flagged gap. Adult health insurance changes (new employment, lapse, category change at retirement) are natural next additions, and directly connect to the gaps already flagged in FIND_EMPLOYMENT and RETIRE."
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Low for overall goal coverage — only the newborn-specific slice is modeled; the goal as named is much broader"
---

# Goal: Healthcare

The clearest example in this set of a goal named broadly by the authoring brief but covered narrowly by the current knowledge graph — stated honestly here rather than allowed to imply broader readiness than actually exists. Its gap connects directly to the gaps already flagged in `find-employment.md` and `retire.md`.
