/**
 * Centrale bedrijfsgegevens van Autorijschool Yorulmaz.
 *
 * Alles wat nog niet bekend is staat op `null`. De website toont dan
 * automatisch een nette placeholder of verbergt het onderdeel.
 * Vul hier alleen gegevens in die kloppen — niets verzinnen.
 */

export type Price = {
  /** Bijvoorbeeld "Rijles (60 minuten)" */
  label: string
  /** Bedrag in euro's, bijvoorbeeld 55 */
  amount: number
  /** Optionele toelichting, bijvoorbeeld "inclusief ophalen" */
  note?: string
}

export type Review = {
  name: string
  text: string
  /** Bijvoorbeeld "Geslaagd in maart 2026" */
  context?: string
  /** Waar de review vandaan komt, bijvoorbeeld "Google" of "Instagram" */
  source?: string
}

export type Photo = {
  /** Pad in /public, bijvoorbeeld "/images/lesauto.jpg" */
  src: string
  alt: string
  /** CSS object-position, voor nette uitsnedes. Standaard "center". */
  position?: string
}

export const site = {
  name: 'Autorijschool Yorulmaz',
  shortName: 'Yorulmaz',
  city: 'Doesburg',
  region: 'Doesburg en omgeving',

  /** Productie-URL. Zet NEXT_PUBLIC_SITE_URL in de hosting-omgeving. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),

  contact: {
    /** Weergave, bijvoorbeeld "06 12 34 56 78" */
    phone: null as string | null,
    /** Internationaal zonder + of spaties, bijvoorbeeld "31612345678" */
    whatsapp: null as string | null,
    email: null as string | null,
    instagram: 'https://www.instagram.com/autorijschoolyorulmaz/' as string | null,
  },

  /** Losse tarieven. Leeg laten zolang de prijzen niet bekend zijn. */
  prices: [] as Price[],

  /** Echte reviews van leerlingen. Leeg laten tot ze er zijn. */
  reviews: [] as Review[],

  instructor: {
    name: null as string | null,
    /** Korte persoonlijke introductie, in de ik-vorm of wij-vorm. */
    bio: null as string | null,
    /** Bijvoorbeeld "Sinds 2015 rijinstructeur" */
    experience: null as string | null,
    photo: null as Photo | null,
  },

  photos: {
    hero: null as Photo | null,
    gallery: [null, null, null] as (Photo | null)[],
  },
}

export const nav = [
  { href: '/#home', label: 'Home' },
  { href: '/#over-ons', label: 'Over ons' },
  { href: '/#rijlessen', label: 'Rijlessen' },
  { href: '/#tarieven', label: 'Tarieven' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/#contact', label: 'Contact' },
]

/** Link naar WhatsApp, of naar het contactblok zolang er geen nummer is. */
export function whatsappHref(message?: string) {
  const number = site.contact.whatsapp
  if (!number) return '/#contact'
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${number}${text}`
}

export const trialLessonMessage =
  'Hallo, ik wil graag een proefles aanvragen bij Autorijschool Yorulmaz.'
