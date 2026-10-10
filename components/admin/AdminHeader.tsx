import Link from "next/link"
import type { StaffMember } from "@/lib/server/case-store/types"

export default function AdminHeader({ staff }: { staff: StaffMember }) {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/admin" className="font-semibold text-neutral-900">
          ISN staff · Visa leads
        </Link>
        <div className="flex items-center gap-3 text-sm text-neutral-600">
          <span>
            Signed in as <span className="font-medium text-neutral-900">{staff.name}</span>
          </span>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="rounded-md border border-neutral-300 px-3 py-1.5 text-neutral-800 hover:bg-neutral-100">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-50 text-blue-800 ring-blue-200",
  in_review: "bg-amber-50 text-amber-800 ring-amber-200",
  contacted: "bg-violet-50 text-violet-800 ring-violet-200",
  quoted: "bg-cyan-50 text-cyan-800 ring-cyan-200",
  client: "bg-green-50 text-green-800 ring-green-200",
  closed: "bg-neutral-100 text-neutral-700 ring-neutral-300",
}

export function StatusBadge({ status, label }: { status: string; label: string }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status] ?? STATUS_STYLES.closed}`}>
      {label}
    </span>
  )
}

const NOTIFY_STYLES: Record<string, string> = {
  sent: "text-green-700",
  failed: "text-red-700 font-semibold",
  skipped: "text-amber-700",
  pending: "text-neutral-500",
}

export function NotifyStatus({ status }: { status: string }) {
  const label = { sent: "Sent", failed: "Failed", skipped: "Not sent", pending: "Pending" }[status] ?? status
  return <span className={`text-xs ${NOTIFY_STYLES[status] ?? ""}`}>{label}</span>
}
