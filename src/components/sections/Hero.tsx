import { site, whatsappHref, trialLessonMessage } from '@/content/site'
import { Button } from '../Button'
import { PhotoFrame } from '../PhotoFrame'

const facts = [
  { label: 'Lesgebied', value: 'Doesburg en omgeving' },
  { label: 'Tarieven', value: 'Losse lessen, geen pakketten' },
  { label: 'Aanmelden', value: 'Via WhatsApp of het formulier' },
]

export function Hero() {
  return (
    <section id="home" className="pt-16 lg:pt-[4.5rem]" aria-labelledby="hero-title">
      <div className="container-site grid items-end gap-y-10 pt-10 pb-12 sm:pt-14 lg:grid-cols-12 lg:gap-x-10 lg:pt-20 lg:pb-20">
        <div className="lg:col-span-7 lg:pb-10">
          <p className="label flex items-center gap-3 text-muted" data-reveal>
            <span className="h-px w-6 bg-signal" aria-hidden />
            Autorijschool in {site.city}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.6rem] leading-[1.02] font-bold tracking-[-0.025em] sm:text-[3.4rem] lg:text-[3.5rem] xl:text-[4rem]"
            data-reveal
            style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
          >
            Zeker de weg op.
            <span className="mt-1 block font-normal text-ink/45">
              Stap voor stap naar je rijbewijs.
            </span>
          </h1>

          <p
            className="mt-7 max-w-[34rem] text-lg leading-relaxed text-muted sm:text-[1.2rem]"
            data-reveal
            style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
          >
            Persoonlijke rijlessen in Doesburg en omgeving. Rustig uitgelegd, op jouw tempo en met
            een duidelijk plan richting het examen.
          </p>

          <div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            data-reveal
            style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
          >
            <Button href="/#aanvragen">Proefles aanvragen</Button>
            <Button href={whatsappHref(trialLessonMessage)} variant="whatsapp" icon="whatsapp">
              WhatsApp
            </Button>
          </div>
        </div>

        <div className="relative -mx-5 sm:mx-0 lg:col-span-5">
          <PhotoFrame
            photo={site.photos.hero}
            placeholder="road"
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5]"
          />
          <div className="absolute bottom-0 left-0 hidden bg-paper py-4 pr-6 pl-0 sm:block lg:-left-px">
            <p className="label text-subtle">Lesgebied</p>
            <p className="mt-1.5 font-display text-lg font-semibold">{site.region}</p>
          </div>
        </div>
      </div>

      <div className="border-y border-line">
        <dl className="container-site grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {facts.map((f) => (
            <div key={f.label} className="flex items-baseline justify-between gap-4 py-4 sm:block sm:px-6 sm:py-6 sm:first:pl-0">
              <dt className="label text-subtle">{f.label}</dt>
              <dd className="text-right text-[0.975rem] font-medium sm:mt-2 sm:text-left">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
