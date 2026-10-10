import "server-only"
import { siteUrl } from "@/lib/site-config"
import { destinationLabel } from "@/lib/visa-assessment/summary"
import { CASE_TYPES, CONTACT_METHODS, VISA_TYPES, labelFor } from "@/lib/visa-assessment/options"
import { notifyStaffOfNewCase, sendStaffSignInLink } from "@/lib/server/notify"
import { clientKey, rateLimit } from "@/lib/server/rate-limit"
import { isCaseReference, isCaseStatus, type CaseStore, type NotifyResult, type StaffMember } from "@/lib/server/case-store/types"
import {
  DOCUMENT_URL_TTL_SECONDS,
  LOGIN_TOKEN_TTL_MINUTES,
  SESSION_TTL_SECONDS,
  clearedSessionCookie,
  hashToken,
  isSameOrigin,
  isSecureRequest,
  isWellFormedToken,
  newToken,
  readCookie,
  SESSION_COOKIE,
  sessionCookie,
  staffFromRequest,
} from "./auth"

export const MAX_NOTE_LENGTH = 4000

type Deps = { now?: () => Date }

const redirect = (location: string, headers: Record<string, string> = {}) =>
  new Response(null, { status: 303, headers: { Location: location, "Cache-Control": "no-store", ...headers } })

const plain = (status: number, text: string) =>
  new Response(text, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } })

const caseUrl = (reference: string, query = "") => `/admin/cases/${encodeURIComponent(reference)}${query ? `?${query}` : ""}`

async function readForm(request: Request): Promise<URLSearchParams | null> {
  const type = request.headers.get("content-type") ?? ""
  if (!type.includes("application/x-www-form-urlencoded") && !type.includes("multipart/form-data")) return null
  try {
    const form = await request.formData()
    const params = new URLSearchParams()
    for (const [k, v] of form.entries()) if (typeof v === "string") params.append(k, v)
    return params
  } catch {
    return null
  }
}

/** Shared gate for staff POST actions: same-origin, signed in, active. */
async function authorisePost(request: Request, store: CaseStore | null, now: Date): Promise<{ staff: StaffMember; store: CaseStore } | Response> {
  if (!isSameOrigin(request)) return plain(403, "Forbidden")
  if (!store) return plain(503, "Case storage is not configured.")
  const staff = await staffFromRequest(store, request, now)
  if (!staff) return redirect("/admin/login?error=session")
  return { staff, store }
}

// ---------- sign-in ----------

/**
 * POST /api/admin/login (form field: email). Always answers the same way, so the form
 * cannot be used to discover which addresses are staff.
 */
export async function handleSignInRequest(request: Request, store: CaseStore | null, deps: Deps = {}): Promise<Response> {
  if (!isSameOrigin(request)) return plain(403, "Forbidden")
  if (!store) return redirect("/admin/login?error=unavailable")
  const now = deps.now?.() ?? new Date()
  const form = await readForm(request)
  const email = (form?.get("email") ?? "").trim().toLowerCase()
  const sent = redirect("/admin/login?sent=1")
  if (!email || email.length > 200 || !email.includes("@")) return redirect("/admin/login?error=email")

  if (!rateLimit(`admin-login-ip:${clientKey(request)}`, 10, 15 * 60 * 1000) || !rateLimit(`admin-login-email:${email}`, 3, 15 * 60 * 1000)) {
    return sent
  }
  const staff = await store.findActiveStaff(email)
  if (!staff) return sent

  const token = newToken()
  await store.createLoginToken(hashToken(token), staff.email, new Date(now.getTime() + LOGIN_TOKEN_TTL_MINUTES * 60 * 1000))
  // Built from the configured site URL, never from request headers (prevents link poisoning).
  const link = `${siteUrl}/admin/login/verify?token=${token}`
  const result = await sendStaffSignInLink(staff.email, link, LOGIN_TOKEN_TTL_MINUTES)
  if (result.status !== "sent") {
    console.error(`[admin] sign-in link not sent: ${result.code ?? result.status}`)
    if (process.env.NODE_ENV === "development" && result.code === "NOT_CONFIGURED") {
      // Local development without email: print the link to the developer's own terminal.
      console.info(`[admin] development sign-in link: ${link}`)
    }
  }
  return sent
}

/**
 * POST /api/admin/session (form field: token). The emailed link opens a page with a
 * button that posts here, so email scanners that pre-fetch links cannot use up the token.
 */
export async function handleSignInComplete(request: Request, store: CaseStore | null, deps: Deps = {}): Promise<Response> {
  if (!isSameOrigin(request)) return plain(403, "Forbidden")
  if (!store) return redirect("/admin/login?error=unavailable")
  if (!rateLimit(`admin-verify-ip:${clientKey(request)}`, 20, 15 * 60 * 1000)) return redirect("/admin/login?error=link")
  const now = deps.now?.() ?? new Date()
  const form = await readForm(request)
  const token = (form?.get("token") ?? "").trim()
  if (!isWellFormedToken(token)) return redirect("/admin/login?error=link")

  const email = await store.consumeLoginToken(hashToken(token), now)
  const staff = email ? await store.findActiveStaff(email) : null
  if (!staff) return redirect("/admin/login?error=link")

  const session = newToken()
  await store.createSession(hashToken(session), staff.email, new Date(now.getTime() + SESSION_TTL_SECONDS * 1000))
  return redirect("/admin", { "Set-Cookie": sessionCookie(session, isSecureRequest(request)) })
}

/** POST /api/admin/logout */
export async function handleSignOut(request: Request, store: CaseStore | null): Promise<Response> {
  if (!isSameOrigin(request)) return plain(403, "Forbidden")
  const token = readCookie(request.headers.get("cookie"), SESSION_COOKIE)
  if (store && token && isWellFormedToken(token)) await store.revokeSession(hashToken(token))
  return redirect("/admin/login?signed_out=1", { "Set-Cookie": clearedSessionCookie(isSecureRequest(request)) })
}

// ---------- case actions ----------

/** POST /api/admin/cases/[reference]/status (form field: status) */
export async function handleStatusUpdate(request: Request, reference: string, store: CaseStore | null, deps: Deps = {}): Promise<Response> {
  const auth = await authorisePost(request, store, deps.now?.() ?? new Date())
  if (auth instanceof Response) return auth
  if (!isCaseReference(reference)) return plain(404, "Case not found")
  const status = (await readForm(request))?.get("status")
  if (!isCaseStatus(status)) return redirect(caseUrl(reference, "error=status"))
  const result = await auth.store.updateStatus(reference, status, auth.staff.email)
  if (!result) return plain(404, "Case not found")
  return redirect(caseUrl(reference, "saved=status"))
}

/** POST /api/admin/cases/[reference]/notes (form field: note) */
export async function handleAddNote(request: Request, reference: string, store: CaseStore | null, deps: Deps = {}): Promise<Response> {
  const auth = await authorisePost(request, store, deps.now?.() ?? new Date())
  if (auth instanceof Response) return auth
  if (!isCaseReference(reference)) return plain(404, "Case not found")
  const note = ((await readForm(request))?.get("note") ?? "").trim()
  if (!note || note.length > MAX_NOTE_LENGTH) return redirect(caseUrl(reference, "error=note"))
  const ok = await auth.store.addNote(reference, note, auth.staff.email)
  if (!ok) return plain(404, "Case not found")
  return redirect(caseUrl(reference, "saved=note"))
}

/** POST /api/admin/cases/[reference]/notify: send the staff alert again (e.g. after a failure). */
export async function handleRetryNotification(request: Request, reference: string, store: CaseStore | null, deps: Deps = {}): Promise<Response> {
  const auth = await authorisePost(request, store, deps.now?.() ?? new Date())
  if (auth instanceof Response) return auth
  if (!rateLimit(`admin-notify:${auth.staff.email}`, 10, 10 * 60 * 1000)) return redirect(caseUrl(reference, "error=notify_limit"))
  const c = isCaseReference(reference) ? await auth.store.getCase(reference) : null
  if (!c) return plain(404, "Case not found")
  const a = c.answers
  const result: NotifyResult = await notifyStaffOfNewCase({
    reference: c.reference,
    createdAt: c.createdAt,
    caseType: labelFor(CASE_TYPES, a.caseType),
    destination: destinationLabel(a),
    visaPurpose: labelFor(VISA_TYPES, a.visaType),
    preferredContact: labelFor(CONTACT_METHODS, a.preferredContact),
    travel: a.travelDateUnknown ? "Not sure yet" : (a.travelDate ?? "Not given"),
    documentCount: c.documents.length,
  }).catch((): NotifyResult => ({ status: "failed", code: "UNEXPECTED" }))
  await auth.store.recordNotification(c.id, "staff", result, auth.staff.email)
  return redirect(caseUrl(reference, `notified=${result.status}`))
}

/**
 * GET /api/admin/cases/[reference]/documents/[documentId]
 * Signed in staff only. Redirects to a short-lived signed URL for the private file
 * (or, in local development, returns the bytes). Each access is recorded on the case.
 */
export async function handleDocument(request: Request, reference: string, documentId: string, store: CaseStore | null, deps: Deps = {}): Promise<Response> {
  if (!store) return plain(503, "Case storage is not configured.")
  const staff = await staffFromRequest(store, request, deps.now?.() ?? new Date())
  if (!staff) return redirect("/admin/login?error=session")
  const access = await store.getDocumentAccess(reference, documentId, DOCUMENT_URL_TTL_SECONDS, staff.email)
  if (!access) return plain(404, "Document not found")
  const securityHeaders = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" }
  if (access.kind === "url") {
    return new Response(null, { status: 303, headers: { Location: access.url, ...securityHeaders } })
  }
  const safeName = (access.document.originalName ?? "document").replace(/[^\w.\- ]+/g, "_")
  return new Response(new Blob([access.bytes as BlobPart]), {
    status: 200,
    headers: {
      ...securityHeaders,
      "Content-Type": access.document.contentType,
      "Content-Disposition": `inline; filename="${safeName}"`,
      "Content-Security-Policy": "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
    },
  })
}
