'use client'

import { useState } from 'react'

const returGrunner = [
  'Varen er ikke som forventet',
  'Feil størrelse eller variant',
  'Mottok feil produkt',
  'Varen er skadet eller defekt',
  'Bestilte ved en feil',
  'Annet',
]

export function ReturnForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    navn: '',
    epost: '',
    tlf: '',
    ordrenr: '',
    grunn: '',
    kommentar: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 px-8 py-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-heading text-xl font-bold text-primary">
          Returskjema mottatt
        </p>
        <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
          Vi har mottatt din returforespørsel og kontakter deg innen 2 virkedager
          med videre instruksjoner.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-xl border border-border bg-card px-4 py-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors duration-150'
  const labelClass = 'block font-sans text-sm font-semibold text-foreground mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="navn" className={labelClass}>
            Navn <span className="text-primary">*</span>
          </label>
          <input
            id="navn"
            name="navn"
            type="text"
            required
            placeholder="Ditt fulle navn"
            value={form.navn}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="epost" className={labelClass}>
            E-post <span className="text-primary">*</span>
          </label>
          <input
            id="epost"
            name="epost"
            type="email"
            required
            placeholder="din@epost.no"
            value={form.epost}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tlf" className={labelClass}>
            Telefon
          </label>
          <input
            id="tlf"
            name="tlf"
            type="tel"
            placeholder="+47 000 00 000"
            value={form.tlf}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ordrenr" className={labelClass}>
            Ordrenummer <span className="text-primary">*</span>
          </label>
          <input
            id="ordrenr"
            name="ordrenr"
            type="text"
            required
            placeholder="F.eks. #1234"
            value={form.ordrenr}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="grunn" className={labelClass}>
          Grunn til retur <span className="text-primary">*</span>
        </label>
        <select
          id="grunn"
          name="grunn"
          required
          value={form.grunn}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="" disabled>
            Velg en grunn...
          </option>
          {returGrunner.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="kommentar" className={labelClass}>
          Kommentar
        </label>
        <textarea
          id="kommentar"
          name="kommentar"
          rows={4}
          placeholder="Beskriv gjerne nærmere hva som gikk galt eller hva du ønsker..."
          value={form.kommentar}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3.5 font-sans text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60"
      >
        {loading ? 'Sender...' : 'Send returskjema'}
      </button>
    </form>
  )
}
