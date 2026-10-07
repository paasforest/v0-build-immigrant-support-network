import type { Metadata } from "next"
import Link from "next/link"
import LegalPage from "@/components/LegalPage"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Immigrant Support Network is a private visa assistance service. We are not a government office, embassy, consulate or visa application centre, and we cannot guarantee visa outcomes.",
  alternates: { canonical: "/disclaimer" },
}

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" path="/disclaimer" intro="Please read this before using our website or services.">
      <h2>Who we are</h2>
      <p>
        {siteConfig.name} (&ldquo;ISN&rdquo;, &ldquo;we&rdquo;) is a private visa assistance service based in{" "}
        {siteConfig.location}. We help clients prepare overseas visa applications and respond to visa problems such as
        refusals, document requests and verification.
      </p>

      <h2>Who we are not</h2>
      <ul>
        <li>We are not a government department, embassy, consulate or high commission.</li>
        <li>We are not a visa application centre and we do not operate one.</li>
        <li>We are not affiliated with, endorsed by or acting on behalf of any government or visa authority.</li>
        <li>We are not a law firm, and our assistance is not legal advice or legal representation.</li>
        <li>We are not a recruitment agency. We do not find jobs, provide employment or place students.</li>
      </ul>

      <h2>No guarantee of outcome</h2>
      <p>
        Every visa decision is made solely by the relevant government authority. We cannot guarantee that a visa will
        be approved, that an appointment will be available, or that an application will be processed within any
        particular time. Anyone who guarantees a visa should be treated with caution.
      </p>

      <h2>Fees paid to authorities</h2>
      <p>
        Government, embassy, consulate and visa application centre fees are separate from our service fees. They are
        set and collected by those bodies, under their own rules.
      </p>

      <h2>Legal advice</h2>
      <p>
        Where your situation may require a formal appeal, a court challenge or other legal action, we will recommend
        that you obtain advice from a qualified immigration lawyer or an authorised representative in the relevant
        country. Some countries restrict who may give paid immigration advice; where that applies to your case, we
        will tell you.
      </p>

      <h2>Information on this website</h2>
      <p>
        Content on this website is general information only. Visa rules, fees and procedures change often and vary by
        nationality and circumstances. Always check the official government website for your destination before you
        apply. We are not responsible for decisions made solely on the basis of general website content.
      </p>

      <h2>Images</h2>
      <p>Photographs on this website are illustrative stock images. They do not show our clients or staff.</p>

      <h2>Your passwords</h2>
      <p>
        We will never ask for your passwords to any government or visa portal or account. Do not share them with us
        or with anyone else.
      </p>

      <p>
        Questions? <Link href="/contact">Contact us</Link>.
      </p>
    </LegalPage>
  )
}
