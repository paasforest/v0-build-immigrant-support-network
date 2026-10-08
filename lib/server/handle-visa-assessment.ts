import "server-only"
import { visaAssessmentSchema, uploadSlotsFor } from "@/lib/visa-assessment/schema"
import { pruneAnswers } from "@/lib/visa-assessment/prune"
import { destinationLabel, summariseCase } from "@/lib/visa-assessment/summary"
import { CASE_TYPES, VISA_TYPES, labelFor } from "@/lib/visa-assessment/options"
import { readLimitedFormData, validateUploads, UploadError } from "@/lib/server/uploads"
import { notifyStaff, sendApplicantConfirmation } from "@/lib/server/notify"
import { clientKey, rateLimit } from "@/lib/server/rate-limit"
import type { CaseStore } from "@/lib/server/case-store/types"

/** Bump when the consent wording on the form changes. */
export const CONSENT_VERSION = "2026-10-07"

type Json = Record<string, unknown>
const json = (status: number, body: Json) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } })

const GENERIC_FAILURE =
  "We could not submit your assessment right now. Nothing has been saved. Please try again in a few minutes, or contact us on WhatsApp."

export async function handleVisaAssessment(request: Request, store: CaseStore | null): Promise<Response> {
  if (!store) {
    console.error("[visa-assessment] no case store configured (set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)")
    return json(503, { error: GENERIC_FAILURE })
  }
  if (!rateLimit(`assessment:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
    return json(429, { error: "Too many submissions from this connection. Please wait a few minutes and try again." })
  }
  if (!(request.headers.get("content-type") ?? "").includes("multipart/form-data")) {
    return json(400, { error: "Invalid submission." })
  }

  let form: FormData
  try {
    form = await readLimitedFormData(request)
  } catch (err) {
    if (err instanceof UploadError) return json(err.status, { error: err.message })
    return json(400, { error: "Invalid submission." })
  }

  let raw: unknown
  try {
    raw = JSON.parse(String(form.get("payload") ?? ""))
  } catch {
    return json(400, { error: "Invalid submission." })
  }

  const parsed = visaAssessmentSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "_")
      fieldErrors[key] ??= issue.message
    }
    return json(400, { error: "Some answers need attention.", fieldErrors })
  }
  const values = parsed.data
  // Honeypot: real visitors never see or fill this field.
  if (values.website.trim() !== "") return json(400, { error: "Invalid submission." })

  const fileEntries: { slot: string; file: File }[] = []
  for (const [key, entry] of form.entries()) {
    if (key.startsWith("file:") && entry instanceof File && entry.size > 0) fileEntries.push({ slot: key.slice(5), file: entry })
  }

  let documents
  try {
    documents = await validateUploads(
      fileEntries,
      uploadSlotsFor(values).map((s) => s.slot)
    )
  } catch (err) {
    if (err instanceof UploadError) return json(err.status, { error: err.message })
    throw err
  }

  const answers = pruneAnswers(values)
  let stored
  try {
    stored = await store.createVisaCase({
      answers,
      documents,
      consent: {
        version: CONSENT_VERSION,
        accuracy: values.consentAccuracy,
        privacy: values.consentPrivacy,
        noGuarantee: values.consentNoGuarantee,
        acceptedAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error("[visa-assessment] store failed", err)
    return json(500, { error: GENERIC_FAILURE })
  }

  // Notifications are best-effort: the case is already safely stored.
  const caseLabel = labelFor(CASE_TYPES, answers.caseType)
  await Promise.allSettled([
    notifyStaff(
      `New visa assessment ${stored.reference}: ${caseLabel} (${destinationLabel(answers)})`,
      [
        `Reference: ${stored.reference}`,
        `Received: ${stored.createdAt}`,
        `Visa purpose: ${labelFor(VISA_TYPES, answers.visaType)}`,
        `Documents attached: ${stored.documentCount} (open them in the private case storage, not by email)`,
        "",
        ...summariseCase(answers).map((r) => `${r.label}: ${r.value}`),
      ],
      answers.email
    ),
    answers.email && answers.fullName ? sendApplicantConfirmation(answers.email, answers.fullName, stored.reference) : null,
  ])

  return json(201, { reference: stored.reference, documentCount: stored.documentCount })
}
