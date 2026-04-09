import type { ReactNode } from "react"

/** Renders plain text with **bold** segments only (trusted CMS-style strings). */
export default function RichParagraph({ text }: { text: string }) {
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
      <strong key={key++} className="font-semibold text-white">
        {m[1]}
      </strong>
    )
    last = re.lastIndex
  }
  if (last < text.length) {
    parts.push(text.slice(last))
  }
  return <p className="text-white/75 leading-relaxed mb-4 last:mb-0">{parts}</p>
}
