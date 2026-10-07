import "server-only"
import { promises as fs } from "node:fs"
import path from "node:path"
import { randomUUID } from "node:crypto"
import type { CaseStore, NewContactEnquiry, NewVisaCase, StoredContactEnquiry, StoredVisaCase } from "./types"

/**
 * File-system store for local development and automated tests only.
 * Data lives outside the public web directory (default ./.data, git-ignored).
 * Never selected in production unless CASE_STORE=local is set explicitly.
 */
export class LocalCaseStore implements CaseStore {
  readonly kind = "local" as const
  private queue: Promise<unknown> = Promise.resolve()

  constructor(private readonly root: string) {}

  /** Serialise writes so reference numbers stay unique within this process. */
  private exclusive<T>(fn: () => Promise<T>): Promise<T> {
    const run = this.queue.then(fn, fn)
    this.queue = run.catch(() => undefined)
    return run
  }

  private async nextNumber(counterName: string, year: string): Promise<number> {
    const file = path.join(this.root, "counters", `${counterName}-${year}.txt`)
    await fs.mkdir(path.dirname(file), { recursive: true })
    const current = Number(await fs.readFile(file, "utf8").catch(() => "0")) || 0
    const next = current + 1
    await fs.writeFile(file, String(next))
    return next
  }

  createVisaCase(input: NewVisaCase): Promise<StoredVisaCase> {
    return this.exclusive(async () => {
      const now = new Date()
      const year = String(now.getFullYear())
      const reference = `ISN-${year}-${String(await this.nextNumber("case", year)).padStart(6, "0")}`
      const uploadDir = path.join(this.root, "uploads", reference)
      const documents = []
      for (const doc of input.documents) {
        await fs.mkdir(uploadDir, { recursive: true })
        const storagePath = path.join(uploadDir, `${doc.slot}-${randomUUID()}.${doc.extension}`)
        await fs.writeFile(storagePath, doc.bytes)
        documents.push({
          slot: doc.slot,
          storagePath: path.relative(this.root, storagePath),
          originalName: doc.originalName,
          contentType: doc.contentType,
          sizeBytes: doc.size,
        })
      }
      const record = {
        reference,
        createdAt: now.toISOString(),
        status: "new",
        answers: input.answers,
        consent: input.consent,
        documents,
      }
      const caseFile = path.join(this.root, "cases", `${reference}.json`)
      await fs.mkdir(path.dirname(caseFile), { recursive: true })
      await fs.writeFile(caseFile, JSON.stringify(record, null, 2))
      return { reference, createdAt: record.createdAt, documentCount: documents.length }
    })
  }

  createContactEnquiry(input: NewContactEnquiry): Promise<StoredContactEnquiry> {
    return this.exclusive(async () => {
      const now = new Date()
      const year = String(now.getFullYear())
      const reference = `ISN-MSG-${year}-${String(await this.nextNumber("contact", year)).padStart(6, "0")}`
      const file = path.join(this.root, "contact", `${reference}.json`)
      await fs.mkdir(path.dirname(file), { recursive: true })
      await fs.writeFile(file, JSON.stringify({ reference, createdAt: now.toISOString(), status: "new", ...input }, null, 2))
      return { reference, createdAt: now.toISOString() }
    })
  }
}
