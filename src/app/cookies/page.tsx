import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { CookieSettingsLink } from '@/components/CookieSettingsLink'
import { site } from '@/content/site'
import { consentRequired, trackers } from '@/lib/consent'

export const metadata: Metadata = {
  title: 'Cookiebeleid',
  description: 'Welke cookies de website van Autorijschool Yorulmaz gebruikt en hoe je je keuze aanpast.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <LegalPage label="Cookies" title="Cookiebeleid" updated="september 2026">
      <p>
        Op deze pagina lees je welke cookies de website van {site.name} gebruikt en waarom.
        {consentRequired
          ? ' Cookies voor statistieken en marketing plaatsen we alleen als je daar toestemming voor geeft.'
          : ' Op dit moment gebruiken we geen tracking- of advertentiecookies.'}
      </p>

      <h2>Noodzakelijk</h2>
      <p>
        Voor het onthouden van je cookiekeuze slaan we een klein gegeven op in je eigen browser
        (localStorage). Dit is nodig om je keuze te respecteren en bevat geen persoonsgegevens.
        Hiervoor is geen toestemming nodig.
      </p>

      {trackers.gaId && (
        <>
          <h2>Statistieken (Google Analytics)</h2>
          <p>
            Met Google Analytics zien we hoeveel bezoekers de website heeft, welke pagina&apos;s
            bekeken worden en hoe bezoekers bij ons terechtkomen. Zo kunnen we de website
            verbeteren. Google Analytics plaatst de cookies <code>_ga</code> en{' '}
            <code>_ga_*</code> (bewaartermijn maximaal 2 jaar). Je IP-adres wordt door Google
            niet opgeslagen.
          </p>
        </>
      )}

      {trackers.metaPixelId && (
        <>
          <h2>Marketing (Meta-pixel)</h2>
          <p>
            Met de Meta-pixel meten we hoe onze advertenties op Facebook en Instagram werken,
            bijvoorbeeld of iemand na het zien van een advertentie contact opneemt. De pixel plaatst
            de cookies <code>_fbp</code> en eventueel <code>_fbc</code> (bewaartermijn maximaal 90
            dagen). Meta kan deze gegevens ook voor eigen doeleinden gebruiken; daarvoor geldt het
            privacybeleid van Meta.
          </p>
        </>
      )}

      {consentRequired && (
        <>
          <h2>Je keuze aanpassen</h2>
          <p>
            Je kunt je toestemming altijd wijzigen of intrekken. Trek je je toestemming in, dan
            verwijderen we de betreffende cookies.
          </p>
          <p>
            <CookieSettingsLink className="inline-flex min-h-11 items-center rounded-xl bg-navy px-5 font-semibold text-white transition-colors hover:bg-navy-soft" />
          </p>
        </>
      )}

      <h2>Externe diensten</h2>
      <p>
        Klik je op een link naar WhatsApp of Instagram, dan ga je naar de website of app van die
        dienst. Daar gelden hun eigen cookie- en privacyregels.
      </p>
    </LegalPage>
  )
}
