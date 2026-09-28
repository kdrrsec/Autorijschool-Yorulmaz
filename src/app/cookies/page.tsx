import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Cookiebeleid',
  description: 'Welke cookies de website van Autorijschool Yorulmaz gebruikt.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <LegalPage label="Cookies" title="Cookiebeleid" updated="september 2026">
      <p>
        De website van {site.name} gebruikt geen tracking- of advertentiecookies. We volgen je niet
        over andere websites en maken geen profielen van bezoekers.
      </p>

      <h2>Functionele opslag</h2>
      <p>
        De website kan technisch noodzakelijke gegevens gebruiken om goed te werken. Daarvoor is
        geen toestemming nodig en er worden geen persoonsgegevens mee verzameld.
      </p>

      <h2>Externe diensten</h2>
      <p>
        Klik je op een link naar WhatsApp of Instagram, dan ga je naar de website of app van die
        dienst. Daar gelden hun eigen cookie- en privacyregels.
      </p>

      <h2>Wijzigingen</h2>
      <p>
        Gaan we in de toekomst wel cookies gebruiken, bijvoorbeeld voor statistieken, dan passen we
        dit beleid aan en vragen we waar nodig eerst om je toestemming.
      </p>
    </LegalPage>
  )
}
