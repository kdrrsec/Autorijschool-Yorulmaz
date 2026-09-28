import { site } from '@/content/site'
import { Eyebrow } from '../Eyebrow'
import { PhotoFrame } from '../PhotoFrame'

export function About() {
  const { instructor } = site
  const details = [
    instructor.name && { label: 'Instructeur', value: instructor.name },
    instructor.experience && { label: 'Ervaring', value: instructor.experience },
    { label: 'Lesgebied', value: site.region },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <section id="over-ons" aria-labelledby="over-ons-title" className="py-20 sm:py-28 lg:py-36">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <PhotoFrame
            photo={instructor.photo}
            placeholder="monogram"
            sizes="(min-width: 1024px) 38vw, 100vw"
            className={`${instructor.photo ? 'aspect-[4/5]' : 'aspect-[16/10]'} sm:aspect-[4/3] lg:aspect-[4/5]`}
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
          <Eyebrow>Over ons</Eyebrow>
          <h2
            id="over-ons-title"
            className="mt-5 text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2.75rem]"
            data-reveal
          >
            Rustig, duidelijk en eerlijk.
          </h2>

          <div className="mt-7 space-y-5 text-ink/85" data-reveal>
            {instructor.bio && <p className="text-[1.15rem] leading-relaxed">{instructor.bio}</p>}
            <p>
              Autorijschool Yorulmaz is een rijschool uit Doesburg. We geven les in Doesburg en de
              plaatsen eromheen, in het verkeer waar je straks ook zelf in rijdt.
            </p>
            <p>
              Een goede rijles is wat ons betreft rustig en duidelijk. Je mag fouten maken, vragen
              stellen en iets nog een keer proberen. Zo bouw je het vertrouwen op dat je nodig hebt:
              op het examen, maar vooral daarna.
            </p>
          </div>

          <blockquote
            className="mt-10 border-l-2 border-signal pl-5 font-display text-[1.35rem] leading-snug font-medium tracking-[-0.01em] sm:text-[1.55rem]"
            data-reveal
          >
            Een goede rijles voelt niet als een examen. Je leert het meest als je je op je gemak
            voelt.
          </blockquote>

          <dl className="mt-10 grid border-t border-line sm:grid-cols-2" data-reveal>
            {details.map((d) => (
              <div key={d.label} className="border-b border-line py-4 sm:pr-6">
                <dt className="label text-subtle">{d.label}</dt>
                <dd className="mt-1.5 font-medium">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
