import type { ReactNode } from "react"
import Link from "next/link"

/** Bold-only segments inside a string (trusted CMS-style). */
function renderBoldSegments(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = []
  const re = /\*\*(.+?)\*\*/g
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(text.slice(last, m.index))
    }
    parts.push(
      <strong key={`${keyPrefix}-b${key++}`} className="font-semibold text-white">
        {m[1]}
      </strong>
    )
    last = re.lastIndex
  }
  if (last < text.length) {
    parts.push(text.slice(last))
  }
  return parts
}

/**
 * Renders trusted strings with **bold** and [label](/path) internal links.
 * Links must be site paths (e.g. /blog/slug) or allowed URLs.
 */
export default function RichParagraph({ text }: { text: string }) {
  type Piece = { kind: "text"; t: string } | { kind: "link"; label: string; href: string }
  const pieces: Piece[] = []
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last) {
      pieces.push({ kind: "text", t: text.slice(last, m.index) })
    }
    pieces.push({ kind: "link", label: m[1], href: m[2] })
    last = linkRe.lastIndex
  }
  if (last < text.length) {
    pieces.push({ kind: "text", t: text.slice(last) })
  }
  if (pieces.length === 0) {
    pieces.push({ kind: "text", t: text })
  }

  return (
    <p className="text-white/75 leading-relaxed mb-4 last:mb-0">
      {pieces.map((p, i) =>
        p.kind === "link" ? (
          <Link
            key={`l${i}`}
            href={p.href}
            className="font-medium text-gold underline decoration-gold/40 underline-offset-2 hover:text-gold-light hover:decoration-gold/70"
          >
            {p.label}
          </Link>
        ) : (
          <span key={`t${i}`}>{renderBoldSegments(p.t, `t${i}`)}</span>
        )
      )}
    </p>
  )
}
