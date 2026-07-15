---
procedureId: CCCD_REISSUE
officialName: "Cấp lại Căn cước do bị mất"
aliases: ["Cấp lại CCCD", "Reissue CCCD", "CCCD reissue after loss", "Báo mất CCCD"]
citizenFriendlyName: "Get a replacement for my lost Citizen ID / Xin cấp lại CCCD bị mất"
responsibleAuthority: "Ministry of Public Security — Police Department for Administrative Management of Social Order (PC06); processed at provincial/district police"
requiredDocuments: ["LOSS_DECLARATION", "APPLICATION_FORM"]
optionalDocuments: ["HOUSEHOLD_REGISTRATION_EXTRACT"]
governmentFees: "Unknown — pending verification; reissue after loss is commonly reported to carry a different (often higher) fee than renewal, but this is unverified [cite: THONG_TU_LE_PHI_CCCD, verified: false]"
expectedProcessingTime: "Unknown precise figure — pending verification [cite: NGHI_DINH_HUONG_DAN_CAN_CUOC, verified: false]"
relatedProcedures: ["CCCD_RENEWAL", "CCCD_REPLACEMENT"]
legalReferences: ["LUAT_CAN_CUOC_2023", "NGHI_DINH_HUONG_DAN_CAN_CUOC", "THONG_TU_ANH_CHAN_DUNG", "THONG_TU_LE_PHI_CCCD"]
lastReviewed: "2026-07-14"
dataVersion: "0.1.0-draft"
confidenceLevel: "Medium for process structure; Low/Unknown for exact fees, processing days, and article-level citations — none independently verified"
assumptions:
  - "Assumes loss and theft are handled under one Reissue procedure, with theft cases sometimes additionally involving a police incident report per LOSS_DECLARATION's notes."
---

## Short Description

Reissuing a Citizen ID (Căn cước / CCCD) after the citizen's prior card has been lost or stolen and is no longer in their possession.

## Purpose

Restores a citizen's access to a valid identity document as quickly and painlessly as possible after a loss — a situation already stressful before any administrative process begins.

## Applicable Citizens

- Any citizen whose Căn cước/CCCD is lost, misplaced, or stolen.
- **Not applicable** where the card is still physically held but damaged — see `CCCD_REPLACEMENT` instead.
- **Not applicable** where the card is simply expired with no loss involved — see `CCCD_RENEWAL` instead.

## Prerequisites

- No physical prior card is required (by definition) — identity is instead confirmed via the national population database and the citizen's own declared information.
- Where theft is suspected, a police incident report may be additionally required in some localities — **unverified condition.**

## Processing Steps

1. Citizen submits a declaration of loss (`LOSS_DECLARATION`) and the application form.
2. Receiving agency verifies the citizen's identity via the population database rather than the (unavailable) physical card.
3. Photo and biometric data are re-captured (the prior biometric record is used to help confirm identity, not to skip re-capture).
4. Application is processed and a new card is produced.
5. Citizen collects the new card.

## Citizen Journey

This is the procedure most likely to start from a place of genuine anxiety — a citizen who has lost their ID often worries about identity theft or being unable to complete something time-sensitive that requires it. The single most important thing the AI can do here, per `CITIZEN_CONSTITUTION.md`'s "never judged" and "always encouraging" principles, is to immediately reassure the citizen that this is a routine, resolvable situation and give them the fastest concrete path forward — not to dwell on how the card was lost.

## Common Mistakes

- Waiting to report a lost card out of embarrassment, delaying the process unnecessarily.
- Assuming a police report is always required, when it may only apply to suspected theft, not ordinary loss — exact distinction unverified.
- Not realizing biometric data must be re-captured even though the citizen previously enrolled it — the prior record helps confirm identity, it does not eliminate this step.

## Typical Missing Documents

- Citizens sometimes arrive expecting to need the (now-lost) card itself as proof of anything, not realizing the loss declaration and database lookup replace that need entirely.

## Frequently Asked Questions

**Q: I'm not sure if my card was lost or stolen — does it matter?**
A: Possibly, if a police report becomes relevant for suspected theft — exact threshold and requirement are unverified; when in doubt, disclose the uncertainty rather than guess which applies.

**Q: Is reissue more expensive than renewal?**
A: Commonly reported as potentially higher, but the exact current fee for either is unverified — do not state a specific figure to a citizen without verification.
