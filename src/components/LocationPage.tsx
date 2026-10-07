import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { site, whatsappHref, signupMessage } from '@/content/site'
import { faqItems } from '@/content/faq'
import { locations, type Location } from '@/content/locations'
import { breadcrumbs, drivingSchool, faqPage, graph } from '@/lib/structured-data'
import { Button } from './Button'
import { License3D } from './illustrations/License3D'
import { Eyebrow } from './Eyebrow'
import { ArrowRight } from './Icons'
import { MobileCtaBar } from './MobileCtaBar'
import { Lessons } from './sections/Lessons'
import { Prices } from './sections/Prices'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'

export function locationMetadata(location: Location): Metadata {
  const path = `/${location.slug}`
  return {
    title: { absolute: location.title },
    description: location.description,
    alternates: { canonical: path },
    openGraph: { url: path, title: location.title, description: location.description },
    twitter: { title: location.title, description: location.description },
  }
}

export function LocationPage({ location }: { location: Location }) {
  const faq = faqItems()
  const path = `/${location.slug}`
  const others = locations.filter((l) => l.slug !== location.slug)
  const checks = [
    site.prices.length ? `Rijles vanaf €${Math.min(...site.prices.map((p) => p.amount))}` : null,
    site.packages.length ? 'Pakketten incl. praktijkexamen' : null,
    `Les in ${location.place} en omgeving`,
  ].filter(Boolean) as string[]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            drivingSchool(),
            faqPage(faq, path),
            breadcrumbs([
              { name: site.name, path: '/' },
              { name: `Rijschool ${location.place}`, path },
            ]),
          ),
        }}
      />

      <section className="pt-16 lg:pt-[4.5rem]" aria-labelledby="locatie-title">
        <div className="relative overflow-hidden bg-sky">
          <div className="pointer-events-none absolute -top-32 -right-24 size-[34rem] rounded-full bg-sky-deep/70" aria-hidden />
          <div className="container-site relative py-14 sm:py-20 lg:py-24">
            <nav aria-label="Kruimelpad" className="text-sm text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="underline decoration-ink/20 underline-offset-4 hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li aria-current="page" className="text-ink">
                  Rijschool {location.place}
                </li>
              </ol>
            </nav>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Eyebrow reveal={false}>Lesgebied</Eyebrow>
                <h1
                  id="locatie-title"
                  className="mt-5 text-[2.3rem] leading-[1.05] font-bold tracking-[-0.025em] sm:text-[3.2rem] lg:text-[3.6rem]"
                >
                  Rijschool in <span className="text-signal">{location.place}</span>
                </h1>
                {location.intro.map((text) => (
                  <p key={text} className="mt-6 max-w-[40rem] text-lg leading-relaxed text-muted">
                    {text}
                  </p>
                ))}

                <ul className="mt-7 flex flex-col gap-x-6 gap-y-2.5 sm:flex-row sm:flex-wrap">
                  {checks.map((c) => (
                    <li key={c} className="flex items-center gap-2.5 text-[0.975rem] font-medium">
                      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-wa text-white">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button href="#aanvragen" variant="signal">
                    Plan je les
                  </Button>
                  <Button href={whatsappHref(signupMessage)} variant="whatsapp" icon="whatsapp">
                    WhatsApp
                  </Button>
                </div>
              </div>
              <div className="hidden lg:col-span-5 lg:block" aria-hidden>
                <License3D uid="locatie" className="mx-auto w-[90%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Lessons />
      <Prices />
      <Faq items={faq} />
      <Contact />

      {others.length > 0 && (
        <section aria-label="Andere plaatsen" className="pb-20 sm:pb-24">
          <div className="container-site">
            <p className="label text-muted">Ook rijles in</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/${o.slug}`}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 font-semibold shadow-card transition-colors hover:border-navy"
                  >
                    Rijschool {o.place}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 font-semibold shadow-card transition-colors hover:border-navy"
                >
                  Naar de homepage
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      <MobileCtaBar />
    </>
  )
}
