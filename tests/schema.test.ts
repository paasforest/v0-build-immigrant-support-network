import { describe, expect, it } from "vitest"
import { uploadSlotsFor, validateSteps, visaAssessmentSchema } from "@/lib/visa-assessment/schema"
import { pruneAnswers } from "@/lib/visa-assessment/prune"
import { refusalCase } from "./fixtures"

const issues = (v: unknown) => {
  const r = visaAssessmentSchema.safeParse(v)
  return r.success ? {} : Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]))
}

describe("visa assessment schema", () => {
  it("accepts a complete refusal case", () => {
    expect(issues(refusalCase())).toEqual({})
  })

  it("requires a case type and a destination", () => {
    const e = issues(refusalCase({ caseType: "", destination: "" }))
    expect(e.caseType).toBeDefined()
    expect(e.destination).toBeDefined()
  })

  it("requires the Schengen country to be a real European destination", () => {
    expect(issues(refusalCase({ europeCountry: "Brazil" })).europeCountry).toBeDefined()
    expect(issues(refusalCase({ europeCountry: "Ireland" })).europeCountry).toBeUndefined()
  })

  it("blocks work visa assistance without a genuine job offer", () => {
    const e = issues(refusalCase({ visaType: "work_job_offer", hasJobOffer: "no" }))
    expect(e.hasJobOffer).toMatch(/genuine job offer/)
  })

  it("requires employer details when a job offer exists", () => {
    const e = issues(refusalCase({ visaType: "work_job_offer", hasJobOffer: "yes" }))
    expect(e.employerName).toBeDefined()
    expect(e.employerCountry).toBeDefined()
  })

  it("requires the three consents", () => {
    const e = issues(refusalCase({ consentAccuracy: false, consentPrivacy: false, consentNoGuarantee: false }))
    expect(Object.keys(e)).toEqual(expect.arrayContaining(["consentAccuracy", "consentPrivacy", "consentNoGuarantee"]))
  })

  it("rejects a refusal date in the future", () => {
    expect(issues(refusalCase({ refusalDate: "2099-01" })).refusalDate).toBeDefined()
  })

  it("requires re-application change questions only for re-applications", () => {
    const e = issues(refusalCase({ caseType: "reapplication" }))
    expect(e.changesSince).toBeDefined()
    expect(e.whatHappened).toBeUndefined()
  })

  it("rejects an invalid phone number and email", () => {
    const e = issues(refusalCase({ phone: "abc", email: "nope" }))
    expect(e.phone).toBeDefined()
    expect(e.email).toBeDefined()
  })

  it("has no field for passwords, passport numbers or ID numbers", () => {
    const keys = Object.keys(visaAssessmentSchema._def.schema.shape).join(" ").toLowerCase()
    expect(keys).not.toMatch(/password|passportnumber|idnumber|bankstatement/)
  })

  it("returns only errors that belong to the requested steps", () => {
    const e = validateSteps(refusalCase({ caseType: "", fullName: "" }), [0])
    expect(Object.keys(e)).toEqual(["caseType"])
  })
})

describe("uploadSlotsFor", () => {
  it("offers the refusal letter slot only when the customer has the letter", () => {
    expect(uploadSlotsFor(refusalCase()).map((s) => s.slot)).toEqual(["caseDocument"])
    expect(uploadSlotsFor(refusalCase({ hasRefusalLetter: "no" }))).toEqual([])
  })

  it("never offers an upload for a general assessment", () => {
    expect(uploadSlotsFor(refusalCase({ caseType: "general_assessment", hasRefusalLetter: "yes" }))).toEqual([])
  })
})

describe("pruneAnswers", () => {
  it("drops answers from branches the customer did not take", () => {
    const pruned = pruneAnswers(
      refusalCase({ generalDescription: "left over", applicationCentre: "vfs", employerName: "Old Co", website: "x" })
    )
    expect(pruned).not.toHaveProperty("generalDescription")
    expect(pruned).not.toHaveProperty("applicationCentre")
    expect(pruned).not.toHaveProperty("employerName")
    expect(pruned).not.toHaveProperty("website")
    expect(pruned).not.toHaveProperty("consentAccuracy")
    expect(pruned.refusalReason).toBe("Purpose of stay not justified")
    expect(pruned.europeCountry).toBe("France")
  })
})
