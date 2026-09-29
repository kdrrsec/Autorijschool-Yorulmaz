/**
 * Centrale bedrijfsgegevens van Autorijschool Yorulmaz.
 *
 * Alles wat nog niet bekend is staat op `null`. De website toont dan
 * automatisch een nette placeholder of verbergt het onderdeel.
 * Vul hier alleen gegevens in die kloppen — niets verzinnen.
 */

export type Price = {
  /** Bijvoorbeeld "Rijles van 60 minuten" */
  label: string
  /** Lesduur in minuten */
  minutes: number
  /** Bedrag in euro's */
  amount: number
  /** Optionele toelichting */
  note?: string
}

export type Package = {
  name: string
  /** Bijvoorbeeld "20 lessen van 60 minuten" */
  title: string
  /** Onderdelen met hun losse prijs; het voordeel wordt hieruit berekend */
  items: { label: string; amount: number }[]
  /** Pakketprijs in euro's */
  price: number
}

export type Review = {
  name: string
  text: string
  /** Bijvoorbeeld "Geslaagd in maart 2026" */
  context?: string
  /** Waar de review vandaan komt, bijvoorbeeld "Google" of "Instagram" */
  source?: string
  /** Aantal sterren (1-5), alleen invullen als de review echt een score heeft */
  rating?: number
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
  /** Vestigingsplaats van de rijschool */
  city: 'Giesbeek',
  /** Plaatsen waar les wordt gegeven */
  areaServed: ['Doesburg', 'Giesbeek'],
  region: 'Giesbeek, Doesburg en omgeving',

  /** Productie-URL. Zet NEXT_PUBLIC_SITE_URL in de hosting-omgeving. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),

  contact: {
    /** Weergave, bijvoorbeeld "06 12 34 56 78" */
    phone: '06 19775900' as string | null,
    /** Internationaal zonder + of spaties, bijvoorbeeld "31612345678" */
    whatsapp: '31619775900' as string | null,
    email: null as string | null,
    instagram: 'https://www.instagram.com/autorijschoolyorulmaz/' as string | null,
  },

  /** Losse rijlessen */
  prices: [
    { label: 'Rijles van 60 minuten', minutes: 60, amount: 60 },
    { label: 'Rijles van 90 minuten', minutes: 90, amount: 90 },
  ] as Price[],

  /** Lespakketten. Het voordeel = som van de onderdelen − pakketprijs. */
  packages: [
    {
      name: 'Pakket 1',
      title: '20 lessen van 60 minuten',
      items: [
        { label: '20 rijlessen van 1 uur', amount: 1200 },
        { label: 'Praktijkexamen', amount: 320 },
      ],
      price: 1499,
    },
    {
      name: 'Pakket 2',
      title: '20 lessen van 90 minuten',
      items: [
        { label: '20 rijlessen van 1,5 uur', amount: 1800 },
        { label: 'Praktijkexamen', amount: 320 },
      ],
      price: 2049,
    },
  ] as Package[],

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

/** Menu in dezelfde volgorde als de secties op de pagina. Het logo gaat naar boven. */
export const nav = [
  { href: '/#rijlessen', label: 'Rijlessen' },
  { href: '/#tarieven', label: 'Tarieven' },
  { href: '/#over-ons', label: 'Over ons' },
  { href: '/#contact', label: 'Contact' },
]

/** Link naar WhatsApp, of naar het contactblok zolang er geen nummer is. */
export function whatsappHref(message?: string) {
  const number = site.contact.whatsapp
  if (!number) return '/#contact'
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${number}${text}`
}

export const signupMessage =
  'Hallo, ik wil me graag aanmelden voor rijlessen bij Autorijschool Yorulmaz.'
