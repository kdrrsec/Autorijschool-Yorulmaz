/**
 * Cookietoestemming. De keuze van de bezoeker wordt lokaal in de browser
 * bewaard (dat is zelf geen trackingcookie). Tracking laadt pas na toestemming.
 */

export const trackers = {
  /** Google Analytics 4, bijvoorbeeld "G-XXXXXXX". Zet NEXT_PUBLIC_GA_ID in Vercel. */
  gaId: process.env.NEXT_PUBLIC_GA_ID || null,
  /** Meta (Facebook/Instagram) pixel-ID. Zet NEXT_PUBLIC_META_PIXEL_ID in Vercel. */
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || null,
}

/** Zijn er überhaupt diensten die toestemming nodig hebben? Zo niet: geen banner. */
export const consentRequired = Boolean(trackers.gaId || trackers.metaPixelId)

export type Consent = {
  /** Statistieken: Google Analytics */
  analytics: boolean
  /** Marketing: Meta-pixel */
  marketing: boolean
  /** Datum van de keuze (ISO) */
  date: string
  /** Versie van het cookiebeleid; bij een nieuwe versie vragen we opnieuw */
  version: number
}

const KEY = 'yorulmaz-cookie-consent'
export const CONSENT_VERSION = 1
export const CONSENT_EVENT = 'yorulmaz:consent'
export const OPEN_SETTINGS_EVENT = 'yorulmaz:open-cookie-settings'

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Consent
    return parsed.version === CONSENT_VERSION ? parsed : null
  } catch {
    return null
  }
}

export function saveConsent(choice: Pick<Consent, 'analytics' | 'marketing'>) {
  const previous = readConsent()
  const consent: Consent = { ...choice, date: new Date().toISOString(), version: CONSENT_VERSION }
  try {
    window.localStorage.setItem(KEY, JSON.stringify(consent))
  } catch {
    // Opslag geblokkeerd: de keuze geldt dan alleen voor deze pagina.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }))

  // Toestemming ingetrokken? Verwijder bestaande cookies en herlaad, zodat de
  // scripts ook echt weg zijn.
  const revoked =
    (previous?.analytics && !consent.analytics) || (previous?.marketing && !consent.marketing)
  if (revoked) {
    removeTrackingCookies()
    window.location.reload()
  }
}

function removeTrackingCookies() {
  const names = document.cookie.split(';').map((c) => c.split('=')[0].trim())
  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  for (const name of names) {
    if (!/^(_ga|_gid|_gat|_fbp|_fbc)/.test(name)) continue
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`
    }
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
}
