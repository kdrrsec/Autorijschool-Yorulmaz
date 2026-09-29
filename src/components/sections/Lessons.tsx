import { Car, GraduationCap, Handshake, Navigation, Signpost } from 'lucide-react'
import { Button } from '../Button'
import { Eyebrow } from '../Eyebrow'

const steps = [
  {
    title: 'Kennismaken',
    text: 'In de proefles leren we elkaar kennen. Je rijdt meteen een stukje en we bespreken wat je nodig hebt.',
    icon: Handshake,
  },
  {
    title: 'Basisvaardigheden',
    text: 'Sturen, optrekken, remmen en goed om je heen kijken. De bediening moet vanzelf gaan voordat we het drukkere verkeer in gaan.',
    icon: Car,
  },
  {
    title: 'Verkeersinzicht',
    text: 'Kruispunten, rotondes, voorrang en de snelweg. Je leert vooruitkijken en het verkeer om je heen lezen.',
    icon: Signpost,
  },
  {
    title: 'Zelfstandig rijden',
    text: 'Je kiest zelf de route en neemt je eigen beslissingen. Je instructeur grijpt alleen in als het echt nodig is.',
    icon: Navigation,
  },
  {
    title: 'Klaar voor het examen',
    text: 'We oefenen examenroutes, bijzondere verrichtingen en de gang van zaken bij het CBR. Zo weet je wat je te wachten staat.',
    icon: GraduationCap,
  },
]

export function Lessons() {
  return (
    <section
      id="rijlessen"
      aria-labelledby="rijlessen-title"
      className="relative overflow-hidden bg-navy py-20 text-paper sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute -top-40 -right-40 size-[30rem] rounded-full bg-navy-soft/60" aria-hidden />
      <div className="container-site relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow tone="light">Rijlessen</Eyebrow>
            <h2
              id="rijlessen-title"
              className="mt-5 text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2.75rem] lg:text-[3.1rem]"
              data-reveal
            >
              Leren rijden op jouw tempo
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-paper/70" data-reveal>
              De een heeft al eens op een parkeerplaats gereden, de ander zit voor het eerst achter
              het stuur. Daarom bouwen we de lessen rustig op, in vijf stappen.
            </p>
          </div>
        </div>

        <div className="relative mt-14 lg:mt-20">
        {/* Stippellijn als verbindende weg (desktop) */}
        <div aria-hidden className="pointer-events-none absolute top-8 right-[10%] left-[10%] hidden border-t-[3px] border-dashed border-signal/50 lg:block" />
        <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <li
                key={step.title}
                className="relative rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-[1px] lg:bg-transparent lg:p-0 lg:text-center lg:ring-0"
                data-reveal
                style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}
              >
                <div className="flex items-center gap-4 lg:flex-col lg:gap-0">
                  <span className="relative inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-signal text-white shadow-[0_10px_30px_-10px_rgba(215,38,61,0.7)]">
                    <Icon className="size-7" strokeWidth={1.9} />
                    <span className="absolute -top-2 -right-2 inline-flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-navy tabular-nums">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="text-[1.2rem] leading-tight font-semibold tracking-[-0.01em] lg:mt-6">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/65">{step.text}</p>
              </li>
            )
          })}
        </ol>
        </div>

        <div className="mt-14 flex justify-center" data-reveal>
          <Button href="/#aanvragen" variant="signal">
            Proefles aanvragen
          </Button>
        </div>
      </div>
    </section>
  )
}
