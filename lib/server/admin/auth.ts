import "server-only"
import { createHash, randomBytes } from "node:crypto"
import type { CaseStore, StaffMember } from "@/lib/server/case-store/types"

/**
 * Staff authentication for the admin dashboard.
 *
 * - Sign-in is by a one-time emailed link, offered only to addresses in the staff
 *   allow-list (staff_users). The link expires after LOGIN_TOKEN_TTL_MINUTES and works once.
 * - A session is a random 256-bit token in an HttpOnly cookie. Only its SHA-256 hash is
 *   stored, so a database leak does not leak usable sessions or links.
 * - Every request re-checks that the session is live AND the staff member is still
 *   active, so removing someone from staff_users locks them out at once.
 * - State-changing requests must come from this site's own pages (Origin check), on top
 *   of the SameSite=Lax cookie.
 */
export const SESSION_COOKIE = "isn_staff"
export const SESSION_TTL_SECONDS = 12 * 60 * 60
export const LOGIN_TOKEN_TTL_MINUTES = 15
/** Lifetime of a signed document URL: long enough to open the file, short enough not to be shareable. */
export const DOCUMENT_URL_TTL_SECONDS = 120

export const newToken = () => randomBytes(32).toString("base64url")
export const hashToken = (token: string) => createHash("sha256").update(token, "utf8").digest("hex")
const TOKEN_SHAPE = /^[A-Za-z0-9_-]{43}$/

export function readCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null
  for (const part of cookieHeader.split(";")) {
    const [key, ...rest] = part.trim().split("=")
    if (key === name) return rest.join("=") || null
  }
  return null
}

/** Treat the request as HTTPS when the platform says so; always in production. */
export function isSecureRequest(request: Request): boolean {
  if (process.env.NODE_ENV === "production") return true
  if (request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() === "https") return true
  return new URL(request.url).protocol === "https:"
}

export function sessionCookie(value: string, secure: boolean): string {
  return [
    `${SESSION_COOKIE}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_TTL_SECONDS}`,
    ...(secure ? ["Secure"] : []),
  ].join("; ")
}

export function clearedSessionCookie(secure: boolean): string {
  return [`${SESSION_COOKIE}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0", ...(secure ? ["Secure"] : [])].join("; ")
}

/**
 * Accept a state-changing request only from this site's own pages. Browsers always
 * send Origin on cross-site POSTs, so a forged form on another site is refused.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  if (!origin || origin === "null") return false
  const host = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() || request.headers.get("host") || new URL(request.url).host
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export async function staffFromToken(store: CaseStore, token: string | null, now = new Date()): Promise<StaffMember | null> {
  if (!token || !TOKEN_SHAPE.test(token)) return null
  return store.getSessionStaff(hashToken(token), now)
}

export function staffFromRequest(store: CaseStore, request: Request, now = new Date()): Promise<StaffMember | null> {
  return staffFromToken(store, readCookie(request.headers.get("cookie"), SESSION_COOKIE), now)
}

export function isWellFormedToken(token: string): boolean {
  return TOKEN_SHAPE.test(token)
}
