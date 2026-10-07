import type { Metadata } from "next"
import Link from "next/link"
import LegalPage from "@/components/LegalPage"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Immigrant Support Network collects, uses, stores and protects personal information, in line with the Protection of Personal Information Act (POPIA).",
  alternates: { canonical: "/privacy-policy" },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      intro="How we collect, use and protect your personal information, in line with South Africa's Protection of Personal Information Act, 2013 (POPIA)."
    >
      <h2>Who is responsible for your information</h2>
      <p>
        {siteConfig.name} is the responsible party for personal information collected through this website. You can
        contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or {siteConfig.phoneDisplay}.
      </p>

      <h2>What we collect</h2>
      <p>We collect only what we need at each stage.</p>
      <ul>
        <li>
          <strong>Visa assessment:</strong> your name, email, phone number and preferred contact method; your
          destination and visa type; basic background such as nationality, country of residence, travel plans and
          employment status; and the details you give us about your case (for example a refusal reason or a document
          request).
        </li>
        <li>
          <strong>Uploaded documents:</strong> only the document relevant to your problem, such as a refusal letter, a
          request letter or a job offer, if you choose to upload it.
        </li>
        <li>
          <strong>Contact form:</strong> your name, email, optional phone number and your message.
        </li>
        <li>
          <strong>Consent records:</strong> which confirmations you ticked and when.
        </li>
        <li>
          <strong>Technical information:</strong> limited server logs (such as IP address, used to prevent abuse) and
          anonymous, aggregated page-view statistics. Our analytics do not use advertising cookies.
        </li>
      </ul>
      <p>
        At the assessment stage we do not ask for passport numbers, ID numbers, bank statements, full addresses,
        medical or criminal-record information. We never ask for, or store, passwords to government or visa portals.
        If you become a client, we will explain what further documents are needed and why, and collect them through a
        private channel.
      </p>

      <h2>Why we use it</h2>
      <ul>
        <li>To review your situation and contact you about it</li>
        <li>To prepare a quotation and, if you become a client, to provide the agreed service</li>
        <li>To reply to messages you send us</li>
        <li>To keep records of consent and of our communications</li>
        <li>To protect the website against misuse</li>
      </ul>
      <p>
        We process your information with your consent, to take steps you have asked for before entering into an
        agreement with us, to perform an agreement with you, and to meet our legal obligations. We do not sell your
        personal information and we do not use it for third-party advertising.
      </p>

      <h2>Who we share it with</h2>
      <p>We share personal information only where needed to run our service:</p>
      <ul>
        <li>
          Service providers who host our website, database, document storage and email on our behalf. They process
          information only on our instructions and under appropriate security obligations.
        </li>
        <li>Authorities, where we are legally required to do so.</li>
      </ul>
      <p>
        We do not send your information to an embassy, consulate or visa centre. If you become a client, you submit
        your own application through the official channel.
      </p>

      <h2>Transfers outside South Africa</h2>
      <p>
        Some of our service providers store or process information on servers outside South Africa. Where this
        happens, we take steps to ensure the information is protected to a standard comparable to POPIA, as section 72
        requires.
      </p>

      <h2>How we protect it</h2>
      <ul>
        <li>Assessments and uploaded documents are stored in private storage that is not publicly accessible.</li>
        <li>Access is limited to the team members who need it to handle your case.</li>
        <li>Information is sent to our servers over an encrypted (HTTPS) connection.</li>
        <li>Uploaded documents are not attached to notification emails.</li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        We keep personal information only for as long as we need it for the purposes above, or for longer where the
        law requires it. If you do not become a client, you can ask us to delete your assessment and documents at any
        time.
      </p>

      <h2>Your rights</h2>
      <p>Under POPIA you have the right to:</p>
      <ul>
        <li>ask whether we hold personal information about you, and request a copy;</li>
        <li>ask us to correct or delete information that is inaccurate, out of date or no longer needed;</li>
        <li>object to processing, and withdraw consent at any time (this does not affect processing already done);</li>
        <li>
          lodge a complaint with the Information Regulator of South Africa (
          <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">inforegulator.org.za</a>).
        </li>
      </ul>
      <p>
        To exercise these rights, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> and include your
        case reference if you have one. We may need to confirm your identity before acting on a request.
      </p>

      <h2>Children</h2>
      <p>
        Our assessment is intended to be completed by adults. If an application concerns a child, a parent or legal
        guardian should complete the assessment.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy. The date at the top shows when it last changed. See also our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  )
}
