import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getCaseStore } from "@/lib/server/case-store"
import type { CaseStore, StaffMember } from "@/lib/server/case-store/types"
import { SESSION_COOKIE, staffFromToken } from "./auth"

/**
 * Server-component gate for every admin page: no store or no valid staff session
 * means a redirect to the sign-in page before any case data is read.
 */
export async function requireStaffPage(): Promise<{ staff: StaffMember; store: CaseStore }> {
  const store = getCaseStore()
  if (!store) redirect("/admin/login?error=unavailable")
  const jar = await cookies()
  const staff = await staffFromToken(store, jar.get(SESSION_COOKIE)?.value ?? null)
  if (!staff) redirect("/admin/login")
  return { staff, store }
}
