import Link from "next/link"
import { whatsappLink } from "@/lib/site-config"

type CtaBandProps = {
  title?: string
  body?: string
  /** Pre-filled WhatsApp message for the secondary button */
  whatsappMessage?: string
}

/** Gold call-to-action band: primary → visa assessment, secondary → WhatsApp. */
export default function CtaBand({
  title = "Tell us about your visa situation",
  body = "Submit a short assessment. We review your case and contact you to explain how we can help, the scope of work and our quotation, before you decide whether to proceed.",
  whatsappMessage = "Hi ISN, I'd like to discuss my visa case.",
}: CtaBandProps) {
  return (
    <section className="bg-gold py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 font-serif text-3xl font-bold text-[#0a0a0a] md:text-4xl">{title}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-[#0a0a0a]/80">{body}</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/visa-assessment"
            className="inline-block rounded bg-[#0a0a0a] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#1a1a1a]"
          >
            Get a Visa Assessment
          </Link>
          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded border-2 border-[#0a0a0a] px-8 py-4 font-semibold text-[#0a0a0a] transition-all duration-300 hover:bg-[#0a0a0a]/10"
          >
            Discuss Your Visa Case
          </a>
        </div>
      </div>
    </section>
  )
}
