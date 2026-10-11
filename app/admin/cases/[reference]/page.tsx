import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import AdminHeader, { NotifyStatus, StatusBadge } from "@/components/admin/AdminHeader"
import { requireStaffPage } from "@/lib/server/admin/page-session"
import { MAX_NOTE_LENGTH } from "@/lib/server/admin/handlers"
import { CASE_STATUSES, type CaseEvent } from "@/lib/server/case-store/types"
import { CASE_TYPES, CONTACT_METHODS, VISA_TYPES, labelFor } from "@/lib/visa-assessment/options"
import { summariseCase } from "@/lib/visa-assessment/summary"
import { whatsappLink } from "@/lib/site-config"

export const metadata: Metadata = { title: "Case" }

type Params = Record<string, string | string[] | undefined>

const FLASH: Record<string, { tone: "ok" | "error"; text: string }> = {
  "saved=status": { tone: "ok", text: "Status updated." },
  "saved=note": { tone: "ok", text: "Note added." },
  "notified=sent": { tone: "ok", text: "Staff notification sent." },
  "notified=failed": { tone: "error", text: "The staff notification could not be sent. The failure has been recorded." },
  "notified=skipped": { tone: "error", text: "Email is not configured on this deployment, so no notification was sent." },
  "error=status": { tone: "error", text: "Choose a valid status." },
  "error=note": { tone: "error", text: `Notes must be between 1 and ${MAX_NOTE_LENGTH} characters.` },
  "error=notify_limit": { tone: "error", text: "Too many notification retries. Wait a few minutes and try again." },
}

const statusLabel = (value: string) => CASE_STATUSES.find((s) => s.value === value)?.label ?? value

export default async function AdminCasePage({ params, searchParams }: { params: Promise<{ reference: string }>; searchParams: Promise<Params> }) {
  const { staff, store } = await requireStaffPage()
  const { reference } = await params
  // References are plain ISN-YYYY-NNNNNN; the store rejects anything else before querying.
  const c = await store.getCase(reference)
  if (!c) notFound()

  const query = await searchParams
  const flashKey = Object.entries(query)
    .map(([k, v]) => `${k}=${typeof v === "string" ? v : ""}`)
    .find((k) => FLASH[k])
  const flash = flashKey ? FLASH[flashKey] : null
  const base = `/api/admin/cases/${encodeURIComponent(c.reference)}`
  const phoneDigits = c.phone.replace(/\D/g, "")

  return (
    <>
      <AdminHeader staff={staff} />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/admin" className="text-sm text-blue-700 underline">
          ← All leads
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tabular-nums">{c.reference}</h1>
          <StatusBadge status={c.status} label={statusLabel(c.status)} />
        </div>
        <p className="mt-1 text-sm text-neutral-600">
          {labelFor(CASE_TYPES, c.caseType)} · {c.destination} · {labelFor(VISA_TYPES, c.visaType)} · received {formatDate(c.createdAt)}
        </p>

        {flash ? (
          <p
            role={flash.tone === "error" ? "alert" : "status"}
            className={`mt-4 rounded-md border px-4 py-3 text-sm ${flash.tone === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-green-200 bg-green-50 text-green-800"}`}
          >
            {flash.text}
          </p>
        ) : null}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="font-semibold">Contact</h2>
              <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <Row label="Name" value={c.fullName} />
                <Row
                  label="Email"
                  value={
                    <a href={`mailto:${c.email}?subject=${encodeURIComponent(`Your visa assessment ${c.reference}`)}`} className="text-blue-700 underline">
                      {c.email}
                    </a>
                  }
                />
                <Row label="Phone" value={<a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className="text-blue-700 underline">{c.phone}</a>} />
                <Row label="Preferred contact" value={labelFor(CONTACT_METHODS, c.answers.preferredContact)} />
                {c.answers.phoneIsWhatsapp && phoneDigits.length >= 7 ? (
                  <Row
                    label="WhatsApp"
                    value={
                      <a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                        Open chat
                      </a>
                    }
                  />
                ) : null}
              </dl>
            </section>

            <section className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="font-semibold">Assessment answers</h2>
              <dl className="mt-3 divide-y divide-neutral-100 text-sm">
                {summariseCase(c.answers).map((r, i) => (
                  <div key={`${r.label}-${i}`} className="grid gap-1 py-2 sm:grid-cols-3">
                    <dt className="text-neutral-500">{r.label}</dt>
                    <dd className="whitespace-pre-wrap break-words sm:col-span-2">{r.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-neutral-500">
                Consent (wording version {c.consent?.version}) given {c.consent?.acceptedAt ? formatDate(c.consent.acceptedAt) : "—"}: accuracy{" "}
                {c.consent?.accuracy ? "✓" : "✗"}, privacy {c.consent?.privacy ? "✓" : "✗"}, no-guarantee {c.consent?.noGuarantee ? "✓" : "✗"}.
              </p>
            </section>

            <section className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="font-semibold">Documents</h2>
              {c.documents.length === 0 ? (
                <p className="mt-2 text-sm text-neutral-500">No documents were uploaded.</p>
              ) : (
                <ul className="mt-3 space-y-2 text-sm">
                  {c.documents.map((d) => (
                    <li key={d.id} className="flex flex-wrap items-center justify-between gap-2">
                      <span>
                        {d.slot === "jobOffer" ? "Job offer / contract" : "Case document"}: {d.originalName ?? "document"}{" "}
                        <span className="text-neutral-500">({d.sizeBytes < 1024 ? `${d.sizeBytes} bytes` : `${Math.round(d.sizeBytes / 1024)} KB`})</span>
                      </span>
                      <a href={`${base}/documents/${d.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                        Open (link valid 2 minutes)
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-xs text-neutral-500">Documents are private. Each opening is recorded in the case history.</p>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="font-semibold">Status</h2>
              <form action={`${base}/status`} method="post" className="mt-3 flex gap-2">
                <select name="status" defaultValue={c.status} className="flex-1 rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-sm">
                  {CASE_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <button type="submit" className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-700">
                  Update
                </button>
              </form>
            </section>

            <section className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="font-semibold">Email notifications</h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-neutral-500">Staff alert</dt>
                  <dd className="text-right">
                    <NotifyStatus status={c.staffNotifyStatus} />
                    {c.staffNotifyError ? <span className="block text-xs text-neutral-500">{c.staffNotifyError}</span> : null}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-neutral-500">Applicant confirmation</dt>
                  <dd className="text-right">
                    <NotifyStatus status={c.applicantNotifyStatus} />
                    {c.applicantNotifyError ? <span className="block text-xs text-neutral-500">{c.applicantNotifyError}</span> : null}
                  </dd>
                </div>
              </dl>
              {c.staffNotifyStatus !== "sent" ? (
                <form action={`${base}/notify`} method="post" className="mt-3">
                  <button type="submit" className="w-full rounded-md border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100">
                    Retry staff alert
                  </button>
                </form>
              ) : null}
            </section>

            <section className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="font-semibold">Add a note</h2>
              <form action={`${base}/notes`} method="post" className="mt-3 space-y-2">
                <textarea
                  name="note"
                  required
                  maxLength={MAX_NOTE_LENGTH}
                  rows={4}
                  className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
                  placeholder="Internal note (visible to staff only)"
                />
                <button type="submit" className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-700">
                  Save note
                </button>
              </form>
            </section>

            <section className="rounded-lg border border-neutral-200 bg-white p-5">
              <h2 className="font-semibold">History</h2>
              <ol className="mt-3 space-y-3 text-sm">
                {c.events.map((e) => (
                  <li key={e.id} className="border-l-2 border-neutral-200 pl-3">
                    <p>{describeEvent(e)}</p>
                    <p className="text-xs text-neutral-500">
                      {formatDate(e.createdAt)} · {e.actor}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <p className="text-xs text-neutral-500">
              Reply to the client by email or{" "}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline">
                the ISN WhatsApp line
              </a>
              . Never ask clients for portal passwords.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-neutral-500">{label}</dt>
      <dd className="break-words">{value || "—"}</dd>
    </div>
  )
}

function describeEvent(e: CaseEvent): React.ReactNode {
  const d = e.data as Record<string, string | number | undefined>
  switch (e.type) {
    case "created":
      return `Assessment submitted (${d.documents ?? 0} document(s))`
    case "duplicate_submission":
      return "Repeat submission received and ignored (same form session)"
    case "staff_notification":
      return `Staff alert: ${d.status}${d.code ? ` (${d.code})` : ""}`
    case "applicant_confirmation":
      return `Applicant confirmation: ${d.status}${d.code ? ` (${d.code})` : ""}`
    case "status_changed":
      return `Status: ${statusLabel(String(d.from))} → ${statusLabel(String(d.to))}`
    case "note_added":
      return <span className="whitespace-pre-wrap break-words">Note: {String(d.note ?? "")}</span>
    case "document_viewed":
      return "Opened a document"
    default:
      return e.type
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg", dateStyle: "medium", timeStyle: "short" })
}
