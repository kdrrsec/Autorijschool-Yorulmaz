import { site } from '@/content/site'
import { Hero } from '@/components/sections/Hero'
import { Intro } from '@/components/sections/Intro'
import { Usps } from '@/components/sections/Usps'
import { Lessons } from '@/components/sections/Lessons'
import { Prices } from '@/components/sections/Prices'
import { TrialCta } from '@/components/sections/TrialCta'
import { About } from '@/components/sections/About'
import { Reviews } from '@/components/sections/Reviews'
import { Gallery } from '@/components/sections/Gallery'
import { Contact } from '@/components/sections/Contact'
import { MobileCtaBar } from '@/components/MobileCtaBar'

function structuredData() {
  const { phone, email, instagram } = site.contact
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['DrivingSchool', 'LocalBusiness'],
    '@id': `${site.url}/#rijschool`,
    name: site.name,
    url: site.url,
    description:
      'Persoonlijke rijlessen in Doesburg en omgeving. Stap voor stap naar je rijbewijs.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressCountry: 'NL',
    },
    areaServed: { '@type': 'City', name: site.city },
  }
  if (phone) data.telephone = phone
  if (email) data.email = email
  if (instagram) data.sameAs = [instagram]
  if (site.photos.hero) data.image = new URL(site.photos.hero.src, site.url).toString()
  return data
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData()).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <Intro />
      <Usps />
      <Lessons />
      <Prices />
      <TrialCta />
      <About />
      <Reviews />
      <Gallery />
      <Contact />
      <MobileCtaBar />
    </>
  )
}
