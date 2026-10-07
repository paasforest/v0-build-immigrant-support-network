import type { ContentSection } from "@/lib/visa-pages"

/**
 * Plain-language visa guides. Same rules as visa-pages.ts: general processes only,
 * no fees, processing times, success rates or promises.
 */
export type Guide = {
  slug: string
  title: string
  description: string
  /** ISO date, shown on the page and used in structured data */
  published: string
  updated: string
  intro: string[]
  sections: ContentSection[]
  service: { href: string; label: string }
  assessmentHref: string
}

export const guides: Guide[] = [
  {
    slug: "what-to-do-after-a-visa-refusal",
    title: "What to Do After a Visa Refusal",
    description:
      "A step-by-step guide to understanding a visa refusal letter, checking your options and deciding whether and when to re-apply.",
    published: "2026-10-07",
    updated: "2026-10-07",
    intro: [
      "A visa refusal is disappointing, especially when travel plans, family events or work depend on it. The most important thing is not to rush. A quick re-application with the same documents often leads to the same result, and some options have deadlines that start on the date of the decision.",
      "This guide explains the steps to take after a refusal, in the order that usually makes sense.",
    ],
    sections: [
      {
        heading: "1. Keep the refusal letter and note the date",
        paragraphs: [
          "The refusal letter or form is the most important document you have. Keep the original, make a copy, and note the date of the decision. If you received it by email or through an online portal, save a copy somewhere safe.",
          "If you did not receive a letter, or you have lost it, check your email (including spam), your online account, and any envelope returned with your passport.",
        ],
      },
      {
        heading: "2. Read each reason carefully",
        paragraphs: [
          "Refusal letters are often brief and use standard wording. Schengen refusals, for example, are usually given on a standard form with the reasons ticked from a fixed list. Write down each reason separately and, for each one, ask: what did the officer need to see, and what did my application actually show?",
          "Common themes include:",
        ],
        bullets: [
          "The purpose of the trip was not clear or not supported by documents",
          "The officer was not satisfied that you would return home at the end of the trip",
          "Funds were insufficient, or large deposits were not explained",
          "Information on the form did not match the supporting documents",
          "Documents were missing, unclear or could not be verified",
        ],
      },
      {
        heading: "3. Compare the reasons with what you submitted",
        paragraphs: [
          "Gather a copy of the application form and the documents you submitted. Look for gaps and inconsistencies: dates that do not match, a salary on the form that differs from the payslip, a travel plan that changed, or an invitation letter that does not say who is paying.",
          "This comparison is usually where the real cause of a refusal becomes clear.",
        ],
      },
      {
        heading: "4. Find out what options exist",
        paragraphs: [
          "Options depend on the country and the type of visa. Broadly, they include:",
        ],
        bullets: [
          "Re-applying with a stronger application that addresses the reasons",
          "An appeal or administrative review, where the country's law provides one",
          "A legal challenge in court, in limited cases, which requires a qualified lawyer",
          "Waiting until your circumstances have genuinely changed",
        ],
      },
      {
        heading: "5. Check deadlines straight away",
        paragraphs: [
          "If an appeal or review is possible, there will be a deadline, and it can be short. The refusal letter usually explains the route and the time limit. If you think a formal appeal may be appropriate, speak to a qualified immigration lawyer in the relevant country quickly.",
        ],
      },
      {
        heading: "6. Decide whether to re-apply, and when",
        paragraphs: [
          "Re-applying makes most sense when you can address the refusal reasons: with clearer evidence, corrected information, or genuinely changed circumstances. If nothing has changed, a new application may simply repeat the outcome.",
          "When you do re-apply, answer questions about previous refusals honestly. Authorities keep records, and failing to disclose a refusal can cause far more serious problems than the refusal itself.",
        ],
      },
    ],
    service: { href: "/visa-services/refusal", label: "Visa refusal assessment" },
    assessmentHref: "/visa-assessment?type=refusal",
  },
  {
    slug: "responding-to-a-request-for-additional-documents",
    title: "How to Respond to a Request for Additional Documents",
    description:
      "An embassy or visa authority has asked for more documents. How to read the request, prepare a clear response and meet the deadline.",
    published: "2026-10-07",
    updated: "2026-10-07",
    intro: [
      "After you submit a visa application, the embassy, consulate or immigration authority may ask for more documents or information. A request is not a refusal, but how you respond matters: an incomplete, late or confusing response can lead to one.",
    ],
    sections: [
      {
        heading: "1. Confirm the request is genuine",
        paragraphs: [
          "Requests come through official channels: your online application account, an official email address, or the visa application centre. Be cautious of messages that ask you to pay money to an individual, send documents to a personal email address, or share your account password. If in doubt, check the contact details on the official government website.",
        ],
      },
      {
        heading: "2. Note the deadline and how to respond",
        paragraphs: [
          "Find the deadline and the method of submission (upload, email, courier or in person). Put the deadline in your calendar. If the method is unclear, check the official guidance rather than guessing.",
        ],
      },
      {
        heading: "3. Make a list of exactly what is requested",
        paragraphs: [
          "Break the request into individual items and number them. For each item, note which document you will provide. If a document is unavailable, decide what alternative evidence you can provide and how you will explain it.",
        ],
      },
      {
        heading: "4. Check for consistency",
        paragraphs: [
          "New documents must be consistent with what you already submitted. Before sending anything, compare names, dates, amounts and addresses with your application form and earlier documents. If something genuinely differs, explain why.",
        ],
      },
      {
        heading: "5. Include a short covering letter",
        paragraphs: [
          "A brief covering letter that lists each requested item and the document that answers it makes the officer's job easier. Keep it factual and short. Include your application reference number.",
        ],
        bullets: [
          "Your full name and application reference",
          "A numbered list matching the request",
          "A brief explanation for anything you cannot provide",
        ],
      },
      {
        heading: "6. Keep proof of what you sent",
        paragraphs: [
          "Keep copies of everything and proof of submission, such as an upload confirmation or courier tracking number.",
        ],
      },
    ],
    service: { href: "/visa-services/additional-documents", label: "Additional document requests" },
    assessmentHref: "/visa-assessment?type=additional_documents",
  },
  {
    slug: "visa-appointment-and-application-centre-problems",
    title: "Visa Appointment and Application-Centre Problems",
    description:
      "Can't get a visa appointment, or had a problem at the visa application centre? What you can check, and what nobody can honestly promise.",
    published: "2026-10-07",
    updated: "2026-10-07",
    intro: [
      "Many embassies use external visa application centres to book appointments, collect biometrics and receive documents. Problems at this stage, such as no available appointments, a rejected submission or missing documents, are common and frustrating.",
      "This guide covers practical steps, and an important warning about appointment \"guarantees\".",
    ],
    sections: [
      {
        heading: "Beware of anyone selling guaranteed appointments",
        paragraphs: [
          "Appointment systems are controlled by the embassy or its official centre. Be very careful of anyone who claims they can guarantee or sell you an appointment slot. Such offers may break the centre's terms, put your application at risk, or simply be a scam. Never share your booking account password with anyone.",
        ],
      },
      {
        heading: "If there are no appointments available",
        bullets: [
          "Check the official booking system regularly, as new slots may be released",
          "Check whether there is more than one centre you are allowed to apply at",
          "Read the official guidance on urgent or priority appointments, if the embassy offers them",
          "Check whether the official guidance allows you to apply earlier, before your travel date",
        ],
      },
      {
        heading: "If your submission was rejected at the centre",
        paragraphs: [
          "Centres may decline to accept an application that is incomplete, uses the wrong form, or has documents that do not meet the format requirements. Ask for the reason in writing if possible, note exactly what was missing or wrong, and check the official checklist before rebooking.",
        ],
      },
      {
        heading: "If documents or your passport are delayed",
        paragraphs: [
          "Use the official tracking service where one exists, and contact the centre through its official channels. Keep your receipt and reference numbers. Centres usually cannot tell you about the decision itself, only about the handling of your documents.",
        ],
      },
      {
        heading: "What we can and cannot do",
        paragraphs: [
          "We can review your situation, help you understand the official options and make sure your application is complete before you book again. We cannot book, sell or guarantee appointments, and we will never ask for your portal password.",
        ],
      },
    ],
    service: { href: "/visa-services", label: "Visa services" },
    assessmentHref: "/visa-assessment?type=appointment_problem",
  },
]

export const findGuide = (slug: string) => guides.find((g) => g.slug === slug)
