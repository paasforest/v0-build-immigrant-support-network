import { imageForJobType } from "./site-images"

export type JobListing = {
  id: string
  title: string
  type: string
  location: string
  salary: string
  duration: string
  requirements: string[]
  description: string
  imageUrl: string
  bodyParagraphs?: string[]
  employerOfferBullets?: string[]
  vacancies?: number
  featured?: boolean
}

export type CountryJobs = {
  country: string
  flag: string
  jobs: JobListing[]
}

const agencyDisclaimer =
  "Immigrant Support Network is a recruitment agency: we help candidates apply to third-party employers. We are not the hiring company, we do not sign your work contract ourselves, and we do not pay your wages. The summary below reflects information supplied by the employer for this vacancy."

export const jobsData: Record<string, CountryJobs> = {
  poland: {
    country: "Poland",
    flag: "🇵🇱",
    jobs: [
      {
        id: "pl-mush-1",
        title: "Mushroom picker",
        type: "Agriculture",
        location: "Borucino, Wielkopolskie, Poland",
        salary: "32 PLN gross/h (~23.11 net) · est. 5,900–7,500 PLN/month",
        duration: "~200 h/month · single shift 06:00–14:00",
        featured: true,
        requirements: [
          "Teamwork and manual dexterity; precision in picking",
          "No experience required — on-the-job training provided",
          "Long-term employment motivation is an advantage",
          "Sanitary-epidemiological health booklet — employer can help arrange before start",
          "Valid passport and lawful right to work in Poland",
        ],
        description:
          "Mushroom picking and quality control with a leading Polish mushroom producer. Single-shift work in climate-controlled halls (18–20°C).",
        bodyParagraphs: [
          agencyDisclaimer,
          "Our partner employer is a leader in mushroom production and processing in Poland, supplying products worldwide since 1992.",
          "Work is performed on a single shift from 06:00 to 14:00 on a rotating 7-day schedule, on selected days depending on the shift pattern. The employer provides 3 sets of work clothes and an on-site laundry service.",
          "Main duties: picking mushrooms to defined quality standards and controlling product quality.",
        ],
        employerOfferBullets: [
          "Contract of mandate (umowa zlecenie)",
          "32.00 PLN gross per hour (~23.11 PLN net per hour)",
          "Estimated monthly gross: 5,900–7,500 PLN",
          "Food allowance: 0.76 PLN net per hour",
          "Paid accommodation: 250 PLN per month",
          "Free transport to the workplace",
          "Quality and quantity bonus on top of hourly pay",
          "Approximately 200 hours per month",
          "Work clothes and on-site laundry at the factory",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1512595594595-82b7f049313b?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-prod-tychy",
        title: "Production worker — food manufacturing",
        type: "Food Production",
        location: "Tychy (near Katowice), Poland",
        salary: "31.40 PLN gross/h (~22.68 net) · est. 5,500–8,300 PLN/month",
        duration: "Long-term · up to 200–230 h/month",
        featured: true,
        requirements: [
          "Sanitary-epidemiological health booklet — support available to obtain it",
          "Availability for shift work",
          "Production or similar manual work experience preferred",
          "Responsibility and accuracy in tasks",
          "Valid passport and lawful right to work in Poland",
        ],
        description:
          "Production-line roles with a major international food manufacturer operating in 13 global markets. Work in a chilled hall (~+6°C).",
        bodyParagraphs: [
          agencyDisclaimer,
          "For our partner client — one of the largest food producers and suppliers in Poland, based in Tychy near Katowice — we are recruiting production workers on an ongoing basis.",
          "Duties include: running the production process to standard (packaging, line operation), checking product identification data, visual machine checks, labelling, quality control, basic fault reporting, and keeping your workstation clean.",
          "Career progression is possible: the employer uses competency matrices and staff assessments, so experienced workers can move to higher positions over time.",
        ],
        employerOfferBullets: [
          "Contract of mandate (umowa zlecenie)",
          "31.40 PLN gross per hour (~22.68 PLN net per hour)",
          "Estimated monthly gross: 5,500–8,300 PLN",
          "Free hot meal at the company canteen during each shift",
          "Agency accommodation: 450 PLN/month, or subsidy for your own housing",
          "Travel allowance where applicable",
          "Gift packages twice per year (Easter and Christmas)",
          "Up to 200–230 hours per month",
          "Chilled production environment (~+6°C) — warm work clothing provided",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-weigher-tychy",
        title: "Weigher (production documentation)",
        type: "Food Production",
        location: "Tychy (near Katowice), Poland",
        salary: "34.61 PLN gross/h (~25.00 net) · est. 5,900–9,300 PLN/month",
        duration: "Long-term · up to 200–270 h/month",
        requirements: [
          "Sanitary-epidemiological health booklet — support available",
          "Production experience in a similar environment",
          "Basic Microsoft Excel skills",
          "Comfort using computer applications",
          "Responsibility and attention to detail",
          "Valid passport and lawful right to work in Poland",
        ],
        description:
          "Weighing, waste handling, and production documentation at a major food plant in Tychy. Higher hourly rate than standard line roles.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Our partner client in Tychy is one of Poland's largest food producers. This weigher role involves production documentation, raw-material management in production storage areas, weighing and preparing post-production waste, and maintaining quality standards.",
          "Work is performed in a chilled hall at approximately +6°C.",
        ],
        employerOfferBullets: [
          "Contract of mandate (umowa zlecenie)",
          "34.61 PLN gross per hour (~25.00 PLN net per hour)",
          "Estimated monthly gross: 5,900–9,300 PLN",
          "Free hot meal at the company canteen",
          "Agency accommodation: 450 PLN/month, or housing subsidy",
          "Travel allowance where applicable",
          "Gift packages twice per year",
          "Up to 200–270 hours per month",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-wh-1",
        title: "Warehouse worker",
        type: "Warehouse",
        location: "Mazowieckie voivodeship, Poland",
        salary: "31.40 PLN gross/h (~22.68 net) · est. up to ~6,280 PLN/month at 200 h",
        duration: "Up to ~200 h/month · 5–6 days/week",
        vacancies: 30,
        requirements: [
          "No visa sponsorship — you need an existing right to work or your own visa route",
          "At least 1 year of warehouse experience",
          "Willingness to work long hours and on your feet",
          "Good physical condition and accuracy",
          "English minimum B1 level",
          "Valid passport and lawful right to work in Poland",
        ],
        description:
          "Receiving, unloading, labelling, and organising goods in a logistics and distribution warehouse. Day or night shifts.",
        bodyParagraphs: [
          agencyDisclaimer,
          "For our logistics and distribution partner in Mazowieckie we are recruiting 30 warehouse workers. The employer does not offer visa sponsorship.",
          "Tasks include receiving deliveries, unloading and organising stock, product labelling, and maintaining a tidy workspace in a fast-paced environment.",
        ],
        employerOfferBullets: [
          "Contract of mandate (umowa zlecenie)",
          "31.40 PLN gross per hour (~22.68 PLN net per hour)",
          "Accommodation and VAN transport: 600–700 PLN per month",
          "Day shift 08:00–18:00 or night shift 20:00–06:00 (fixed schedule)",
          "Typically 5–6 days per week",
          "Salary paid on the 15th of each month",
          "Up to 200 hours per month",
          "Work clothes provided",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-hotel-1",
        title: "Waiter / waitress — 4-star hotel",
        type: "Hospitality",
        location: "Kudowa Zdrój, Poland",
        salary: "33.78 PLN gross/h (~24.40 net) · + tips & night surcharge",
        duration: "Stable long-term · mandate contract",
        requirements: [
          "English minimum B1 level",
          "Minimum 1 year in a 3- or 4-star hotel",
          "Accuracy, commitment, availability, and good manners",
          "Valid passport and lawful right to work in Poland",
        ],
        description:
          "Full guest service at one of the largest hotels in Kudowa Zdrój — meals, restaurant cleanliness, and customer receipts.",
        bodyParagraphs: [
          agencyDisclaimer,
          "For our hospitality partner, one of the largest hotels in Kudowa Zdrój, we are recruiting waiters and waitresses.",
          "Responsibilities: comprehensive guest service, serving meals, keeping the restaurant clean, and preparing receipts for customers.",
        ],
        employerOfferBullets: [
          "Stable employment on a contract of mandate with the employer",
          "33.78 PLN gross per hour (~24.40 PLN net per hour)",
          "Sales commission and night-work surcharge — practical net can reach ~25–26 PLN/h",
          "Employer-provided accommodation",
          "Subsidised meals: breakfast 8 PLN, soup 5 PLN, main course 12 PLN",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-meat-1",
        title: "Meat cutter and packer",
        type: "Food Production",
        location: "Wielkopolskie voivodeship, Poland",
        salary: "Discussed at interview — competitive hourly rates",
        duration: "12+ months typical",
        vacancies: 20,
        requirements: [
          "No visa sponsorship — existing right to work required",
          "At least 1 year in meat production, butchery, or manual packing",
          "Able to work in chilled areas (3–7°C) and on your feet for long periods",
          "Physical stamina, responsibility, and hygiene compliance",
        ],
        description:
          "Cutting, trimming, portioning, packing, and labelling meat products to production standards in Wielkopolskie.",
        bodyParagraphs: [
          agencyDisclaimer,
          "For a meat processing and packaging client in Wielkopolskie we are recruiting 20 meat cutters and packers.",
          "Work includes cutting and trimming to standard, packing finished products, weighing and labelling, and strict sanitary compliance in a chilled environment.",
        ],
        employerOfferBullets: [
          "20 open positions",
          "Pay, schedule, and contract details confirmed at interview",
          "Chilled production area — protective clothing provided",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-mush-2",
        title: "Mushroom sorter",
        type: "Agriculture",
        location: "Wielkopolskie, Poland",
        salary: "Competitive hourly rate — discussed at interview",
        duration: "Seasonal or long-term",
        requirements: [
          "Attention to detail and hygiene awareness",
          "Physical stamina for standing work",
          "Valid passport and lawful right to work in Poland",
        ],
        description: "Sorting and grading mushrooms for packaging and distribution at a major producer.",
        bodyParagraphs: [agencyDisclaimer, "Sorting roles support the picking operation — grading mushrooms by size and quality before packaging."],
        employerOfferBullets: ["Hourly pay on mandate contract", "Accommodation options available", "Work clothes provided"],
        imageUrl:
          "https://images.unsplash.com/photo-1512595765784-5ebad80772a3?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-sort-1",
        title: "Sorter / box collector — service role",
        type: "Warehouse",
        location: "Poland (location confirmed at interview)",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Physical fitness", "Shift flexibility", "Valid passport"],
        description: "Sorting, collecting boxes, and supporting logistics operations in a warehouse service role.",
        imageUrl:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-wh-2",
        title: "Order picker — warehouse",
        type: "Warehouse",
        location: "Śląskie voivodeship, Poland",
        salary: "Competitive hourly rate — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Accuracy and pace", "RF scanner training often provided", "Valid passport"],
        description: "Picking and preparing orders for shipment in a Śląskie warehouse environment.",
        imageUrl:
          "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-meat-2",
        title: "Manual packer — meat industry",
        type: "Food Production",
        location: "Małopolskie voivodeship, Poland",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Food hygiene awareness", "Physical stamina", "Valid passport"],
        description: "Manual packing and labelling in the meat industry in Małopolskie.",
        imageUrl:
          "https://images.unsplash.com/photo-1585659722983-d3cd295b01b1?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-meat-3",
        title: "Production worker — meat industry",
        type: "Food Production",
        location: "Śląskie voivodeship, Poland",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Hygiene and safety compliance", "Teamwork", "Valid passport"],
        description: "Production line work in meat processing in the Śląskie region.",
        imageUrl:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-meat-4",
        title: "Manual packer — meat industry",
        type: "Food Production",
        location: "Dolnośląskie voivodeship, Poland",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Food industry hygiene", "Reliability", "Valid passport"],
        description: "Manual packing roles in meat industry facilities in Dolnośląskie.",
        imageUrl:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-hotel-gen-1",
        title: "Hotel & restaurant roles",
        type: "Hospitality",
        location: "Various, Poland",
        salary: "From ~28 PLN/h gross — varies by role",
        duration: "Seasonal and year-round positions",
        requirements: ["Hospitality interest or experience", "English or Polish a plus", "Valid passport"],
        description: "Kitchen, service, housekeeping, and front-of-house roles across partner hotels and restaurants.",
        bodyParagraphs: [agencyDisclaimer, "Multiple hospitality vacancies through our Polish partner network — roles and rates confirmed during screening."],
        employerOfferBullets: ["Accommodation often available", "Meals subsidised at many properties", "Mandate or employment contract depending on employer"],
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-cook-1",
        title: "Cook — Italian restaurant",
        type: "Hospitality",
        location: "Poland (city confirmed at interview)",
        salary: "Competitive — discussed at interview",
        duration: "12+ months typical",
        requirements: ["Cooking experience", "Food safety awareness", "Valid passport"],
        description: "Preparing Italian cuisine in a restaurant setting — teamwork in a busy kitchen.",
        imageUrl:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-child-1",
        title: "Live-in childcare & household assistant",
        type: "Childcare & Domestic",
        location: "Poland (family location confirmed at interview)",
        salary: "Competitive monthly package — discussed at interview",
        duration: "Live-in, long-term",
        requirements: ["Experience with children preferred", "References may be required", "Valid passport"],
        description: "Live-in support combining childcare and light household duties for a family residence.",
        imageUrl:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "pl-dom-1",
        title: "Domestic helper (live-in)",
        type: "Childcare & Domestic",
        location: "Poland",
        salary: "Competitive monthly package — discussed at interview",
        duration: "Live-in, long-term",
        requirements: ["Domestic or care experience helpful", "Trustworthiness", "Valid passport"],
        description: "Live-in domestic assistance including cleaning, cooking support, and household tasks.",
        imageUrl:
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  romania: {
    country: "Romania",
    flag: "🇷🇴",
    jobs: [
      {
        id: "ro-construct-1",
        title: "Construction worker — general building",
        type: "Construction",
        location: "Bucharest & Ilfov, Romania",
        salary: "€800–€1,100/month net · ~€4.50–€6.00/h equivalent",
        duration: "6–12 months · renewable",
        featured: true,
        requirements: [
          "Construction or general labour experience preferred",
          "Physical fitness for outdoor and height work",
          "Basic safety awareness",
          "Valid passport; work permit arranged via employer",
        ],
        description:
          "General construction, renovation, and infrastructure support on residential and commercial projects in the Bucharest area.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Romania's construction sector actively recruits foreign workers for building, finishing, and site-support roles. Employers typically assist with work-authorisation documentation.",
          "Tasks include assisting skilled trades, material handling, site cleanup, and basic assembly work under site supervision.",
        ],
        employerOfferBullets: [
          "Monthly net pay: €800–€1,100 depending on experience and hours",
          "Shared accommodation often available (~€100–€150/month deduction)",
          "Transport to site where applicable",
          "Work contract compliant with Romanian labour law",
          "Overtime paid at legal rates",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "ro-auto-1",
        title: "Automotive assembly operative",
        type: "Manufacturing",
        location: "Pitești, Argeș, Romania",
        salary: "€850–€1,150/month net",
        duration: "12+ months",
        featured: true,
        vacancies: 15,
        requirements: [
          "No prior automotive experience required for entry roles",
          "Attention to detail and ability to follow process instructions",
          "Shift flexibility (2-shift or 3-shift patterns)",
          "Valid passport",
        ],
        description:
          "Assembly-line and quality-check roles at automotive supplier plants in Romania's main manufacturing hub.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Pitești and surrounding areas host major automotive manufacturing and supplier operations. Entry-level assembly roles are suitable for candidates new to factory work.",
          "Duties include component assembly, visual quality checks, and line feeding under team-leader supervision.",
        ],
        employerOfferBullets: [
          "Net monthly pay: €850–€1,150",
          "2-shift system typical (morning/afternoon)",
          "Employer-provided or subsidised accommodation",
          "Hot meal or meal vouchers at many plants",
          "Training on first day — no licence required for standard assembly",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "ro-factory-1",
        title: "Factory operative — electronics & components",
        type: "Manufacturing",
        location: "Cluj-Napoca, Romania",
        salary: "€750–€1,000/month net",
        duration: "12+ months",
        requirements: [
          "No experience needed for entry roles",
          "Attention to detail and steady hand for small components",
          "Valid passport",
        ],
        description: "Assembly, soldering support, and packaging in electronics and automotive component factories.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Cluj-Napoca is a major manufacturing centre in Transylvania with demand for production operatives in electronics and automotive supply chains.",
        ],
        employerOfferBullets: [
          "Net monthly pay: €750–€1,000",
          "Clean-room or standard production environments depending on assignment",
          "Accommodation support available",
          "Contract of employment with full social contributions",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "ro-wh-1",
        title: "Warehouse picker & packer",
        type: "Warehouse",
        location: "Brașov, Romania",
        salary: "€780–€1,050/month net",
        duration: "12+ months",
        vacancies: 10,
        requirements: [
          "Physical fitness for walking and lifting",
          "Basic English or Romanian helpful",
          "Accuracy with order lists or scanner guns",
          "Valid passport",
        ],
        description:
          "Order picking, packing, and dispatch preparation in regional distribution centres serving retail and e-commerce clients.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Brașov logistics hubs serve central Romania and export routes. Pickers work from pick lists or handheld scanners in temperature-controlled warehouses.",
        ],
        employerOfferBullets: [
          "Net monthly pay: €780–€1,050",
          "Day shifts typical; some sites run extended hours in peak season",
          "Shared accommodation near the warehouse",
          "Work boots and high-visibility vest provided",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "ro-meat-1",
        title: "Meat processing worker",
        type: "Food Production",
        location: "Bacău, Romania",
        salary: "€750–€980/month net",
        duration: "12+ months",
        requirements: [
          "Willingness to work in chilled areas (2–8°C)",
          "Physical stamina and hygiene compliance",
          "Food-sector experience a plus but not always required",
          "Valid passport",
        ],
        description: "Cutting, deboning support, packing, and labelling in a meat processing plant in eastern Romania.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Romania has a significant meat and food-processing sector exporting across the EU. Roles involve standing work in cold production halls with strict hygiene rules.",
        ],
        employerOfferBullets: [
          "Net monthly pay: €750–€980",
          "Protective clothing and boots provided",
          "Medical check arranged before start",
          "Hot meal or allowance at many plants",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "ro-hotel-1",
        title: "Hotel housekeeping & kitchen support",
        type: "Hospitality",
        location: "Constanța (Black Sea coast), Romania",
        salary: "€700–€950/month net + tips",
        duration: "Seasonal (April–October) or year-round",
        requirements: [
          "Basic English for tourist areas",
          "Customer service attitude",
          "Previous hotel experience helpful",
          "Valid passport",
        ],
        description:
          "Housekeeping, kitchen assistance, and general hotel duties in coastal resorts on the Black Sea.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Constanța's tourism season creates strong demand for housekeeping and kitchen-support staff. Many roles include meals and shared staff accommodation.",
        ],
        employerOfferBullets: [
          "Net monthly pay: €700–€950 (seasonal rates)",
          "Staff meals included at most properties",
          "Shared accommodation near the hotel",
          "Tips from guests in front-of-house adjacent roles",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "ro-greenhouse-1",
        title: "Greenhouse & vegetable farm worker",
        type: "Agriculture",
        location: "Olt county, Romania",
        salary: "€650–€900/month net",
        duration: "Seasonal (6–9 months) or long-term",
        requirements: [
          "Physical fitness for bending and lifting",
          "Willingness to work outdoors and in greenhouses",
          "No experience required",
          "Valid passport",
        ],
        description: "Planting, harvesting, sorting, and packing vegetables in modern greenhouse and field operations.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Southern Romania's agricultural belt supplies domestic and export markets. Greenhouse work is year-round; field work peaks in spring and autumn.",
        ],
        employerOfferBullets: [
          "Net monthly pay: €650–€900",
          "On-site or nearby accommodation",
          "Piece-rate bonuses at some farms",
          "Training provided on first week",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "ro-clean-1",
        title: "Commercial cleaner — offices & facilities",
        type: "Services",
        location: "Bucharest, Romania",
        salary: "€700–€900/month net",
        duration: "12+ months",
        requirements: [
          "Reliability and attention to detail",
          "Early morning or evening shift availability",
          "Valid passport",
        ],
        description: "Cleaning and maintenance of commercial offices, shopping centres, and business facilities.",
        bodyParagraphs: [agencyDisclaimer, "Facility-services companies across Bucharest hire foreign workers for regular cleaning contracts with stable hours."],
        employerOfferBullets: [
          "Net monthly pay: €700–€900",
          "Cleaning equipment and supplies provided",
          "Fixed weekly schedule",
          "Public transport allowance at some sites",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  hungary: {
    country: "Hungary",
    flag: "🇭🇺",
    jobs: [
      {
        id: "hu-wh-1",
        title: "Warehouse associate — distribution centre",
        type: "Warehouse",
        location: "Budapest & Pest county, Hungary",
        salary: "€750–€1,000/month net · ~HUF 300,000–400,000",
        duration: "12+ months",
        featured: true,
        vacancies: 12,
        requirements: [
          "Basic English or Hungarian helpful",
          "Physical fitness for lifting up to ~20 kg regularly",
          "Scanner or WMS experience a plus",
          "Valid passport",
        ],
        description:
          "Receiving, picking, packing, and dispatch in distribution centres serving Hungary and Central European routes.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Budapest and surrounding logistics parks employ large numbers of warehouse staff for retail and automotive supply chains.",
          "Tasks include unloading deliveries, stock placement, order picking from pick lists or RF scanners, and preparing shipments.",
        ],
        employerOfferBullets: [
          "Net monthly pay: €750–€1,000",
          "Day and afternoon shifts available",
          "Shared accommodation: ~€120–€180/month",
          "Work clothing provided",
          "Overtime available in peak periods",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "hu-auto-1",
        title: "Production line worker — automotive supplier",
        type: "Manufacturing",
        location: "Győr, Hungary",
        salary: "€780–€1,050/month net",
        duration: "12+ months",
        featured: true,
        requirements: [
          "Shift flexibility (2- or 3-shift system)",
          "Attention to detail",
          "No automotive experience required for entry roles",
          "Valid passport",
        ],
        description:
          "Assembly, quality inspection, and packaging at automotive supplier plants in Hungary's main industrial region.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Győr is one of Central Europe's automotive manufacturing hubs. Entry-level production roles include assembly, visual inspection, and line feeding.",
        ],
        employerOfferBullets: [
          "Net monthly pay: €780–€1,050",
          "2-shift or 3-shift patterns",
          "Canteen meal or meal voucher",
          "Employer-assisted accommodation",
          "Career progression to team-leader roles possible",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "hu-factory-1",
        title: "Production line worker — electronics",
        type: "Manufacturing",
        location: "Debrecen, Hungary",
        salary: "€700–€950/month net",
        duration: "12+ months",
        requirements: [
          "Attention to detail",
          "Shift flexibility",
          "Valid passport",
        ],
        description: "Assembly and packaging roles in electronics and battery supplier plants in eastern Hungary.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Debrecen has attracted major electronics and EV-supply investments, creating steady demand for production operatives.",
        ],
        employerOfferBullets: [
          "Net monthly pay: €700–€950",
          "Clean production environment",
          "Training on start",
          "Accommodation support available",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "hu-food-1",
        title: "Food production & packaging operative",
        type: "Food Production",
        location: "Szeged, Hungary",
        salary: "€720–€980/month net",
        duration: "12+ months",
        requirements: [
          "Willingness to work in chilled or fast-paced packing areas",
          "Hygiene and food-safety compliance",
          "Physical stamina",
          "Valid passport",
        ],
        description: "Processing, packing, and labelling food products for domestic and export markets in southern Hungary.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Szeged and the Great Plain region host food-processing plants producing meat, dairy, and packaged goods for EU markets.",
        ],
        employerOfferBullets: [
          "Net monthly pay: €720–€980",
          "Protective clothing provided",
          "Health check before employment",
          "Staff meals at many facilities",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "hu-log-1",
        title: "Logistics operative — loading & stock control",
        type: "Warehouse",
        location: "Győr, Hungary",
        salary: "€780–€1,050/month net",
        duration: "12+ months",
        requirements: [
          "Forklift licence a plus (training sometimes provided)",
          "Safety awareness",
          "Valid passport",
        ],
        description: "Loading, unloading, and stock control in a busy logistics hub serving automotive and retail clients.",
        bodyParagraphs: [agencyDisclaimer, "Logistics operatives support inbound and outbound flows, cycle counts, and dock operations."],
        employerOfferBullets: [
          "Net monthly pay: €780–€1,050",
          "Forklift training available for suitable candidates",
          "Fixed shift patterns",
          "Accommodation near the site",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1601584114707-776984275783?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "hu-hotel-1",
        title: "Hotel kitchen helper & housekeeping",
        type: "Hospitality",
        location: "Budapest, Hungary",
        salary: "€650–€900/month net + tips",
        duration: "Year-round and seasonal",
        requirements: [
          "Basic English for tourist districts",
          "Willingness to work early or split shifts",
          "Valid passport",
        ],
        description: "Kitchen prep, dishwashing, and housekeeping support in Budapest hotels and restaurants.",
        bodyParagraphs: [
          agencyDisclaimer,
          "Budapest's tourism sector creates steady demand for kitchen and housekeeping support staff, especially in districts 5, 6, and 7.",
        ],
        employerOfferBullets: [
          "Net monthly pay: €650–€900",
          "Staff meal during shift at many properties",
          "Shared staff housing options",
          "Tips in customer-facing adjacent roles",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "hu-agri-1",
        title: "Agricultural worker — fruit & vegetable",
        type: "Agriculture",
        location: "Great Plain region, Hungary",
        salary: "€600–€850/month net",
        duration: "Seasonal (April–November)",
        requirements: [
          "Physical fitness for outdoor work",
          "No experience required",
          "Valid passport",
        ],
        description: "Planting, harvesting, and sorting fruit and vegetables on farms in southern and eastern Hungary.",
        bodyParagraphs: [agencyDisclaimer, "Seasonal agricultural work peaks from spring through autumn with accommodation often provided on or near the farm."],
        employerOfferBullets: [
          "Net monthly pay: €600–€850 during season",
          "On-farm accommodation",
          "Piece-rate bonuses at harvest",
          "Transport from accommodation to fields",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "hu-pack-1",
        title: "Packaging operative — consumer goods",
        type: "Manufacturing",
        location: "Veszprém, Hungary",
        salary: "€730–€960/month net",
        duration: "12+ months",
        requirements: [
          "Steady pace on repetitive tasks",
          "Quality focus",
          "Valid passport",
        ],
        description: "Packaging, labelling, and pallet preparation for consumer-goods manufacturing near Lake Balaton.",
        bodyParagraphs: [agencyDisclaimer, "Veszprém county hosts packaging and light manufacturing operations supplying retail chains across Central Europe."],
        employerOfferBullets: [
          "Net monthly pay: €730–€960",
          "Single-shift production typical",
          "Accommodation subsidy available",
          "Stable long-term contracts",
        ],
        imageUrl:
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  lithuania: {
    country: "Lithuania",
    flag: "🇱🇹",
    jobs: [
      {
        id: "lt-log-1",
        title: "Logistics & warehouse worker",
        type: "Warehouse",
        location: "Vilnius, Lithuania",
        salary: "€900–€1,200/month net",
        duration: "12+ months",
        requirements: ["Basic English", "Physical stamina", "Valid passport"],
        description: "Order picking, packing, and inventory support for regional distribution clients.",
        bodyParagraphs: [agencyDisclaimer, "Vilnius logistics centres serve Baltic and EU distribution networks with modern warehouse systems."],
        employerOfferBullets: ["Net monthly pay: €900–€1,200", "Accommodation support", "Work contract with social insurance"],
        imageUrl:
          "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "lt-mfg-1",
        title: "Manufacturing operative",
        type: "Manufacturing",
        location: "Kaunas, Lithuania",
        salary: "€850–€1,100/month net",
        duration: "12+ months",
        requirements: ["Teamwork", "Quality focus", "Valid passport"],
        description: "Production and assembly work in manufacturing facilities with EU-standard processes.",
        bodyParagraphs: [agencyDisclaimer, "Kaunas industrial zones host furniture, electronics, and automotive component manufacturing."],
        employerOfferBullets: ["Net monthly pay: €850–€1,100", "Training provided", "Shift allowances where applicable"],
        imageUrl:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "lt-food-1",
        title: "Food production worker",
        type: "Food Production",
        location: "Klaipėda, Lithuania",
        salary: "€800–€1,050/month net",
        duration: "12+ months",
        requirements: ["Hygiene awareness", "Early shifts", "Valid passport"],
        description: "Processing and packing roles in food production with cold-chain and safety training.",
        bodyParagraphs: [agencyDisclaimer, "Klaipėda's port-linked food sector exports fish, dairy, and processed goods across the EU."],
        employerOfferBullets: ["Net monthly pay: €800–€1,050", "Protective gear provided", "Meals at some plants"],
        imageUrl:
          "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  latvia: {
    country: "Latvia",
    flag: "🇱🇻",
    jobs: [
      {
        id: "lv-wh-1",
        title: "Warehouse worker",
        type: "Warehouse",
        location: "Riga, Latvia",
        salary: "€800–€1,100/month net",
        duration: "12+ months",
        requirements: ["Basic English or Russian helpful", "Reliability", "Valid passport"],
        description: "Storage, picking, and loading in warehouse operations near the capital.",
        bodyParagraphs: [agencyDisclaimer, "Riga warehouses support Baltic retail and export logistics with steady year-round demand."],
        employerOfferBullets: ["Net monthly pay: €800–€1,100", "Shared accommodation options", "Legal employment contract"],
        imageUrl:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "lv-hosp-1",
        title: "Hospitality support — hotel & resort",
        type: "Hospitality",
        location: "Jūrmala, Latvia",
        salary: "€700–€950/month net",
        duration: "Seasonal (May–September)",
        requirements: ["Customer service attitude", "English basics", "Valid passport"],
        description: "Seasonal hotel and resort support — housekeeping, kitchen help, and guest services.",
        bodyParagraphs: [agencyDisclaimer, "Jūrmala's seaside resorts hire seasonal staff for the summer tourism peak."],
        employerOfferBullets: ["Net monthly pay: €700–€950", "Staff meals included", "Shared seasonal housing"],
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "lv-transport-1",
        title: "Delivery & logistics support",
        type: "Transport",
        location: "Riga, Latvia",
        salary: "€850–€1,150/month net",
        duration: "12+ months",
        requirements: ["Driving licence a plus", "Local route knowledge helpful", "Valid passport"],
        description: "Last-mile delivery and logistics support for courier and retail networks.",
        bodyParagraphs: [agencyDisclaimer, "Courier and retail logistics companies in Riga hire drivers and driver assistants for last-mile delivery."],
        employerOfferBullets: ["Net monthly pay: €850–€1,150", "Company van for some routes", "Fuel card where applicable"],
        imageUrl:
          "https://images.unsplash.com/photo-1601584114707-776984275783?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  germany: {
    country: "Germany",
    flag: "🇩🇪",
    jobs: [
      {
        id: "de-warehouse-1",
        title: "Logistics coordinator",
        type: "Warehouse",
        location: "Berlin, Germany",
        salary: "€1,500–€2,000/month net",
        duration: "12+ months",
        requirements: ["Basic German or English", "Computer literacy", "Valid passport"],
        description: "Coordinate shipments and manage inventory in modern logistics centres.",
        bodyParagraphs: [agencyDisclaimer, "Berlin logistics hubs require staff for inventory management and shipment coordination."],
        employerOfferBullets: ["Net monthly pay: €1,500–€2,000", "German language courses sometimes subsidised"],
        imageUrl:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "de-care-1",
        title: "Care assistant",
        type: "Healthcare",
        location: "Munich, Germany",
        salary: "€1,800–€2,500/month net",
        duration: "12+ months",
        requirements: ["Care experience preferred", "German language (B1 level)", "Valid passport"],
        description: "Assist elderly residents in care homes with daily activities.",
        bodyParagraphs: [agencyDisclaimer, "Germany's care sector has long-term demand; B1 German is typically required for direct care roles."],
        employerOfferBullets: ["Net monthly pay: €1,800–€2,500", "Recognised qualification pathway available"],
        imageUrl:
          "https://images.unsplash.com/photo-1576765608535-5f04a1d3f289?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "de-driver-1",
        title: "Delivery driver",
        type: "Transport",
        location: "Hamburg, Germany",
        salary: "€1,600–€2,200/month net",
        duration: "12+ months",
        requirements: ["Valid EU driving licence", "Clean driving record", "Basic German"],
        description: "Deliver packages for major logistics companies.",
        bodyParagraphs: [agencyDisclaimer, "Last-mile delivery roles in Hamburg require a valid licence and clean record."],
        employerOfferBullets: ["Net monthly pay: €1,600–€2,200", "Company vehicle provided"],
        imageUrl:
          "https://images.unsplash.com/photo-1601584114707-776984275783?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  netherlands: {
    country: "Netherlands",
    flag: "🇳🇱",
    jobs: [
      {
        id: "nl-farm-1",
        title: "Tulip farm worker",
        type: "Agriculture",
        location: "Lisse, Netherlands",
        salary: "€1,200–€1,600/month net",
        duration: "Seasonal (3–5 months)",
        requirements: ["No experience needed", "Physical fitness", "Valid passport"],
        description: "Planting, harvesting, and packaging tulips and other flowers.",
        bodyParagraphs: [agencyDisclaimer, "The Bulb Region around Lisse peaks in spring with seasonal flower harvest work."],
        employerOfferBullets: ["Net monthly pay: €1,200–€1,600 in season", "On-site or nearby housing"],
        imageUrl:
          "https://images.unsplash.com/photo-1490759847868-88eda4486cfe?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "nl-warehouse-1",
        title: "E-commerce fulfilment operative",
        type: "Warehouse",
        location: "Rotterdam, Netherlands",
        salary: "€1,400–€1,800/month net",
        duration: "12+ months",
        requirements: ["Basic English", "Fast-paced work ability", "Valid passport"],
        description: "Order picking and packing for major online retailers.",
        bodyParagraphs: [agencyDisclaimer, "Rotterdam and surrounding areas host large e-commerce fulfilment centres."],
        employerOfferBullets: ["Net monthly pay: €1,400–€1,800", "Shift premiums for nights and weekends"],
        imageUrl:
          "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "nl-food-1",
        title: "Cheese factory worker",
        type: "Food Production",
        location: "Gouda, Netherlands",
        salary: "€1,300–€1,700/month net",
        duration: "12+ months",
        requirements: ["Food hygiene awareness", "Early shifts", "Valid passport"],
        description: "Work in traditional cheese production facilities.",
        bodyParagraphs: [agencyDisclaimer, "Dutch cheese production facilities operate year-round with early-morning shifts."],
        employerOfferBullets: ["Net monthly pay: €1,300–€1,700", "Hygiene training provided"],
        imageUrl:
          "https://images.unsplash.com/photo-1452195100526-196cffb8e288?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  canada: {
    country: "Canada",
    flag: "🇨🇦",
    jobs: [
      {
        id: "ca-farm-1",
        title: "Agricultural worker",
        type: "Agriculture",
        location: "British Columbia, Canada",
        salary: "CAD $2,500–$3,500/month",
        duration: "Seasonal (4–8 months)",
        requirements: ["Farm experience preferred", "Physical fitness", "Valid passport"],
        description: "Work on fruit farms, vineyards, and vegetable production.",
        bodyParagraphs: [agencyDisclaimer, "Seasonal Agricultural Worker Program (SAWP) and similar routes apply — eligibility depends on nationality and program rules."],
        employerOfferBullets: ["Monthly pay: CAD $2,500–$3,500", "Employer-arranged housing typical"],
        imageUrl:
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "ca-meat-1",
        title: "Meat processing worker",
        type: "Food Production",
        location: "Alberta, Canada",
        salary: "CAD $2,800–$3,800/month",
        duration: "12+ months",
        requirements: ["No experience needed", "Ability to work in cold", "Valid passport"],
        description: "Work in large meat processing facilities with potential PR pathway.",
        bodyParagraphs: [agencyDisclaimer, "Alberta meat plants hire internationally; some pathways may support permanent residence over time."],
        employerOfferBullets: ["Monthly pay: CAD $2,800–$3,800", "Protective equipment provided"],
        imageUrl:
          "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "ca-truck-1",
        title: "Long-haul truck driver",
        type: "Transport",
        location: "Ontario, Canada",
        salary: "CAD $4,000–$6,000/month",
        duration: "12+ months",
        requirements: ["Valid Class 1/AZ licence", "Clean driving record", "2+ years experience"],
        description: "Cross-country freight transportation with excellent earning potential.",
        bodyParagraphs: [agencyDisclaimer, "Long-haul roles require a recognised commercial licence and clean driving history."],
        employerOfferBullets: ["Monthly pay: CAD $4,000–$6,000", "Per-mile or salary structures vary by employer"],
        imageUrl:
          "https://images.unsplash.com/photo-1601584114707-776984275783?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
}

export const jobTypes = [
  "All Types",
  "Agriculture",
  "Warehouse",
  "Food Production",
  "Construction",
  "Manufacturing",
  "Hospitality",
  "Healthcare",
  "Transport",
  "Childcare & Domestic",
  "Services",
] as const

export const jobCountries = [
  "All Countries",
  "Poland",
  "Romania",
  "Hungary",
  "Lithuania",
  "Latvia",
  "Germany",
  "Netherlands",
  "Canada",
] as const

export type FlatJob = JobListing & { country: string; flag: string }

export function getAllJobs(): FlatJob[] {
  return Object.values(jobsData).flatMap((countryData) =>
    countryData.jobs.map((job) => ({
      ...job,
      imageUrl: imageForJobType(job.type),
      country: countryData.country,
      flag: countryData.flag,
    }))
  )
}

export function getJobCountsByCountry(): { country: string; flag: string; count: number }[] {
  return Object.values(jobsData).map(({ country, flag, jobs }) => ({
    country,
    flag,
    count: jobs.length,
  }))
}
