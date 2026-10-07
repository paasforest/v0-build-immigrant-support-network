import Link from "next/link"

/** Standard "who we are / who we are not" statement used across the site. */
export default function VisaDisclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs leading-relaxed text-white/50">
        Immigrant Support Network is a private visa assistance service. We are not a government office, embassy,
        consulate or visa application centre, and we are not a law firm. Visa decisions are made only by the relevant
        government authority, and our assistance does not guarantee approval. Government, embassy and visa-centre
        fees are separate from our service fees.{" "}
        <Link href="/disclaimer" className="underline hover:text-gold">
          Full disclaimer
        </Link>
      </p>
    )
  }

  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#111111] p-6">
      <h2 className="mb-3 font-semibold text-white">Important: what we are, and what we are not</h2>
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/70">
        <li>Immigrant Support Network (ISN) is a private visa assistance service.</li>
        <li>
          We are not a government office, an embassy or consulate, or a visa application centre operator, and we
          are not a law firm.
        </li>
        <li>Every visa decision is made by the relevant government authority. Our assistance does not guarantee approval.</li>
        <li>
          Government, embassy and visa application centre fees are separate from our professional service fees and
          are paid to those bodies.
        </li>
        <li>We do not find jobs or provide employment.</li>
      </ul>
      <p className="mt-4 text-sm text-white/60">
        Read our full{" "}
        <Link href="/disclaimer" className="text-gold hover:underline">
          disclaimer
        </Link>
        .
      </p>
    </div>
  )
}
