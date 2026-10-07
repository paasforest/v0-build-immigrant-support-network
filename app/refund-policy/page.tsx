import type { Metadata } from "next"
import Link from "next/link"
import LegalPage from "@/components/LegalPage"

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "How fees work at Immigrant Support Network: the visa assessment is free, government and visa-centre fees are separate, and service fee terms are set out in your written quotation.",
  alternates: { canonical: "/refund-policy" },
}

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      path="/refund-policy"
      intro="How fees and refunds work. This page does not promise refunds; the terms that apply to you are the ones in your written quotation."
    >
      <h2>The visa assessment is free</h2>
      <p>
        Submitting a <Link href="/visa-assessment">visa assessment</Link> costs nothing and does not commit you to
        anything. We do not request payment before we have reviewed your assessment and sent you a written quotation.
      </p>

      <h2>Government, embassy and visa-centre fees</h2>
      <p>
        Visa application fees, visa application centre service charges, biometrics fees and similar charges are paid to
        the relevant authority or centre, not to us. Whether any of these fees can be refunded is decided by that body
        under its own rules. We cannot refund them, and a visa refusal does not normally lead to a refund of
        government fees.
      </p>

      <h2>Our service fees</h2>
      <p>
        Before any work starts, we send you a written quotation describing the service, what it includes, the fee and
        the terms that apply, including whether any part of the fee is refundable and in what circumstances. Please
        read it before paying. If something in the quotation is unclear, ask us before you accept it.
      </p>
      <p>
        Our service is help with preparing your application or responding to a problem. Because visa decisions are made
        by government authorities, the outcome of an application is not, by itself, a basis for a refund unless your
        written quotation expressly says so.
      </p>

      <h2>Your statutory rights</h2>
      <p>
        Nothing in this policy limits any rights you may have under applicable consumer protection law, including the
        South African Consumer Protection Act where it applies.
      </p>

      <h2>Questions or complaints</h2>
      <p>
        If you have a question about a fee or would like to raise a complaint, please <Link href="/contact">contact us</Link>{" "}
        and include your case reference.
      </p>
    </LegalPage>
  )
}
