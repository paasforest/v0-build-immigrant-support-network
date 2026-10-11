import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { LocalCaseStore } from "@/lib/server/case-store/local"
import { handleVisaAssessment } from "@/lib/server/handle-visa-assessment"
import {
  handleAddNote,
  handleDocument,
  handleRetryNotification,
  handleSignInComplete,
  handleSignInRequest,
  handleSignOut,
  handleStatusUpdate,
} from "@/lib/server/admin/handlers"
import { SESSION_COOKIE, hashToken, sessionCookie, staffFromRequest } from "@/lib/server/admin/auth"
import { resetRateLimitsForTests } from "@/lib/server/rate-limit"
import { PDF_BYTES, refusalCase } from "./fixtures"

/**
 * Staff dashboard security and behaviour, against the local store with the network mocked.
 * Requests are built the way a browser sends them: same-origin forms carry an Origin header.
 */

const ORIGIN = "http://localhost"
let dir: string
let store: LocalCaseStore
let mails: { to: string[]; text: string }[]
let ip = 0

beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "isn-admin-"))
  store = new LocalCaseStore(dir)
  resetRateLimitsForTests()
  await mkdir(path.join(dir, "staff"), { recursive: true })
  await writeFile(
    path.join(dir, "staff", "users.json"),
    JSON.stringify([
      { email: "lead@example.org", name: "ISN Lead", active: true },
      { email: "former@example.org", name: "Former Staff", active: false },
    ])
  )
  mails = []
  vi.stubEnv("RESEND_API_KEY", "re_test_dummy")
  vi.stubEnv("NOTIFY_FROM_EMAIL", "ISN <notify@example.org>")
  vi.stubEnv("CASE_NOTIFY_EMAIL", "staff@example.org")
  vi.stubEnv("TURNSTILE_SECRET_KEY", "")
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body ?? "{}"))
      mails.push({ to: body.to, text: body.text })
      return new Response("{}", { status: 200 })
    })
  )
})
afterEach(async () => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  await rm(dir, { recursive: true, force: true })
})

function post(url: string, fields: Record<string, string>, opts: { cookie?: string; origin?: string | null } = {}) {
  const headers: Record<string, string> = { "content-type": "application/x-www-form-urlencoded", "x-forwarded-for": `10.2.0.${++ip}` }
  if (opts.origin !== null) headers.origin = opts.origin ?? ORIGIN
  if (opts.cookie) headers.cookie = opts.cookie
  return new Request(`${ORIGIN}${url}`, { method: "POST", headers, body: new URLSearchParams(fields).toString() })
}
function get(url: string, cookie?: string) {
  return new Request(`${ORIGIN}${url}`, { headers: cookie ? { cookie } : {} })
}

/** Run the full emailed-link sign-in and return the session cookie header value. */
async function signIn(email = "lead@example.org"): Promise<string> {
  const res = await handleSignInRequest(post("/api/admin/login", { email }), store)
  expect(res.status).toBe(303)
  const token = /token=([A-Za-z0-9_-]{43})/.exec(mails.at(-1)?.text ?? "")?.[1]
  expect(token).toBeTruthy()
  const done = await handleSignInComplete(post("/api/admin/session", { token: token! }), store)
  expect(done.headers.get("location")).toBe("/admin")
  const setCookie = done.headers.get("set-cookie")!
  return setCookie.split(";")[0]
}

async function createCase(withDocument = false) {
  const form = new FormData()
  form.set("payload", JSON.stringify(refusalCase()))
  if (withDocument) form.set("file:caseDocument", new File([PDF_BYTES], "refusal letter.pdf"))
  const res = await handleVisaAssessment(new Request(`${ORIGIN}/api/visa-assessment`, { method: "POST", body: form, headers: { "x-forwarded-for": `10.3.0.${++ip}` } }), store)
  return (await res.json()).reference as string
}

describe("staff sign-in", () => {
  it("emails a one-time link only to active staff, answering every request the same way", async () => {
    for (const email of ["lead@example.org", "former@example.org", "stranger@example.org"]) {
      const res = await handleSignInRequest(post("/api/admin/login", { email }), store)
      expect(res.status).toBe(303)
      expect(res.headers.get("location")).toBe("/admin/login?sent=1")
    }
    expect(mails.map((m) => m.to)).toEqual([["lead@example.org"]])
    expect(mails[0].text).toMatch(/\/admin\/login\/verify\?token=[A-Za-z0-9_-]{43}/)
  })

  it("issues an HttpOnly, SameSite session cookie, and the link works only once", async () => {
    await handleSignInRequest(post("/api/admin/login", { email: "LEAD@example.org" }), store)
    const token = /token=([A-Za-z0-9_-]{43})/.exec(mails[0].text)![1]
    const first = await handleSignInComplete(post("/api/admin/session", { token }), store)
    const cookie = first.headers.get("set-cookie")!
    expect(cookie).toMatch(new RegExp(`^${SESSION_COOKIE}=[A-Za-z0-9_-]{43};`))
    expect(cookie).toContain("HttpOnly")
    expect(cookie).toContain("SameSite=Lax")

    const again = await handleSignInComplete(post("/api/admin/session", { token }), store)
    expect(again.headers.get("location")).toBe("/admin/login?error=link")
    expect(again.headers.get("set-cookie")).toBeNull()
  })

  it("rejects an expired link", async () => {
    const issued = new Date("2026-10-11T08:00:00Z")
    await handleSignInRequest(post("/api/admin/login", { email: "lead@example.org" }), store, { now: () => issued })
    const token = /token=([A-Za-z0-9_-]{43})/.exec(mails[0].text)![1]
    const late = await handleSignInComplete(post("/api/admin/session", { token }), store, { now: () => new Date(issued.getTime() + 16 * 60 * 1000) })
    expect(late.headers.get("location")).toBe("/admin/login?error=link")
  })

  it("stores only hashes of links and sessions", async () => {
    const cookie = await signIn()
    const session = cookie.split("=")[1]
    const { readdir } = await import("node:fs/promises")
    expect(await readdir(path.join(dir, "staff", "sessions"))).toEqual([`${hashToken(session)}.json`])
  })

  it("limits sign-in emails per address, without revealing that it did", async () => {
    for (let i = 0; i < 5; i++) {
      const res = await handleSignInRequest(post("/api/admin/login", { email: "lead@example.org" }), store)
      expect(res.headers.get("location")).toBe("/admin/login?sent=1")
    }
    expect(mails).toHaveLength(3)
  })

  it("refuses sign-in requests posted from another site", async () => {
    const res = await handleSignInRequest(post("/api/admin/login", { email: "lead@example.org" }, { origin: "https://evil.example" }), store)
    expect(res.status).toBe(403)
    expect(mails).toHaveLength(0)
  })

  it("ends access at once when a staff member is deactivated", async () => {
    const cookie = await signIn()
    expect(await staffFromRequest(store, get("/admin", cookie))).toEqual({ email: "lead@example.org", name: "ISN Lead" })
    await writeFile(path.join(dir, "staff", "users.json"), JSON.stringify([{ email: "lead@example.org", name: "ISN Lead", active: false }]))
    expect(await staffFromRequest(store, get("/admin", cookie))).toBeNull()
  })

  it("signing out revokes the session on the server", async () => {
    const cookie = await signIn()
    const res = await handleSignOut(post("/api/admin/logout", {}, { cookie }), store)
    expect(res.headers.get("set-cookie")).toContain("Max-Age=0")
    expect(await staffFromRequest(store, get("/admin", cookie))).toBeNull()
  })

  it("marks the cookie Secure on HTTPS", () => {
    expect(sessionCookie("x", true)).toContain("Secure")
  })
})

describe("case actions require a signed-in staff member", () => {
  it("redirects anonymous and forged-cookie requests to sign-in and changes nothing", async () => {
    const reference = await createCase()
    const forged = `${SESSION_COOKIE}=${"A".repeat(43)}`
    for (const cookie of [undefined, forged]) {
      const res = await handleStatusUpdate(post(`/api/admin/cases/${reference}/status`, { status: "client" }, { cookie }), reference, store)
      expect(res.status).toBe(303)
      expect(res.headers.get("location")).toBe("/admin/login?error=session")
    }
    expect((await store.getCase(reference))!.status).toBe("new")
  })

  it("refuses cross-site posts even with a valid session (CSRF)", async () => {
    const reference = await createCase()
    const cookie = await signIn()
    for (const origin of ["https://evil.example", null]) {
      const res = await handleStatusUpdate(post(`/api/admin/cases/${reference}/status`, { status: "client" }, { cookie, origin }), reference, store)
      expect(res.status).toBe(403)
    }
    expect((await store.getCase(reference))!.status).toBe("new")
  })

  it("updates status and records who changed it", async () => {
    const reference = await createCase()
    const cookie = await signIn()
    const res = await handleStatusUpdate(post(`/api/admin/cases/${reference}/status`, { status: "contacted" }, { cookie }), reference, store)
    expect(res.headers.get("location")).toBe(`/admin/cases/${reference}?saved=status`)
    const c = (await store.getCase(reference))!
    expect(c.status).toBe("contacted")
    expect(c.events[0]).toMatchObject({ type: "status_changed", actor: "lead@example.org", data: { from: "new", to: "contacted" } })
  })

  it("rejects an unknown status", async () => {
    const reference = await createCase()
    const cookie = await signIn()
    const res = await handleStatusUpdate(post(`/api/admin/cases/${reference}/status`, { status: "approved" }, { cookie }), reference, store)
    expect(res.headers.get("location")).toBe(`/admin/cases/${reference}?error=status`)
    expect((await store.getCase(reference))!.status).toBe("new")
  })

  it("adds notes to the history without overwriting earlier ones", async () => {
    const reference = await createCase()
    const cookie = await signIn()
    await handleAddNote(post(`/api/admin/cases/${reference}/notes`, { note: "Called, no answer." }, { cookie }), reference, store)
    await handleAddNote(post(`/api/admin/cases/${reference}/notes`, { note: "Sent WhatsApp message." }, { cookie }), reference, store)
    const notes = (await store.getCase(reference))!.events.filter((e) => e.type === "note_added").map((e) => e.data.note)
    expect(notes).toEqual(["Sent WhatsApp message.", "Called, no answer."])
    const empty = await handleAddNote(post(`/api/admin/cases/${reference}/notes`, { note: "   " }, { cookie }), reference, store)
    expect(empty.headers.get("location")).toBe(`/admin/cases/${reference}?error=note`)
  })

  it("retries a failed staff alert and records the new outcome and who asked", async () => {
    vi.stubEnv("RESEND_API_KEY", "")
    const reference = await createCase()
    expect((await store.getCase(reference))!.staffNotifyStatus).toBe("skipped")
    vi.stubEnv("RESEND_API_KEY", "re_test_dummy")
    const cookie = await signIn()
    const res = await handleRetryNotification(post(`/api/admin/cases/${reference}/notify`, {}, { cookie }), reference, store)
    expect(res.headers.get("location")).toBe(`/admin/cases/${reference}?notified=sent`)
    const c = (await store.getCase(reference))!
    expect(c.staffNotifyStatus).toBe("sent")
    expect(c.events[0]).toMatchObject({ type: "staff_notification", actor: "lead@example.org", data: { status: "sent" } })
  })

  it("returns 404 for unknown or malformed references", async () => {
    const cookie = await signIn()
    for (const reference of ["ISN-2026-999999", "../../etc/passwd"]) {
      const res = await handleStatusUpdate(post(`/api/admin/cases/x/status`, { status: "client" }, { cookie }), reference, store)
      expect(res.status).toBe(404)
    }
  })
})

describe("document access", () => {
  it("serves a document only to signed-in staff, and records each access", async () => {
    const reference = await createCase(true)
    const [doc] = (await store.getCase(reference))!.documents
    const url = `/api/admin/cases/${reference}/documents/${doc.id}`

    const anonymous = await handleDocument(get(url), reference, doc.id, store)
    expect(anonymous.status).toBe(303)
    expect(anonymous.headers.get("location")).toBe("/admin/login?error=session")

    const cookie = await signIn()
    const res = await handleDocument(get(url, cookie), reference, doc.id, store)
    expect(res.status).toBe(200)
    expect(res.headers.get("content-type")).toBe("application/pdf")
    expect(res.headers.get("cache-control")).toBe("no-store")
    expect(res.headers.get("content-security-policy")).toContain("sandbox")
    expect(new Uint8Array(await res.arrayBuffer())).toEqual(PDF_BYTES)
    expect((await store.getCase(reference))!.events[0]).toMatchObject({ type: "document_viewed", actor: "lead@example.org" })
  })

  it("does not serve a document through another case's reference", async () => {
    const owner = await createCase(true)
    const other = await createCase(false)
    const [doc] = (await store.getCase(owner))!.documents
    const cookie = await signIn()
    const res = await handleDocument(get(`/api/admin/cases/${other}/documents/${doc.id}`, cookie), other, doc.id, store)
    expect(res.status).toBe(404)
  })

  it("rejects malformed document ids", async () => {
    const reference = await createCase(true)
    const cookie = await signIn()
    const res = await handleDocument(get(`/api/admin/cases/${reference}/documents/x`, cookie), reference, "../../secret", store)
    expect(res.status).toBe(404)
  })
})

describe("lead list and search", () => {
  it("finds cases by reference, name and email, filters by status and undelivered alerts", async () => {
    const a = await createCase()
    const b = await createCase()
    await store.updateStatus(b, "closed", "lead@example.org")
    expect((await store.listCases({ page: 1, pageSize: 10 })).total).toBe(2)
    expect((await store.listCases({ search: a, page: 1, pageSize: 10 })).items.map((i) => i.reference)).toEqual([a])
    expect((await store.listCases({ search: "test applicant", page: 1, pageSize: 10 })).total).toBe(2)
    expect((await store.listCases({ search: "TEST@example", page: 1, pageSize: 10 })).total).toBe(2)
    expect((await store.listCases({ status: "closed", page: 1, pageSize: 10 })).items.map((i) => i.reference)).toEqual([b])
    expect((await store.listCases({ notifyProblem: true, page: 1, pageSize: 10 })).total).toBe(0)
  })
})
