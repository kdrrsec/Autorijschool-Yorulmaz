import { Button } from '../Button'
import { Eyebrow } from '../Eyebrow'

const steps = [
  {
    title: 'Kennismaken',
    text: 'In de proefles leren we elkaar kennen. Je rijdt meteen een stukje en we bespreken wat je nodig hebt.',
  },
  {
    title: 'Basisvaardigheden',
    text: 'Sturen, optrekken, remmen en goed om je heen kijken. De bediening moet vanzelf gaan voordat we het drukkere verkeer in gaan.',
  },
  {
    title: 'Verkeersinzicht',
    text: 'Kruispunten, rotondes, voorrang en de snelweg. Je leert vooruitkijken en het verkeer om je heen lezen.',
  },
  {
    title: 'Zelfstandig rijden',
    text: 'Je kiest zelf de route en neemt je eigen beslissingen. Je instructeur grijpt alleen in als het echt nodig is.',
  },
  {
    title: 'Voorbereiden op het examen',
    text: 'We oefenen examenroutes, bijzondere verrichtingen en de gang van zaken bij het CBR. Zo weet je wat je te wachten staat.',
  },
]

export function Lessons() {
  return (
    <section
      id="rijlessen"
      aria-labelledby="rijlessen-title"
      className="bg-ink py-20 text-paper sm:py-28 lg:py-32"
    >
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow tone="light">Rijlessen</Eyebrow>
            <h2
              id="rijlessen-title"
              className="mt-5 text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2.75rem] lg:text-[3.1rem]"
              data-reveal
            >
              Leren rijden op jouw tempo
            </h2>
            <p className="mt-6 max-w-md text-paper/70" data-reveal>
              De een heeft al eens op een parkeerplaats gereden, de ander zit voor het eerst achter
              het stuur. Daarom bouwen we de lessen rustig op, in vijf fases. Je gaat pas naar de
              volgende stap als de vorige goed gaat.
            </p>
            <div className="mt-9" data-reveal>
              <Button href="/#aanvragen" variant="signal">
                Proefles aanvragen
              </Button>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[2.75rem_1fr] gap-x-4 border-t border-paper/15 py-7 last:border-b sm:grid-cols-[4.5rem_1fr] sm:py-9"
              data-reveal
            >
              <span className="pt-1 font-display text-sm font-semibold text-signal tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[1.35rem] leading-tight font-semibold tracking-[-0.01em] sm:text-[1.6rem]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-lg text-paper/65">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
