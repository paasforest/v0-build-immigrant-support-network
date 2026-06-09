/** Curated Unsplash URLs — diverse African & international people, sized for fast loading. */
export function img(id: string, width = 900): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`
}

export const people = {
  /** Home hero — diverse professionals collaborating */
  heroMain: img("photo-1600880292203-75762bf6380b", 2400),
  /** Secondary hero / work-abroad — international team */
  heroInternational: img("photo-1521737711867-e3b97375f902", 2400),
  /** Apply page — candidate preparing documents */
  applyCandidate: img("photo-1573496359142-b8d87734a21a", 1200),
  /** Visa — travel & documents */
  visaJourney: img("photo-1488646953014-85cb44e25828", 1200),
  /** CV services — professional at work */
  cvProfessional: img("photo-1573497019940-1c28c88b5f97", 1200),
  /** About mission — diverse team */
  teamCollaboration: img("photo-1522071820081-009f0129c71c", 1200),
  /** Contact — advisor support */
  supportAdvisor: img("photo-1551836022-d5d88e9218df", 1200),
  /** Jobs hero — workers on site */
  jobsHero: img("photo-1541339907198-e08756dedf6f", 2400),

  /** Testimonial portraits */
  portraitDavid: img("photo-1519085360753-af0119f7cbe7", 400),
  portraitGrace: img("photo-1531123897727-8f129e168dce", 400),
  portraitPeter: img("photo-1506794778202-cad84cf45f1d", 400),
  portraitEmmanuel: img("photo-1507003211169-0a1dd7228f2d", 400),
  portraitGraceCv: img("photo-1594744803329-e58b31f8ad67", 400),
  portraitDavidCv: img("photo-1500648767791-00dcc994a43e", 400),

  /** Service cards */
  serviceJobs: img("photo-1553413077-190dd305871c", 800),
  serviceVisa: img("photo-1450101499163-fcb2d60825e9", 800),
  serviceRecruitment: img("photo-1531482615713-2afd69097998", 800),

  /** How-it-works steps */
  stepApply: img("photo-1560250097-0b93528c311a", 300),
  stepMatch: img("photo-1628519586619-6b063bf55698", 300),
  stepJourney: img("photo-1488646953014-85cb44e25828", 300),
} as const

/** Sector photos — workers in context (mixed ethnicities where available) */
export const sectors = {
  Agriculture: img("photo-1620423768707-c5a002fd7538", 900),
  Warehouse: img("photo-1553413077-190dd305871c", 900),
  "Food Production": img("photo-1601050690597-df0568f70950", 900),
  Construction: img("photo-1541339907198-e08756dedf6f", 900),
  Manufacturing: img("photo-1486262715619-67b85e0b08d3", 900),
  Hospitality: img("photo-1559339352-11d035aa65de", 900),
  Healthcare: img("photo-1576765608535-5f04a1d3f289", 900),
  Transport: img("photo-1601584114707-776984275783", 900),
  "Childcare & Domestic": img("photo-1581578731548-c64695cc6952", 900),
  Services: img("photo-1581578731548-c64695cc6952", 900),
} as const

/** Country cards — workers in relevant sectors, not empty landscapes */
export const countries = {
  Poland: img("photo-1553413077-190dd305871c", 900),
  Romania: img("photo-1620423768707-c5a002fd7538", 900),
  Hungary: img("photo-1486262715619-67b85e0b08d3", 900),
  Lithuania: img("photo-1600880292203-75762bf6380b", 900),
  Latvia: img("photo-1586528116311-ad8dd3c8310d", 900),
  "United Kingdom": img("photo-1464226184884-fa280b87c399", 900),
  Canada: img("photo-1541339907198-e08756dedf6f", 900),
} as const

export type SectorKey = keyof typeof sectors

export function imageForJobType(type: string): string {
  return sectors[type as SectorKey] ?? sectors.Warehouse
}

export function countryImage(name: string): string {
  return countries[name as keyof typeof countries] ?? sectors.Warehouse
}

/** Homepage people gallery strip */
export const gallery = [
  {
    src: img("photo-1519085360753-af0119f7cbe7", 600),
    alt: "African professional ready for work abroad",
    caption: "Pre-screened candidates",
  },
  {
    src: img("photo-1531123897727-8f129e168dce", 600),
    alt: "Professional woman from Africa pursuing international career",
    caption: "European-format CVs",
  },
  {
    src: img("photo-1553413077-190dd305871c", 600),
    alt: "Warehouse worker in safety gear",
    caption: "Warehouse & logistics",
  },
  {
    src: img("photo-1620423768707-c5a002fd7538", 600),
    alt: "Agricultural workers in the field",
    caption: "Agriculture & food",
  },
] as const
