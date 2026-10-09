import { faqItems } from '@/content/faq'
import { drivingSchool, faqPage, graph, website } from '@/lib/structured-data'
import { Hero } from './sections/Hero'
import { Intro } from './sections/Intro'
import { Usps } from './sections/Usps'
import { Lessons } from './sections/Lessons'
import { Prices } from './sections/Prices'
import { TrialCta } from './sections/TrialCta'
import { About } from './sections/About'
import { Reviews } from './sections/Reviews'
import { Gallery } from './sections/Gallery'
import { Contact } from './sections/Contact'
import { Faq } from './sections/Faq'
import { MobileCtaBar } from './MobileCtaBar'

export function HomePage() {
  const faq = faqItems()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph(drivingSchool(), website(), faqPage(faq)) }}
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
      <Faq items={faq} />
      <Contact />
      <MobileCtaBar />
    </>
  )
}
