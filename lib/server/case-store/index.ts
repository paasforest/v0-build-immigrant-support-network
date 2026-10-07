import "server-only"
import path from "node:path"
import { LocalCaseStore } from "./local"
import { SupabaseCaseStore } from "./supabase"
import type { CaseStore } from "./types"

export * from "./types"

let cached: CaseStore | null | undefined

/**
 * Pick the storage backend:
 *  1. Supabase when SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set (production).
 *  2. Local files when CASE_STORE=local, or in development (never silently in production).
 *  3. Otherwise null: the API refuses submissions with a clear error instead of pretending to succeed.
 */
export function getCaseStore(): CaseStore | null {
  if (cached !== undefined) return cached
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (url && key) {
    cached = new SupabaseCaseStore(url, key, process.env.SUPABASE_CASE_BUCKET || "case-documents")
  } else if (process.env.CASE_STORE === "local" || process.env.NODE_ENV === "development") {
    cached = new LocalCaseStore(path.resolve(process.env.CASE_STORE_DIR || ".data"))
  } else {
    cached = null
  }
  return cached
}

/** Test hook */
export function resetCaseStoreForTests() {
  cached = undefined
}
