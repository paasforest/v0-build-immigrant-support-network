import type { Metadata } from "next"
import Link from "next/link"
import LegalPage from "@/components/LegalPage"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for using the Immigrant Support Network website and visa assistance services: scope of service, no guarantee of outcome, fees and responsibilities.",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      path="/terms"
      intro="These terms apply to your use of this website and to submitting a visa assessment or message. If you become a client, your written quotation and any service agreement also apply."
    >
      <h2>1. About us</h2>
      <p>
        {siteConfig.name} provides private visa assistance services. We are not a government office, embassy, consulate
        or visa application centre, and we are not a law firm. Please read our <Link href="/disclaimer">Disclaimer</Link>.
      </p>

      <h2>2. Assessments and enquiries</h2>
      <p>
        Submitting a visa assessment or a message is free and does not create a client relationship or any obligation
        on either side. We review assessments and may decline to assist with any case.
      </p>

      <h2>3. Quotations and services</h2>
      <p>
        If we can help, we will send you a written quotation describing the scope of the service, the fee and the
        applicable terms. A client relationship begins only when you accept the quotation in writing and any agreed
        payment is made. The service is limited to what the quotation describes.
      </p>

      <h2>4. No guarantee</h2>
      <p>
        Visa decisions, appointment availability and processing times are controlled by government authorities and
        their appointed service providers. We do not and cannot guarantee any outcome or timeline.
      </p>

      <h2>5. Your responsibilities</h2>
      <ul>
        <li>Provide information and documents that are true, complete and your own to share.</li>
        <li>Tell us promptly if your circumstances change or you receive any communication from an authority.</li>
        <li>Review any application before it is submitted. You remain responsible for your own application.</li>
        <li>Keep your portal passwords private. We will never ask for them.</li>
        <li>Pay government, embassy and visa-centre fees directly to the relevant body.</li>
      </ul>
      <p>
        We will not assist with any application involving false information or documents, and we may stop assisting if
        we believe this is happening.
      </p>

      <h2>6. Fees</h2>
      <p>
        Our service fees are set out in your written quotation. Government and visa-centre fees are separate. See our{" "}
        <Link href="/refund-policy">Refund Policy</Link>.
      </p>

      <h2>7. Website content</h2>
      <p>
        Website content is general information, not advice for your specific situation, and may become out of date.
        Always confirm requirements on the official government website for your destination.
      </p>

      <h2>8. Liability</h2>
      <p>
        To the extent permitted by law, we are not liable for decisions made by any government authority, for delays or
        actions of authorities or visa centres, or for losses arising from information that you did not disclose or
        that was inaccurate. Nothing in these terms excludes liability that cannot be excluded by law, including under
        the Consumer Protection Act where it applies.
      </p>

      <h2>9. Privacy</h2>
      <p>
        We handle personal information as described in our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>10. Governing law</h2>
      <p>These terms are governed by the laws of the Republic of South Africa.</p>

      <h2>11. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalPage>
  )
}
