import "server-only"

/**
 * Small in-memory sliding-window limiter. Best-effort only: on serverless platforms
 * each instance keeps its own memory. It still stops simple scripted floods; add
 * a CAPTCHA (e.g. Cloudflare Turnstile) if abuse appears.
 */
const hits = new Map<string, number[]>()

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(k)
  }
  return true
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  return (forwarded?.split(",")[0] || request.headers.get("x-real-ip") || "unknown").trim()
}
