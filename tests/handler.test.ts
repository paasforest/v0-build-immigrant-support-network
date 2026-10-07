import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { handleVisaAssessment } from "@/lib/server/handle-visa-assessment"
import { LocalCaseStore } from "@/lib/server/case-store/local"
import type { CaseStore } from "@/lib/server/case-store/types"
import { PDF_BYTES, PNG_BYTES, refusalCase } from "./fixtures"

let dir: string
let store: LocalCaseStore
let ip = 0

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "isn-cases-"))
  store = new LocalCaseStore(dir)
})
afterEach(async () => {
  await rm(dir, { recursive: true, force: true })
})

function request(payload: unknown, files: Record<string, File> = {}) {
  const form = new FormData()
  form.set("payload", JSON.stringify(payload))
  for (const [slot, file] of Object.entries(files)) form.set(`file:${slot}`, file)
  // A distinct client per request so the rate limiter does not interfere between tests.
  return new Request("http://localhost/api/visa-assessment", {
    method: "POST",
    body: form,
    headers: { "x-forwarded-for": `10.0.0.${++ip}` },
  })
}

describe("POST /api/visa-assessment handler", () => {
  it("stores a valid case with a reference and the uploaded document", async () => {
    const res = await handleVisaAssessment(
      request(refusalCase(), { caseDocument: new File([PDF_BYTES], "refusal letter.pdf", { type: "application/pdf" }) }),
      store
    )
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.reference).toMatch(/^ISN-\d{4}-\d{6}$/)
    expect(body.documentCount).toBe(1)

    const saved = JSON.parse(await readFile(path.join(dir, "cases", `${body.reference}.json`), "utf8"))
    expect(saved.status).toBe("new")
    expect(saved.answers.caseType).toBe("refusal")
    expect(saved.consent).toMatchObject({ accuracy: true, privacy: true, noGuarantee: true, version: expect.any(String) })
    expect(saved.documents).toHaveLength(1)
    expect(saved.documents[0]).toMatchObject({ slot: "caseDocument", contentType: "application/pdf", originalName: "refusal letter.pdf" })
    const uploaded = await readdir(path.join(dir, "uploads", body.reference))
    expect(uploaded).toHaveLength(1)
    expect(uploaded[0]).toMatch(/^caseDocument-.+\.pdf$/)
  })

  it("issues sequential references", async () => {
    const a = await (await handleVisaAssessment(request(refusalCase({ hasRefusalLetter: "no" })), store)).json()
    const b = await (await handleVisaAssessment(request(refusalCase({ hasRefusalLetter: "no" })), store)).json()
    expect(Number(b.reference.slice(-6))).toBe(Number(a.reference.slice(-6)) + 1)
  })

  it("returns 503 and never claims success when no store is configured", async () => {
    const res = await handleVisaAssessment(request(refusalCase()), null)
    expect(res.status).toBe(503)
    expect((await res.json()).reference).toBeUndefined()
  })

  it("returns 500 when storage fails", async () => {
    const broken: CaseStore = {
      kind: "local",
      createVisaCase: async () => {
        throw new Error("disk full")
      },
      createContactEnquiry: async () => {
        throw new Error("disk full")
      },
    } as unknown as CaseStore
    const res = await handleVisaAssessment(request(refusalCase({ hasRefusalLetter: "no" })), broken)
    expect(res.status).toBe(500)
    expect((await res.json()).error).toMatch(/Nothing has been saved/)
  })

  it("rejects invalid answers with field errors", async () => {
    const res = await handleVisaAssessment(request(refusalCase({ email: "bad" })), store)
    expect(res.status).toBe(400)
    expect((await res.json()).fieldErrors.email).toBeDefined()
  })

  it("rejects bot submissions that fill the honeypot", async () => {
    const res = await handleVisaAssessment(request(refusalCase({ website: "http://spam" })), store)
    expect(res.status).toBe(400)
  })

  it("rejects files whose content is not PDF/JPG/PNG, whatever the extension", async () => {
    const fake = new File([new TextEncoder().encode("<html>not a pdf</html>")], "letter.pdf", { type: "application/pdf" })
    const res = await handleVisaAssessment(request(refusalCase(), { caseDocument: fake }), store)
    expect(res.status).toBe(415)
  })

  it("rejects an upload slot that does not apply to the case", async () => {
    const res = await handleVisaAssessment(
      request(refusalCase(), { jobOffer: new File([PNG_BYTES], "offer.png", { type: "image/png" }) }),
      store
    )
    expect(res.status).toBe(400)
  })

  it("rejects files over the size limit", async () => {
    const big = new Uint8Array(4 * 1024 * 1024 + 10)
    big.set(PDF_BYTES)
    const res = await handleVisaAssessment(request(refusalCase(), { caseDocument: new File([big], "big.pdf") }), store)
    expect(res.status).toBe(413)
  })

  it("rejects non-multipart requests", async () => {
    const res = await handleVisaAssessment(
      new Request("http://localhost/api/visa-assessment", {
        method: "POST",
        body: JSON.stringify(refusalCase()),
        headers: { "content-type": "application/json", "x-forwarded-for": "10.9.9.9" },
      }),
      store
    )
    expect(res.status).toBe(400)
  })
})
