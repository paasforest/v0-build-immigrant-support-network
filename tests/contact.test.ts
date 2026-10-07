import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { mkdtemp, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { handleContact } from "@/lib/server/handle-contact"
import { LocalCaseStore } from "@/lib/server/case-store/local"
import type { CaseStore } from "@/lib/server/case-store/types"

let dir: string
let store: LocalCaseStore
let ip = 0
beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "isn-contact-"))
  store = new LocalCaseStore(dir)
})
afterEach(async () => rm(dir, { recursive: true, force: true }))

const valid = { name: "Test Person", email: "t@example.com", phone: "", subject: "general", message: "Do you help with UK visitor visas?", consentPrivacy: true, website: "" }
const post = (body: unknown) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json", "x-forwarded-for": `10.1.0.${++ip}` },
  })

describe("POST /api/contact handler", () => {
  it("stores a valid message and returns a reference", async () => {
    const res = await handleContact(post(valid), store)
    expect(res.status).toBe(201)
    const { reference } = await res.json()
    expect(reference).toMatch(/^ISN-MSG-\d{4}-\d{6}$/)
    const saved = JSON.parse(await readFile(path.join(dir, "contact", `${reference}.json`), "utf8"))
    expect(saved.message).toBe(valid.message)
    expect(saved.consent.privacy).toBe(true)
  })

  it("returns 503 without a store", async () => {
    expect((await handleContact(post(valid), null)).status).toBe(503)
  })

  it("returns 500 when storage fails", async () => {
    const broken = { kind: "local", createContactEnquiry: async () => { throw new Error("x") } } as unknown as CaseStore
    expect((await handleContact(post(valid), broken)).status).toBe(500)
  })

  it("requires consent and a real message", async () => {
    const res = await handleContact(post({ ...valid, consentPrivacy: false, message: "hi" }), store)
    expect(res.status).toBe(400)
    const { fieldErrors } = await res.json()
    expect(fieldErrors.consentPrivacy).toBeDefined()
    expect(fieldErrors.message).toBeDefined()
  })

  it("rejects the honeypot", async () => {
    expect((await handleContact(post({ ...valid, website: "x" }), store)).status).toBe(400)
  })
})
