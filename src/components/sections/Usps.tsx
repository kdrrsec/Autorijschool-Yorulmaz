import { Eyebrow } from '../Eyebrow'

const usps = [
  {
    title: 'Persoonlijke begeleiding',
    text: 'Je instructeur weet wat al goed gaat en waar nog aandacht nodig is. Iedere les gaat verder waar de vorige ophield.',
  },
  {
    title: 'Flexibele lestijden',
    text: 'Lessen plannen we in overleg, zodat ze passen naast school, werk of andere verplichtingen.',
  },
  {
    title: 'Duidelijke communicatie',
    text: 'Na iedere les weet je wat goed ging en waar we de volgende keer aan werken. Geen vage beloftes.',
  },
  {
    title: 'Stap voor stap leren rijden',
    text: 'Eerst de basis, dan het verkeer, dan zelfstandig. Je gaat pas door als je er echt klaar voor bent.',
  },
]

export function Usps() {
  return (
    <section aria-labelledby="usps-title" className="bg-stone py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Zo werken wij</Eyebrow>
            <h2
              id="usps-title"
              className="mt-5 max-w-xl text-[1.85rem] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-[2.3rem]"
              data-reveal
            >
              Wat je van ons mag verwachten
            </h2>
          </div>
        </div>

        <ol className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {usps.map((usp, i) => (
            <li
              key={usp.title}
              className="grid grid-cols-[3.25rem_1fr] gap-x-2 border-t border-ink/15 py-7 sm:block sm:pt-6 sm:pb-10"
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
            >
              <span className="font-display text-[1.6rem] leading-none font-light text-signal-deep tabular-nums sm:text-[2.75rem]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="sm:mt-10">
                <h3 className="text-[1.2rem] leading-snug font-semibold tracking-[-0.01em]">
                  {usp.title}
                </h3>
                <p className="mt-2.5 text-[0.975rem] leading-relaxed text-muted">{usp.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
