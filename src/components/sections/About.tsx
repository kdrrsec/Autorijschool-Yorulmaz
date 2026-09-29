import { ThumbsUp, UserRound } from 'lucide-react'
import { site } from '@/content/site'
import { Eyebrow } from '../Eyebrow'
import { PhotoFrame } from '../PhotoFrame'
import { Instructor, Student } from '../illustrations/People'
import { RoadSign } from '../illustrations/Deco'

export function About() {
  const { instructor } = site
  const details = [
    instructor.name && { label: 'Instructeur', value: instructor.name, icon: UserRound },
    instructor.experience && { label: 'Ervaring', value: instructor.experience, icon: ThumbsUp },
  ].filter(Boolean) as { label: string; value: string; icon: typeof UserRound }[]

  return (
    <section id="over-ons" aria-labelledby="over-ons-title" className="py-20 sm:py-28 lg:py-32">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          {instructor.photo ? (
            <PhotoFrame
              photo={instructor.photo}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="aspect-[4/5] rounded-3xl"
            />
          ) : (
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-signal-soft sm:aspect-[4/3] lg:aspect-[4/5]" data-reveal="image">
              <div className="absolute -top-10 -left-10 size-56 rounded-full bg-white/60" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[#ffd3d7]" aria-hidden />
              <RoadSign className="absolute bottom-[14%] left-[8%] w-[13%]" />
              <Instructor className="absolute bottom-[4%] left-[20%] w-[34%] sm:w-[28%] lg:left-[18%] lg:w-[40%]" />
              <Student className="absolute right-[6%] bottom-[4%] w-[34%] sm:right-[16%] sm:w-[28%] lg:right-[4%] lg:w-[40%]" />
              <div className="absolute top-5 left-5 rounded-2xl bg-white px-4 py-3 shadow-card">
                <p className="text-sm font-bold">Samen naar je rijbewijs</p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
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

          {details.length > 0 && (
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4" data-reveal>
            {details.map((d) => {
              const Icon = d.icon
              return (
                <div key={d.label} className="flex items-center gap-3">
                  <Icon className="size-5 text-signal-deep" strokeWidth={2} aria-hidden />
                  <dt className="sr-only">{d.label}</dt>
                  <dd className="font-medium">{d.value}</dd>
                </div>
              )
            })}
          </dl>
          )}
        </div>
      </div>
    </section>
  )
}
