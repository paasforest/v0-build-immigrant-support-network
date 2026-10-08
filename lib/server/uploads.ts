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
 * Ceiling for the whole multipart request: up to 4 MB of files plus the answers and
 * multipart framing. Hosts such as Railway do not cap request bodies, so this is what
 * stops an oversized request from being read into memory.
 */
export const MAX_REQUEST_BYTES = Math.floor(4.5 * 1024 * 1024)

const TOO_LARGE = "Attached files are too large. The combined limit is 4 MB."

/**
 * Parse a multipart body without ever holding more than `limit` bytes of it.
 * Rejects at once on a declared Content-Length over the limit, and stops reading a
 * body (e.g. chunked, no Content-Length) as soon as it passes the limit.
 */
export async function readLimitedFormData(request: Request, limit = MAX_REQUEST_BYTES): Promise<FormData> {
  const declared = Number(request.headers.get("content-length") ?? 0)
  if (declared > limit) throw new UploadError(TOO_LARGE, 413)
  if (!request.body) return request.formData()

  let received = 0
  let exceeded = false
  const limited = request.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        received += chunk.byteLength
        if (received > limit) {
          exceeded = true
          controller.error(new UploadError(TOO_LARGE, 413))
        } else {
          controller.enqueue(chunk)
        }
      },
    })
  )
  try {
    return await new Response(limited, { headers: { "content-type": request.headers.get("content-type") ?? "" } }).formData()
  } catch (err) {
    if (exceeded) throw new UploadError(TOO_LARGE, 413)
    throw err
  }
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
