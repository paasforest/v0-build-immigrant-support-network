/** Candidate-first imagery — African & mixed-race professionals, sized for fast loading. */
export function img(id: string, width = 900): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`
}

export const people = {
  /** Home hero — primary candidate portrait */
  heroCandidateMain: img("photo-1519085360753-af0119f7cbe7", 1200),
  heroCandidateSecondary: img("photo-1531123897727-8f129e168dce", 800),
  heroCandidateTertiary: img("photo-1560250097-0b93528c311a", 800),

  /** Page heroes — candidates in context */
  heroWorkersGroup: img("photo-1584012961499-2147c0b3cf0d", 2400),
  heroCommunity: img("photo-1509099896299-af46ad97ff57", 2400),

  applyCandidate: img("photo-1560250097-0b93528c311a", 1200),
  visaJourney: img("photo-1655313893399-e9d607e1d84c", 1200),
  cvProfessional: img("photo-1573497019940-1c28c88b5f97", 1200),
  teamCollaboration: img("photo-1584012961499-2147c0b3cf0d", 1200),
  supportAdvisor: img("photo-1531123897727-8f129e168dce", 1200),
  jobsHero: img("photo-1740825961434-e9287638592b", 2400),

  /** Testimonial portraits — Black / African candidates */
  portraitDavid: img("photo-1519085360753-af0119f7cbe7", 400),
  portraitGrace: img("photo-1531123897727-8f129e168dce", 400),
  portraitPeter: img("photo-1560250097-0b93528c311a", 400),
  portraitEmmanuel: img("photo-1623675162188-096b0668fa38", 400),
  portraitGraceCv: img("photo-1594744803329-e58b31f8ad67", 400),
  portraitDavidCv: img("photo-1655313893399-e9d607e1d84c", 400),

  /** Service cards — candidates, not empty workplaces */
  serviceJobs: img("photo-1584012961499-2147c0b3cf0d", 800),
  serviceVisa: img("photo-1655313893399-e9d607e1d84c", 800),
  serviceRecruitment: img("photo-1509099896299-af46ad97ff57", 800),

  /** How-it-works — candidate journey */
  stepApply: img("photo-1519085360753-af0119f7cbe7", 300),
  stepMatch: img("photo-1531123897727-8f129e168dce", 300),
  stepJourney: img("photo-1594744803329-e58b31f8ad67", 300),
} as const

/** Job & sector thumbnails — workers visible, African/mixed where possible */
export const sectors = {
  Agriculture: img("photo-1553775927-a071d5a6a39a", 900),
  Warehouse: img("photo-1584012961499-2147c0b3cf0d", 900),
  "Food Production": img("photo-1740825961434-e9287638592b", 900),
  Construction: img("photo-1740825961434-e9287638592b", 900),
  Manufacturing: img("photo-1717934435997-3fa2e49309f0", 900),
  Hospitality: img("photo-1582140110238-28f751bd624b", 900),
  Healthcare: img("photo-1573497019940-1c28c88b5f97", 900),
  Transport: img("photo-1717934435997-3fa2e49309f0", 900),
  "Childcare & Domestic": img("photo-1582140110238-28f751bd624b", 900),
  Services: img("photo-1581578731548-c64695cc6952", 900),
} as const

/** Country cards — people in relevant work, not empty scenery */
export const countries = {
  Poland: img("photo-1584012961499-2147c0b3cf0d", 900),
  Romania: img("photo-1553775927-a071d5a6a39a", 900),
  Hungary: img("photo-1740825961434-e9287638592b", 900),
  Lithuania: img("photo-1509099896299-af46ad97ff57", 900),
  Latvia: img("photo-1717934435997-3fa2e49309f0", 900),
  "United Kingdom": img("photo-1729364302769-fb601df0d3eb", 900),
  Canada: img("photo-1740825961434-e9287638592b", 900),
} as const

export type SectorKey = keyof typeof sectors

export function imageForJobType(type: string): string {
  return sectors[type as SectorKey] ?? sectors.Warehouse
}

export function countryImage(name: string): string {
  return countries[name as keyof typeof countries] ?? sectors.Warehouse
}

/** Homepage candidate gallery — mixed African nationalities */
export const gallery = [
  {
    src: img("photo-1519085360753-af0119f7cbe7", 600),
    alt: "African male candidate — ready for warehouse and logistics roles",
    caption: "Kenya · Warehouse roles",
    flag: "🇰🇪",
  },
  {
    src: img("photo-1531123897727-8f129e168dce", 600),
    alt: "African female candidate pursuing work in Europe",
    caption: "Nigeria · Hospitality",
    flag: "🇳🇬",
  },
  {
    src: img("photo-1560250097-0b93528c311a", 600),
    alt: "African professional candidate applying for work abroad",
    caption: "South Africa · Manufacturing",
    flag: "🇿🇦",
  },
  {
    src: img("photo-1594744803329-e58b31f8ad67", 600),
    alt: "African female candidate with European-format CV",
    caption: "Ghana · CV & placement",
    flag: "🇬🇭",
  },
  {
    src: img("photo-1584012961499-2147c0b3cf0d", 600),
    alt: "Group of African workers ready for international employment",
    caption: "Pre-screened candidates",
    flag: "🌍",
  },
  {
    src: img("photo-1553775927-a071d5a6a39a", 600),
    alt: "African women in agriculture and food production roles",
    caption: "Agriculture & food",
    flag: "🌾",
  },
] as const
