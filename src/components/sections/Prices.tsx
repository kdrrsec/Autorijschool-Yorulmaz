import { Check, Sparkles } from 'lucide-react'
import { site, whatsappHref, type Package } from '@/content/site'
import { Eyebrow } from '../Eyebrow'
import { ArrowRight } from '../Icons'

/** "€1.499" — zonder centen, met Nederlandse duizendtallen. */
const euro = (n: number) => `€${n.toLocaleString('nl-NL')}`

const total = (p: Package) => p.items.reduce((sum, i) => sum + i.amount, 0)
const saving = (p: Package) => total(p) - p.price

export function Prices() {
  const { prices, packages } = site
  const best = packages.length > 1 ? packages.reduce((a, b) => (saving(b) > saving(a) ? b : a)) : null

  return (
    <section id="tarieven" aria-labelledby="tarieven-title" className="bg-sky py-20 sm:py-28 lg:py-32">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>Tarieven</Eyebrow>
            <h2
              id="tarieven-title"
              className="mt-5 text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2.75rem]"
              data-reveal
            >
              Duidelijke prijzen, zelf kiezen hoe je lest.
            </h2>
          </div>
          <p className="text-muted lg:col-span-5" data-reveal>
            Kies voor losse lessen of voor een pakket. In de pakketten zit het praktijkexamen al
            inbegrepen en ben je voordeliger uit.
          </p>
        </div>

        {/* Losse lessen */}
        {prices.length > 0 && (
          <div className="mt-12 lg:mt-16">
            <h3 className="label text-subtle">Losse rijlessen</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {prices.map((price, i) => (
                <li
                  key={price.label}
                  className="flex items-center gap-5 rounded-3xl bg-white p-5 shadow-card sm:p-6"
                  data-reveal
                  style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
                >
                  <span className="flex size-18 shrink-0 flex-col items-center justify-center rounded-2xl bg-signal-soft text-signal-deep">
                    <span className="font-display text-[1.6rem] leading-none font-bold tabular-nums">
                      {price.minutes}
                    </span>
                    <span className="mt-1 text-[0.7rem] font-semibold tracking-[0.12em] uppercase">min</span>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[1.1rem] leading-snug font-semibold">{price.label}</p>
                    <p className="mt-0.5 text-sm text-muted">{price.note ?? 'Per les, los te boeken'}</p>
                  </div>
                  <p className="ml-auto shrink-0 font-display text-[2rem] leading-none font-bold tracking-[-0.02em] tabular-nums">
                    {euro(price.amount)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pakketten */}
        {packages.length > 0 && (
          <div className="mt-12">
            <h3 className="label text-subtle">Lespakketten</h3>
            <ul className="mt-4 grid gap-5 md:grid-cols-2">
              {packages.map((pkg, i) => (
                <PackageCard key={pkg.name} pkg={pkg} featured={pkg === best} delay={i * 90} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

function PackageCard({ pkg, featured, delay }: { pkg: Package; featured: boolean; delay: number }) {
  const t = featured
    ? {
        card: 'bg-navy text-paper shadow-lift',
        muted: 'text-paper/65',
        line: 'border-white/15',
        check: 'bg-signal text-white',
        chip: 'bg-white/10 text-paper',
        button: 'bg-signal text-white hover:bg-signal-deep',
        save: 'bg-[#34c77b]/15 text-[#5ee29a]',
      }
    : {
        card: 'bg-white text-ink shadow-card',
        muted: 'text-muted',
        line: 'border-line',
        check: 'bg-wa text-white',
        chip: 'bg-sky text-navy',
        button: 'bg-navy text-white hover:bg-navy-soft',
        save: 'bg-mint text-wa',
      }
  const message = `Hallo, ik heb interesse in ${pkg.name} (${pkg.title}) bij Autorijschool Yorulmaz.`

  return (
    <li
      className={`relative flex flex-col overflow-hidden rounded-[2rem] p-6 sm:p-8 ${t.card}`}
      data-reveal
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {featured && (
        <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-navy-soft" aria-hidden />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className={`label ${featured ? 'text-[#ff8a98]' : 'text-signal-deep'}`}>{pkg.name}</p>
          <p className="mt-2 font-display text-[1.45rem] leading-tight font-semibold tracking-[-0.01em]">
            {pkg.title}
          </p>
        </div>
        {featured && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-signal px-3 py-1.5 text-xs font-bold text-white">
            <Sparkles className="size-3.5" strokeWidth={2.4} />
            Meeste voordeel
          </span>
        )}
      </div>

      <div className="relative mt-7 flex flex-wrap items-end gap-x-4 gap-y-2">
        <p className="font-display text-[3rem] leading-none font-bold tracking-[-0.03em] tabular-nums sm:text-[3.4rem]">
          {euro(pkg.price)}
        </p>
        <div className="pb-1.5 leading-tight">
          <p className={`text-sm line-through ${t.muted}`}>{euro(total(pkg))}</p>
          <p className={`mt-0.5 inline-flex rounded-full px-2.5 py-0.5 text-sm font-bold ${t.save}`}>
            {euro(saving(pkg))} voordeel
          </p>
        </div>
      </div>

      <ul className={`relative mt-7 space-y-3 border-t pt-6 ${t.line}`}>
        {pkg.items.map((item) => (
          <li key={item.label} className="flex items-center gap-3">
            <span className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full ${t.check}`}>
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span className="font-medium">{item.label}</span>
            <span className={`ml-auto rounded-lg px-2 py-0.5 text-sm tabular-nums ${t.chip}`}>{euro(item.amount)}</span>
          </li>
        ))}
      </ul>

      <a
        href={whatsappHref(message)}
        {...(site.contact.whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`group relative mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 font-semibold transition-colors ${t.button}`}
      >
        {pkg.name} aanvragen
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </li>
  )
}
