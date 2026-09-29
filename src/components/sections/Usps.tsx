import { CalendarClock, HeartHandshake, MessagesSquare, Route } from 'lucide-react'
import { Eyebrow } from '../Eyebrow'
import { IconTile, type Tone } from '../IconTile'

const usps: { title: string; text: string; icon: typeof Route; tone: Tone }[] = [
  {
    title: 'Persoonlijke begeleiding',
    text: 'Je instructeur weet wat al goed gaat en waar nog aandacht nodig is. Iedere les gaat verder waar de vorige ophield.',
    icon: HeartHandshake,
    tone: 'rose',
  },
  {
    title: 'Flexibele lestijden',
    text: 'Lessen plannen we in overleg, zodat ze passen naast school, werk of andere verplichtingen.',
    icon: CalendarClock,
    tone: 'sky',
  },
  {
    title: 'Duidelijke communicatie',
    text: 'Na iedere les weet je wat goed ging en waar we de volgende keer aan werken. Geen vage beloftes.',
    icon: MessagesSquare,
    tone: 'mint',
  },
  {
    title: 'Stap voor stap leren rijden',
    text: 'Eerst de basis, dan het verkeer, dan zelfstandig. Je gaat pas door als je er echt klaar voor bent.',
    icon: Route,
    tone: 'signal',
  },
]

export function Usps() {
  return (
    <section aria-labelledby="usps-title" className="py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Waarom Yorulmaz</Eyebrow>
          <h2
            id="usps-title"
            className="mt-5 text-[1.9rem] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-[2.5rem]"
            data-reveal
          >
            Wat je van ons mag verwachten
          </h2>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {usps.map((usp, i) => (
            <li
              key={usp.title}
              className="group rounded-3xl border border-line/70 bg-white p-6 shadow-card transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7"
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
            >
              <IconTile icon={usp.icon} tone={usp.tone} />
              <h3 className="mt-6 text-[1.2rem] leading-snug font-semibold tracking-[-0.01em]">
                {usp.title}
              </h3>
              <p className="mt-2.5 text-[0.975rem] leading-relaxed text-muted">{usp.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
