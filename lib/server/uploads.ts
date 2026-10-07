import "server-only"
import { ACCEPTED_UPLOAD_TYPES, MAX_UPLOAD_BYTES, type UploadSlot } from "@/lib/visa-assessment/schema"

export type AcceptedType = (typeof ACCEPTED_UPLOAD_TYPES)[number]

export type ValidatedUpload = {
  slot: UploadSlot
  /** Detected from the file's content, not the browser-supplied type */
  contentType: AcceptedType
  extension: "pdf" | "jpg" | "png"
  size: number
  /** Sanitised original name, kept for staff reference only */
  originalName: string
  bytes: Uint8Array
}

export class UploadError extends Error {
  constructor(
    message: string,
    public readonly status: 400 | 413 | 415
  ) {
    super(message)
  }
}

/** Identify PDF / JPEG / PNG by their magic bytes. */
export function detectFileType(bytes: Uint8Array): { contentType: AcceptedType; extension: ValidatedUpload["extension"] } | null {
  const startsWith = (sig: number[]) => sig.every((b, i) => bytes[i] === b)
  if (startsWith([0x25, 0x50, 0x44, 0x46, 0x2d])) return { contentType: "application/pdf", extension: "pdf" } // %PDF-
  if (startsWith([0xff, 0xd8, 0xff])) return { contentType: "image/jpeg", extension: "jpg" }
  if (startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return { contentType: "image/png", extension: "png" }
  return null
}

export function sanitiseFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "document"
  const cleaned = base.replace(/[^\w.\- ()]+/g, "_").replace(/\s+/g, " ").trim()
  return (cleaned || "document").slice(0, 120)
}

/**
 * Validate uploaded files: only slots that apply to this case, real PDF/JPEG/PNG content,
 * non-empty, and a combined size within the limit.
 */
export async function validateUploads(
  entries: { slot: string; file: File }[],
  allowedSlots: UploadSlot[]
): Promise<ValidatedUpload[]> {
  const seen = new Set<string>()
  let total = 0
  const out: ValidatedUpload[] = []
  for (const { slot, file } of entries) {
    if (!allowedSlots.includes(slot as UploadSlot)) {
      throw new UploadError("A document was attached that does not apply to this type of case.", 400)
    }
    if (seen.has(slot)) throw new UploadError("Please attach only one file per document.", 400)
    seen.add(slot)
    if (file.size === 0) throw new UploadError("One of the attached files is empty.", 400)
    total += file.size
    if (file.size > MAX_UPLOAD_BYTES || total > MAX_UPLOAD_BYTES) {
      throw new UploadError("Attached files are too large. The combined limit is 4 MB.", 413)
    }
    const bytes = new Uint8Array(await file.arrayBuffer())
    const detected = detectFileType(bytes)
    if (!detected) throw new UploadError("Only PDF, JPG and PNG files can be uploaded.", 415)
    out.push({
      slot: slot as UploadSlot,
      contentType: detected.contentType,
      extension: detected.extension,
      size: file.size,
      originalName: sanitiseFileName(file.name),
      bytes,
    })
  }
  return out
}
