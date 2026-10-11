import { describe, expect, it, vi } from "vitest"
import type { SupabaseClient } from "@supabase/supabase-js"
import { SupabaseCaseStore } from "@/lib/server/case-store/supabase"
import type { ValidatedUpload } from "@/lib/server/uploads"
import { refusalCase } from "./fixtures"

/**
 * The Supabase store against a recording fake of the supabase-js client. No Supabase
 * project (staging or production) is contacted; the tests check exactly which queries
 * and filters the store sends.
 */

type Call = [method: string, args: unknown[]]
type Op = { table: string; calls: Call[] }
type Result = { data?: unknown; error?: { message: string; code?: string } | null; count?: number | null }

function fakeClient(respond: (op: Op) => Result, storage: Partial<Record<"upload" | "remove" | "createSignedUrl", (...a: unknown[]) => unknown>> = {}) {
  const ops: Op[] = []
  const storageCalls: Call[] = []
  const from = (table: string) => {
    const op: Op = { table, calls: [] }
    ops.push(op)
    const proxy: unknown = new Proxy(
      {},
      {
        get(_t, prop) {
          if (prop === "then") {
            return (ok: (v: unknown) => unknown, fail: (e: unknown) => unknown) =>
              Promise.resolve({ data: null, error: null, count: null, ...respond(op) }).then(ok, fail)
          }
          return (...args: unknown[]) => {
            op.calls.push([String(prop), args])
            return proxy
          }
        },
      }
    )
    return proxy
  }
  const bucket = {
    upload: async (...a: unknown[]) => (storageCalls.push(["upload", a]), storage.upload?.(...a) ?? { data: {}, error: null }),
    remove: async (...a: unknown[]) => (storageCalls.push(["remove", a]), storage.remove?.(...a) ?? { data: [], error: null }),
    createSignedUrl: async (...a: unknown[]) => (storageCalls.push(["createSignedUrl", a]), storage.createSignedUrl?.(...a) ?? { data: null, error: null }),
  }
  const client = { from, storage: { from: () => bucket } } as unknown as SupabaseClient
  return { client, ops, storageCalls }
}

const has = (op: Op, method: string, ...args: unknown[]) => op.calls.some(([m, a]) => m === method && args.every((x, i) => JSON.stringify(a[i]) === JSON.stringify(x)))
const CASE_ID = "11111111-2222-4333-8444-555555555555"
const DOC_ID = "66666666-7777-4888-9999-000000000000"
const SUBMISSION = "3f1d2c4b-5a69-4e7f-8a1b-2c3d4e5f6a7b"
const consent = { version: "2026-10-07", accuracy: true, privacy: true, noGuarantee: true, acceptedAt: "2026-10-11T08:00:00Z" }
const pdf: ValidatedUpload = { slot: "caseDocument", contentType: "application/pdf", extension: "pdf", size: 10, originalName: "a.pdf", bytes: new Uint8Array([1]) }

describe("SupabaseCaseStore: intake", () => {
  it("returns the existing case for a repeated submission id without inserting", async () => {
    const { client, ops } = fakeClient((op) => {
      if (op.table === "visa_cases") return { data: { id: CASE_ID, reference: "ISN-2026-000007", created_at: "2026-10-11T08:00:00Z" } }
      if (op.table === "visa_case_documents") return { count: 1 }
      return {}
    })
    const stored = await new SupabaseCaseStore(client, "case-documents").createVisaCase({ answers: refusalCase(), consent, documents: [], submissionId: SUBMISSION })
    expect(stored).toEqual({ id: CASE_ID, reference: "ISN-2026-000007", createdAt: "2026-10-11T08:00:00Z", documentCount: 1, duplicate: true })
    expect(ops.some((o) => o.table === "visa_cases" && o.calls.some(([m]) => m === "insert"))).toBe(false)
    expect(ops.find((o) => o.table === "visa_case_events")!.calls[0]).toEqual(["insert", [{ case_id: CASE_ID, actor: "system", type: "duplicate_submission", data: {} }]])
  })

  it("resolves a race on the unique submission id to the case that won", async () => {
    let lookups = 0
    const { client } = fakeClient((op) => {
      if (op.table === "visa_cases" && op.calls.some(([m]) => m === "insert")) return { error: { message: "duplicate key", code: "23505" } }
      if (op.table === "visa_cases") return lookups++ === 0 ? { data: null } : { data: { id: CASE_ID, reference: "ISN-2026-000008", created_at: "t" } }
      if (op.table === "visa_case_documents") return { count: 0 }
      return {}
    })
    const stored = await new SupabaseCaseStore(client, "b").createVisaCase({ answers: refusalCase(), consent, documents: [], submissionId: SUBMISSION })
    expect(stored).toMatchObject({ reference: "ISN-2026-000008", duplicate: true })
  })

  it("removes uploaded files and the case row when a document fails, and reports the failure", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    let uploads = 0
    const { client, ops, storageCalls } = fakeClient(
      (op) => {
        if (op.table === "visa_cases" && op.calls.some(([m]) => m === "insert")) return { data: { id: CASE_ID, reference: "ISN-2026-000009", created_at: "t" } }
        return {}
      },
      { upload: () => (uploads++ === 0 ? { data: {}, error: null } : { data: null, error: { message: "storage down" } }) }
    )
    await expect(new SupabaseCaseStore(client, "b").createVisaCase({ answers: refusalCase(), consent, documents: [pdf, { ...pdf, slot: "jobOffer" }] })).rejects.toThrow(
      "Could not store document"
    )
    const removed = storageCalls.find(([m]) => m === "remove")![1][0] as string[]
    expect(removed).toHaveLength(1)
    expect(removed[0]).toMatch(/^ISN-2026-000009\/caseDocument-/)
    expect(ops.some((o) => o.table === "visa_cases" && has(o, "delete") && has(o, "eq", "id", CASE_ID))).toBe(true)
    expect(ops.some((o) => o.table === "visa_case_events")).toBe(false)
    error.mockRestore()
  })

  it("stores the submission id and records a 'created' event", async () => {
    const { client, ops } = fakeClient((op) =>
      op.table === "visa_cases" && op.calls.some(([m]) => m === "insert") ? { data: { id: CASE_ID, reference: "ISN-2026-000010", created_at: "t" } } : { data: null }
    )
    const stored = await new SupabaseCaseStore(client, "b").createVisaCase({ answers: refusalCase(), consent, documents: [], submissionId: SUBMISSION })
    expect(stored.duplicate).toBe(false)
    const insert = ops.find((o) => o.table === "visa_cases" && has(o, "insert"))!.calls.find(([m]) => m === "insert")![1][0] as Record<string, unknown>
    expect(insert.submission_id).toBe(SUBMISSION)
    expect(ops.find((o) => o.table === "visa_case_events")!.calls[0][1][0]).toMatchObject({ type: "created", case_id: CASE_ID })
  })
})

describe("SupabaseCaseStore: staff dashboard", () => {
  it("strips filter syntax from search input before it reaches PostgREST", async () => {
    const { client, ops } = fakeClient(() => ({ data: [], count: 0 }))
    await new SupabaseCaseStore(client, "b").listCases({ search: 'x%"),status.eq.closed,(id.neq.0', page: 2, pageSize: 25 })
    const op = ops[0]
    const orArg = String(op.calls.find(([m]) => m === "or")![1][0])
    const value = /^reference\.ilike\."%(.*?)%",full_name\.ilike/.exec(orArg)![1]
    expect(value).toBe("x status.eq.closed id.neq.0")
    expect(value).not.toMatch(/[",()%]/)
    expect(has(op, "range", 25, 49)).toBe(true)
  })

  it("only signs URLs for a document that belongs to the case, for the requested lifetime", async () => {
    const { client, ops, storageCalls } = fakeClient(
      (op) => {
        if (op.table === "visa_cases") return { data: { id: CASE_ID, status: "new" } }
        if (op.table === "visa_case_documents")
          return { data: { id: DOC_ID, slot: "caseDocument", original_name: "a.pdf", content_type: "application/pdf", size_bytes: 1, created_at: "t", storage_path: "ISN-2026-000001/x.pdf" } }
        return {}
      },
      { createSignedUrl: () => ({ data: { signedUrl: "https://storage.example/signed?token=abc" }, error: null }) }
    )
    const access = await new SupabaseCaseStore(client, "b").getDocumentAccess("ISN-2026-000001", DOC_ID, 120, "lead@example.org")
    expect(access).toMatchObject({ kind: "url", url: "https://storage.example/signed?token=abc" })
    const docQuery = ops.find((o) => o.table === "visa_case_documents")!
    expect(has(docQuery, "eq", "id", DOC_ID) && has(docQuery, "eq", "case_id", CASE_ID)).toBe(true)
    expect(storageCalls.find(([m]) => m === "createSignedUrl")![1]).toEqual(["ISN-2026-000001/x.pdf", 120])
    expect(ops.find((o) => o.table === "visa_case_events")!.calls[0][1][0]).toMatchObject({ type: "document_viewed", actor: "lead@example.org" })
  })

  it("never queries for malformed references or document ids", async () => {
    const { client, ops } = fakeClient(() => ({}))
    const store = new SupabaseCaseStore(client, "b")
    expect(await store.getDocumentAccess("ISN-2026-000001", "../x", 120, "a")).toBeNull()
    expect(await store.getCase("ISN-2026-000001,reference.neq.x")).toBeNull()
    expect(ops).toHaveLength(0)
  })

  it("records status changes with the previous value and the staff member", async () => {
    const { client, ops } = fakeClient((op) => (op.table === "visa_cases" && has(op, "select", "id, status") ? { data: { id: CASE_ID, status: "new" } } : {}))
    expect(await new SupabaseCaseStore(client, "b").updateStatus("ISN-2026-000001", "contacted", "lead@example.org")).toEqual({ from: "new" })
    expect(ops.find((o) => o.table === "visa_case_events")!.calls[0][1][0]).toEqual({
      case_id: CASE_ID,
      actor: "lead@example.org",
      type: "status_changed",
      data: { from: "new", to: "contacted" },
    })
  })
})

describe("SupabaseCaseStore: staff authentication", () => {
  it("uses a sign-in token with a single conditional update (unused and unexpired only)", async () => {
    const { client, ops } = fakeClient(() => ({ data: { email: "lead@example.org" } }))
    const now = new Date("2026-10-11T08:00:00Z")
    expect(await new SupabaseCaseStore(client, "b").consumeLoginToken("a".repeat(64), now)).toBe("lead@example.org")
    const op = ops[0]
    expect(op.table).toBe("staff_login_tokens")
    expect(has(op, "update", { used_at: now.toISOString() })).toBe(true)
    expect(has(op, "is", "used_at", null)).toBe(true)
    expect(has(op, "gt", "expires_at", now.toISOString())).toBe(true)
  })

  it("accepts a session only while it is live and the staff member is still active", async () => {
    const { client, ops } = fakeClient((op) => (op.table === "staff_sessions" ? { data: { email: "lead@example.org" } } : { data: null }))
    expect(await new SupabaseCaseStore(client, "b").getSessionStaff("b".repeat(64), new Date())).toBeNull()
    const session = ops.find((o) => o.table === "staff_sessions")!
    expect(has(session, "is", "revoked_at", null)).toBe(true)
    const staff = ops.find((o) => o.table === "staff_users")!
    expect(has(staff, "eq", "active", true)).toBe(true)
  })
})
