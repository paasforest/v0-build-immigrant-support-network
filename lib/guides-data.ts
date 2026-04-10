const DEFAULT_POST_DATE = "2026-04-09T12:00:00.000Z"

export type GuideSection = {
  h2: string
  paragraphs: string[]
  /** Decorative image after this section’s paragraphs */
  image?: { url: string; alt: string }
  /** Gold “Apply Now” block after this section */
  ctaAfter?: boolean
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
      "Complete guide: how can I go to Poland for work from Africa, jobs in Romania, work in Europe from Africa — visas, costs (incl. R300 registration), timelines, documents, mistakes to avoid, and how Immigrant Support Network helps you apply.",
    keywords: [
      "how to apply for work abroad from Africa",
      "how can I go to Poland for work from Africa",
      "how to apply for jobs in Romania",
      "how to work in Europe from Africa",
      "warehouse jobs Europe Africa",
      "farm jobs Europe apply",
      "work abroad step by step",
      "visa for work in Poland from Africa",
      "recruitment agency Africa to Europe",
    ],
    heroImage: {
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80",
      alt: "Diverse professionals in a modern workplace — representing African talent preparing to work abroad",
    },
    relatedSlugs: [
      "jobs-in-poland-for-africans-2026",
      "how-to-get-a-job-in-romania-from-africa",
      "jobs-in-hungary-for-foreign-workers",
      "easiest-europe-countries-for-africans",
    ],
    datePublished: "2026-04-01T12:00:00.000Z",
    dateModified: "2026-04-10T12:00:00.000Z",
    intro:
      "If you are searching **how can I go to Poland for work from Africa**, **how to apply for jobs in Romania**, or **how to work in Europe from Africa**, this guide shows the real, simple steps to get started — without false promises. Moving countries for work is emotional: hope for your family, fear of scams, and pressure to decide quickly. **Immigrant Support Network (ISN)** helps Africans connect with **employers** in **Europe** and **Canada** through lawful recruitment — but you must still meet **employer** requirements and **visa** rules yourself. We are a **recruitment agency**, not the government and not your employer. Read carefully, save this page, then **apply** when you are ready to act.",
    sections: [
      {
        h2: "Step 1 — Choose the right country",
        paragraphs: [
          "Start by selecting where you want to work, not only where social media hype is loudest. **Poland** often has **warehouse**, **factory**, and food-production roles. **Romania** is strong for **agriculture** and **production**. **Hungary** draws many people into **logistics** and **manufacturing**. **Canada** lists **drivers**, **general labour**, and seasonal roles — each pathway has different visa names and wait times.",
          "Choose based on **job availability** for your skills, **visa requirements** for your passport country, **language** expectations (English or local), and whether you can accept **shift work** and **shared accommodation**. If you have dependants, factor in whether you need savings for the first months abroad — most entry-level roles are built for single workers or people who can prove they can cover housing deposits.",
          "Use our **Work abroad** overview to compare destinations, then open the **Jobs** page and shortlist real vacancies. Write down three target roles (e.g. warehouse picker, farm worker, line operator). That clarity helps later when you fill the **Apply** form and when an employer asks what you can do.",
        ],
        image: {
          url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
          alt: "Globe and travel planning — choosing a country to work abroad from Africa",
        },
      },
      {
        h2: "Step 2 — Understand available jobs",
        paragraphs: [
          "Most Africans who enter Europe through agency-assisted routes start in **warehouse work**, **farm or agriculture jobs**, **food production**, **cleaning**, or **general labour**. These sectors hire in volume when local labour is short — that is why you see so many listings for picking, packing, sorting, and line work.",
          "Many of these jobs **do not** require a university degree. What they require is **reliability**, **stamina**, **punctuality**, and sometimes basic **English** or a willingness to learn on the job. Night shifts, cold rooms, standing for long hours, and repetitive tasks are normal — if that does not fit your health or family situation, be honest before you spend money on documents.",
          "Read each vacancy end-to-end. Note whether the text says **visa sponsorship**, **work permit support**, **accommodation fee**, or **bring your own visa route**. A job that looks perfect on the title line can still expect you to already have eligibility to work — never assume **free visa** unless the employer contract says so in writing.",
        ],
        ctaAfter: true,
      },
      {
        h2: "Step 3 — Understand salary and costs",
        paragraphs: [
          "Before you apply, understand **hourly pay** (**gross** vs **net**), typical **monthly hours** (often around **180–220** in many EU factory or warehouse schedules), **accommodation** costs or deductions, **transport**, and **meal** allowances. Ads often quote gross figures; your bank account sees net after tax and social contributions.",
          "Ask yourself: after rent and food, is there enough to remit home and build a small emergency fund? If an employer offers **company housing**, check whether it is mandatory, what the monthly fee is, and whether you share a room — that single line in a contract changes your real take-home pay.",
          "**Important:** some jobs **do not** include **visa sponsorship**. Some employers help with **work permits** after they select you; others expect you to secure your own lawful basis to work. If something is unclear, use **Visa Services** for document preparation help — we do not replace embassies, but we can help you organise what you already know you need.",
        ],
        image: {
          url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
          alt: "Calculator and coins — understanding salary, tax, and costs before working abroad",
        },
      },
      {
        h2: "Step 4 — Understand the visa process",
        paragraphs: [
          "This is where many applications stall. You must know the **correct visa or permit type** for your nationality and job offer, **embassy appointment** rules, and **document** formats (translations, apostilles, police clearance validity windows). One wrong date on a form can mean a rejected file — not because you are unqualified, but because paperwork was incomplete.",
          "Some employers **assist with work permits** once they commit to hiring you. **You** still usually **apply for the visa yourself** at the consulate, pay fees, attend biometrics, and wait. Timelines swing with season, country, and policy changes — treat any “guaranteed two weeks” promise from strangers online as a red flag.",
          "If you feel lost in the terminology, start with official embassy pages, then bring your questions to our team. We connect you with **employers** and help you **package** what you need for next steps — we do not guarantee embassy outcomes.",
        ],
        ctaAfter: true,
      },
      {
        h2: "Step 5 — Prepare your documents",
        paragraphs: [
          "You will typically need a **valid passport** (often **12+ months** validity beyond travel), a **professional CV** in a **European-style** layout, **work experience** proof where you have it, **police clearance** when requested, and **medical checks** for certain food or health-sensitive roles. References and training certificates strengthen weak experience sections.",
          "A **good CV** increases interview callbacks more than a long motivational essay. If your CV is still in a local format, consider our **CV services** — employers abroad skim for role titles, dates, and skills in seconds.",
          "Keep scans clear, PDFs under upload limits, and filenames sensible (e.g. **Surname_CV_2026.pdf**). When you are asked for copies, send the same version everywhere so dates stay consistent.",
        ],
        image: {
          url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
          alt: "Passport and documents on a desk — preparing paperwork for work abroad applications",
        },
      },
      {
        h2: "Step 6 — Apply for jobs",
        paragraphs: [
          "Now take action. Go to our **Apply** page, fill in **every** field truthfully, and mention **job type** (warehouse, farm, hospitality, etc.) and **preferred countries**. If the form allows attachments, upload your CV and key certificates together — partial forms slow matching.",
          "**Serious candidates** respond the same day when we or an employer message them. If your phone number bounces or your WhatsApp is off for days, you lose queue position to people who reply fast. Treat the first month like a job search sprint, not a passive wait.",
          "If you see a specific vacancy on **Jobs**, reference the **job title** in your application so we can route you correctly. Generic “any job anywhere” applications are harder to match than a focused request with realistic skills.",
        ],
        ctaAfter: true,
      },
      {
        h2: "Step 7 — What happens after applying",
        paragraphs: [
          "A typical path looks like this: **application submitted** → **profile review** → **employer screening** → **interview** (sometimes video or phone) → **job offer** → **work permit / contract steps** → **visa application** → **travel planning**. Not everyone gets an interview on day one — seasonal demand and employer pipelines fluctuate.",
          "Most people should expect roughly **1–3 months** when documents and employer timing align — but **2–6 months** is a safer mental model if you include embassy waits, medical scheduling, or corrections to paperwork. Urgent personal deadlines (debts due next month) do not speed up government processing; plan finances accordingly.",
          "Stay reachable, update us if your passport or phone number changes, and avoid paying random third parties who DM you “guaranteed placement” — work only through official ISN channels listed on this site.",
        ],
      },
      {
        h2: "How Immigrant Support Network helps you",
        paragraphs: [
          "People ask what we actually do — here is the straight answer. **You register** with **Immigrant Support Network** and pay the **R300 registration fee** so we can seriously review your profile and place you in the employer pipeline (fees and packages can change; confirm current amounts on **Apply** or when you speak with us).",
          "We **review** your skills, documents, and preferences, then **match** you with **employer** vacancies we are contracted to recruit for — where your profile fits. We **guide** you on **visa documentation** preparation in line with what your route requires (we are not the embassy). We **connect** you with the **employer** or their process so you are not guessing alone.",
          "After you submit a complete application, our team aims to get you **contacted within 24 hours** on business days so you know your status and next steps — weekends and public holidays may extend slightly. If something is missing from your file, we tell you clearly what to fix so you do not waste weeks in silence.",
          "We succeed when **you** are accurate, responsive, and realistic. We do not sell “visa in a week” stories — we sell structured help and employer access inside lawful recruitment.",
        ],
        ctaAfter: true,
      },
      {
        h2: "How long does the whole process take?",
        paragraphs: [
          "Budget **2–6 months** from a serious, complete application to starting work abroad in many typical cases. The short end (**~4–8 weeks**) can happen when an employer is urgently hiring, your documents are perfect, and embassy slots are available. The long end can include **permit** delays, **medical** booking waits, **peak season** at embassies, or a **mismatch** between your skills and open roles.",
          "If someone promises **days** for a full legal work route without knowing your passport country and offer letter, walk away. If someone says **never before six months** for every country, that is also too rigid — your case depends on destination, role, and your own speed preparing paperwork.",
          "Track your own milestones: passport ready → CV done → application in → employer response → offer → permit/visa steps. That visibility lowers anxiety more than any vague “soon” update.",
        ],
      },
      {
        h2: "How much does it cost?",
        paragraphs: [
          "Costs vary by **country**, **visa type**, **flights**, **medical** exams, **translations**, and **accommodation** deposits. Plan for: **R300** (or current published) **registration** with ISN to activate structured support; **CV writing** if you use our **CV services** (packages listed on that page); **visa and embassy fees** paid directly to authorities; **flights** and **initial rent** when you travel.",
          "We are transparent that **international work is not free** — anyone who says otherwise is likely misleading you. The goal is to spend money on **verifiable** steps (official fees, certified copies, travel) rather than on **untraceable** middlemen.",
          "Keep a simple spreadsheet: registration + documents + embassy + ticket + first month buffer. If the total is far above your savings, delay applying until you have a cushion — starting abroad broke raises scam risk and stress.",
        ],
        ctaAfter: true,
      },
      {
        h2: "What if my application is rejected?",
        paragraphs: [
          "Rejection happens — by an **employer** (another candidate fit better), by a **consulate** (document issue), or by **timing** (role filled). It is not a judgment on your worth as a person. Ask for **specific feedback** where possible: was it language, experience, health, passport validity, or quota?",
          "Fix what you can (CV clarity, references, skills course), then reapply when you genuinely meet the bar. If the rejection is **visa-related**, correct the file with official guidance before paying duplicate fees. ISN can often **re-match** you to other vacancies if your profile stays active and honest.",
          "Honest answers build trust: we would rather tell you “not this season” than push you into a route that collapses abroad.",
        ],
      },
      {
        h2: "Can I bring my family?",
        paragraphs: [
          "This is one of the most emotional questions we hear. Many **first-time work abroad** contracts target **single workers** or people who can travel alone because **housing** is shared and **salary** is entry-level. **Family reunification** or **dependent visas** exist in some systems but often **after** you have stable status, income, and housing that meets minimum size rules — not in week one.",
          "If your priority is migrating **with spouse and children immediately**, say so early. Some pathways fit that; many warehouse or seasonal routes do **not**. Wrong expectations hurt families when only one salary arrives and rent is sized for one bed.",
          "We point you to realistic options; we do not invent family visas where the law does not allow them for your situation.",
        ],
      },
      {
        h2: "What happens after you apply with ISN?",
        paragraphs: [
          "After you submit through our **Apply** flow, your details enter our recruitment workflow. We check completeness, may request **missing documents**, and align you with **open employer** campaigns we run. You receive updates when there is something concrete — an interview slot, a decline with reason, or a request to update your availability.",
          "We are **not** a chatbot that sends daily fluff. We are a small team handling real **employer** relationships — responsiveness from **you** speeds everything up.",
          "If you change your mind on country or job type, tell us — stale preferences waste everyone’s time.",
        ],
      },
      {
        h2: "Common mistakes to avoid",
        paragraphs: [
          "**Applying without documents ready** — you lose momentum when employers ask for CV or police clearance and you stall for weeks.",
          "**Not reading job details** — you miss **visa** fine print, **shift** patterns, or **location** far from cities.",
          "**Expecting a free visa every time** — some offers assume **you** already have a route; read twice.",
          "**Ignoring employer requirements** — language level, medical fitness, or start dates are non-negotiable on many lines.",
          "**Paying random strangers** who contact you on Facebook with “guaranteed embassy letter” — use only official ISN contacts from this website.",
        ],
      },
      {
        h2: "Frequently asked questions",
        paragraphs: [
          "**Can Africans get jobs in Europe?** Yes — especially where labour shortages exist (e.g. many roles in **Poland**, **Romania**, **Hungary**). You still need lawful work permission and a real employer match.",
          "**Do I need visa sponsorship?** Not always. Some jobs expect you to secure your own visa category; others involve employer-driven permits. Read each listing and ask us if wording is unclear.",
          "**How much does it cost?** Variable — registration with ISN, document and embassy fees, travel. See the cost section above and official fee schedules.",
          "**How long does it take?** Often **1–3 months** when things align; use **2–6 months** as a planning buffer.",
        ],
      },
      {
        h2: "Ready to apply?",
        paragraphs: [
          "If you are serious about **working abroad from Africa**, do not bookmark this page and forget it. **Submit your application today**, choose your **preferred country**, and start your process with accurate information and realistic timing.",
          "We are here to connect **talent** with **opportunity** — one honest application at a time.",
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
