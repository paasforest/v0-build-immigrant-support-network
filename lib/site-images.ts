/**
 * Stock photography (Unsplash) used for page backgrounds.
 * These are illustrative images only. They must never be presented as real clients,
 * staff or testimonials.
 */
export function img(id: string, width = 900): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`
}

export const people = {
  /** Person preparing travel / visa documents */
  visaJourney: img("photo-1655313893399-e9d607e1d84c", 1600),
  /** Person on a phone / laptop: used for contact and support pages */
  supportAdvisor: img("photo-1531123897727-8f129e168dce", 1600),
  /** Small group in conversation: used for general page backgrounds */
  community: img("photo-1509099896299-af46ad97ff57", 1600),
} as const
