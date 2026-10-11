"use client"

import { usePathname } from "next/navigation"

/**
 * Renders its children on public pages only. The staff dashboard (/admin) has no public
 * navigation, footer, WhatsApp button or analytics, so staff URLs (including sign-in
 * links) are never reported to third parties.
 */
export default function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === "/admin" || pathname?.startsWith("/admin/")) return null
  return <>{children}</>
}
