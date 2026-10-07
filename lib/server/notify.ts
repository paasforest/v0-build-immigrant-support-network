import "server-only"
import { siteConfig } from "@/lib/site-config"

/**
 * Optional email notifications via Resend's HTTP API (no SDK needed).
 * Configure RESEND_API_KEY, NOTIFY_FROM_EMAIL (a verified sender) and
 * CASE_NOTIFY_EMAIL (staff inbox). If not configured, notifications are skipped.
 * The case is ALWAYS stored first; a failed notification never loses the case.
 * Documents are never attached to emails.
 */

type Email = { to: string; subject: string; text: string; replyTo?: string }

function config() {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.NOTIFY_FROM_EMAIL
  const staff = process.env.CASE_NOTIFY_EMAIL
  return apiKey && from ? { apiKey, from, staff } : null
}

async function send(email: Email): Promise<boolean> {
  const cfg = config()
  if (!cfg) return false
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: cfg.from, to: [email.to], subject: email.subject, text: email.text, reply_to: email.replyTo }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) console.error(`[notify] email failed: ${res.status} ${await res.text().catch(() => "")}`)
    return res.ok
  } catch (err) {
    console.error("[notify] email error", err)
    return false
  }
}

export async function notifyStaff(subject: string, lines: string[], replyTo?: string): Promise<boolean> {
  const cfg = config()
  if (!cfg?.staff) return false
  return send({ to: cfg.staff, subject, text: lines.join("\n"), replyTo })
}

export async function sendApplicantConfirmation(to: string, name: string, reference: string): Promise<boolean> {
  const first = name.trim().split(/\s+/)[0] || "there"
  return send({
    to,
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
      `${siteConfig.name} is a private visa assistance service. We are not a government office, embassy, consulate or visa application centre. Visa decisions are made by the relevant authority and cannot be guaranteed.`,
      "",
      `${siteConfig.name}`,
      `${siteConfig.email} · WhatsApp ${siteConfig.phoneDisplay}`,
    ].join("\n"),
  })
}
