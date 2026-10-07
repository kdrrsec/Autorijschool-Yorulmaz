import { site } from './site'

export type Location = {
  slug: string
  place: string
  /** Titel in Google en in het browsertabblad */
  title: string
  description: string
  intro: string[]
}

const from = site.prices.length ? Math.min(...site.prices.map((p) => p.amount)) : null
const fromText = from ? ` Een losse rijles kost vanaf €${from}, en in onze lespakketten zit het praktijkexamen al inbegrepen.` : ''

/** Plaatsen met een eigen pagina. Alleen plaatsen waar echt les wordt gegeven. */
export const locations: Location[] = [
  {
    slug: 'rijschool-doesburg',
    place: 'Doesburg',
    title: 'Rijschool Doesburg | Rijlessen bij Autorijschool Yorulmaz',
    description: `Rijbewijs halen in Doesburg? Autorijschool Yorulmaz geeft persoonlijke rijlessen in Doesburg en omgeving.${fromText} Meld je direct aan.`,
    intro: [
      `Wil je je rijbewijs halen in Doesburg? Autorijschool Yorulmaz geeft rijles in Doesburg en de plaatsen eromheen. We komen uit het naastgelegen ${site.city}, dus Doesburg is voor ons echt de buurt.`,
      `Je leert rijden in het verkeer waar je straks ook zelf rijdt. Rustig uitgelegd, op jouw tempo en met een duidelijk plan richting het examen.${fromText}`,
    ],
  },
  {
    slug: 'rijschool-giesbeek',
    place: 'Giesbeek',
    title: 'Rijschool Giesbeek | Rijlessen bij Autorijschool Yorulmaz',
    description: `Autorijschool Yorulmaz is een rijschool uit Giesbeek. Persoonlijke rijlessen in Giesbeek, Doesburg en omgeving.${fromText} Meld je direct aan.`,
    intro: [
      `Autorijschool Yorulmaz is een rijschool uit ${site.city}. Vanuit hier geven we rijles in ${site.city}, Doesburg en de omgeving.`,
      `Bij ons krijg je persoonlijke begeleiding: we kijken wat jij nodig hebt en bouwen de lessen stap voor stap op, van de eerste meters tot het examen.${fromText}`,
    ],
  },
]

export function locationBySlug(slug: string) {
  const location = locations.find((l) => l.slug === slug)
  if (!location) throw new Error(`Onbekende locatie: ${slug}`)
  return location
}
