import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { handleVisaAssessment, MAX_CONFIRMATIONS_PER_EMAIL_PER_DAY } from "@/lib/server/handle-visa-assessment"
import { LocalCaseStore } from "@/lib/server/case-store/local"
import type { CaseStore } from "@/lib/server/case-store/types"
import { newCaseEmail } from "@/lib/server/notify"
import { PDF_BYTES, refusalCase } from "./fixtures"

/**
 * End-to-end handler tests with the local store and a mocked network: no real email
 * is sent and no real Cloudflare or Supabase service is contacted.
 */

let dir: string
let store: LocalCaseStore
let ip = 0
type Call = { url: string; body: string }
let calls: Call[]
let resendStatus: number
let turnstileSuccess: boolean | "down"

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "isn-leads-"))
  store = new LocalCaseStore(dir)
  calls = []
  resendStatus = 200
  turnstileSuccess = true
  vi.stubEnv("RESEND_API_KEY", "re_test_dummy")
  vi.stubEnv("NOTIFY_FROM_EMAIL", "ISN <notify@example.org>")
  vi.stubEnv("CASE_NOTIFY_EMAIL", "staff@example.org")
  vi.stubEnv("TURNSTILE_SECRET_KEY", "")
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input)
      const body = init?.body instanceof URLSearchParams ? init.body.toString() : String(init?.body ?? "")
      calls.push({ url, body })
      if (url.includes("challenges.cloudflare.com")) {
        if (turnstileSuccess === "down") throw new TypeError("fetch failed")
        return new Response(JSON.stringify({ success: turnstileSuccess }), { status: 200 })
      }
      return new Response("{}", { status: resendStatus })
    })
  )
})
afterEach(async () => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  await rm(dir, { recursive: true, force: true })
})

function request(payload: unknown, extra: Record<string, string | File> = {}) {
  const form = new FormData()
  form.set("payload", JSON.stringify(payload))
  for (const [k, v] of Object.entries(extra)) form.set(k, v)
  return new Request("http://localhost/api/visa-assessment", { method: "POST", body: form, headers: { "x-forwarded-for": `10.1.0.${++ip}` } })
}

const resendCalls = () => calls.filter((c) => c.url.includes("api.resend.com"))
const sentTo = (c: Call) => (JSON.parse(c.body) as { to: string[] }).to

describe("lead notifications", () => {
  it("emails staff a minimal summary with a link to the case, and records delivery", async () => {
    const res = await handleVisaAssessment(request(refusalCase()), store)
    expect(res.status).toBe(201)
    const { reference } = await res.json()

    const staffMail = resendCalls().find((c) => sentTo(c).includes("staff@example.org"))!
    const { subject, text } = JSON.parse(staffMail.body) as { subject: string; text: string }
    expect(subject).toContain(reference)
    expect(text).toContain(`/admin/cases/${reference}`)
    expect(text).toContain("Case type: My visa was refused")
    // No contact details or free-text answers in the email.
    expect(text).not.toContain("test@example.com")
    expect(text).not.toContain("+27 82 000 0000")
    expect(text).not.toContain("Test Applicant")
    expect(text).not.toContain("Purpose of stay not justified")

    const c = (await store.getCase(reference))!
    expect(c.staffNotifyStatus).toBe("sent")
    expect(c.staffNotifiedAt).not.toBeNull()
    expect(c.applicantNotifyStatus).toBe("sent")
    expect(c.events.map((e) => e.type).sort()).toEqual(["applicant_confirmation", "created", "staff_notification"])
  })

  it("keeps the case and records the failure when Resend rejects the email", async () => {
    resendStatus = 422
    const res = await handleVisaAssessment(request(refusalCase()), store)
    expect(res.status).toBe(201)
    const c = (await store.getCase((await res.json()).reference))!
    expect(c.staffNotifyStatus).toBe("failed")
    expect(c.staffNotifyError).toBe("HTTP_422")
    expect(c.applicantNotifyStatus).toBe("failed")
  })

  it("keeps the case and records the failure when Resend cannot be reached", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new TypeError("fetch failed"))))
    const res = await handleVisaAssessment(request(refusalCase()), store)
    expect(res.status).toBe(201)
    const c = (await store.getCase((await res.json()).reference))!
    expect(c.staffNotifyStatus).toBe("failed")
    expect(c.staffNotifyError).toBe("NETWORK")
  })

  it("records 'not sent' when email is not configured, and still stores the case", async () => {
    vi.stubEnv("RESEND_API_KEY", "")
    const res = await handleVisaAssessment(request(refusalCase()), store)
    expect(res.status).toBe(201)
    const c = (await store.getCase((await res.json()).reference))!
    expect(c.staffNotifyStatus).toBe("skipped")
    expect(c.staffNotifyError).toBe("NOT_CONFIGURED")
    expect(resendCalls()).toHaveLength(0)
  })

  it("still answers 201 when recording the notification outcome fails", async () => {
    const failing: CaseStore = Object.assign(Object.create(Object.getPrototypeOf(store)), store, {
      recordNotification: async () => {
        throw new Error("database unavailable")
      },
    })
    const res = await handleVisaAssessment(request(refusalCase()), failing)
    expect(res.status).toBe(201)
  })

  it(`sends at most ${MAX_CONFIRMATIONS_PER_EMAIL_PER_DAY} applicant confirmations per address per day`, async () => {
    for (let i = 0; i < MAX_CONFIRMATIONS_PER_EMAIL_PER_DAY + 2; i++) {
      expect((await handleVisaAssessment(request(refusalCase({ email: "Repeat@Example.com" })), store)).status).toBe(201)
    }
    const confirmations = resendCalls().filter((c) => sentTo(c).includes("Repeat@Example.com"))
    expect(confirmations).toHaveLength(MAX_CONFIRMATIONS_PER_EMAIL_PER_DAY)
    const { items } = await store.listCases({ page: 1, pageSize: 50 })
    expect(items).toHaveLength(MAX_CONFIRMATIONS_PER_EMAIL_PER_DAY + 2)
    const skipped = await Promise.all(items.map((i) => store.getCase(i.reference)))
    expect(skipped.filter((c) => c!.applicantNotifyStatus === "skipped").every((c) => c!.applicantNotifyError === "DAILY_LIMIT")).toBe(true)
  })
})

describe("duplicate-submission protection", () => {
  const id = "3f1d2c4b-5a69-4e7f-8a1b-2c3d4e5f6a7b"

  it("returns the original reference for a repeated submission, without a second case or repeat emails", async () => {
    const first = await handleVisaAssessment(request(refusalCase(), { submissionId: id, "file:caseDocument": new File([PDF_BYTES], "letter.pdf") }), store)
    expect(first.status).toBe(201)
    const firstBody = await first.json()
    const emailsAfterFirst = resendCalls().length

    const second = await handleVisaAssessment(request(refusalCase(), { submissionId: id, "file:caseDocument": new File([PDF_BYTES], "letter.pdf") }), store)
    expect(second.status).toBe(200)
    expect(await second.json()).toEqual({ reference: firstBody.reference, documentCount: 1, duplicate: true })

    expect((await store.listCases({ page: 1, pageSize: 10 })).total).toBe(1)
    expect(resendCalls()).toHaveLength(emailsAfterFirst)
    const c = (await store.getCase(firstBody.reference))!
    expect(c.events.some((e) => e.type === "duplicate_submission")).toBe(true)
  })

  it("treats different submission ids as different cases", async () => {
    await handleVisaAssessment(request(refusalCase(), { submissionId: id }), store)
    await handleVisaAssessment(request(refusalCase(), { submissionId: "9b2e69c8-c068-4ef1-9d35-93a104232336" }), store)
    expect((await store.listCases({ page: 1, pageSize: 10 })).total).toBe(2)
  })

  it("rejects a malformed submission id", async () => {
    const res = await handleVisaAssessment(request(refusalCase(), { submissionId: "not-a-uuid" }), store)
    expect(res.status).toBe(400)
    expect((await store.listCases({ page: 1, pageSize: 10 })).total).toBe(0)
  })

  it("still accepts forms without a submission id (pages loaded before this change)", async () => {
    expect((await handleVisaAssessment(request(refusalCase()), store)).status).toBe(201)
  })
})

describe("bot protection (Cloudflare Turnstile)", () => {
  beforeEach(() => vi.stubEnv("TURNSTILE_SECRET_KEY", "turnstile_test_dummy"))

  it("requires a token when enabled", async () => {
    const res = await handleVisaAssessment(request(refusalCase()), store)
    expect(res.status).toBe(400)
    expect((await res.json()).code).toBe("SECURITY_CHECK")
    expect((await store.listCases({ page: 1, pageSize: 10 })).total).toBe(0)
  })

  it("rejects a token Cloudflare does not accept", async () => {
    turnstileSuccess = false
    const res = await handleVisaAssessment(request(refusalCase(), { turnstileToken: "bad-token" }), store)
    expect(res.status).toBe(400)
    expect((await store.listCases({ page: 1, pageSize: 10 })).total).toBe(0)
  })

  it("accepts a verified token and sends it with the secret to Cloudflare", async () => {
    const res = await handleVisaAssessment(request(refusalCase(), { turnstileToken: "good-token" }), store)
    expect(res.status).toBe(201)
    const verify = calls.find((c) => c.url.includes("siteverify"))!
    expect(verify.body).toContain("response=good-token")
  })

  it("does not lose a genuine lead when Cloudflare is unreachable", async () => {
    turnstileSuccess = "down"
    const res = await handleVisaAssessment(request(refusalCase(), { turnstileToken: "token" }), store)
    expect(res.status).toBe(201)
  })
})

describe("staff email content", () => {
  it("contains no applicant contact details", () => {
    const { text } = newCaseEmail({
      reference: "ISN-2026-000123",
      createdAt: "2026-10-11T08:00:00.000Z",
      caseType: "My visa was refused",
      destination: "France",
      visaPurpose: "Visitor / tourist",
      preferredContact: "Email",
      travel: "2027-01",
      documentCount: 1,
    })
    expect(text).toContain("https://www.immigrantsupportnetwork.co.za/admin/cases/ISN-2026-000123")
    expect(text).not.toMatch(/@/)
  })
})
