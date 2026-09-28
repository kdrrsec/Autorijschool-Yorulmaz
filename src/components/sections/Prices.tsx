import { site, whatsappHref } from '@/content/site'
import { Eyebrow } from '../Eyebrow'
import { ArrowRight } from '../Icons'

const euro = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })

export function Prices() {
  const prices = site.prices

  return (
    <section id="tarieven" aria-labelledby="tarieven-title" className="py-20 sm:py-28 lg:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Eyebrow>Tarieven</Eyebrow>
          <h2
            id="tarieven-title"
            className="mt-5 text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2.75rem]"
            data-reveal
          >
            Transparante prijzen, zonder ingewikkelde pakketten.
          </h2>
          <p className="mt-6 max-w-md text-muted" data-reveal>
            Je ziet precies wat een les kost en zit nergens aan vast. Zo houd je zelf het overzicht.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-14" data-reveal>
          {prices.length > 0 ? (
            <ul className="border-t border-ink">
                {prices.map((price) => (
                  <li
                    key={price.label}
                    className="flex items-baseline gap-4 border-b border-line py-5 sm:py-6"
                  >
                    <div className="min-w-0">
                      <p className="text-[1.1rem] font-semibold">{price.label}</p>
                      {price.note && <p className="mt-1 text-sm text-muted">{price.note}</p>}
                    </div>
                    <span
                      className="mb-1.5 hidden flex-1 border-b border-dotted border-ink/25 sm:block"
                      aria-hidden
                    />
                    <p className="ml-auto shrink-0 font-display text-[1.35rem] font-semibold tabular-nums sm:ml-0">
                      {euro.format(price.amount)}
                    </p>
                  </li>
                ))}
              </ul>
          ) : (
            <div className="border-t border-ink">
              <div className="border-b border-line py-7 sm:py-9">
                <p className="label text-subtle">Actuele tarieven</p>
                <p className="mt-4 max-w-md font-display text-[1.35rem] leading-snug font-medium tracking-[-0.01em]">
                  De tarieven worden hier binnenkort vermeld.
                </p>
                <p className="mt-3 max-w-md text-muted">
                  Wil je nu al weten wat een les kost? Stuur een berichtje, dan hoor je het direct.
                </p>
                <a
                  href={whatsappHref('Hallo, wat kost een rijles bij Autorijschool Yorulmaz?')}
                  {...(site.contact.whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group mt-7 inline-flex items-center gap-2 border-b border-ink/25 pb-1 font-semibold transition-colors hover:border-ink"
                >
                  Vraag de prijs op
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
