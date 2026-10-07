/**
 * Single source of truth for ISN's visa services and destinations.
 * Used by the navigation, footer, hub pages, sitemap and the visa assessment form.
 */

export type ServiceLink = {
  slug: string
  href: string
  label: string
  short: string
}

/** Help with a new application, by purpose of travel. */
export const applicationServices: ServiceLink[] = [
  {
    slug: "visitor",
    href: "/visa-services/visitor",
    label: "Visitor & tourist visas",
    short: "Holidays, short trips and sightseeing",
  },
  {
    slug: "business",
    href: "/visa-services/business",
    label: "Business visas",
    short: "Meetings, conferences and business trips",
  },
  {
    slug: "family-visit",
    href: "/visa-services/family-visit",
    label: "Family visit visas",
    short: "Visiting relatives or friends abroad",
  },
  {
    slug: "study",
    href: "/visa-services/study",
    label: "Study visas",
    short: "Applicants with an offer from a school or university",
  },
  {
    slug: "work-visa",
    href: "/visa-services/work-visa",
    label: "Work visa document assistance",
    short: "Only if you already have a genuine job offer",
  },
]

/** Visa problem solving: a core part of ISN's work. */
export const problemServices: ServiceLink[] = [
  {
    slug: "refusal",
    href: "/visa-services/refusal",
    label: "Visa refusal assessment",
    short: "Understand why a visa was refused and your options",
  },
  {
    slug: "re-application",
    href: "/visa-services/re-application",
    label: "Re-application after refusal",
    short: "Prepare a stronger application next time",
  },
  {
    slug: "additional-documents",
    href: "/visa-services/additional-documents",
    label: "Additional document requests",
    short: "Respond when the embassy asks for more",
  },
  {
    slug: "verification",
    href: "/visa-services/verification",
    label: "Verification issues",
    short: "When documents or details are being verified",
  },
]

export const destinations = [
  {
    slug: "schengen",
    href: "/destinations/schengen",
    label: "Schengen / Europe",
    short: "Short-stay visas for the Schengen area",
  },
  {
    slug: "uk",
    href: "/destinations/uk",
    label: "United Kingdom",
    short: "UK visitor and other visas",
  },
  {
    slug: "usa",
    href: "/destinations/usa",
    label: "United States",
    short: "US visitor (B1/B2) and other visas",
  },
  {
    slug: "canada",
    href: "/destinations/canada",
    label: "Canada",
    short: "Canadian visitor visas and other permits",
  },
] as const
