import { z } from "zod"

export const CONTACT_SUBJECTS = [
  { value: "general", label: "General question" },
  { value: "existing_case", label: "About an assessment I already submitted" },
  { value: "services", label: "Question about your services" },
  { value: "other", label: "Something else" },
] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .max(25)
    .refine((v) => v === "" || (/^\+?[0-9 ()-]{7,25}$/.test(v) && v.replace(/\D/g, "").length >= 7), "Enter a valid phone number, or leave it blank"),
  subject: z.enum(CONTACT_SUBJECTS.map((s) => s.value) as [string, ...string[]], { errorMap: () => ({ message: "Choose a subject" }) }),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(3000, "Please keep your message under 3,000 characters"),
  consentPrivacy: z.literal(true, { errorMap: () => ({ message: "Please give consent so we can reply to you" }) }),
  /** Honeypot: must stay empty. */
  website: z.string().max(200),
})

/** Form state on the client; the schema above is the authority on what is valid. */
export type ContactValues = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  consentPrivacy: boolean
  website: string
}

export const defaultContactValues: ContactValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consentPrivacy: false,
  website: "",
}

export function validateContact(values: ContactValues): Record<string, string> {
  const result = contactSchema.safeParse(values)
  if (result.success) return {}
  const errors: Record<string, string> = {}
  for (const issue of result.error.issues) errors[String(issue.path[0] ?? "_")] ??= issue.message
  return errors
}
