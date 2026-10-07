import { site } from '@/content/site'
import type { FaqItem } from '@/content/faq'

/**
 * Schema.org-gegevens voor Google. Alleen echte bedrijfsgegevens uit site.ts;
 * er wordt niets verzonnen (geen straatadres, reviews of openingstijden).
 */

const base = site.url.replace(/\/$/, '')
export const schoolId = `${base}/#rijschool`
const websiteId = `${base}/#website`

export function drivingSchool() {
  const { phone, email, instagram } = site.contact
  const amounts = [...site.prices.map((p) => p.amount), ...site.packages.map((p) => p.price)]
  const euro = (n: number) => `€${n.toLocaleString('nl-NL')}`

  const data: Record<string, unknown> = {
    '@type': ['DrivingSchool', 'LocalBusiness'],
    '@id': schoolId,
    name: site.name,
    alternateName: ['Rijschool Yorulmaz', 'Yorulmaz'],
    slogan: 'Met vertrouwen de weg op.',
    url: `${base}/`,
    logo: `${base}/images/logo.png`,
    image: `${base}/opengraph-image`,
    description: `Autorijschool uit ${site.city} met persoonlijke rijlessen in ${site.region}. Losse rijlessen of een voordelig lespakket inclusief praktijkexamen.`,
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'NL' },
    areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
    currenciesAccepted: 'EUR',
  }
  if (amounts.length) data.priceRange = `${euro(Math.min(...amounts))} - ${euro(Math.max(...amounts))}`
  if (phone) data.telephone = `+31${phone.replace(/\D/g, '').replace(/^0/, '')}`
  if (email) data.email = email
  if (instagram) data.sameAs = [instagram]

  const offers = [
    ...site.prices.map((p) => ({ name: p.label, price: p.amount })),
    ...site.packages.map((p) => ({ name: `${p.name}: ${p.title} inclusief praktijkexamen`, price: p.price })),
  ]
  if (offers.length) {
    data.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Rijlessen en lespakketten',
      itemListElement: offers.map((o) => ({
        '@type': 'Offer',
        name: o.name,
        price: o.price,
        priceCurrency: 'EUR',
        itemOffered: { '@type': 'Service', name: o.name },
      })),
    }
  }
  return data
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${base}/`,
    name: site.name,
    alternateName: 'Rijschool Yorulmaz',
    inLanguage: 'nl-NL',
    publisher: { '@id': schoolId },
  }
}

export function faqPage(items: FaqItem[], path = '/') {
  return {
    '@type': 'FAQPage',
    '@id': `${base}${path}#faq`,
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  }
}

export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${base}${t.path}`,
    })),
  }
}

export function graph(...nodes: Record<string, unknown>[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c')
}
