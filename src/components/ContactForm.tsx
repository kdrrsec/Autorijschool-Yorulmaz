'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { site } from '@/content/site'
import { ArrowRight } from './Icons'

type Subject = 'proefles' | 'vraag'
type Status = { kind: 'idle' } | { kind: 'error'; message: string } | { kind: 'sent'; via: string } | { kind: 'unavailable' }

/**
 * Eenvoudig contactformulier zonder backend. Bij verzenden wordt het bericht
 * klaargezet in WhatsApp (of anders in het e-mailprogramma). Zolang er nog
 * geen WhatsApp-nummer of e-mailadres is ingesteld, krijgt de bezoeker een
 * nette melding.
 */
export function ContactForm() {
  const id = useId()
  const [subject, setSubject] = useState<Subject>('proefles')
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('naam') ?? '').trim()
    const phone = String(data.get('telefoon') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('bericht') ?? '').trim()

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

    const heading = subject === 'proefles' ? 'Aanvraag proefles' : 'Vraag via de website'
    const lines = [heading, '', `Naam: ${name}`]
    if (phone) lines.push(`Telefoon: ${phone}`)
    if (email) lines.push(`E-mail: ${email}`)
    if (message) lines.push('', message)
    const body = lines.join('\n')

    if (site.contact.whatsapp) {
      window.open(`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(body)}`, '_blank', 'noopener')
      setStatus({ kind: 'sent', via: 'WhatsApp' })
    } else if (site.contact.email) {
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(heading)}&body=${encodeURIComponent(body)}`
      setStatus({ kind: 'sent', via: 'je e-mailprogramma' })
    } else {
      setStatus({ kind: 'unavailable' })
    }
  }

  const field =
    'mt-2 block w-full rounded-[2px] border border-ink/15 bg-paper px-4 py-3 text-base text-ink transition-colors placeholder:text-subtle hover:border-ink/30 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-signal'
  const labelCls = 'text-sm font-semibold'

  return (
    <div className="-mx-5 bg-stone px-5 py-10 sm:mx-0 sm:px-10 sm:py-12" data-reveal>
      <h3 className="font-display text-[1.6rem] leading-tight font-semibold tracking-[-0.015em]">
        {subject === 'proefles' ? 'Proefles aanvragen' : 'Stel je vraag'}
      </h3>
      <p className="mt-2 text-muted">Vul je gegevens in, dan nemen we contact met je op.</p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <fieldset>
          <legend className={labelCls}>Waarvoor neem je contact op?</legend>
          <div className="mt-2 grid grid-cols-2 border border-ink/15 bg-paper p-1">
            {(
              [
                ['proefles', 'Proefles'],
                ['vraag', 'Een vraag'],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={`flex min-h-11 cursor-pointer items-center justify-center text-[0.95rem] font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal ${
                  subject === value ? 'bg-ink text-paper' : 'text-ink/70 hover:text-ink'
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
            placeholder={subject === 'proefles' ? 'Bijvoorbeeld: wanneer je meestal kunt' : undefined}
          />
        </div>

        <div aria-live="polite" className="min-h-0 text-[0.95rem]">
          {status.kind === 'error' && <p className="border-l-2 border-[#b3261e] pl-3 text-[#8c1d18]">{status.message}</p>}
          {status.kind === 'sent' && (
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
          className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-[3px] bg-ink px-6 font-semibold text-paper transition-colors hover:bg-navy-soft active:translate-y-px sm:w-auto"
        >
          {subject === 'proefles' ? 'Proefles aanvragen' : 'Verstuur je vraag'}
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
