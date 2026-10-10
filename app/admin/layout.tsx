import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: { default: "Staff dashboard", template: "%s | ISN staff" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">{children}</div>
}
