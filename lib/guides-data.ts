export type Guide = {
  slug: string
  title: string
  description: string
  keywords: string[]
  intro: string
  sections: { h2: string; paragraphs: string[] }[]
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
    title: "How to Apply for Work Abroad from Africa",
    description:
      "Step-by-step: choose destination, prepare documents, apply through ISN, interview with employers, and understand visas — realistic timeline.",
    keywords: [
      "how to apply for work abroad from Africa",
      "how can I go to Poland for work from Africa",
      "work abroad apply now",
    ],
    intro:
      "If you searched **how can I go to Poland for work from Africa** or **how to apply for work abroad from Africa**, use this page as a simple roadmap. ISN helps with **applications** to **employers** in Europe and Canada — you still need to meet **employer** and **government** rules.",
    sections: [
      {
        h2: "Introduction — your goal",
        paragraphs: [
          "Define your destination (e.g. Poland, Romania, Canada), job type (warehouse, farm, hospitality), and earliest date you can travel after permits.",
        ],
      },
      {
        h2: "Jobs available — where to look",
        paragraphs: [
          "Use our **Jobs** page and **Work abroad** country overview. Save links to roles that match your experience and language level.",
        ],
      },
      {
        h2: "Salary and contract basics",
        paragraphs: [
          "Compare gross/net, hours, overtime, housing, and visa sponsorship statements (many employers do **not** sponsor — read carefully).",
        ],
      },
      {
        h2: "Visa process — don’t skip research",
        paragraphs: [
          "Identify the lawful route for your nationality. Use embassy sites; add **Visa Services** if you want structured help assembling documents.",
        ],
      },
      {
        h2: "Requirements checklist",
        paragraphs: [
          "Passport validity, CV, references, certificates, police clearance if needed, health checks for food jobs, language proof if required.",
        ],
      },
      {
        h2: "How to apply — action",
        paragraphs: [
          "Click **Apply**, complete every field, attach documents if the form allows, and mention specific job titles. Reply quickly to follow-up messages.",
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
