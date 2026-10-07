import "server-only"
import { CONTACT_SUBJECTS, contactSchema } from "@/lib/contact/schema"
import { notifyStaff } from "@/lib/server/notify"
import { clientKey, rateLimit } from "@/lib/server/rate-limit"
import type { CaseStore } from "@/lib/server/case-store/types"
import { CONSENT_VERSION } from "@/lib/server/handle-visa-assessment"

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } })

const GENERIC_FAILURE =
  "We could not send your message right now. It has not been delivered. Please try again."

export async function handleContact(request: Request, store: CaseStore | null): Promise<Response> {
  if (!store) {
    console.error("[contact] no case store configured")
    return json(503, { error: GENERIC_FAILURE })
  }
  if (!rateLimit(`contact:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
    return json(429, { error: "Too many messages from this connection. Please wait a few minutes and try again." })
  }
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return json(400, { error: "Invalid submission." })
  }
  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0] ?? "_")] ??= issue.message
    return json(400, { error: "Some fields need attention.", fieldErrors })
  }
  const v = parsed.data
  if (v.website.trim() !== "") return json(400, { error: "Invalid submission." })

  let stored
  try {
    stored = await store.createContactEnquiry({
      name: v.name,
      email: v.email,
      phone: v.phone,
      subject: v.subject,
      message: v.message,
      consent: { version: CONSENT_VERSION, privacy: true, acceptedAt: new Date().toISOString() },
    })
  } catch (err) {
    console.error("[contact] store failed", err)
    return json(500, { error: GENERIC_FAILURE })
  }

  const subjectLabel = CONTACT_SUBJECTS.find((s) => s.value === v.subject)?.label ?? v.subject
  await Promise.allSettled([
    notifyStaff(
      `Website message ${stored.reference}: ${subjectLabel}`,
      [`Reference: ${stored.reference}`, `From: ${v.name} <${v.email}>`, `Phone: ${v.phone || "not given"}`, "", v.message],
      v.email
    ),
  ])
  return json(201, { reference: stored.reference })
}
