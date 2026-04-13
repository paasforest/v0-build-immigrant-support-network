import type { ApplyCandidateFormValues } from "./apply-candidate-schema"

function joinArr(a: string[]) {
  return a.length ? a.join(", ") : "N/A"
}

const countryLabels: Record<string, string> = {
  poland: "Poland",
  romania: "Romania",
  hungary: "Hungary",
  ireland: "Ireland",
  canada: "Canada",
  open: "Open to any destination",
}

function formatCountries(ids: string[]) {
  return ids.length ? ids.map((id) => countryLabels[id] ?? id).join(", ") : "N/A"
}

const finLabels: Record<string, string> = {
  yes_ready: "Yes — I am financially ready",
  need_guidance: "No — I need guidance on costs",
  more_info: "I need more information first",
}

export function buildApplyEmailMessage(formData: ApplyCandidateFormValues): string {
  return `
================================================
ISN CANDIDATE APPLICATION
================================================

--- PERSONAL DETAILS ---
Full Name: ${formData.fullName}
Country of Residence: ${formData.country}
Nationality: ${formData.nationality}
Phone/WhatsApp: ${formData.phone}
Email: ${formData.email}
Age: ${formData.age}

--- PASSPORT & TRAVEL ---
Has Valid Passport: ${formData.hasPassport}
Passport photo upload (filename): ${formData.passportPhotoName || "N/A"}
Passport Timeline (if no passport): ${formData.passportTimeline || "N/A"}
Travel Availability: ${formData.travelAvailability}
Willing to Work (shifts): ${joinArr(formData.shiftPreferences)}
Worked Abroad Before: ${formData.workedAbroad}
Previous Country/Work: ${formData.previousWorkDetails || "N/A"}

--- SKILLS & EXPERIENCE ---
Job Category: ${formData.jobCategory}
Years Experience: ${formData.yearsExperience}
Structured Environment: ${formData.structuredEnvironment}
Experience Description: ${formData.experienceDescription}

--- CERTIFICATIONS ---
Has Certifications: ${formData.hasCertifications}
Certification Type: ${formData.certificationDescription || "N/A"}
Certificate upload (filename): ${formData.certificateFileName || "N/A"}
Licence Code: ${formData.licenceCode || "N/A"}
Driving Years: ${formData.drivingYears || "N/A"}
Has PDP: ${formData.hasPdp || "N/A"}
International Driving: ${formData.internationalDriving || "N/A"}
Countries driven (intl): ${formData.internationalDrivingCountries || "N/A"}
Long Distance Routes: ${formData.longDistance || "N/A"}
Long Distance Details: ${formData.longDistanceDetails || "N/A"}

--- DOCUMENTS ---
CV Filename (uploaded): ${formData.cvFileName || "NOT PROVIDED"}
Police Clearance: ${formData.policeClearance}
Medical Clearance: ${formData.medicalClearance}

--- FINANCIAL READINESS ---
Financial Status: ${finLabels[formData.financialReady] ?? formData.financialReady}

--- DESTINATION ---
Preferred Countries: ${formatCountries(formData.preferredCountries)}
Start Timeline: ${formData.startTimeline}

--- BACKGROUND ---
Previous Visa Denial: ${formData.visaDenied}
Visa Denial Details: ${formData.visaDenialDetails || "N/A"}
Referred: ${formData.referred}
Referrer Name: ${formData.referrerName || "N/A"}
Referrer Phone: ${formData.referrerPhone || "N/A"}

--- MOTIVATION ---
Why Work Abroad:
${formData.whyAbroad}

================================================
`
}
