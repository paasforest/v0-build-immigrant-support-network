/**
 * Content for the visa service and destination pages.
 *
 * Rules for this file: describe processes in general terms only. Do not add fees,
 * processing times, success rates or approval promises: they change often, vary by
 * case, and are decided by government authorities, not by ISN.
 */

export type FaqItem = { q: string; a: string }

export type ContentSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export type VisaContentPage = {
  slug: string
  /** Breadcrumb parent */
  parent: { href: string; label: string }
  /** Short name used in breadcrumbs and links */
  name: string
  h1: string
  metaTitle: string
  metaDescription: string
  intro: string[]
  sections: ContentSection[]
  /** What ISN helps with on this kind of case */
  weHelp: string[]
  /** Clear limits, shown next to weHelp */
  weDont: string[]
  faqs: FaqItem[]
  /** Pre-selects answers in the visa assessment */
  assessmentHref: string
  ctaTitle: string
  related: { href: string; label: string }[]
}

const SERVICES = { href: "/visa-services", label: "Visa Services" }
const DESTINATIONS = { href: "/destinations", label: "Destinations" }

const COMMON_DONT = [
  "Guarantee a visa, an appointment date or a decision timeline",
  "Act as, or on behalf of, a government office, embassy, consulate or visa application centre",
  "Ask for, or log in with, your passwords for government or visa-centre portals",
  "Submit false or misleading information or documents",
]

export const servicePages: VisaContentPage[] = [
  // ---------------- Visa problems ----------------
  {
    slug: "refusal",
    parent: SERVICES,
    name: "Visa refusal assessment",
    h1: "Visa Refusal Assessment",
    metaTitle: "Visa Refusal Assessment",
    metaDescription:
      "Your visa was refused? We review the refusal letter and your previous application, explain the reasons given and discuss your options, including whether to re-apply.",
    intro: [
      "A visa refusal is stressful, and refusal letters are often short and written in formal, standard wording. Before you spend money on a new application, it helps to understand exactly why the application was refused and what, if anything, can realistically be done.",
      "Our refusal assessment looks at the refusal letter alongside what you submitted, and explains the reasons in plain language so you can decide on your next step.",
    ],
    sections: [
      {
        heading: "Why visas are commonly refused",
        paragraphs: [
          "Every refusal is specific to the application, but the reasons given often fall into a small number of themes:",
        ],
        bullets: [
          "The purpose of the trip was not clearly explained or supported by documents",
          "The officer was not satisfied that the applicant would leave at the end of the visit (ties to home country)",
          "Financial documents did not show sufficient or clearly explained funds",
          "Inconsistencies between the application form and supporting documents",
          "Missing, unclear or unverifiable documents",
          "Previous immigration history, including earlier refusals or overstays",
        ],
      },
      {
        heading: "Your options after a refusal",
        paragraphs: [
          "Options depend on the country that refused the visa and the type of visa. Depending on the case, they can include re-applying with a stronger application, an appeal or administrative review where the law allows it, or waiting until your circumstances change.",
          "Some routes have strict time limits that start from the date of the decision, so it is important to look at a refusal promptly. Where a formal appeal or legal challenge may be appropriate, we will tell you that you should obtain advice from a qualified immigration lawyer in the relevant country.",
        ],
      },
      {
        heading: "What we need from you",
        paragraphs: [
          "To start, the visa assessment asks for the destination, the type of visa, when it was refused and the reason given. If you have the refusal letter you can upload it. We do not need your passport or bank statements at this stage.",
        ],
      },
    ],
    weHelp: [
      "Reviewing the refusal letter and explaining each reason in plain language",
      "Comparing the reasons with what was submitted, to identify gaps or inconsistencies",
      "Advising whether re-applying makes sense now, and what would need to change",
      "Helping you prepare a stronger re-application if you decide to proceed",
    ],
    weDont: [...COMMON_DONT, "Represent you in court or formal legal appeal proceedings"],
    faqs: [
      {
        q: "Can you overturn my refusal?",
        a: "No private service can overturn a government decision. We help you understand the refusal and prepare your next step properly. Where a formal appeal or legal challenge is relevant, we will recommend that you speak to a qualified immigration lawyer.",
      },
      {
        q: "Should I re-apply straight away?",
        a: "Usually not without changes. Re-applying with the same documents and circumstances often leads to the same result. The assessment helps identify what needs to be addressed first.",
      },
      {
        q: "I don't have the refusal letter. Can you still help?",
        a: "Yes, but the letter is the most useful document in a refusal case. Tell us what you remember about the reasons, and we will advise how you may be able to obtain a copy.",
      },
    ],
    assessmentHref: "/visa-assessment?type=refusal",
    ctaTitle: "Had a visa refused? Get it assessed",
    related: [
      { href: "/visa-services/re-application", label: "Re-application after refusal" },
      { href: "/guides", label: "Visa guides" },
    ],
  },
  {
    slug: "re-application",
    parent: SERVICES,
    name: "Re-application after refusal",
    h1: "Re-Applying After a Visa Refusal",
    metaTitle: "Visa Re-Application After Refusal",
    metaDescription:
      "Planning to re-apply after a visa refusal? We help you address the refusal reasons, explain what has changed and prepare a complete, consistent new application.",
    intro: [
      "A re-application is a new application, and the officer will usually be able to see your previous refusal. A strong re-application addresses the earlier refusal reasons directly and shows clearly what has changed.",
      "We cannot promise that a re-application will be approved. What we can do is help you avoid repeating the same problems and present your circumstances clearly and accurately.",
    ],
    sections: [
      {
        heading: "What a good re-application does",
        bullets: [
          "Responds to each reason given in the previous refusal",
          "Explains genuinely changed circumstances, for example in employment, finances or the purpose of the trip",
          "Includes supporting documents that are consistent with each other and with the form",
          "Discloses the previous refusal honestly, as application forms require",
        ],
      },
      {
        heading: "When it may be better to wait",
        paragraphs: [
          "If nothing material has changed since the refusal, re-applying immediately may not help. Part of our assessment is telling you honestly whether we think now is the right time.",
        ],
      },
    ],
    weHelp: [
      "Reviewing the previous refusal and the earlier application",
      "Identifying what has changed and what evidence supports it",
      "Preparing a document checklist and reviewing documents for consistency",
      "Helping complete the new application form accurately",
    ],
    weDont: COMMON_DONT,
    faqs: [
      {
        q: "Will the embassy know I was refused before?",
        a: "Usually, yes. Most application forms ask about previous refusals, and authorities keep records. Always answer these questions truthfully: non-disclosure can lead to a further refusal and more serious consequences.",
      },
      {
        q: "Is there a waiting period before I can re-apply?",
        a: "In many cases there is no formal waiting period, but re-applying without addressing the reasons is rarely effective. Rules differ between countries and visa types, and we check this as part of the assessment.",
      },
    ],
    assessmentHref: "/visa-assessment?type=reapplication",
    ctaTitle: "Planning to re-apply? Start with an assessment",
    related: [
      { href: "/visa-services/refusal", label: "Visa refusal assessment" },
      { href: "/guides", label: "Visa guides" },
    ],
  },
  {
    slug: "additional-documents",
    parent: SERVICES,
    name: "Additional document requests",
    h1: "Help With Additional Document Requests",
    metaTitle: "Embassy Additional Document Requests",
    metaDescription:
      "Asked by an embassy, consulate or visa authority to provide more documents? We help you understand the request and prepare a clear, complete response before the deadline.",
    intro: [
      "After an application has been submitted, an embassy, consulate or immigration authority may ask for additional documents or information. These requests often have a deadline, and an incomplete or unclear response can lead to a refusal.",
      "We help you understand exactly what is being asked for and prepare a response that answers the request clearly.",
    ],
    sections: [
      {
        heading: "Common types of request",
        bullets: [
          "Further proof of funds or an explanation of specific transactions",
          "Employment or business documents, or confirmation from an employer",
          "Proof of accommodation, travel plans or an invitation",
          "Evidence of the relationship with the person you are visiting",
          "Certified translations or updated copies of documents",
        ],
      },
      {
        heading: "Act before the deadline",
        paragraphs: [
          "Note the deadline on the request as soon as you receive it. When you start the assessment, include the date you received the request and the deadline, and upload the request letter or email if you can. That allows us to prioritise correctly.",
        ],
      },
    ],
    weHelp: [
      "Explaining what the authority is asking for",
      "Checking which documents you have and what is missing",
      "Reviewing your documents and any covering letter for clarity and consistency",
      "Advising on how to submit the response through the official channel",
    ],
    weDont: COMMON_DONT,
    faqs: [
      {
        q: "Can you contact the embassy for me?",
        a: "Responses normally have to go through the channel the authority specified, usually by the applicant. We help you prepare the response; we do not present ourselves as the authority or as your official representative unless that has been formally agreed and is permitted.",
      },
      {
        q: "What if I can't get a document before the deadline?",
        a: "Tell us as early as possible. Depending on the authority, it may be possible to explain the delay or provide alternative evidence, but this varies and is never guaranteed.",
      },
    ],
    assessmentHref: "/visa-assessment?type=additional_documents",
    ctaTitle: "Received a document request? Get help preparing it",
    related: [
      { href: "/visa-services/verification", label: "Verification issues" },
      { href: "/guides", label: "Visa guides" },
    ],
  },
  {
    slug: "verification",
    parent: SERVICES,
    name: "Verification issues",
    h1: "Help With Visa Verification Issues",
    metaTitle: "Visa Document Verification Issues",
    metaDescription:
      "Is an embassy or visa authority verifying your documents, employment, bank records or invitation? We help you understand the process and respond accurately.",
    intro: [
      "Authorities may verify the information in a visa application, for example by checking with an employer, a bank, a school or the person who invited you. Verification can delay a decision, and problems found during verification can lead to a refusal.",
      "If you know your application is being verified, or you have been asked to confirm information, we help you understand what is happening and respond accurately.",
    ],
    sections: [
      {
        heading: "What may be verified",
        bullets: [
          "Employment and salary details with your employer",
          "Bank statements and the origin of funds",
          "Business registration and trading records",
          "Invitation letters and the host's details",
          "Study enrolment and acceptance letters",
          "Identity and civil documents",
        ],
      },
      {
        heading: "Accuracy matters",
        paragraphs: [
          "The best protection in a verification process is information that is true and consistent. We will never help anyone submit false information or documents. If something in an application was incorrect, we will discuss the honest options available.",
        ],
      },
    ],
    weHelp: [
      "Explaining what the verification request involves",
      "Helping you prepare people who may be contacted, such as an employer or host, to respond accurately",
      "Reviewing documents for consistency with the application",
      "Advising on next steps if the verification raised a problem",
    ],
    weDont: COMMON_DONT,
    faqs: [
      {
        q: "How long does verification take?",
        a: "It depends entirely on the authority and the case. We do not give timelines that we cannot control.",
      },
      {
        q: "My employer wasn't reachable when the embassy called. What now?",
        a: "Start an assessment and describe what happened. Depending on the authority, it may be possible to provide further confirmation, but options vary.",
      },
    ],
    assessmentHref: "/visa-assessment?type=verification",
    ctaTitle: "Dealing with a verification? Tell us what happened",
    related: [
      { href: "/visa-services/additional-documents", label: "Additional document requests" },
      { href: "/guides", label: "Visa guides" },
    ],
  },

  // ---------------- New applications ----------------
  {
    slug: "visitor",
    parent: SERVICES,
    name: "Visitor & tourist visas",
    h1: "Visitor & Tourist Visa Assistance",
    metaTitle: "Visitor & Tourist Visa Assistance",
    metaDescription:
      "Help preparing a visitor or tourist visa application for the Schengen area, the UK, the USA or Canada: choosing the right visa, documents and the application form.",
    intro: [
      "Visitor visas are for short trips such as holidays and sightseeing. Even for a short holiday, the authority needs to be satisfied about the purpose of the trip, how it will be paid for and that you will return home afterwards.",
      "We help you prepare a complete and consistent application from the start.",
    ],
    sections: [
      {
        heading: "What a visitor visa application usually needs",
        paragraphs: ["Requirements vary by country, but most visitor applications involve:"],
        bullets: [
          "A completed application form for the correct visa category",
          "A valid passport that meets the destination's validity requirements",
          "Evidence of the purpose of the trip, such as a travel itinerary",
          "Evidence of funds to pay for the trip",
          "Evidence of ties to your home country, such as employment or studies",
          "Biometrics or an interview, depending on the destination",
        ],
      },
    ],
    weHelp: [
      "Confirming the correct visa category for your trip",
      "A document checklist tailored to your circumstances",
      "Reviewing your documents for gaps and inconsistencies",
      "Helping complete the application form and prepare for the appointment",
    ],
    weDont: COMMON_DONT,
    faqs: [
      {
        q: "Do I need a visa at all?",
        a: "That depends on your nationality, your destination and the purpose and length of your trip. Some travellers need an electronic travel authorisation instead of a visa. The assessment asks for your nationality so we can check.",
      },
      {
        q: "How early should I apply?",
        a: "Earlier is generally better, because appointment availability and processing times vary. Check the official guidance for your destination, and start the assessment as soon as your travel plans are reasonably clear.",
      },
    ],
    assessmentHref: "/visa-assessment?type=new_application&visa=visitor",
    ctaTitle: "Planning a trip? Start your visa assessment",
    related: [
      { href: "/visa-services/family-visit", label: "Family visit visas" },
      { href: "/visa-services/business", label: "Business visas" },
    ],
  },
  {
    slug: "business",
    parent: SERVICES,
    name: "Business visas",
    h1: "Business Visa Assistance",
    metaTitle: "Business Visa Assistance",
    metaDescription:
      "Help with business visit visa applications for meetings, conferences and trade events in the Schengen area, the UK, the USA and Canada.",
    intro: [
      "Business visitor visas cover activities such as attending meetings, conferences and trade fairs, or negotiating contracts. They do not normally allow you to work for an organisation in the destination country.",
      "We help you show clearly what the trip is for, who is paying and how it relates to your work at home.",
    ],
    sections: [
      {
        heading: "Typical supporting documents",
        bullets: [
          "An invitation letter from the company or event you are visiting",
          "A letter from your employer confirming your position and the purpose of the trip",
          "Business registration documents, if you are self-employed or a business owner",
          "Evidence of who is paying for the trip",
        ],
      },
      {
        heading: "Business visits are not work",
        paragraphs: [
          "If the trip involves actually doing work for an organisation in the destination country, a business visitor visa may not be appropriate. We will tell you if your plans look like they require a different type of visa.",
        ],
      },
    ],
    weHelp: [
      "Checking that a business visitor visa fits your planned activities",
      "Reviewing invitation and employer letters for clarity",
      "A tailored document checklist and form review",
    ],
    weDont: COMMON_DONT,
    faqs: [
      {
        q: "Can I attend a job interview on a business visa?",
        a: "Rules differ between countries. Tell us what you plan to do in the assessment and we will explain how the destination's rules apply to you.",
      },
    ],
    assessmentHref: "/visa-assessment?type=new_application&visa=business",
    ctaTitle: "Travelling for business? Start your assessment",
    related: [
      { href: "/visa-services/visitor", label: "Visitor & tourist visas" },
      { href: "/destinations", label: "Destinations" },
    ],
  },
  {
    slug: "family-visit",
    parent: SERVICES,
    name: "Family visit visas",
    h1: "Family Visit Visa Assistance",
    metaTitle: "Family Visit Visa Assistance",
    metaDescription:
      "Visiting relatives or friends abroad? We help you prepare a family visit visa application, including invitation letters and evidence of your relationship.",
    intro: [
      "Family visit applications usually involve two people: you as the applicant, and the relative or friend you are visiting. The authority will want to understand your relationship, the purpose of the visit, who is paying and where you will stay.",
    ],
    sections: [
      {
        heading: "Common documents",
        bullets: [
          "An invitation letter from your host",
          "Evidence of your host's status in the destination country, where required",
          "Evidence of the relationship",
          "Details of accommodation and who is paying for the trip",
          "Evidence of your own ties to your home country",
        ],
      },
      {
        heading: "Sponsored trips",
        paragraphs: [
          "If your host is paying for some or all of the trip, the application usually needs evidence from them as well. We help both sides understand what is needed so the documents are consistent.",
        ],
      },
    ],
    weHelp: [
      "Reviewing invitation letters and sponsor documents",
      "Making sure the applicant's and host's documents are consistent",
      "A tailored checklist and application form review",
    ],
    weDont: COMMON_DONT,
    faqs: [
      {
        q: "Does my family member need to send documents?",
        a: "Often, yes, especially if they are inviting or sponsoring you. Requirements depend on the destination; we will explain exactly what applies.",
      },
    ],
    assessmentHref: "/visa-assessment?type=new_application&visa=family_visit",
    ctaTitle: "Visiting family abroad? Start your assessment",
    related: [
      { href: "/visa-services/visitor", label: "Visitor & tourist visas" },
      { href: "/destinations", label: "Destinations" },
    ],
  },
  {
    slug: "study",
    parent: SERVICES,
    name: "Study visas",
    h1: "Study Visa Assistance",
    metaTitle: "Study Visa Assistance",
    metaDescription:
      "Already accepted by a school, college or university abroad? We help you prepare your study visa or study permit application and supporting documents.",
    intro: [
      "Study visas and permits are for people who have been accepted onto a course abroad. We do not find courses or place students at institutions. We help applicants who have an offer or acceptance to prepare the visa application.",
    ],
    sections: [
      {
        heading: "What study applications typically involve",
        bullets: [
          "An acceptance or offer letter, or confirmation from the institution",
          "Evidence that you can pay tuition and living costs",
          "Evidence of your previous studies and qualifications",
          "Additional requirements, such as medical examinations, depending on the destination and course",
        ],
      },
      {
        heading: "If you haven't been accepted yet",
        paragraphs: [
          "You can still start an assessment. We will tell you what a study visa application is likely to need once you have an offer, but we do not provide admissions or placement services.",
        ],
      },
    ],
    weHelp: [
      "Checking the study visa requirements for your destination and course",
      "Reviewing financial and academic documents for completeness",
      "Application form review",
    ],
    weDont: [...COMMON_DONT, "Find courses, arrange admission or act as a recruitment agent for institutions"],
    faqs: [
      {
        q: "Can I work while studying?",
        a: "Some study visas allow limited work, others do not, and the rules change. We explain the current conditions for your destination during the assessment.",
      },
    ],
    assessmentHref: "/visa-assessment?type=new_application&visa=study",
    ctaTitle: "Accepted to study abroad? Start your assessment",
    related: [
      { href: "/destinations/uk", label: "United Kingdom" },
      { href: "/destinations/canada", label: "Canada" },
    ],
  },
  {
    slug: "work-visa",
    parent: SERVICES,
    name: "Work visa document assistance",
    h1: "Work Visa Document Assistance",
    metaTitle: "Work Visa Document Assistance (Job Offer Required)",
    metaDescription:
      "Already have a genuine job offer abroad? We help you prepare your work visa application documents. We do not find jobs or provide employment.",
    intro: [
      "Immigrant Support Network does not find or provide jobs. Work visa assistance is available only where you already have a genuine job offer and supporting employer documentation.",
      "If you have a real offer from an employer abroad, we help you understand the visa requirements and prepare your side of the application.",
    ],
    sections: [
      {
        heading: "What a work visa application usually depends on",
        paragraphs: [
          "In most countries, a work visa depends on the employer as much as the employee. The employer may need to hold a licence or obtain approval before you can apply, for example:",
        ],
        bullets: [
          "United Kingdom: a Certificate of Sponsorship from a licensed sponsor",
          "Canada: in many cases, a Labour Market Impact Assessment (LMIA) or an employer-specific offer submitted through the employer portal",
          "Schengen/EU countries: a work permit or approval issued in the destination country, depending on national rules",
          "United States: an approved petition filed by the employer, for most work categories",
        ],
      },
      {
        heading: "Protect yourself from job scams",
        paragraphs: [
          "Be very careful with job offers that require you to pay for the job, offer unusually high salaries for little experience, come only through social media or messaging apps, or ask you to pay a \"visa processing fee\" to an individual. Genuine employers can be verified independently.",
          "If you are unsure about an offer, include it in the assessment. We may be able to point out warning signs, but we cannot verify or guarantee any employer.",
        ],
      },
    ],
    weHelp: [
      "Explaining the work visa route that matches your genuine offer",
      "A checklist of the documents you need to provide",
      "Reviewing your documents and application form for accuracy and consistency",
    ],
    weDont: [
      "Find jobs, provide employment, or connect you with employers",
      "Guarantee that an employer will obtain the required approval or licence",
      ...COMMON_DONT,
    ],
    faqs: [
      {
        q: "Can you help me find a job abroad?",
        a: "No. We do not offer recruitment, job search or employer matching of any kind.",
      },
      {
        q: "I have an offer but the employer hasn't done any paperwork. Can I still apply?",
        a: "Usually, the employer's approval or sponsorship must be in place first. Start an assessment with the details you have and we will explain what is normally required.",
      },
    ],
    assessmentHref: "/visa-assessment?type=new_application&visa=work_job_offer",
    ctaTitle: "Have a genuine job offer? Start your assessment",
    related: [
      { href: "/destinations", label: "Destinations" },
      { href: "/visa-services", label: "All visa services" },
    ],
  },
]

export const destinationPages: VisaContentPage[] = [
  {
    slug: "schengen",
    parent: DESTINATIONS,
    name: "Schengen / Europe",
    h1: "Schengen Visa Assistance",
    metaTitle: "Schengen Visa Assistance",
    metaDescription:
      "Help with Schengen short-stay visa applications, refusals and re-applications for travel to the Schengen area of Europe.",
    intro: [
      "The Schengen area is a group of European countries that share common rules for short stays. A Schengen short-stay visa generally allows stays of up to 90 days in any 180-day period across the whole area.",
      "You normally apply to the consulate of the country that is your main destination (where you will spend the most time) or, if there is no main destination, the country you will enter first. Many consulates use external visa application centres to receive applications and collect biometrics.",
    ],
    sections: [
      {
        heading: "What we commonly help with",
        bullets: [
          "Tourist, family visit and business short-stay applications",
          "Choosing the correct consulate when your trip covers several countries",
          "Schengen refusals and re-applications",
          "Additional document requests from a consulate",
          "Appointment and application-centre problems",
        ],
      },
      {
        heading: "Schengen refusals",
        paragraphs: [
          "Schengen refusals are usually issued on a standard form, with the reasons indicated from a fixed list. The right to appeal, and how to do it, depends on the member state that refused the visa, and deadlines can be short. We help you understand the stated reasons and your options, and will recommend a qualified lawyer where a formal appeal is appropriate.",
        ],
      },
      {
        heading: "Long stays are different",
        paragraphs: [
          "Stays longer than 90 days, such as for study or work, generally require a national (long-stay) visa or residence permit under the rules of the specific country, not a Schengen short-stay visa.",
        ],
      },
    ],
    weHelp: [
      "Confirming which consulate you should apply to",
      "A tailored document checklist and application review",
      "Refusal assessments and re-application preparation",
      "Help responding to consulate requests",
    ],
    weDont: COMMON_DONT,
    faqs: [
      {
        q: "Which country should I apply to if I visit several?",
        a: "Generally, the country where you will spend the most time. If you spend equal time in several, it is usually the country you will enter first. We confirm this as part of the assessment.",
      },
      {
        q: "Are Ireland and Cyprus part of Schengen?",
        a: "No. They are EU countries but not part of the Schengen area, and they have their own visa rules. You can still select them in the assessment.",
      },
    ],
    assessmentHref: "/visa-assessment?destination=schengen",
    ctaTitle: "Applying for a Schengen visa? Start your assessment",
    related: [
      { href: "/visa-services/refusal", label: "Visa refusal assessment" },
      { href: "/visa-services/visitor", label: "Visitor & tourist visas" },
    ],
  },
  {
    slug: "uk",
    parent: DESTINATIONS,
    name: "United Kingdom",
    h1: "UK Visa Assistance",
    metaTitle: "UK Visa Assistance",
    metaDescription:
      "Help with UK visitor visa applications, refusals and re-applications, and UK work visa documents where you already hold a genuine job offer.",
    intro: [
      "Most UK visa applications are made online through the UK government's official website, followed by an appointment at a visa application centre to provide biometrics and, where required, documents.",
      "The UK Standard Visitor visa covers tourism, visiting family and friends, and many business activities, usually for stays of up to six months.",
    ],
    sections: [
      {
        heading: "What we commonly help with",
        bullets: [
          "Standard Visitor applications for tourism, family visits and business",
          "UK visitor refusals and re-applications",
          "Study visa applications for applicants with a confirmed place",
          "Skilled Worker documents where a licensed sponsor has offered you a job",
        ],
      },
      {
        heading: "UK visitor refusals",
        paragraphs: [
          "There is generally no right of appeal against a UK visitor visa refusal. The usual route is a new, stronger application that addresses the refusal reasons. In limited cases a legal challenge may be possible, which requires advice from a qualified UK immigration lawyer.",
        ],
      },
    ],
    weHelp: [
      "Choosing the right UK visa category",
      "Document checklist, form review and appointment preparation",
      "Refusal assessments and re-application preparation",
    ],
    weDont: COMMON_DONT,
    faqs: [
      {
        q: "Do I need a visa or an ETA for the UK?",
        a: "It depends on your nationality. Some nationalities need a visa, while others need an Electronic Travel Authorisation (ETA) for short visits. Check the official UK government guidance, or start the assessment and we will check for you.",
      },
    ],
    assessmentHref: "/visa-assessment?destination=uk",
    ctaTitle: "Applying for a UK visa? Start your assessment",
    related: [
      { href: "/visa-services/refusal", label: "Visa refusal assessment" },
      { href: "/visa-services/study", label: "Study visas" },
    ],
  },
  {
    slug: "usa",
    parent: DESTINATIONS,
    name: "United States",
    h1: "US Visa Assistance",
    metaTitle: "US Visa Assistance (B1/B2 and More)",
    metaDescription:
      "Help with US visitor (B1/B2) visa applications: the DS-160 form, interview preparation, and next steps after a refusal.",
    intro: [
      "US visitor visas (B-1 for business, B-2 for tourism and visiting family) are applied for using the online DS-160 form, followed in most cases by an interview at a US embassy or consulate.",
      "At the interview, a consular officer decides on the application, often on the same day. Preparation matters: your answers should be truthful, clear and consistent with your DS-160.",
    ],
    sections: [
      {
        heading: "What we commonly help with",
        bullets: [
          "Checking your DS-160 answers for accuracy and consistency",
          "Interview preparation: understanding what the officer needs to establish",
          "Understanding a refusal, including refusals under section 214(b)",
          "Deciding whether and when to re-apply",
        ],
      },
      {
        heading: "Section 214(b) refusals",
        paragraphs: [
          "Many US visitor visa refusals are made under section 214(b) of the Immigration and Nationality Act, which means the officer was not satisfied that the applicant qualifies, often concerning ties to the home country. There is no appeal against a 214(b) refusal; a new application is needed, and it is most useful when circumstances have changed.",
        ],
      },
    ],
    weHelp: [
      "DS-160 review",
      "Interview preparation based on your real circumstances",
      "Refusal assessments and re-application planning",
    ],
    weDont: [...COMMON_DONT, "Coach you to give anything other than truthful answers at an interview"],
    faqs: [
      {
        q: "Can you get me an earlier interview date?",
        a: "No. Interview appointments are controlled by the US embassy or consulate. We can explain the official options that exist, but we cannot guarantee or arrange an appointment.",
      },
    ],
    assessmentHref: "/visa-assessment?destination=usa",
    ctaTitle: "Applying for a US visa? Start your assessment",
    related: [
      { href: "/visa-services/refusal", label: "Visa refusal assessment" },
      { href: "/visa-services/visitor", label: "Visitor & tourist visas" },
    ],
  },
  {
    slug: "canada",
    parent: DESTINATIONS,
    name: "Canada",
    h1: "Canada Visa Assistance",
    metaTitle: "Canada Visa Assistance",
    metaDescription:
      "Help with Canadian visitor visa applications, study permits for accepted students, refusals and re-applications.",
    intro: [
      "Canadian visitor visas (temporary resident visas) are applied for online through Immigration, Refugees and Citizenship Canada (IRCC). Most applicants also need to give biometrics at a visa application centre.",
      "Some nationalities do not need a visitor visa and instead need an electronic travel authorisation (eTA) to fly to Canada.",
    ],
    sections: [
      {
        heading: "What we commonly help with",
        bullets: [
          "Visitor visa applications for tourism and family visits",
          "Study permit applications for applicants with a letter of acceptance",
          "Canadian refusals and re-applications",
          "Work permit documents where you already have a genuine, employer-supported job offer",
        ],
      },
      {
        heading: "Canadian refusals",
        paragraphs: [
          "Canadian refusal letters often list reasons briefly. Applicants can usually request more detailed officer notes through an official information request, which can help explain a refusal. Re-applying is common; a legal challenge in the Federal Court is possible in some cases but has strict time limits and requires a lawyer.",
        ],
      },
    ],
    weHelp: [
      "Choosing the right application and document checklist",
      "Reviewing your documents and forms before submission",
      "Refusal assessments and re-application preparation",
    ],
    weDont: [
      ...COMMON_DONT,
      "Act as your authorised representative with IRCC (only licensed consultants and lawyers can be paid representatives)",
    ],
    faqs: [
      {
        q: "Will you submit my application through my IRCC account?",
        a: "No. We never ask for, or use, your IRCC account password. You remain in control of your account and submit the application yourself.",
      },
    ],
    assessmentHref: "/visa-assessment?destination=canada",
    ctaTitle: "Applying for a Canadian visa? Start your assessment",
    related: [
      { href: "/visa-services/study", label: "Study visas" },
      { href: "/visa-services/refusal", label: "Visa refusal assessment" },
    ],
  },
]

export const findServicePage = (slug: string) => servicePages.find((p) => p.slug === slug)
export const findDestinationPage = (slug: string) => destinationPages.find((p) => p.slug === slug)
