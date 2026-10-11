import "server-only"

/**
 * Cloudflare Turnstile verification (bot protection for the assessment form).
 * Enabled when TURNSTILE_SECRET_KEY is set on the server; the browser widget needs
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY at build time. Without the secret, the check is
 * skipped and the honeypot and rate limits still apply.
 *
 * A token Cloudflare rejects (or a missing one) blocks the submission. If Cloudflare
 * itself cannot be reached, the submission is allowed and the outage logged, so a
 * third-party outage never silently loses a genuine applicant.
 */
export const turnstileEnabled = () => Boolean(process.env.TURNSTILE_SECRET_KEY)

export type TurnstileOutcome = "passed" | "rejected" | "unavailable" | "disabled"

export async function verifyTurnstile(token: string | null, remoteIp: string): Promise<TurnstileOutcome> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return "disabled"
  if (!token || token.length > 2048) return "rejected"
  const body = new URLSearchParams({ secret, response: token })
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp)
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) {
      console.error(`[turnstile] verification unavailable: HTTP_${res.status}`)
      return "unavailable"
    }
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null
    if (!data) {
      console.error("[turnstile] verification unavailable: bad response")
      return "unavailable"
    }
    return data.success === true ? "passed" : "rejected"
  } catch {
    console.error("[turnstile] verification unavailable: NETWORK")
    return "unavailable"
  }
}
