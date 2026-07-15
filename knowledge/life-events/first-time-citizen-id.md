---
lifeEventId: FIRST_TIME_CITIZEN_ID
citizenLanguage: "Getting my first ID / my child needs their first ID / Làm CCCD lần đầu"
typicalExpressions:
  - "I'm turning 14 soon, what do I need for my first ID?"
  - "My child needs to get their Citizen ID for the first time"
  - "Con tôi cần làm căn cước lần đầu"
  - "Tôi chưa từng có CCCD"
relatedProcedures:
  - { procedureId: "CCCD_FIRST_ISSUANCE", status: "in_library" }
priority: "Medium — usually plannable well ahead of the qualifying age milestone"
riskLevel: "Low"
recommendedFirstAction: "Confirm the birth certificate is on hand before anything else, since it is the one document this procedure requires that a citizen at this age is least likely to have handled personally before"
frequentlyForgottenDocuments: "Birth certificate (parents/guardians sometimes assume a household registration extract alone is sufficient — see CCCD_FIRST_ISSUANCE's Common Mistakes)"
commonMistakes:
  - "A parent assuming the entire process can be completed without the citizen present, when biometric capture requires their presence regardless of age"
escalationTriggers:
  - "The citizen has reached adulthood or a relevant age without any prior identity document on record — an edge case CCCD_FIRST_ISSUANCE itself flags as needing closer review"
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "High for the mapping itself; inherits CCCD_FIRST_ISSUANCE's own Medium/Unknown confidence for specific fees and timing"
---

# Life Event: First Time Citizen ID

## Why This Life Event Exists

Like `EXPIRED_CITIZEN_ID`, this is a direct single-procedure mapping — but framed differently because the citizen (or their parent, asking on their behalf) is far less likely to know what to expect, having never been through any government identity procedure before.

## Citizen Journey Notes

Directly reflects `CCCD_FIRST_ISSUANCE`'s own Citizen Journey section: this is very often someone's very first independent interaction with government process, and the design baseline should assume zero prior familiarity, not a lower level of it.
