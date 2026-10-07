import { faqItems } from '@/content/faq'
import { drivingSchool, faqPage, graph, website } from '@/lib/structured-data'
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
import { Faq } from '@/components/sections/Faq'
import { MobileCtaBar } from '@/components/MobileCtaBar'

export default function HomePage() {
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
