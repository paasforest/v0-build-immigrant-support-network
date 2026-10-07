"use client"

import { useId, type ReactNode } from "react"
import { Paperclip, X } from "lucide-react"
import type { Option } from "@/lib/visa-assessment/options"
import { ACCEPTED_UPLOAD_EXTENSIONS, ACCEPTED_UPLOAD_TYPES, MAX_UPLOAD_BYTES } from "@/lib/visa-assessment/schema"

export const inputClass =
  "mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-[#0a0a0a] placeholder:text-neutral-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 aria-[invalid=true]:border-red-500"
const labelClass = "block text-sm font-medium text-[#0a0a0a]"
const helpClass = "mt-1 text-xs text-neutral-500"

export function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-1 text-sm text-red-600" role="alert">
      {message}
    </p>
  ) : null
}

type BaseProps = { label: ReactNode; error?: string; help?: ReactNode; optional?: boolean }

function useIds() {
  const id = useId()
  return { id, errorId: `${id}-error`, helpId: `${id}-help` }
}

function describedBy(ids: { errorId: string; helpId: string }, error?: string, help?: ReactNode) {
  return [error ? ids.errorId : null, help ? ids.helpId : null].filter(Boolean).join(" ") || undefined
}

function LabelText({ label, optional }: { label: ReactNode; optional?: boolean }) {
  return (
    <>
      {label}
      {optional ? <span className="ml-1 font-normal text-neutral-500">(optional)</span> : null}
    </>
  )
}

export function TextField({
  label, error, help, optional, value, onChange, type = "text", placeholder, autoComplete, inputMode, maxLength,
}: BaseProps & {
  value: string
  onChange: (v: string) => void
  type?: "text" | "email" | "tel" | "date" | "number"
  placeholder?: string
  autoComplete?: string
  inputMode?: "text" | "email" | "tel" | "numeric"
  maxLength?: number
}) {
  const ids = useIds()
  return (
    <div>
      <label htmlFor={ids.id} className={labelClass}>
        <LabelText label={label} optional={optional} />
      </label>
      <input
        id={ids.id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(ids, error, help)}
        className={inputClass}
      />
      {help ? <p id={ids.helpId} className={helpClass}>{help}</p> : null}
      <FieldError id={ids.errorId} message={error} />
    </div>
  )
}

export function TextAreaField({
  label, error, help, optional, value, onChange, rows = 4, placeholder, maxLength = 2000,
}: BaseProps & { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; maxLength?: number }) {
  const ids = useIds()
  return (
    <div>
      <label htmlFor={ids.id} className={labelClass}>
        <LabelText label={label} optional={optional} />
      </label>
      <textarea
        id={ids.id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(ids, error, help)}
        className={inputClass}
      />
      {help ? <p id={ids.helpId} className={helpClass}>{help}</p> : null}
      <FieldError id={ids.errorId} message={error} />
    </div>
  )
}

export function SelectField({
  label, error, help, optional, value, onChange, options, placeholder = "Select…",
}: BaseProps & { value: string; onChange: (v: string) => void; options: readonly (Option | string)[]; placeholder?: string }) {
  const ids = useIds()
  return (
    <div>
      <label htmlFor={ids.id} className={labelClass}>
        <LabelText label={label} optional={optional} />
      </label>
      <select
        id={ids.id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(ids, error, help)}
        className={inputClass}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => {
          const opt = typeof o === "string" ? { value: o, label: o } : o
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        })}
      </select>
      {help ? <p id={ids.helpId} className={helpClass}>{help}</p> : null}
      <FieldError id={ids.errorId} message={error} />
    </div>
  )
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

/** Month + year selects producing "YYYY-MM" (native type="month" is unsupported in desktop Safari/Firefox). */
export function MonthYearField({
  label, error, help, optional, value, onChange, yearFrom, yearTo, disabled,
}: BaseProps & { value: string; onChange: (v: string) => void; yearFrom: number; yearTo: number; disabled?: boolean }) {
  const ids = useIds()
  const [year, month] = value ? value.split("-") : ["", ""]
  const years: number[] = []
  if (yearFrom <= yearTo) for (let y = yearFrom; y <= yearTo; y++) years.push(y)
  else for (let y = yearFrom; y >= yearTo; y--) years.push(y)
  const update = (y: string, m: string) => onChange(y && m ? `${y}-${m}` : y || m ? `${y}-${m}` : "")
  return (
    <fieldset aria-describedby={describedBy(ids, error, help)}>
      <legend className={labelClass}>
        <LabelText label={label} optional={optional} />
      </legend>
      <div className="mt-1 grid grid-cols-2 gap-3">
        <select
          aria-label="Month"
          value={month ?? ""}
          disabled={disabled}
          onChange={(e) => update(year ?? "", e.target.value)}
          aria-invalid={error ? true : undefined}
          className={`${inputClass} mt-0 disabled:opacity-50`}
        >
          <option value="">Month</option>
          {MONTHS.map((m, i) => (
            <option key={m} value={String(i + 1).padStart(2, "0")}>
              {m}
            </option>
          ))}
        </select>
        <select
          aria-label="Year"
          value={year ?? ""}
          disabled={disabled}
          onChange={(e) => update(e.target.value, month ?? "")}
          aria-invalid={error ? true : undefined}
          className={`${inputClass} mt-0 disabled:opacity-50`}
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </div>
      {help ? <p id={ids.helpId} className={helpClass}>{help}</p> : null}
      <FieldError id={ids.errorId} message={error} />
    </fieldset>
  )
}

const cardBase = "flex min-h-[48px] cursor-pointer gap-3 rounded-lg border-2 px-4 py-3 transition-colors"
const cardOn = "border-[#C9A84C] bg-[#C9A84C]/12 ring-1 ring-[#C9A84C]/35"
const cardOff = "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"
const controlClass = "mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#C9A84C]"

export function RadioCards({
  label, error, help, value, onChange, options, columns = 1, name,
}: BaseProps & { value: string; onChange: (v: string) => void; options: readonly Option[]; columns?: 1 | 2; name: string }) {
  const ids = useIds()
  return (
    <fieldset aria-describedby={describedBy(ids, error, help)} aria-invalid={error ? true : undefined}>
      <legend className={labelClass}>{label}</legend>
      {help ? <p id={ids.helpId} className={helpClass}>{help}</p> : null}
      <div className={`mt-2 grid gap-2 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
        {options.map((opt) => {
          const selected = value === opt.value
          return (
            <label key={opt.value} className={`${cardBase} ${selected ? cardOn : cardOff}`}>
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className={controlClass}
              />
              <span className="text-sm leading-snug text-[#0a0a0a]">
                <span className={selected ? "font-semibold" : "font-medium"}>{opt.label}</span>
                {opt.hint ? <span className="mt-0.5 block text-xs font-normal text-neutral-500">{opt.hint}</span> : null}
              </span>
            </label>
          )
        })}
      </div>
      <FieldError id={ids.errorId} message={error} />
    </fieldset>
  )
}

export function CheckboxCards({
  label, error, help, values: selected, onChange, options, columns = 2,
}: BaseProps & { values: string[]; onChange: (v: string[]) => void; options: readonly Option[]; columns?: 1 | 2 }) {
  const ids = useIds()
  return (
    <fieldset aria-describedby={describedBy(ids, error, help)} aria-invalid={error ? true : undefined}>
      <legend className={labelClass}>{label}</legend>
      {help ? <p id={ids.helpId} className={helpClass}>{help}</p> : null}
      <div className={`mt-2 grid gap-2 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
        {options.map((opt) => {
          const checked = selected.includes(opt.value)
          return (
            <label key={opt.value} className={`${cardBase} ${checked ? cardOn : cardOff}`}>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) =>
                  onChange(e.target.checked ? [...selected, opt.value] : selected.filter((v) => v !== opt.value))
                }
                className={controlClass}
              />
              <span className={`text-sm leading-snug text-[#0a0a0a] ${checked ? "font-semibold" : "font-medium"}`}>
                {opt.label}
              </span>
            </label>
          )
        })}
      </div>
      <FieldError id={ids.errorId} message={error} />
    </fieldset>
  )
}

export function CheckboxField({
  label, error, checked, onChange,
}: { label: ReactNode; error?: string; checked: boolean; onChange: (v: boolean) => void }) {
  const ids = useIds()
  return (
    <div>
      <label htmlFor={ids.id} className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 p-4">
        <input
          id={ids.id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? ids.errorId : undefined}
          className={controlClass}
        />
        <span className="text-sm leading-relaxed text-[#0a0a0a]">{label}</span>
      </label>
      <FieldError id={ids.errorId} message={error} />
    </div>
  )
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

/** Checks a file in the browser before upload; the server re-checks the actual content. */
export function checkFileClientSide(file: File): string | null {
  if (file.size === 0) return "This file is empty."
  if (file.size > MAX_UPLOAD_BYTES) return `This file is ${formatBytes(file.size)}. The maximum is 4 MB. Send a smaller copy, or we can request it after reviewing your case.`
  const okType = (ACCEPTED_UPLOAD_TYPES as readonly string[]).includes(file.type)
  const okExt = /\.(pdf|jpe?g|png)$/i.test(file.name)
  if (!okType && !okExt) return "Only PDF, JPG and PNG files can be uploaded."
  return null
}

export function FileField({
  label, help, error, file, onChange,
}: { label: ReactNode; help?: ReactNode; error?: string; file: File | null; onChange: (f: File | null, problem: string | null) => void }) {
  const ids = useIds()
  return (
    <div>
      <span className={labelClass} id={`${ids.id}-label`}>
        {label}
      </span>
      {help ? <p id={ids.helpId} className={helpClass}>{help}</p> : null}
      {file ? (
        <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-green-600/40 bg-green-50 px-4 py-3">
          <span className="flex min-w-0 items-center gap-2 text-sm text-[#0a0a0a]">
            <Paperclip className="h-4 w-4 shrink-0 text-green-700" aria-hidden />
            <span className="truncate">{file.name}</span>
            <span className="shrink-0 text-neutral-500">({formatBytes(file.size)})</span>
          </span>
          <button
            type="button"
            onClick={() => onChange(null, null)}
            className="flex shrink-0 items-center gap-1 rounded px-2 py-1 text-sm text-neutral-700 hover:bg-neutral-200"
          >
            <X className="h-4 w-4" aria-hidden /> Remove
          </button>
        </div>
      ) : (
        <input
          id={ids.id}
          type="file"
          accept={`${ACCEPTED_UPLOAD_EXTENSIONS},${ACCEPTED_UPLOAD_TYPES.join(",")}`}
          aria-labelledby={`${ids.id}-label`}
          aria-describedby={describedBy(ids, error, help)}
          aria-invalid={error ? true : undefined}
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null
            e.target.value = ""
            if (!f) return onChange(null, null)
            const problem = checkFileClientSide(f)
            onChange(problem ? null : f, problem)
          }}
          className={`${inputClass} file:mr-3 file:rounded file:border-0 file:bg-gold/20 file:px-3 file:py-1.5 file:text-sm file:font-medium`}
        />
      )}
      <p className={helpClass}>PDF, JPG or PNG, up to 4 MB in total. Please do not upload passport scans or bank statements at this stage.</p>
      <FieldError id={ids.errorId} message={error} />
    </div>
  )
}
