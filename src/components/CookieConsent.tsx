'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Cookie } from 'lucide-react'
import {
  OPEN_SETTINGS_EVENT,
  consentRequired,
  readConsent,
  saveConsent,
  trackers,
} from '@/lib/consent'

type View = 'hidden' | 'banner' | 'settings'

/**
 * Cookiebanner. Verschijnt alleen als er diensten zijn ingesteld die
 * toestemming nodig hebben (Google Analytics of Meta-pixel). Accepteren en
 * weigeren zijn even groot en even duidelijk.
 */
export function CookieConsent() {
  const [view, setView] = useState<View>('hidden')
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!consentRequired) return
    const existing = readConsent()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- keuze staat alleen in de browser
    if (!existing) setView('banner')

    const open = () => {
      const current = readConsent()
      setAnalytics(current?.analytics ?? false)
      setMarketing(current?.marketing ?? false)
      setView('settings')
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, open)
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open)
  }, [])

  useEffect(() => {
    if (view === 'settings') panelRef.current?.querySelector<HTMLElement>('button')?.focus({ preventScroll: true })
  }, [view])

  if (!consentRequired || view === 'hidden') return null

  const decide = (choice: { analytics: boolean; marketing: boolean }) => {
    saveConsent(choice)
    setView('hidden')
  }

  const services = [
    trackers.gaId && 'statistieken (Google Analytics)',
    trackers.metaPixelId && 'het meten van onze advertenties (Meta)',
  ].filter(Boolean)

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-text"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-lg rounded-3xl bg-white p-5 shadow-[0_24px_60px_-12px_rgba(12,18,28,0.45)] ring-1 ring-navy/10 sm:inset-x-auto sm:right-auto sm:bottom-6 sm:left-6 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-signal-soft text-signal-deep" aria-hidden>
          <Cookie className="size-6" strokeWidth={1.9} />
        </span>
        <div className="min-w-0">
          <h2 id="cookie-title" className="font-display text-lg leading-tight font-semibold">
            {view === 'settings' ? 'Cookie-instellingen' : 'Cookies op deze website'}
          </h2>
          <p id="cookie-text" className="mt-1.5 text-[0.925rem] leading-relaxed text-muted">
            We gebruiken cookies voor {services.join(' en ')}. Dat doen we alleen als je daar
            toestemming voor geeft. Meer lezen?{' '}
            <Link href="/cookies" className="font-medium text-ink underline underline-offset-2">
              Cookiebeleid
            </Link>
          </p>
        </div>
      </div>

      {view === 'settings' && (
        <ul className="mt-5 divide-y divide-line rounded-2xl border border-line">
          <Toggle label="Noodzakelijk" text="Nodig om de website te laten werken. Altijd aan." checked disabled />
          {trackers.gaId && (
            <Toggle
              label="Statistieken"
              text="Google Analytics: hoe bezoekers de website gebruiken."
              checked={analytics}
              onChange={setAnalytics}
            />
          )}
          {trackers.metaPixelId && (
            <Toggle
              label="Marketing"
              text="Meta-pixel: meten hoe onze advertenties op Facebook en Instagram werken."
              checked={marketing}
              onChange={setMarketing}
            />
          )}
        </ul>
      )}

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {view === 'settings' ? (
          <>
            <button type="button" onClick={() => decide({ analytics, marketing })} className={btnPrimary}>
              Keuze opslaan
            </button>
            <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className={btnSecondary}>
              Alles accepteren
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className={btnPrimary}>
              Accepteren
            </button>
            <button type="button" onClick={() => decide({ analytics: false, marketing: false })} className={btnPrimary}>
              Weigeren
            </button>
          </>
        )}
      </div>
      {view === 'banner' && (
        <button
          type="button"
          onClick={() => setView('settings')}
          className="mt-3 w-full text-center text-sm font-semibold text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Zelf kiezen
        </button>
      )}
    </div>
  )
}

const btnPrimary =
  'inline-flex min-h-11 items-center justify-center rounded-xl bg-navy px-4 text-[0.95rem] font-semibold text-white transition-colors hover:bg-navy-soft'
const btnSecondary =
  'inline-flex min-h-11 items-center justify-center rounded-xl border border-navy/20 px-4 text-[0.95rem] font-semibold text-navy transition-colors hover:border-navy'

function Toggle({
  label,
  text,
  checked,
  disabled,
  onChange,
}: {
  label: string
  text: string
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <li className="flex items-center gap-4 p-4">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{label}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">{text}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors disabled:opacity-60 ${
          checked ? 'bg-wa' : 'bg-navy/20'
        }`}
      >
        <span
          className={`inline-block size-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </li>
  )
}
