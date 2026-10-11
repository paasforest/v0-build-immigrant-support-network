import "server-only"
import { visaAssessmentSchema, uploadSlotsFor } from "@/lib/visa-assessment/schema"
import { pruneAnswers } from "@/lib/visa-assessment/prune"
import { destinationLabel } from "@/lib/visa-assessment/summary"
import { CASE_TYPES, CONTACT_METHODS, VISA_TYPES, labelFor } from "@/lib/visa-assessment/options"
import { readLimitedFormData, validateUploads, UploadError } from "@/lib/server/uploads"
import { notifyStaffOfNewCase, sendApplicantConfirmation } from "@/lib/server/notify"
import { clientKey, rateLimit } from "@/lib/server/rate-limit"
import { verifyTurnstile } from "@/lib/server/turnstile"
import { isUuid, type CaseStore, type NotifyChannel, type NotifyResult, type StoredVisaCase } from "@/lib/server/case-store/types"

/** Bump when the consent wording on the form changes. */
export const CONSENT_VERSION = "2026-10-07"

/**
 * Applicant confirmations go to whatever address is typed into the form, so cap them
 * per address to stop the form being used to send email to third parties.
 */
export const MAX_CONFIRMATIONS_PER_EMAIL_PER_DAY = 3

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
  const ip = clientKey(request)
  if (!rateLimit(`assessment:${ip}`, 5, 10 * 60 * 1000)) {
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

  // Optional for forms loaded before this field existed; when present it must be a UUID.
  const submissionId = String(form.get("submissionId") ?? "").trim() || undefined
  if (submissionId !== undefined && !isUuid(submissionId)) return json(400, { error: "Invalid submission." })

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

  const turnstile = await verifyTurnstile(String(form.get("turnstileToken") ?? "") || null, ip)
  if (turnstile === "rejected") {
    return json(400, { error: "Please complete the security check and submit again.", code: "SECURITY_CHECK" })
  }

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
  let stored: StoredVisaCase
  try {
    stored = await store.createVisaCase({
      answers,
      documents,
      submissionId,
      consent: {
        version: CONSENT_VERSION,
        accuracy: values.consentAccuracy,
        privacy: values.consentPrivacy,
        noGuarantee: values.consentNoGuarantee,
        acceptedAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error("[visa-assessment] store failed", err instanceof Error ? err.message : "unknown error")
    return json(500, { error: GENERIC_FAILURE })
  }

  // A retried submission (same submissionId) gets the original reference and no repeat emails.
  if (stored.duplicate) {
    return json(200, { reference: stored.reference, documentCount: stored.documentCount, duplicate: true })
  }

  // Notifications are best-effort: the case is already safely stored. Each outcome is
  // recorded on the case so staff can see (and retry) anything that was not delivered.
  const record = async (channel: NotifyChannel, result: NotifyResult) => {
    try {
      await store.recordNotification(stored.id, channel, result, "system")
    } catch (err) {
      console.error(`[visa-assessment] could not record ${channel} notification for ${stored.reference}`, err instanceof Error ? err.message : "")
    }
  }

  await Promise.allSettled([
    (async () => {
      const result = await notifyStaffOfNewCase({
        reference: stored.reference,
        createdAt: stored.createdAt,
        caseType: labelFor(CASE_TYPES, answers.caseType),
        destination: destinationLabel(answers),
        visaPurpose: labelFor(VISA_TYPES, answers.visaType),
        preferredContact: labelFor(CONTACT_METHODS, answers.preferredContact),
        travel: answers.travelDateUnknown ? "Not sure yet" : (answers.travelDate ?? "Not given"),
        documentCount: stored.documentCount,
      }).catch((): NotifyResult => ({ status: "failed", code: "UNEXPECTED" }))
      await record("staff", result)
    })(),
    (async () => {
      if (!answers.email || !answers.fullName) return
      let result: NotifyResult
      try {
        const recent = await store.countCasesForEmailSince(answers.email, new Date(Date.now() - 24 * 60 * 60 * 1000))
        result =
          recent > MAX_CONFIRMATIONS_PER_EMAIL_PER_DAY
            ? { status: "skipped", code: "DAILY_LIMIT" }
            : await sendApplicantConfirmation(answers.email, answers.fullName, stored.reference)
      } catch {
        result = { status: "failed", code: "UNEXPECTED" }
      }
      await record("applicant", result)
    })(),
  ])

  return json(201, { reference: stored.reference, documentCount: stored.documentCount })
}
