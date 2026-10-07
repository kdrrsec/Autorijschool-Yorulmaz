import Image from 'next/image'
import Link from 'next/link'
import { nav, site, whatsappHref } from '@/content/site'
import { locations } from '@/content/locations'
import { Logo } from './Logo'
import { CookieSettingsLink } from './CookieSettingsLink'
import { ArrowRight, Instagram, Mail, WhatsApp } from './Icons'
import axaweb from '../../public/images/axaweb.png'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink pb-24 text-paper sm:pb-0">
      <div className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Logo className="h-14 sm:h-16" />
          <p className="mt-6 max-w-xs text-paper/60">
            Rijschool in {site.region}.
          </p>
          <Link
            href="/#aanvragen"
            className="group mt-8 inline-flex items-center gap-2 border-b border-paper/30 pb-1 font-semibold transition-colors hover:border-paper"
          >
            Plan je les
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <nav aria-label="Footermenu" className="lg:col-span-3 lg:col-start-7">
          <p className="label text-paper/45">Menu</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-10 items-center text-paper/80 transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            {locations.map((l) => (
              <li key={l.slug}>
                <Link href={`/${l.slug}`} className="inline-flex min-h-10 items-center text-paper/80 transition-colors hover:text-paper">
                  Rijschool {l.place}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="label text-paper/45">Volg en bericht</p>
          <ul className="mt-5 space-y-1">
            {site.contact.instagram && (
              <li>
                <a
                  href={site.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-3 text-paper/80 transition-colors hover:text-paper"
                >
                  <Instagram className="size-[1.1rem]" />
                  Instagram
                </a>
              </li>
            )}
            <li>
              <a
                href={whatsappHref()}
                {...(site.contact.whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex min-h-10 items-center gap-3 text-paper/80 transition-colors hover:text-paper"
              >
                <WhatsApp className="size-[1.1rem]" />
                WhatsApp
              </a>
            </li>
            {site.contact.email && (
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex min-h-10 items-center gap-3 break-all text-paper/80 transition-colors hover:text-paper"
                >
                  <Mail className="size-[1.1rem] shrink-0" />
                  {site.contact.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-paper/50 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <p>© {year} {site.name}</p>
          <a
            href="https://axaweb.nl"
            target="_blank"
            rel="noopener"
            className="order-last inline-flex min-h-10 items-center gap-2 self-center transition-colors sm:order-none sm:justify-self-center hover:text-paper"
          >
            Powered by
            <Image src={axaweb} alt="AxaWeb" width={20} height={20} className="size-5" />
          </a>
          <ul className="flex flex-wrap gap-x-6 gap-y-0 sm:justify-self-end">
            <li>
              <Link href="/privacy" className="inline-flex min-h-10 items-center transition-colors hover:text-paper">
                Privacyverklaring
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="inline-flex min-h-10 items-center transition-colors hover:text-paper">
                Cookiebeleid
              </Link>
            </li>
            <li>
              <CookieSettingsLink className="inline-flex min-h-10 items-center transition-colors hover:text-paper" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
