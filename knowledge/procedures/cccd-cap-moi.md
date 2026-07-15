---
procedureId: CCCD_FIRST_ISSUANCE
officialName: "Cấp Căn cước lần đầu"
aliases: ["Cấp mới CCCD", "First-time CCCD", "First Citizen ID issuance", "Làm CCCD lần đầu"]
citizenFriendlyName: "Get my first Citizen ID (CCCD) / Làm thẻ Căn cước lần đầu"
responsibleAuthority: "Ministry of Public Security — Police Department for Administrative Management of Social Order (PC06); processed at provincial/district police"
requiredDocuments: ["BIRTH_CERTIFICATE", "APPLICATION_FORM"]
optionalDocuments: ["HOUSEHOLD_REGISTRATION_EXTRACT"]
governmentFees: "Unknown — commonly reported as free for citizens turning 14 for first issuance, but this is unverified against the current fee circular [cite: THONG_TU_LE_PHI_CCCD, verified: false]"
expectedProcessingTime: "Unknown precise figure — pending verification [cite: NGHI_DINH_HUONG_DAN_CAN_CUOC, verified: false]"
relatedProcedures: ["CCCD_RENEWAL"]
legalReferences: ["LUAT_CAN_CUOC_2023", "NGHI_DINH_HUONG_DAN_CAN_CUOC", "THONG_TU_ANH_CHAN_DUNG", "THONG_TU_LE_PHI_CCCD"]
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for process structure; Low/Unknown for exact fees, processing days, and article-level citations — none independently verified"
assumptions:
  - "Assumes the citizen is a Vietnamese national by birth or naturalization with an existing birth certificate or civil registration record; a distinct process may apply for citizens without such a record, which is out of scope for this initial pack."
  - "Assumes 14 as the standard first-issuance age milestone; exact current age and any exceptions unverified."
---

## Short Description

Issuing a Citizen ID (Căn cước / CCCD) to a citizen who has never held one before — most commonly a citizen reaching the qualifying age for the first time.

## Purpose

Establishes a citizen's first official identity document, which becomes the basis for nearly every other administrative interaction with government going forward.

## Applicable Citizens

- Citizens reaching the qualifying first-issuance age (commonly cited as 14) who have never previously held a Căn cước/CCCD.
- Vietnamese citizens who, for other reasons, have reached adulthood or a relevant age without a prior identity document on record (an edge case requiring closer review; process may differ from the standard path — **unverified**).
- **Not applicable** to a citizen who already holds a card that needs renewal, replacement, or reissue — see the corresponding procedure instead.

## Prerequisites

- A birth certificate or equivalent civil registration record establishing identity and citizenship.
- Residence information registered (or registrable) in the national population database.

## Processing Steps

1. Citizen (often accompanied by a parent/guardian, given the typical qualifying age of 14) submits the application form and birth certificate.
2. Receiving agency verifies identity and citizenship against civil registration and population database records.
3. Portrait photo and biometric data (fingerprint, and iris where applicable) are captured on-site — this is the citizen's first biometric enrollment.
4. Application is processed and the first card is produced.
5. Citizen (or guardian) collects the new card.

## Citizen Journey

For most citizens, this is their very first independent interaction with a government administrative process — often the first time they experience government as something either reassuringly simple or intimidatingly opaque. `CITIZEN_CONSTITUTION.md`'s Student persona describes exactly this moment: the system's design baseline should assume no prior familiarity with any bureaucratic process at all, not merely a lower level of it.

## Common Mistakes

- Arriving without the birth certificate, assuming a household registration extract alone is sufficient.
- Underestimating that biometric enrollment (fingerprint/iris) happens at this step, since this is the citizen's first time providing it.
- A parent/guardian assuming they can complete the process entirely on the citizen's behalf without the citizen present for biometric capture — presence is required for this specific step regardless of age.

## Typical Missing Documents

- Birth certificate left at home, especially if the family assumed only a household registration extract was needed.
- No prior photo ID at all to cross-reference, meaning any identity ambiguity (e.g., a name transliteration difference) takes longer to resolve than in renewal/replacement cases where a prior record exists.

## Frequently Asked Questions

**Q: Is first issuance free?**
A: Commonly reported as free for citizens reaching the qualifying age for the first time, but this is unverified against the current fee circular — do not state this as confirmed fact without verification.

**Q: Does a parent need to come too?**
A: Likely yes for a minor, but exact requirement and any age threshold for independent application is unverified.
