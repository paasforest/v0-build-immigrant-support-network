import type { Metadata } from "next"

export const metadata: Metadata = { title: "Staff sign-in" }

const MESSAGES: Record<string, { tone: "ok" | "error"; text: string }> = {
  sent: { tone: "ok", text: "If this address belongs to an authorised staff member, a sign-in link is on its way. It works once and expires in 15 minutes." },
  signed_out: { tone: "ok", text: "You have been signed out." },
  email: { tone: "error", text: "Enter a valid email address." },
  link: { tone: "error", text: "That sign-in link is invalid, expired or already used. Request a new one below." },
  session: { tone: "error", text: "Your session has ended. Please sign in again." },
  unavailable: { tone: "error", text: "The staff dashboard is not available: case storage is not configured on this deployment." },
}

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  const key = params.sent ? "sent" : params.signed_out ? "signed_out" : typeof params.error === "string" ? params.error : null
  const message = key ? MESSAGES[key] : null

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold">Staff sign-in</h1>
      <p className="mt-2 text-sm text-neutral-600">
        For Immigrant Support Network staff only. Enter your staff email address and we will email you a one-time sign-in link.
      </p>
      {message ? (
        <p
          role={message.tone === "error" ? "alert" : "status"}
          className={`mt-6 rounded-md border px-4 py-3 text-sm ${message.tone === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-green-200 bg-green-50 text-green-800"}`}
        >
          {message.text}
        </p>
      ) : null}
      <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
        <label className="block text-sm font-medium" htmlFor="staff-email">
          Staff email
        </label>
        <input
          id="staff-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={200}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900"
        />
        <button type="submit" className="w-full rounded-md bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-neutral-700">
          Email me a sign-in link
        </button>
      </form>
    </div>
  )
}
