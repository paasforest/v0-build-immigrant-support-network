"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2 } from "lucide-react"
import { CheckboxField, SelectField, TextAreaField, TextField } from "@/components/visa-assessment/fields"
import { CONTACT_SUBJECTS, defaultContactValues, validateContact, type ContactValues } from "@/lib/contact/schema"
import { siteConfig, whatsappLink } from "@/lib/site-config"

export default function ContactForm() {
  const [v, setValues] = useState<ContactValues>(defaultContactValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)

  const set = <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(({ [key]: _removed, ...rest }) => rest)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const found = validateContact(v)
    if (Object.keys(found).length) {
      setErrors(found)
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      })
      const data = (await res.json().catch(() => ({}))) as { reference?: string; error?: string; fieldErrors?: Record<string, string> }
      if (res.status === 201 && data.reference) {
        setReference(data.reference)
        return
      }
      if (data.fieldErrors) setErrors(data.fieldErrors)
      setSubmitError(data.error ?? "We could not send your message. It has not been delivered. Please try again.")
    } catch {
      setSubmitError("We could not reach our server, so your message has not been sent. Check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (reference) {
    return (
      <div className="rounded-xl border border-neutral-200/80 bg-white p-8 text-center shadow-sm" role="status" aria-live="polite">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" aria-hidden="true" />
        <h2 className="mt-4 font-serif text-2xl font-bold text-neutral-900">Message received</h2>
        <p className="mt-2 text-neutral-700">
          Thank you. Your message has been received and we will reply by email. Your reference is{" "}
          <span className="font-mono font-semibold" data-testid="contact-reference">{reference}</span>.
        </p>
        <p className="mt-4 text-sm text-neutral-600">
          If you need help with a specific visa case, the{" "}
          <Link href="/visa-assessment" className="font-semibold text-[#8a6d1f] underline">
            visa assessment
          </Link>{" "}
          lets you give us the details we need.
        </p>
        <button
          type="button"
          onClick={() => {
            setReference(null)
            setValues(defaultContactValues)
          }}
          className="mt-6 text-sm font-semibold text-[#8a6d1f] underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-xl border border-neutral-200/80 bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-2 font-serif text-2xl font-bold text-neutral-900">Send us a message</h2>
      <p className="mb-6 text-sm text-neutral-600">
        For general questions. To have a visa case reviewed, please use the{" "}
        <Link href="/visa-assessment" className="font-semibold text-[#8a6d1f] underline">
          visa assessment
        </Link>{" "}
        instead. Please do not send passport numbers, documents or portal passwords here.
      </p>
      <div className="space-y-5">
        <TextField label="Your name" autoComplete="name" value={v.name} onChange={(val) => set("name", val)} error={errors.name} />
        <TextField type="email" label="Email address" autoComplete="email" inputMode="email" value={v.email} onChange={(val) => set("email", val)} error={errors.email} />
        <TextField type="tel" label="Phone / WhatsApp" optional autoComplete="tel" inputMode="tel" value={v.phone} onChange={(val) => set("phone", val)} error={errors.phone} />
        <SelectField label="Subject" value={v.subject} onChange={(val) => set("subject", val)} options={CONTACT_SUBJECTS} error={errors.subject} />
        <TextAreaField label="Message" rows={5} maxLength={3000} value={v.message} onChange={(val) => set("message", val)} error={errors.message} />
        <CheckboxField
          label={
            <>
              I consent to {siteConfig.name} storing this message and my contact details to reply to me, as described in the{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
              .
            </>
          }
          checked={v.consentPrivacy}
          onChange={(val) => set("consentPrivacy", val)}
          error={errors.consentPrivacy}
        />
        {/* Honeypot: hidden from people and assistive technology. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website", e.target.value)} />
          </label>
        </div>

        {submitError ? (
          <div role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900">
            {submitError} You can also{" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              message us on WhatsApp
            </a>{" "}
            or email <a href={`mailto:${siteConfig.email}`} className="font-semibold underline">{siteConfig.email}</a>.
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-4 font-semibold text-[#0a0a0a] transition-all duration-300 hover:bg-gold-light disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </form>
  )
}
