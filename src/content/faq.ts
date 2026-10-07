import { site } from './site'

export type FaqItem = { question: string; answer: string }

const euro = (n: number) => `€${n.toLocaleString('nl-NL')}`

/**
 * Veelgestelde vragen. De antwoorden worden opgebouwd uit de gegevens in
 * site.ts, zodat prijzen en pakketten altijd kloppen met de rest van de site.
 */
export function faqItems(): FaqItem[] {
  const items: FaqItem[] = []
  const { prices, packages, contact } = site

  if (prices.length) {
    items.push({
      question: 'Wat kost een rijles bij Autorijschool Yorulmaz?',
      answer: `Een losse rijles kost ${prices.map((p) => `${euro(p.amount)} voor ${p.minutes} minuten`).join(' en ')}. Wil je voordeliger lessen, kies dan een van onze lespakketten.`,
    })
  }

  if (packages.length) {
    const lines = packages.map((p) => {
      const loose = p.items.reduce((sum, i) => sum + i.amount, 0)
      return `${p.name}: ${p.title} inclusief praktijkexamen voor ${euro(p.price)} (${euro(loose - p.price)} voordeel)`
    })
    items.push({
      question: 'Welke lespakketten zijn er?',
      answer: `${lines.join('. ')}. Het praktijkexamen van het CBR zit in elk pakket al inbegrepen.`,
    })

    const exam = packages[0].items.find((i) => /examen/i.test(i.label))
    if (exam) {
      items.push({
        question: 'Is het praktijkexamen inbegrepen?',
        answer: `Ja, in de lespakketten zit het praktijkexamen inbegrepen. Los kost het praktijkexamen ${euro(exam.amount)}.`,
      })
    }
  }

  items.push({
    question: 'Waar geven jullie rijles?',
    answer: `Autorijschool Yorulmaz komt uit ${site.city} en geeft rijles in ${site.region}. Je leert rijden in het verkeer waar je straks ook zelf rijdt.`,
  })

  items.push({
    question: 'In welke auto krijg ik les?',
    answer:
      'Je rijdt in onze zwarte Volkswagen Polo, herkenbaar aan het Yorulmaz-logo en het L-bord op het dak.',
  })

  if (prices.length) {
    items.push({
      question: 'Hoe lang duurt een rijles?',
      answer: `Je kunt kiezen uit lessen van ${prices.map((p) => `${p.minutes}`).join(' of ')} minuten. Een langere les geeft meer tijd om iets goed te oefenen, bijvoorbeeld in de aanloop naar het examen.`,
    })
  }

  const ways = ['via het aanmeldformulier op deze website']
  if (contact.whatsapp) ways.push('via WhatsApp')
  if (contact.phone) ways.push(`telefonisch op ${contact.phone}`)
  if (contact.email) ways.push(`per e-mail via ${contact.email}`)
  items.push({
    question: 'Hoe meld ik me aan?',
    answer: `Je kunt je aanmelden ${ways.slice(0, -1).join(', ')} of ${ways[ways.length - 1]}. We nemen daarna zo snel mogelijk contact met je op om je eerste les te plannen.`,
  })

  return items
}
