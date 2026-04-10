const DEFAULT_POST_DATE = "2026-04-09T12:00:00.000Z"

export type SectionCtaButton = {
  label: string
  href: string
  /** Gold primary vs outline secondary */
  primary?: boolean
}

export type GuideSection = {
  h2: string
  paragraphs: string[]
  /** Decorative image after this section’s paragraphs */
  image?: { url: string; alt: string }
  /** Gold “Apply Now” block after this section */
  ctaAfter?: boolean
  /** Custom buttons instead of default Apply strip when set */
  customCtas?: SectionCtaButton[]
}

export type Guide = {
  slug: string
  title: string
  description: string
  keywords: string[]
  intro: string
  sections: GuideSection[]
  /** Banner under the title (pillar posts) */
  heroImage?: { url: string; alt: string }
  /** Override auto estimate from word count */
  readingTimeMinutes?: number
  /** Related guides order at bottom of post */
  relatedSlugs?: string[]
  /** Sticky TOC + anchor nav (pillar / long posts) */
  showTableOfContents?: boolean
  /** Hide the default “Ready to take the next step?” card when closing section has full CTAs */
  showDefaultFooterApplyCard?: boolean
  /** ISO 8601 — optional; defaults for JSON-LD */
  datePublished?: string
  dateModified?: string
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

/** ~200 wpm; uses intro + all section paragraphs */
export function estimateReadingMinutes(guide: Guide): number {
  let w = countWords(guide.intro)
  for (const sec of guide.sections) {
    for (const p of sec.paragraphs) w += countWords(p)
  }
  return Math.max(1, Math.round(w / 200))
}

export function estimateWordCount(guide: Guide): number {
  let w = countWords(guide.intro)
  for (const sec of guide.sections) {
    for (const p of sec.paragraphs) w += countWords(p)
  }
  return w
}

/** Stable id for TOC / anchor links from section heading */
export function headingToAnchorId(h2: string): string {
  const base = h2
    .toLowerCase()
    .replace(/[—–]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return base || "section"
}

export function getGuidePostDates(guide: Guide) {
  const published = guide.datePublished ?? DEFAULT_POST_DATE
  const modified = guide.dateModified ?? published
  return { published, modified }
}

export const GUIDES: Record<string, Guide> = {
  "jobs-in-poland-for-africans-2026": {
    slug: "jobs-in-poland-for-africans-2026",
    title: "Jobs in Poland for Africans (2026 Guide)",
    description:
      "Practical guide to jobs in Poland for African workers: sectors, pay, visas, and how a recruitment agency can help you apply.",
    keywords: [
      "jobs in Poland for foreigners",
      "Poland jobs for Africans",
      "work in Poland from Africa",
      "warehouse jobs Poland",
      "farm jobs Europe Africa",
    ],
    intro:
      "Many people in Africa search for **jobs in Poland for foreigners** because Poland has strong demand in logistics, food production, agriculture, and manufacturing. This page explains what is realistic in 2026, how visas usually work, and how **Immigrant Support Network (ISN)** — a **recruitment agency** — can help you **apply to employers**; we are not the employer and we do not issue visas ourselves. For official rules, always check the embassy and employer. Start with our current **listings** on the jobs page, then **apply** when you are ready.",
    sections: [
      {
        h2: "Jobs available in Poland",
        paragraphs: [
          "Common openings include **warehouse jobs in Europe**-bound supply chains, **farm** and food-processing roles, hospitality, construction support, and general labour. ISN publishes **employer-sourced** vacancies where clients ask us to recruit; not every job sponsors a visa — many employers require you to already have the right to work or your own visa route.",
          "Browse live roles on our Jobs page and filter by Poland. If you see a match, use the Apply form and mention the job title.",
        ],
      },
      {
        h2: "Salary and cost of living (typical)",
        paragraphs: [
          "Pay varies by role, region, and contract. **Employer** ads often quote gross rates in PLN; some roles include accommodation fees or allowances. Always confirm **net pay**, hours, and deductions in your **contract** with the employer, not with ISN.",
        ],
      },
      {
        h2: "Visa and work permission",
        paragraphs: [
          "There is no single **Poland work visa** path for everyone. It depends on nationality, job offer, employer declarations, and Polish migration law. ISN can point you to **visa-related support** via our Visa Services page, but approval is decided by authorities.",
          "If an employer states **no visa sponsorship**, you must have another lawful basis to work — do not skip this check.",
        ],
      },
      {
        h2: "Requirements you should prepare",
        paragraphs: [
          "Valid passport, often **English** or local language at the level the **employer** asks for, medical or sanitary certificates for food roles, and proof of experience where required. A **European-format CV** helps; we offer CV Services.",
        ],
      },
      {
        h2: "How to apply (step by step)",
        paragraphs: [
          "1) Read our Jobs in Poland sections and pick a role. 2) Prepare your CV and documents. 3) Submit the **Apply** form with destination Poland and the job reference. 4) Follow instructions from our team and the **employer** for interviews and contracts.",
        ],
      },
    ],
  },
  "how-to-get-a-job-in-romania-from-africa": {
    slug: "how-to-get-a-job-in-romania-from-africa",
    title: "How to Get a Job in Romania from Africa",
    description:
      "How to pursue farm jobs, factory work, and other roles in Romania from Africa — visas, realistic steps, and applying through a recruitment agency.",
    keywords: [
      "farm jobs in Romania",
      "jobs in Romania from Africa",
      "Romania work visa",
      "factory jobs Romania foreigners",
    ],
    intro:
      "Searches like **farm jobs in Romania** or **jobs in Romania no experience visa** are common. Romania hires in **agriculture**, manufacturing, logistics, and hospitality. ISN helps candidates **apply** to **third-party employers**; contracts and pay come from the employer. Use this overview, then explore **Work abroad** and **Jobs** for Romania and **Apply** when you have a target role.",
    sections: [
      {
        h2: "Jobs available",
        paragraphs: [
          "Typical categories include seasonal agriculture, factory and assembly work, warehouse and logistics, hotel and resort support, and construction-related labour. Experience requirements depend on the **employer**.",
        ],
      },
      {
        h2: "Salary expectations",
        paragraphs: [
          "Salaries are often quoted in EUR monthly ranges depending on city and sector. Housing and transport may be extra. Confirm everything in writing with the **employer** before you travel.",
        ],
      },
      {
        h2: "Visa process (high level)",
        paragraphs: [
          "You will usually need a lawful basis to work in Romania — often linked to an **employer** and work permit or relevant national visa categories. Rules change; use embassy guidance and, if you use us, our **Visa Services** for document preparation support — not a guarantee of approval.",
        ],
      },
      {
        h2: "Requirements",
        paragraphs: [
          "Passport, police clearance where requested, health checks, language level if stated, and references. A clear CV improves shortlisting.",
        ],
      },
      {
        h2: "How to apply",
        paragraphs: [
          "Check Romania listings on our **Jobs** page, read **Work abroad** for context, then **Apply** with Romania as destination and your preferred role type.",
        ],
      },
    ],
  },
  "jobs-in-hungary-for-foreign-workers": {
    slug: "jobs-in-hungary-for-foreign-workers",
    title: "Jobs in Hungary for Foreign Workers",
    description:
      "Guide to jobs in Hungary for foreign workers: manufacturing, logistics, requirements, and how to apply with agency support.",
    keywords: [
      "jobs in Hungary for foreign workers",
      "Hungary factory jobs foreigners",
      "work in Hungary from Africa",
    ],
    intro:
      "**Jobs in Hungary for foreign workers** cluster around **manufacturing**, automotive suppliers, **warehouse** work, and food production. ISN is a **recruitment agency**: we connect you with **employer** opportunities and help with applications — your employment contract is with the hiring company.",
    sections: [
      {
        h2: "Jobs available",
        paragraphs: [
          "Assembly, machine operation, logistics, cold-chain and food plants, and general labour shifts are common. Night and rotating shifts appear in many ads.",
        ],
      },
      {
        h2: "Salary",
        paragraphs: [
          "Pay is usually discussed at interview and set in the **employer** contract. Ask for gross/net clarity and overtime rules.",
        ],
      },
      {
        h2: "Visa process",
        paragraphs: [
          "Hungary, like other EU states, ties most work routes to permits and employer compliance. Plan early; gather attestations and translations if required. See **Visa Services** for checklist-style help.",
        ],
      },
      {
        h2: "Requirements",
        paragraphs: [
          "Physical fitness, reliability, sometimes **English** or basic Hungarian, prior factory or warehouse experience as a plus, valid passport, and any certificates the **employer** names.",
        ],
      },
      {
        h2: "How to apply",
        paragraphs: [
          "Use **Jobs** → filter Hungary when listed, or choose Hungary on the **Apply** form and describe your skills. A **CV** in European format increases response rates.",
        ],
      },
    ],
  },
  "easiest-europe-countries-for-africans": {
    slug: "easiest-europe-countries-for-africans",
    title: "Top Easiest Countries in Europe for Africans (Realistic View)",
    description:
      "No country is “easy” for everyone — but some paths are clearer for work, seasonal schemes, or language. Compare Poland, Romania, Hungary, Baltics, UK seasonal routes, and Canada.",
    keywords: [
      "easiest countries to work in Europe for Africans",
      "best country to work in Europe from Africa",
      "work abroad Europe Africa",
    ],
    intro:
      "People often ask for the **easiest countries to work in Europe for Africans**. The honest answer: **ease depends on your nationality, skills, language, whether an employer will support permits, and legal routes that exist this year.** This article gives a practical comparison — not a promise that any country will accept every applicant. For listings, see **Work abroad** and **Jobs**.",
    sections: [
      {
        h2: "What “easy” really means",
        paragraphs: [
          "**Easy** usually means: strong employer demand in your sector, transparent permit steps you can follow, costs you can afford, and timelines you can accept. **Visa-free countries for Africans** are mostly **not** the same as **permission to work** — tourism visa-free does not mean you may work legally.",
        ],
      },
      {
        h2: "Central & Eastern Europe (Poland, Romania, Hungary, Baltics)",
        paragraphs: [
          "Many African workers find openings in **warehousing**, **agriculture**, food factories, and manufacturing. **Poland**, **Romania**, and **Hungary** appear often in job searches; **Lithuania** and **Latvia** also host logistics and production roles. Difficulty is usually about **getting a lawful work basis**, not about ISN “choosing” you.",
        ],
      },
      {
        h2: "UK seasonal and other programs",
        paragraphs: [
          "The UK runs **seasonal** schemes for some agriculture roles; eligibility and sponsors change — verify on official UK sources before you pay anyone.",
        ],
      },
      {
        h2: "Canada",
        paragraphs: [
          "Canada offers some employer-driven and federal pathways but generally has higher documentary and sometimes language bars. See our Canada country card on the homepage.",
        ],
      },
      {
        h2: "How ISN fits in",
        paragraphs: [
          "We are a **recruitment agency** helping you **apply** to vetted **employers** and optionally supporting **documents** — we do not replace immigration authorities.",
        ],
      },
    ],
  },
  "cheapest-countries-to-work-europe-from-africa": {
    slug: "cheapest-countries-to-work-europe-from-africa",
    title: "Cheapest Countries to Work in Europe from Africa (Costs to Plan)",
    description:
      "Budgeting for Europe work from Africa: visas, travel, accommodation deposits, and avoiding scams — plus where ISN can help.",
    keywords: [
      "cheapest countries to move to from Africa",
      "cost to work in Europe from Africa",
      "cheap work abroad Europe",
    ],
    intro:
      "**Cheapest countries to work in Europe from Africa** is not only about low rent — it is about **total cash needed before your first pay**: flights, visa and legalisation fees, medicals, first-month housing, and food. Eastern European placements sometimes have **lower living costs** than London or Dublin but **employer-assisted housing** may still charge a monthly fee. There is no cheap shortcut around **legal** work permission.",
    sections: [
      {
        h2: "Main cost buckets",
        paragraphs: [
          "Government and medical fees, translations, travel insurance, ticket prices, relocation deposit, and emergency savings until payday.",
        ],
      },
      {
        h2: "Why “employer offer” matters for cost",
        paragraphs: [
          "Some **employers** include or subsidise accommodation or transport; others deduct a fair fee from pay — read your contract. ISN publishes **employer-supplied** details where clients provide them.",
        ],
      },
      {
        h2: "Scam warning",
        paragraphs: [
          "Be careful of anyone who guarantees a visa for a cash fee, or pushes you to enter as a tourist to work illegally. Legal work protects you and your family.",
        ],
      },
      {
        h2: "Next steps",
        paragraphs: [
          "Pick a target country from **Work abroad**, compare **Jobs**, and **Apply**. For visa document help, open **Visa Services**.",
        ],
      },
    ],
  },
  "poland-work-visa-cost": {
    slug: "poland-work-visa-cost",
    title: "How Much Does a Poland Work Visa Cost?",
    description:
      "Typical cost categories for a Poland work-related visa/permit path — embassy fees, medicals, translations, and travel. Not personal legal advice.",
    keywords: [
      "how much does a Poland work visa cost",
      "cost of Europe work visa",
      "Poland visa fees Africa",
    ],
    intro:
      "**How much does a Poland work visa cost** depends on your nationality, type of application, embassy or consulates fees, medical exams, document legalisation, courier, translation, and travel to submit biometrics. Figures **change** and must be confirmed on **official Polish diplomatic** sites and your local consulate. ISN provides **guidance and document support** — not government pricing and not a guarantee of issuance.",
    sections: [
      {
        h2: "What usually costs money",
        paragraphs: [
          "Consular visa or permit-related fees, medical and vaccination checks, authorised translations, criminal-record legalisation, photos, insurance where required, travel to the consulate, and sometimes agency fees for compliant preparation services.",
        ],
      },
      {
        h2: "What ISN charges for",
        paragraphs: [
          "We may charge for **CV**, recruitment coordination, or **visa-related document preparation** depending on what you purchase — ask us for a clear quote. We do not sell visas.",
        ],
      },
      {
        h2: "Employer vs candidate costs",
        paragraphs: [
          "Some **employers** reimburse or advance certain costs; many do **not**. Clarify before you sign.",
        ],
      },
      {
        h2: "What you should do next",
        paragraphs: [
          "Read official sources for your country of application, then **Contact** us or start **Visa Services** if you want a checklist and packaging help for documents you already know you need.",
        ],
      },
    ],
  },
  "how-to-apply-work-abroad-from-africa": {
    slug: "how-to-apply-work-abroad-from-africa",
    title: "How to Apply for Work Abroad from Africa (2026 Step-by-Step Guide)",
    description:
      "Full-service guide: how can I go to Poland for work from Africa, jobs in Romania, work in Europe — jobs, visa assistance, CV help, R300 registration, timelines, and how Immigrant Support Network guides you end to end.",
    keywords: [
      "how to apply for work abroad from Africa",
      "how can I go to Poland for work from Africa",
      "how to apply for jobs in Romania",
      "how to work in Europe from Africa",
      "warehouse jobs Europe Africa",
      "farm jobs Europe apply",
      "work abroad step by step",
      "visa assistance Africa to Europe",
      "Immigrant Support Network",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80",
      alt: "Diverse professionals in a modern workplace — African talent preparing for careers in Europe and Canada",
    },
    relatedSlugs: [
      "jobs-in-poland-for-africans-2026",
      "how-to-get-a-job-in-romania-from-africa",
      "jobs-in-hungary-for-foreign-workers",
      "easiest-europe-countries-for-africans",
    ],
    showTableOfContents: true,
    showDefaultFooterApplyCard: false,
    datePublished: "2026-04-01T12:00:00.000Z",
    dateModified: "2026-04-11T12:00:00.000Z",
    intro:
      "If you are searching **how can I go to Poland for work from Africa**, **how to apply for jobs in Romania**, or **how to work in Europe from Africa** — you are in the right place. **Immigrant Support Network (ISN)** helps Africans connect with **legal employers** in **Europe** and **Canada**. We guide you through the full journey — from finding the right role to preparing **visa documentation** and a **European-format CV**. Thousands of African workers have made the move with the right support. **You can too.** Read this guide, then **start your application today** — our team is ready to walk beside you.",
    sections: [
      {
        h2: "Step 1 — Choose the right country",
        paragraphs: [
          "Your first decision is **where** you want to build your future. **Poland** continues to offer strong demand in **warehouses**, **factories**, and food production. **Romania** attracts workers for **agriculture** and **manufacturing**. **Hungary** is busy in **logistics** and **assembly**. **Canada** lists **drivers**, **general labour**, and seasonal roles — each pathway has its own steps, and **our team helps you understand which option fits your skills and goals**.",
          "Think about the **type of work** you can do well today — not only what looks exciting online. **Shift work**, **standing jobs**, and **cold environments** are common in first contracts; ISN helps you match honestly so employers see you as a reliable hire.",
          "Open our **Work abroad** overview, then **Jobs**, and pick two or three target roles. When you are ready, **Apply** with your preferences — we use that information to match you with **verified employers** we work with.",
        ],
        image: {
          url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
          alt: "Globe and planning a move — choosing where to work abroad from Africa",
        },
      },
      {
        h2: "Step 2 — Understand available jobs",
        paragraphs: [
          "Most successful placements start in **warehouse**, **farm and agriculture**, **food production**, **cleaning**, or **general labour** — sectors where **employers** actively recruit international talent. You do **not** need a degree for many of these roles; you need **commitment**, **punctuality**, and willingness to learn.",
          "ISN **matches you with employers** who are hiring for real vacancies — we focus on clarity: hours, location, and what support is included so you know what you are stepping into.",
          "When a listing fits, mention it on your **Apply** form. If you are unsure, **contact us** — we help you choose a path that suits your experience.",
        ],
        ctaAfter: true,
      },
      {
        h2: "Step 3 — Understand salary and what you can save",
        paragraphs: [
          "Workers in **Poland**, **Romania**, and **Hungary** often earn **significantly more** than average wages in many African home countries — that is why families invest in this journey. **Many roles include accommodation support** or employer-arranged housing, which helps you **save faster** and send money home with more confidence.",
          "Every contract is different. Before you sign anything, **our team helps you understand your offer** — what matters in your pay package, typical hours, and what support is included — so you always know **exactly what to expect** for your destination.",
          "**Apply today** and we will walk through the numbers for **your** country and role together — no guesswork, no navigating complicated paperwork alone.",
        ],
        image: {
          url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
          alt: "Planning finances and earnings for working abroad",
        },
        ctaAfter: true,
      },
      {
        h2: "Step 4 — The visa process with ISN beside you",
        paragraphs: [
          "The visa process can feel overwhelming — **that is exactly why ISN offers visa assistance.** Our **Visa Services** team helps you **identify the correct visa type** for your nationality and job offer, **prepare every document**, and **organise your application** carefully so you move forward with confidence.",
          "We have supported Africans from **South Africa**, **Nigeria**, **Ghana**, **Kenya**, **Zimbabwe**, and **across the continent** through this journey. **You do not have to figure this out alone** — when questions come up, **our Visa Services team** is your first stop, not random forums or strangers online.",
          "Whether you need checklists, certified copies guidance, or help aligning your paperwork with what authorities expect, **we are here.** The next step is simple: reach out for structured support.",
        ],
        customCtas: [{ label: "Get Visa Help", href: "/visa-services", primary: true }],
      },
      {
        h2: "What Immigrant Support Network does for you",
        paragraphs: [
          "When you apply with ISN, you get **full support** across the journey — we are **your partner from Africa to Europe or Canada**, not a faceless job board.",
          "**✅ Job matching** — we connect you with **verified employers** and real vacancies that fit your profile. **✅ Visa assistance** — our team helps prepare **documentation** and guides you through the steps. **✅ CV writing** — European-format CVs that get attention (**see CV Services**). **✅ Process guidance** — step by step from application to travel planning. **✅ 24-hour response** — real people aim to contact you **within 24 hours** of a complete application (business days). **✅ Pan-African welcome** — we serve job seekers from **South Africa**, **Nigeria**, **Ghana**, **Kenya**, **Zimbabwe**, **Tanzania**, **Uganda**, **Zambia**, and **all African countries**.",
          "Ready to start? Choose the path that fits you best today.",
        ],
        customCtas: [
          { label: "Start Your Application", href: "/apply", primary: true },
          { label: "Learn about Visa Services", href: "/visa-services", primary: false },
        ],
      },
      {
        h2: "Step 5 — Prepare your documents",
        paragraphs: [
          "You will typically need a **valid passport**, a **professional CV** in **European format**, **work references** where available, **police clearance** when requested, and **medical checks** for certain roles. Clear scans and consistent names across documents keep everything moving smoothly.",
          "**Our CV Services** team can upgrade your CV so employers see your strengths in seconds — ask us which package fits you.",
          "When ISN requests an update, reply quickly — **speed keeps your file moving** toward employer matching.",
        ],
        image: {
          url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
          alt: "Passport and documents prepared for a work abroad application",
        },
      },
      {
        h2: "Step 6 — Apply for jobs",
        paragraphs: [
          "Go to **Apply**, complete **every field**, and name your **preferred countries** and **job types** (warehouse, farm, hospitality, etc.). Attach your CV where the form allows — **complete applications get priority**.",
          "Keep your phone and WhatsApp available. **Apply today — we respond within 24 hours** (business days) so you always know what is next.",
          "Seen a role on **Jobs**? Mention the **job title** — it helps us route you faster.",
        ],
        ctaAfter: true,
      },
      {
        h2: "Step 7 — What happens after you apply",
        paragraphs: [
          "A typical journey looks like: **application** → **profile review** → **employer matching** → **interview** → **offer** → **permits and travel planning**. Timelines vary by country and season — **most people plan for roughly 1–3 months** when documents and hiring line up; **budget 2–6 months** overall so you can prepare calmly.",
          "We stay in touch with **clear updates** — you are never left wondering whether your file is active.",
          "Always work through **official ISN channels** on this website — that protects you and your family.",
        ],
      },
      {
        h2: "How long does the whole process take?",
        paragraphs: [
          "Many candidates see strong progress within **1–3 months** when hiring is active and paperwork is complete. **Planning for 2–6 months** gives you space for interviews, medicals, and travel booking without stress.",
          "Your ISN coordinator helps you **see the milestones ahead** — passport ready, CV polished, employer interview, offer, next steps — so the journey feels manageable.",
          "Whenever you are unsure, **message us** — we would rather answer twice than leave you guessing.",
        ],
      },
      {
        h2: "How much does it cost?",
        paragraphs: [
          "International moves involve **registration with ISN** (from **R300** — confirm current fees when you apply), optional **CV packages**, **visa-related fees** handled with authorities, **flights**, and **first-month living costs**. We help you **map a clear budget** for your situation.",
          "**CV Services** and **Visa Services** are priced transparently — choose what you need; we never hide fees in fine print.",
          "Investing in **proper preparation** protects you from costly mistakes — **ISN helps you spend smart**, not twice.",
        ],
        ctaAfter: true,
      },
      {
        h2: "If an employer or visa step says not yet — what we do next",
        paragraphs: [
          "Sometimes another candidate fits one role better, or a file needs one more document — **that is normal** in international hiring. ISN **stays with you**: we **adjust your CV**, **look at other vacancies**, and **realign your documents** so the next step is stronger.",
          "Our goal is to keep you **moving forward** with dignity and clarity — **ask us anything**; we are on your side.",
        ],
      },
      {
        h2: "Can I bring my family?",
        paragraphs: [
          "Many travellers start **solo** while they stabilise income and housing — **family reunification** options depend on destination rules and your contract. Tell us early if **spouse or children** travel with you so we can **guide you toward routes** that support your family plan.",
          "ISN helps you **ask the right questions** and **prepare documentation** for the pathway that matches your situation.",
        ],
      },
      {
        h2: "What happens after you apply with ISN?",
        paragraphs: [
          "Your application enters our **recruitment workflow**. We review details, **match you to employer campaigns**, and **reach out** when there is an interview, an offer, or a simple fix needed on your file.",
          "We are a **dedicated team** — not bots — and **your quick replies** keep momentum high.",
          "Changed your mind on country or role? **Tell us** — we update your profile so matches stay accurate.",
        ],
      },
      {
        h2: "Tips for a stronger application",
        paragraphs: [
          "**Keep documents ready** before you apply — passports, CV, certificates — so nothing slows your first interview.",
          "**Read each job detail** with care — when you understand the role, you shine in screening.",
          "**Stay on ISN channels** — one trusted partner beats chasing random messages online.",
          "**Ask questions** — we prefer a curious applicant to a silent one.",
        ],
      },
      {
        h2: "Frequently asked questions",
        paragraphs: [
          "**Can Africans get jobs in Europe?** Yes — **Poland**, **Romania**, **Hungary**, and other markets need reliable workers; ISN connects you with **lawful employer opportunities**.",
          "**Do I need sponsorship?** Requirements vary by role — **we match you with employers** who fit your situation and explain what support is available.",
          "**How much does it cost?** It depends on destination and services you choose — **registration**, **CV**, **visa assistance**, travel. **Ask us for a clear outline**.",
          "**How long does it take?** Often **1–3 months** in active hiring cycles; **plan up to 2–6 months** for a comfortable timeline.",
        ],
      },
      {
        h2: "Ready to work abroad?",
        paragraphs: [
          "**Thousands of Africans** are already working legally in **Europe** and **Canada**. The process takes **focus and preparation** — **with the right partner it is absolutely achievable.** **Immigrant Support Network** is here to guide you **every step of the way**: from **finding your job** to **preparing visa documents** and **your CV**.",
          "**Your next step is simple** — submit your application today. **Our team will contact you within 24 hours** (business days) with clear, human guidance.",
        ],
        customCtas: [
          { label: "Apply Now", href: "/apply", primary: true },
          { label: "Get Visa Help", href: "/visa-services", primary: false },
          { label: "Get Your CV Written", href: "/cv-services", primary: false },
        ],
      },
    ],
  },

}

export const guideSlugs = Object.keys(GUIDES)

export const guidesList = guideSlugs.map((slug) => ({
  slug,
  title: GUIDES[slug].title,
  description: GUIDES[slug].description,
}))
