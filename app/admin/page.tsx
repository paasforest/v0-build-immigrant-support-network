import type { Metadata } from "next"
import Link from "next/link"
import AdminHeader, { NotifyStatus, StatusBadge } from "@/components/admin/AdminHeader"
import { requireStaffPage } from "@/lib/server/admin/page-session"
import { CASE_STATUSES, isCaseStatus } from "@/lib/server/case-store/types"
import { CASE_TYPES, VISA_TYPES, labelFor } from "@/lib/visa-assessment/options"

export const metadata: Metadata = { title: "Visa leads" }

const PAGE_SIZE = 25

type Params = Record<string, string | string[] | undefined>
const one = (v: string | string[] | undefined) => (typeof v === "string" ? v : "")

export default async function AdminLeadsPage({ searchParams }: { searchParams: Promise<Params> }) {
  const { staff, store } = await requireStaffPage()
  const params = await searchParams
  const search = one(params.q).slice(0, 100)
  const status = isCaseStatus(one(params.status)) ? (one(params.status) as (typeof CASE_STATUSES)[number]["value"]) : undefined
  const notifyProblem = one(params.notify) === "problem"
  const page = Math.max(1, Math.min(1000, Number.parseInt(one(params.page), 10) || 1))

  const { items, total } = await store.listCases({ search, status, notifyProblem, page, pageSize: PAGE_SIZE })
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const pageLink = (p: number) => {
    const qs = new URLSearchParams()
    if (search) qs.set("q", search)
    if (status) qs.set("status", status)
    if (notifyProblem) qs.set("notify", "problem")
    if (p > 1) qs.set("page", String(p))
    const s = qs.toString()
    return s ? `/admin?${s}` : "/admin"
  }

  return (
    <>
      <AdminHeader staff={staff} />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Visa assessment leads</h1>
            <p className="text-sm text-neutral-600">
              {total} {total === 1 ? "case" : "cases"}
              {search || status || notifyProblem ? " matching your filters" : ""}
            </p>
          </div>
          <form method="get" action="/admin" className="flex flex-wrap items-end gap-2" role="search">
            <label className="text-sm">
              <span className="block text-neutral-600">Search</span>
              <input
                name="q"
                defaultValue={search}
                placeholder="Reference, name or email"
                maxLength={100}
                className="w-64 rounded-md border border-neutral-300 bg-white px-3 py-1.5"
              />
            </label>
            <label className="text-sm">
              <span className="block text-neutral-600">Status</span>
              <select name="status" defaultValue={status ?? ""} className="rounded-md border border-neutral-300 bg-white px-2 py-1.5">
                <option value="">All</option>
                {CASE_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 pb-1.5 text-sm">
              <input type="checkbox" name="notify" value="problem" defaultChecked={notifyProblem} />
              Staff alert not confirmed sent
            </label>
            <button type="submit" className="rounded-md bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-neutral-700">
              Apply
            </button>
          </form>
        </div>

        <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-600">
              <tr>
                <th className="px-4 py-2 font-medium">Reference</th>
                <th className="px-4 py-2 font-medium">Received</th>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Case</th>
                <th className="px-4 py-2 font-medium">Destination</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Email alert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-neutral-500">
                    No cases found.
                  </td>
                </tr>
              ) : (
                items.map((c) => (
                  <tr key={c.id} className="hover:bg-neutral-50">
                    <td className="whitespace-nowrap px-4 py-2 tabular-nums">
                      <Link href={`/admin/cases/${encodeURIComponent(c.reference)}`} className="text-blue-700 underline">
                        {c.reference}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-neutral-600">{formatDate(c.createdAt)}</td>
                    <td className="px-4 py-2">{c.fullName}</td>
                    <td className="px-4 py-2">
                      {labelFor(CASE_TYPES, c.caseType)}
                      <span className="block text-xs text-neutral-500">{labelFor(VISA_TYPES, c.visaType)}</span>
                    </td>
                    <td className="px-4 py-2">{c.destination}</td>
                    <td className="px-4 py-2">
                      <StatusBadge status={c.status} label={CASE_STATUSES.find((s) => s.value === c.status)?.label ?? c.status} />
                    </td>
                    <td className="px-4 py-2">
                      <NotifyStatus status={c.staffNotifyStatus} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pages > 1 ? (
          <nav className="mt-4 flex items-center justify-between text-sm" aria-label="Pagination">
            {page > 1 ? (
              <Link href={pageLink(page - 1)} className="underline">
                Previous
              </Link>
            ) : (
              <span />
            )}
            <span className="text-neutral-600">
              Page {page} of {pages}
            </span>
            {page < pages ? (
              <Link href={pageLink(page + 1)} className="underline">
                Next
              </Link>
            ) : (
              <span />
            )}
          </nav>
        ) : null}
      </main>
    </>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg", dateStyle: "medium", timeStyle: "short" })
}
