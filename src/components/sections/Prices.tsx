import { BadgeCheck, Car, Check, Sparkles } from 'lucide-react'
import { site, whatsappHref, type Package, type Price } from '@/content/site'
import { Eyebrow } from '../Eyebrow'
import { ArrowRight } from '../Icons'

/** "€1.499" — zonder centen, met Nederlandse duizendtallen. */
const euro = (n: number) => `€${n.toLocaleString('nl-NL')}`

const total = (p: Package) => p.items.reduce((sum, i) => sum + i.amount, 0)
const saving = (p: Package) => total(p) - p.price
/** Eerste getal uit de titel, bijvoorbeeld 20 uit "20 lessen van 60 minuten". */
const lessonCount = (p: Package) => p.title.match(/\d+/)?.[0] ?? ''

const waLink = (message: string) => ({
  href: whatsappHref(message),
  ...(site.contact.whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
})

export function Prices() {
  const { prices, packages } = site
  const best = packages.length > 1 ? packages.reduce((a, b) => (saving(b) > saving(a) ? b : a)) : null

  return (
    <section id="tarieven" aria-labelledby="tarieven-title" className="relative overflow-hidden bg-sky py-20 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-white/60" aria-hidden />
      <div className="pointer-events-none absolute right-[-10rem] bottom-[-10rem] size-[28rem] rounded-full bg-sky-deep/70" aria-hidden />

      <div className="container-site relative">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Tarieven</Eyebrow>
          <h2
            id="tarieven-title"
            className="mt-5 text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2.75rem]"
            data-reveal
          >
            Duidelijke prijzen, zelf kiezen hoe je lest.
          </h2>
          <p className="mt-5 text-muted" data-reveal>
            Kies voor losse lessen of voor een pakket. In de pakketten zit het praktijkexamen al
            inbegrepen en ben je voordeliger uit.
          </p>
        </div>

        {/* Pakketten */}
        {packages.length > 0 && (
          <ul className="mx-auto mt-14 grid max-w-5xl items-stretch gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} featured={pkg === best} delay={i * 90} />
            ))}
          </ul>
        )}

        {/* Losse lessen */}
        {prices.length > 0 && (
          <div className="mx-auto mt-14 max-w-5xl lg:mt-16">
            <div className="flex items-center gap-4">
              <h3 className="label shrink-0 text-subtle">Liever losse lessen?</h3>
              <span className="h-px flex-1 bg-navy/10" aria-hidden />
            </div>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:gap-8">
              {prices.map((price, i) => (
                <LessonCard key={price.label} price={price} delay={i * 90} />
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
        card: 'bg-navy text-paper shadow-[0_24px_50px_rgba(22,33,58,0.28)] md:-translate-y-3',
        muted: 'text-paper/60',
        line: 'border-white/12',
        tile: 'bg-white/10 text-white',
        chip: 'bg-white/10 text-paper',
        button: 'bg-signal text-white hover:bg-signal-deep',
        pill: 'bg-white/10 text-paper',
        save: 'bg-[#34c77b]/15 text-[#6fe3a5]',
        dash: 'bg-white/25',
      }
    : {
        card: 'bg-white text-ink shadow-lift ring-1 ring-navy/5',
        muted: 'text-muted',
        line: 'border-line',
        tile: 'bg-signal-soft text-signal-deep',
        chip: 'bg-sky text-navy',
        button: 'bg-navy text-white hover:bg-navy-soft',
        pill: 'bg-sky text-navy',
        save: 'bg-mint text-wa',
        dash: 'bg-navy/15',
      }
  const count = lessonCount(pkg)
  const rest = count ? pkg.title.replace(count, '').trim() : pkg.title

  return (
    <li
      className={`relative flex flex-col overflow-hidden rounded-[2rem] p-7 transition-transform duration-300 sm:p-9 ${t.card}`}
      data-reveal
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {featured && (
        <>
          <div className="pointer-events-none absolute -bottom-24 -left-16 size-60 rounded-full bg-navy-soft" aria-hidden />
        </>
      )}

      {/* Kop */}
      <div className="relative flex flex-wrap items-center justify-between gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-bold tracking-[0.14em] whitespace-nowrap uppercase ${t.pill}`}>
          {pkg.name}
        </span>
        {featured && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-signal px-3 py-1.5 text-xs font-bold whitespace-nowrap text-white shadow-[0_8px_20px_-8px_rgba(227,0,15,0.8)]">
            <Sparkles className="size-3.5" strokeWidth={2.4} />
            Meeste voordeel
          </span>
        )}
      </div>

      {/* Aantal lessen groot */}
      <div className="relative mt-7 flex items-end gap-4">
        {count && (
          <span className="font-display text-[4.25rem] leading-[0.8] font-bold tracking-[-0.05em] tabular-nums min-[380px]:text-[5rem] sm:text-[6rem]">
            {count}
          </span>
        )}
        <span className="pb-1 font-display text-[1.35rem] leading-tight font-semibold tracking-[-0.01em]">
          {rest}
        </span>
      </div>

      {/* Weg-strepen als scheiding */}
      <div className="relative mt-7 flex gap-2" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className={`h-1 flex-1 rounded-full ${t.dash}`} />
        ))}
      </div>

      {/* Inhoud */}
      <ul className="relative mt-7 space-y-3.5">
        {pkg.items.map((item, i) => {
          const Icon = i === 0 ? Car : BadgeCheck
          return (
            <li key={item.label} className="flex items-center gap-3.5">
              <span className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl ${t.tile}`}>
                <Icon className="size-5" strokeWidth={1.9} />
              </span>
              <span className="font-medium">{item.label}</span>
              <span className={`ml-auto shrink-0 rounded-lg px-2.5 py-1 text-sm tabular-nums ${t.chip}`}>
                {euro(item.amount)}
              </span>
            </li>
          )
        })}
      </ul>

      {/* Prijs */}
      <div className={`relative mt-8 flex flex-wrap items-end justify-between gap-4 border-t pt-7 ${t.line}`}>
        <div>
          <p className={`text-sm ${t.muted}`}>
            Los <span className="line-through">{euro(total(pkg))}</span>
          </p>
          <p className="mt-1 font-display text-[3rem] leading-none font-bold tracking-[-0.03em] tabular-nums">
            {euro(pkg.price)}
          </p>
        </div>
        <span className={`mb-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold ${t.save}`}>
          <Check className="size-4" strokeWidth={3} />
          {euro(saving(pkg))} voordeel
        </span>
      </div>

      <a
        {...waLink(`Hallo, ik heb interesse in ${pkg.name} (${pkg.title}) bij Autorijschool Yorulmaz.`)}
        className={`group relative mt-8 inline-flex min-h-13 items-center justify-center gap-2 rounded-xl px-6 font-semibold transition-colors ${t.button}`}
      >
        Kies {pkg.name.toLowerCase()}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </li>
  )
}

function LessonCard({ price, delay }: { price: Price; delay: number }) {
  return (
    <li
      className="group relative flex flex-wrap items-center gap-x-5 gap-y-4 rounded-[1.75rem] bg-white p-5 shadow-card ring-1 ring-navy/5 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:flex-nowrap sm:gap-6 sm:p-6"
      data-reveal
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      <Gauge minutes={price.minutes} />
      <div className="min-w-0 flex-1">
        <p className="label text-subtle">Losse les</p>
        <p className="mt-1.5 font-display text-[1.15rem] leading-snug font-semibold sm:text-[1.2rem]">{price.label}</p>
        <a
          {...waLink(`Hallo, ik wil graag een ${price.label.toLowerCase()} plannen bij Autorijschool Yorulmaz.`)}
          className="mt-2 hidden items-center gap-1.5 text-sm font-semibold text-signal-deep transition-colors hover:text-signal sm:inline-flex"
        >
          Les plannen
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </div>
      <div className="flex w-full items-center justify-between border-t border-line pt-4 sm:block sm:w-auto sm:shrink-0 sm:border-0 sm:pt-0 sm:text-right">
        <div>
          <p className="font-display text-[2rem] leading-none font-bold tracking-[-0.03em] tabular-nums sm:text-[2.2rem]">
            {euro(price.amount)}
          </p>
          <p className="mt-1 text-xs text-muted">per les</p>
        </div>
        <a
          {...waLink(`Hallo, ik wil graag een ${price.label.toLowerCase()} plannen bij Autorijschool Yorulmaz.`)}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-signal-soft px-4 text-sm font-semibold text-signal-deep sm:hidden"
        >
          Les plannen
          <ArrowRight className="size-3.5" />
        </a>
      </div>
    </li>
  )
}

/** Snelheidsmeter als klok: de naald wijst de lesduur aan (0–120 minuten). */
function Gauge({ minutes }: { minutes: number }) {
  const max = 120
  const r = 34
  const cx = 44
  const cy = 44
  const angle = (m: number) => Math.PI + (Math.min(m, max) / max) * Math.PI
  const point = (m: number, radius: number) => [cx + radius * Math.cos(angle(m)), cy + radius * Math.sin(angle(m))]
  const [ex, ey] = point(minutes, r)
  const [nx, ny] = point(minutes, r - 10)

  return (
    <div className="relative flex size-22 shrink-0 flex-col items-center justify-center rounded-2xl bg-navy sm:size-24" aria-hidden>
      <svg viewBox="0 0 88 56" className="w-[86%]">
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="6" strokeLinecap="round" />
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${ex} ${ey}`} fill="none" stroke="#e3000f" strokeWidth="6" strokeLinecap="round" />
        {[0, 30, 60, 90, 120].map((m) => {
          const [x1, y1] = point(m, r - 7)
          const [x2, y2] = point(m, r - 11)
          return <line key={m} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
        })}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="4" fill="#ffffff" />
      </svg>
      <p className="-mt-1 font-display text-lg leading-none font-bold text-white tabular-nums">
        {minutes}
        <span className="ml-0.5 text-[0.6rem] font-semibold tracking-wider text-white/60 uppercase">min</span>
      </p>
    </div>
  )
}
