import { z } from "zod"

/** Values collected across all 9 steps — synced with CandidateApplicationForm */
export const defaultApplyValues = {
  fullName: "",
  country: "",
  nationality: "",
  phone: "",
  email: "",
  age: "" as number | "",

  hasPassport: "" as "yes" | "no" | "",
  passportPhotoName: "",
  passportTimeline: "",
  travelAvailability: "" as string,
  shiftPreferences: [] as string[],
  workedAbroad: "" as "yes" | "no" | "",
  previousWorkDetails: "",

  jobCategory: "",
  yearsExperience: "",
  structuredEnvironment: "" as "yes" | "no" | "",
  experienceDescription: "",

  hasCertifications: "" as "yes" | "no" | "",
  certificationDescription: "",
  certificateFileName: "",
  licenceCode: "",
  drivingYears: "",
  hasPdp: "",
  internationalDriving: "" as "yes" | "no" | "",
  internationalDrivingCountries: "",
  longDistance: "" as "yes" | "no" | "",
  longDistanceDetails: "",

  cvFileName: "",
  policeClearance: "",
  medicalClearance: "",

  financialReady: "",

  preferredCountries: [] as string[],
  startTimeline: "",

  visaDenied: "" as "yes" | "no" | "",
  visaDenialDetails: "",
  referred: "" as "yes" | "no" | "",
  referrerName: "",
  referrerPhone: "",

  commitmentAccepted: false,
  whyAbroad: "",
}

export type ApplyCandidateFormValues = typeof defaultApplyValues

const passportTimelineEnum = z.enum(["within_1_month", "1_3_months", "3_6_months", "not_sure"])

export const step0Personal = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  country: z.string().min(2, "Enter country of residence"),
  nationality: z.string().min(2, "Enter nationality"),
  phone: z.string().min(8, "Enter a valid phone / WhatsApp"),
  email: z.string().email("Enter a valid email"),
  age: z.preprocess(
    (val) => {
      if (val === "" || val === undefined || val === null) return undefined
      const n = typeof val === "number" ? val : Number(val)
      return Number.isNaN(n) ? undefined : n
    },
    z.number({ message: "Enter your age" }).min(18, "Minimum age is 18").max(60, "Maximum age is 60")
  ),
})

export const step1Passport = z
  .object({
    hasPassport: z.enum(["yes", "no"], { message: "Select an option" }),
    passportPhotoName: z.string().optional(),
    passportTimeline: z.string().optional(),
    travelAvailability: z.enum(["immediately", "1_3_months", "3_6_months"], { message: "Select availability" }),
    shiftPreferences: z.array(z.string()).min(1, "Select at least one option"),
    workedAbroad: z.enum(["yes", "no"], { message: "Select an option" }),
    previousWorkDetails: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasPassport === "no") {
      const r = passportTimelineEnum.safeParse(data.passportTimeline)
      if (!r.success) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Select when you expect your passport", path: ["passportTimeline"] })
      }
    }
    if (data.workedAbroad === "yes" && (!data.previousWorkDetails || data.previousWorkDetails.trim().length < 4)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Briefly describe the country and work",
        path: ["previousWorkDetails"],
      })
    }
  })

export const step2Skills = z
  .object({
    jobCategory: z.string().min(1, "Select a job category"),
    yearsExperience: z.string().min(1, "Select years of experience"),
    structuredEnvironment: z.enum(["yes", "no"], { message: "Select an option" }),
    experienceDescription: z.string().min(80, "Write at least 80 characters about your experience"),
  })

const DRIVER_CAT = "Truck / Delivery Driver"

export const step3Certs = z
  .object({
    jobCategory: z.string().min(1),
    hasCertifications: z.enum(["yes", "no"], { message: "Select an option" }),
    certificationDescription: z.string().optional(),
    certificateFileName: z.string().optional(),
    licenceCode: z.string().optional(),
    drivingYears: z.string().optional(),
    hasPdp: z.string().optional(),
    internationalDriving: z.string().optional(),
    internationalDrivingCountries: z.string().optional(),
    longDistance: z.string().optional(),
    longDistanceDetails: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasCertifications === "yes") {
      if (!data.certificationDescription || data.certificationDescription.trim().length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Describe your certification or licence", path: ["certificationDescription"] })
      }
    }
    if (data.jobCategory === DRIVER_CAT) {
      if (!data.licenceCode) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Select licence code", path: ["licenceCode"] })
      if (!data.drivingYears) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Select driving experience", path: ["drivingYears"] })
      if (!data.hasPdp) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Select PDP status", path: ["hasPdp"] })
      if (data.internationalDriving !== "yes" && data.internationalDriving !== "no") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Select an option", path: ["internationalDriving"] })
      }
      if (data.internationalDriving === "yes" && (!data.internationalDrivingCountries || data.internationalDrivingCountries.trim().length < 2)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "List countries where you have driven",
          path: ["internationalDrivingCountries"],
        })
      }
      if (data.longDistance !== "yes" && data.longDistance !== "no") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Select an option", path: ["longDistance"] })
      }
      if (data.longDistance === "yes" && (!data.longDistanceDetails || data.longDistanceDetails.trim().length < 4)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Describe your long-distance experience", path: ["longDistanceDetails"] })
      }
    }
  })

export const step4Docs = z.object({
  cvFileName: z.string().min(1, "Upload your CV (PDF or Word)"),
  policeClearance: z.enum(["yes", "no", "in_progress"], { message: "Select an option" }),
  medicalClearance: z.enum(["yes", "no", "not_sure"], { message: "Select an option" }),
})

export const step5Financial = z.object({
  financialReady: z.enum(["yes_ready", "need_guidance", "more_info"], { message: "Select an option" }),
})

export const step6Destination = z.object({
  preferredCountries: z.array(z.string()).min(1, "Select at least one destination"),
  startTimeline: z.string().min(1, "Select when you want to start"),
})

export const step7Background = z
  .object({
    visaDenied: z.enum(["yes", "no"], { message: "Select an option" }),
    visaDenialDetails: z.string().optional(),
    referred: z.enum(["yes", "no"], { message: "Select an option" }),
    referrerName: z.string().optional(),
    referrerPhone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.visaDenied === "yes" && (!data.visaDenialDetails || data.visaDenialDetails.trim().length < 10)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Explain the denial briefly", path: ["visaDenialDetails"] })
    }
    if (data.referred === "yes") {
      if (!data.referrerName || data.referrerName.trim().length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Enter referrer full name", path: ["referrerName"] })
      }
      if (!data.referrerPhone || data.referrerPhone.trim().length < 8) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Enter referrer phone", path: ["referrerPhone"] })
      }
    }
  })

export const step8Commitment = z
  .object({
    commitmentAccepted: z.boolean(),
    whyAbroad: z.string().min(80, "Write at least 80 characters"),
  })
  .refine((d) => d.commitmentAccepted === true, {
    message: "You must confirm to submit",
    path: ["commitmentAccepted"],
  })

export function validateApplyStep(
  stepIndex: number,
  values: ApplyCandidateFormValues
): { ok: true } | { ok: false; fieldErrors: Record<string, string> } {
  const toErr = (e: z.ZodError): Record<string, string> => {
    const o: Record<string, string> = {}
    for (const iss of e.issues) {
      const p = iss.path.join(".") || "_root"
      if (!o[p]) o[p] = iss.message
    }
    return o
  }

  try {
    switch (stepIndex) {
      case 0:
        step0Personal.parse({
          fullName: values.fullName,
          country: values.country,
          nationality: values.nationality,
          phone: values.phone,
          email: values.email,
          age: values.age,
        })
        break
      case 1:
        step1Passport.parse({
          hasPassport: values.hasPassport,
          passportPhotoName: values.passportPhotoName,
          passportTimeline: values.passportTimeline,
          travelAvailability: values.travelAvailability,
          shiftPreferences: values.shiftPreferences,
          workedAbroad: values.workedAbroad,
          previousWorkDetails: values.previousWorkDetails,
        })
        break
      case 2:
        step2Skills.parse({
          jobCategory: values.jobCategory,
          yearsExperience: values.yearsExperience,
          structuredEnvironment: values.structuredEnvironment,
          experienceDescription: values.experienceDescription,
        })
        break
      case 3:
        step3Certs.parse({
          jobCategory: values.jobCategory,
          hasCertifications: values.hasCertifications,
          certificationDescription: values.certificationDescription,
          certificateFileName: values.certificateFileName,
          licenceCode: values.licenceCode,
          drivingYears: values.drivingYears,
          hasPdp: values.hasPdp,
          internationalDriving: values.internationalDriving,
          internationalDrivingCountries: values.internationalDrivingCountries,
          longDistance: values.longDistance,
          longDistanceDetails: values.longDistanceDetails,
        })
        break
      case 4:
        step4Docs.parse({
          cvFileName: values.cvFileName,
          policeClearance: values.policeClearance as "yes" | "no" | "in_progress",
          medicalClearance: values.medicalClearance as "yes" | "no" | "not_sure",
        })
        break
      case 5:
        step5Financial.parse({
          financialReady: values.financialReady as "yes_ready" | "need_guidance" | "more_info",
        })
        break
      case 6:
        step6Destination.parse({
          preferredCountries: values.preferredCountries,
          startTimeline: values.startTimeline,
        })
        break
      case 7:
        step7Background.parse({
          visaDenied: values.visaDenied,
          visaDenialDetails: values.visaDenialDetails,
          referred: values.referred,
          referrerName: values.referrerName,
          referrerPhone: values.referrerPhone,
        })
        break
      case 8:
        step8Commitment.parse({
          commitmentAccepted: values.commitmentAccepted,
          whyAbroad: values.whyAbroad,
        })
        break
      default:
        break
    }
    return { ok: true }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { ok: false, fieldErrors: toErr(err) }
    }
    throw err
  }
}
