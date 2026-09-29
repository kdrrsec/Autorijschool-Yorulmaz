import { Check, Receipt } from 'lucide-react'
import { site, whatsappHref } from '@/content/site'
import { Eyebrow } from '../Eyebrow'
import { ArrowRight } from '../Icons'
import { IconTile } from '../IconTile'

const euro = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })

const principles = ['Je betaalt per les', 'Geen pakketten waar je aan vastzit', 'Vooraf duidelijk wat alles kost']

export function Prices() {
  const prices = site.prices

  return (
    <section id="tarieven" aria-labelledby="tarieven-title" className="bg-sky py-20 sm:py-28 lg:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <div className="lg:col-span-5">
          <Eyebrow>Tarieven</Eyebrow>
          <h2
            id="tarieven-title"
            className="mt-5 text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2.75rem]"
            data-reveal
          >
            Transparante prijzen, zonder ingewikkelde pakketten.
          </h2>
          <ul className="mt-8 space-y-3" data-reveal>
            {principles.map((p) => (
              <li key={p} className="flex items-center gap-3 font-medium">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-wa text-white">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <div className="rounded-3xl bg-white p-6 shadow-lift sm:p-10">
            <div className="flex items-center gap-4">
              <IconTile icon={Receipt} tone="signal" />
              <div>
                <p className="label text-subtle">Actuele tarieven</p>
                <p className="mt-1 font-display text-xl font-semibold">Losse rijlessen</p>
              </div>
            </div>

            {prices.length > 0 ? (
              <ul className="mt-8 divide-y divide-line border-t border-line">
                {prices.map((price) => (
                  <li key={price.label} className="flex items-baseline gap-4 py-5">
                    <div className="min-w-0">
                      <p className="text-[1.05rem] font-semibold">{price.label}</p>
                      {price.note && <p className="mt-1 text-sm text-muted">{price.note}</p>}
                    </div>
                    <p className="ml-auto shrink-0 rounded-xl bg-sky px-3 py-1.5 font-display text-[1.25rem] font-semibold tabular-nums">
                      {euro.format(price.amount)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-8 rounded-2xl border-2 border-dashed border-sky-deep p-6 text-center sm:p-8">
                <p className="font-display text-[1.25rem] leading-snug font-medium tracking-[-0.01em]">
                  De tarieven worden hier binnenkort vermeld.
                </p>
                <p className="mx-auto mt-3 max-w-sm text-muted">
                  Wil je nu al weten wat een les kost? Stuur een berichtje, dan hoor je het direct.
                </p>
                <a
                  href={whatsappHref('Hallo, wat kost een rijles bij Autorijschool Yorulmaz?')}
                  {...(site.contact.whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-navy px-5 font-semibold text-white transition-colors hover:bg-navy-soft"
                >
                  Vraag de prijs op
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
