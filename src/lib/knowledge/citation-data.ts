/**
 * Sprint 01C -- Legal Citation.
 *
 * Deterministic lookup data transcribed directly from the authored Knowledge
 * Library (`knowledge/procedures/`, `knowledge/citations/`,
 * `knowledge/metadata/index.json`). Nothing here is a new legal fact -- every
 * field below already exists in that Knowledge Library's frontmatter; this
 * module only reshapes it so `legal-citation-resolver.ts` can traverse it
 * without a YAML parser.
 *
 * Source of truth:
 * - Procedure -> Legal Source ids: each `knowledge/procedures/*.md`'s
 *   `legalReferences` frontmatter field.
 * - Legal Source fields: each `knowledge/citations/*.md`'s frontmatter
 *   (`lawName`, `issuingBody`, `article`, `issueDate`, `effectiveDate`,
 *   `lastVerified`, `sourceUrl`, `verified`, `confidenceLevel`).
 * - File paths: `knowledge/metadata/index.json`.
 *
 * `verified` means exactly what `knowledge/metadata/schema.md` Field 20
 * defines it to mean: "every one marked `verified: false` until a legal
 * reviewer confirms it" -- i.e. independent confirmation by a qualified
 * legal reviewer, which is precisely `LEGAL_CITATION_SPECIFICATION.md`
 * (Volume 44) Section 4's definition of the **Verified** Citation Level.
 * Every citation in this pack is `verified: false` today, so every one
 * resolves to Volume 44's **Unknown** level -- stated there explicitly:
 * "Every citation currently in `knowledge/citations/` ... is at this level
 * today." If a legal reviewer later sets `verified: true` on an entry below,
 * this module maps it to `VERIFIED`, never to a lesser tier -- Volume 44
 * defines no intermediate outcome for what `verified: true` in this pack
 * means.
 *
 * If a new procedure or citation file is authored in `knowledge/`, this file
 * must be updated to match -- it is a transcription, not an independent
 * source.
 */

export interface LegalSourceEntry {
  citationId: string;
  lawName: string;
  issuingBody: string;
  article: string;
  issueDate: string;
  effectiveDate: string;
  lastVerified: string;
  sourceUrl: string;
  verified: boolean;
  /** Verbatim `confidenceLevel` frontmatter string -- not re-worded. */
  confidenceLevel: string;
  /** Path relative to `knowledge/`, per `metadata/index.json`. */
  path: string;
}

export const LEGAL_SOURCES: Record<string, LegalSourceEntry> = {
  LUAT_CAN_CUOC_2023: {
    citationId: "LUAT_CAN_CUOC_2023",
    lawName: "Luật Căn cước (Law on Identification), No. 26/2023/QH15",
    issuingBody: "National Assembly of Vietnam",
    article: "Unknown — specific articles referenced per procedure below are unverified",
    issueDate: "2023-11-27",
    effectiveDate: "2024-07-01",
    lastVerified: "Unknown — never independently verified against the official gazette",
    sourceUrl: "Unknown",
    verified: false,
    confidenceLevel:
      "Medium — publication and effective date are well-documented public facts; article-level content is not yet verified",
    path: "knowledge/citations/luat-can-cuoc-2023.md",
  },
  NGHI_DINH_HUONG_DAN_CAN_CUOC: {
    citationId: "NGHI_DINH_HUONG_DAN_CAN_CUOC",
    lawName: "Unknown — implementing Decree for Luật Căn cước 2023 (exact decree number unverified)",
    issuingBody: "Government of Vietnam",
    article: "Unknown",
    issueDate: "Unknown",
    effectiveDate: "Unknown",
    lastVerified: "Unknown",
    sourceUrl: "Unknown",
    verified: false,
    confidenceLevel: "Low — placeholder only",
    path: "knowledge/citations/nghi-dinh-huong-dan-can-cuoc.md",
  },
  THONG_TU_ANH_CHAN_DUNG: {
    citationId: "THONG_TU_ANH_CHAN_DUNG",
    lawName:
      "Unknown — Circular specifying portrait-photo/biometric capture standards for Căn cước (exact circular number unverified)",
    issuingBody: "Ministry of Public Security",
    article: "Unknown",
    issueDate: "Unknown",
    effectiveDate: "Unknown",
    lastVerified: "Unknown",
    sourceUrl: "Unknown",
    verified: false,
    confidenceLevel: "Low — placeholder only",
    path: "knowledge/citations/thong-tu-anh-chan-dung.md",
  },
  THONG_TU_LE_PHI_CCCD: {
    citationId: "THONG_TU_LE_PHI_CCCD",
    lawName: "Unknown — Circular specifying the current fee schedule for Căn cước procedures (exact circular number unverified)",
    issuingBody: "Ministry of Finance",
    article: "Unknown",
    issueDate: "Unknown",
    effectiveDate: "Unknown",
    lastVerified: "Unknown",
    sourceUrl: "Unknown",
    verified: false,
    confidenceLevel: "Low — placeholder only",
    path: "knowledge/citations/thong-tu-le-phi-cccd.md",
  },
};

export interface ProcedureLegalReferenceEntry {
  procedureId: string;
  legalReferenceIds: string[];
  /** Path relative to `knowledge/`, per `metadata/index.json`. */
  path: string;
}

export const PROCEDURE_LEGAL_REFERENCES: Record<string, ProcedureLegalReferenceEntry> = {
  CCCD_RENEWAL: {
    procedureId: "CCCD_RENEWAL",
    legalReferenceIds: [
      "LUAT_CAN_CUOC_2023",
      "NGHI_DINH_HUONG_DAN_CAN_CUOC",
      "THONG_TU_ANH_CHAN_DUNG",
      "THONG_TU_LE_PHI_CCCD",
    ],
    path: "knowledge/procedures/cccd-gia-han.md",
  },
  CCCD_FIRST_ISSUANCE: {
    procedureId: "CCCD_FIRST_ISSUANCE",
    legalReferenceIds: [
      "LUAT_CAN_CUOC_2023",
      "NGHI_DINH_HUONG_DAN_CAN_CUOC",
      "THONG_TU_ANH_CHAN_DUNG",
      "THONG_TU_LE_PHI_CCCD",
    ],
    path: "knowledge/procedures/cccd-cap-moi.md",
  },
  CCCD_REPLACEMENT: {
    procedureId: "CCCD_REPLACEMENT",
    legalReferenceIds: [
      "LUAT_CAN_CUOC_2023",
      "NGHI_DINH_HUONG_DAN_CAN_CUOC",
      "THONG_TU_ANH_CHAN_DUNG",
      "THONG_TU_LE_PHI_CCCD",
    ],
    path: "knowledge/procedures/cccd-doi.md",
  },
  CCCD_REISSUE: {
    procedureId: "CCCD_REISSUE",
    legalReferenceIds: [
      "LUAT_CAN_CUOC_2023",
      "NGHI_DINH_HUONG_DAN_CAN_CUOC",
      "THONG_TU_ANH_CHAN_DUNG",
      "THONG_TU_LE_PHI_CCCD",
    ],
    path: "knowledge/procedures/cccd-cap-lai.md",
  },
};
