/**
 * Sprint 01D -- Checklist Generation.
 *
 * Deterministic lookup data transcribed directly from the authored Knowledge
 * Library (`knowledge/procedures/*.md`'s `requiredDocuments` /
 * `optionalDocuments` frontmatter, and `knowledge/documents/*.md`'s own
 * `name` field). Nothing here is a new fact -- every document id and label
 * below already exists in that Knowledge Library; this module only reshapes
 * it so `checklist-generator.ts` can traverse it without a YAML parser.
 *
 * If a new procedure or document file is authored in `knowledge/`, this file
 * must be updated to match -- it is a transcription, not an independent
 * source.
 */

export interface DocumentEntry {
  documentId: string;
  /** Verbatim `name` field from `knowledge/documents/*.md` -- not re-worded. */
  name: string;
}

export const DOCUMENTS: Record<string, DocumentEntry> = {
  CURRENT_ID_DOCUMENT: {
    documentId: "CURRENT_ID_DOCUMENT",
    name: "Thẻ Căn cước / CCCD / CMND hiện có (current identity card, whichever generation)",
  },
  APPLICATION_FORM: {
    documentId: "APPLICATION_FORM",
    name: "Tờ khai Căn cước (Identity/Căn cước declaration form)",
  },
  HOUSEHOLD_REGISTRATION_EXTRACT: {
    documentId: "HOUSEHOLD_REGISTRATION_EXTRACT",
    name: "Thông tin cư trú / trích lục hộ khẩu (Residence information extract)",
  },
  BIRTH_CERTIFICATE: {
    documentId: "BIRTH_CERTIFICATE",
    name: "Giấy khai sinh (Birth certificate)",
  },
  DAMAGE_OR_CHANGE_EVIDENCE: {
    documentId: "DAMAGE_OR_CHANGE_EVIDENCE",
    name: "Căn cước bị hỏng / Giấy tờ chứng minh thay đổi thông tin (Damaged card, or evidence of an information change)",
  },
  LOSS_DECLARATION: {
    documentId: "LOSS_DECLARATION",
    name: "Đơn trình báo mất Căn cước/CCCD (Declaration of loss)",
  },
};

export interface ProcedureChecklistEntry {
  procedureId: string;
  /** requiredDocuments, verbatim order, from the procedure's own frontmatter. */
  requiredDocumentIds: string[];
  /** optionalDocuments, verbatim order, from the procedure's own frontmatter. */
  optionalDocumentIds: string[];
}

export const PROCEDURE_CHECKLISTS: Record<string, ProcedureChecklistEntry> = {
  CCCD_RENEWAL: {
    procedureId: "CCCD_RENEWAL",
    requiredDocumentIds: ["CURRENT_ID_DOCUMENT", "APPLICATION_FORM"],
    optionalDocumentIds: ["HOUSEHOLD_REGISTRATION_EXTRACT"],
  },
  CCCD_FIRST_ISSUANCE: {
    procedureId: "CCCD_FIRST_ISSUANCE",
    requiredDocumentIds: ["BIRTH_CERTIFICATE", "APPLICATION_FORM"],
    optionalDocumentIds: ["HOUSEHOLD_REGISTRATION_EXTRACT"],
  },
  CCCD_REPLACEMENT: {
    procedureId: "CCCD_REPLACEMENT",
    requiredDocumentIds: ["CURRENT_ID_DOCUMENT", "APPLICATION_FORM", "DAMAGE_OR_CHANGE_EVIDENCE"],
    optionalDocumentIds: ["HOUSEHOLD_REGISTRATION_EXTRACT"],
  },
  CCCD_REISSUE: {
    procedureId: "CCCD_REISSUE",
    requiredDocumentIds: ["LOSS_DECLARATION", "APPLICATION_FORM"],
    optionalDocumentIds: ["HOUSEHOLD_REGISTRATION_EXTRACT"],
  },
};
