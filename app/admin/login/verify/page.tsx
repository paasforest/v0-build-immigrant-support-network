import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Confirm sign-in" }

/**
 * The emailed link lands here. Signing in needs a button press (a POST), so email
 * security scanners that open links automatically cannot use up the one-time token.
 */
export default async function VerifySignInPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  const token = typeof params.token === "string" && /^[A-Za-z0-9_-]{43}$/.test(params.token) ? params.token : null

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-semibold">Confirm sign-in</h1>
      {token ? (
        <form action="/api/admin/session" method="post" className="mt-6 space-y-4">
          <input type="hidden" name="token" value={token} />
          <p className="text-sm text-neutral-600">Press the button to finish signing in to the staff dashboard.</p>
          <button type="submit" className="w-full rounded-md bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-neutral-700">
            Sign in
          </button>
        </form>
      ) : (
        <p className="mt-6 text-sm text-neutral-700">
          This sign-in link is not valid.{" "}
          <Link href="/admin/login" className="underline">
            Request a new link
          </Link>
          .
        </p>
      )}
    </div>
  )
}
