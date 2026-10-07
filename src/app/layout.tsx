import type { Metadata, Viewport } from 'next'
import { Archivo, Source_Sans_3 } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RevealObserver } from '@/components/RevealObserver'
import { HashLinkHandler } from '@/components/HashLinkHandler'
import { CookieConsent } from '@/components/CookieConsent'
import { Trackers } from '@/components/Trackers'
import { site } from '@/content/site'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source',
  display: 'swap',
})

const description =
  'Autorijschool Yorulmaz uit Giesbeek geeft persoonlijke rijlessen in Doesburg en omgeving. Rustig leren rijden, stap voor stap naar je rijbewijs. Losse lessen of een voordelig pakket.'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Autorijschool Yorulmaz | Met vertrouwen de weg op',
    template: '%s | Autorijschool Yorulmaz',
  },
  description,
  applicationName: site.name,
  keywords: [
    'Autorijschool Yorulmaz',
    'Autorijschool Doesburg',
    'Rijschool Doesburg',
    'Rijlessen Doesburg',
    'Rijbewijs halen Doesburg',
    'Rijschool Giesbeek',
    'Autorijschool Giesbeek',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: '/',
    siteName: site.name,
    title: 'Autorijschool Yorulmaz | Met vertrouwen de weg op',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autorijschool Yorulmaz | Met vertrouwen de weg op',
    description,
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#16213a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nl"
      className={`${archivo.variable} ${sourceSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Zet .js vóór de eerste paint, zodat reveal-animaties niet flikkeren. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="label sr-only z-[100] bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Naar de inhoud
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <HashLinkHandler />
        <CookieConsent />
        <Trackers />
      </body>
    </html>
  )
}
