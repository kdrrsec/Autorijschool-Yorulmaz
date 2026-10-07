'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { site } from '@/content/site'
import { ChevronDown } from 'lucide-react'
import { ArrowRight } from './Icons'

type Subject = 'aanmelden' | 'vraag'
type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'error'; message: string }
  | { kind: 'sent' }
  | { kind: 'sent-elsewhere'; via: string }
  | { kind: 'unavailable' }

/**
 * Contactformulier. Het bericht gaat via /api/aanmelden als e-mail naar de
 * rijschool. Is de e-mailkoppeling (nog) niet ingesteld, dan wordt het bericht
 * klaargezet in WhatsApp of in het e-mailprogramma van de bezoeker.
 */
export function ContactForm() {
  const id = useId()
  const [subject, setSubject] = useState<Subject>('aanmelden')
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const startedAt = useRef(0)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  function fallback(heading: string, body: string) {
    if (site.contact.whatsapp) {
      window.dispatchEvent(new Event('yorulmaz:lead'))
      setStatus({ kind: 'sent-elsewhere', via: 'WhatsApp' })
      window.location.href = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(body)}`
    } else if (site.contact.email) {
      window.dispatchEvent(new Event('yorulmaz:lead'))
      setStatus({ kind: 'sent-elsewhere', via: 'je e-mailprogramma' })
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(heading)}&body=${encodeURIComponent(body)}`
    } else {
      setStatus({ kind: 'unavailable' })
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status.kind === 'sending') return
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('naam') ?? '').trim()
    const phone = String(data.get('telefoon') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('bericht') ?? '').trim()
    const interest = String(data.get('interesse') ?? '').trim()

    if (!name) {
      setStatus({ kind: 'error', message: 'Vul je naam in.' })
      return
    }
    if (!phone && !email) {
      setStatus({ kind: 'error', message: 'Vul een telefoonnummer of e-mailadres in, zodat we je kunnen bereiken.' })
      return
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: 'error', message: 'Controleer je e-mailadres.' })
      return
    }

    const heading = subject === 'aanmelden' ? 'Aanmelding rijlessen' : 'Vraag via de website'
    const lines = [heading, '', `Naam: ${name}`]
    if (phone) lines.push(`Telefoon: ${phone}`)
    if (email) lines.push(`E-mail: ${email}`)
    if (subject === 'aanmelden' && interest) lines.push(`Interesse: ${interest}`)
    if (message) lines.push('', message)
    const body = lines.join('\n')

    setStatus({ kind: 'sending' })
    let res: Response | null = null
    try {
      res = await fetch('/api/aanmelden', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          name,
          phone,
          email,
          interest: subject === 'aanmelden' ? interest : '',
          message,
          website: String(data.get('website') ?? ''),
          startedAt: startedAt.current,
        }),
      })
    } catch {
      res = null
    }

    if (res?.ok) {
      window.dispatchEvent(new Event('yorulmaz:lead'))
      setStatus({ kind: 'sent' })
      form.reset()
      return
    }
    if (res?.status === 503) {
      fallback(heading, body)
      return
    }
    if (res?.status === 429) {
      setStatus({ kind: 'error', message: 'Je hebt al een paar berichten gestuurd. Probeer het later nog eens of stuur ons een WhatsApp.' })
      return
    }
    if (res?.status === 400) {
      setStatus({ kind: 'error', message: 'Controleer je gegevens en probeer het opnieuw.' })
      return
    }
    setStatus({
      kind: 'error',
      message: 'Versturen lukte niet. Probeer het nog eens, of stuur ons een bericht via WhatsApp.',
    })
  }

  const field =
    'mt-2 block w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-base text-ink transition-colors placeholder:text-subtle hover:border-ink/30 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-signal'
  const labelCls = 'text-sm font-semibold'

  return (
    <div className="rounded-[2rem] bg-sky px-5 py-8 sm:px-10 sm:py-12" data-reveal>
      <h3 className="font-display text-[1.6rem] leading-tight font-semibold tracking-[-0.015em]">
        {subject === 'aanmelden' ? 'Aanmelden voor rijlessen' : 'Stel je vraag'}
      </h3>
      <p className="mt-2 text-muted">Vul je gegevens in, dan nemen we contact met je op.</p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <fieldset>
          <legend className={labelCls}>Waarvoor neem je contact op?</legend>
          <div className="mt-2 grid grid-cols-2 rounded-xl border border-ink/15 bg-paper p-1">
            {(
              [
                ['aanmelden', 'Aanmelden'],
                ['vraag', 'Een vraag'],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={`flex min-h-11 cursor-pointer items-center justify-center rounded-lg text-[0.95rem] font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal ${
                  subject === value ? 'bg-navy text-paper' : 'text-ink/70 hover:text-ink'
                }`}
              >
                <input
                  type="radio"
                  name="onderwerp"
                  value={value}
                  checked={subject === value}
                  onChange={() => setSubject(value)}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        {subject === 'aanmelden' && (
          <div>
            <label htmlFor={`${id}-interesse`} className={labelCls}>
              Waar heb je interesse in?
            </label>
            <div className="relative">
              <select id={`${id}-interesse`} name="interesse" defaultValue="" className={`${field} appearance-none pr-10`}>
              <option value="">Maak een keuze</option>
              {site.prices.length > 0 && <option value="Losse rijlessen">Losse rijlessen</option>}
              {site.packages.map((p) => (
                <option key={p.name} value={`${p.name} (${p.title})`}>
                  {p.name}: {p.title}
                </option>
              ))}
              <option value="Weet ik nog niet">Weet ik nog niet</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-4 mt-1 size-4 -translate-y-1/2 text-navy" aria-hidden />
            </div>
          </div>
        )}

        {/* Verborgen veld tegen spambots */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div>
          <label htmlFor={`${id}-naam`} className={labelCls}>
            Naam <span className="font-normal text-subtle">(verplicht)</span>
          </label>
          <input id={`${id}-naam`} name="naam" type="text" autoComplete="name" required className={field} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-tel`} className={labelCls}>
              Telefoonnummer
            </label>
            <input id={`${id}-tel`} name="telefoon" type="tel" autoComplete="tel" inputMode="tel" className={field} />
          </div>
          <div>
            <label htmlFor={`${id}-email`} className={labelCls}>
              E-mail
            </label>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" className={field} />
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-bericht`} className={labelCls}>
            Bericht
          </label>
          <textarea
            id={`${id}-bericht`}
            name="bericht"
            rows={4}
            className={`${field} resize-y`}
            placeholder={subject === 'aanmelden' ? 'Bijvoorbeeld: wanneer je meestal kunt' : undefined}
          />
        </div>

        <div aria-live="polite" className="min-h-0 text-[0.95rem]">
          {status.kind === 'error' && <p className="border-l-2 border-[#b3261e] pl-3 text-[#8c1d18]">{status.message}</p>}
          {status.kind === 'sent' && (
            <p className="border-l-2 border-wa pl-3">
              Bedankt, je bericht is verstuurd! We nemen zo snel mogelijk contact met je op.
            </p>
          )}
          {status.kind === 'sent-elsewhere' && (
            <p className="border-l-2 border-wa pl-3">
              Je bericht staat klaar in {status.via}. Verstuur het daar om je aanvraag af te ronden.
            </p>
          )}
          {status.kind === 'unavailable' && (
            <p className="border-l-2 border-signal pl-3">
              Het formulier wordt binnenkort gekoppeld. Probeer het later nog eens, excuses voor het
              ongemak.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status.kind === 'sending'}
          className="group disabled:cursor-wait disabled:opacity-70 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-navy px-6 font-semibold text-paper transition-colors hover:bg-navy-soft active:translate-y-px sm:w-auto"
        >
          {status.kind === 'sending'
            ? 'Bezig met versturen…'
            : subject === 'aanmelden'
              ? 'Aanmelding versturen'
              : 'Verstuur je vraag'}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>

        <p className="text-sm text-subtle">
          We gebruiken je gegevens alleen om contact met je op te nemen.{' '}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">
            Privacyverklaring
          </Link>
        </p>
      </form>
    </div>
  )
}
