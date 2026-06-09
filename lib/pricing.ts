/** Approximate ZAR→USD rate for display only. Payment is always in ZAR via EFT. */
const ZAR_USD_RATE = 18

export const REGISTRATION_FEE_ZAR = 550

export const CV_PACKAGES = [
  {
    id: "basic",
    name: "Basic CV",
    priceZar: 800,
    originalPriceZar: 1100,
    description: "European format CV only",
    features: [
      "European format CV",
      "Professional layout",
      "1 revision included",
      "PDF & Word formats",
      "Delivered in 3-5 days",
    ],
    popular: false,
  },
  {
    id: "professional",
    name: "CV + Cover Letter",
    priceZar: 950,
    originalPriceZar: 1300,
    description: "Best for serious applicants",
    features: [
      "European format CV",
      "Premium professional layout",
      "Custom cover letter",
      "Unlimited revisions",
      "PDF & Word formats",
      "LinkedIn optimization tips",
      "Delivered in 2-3 days",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Complete Package",
    priceZar: 1100,
    originalPriceZar: 1500,
    description: "CV + Cover Letter + LinkedIn",
    features: [
      "European format CV",
      "Executive-level design",
      "Custom cover letter",
      "LinkedIn profile rewrite",
      "Unlimited revisions",
      "PDF & Word formats",
      "Interview preparation guide",
      "Delivered in 24-48 hours",
      "1-on-1 consultation call",
      "90-day support",
    ],
    popular: false,
  },
] as const

export const CV_FROM_ZAR = CV_PACKAGES[0].priceZar

export function zarToUsd(zar: number): number {
  return Math.round(zar / ZAR_USD_RATE)
}

export function formatZar(zar: number): string {
  return `R${zar.toLocaleString("en-ZA")}`
}

export function formatZarWithUsd(zar: number): string {
  return `${formatZar(zar)} (~$${zarToUsd(zar)} USD)`
}

export function formatUsdNote(zar: number): string {
  return `~$${zarToUsd(zar)} USD`
}
