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

/**
 * Identify the client for rate limiting.
 * Prefer X-Real-IP, which the hosting edge (Railway, Vercel) sets to the connecting IP.
 * The FIRST X-Forwarded-For entry is whatever the client sent, so never use it; if
 * X-Real-IP is missing, fall back to the LAST entry, which the nearest proxy appends.
 */
export function clientKey(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim()
  if (realIp) return realIp
  const lastForwarded = request.headers.get("x-forwarded-for")?.split(",").pop()?.trim()
  return lastForwarded || "unknown"
}
