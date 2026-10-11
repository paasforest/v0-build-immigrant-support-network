import "server-only"
import { siteConfig, siteUrl } from "@/lib/site-config"
import type { NotifyResult } from "@/lib/server/case-store/types"

/**
 * Email notifications via Resend's HTTP API (no SDK needed).
 * Configure RESEND_API_KEY, NOTIFY_FROM_EMAIL (a sender on a domain verified in Resend)
 * and CASE_NOTIFY_EMAIL (staff inbox; comma-separated for several).
 *
 * Every send returns a result that callers record on the case:
 *  - sent     Resend accepted the message
 *  - skipped  not configured (code NOT_CONFIGURED / NO_STAFF_ADDRESS) or deliberately not sent
 *  - failed   Resend refused it (HTTP_<status>) or could not be reached (NETWORK)
 * Only the status and a short code are kept or logged, never message bodies or
 * Resend's response text, which can echo addresses. Documents are never emailed.
 */

type Email = { to: string[]; subject: string; text: string; replyTo?: string }

function config() {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.NOTIFY_FROM_EMAIL
  const staff = (process.env.CASE_NOTIFY_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  return apiKey && from ? { apiKey, from, staff } : null
}

export async function sendEmail(email: Email): Promise<NotifyResult> {
  const cfg = config()
  if (!cfg) return { status: "skipped", code: "NOT_CONFIGURED" }
  if (email.to.length === 0) return { status: "skipped", code: "NO_RECIPIENT" }
  let res: Response
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: cfg.from, to: email.to, subject: email.subject, text: email.text, reply_to: email.replyTo }),
      signal: AbortSignal.timeout(8000),
    })
  } catch (err) {
    const code = err instanceof Error && err.name === "TimeoutError" ? "TIMEOUT" : "NETWORK"
    console.error(`[notify] email not sent: ${code}`)
    return { status: "failed", code }
  }
  await res.body?.cancel().catch(() => {})
  if (!res.ok) {
    console.error(`[notify] email not sent: HTTP_${res.status}`)
    return { status: "failed", code: `HTTP_${res.status}` }
  }
  return { status: "sent" }
}

/** Generic staff alert (used by the contact form). */
export async function notifyStaff(subject: string, lines: string[], replyTo?: string): Promise<NotifyResult> {
  const cfg = config()
  if (!cfg) return { status: "skipped", code: "NOT_CONFIGURED" }
  if (cfg.staff.length === 0) return { status: "skipped", code: "NO_STAFF_ADDRESS" }
  return sendEmail({ to: cfg.staff, subject, text: lines.join("\n"), replyTo })
}

export const adminCaseUrl = (reference: string) => `${siteUrl}/admin/cases/${encodeURIComponent(reference)}`

export type NewCaseNotice = {
  reference: string
  createdAt: string
  caseType: string
  destination: string
  visaPurpose: string
  preferredContact: string
  travel: string
  documentCount: number
}

/**
 * Staff alert for a new assessment. Deliberately minimal: no name, email, phone or
 * free-text answers, so a forwarded or intercepted email exposes as little as possible.
 * Everything else is behind the signed-in staff dashboard link.
 */
export function newCaseEmail(c: NewCaseNotice): { subject: string; text: string } {
  return {
    subject: `New visa assessment ${c.reference}: ${c.caseType} (${c.destination})`,
    text: [
      `A new visa assessment has been submitted on ${siteConfig.name}.`,
      "",
      `Reference: ${c.reference}`,
      `Received: ${c.createdAt}`,
      `Case type: ${c.caseType}`,
      `Destination: ${c.destination}`,
      `Visa purpose: ${c.visaPurpose}`,
      `Intended travel: ${c.travel}`,
      `Preferred contact: ${c.preferredContact}`,
      `Documents uploaded: ${c.documentCount}`,
      "",
      `Open the case (staff sign-in required): ${adminCaseUrl(c.reference)}`,
      "",
      "Contact details, answers and documents are only available in the staff dashboard.",
    ].join("\n"),
  }
}

export async function notifyStaffOfNewCase(c: NewCaseNotice): Promise<NotifyResult> {
  const { subject, text } = newCaseEmail(c)
  return notifyStaff(subject, text.split("\n"))
}

export async function sendApplicantConfirmation(to: string, name: string, reference: string): Promise<NotifyResult> {
  const first = name.trim().split(/\s+/)[0] || "there"
  return sendEmail({
    to: [to],
    replyTo: siteConfig.email,
    subject: `We received your visa assessment (${reference})`,
    text: [
      `Hi ${first},`,
      "",
      `Thank you for submitting your visa assessment to ${siteConfig.name}. Your reference number is ${reference}.`,
      "",
      "What happens next:",
      "1. We review the information you sent.",
      "2. We contact you about the next steps, including the service your case needs and our quotation.",
      "3. You decide whether to proceed. Submitting an assessment does not commit you to anything.",
      "",
      "Please do not send passport scans, bank statements or other documents unless we ask for them.",
      "We will never ask for passwords to government or visa-centre portals.",
      "",
      "If you did not submit this assessment, you can ignore this email.",
      "",
      `${siteConfig.name} is a private visa assistance service. We are not a government office, embassy, consulate or visa application centre. Visa decisions are made by the relevant authority and cannot be guaranteed.`,
      "",
      `${siteConfig.name}`,
      `${siteConfig.email} · WhatsApp ${siteConfig.phoneDisplay}`,
    ].join("\n"),
  })
}

export async function sendStaffSignInLink(to: string, link: string, minutes: number): Promise<NotifyResult> {
  return sendEmail({
    to: [to],
    subject: `Your ${siteConfig.shortName} staff sign-in link`,
    text: [
      `Use this link to sign in to the ${siteConfig.name} staff dashboard:`,
      "",
      link,
      "",
      `It works once and expires in ${minutes} minutes. If you did not ask to sign in, ignore this email.`,
    ].join("\n"),
  })
}
