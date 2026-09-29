import { ThumbsUp, UserRound } from 'lucide-react'
import { site } from '@/content/site'
import { Eyebrow } from '../Eyebrow'
import { PhotoFrame } from '../PhotoFrame'
import Image from 'next/image'
import lesauto from '../../../public/images/lesauto.webp'
import { Road } from '../illustrations/Deco'

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
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-sky-deep" data-reveal="image">
              <div className="absolute -top-16 -right-16 size-64 rounded-full bg-white/60" aria-hidden />
              <div className="absolute top-1/3 -left-10 size-24 rounded-full bg-white/40" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 h-[20%]">
                <Road className="h-full w-full" />
              </div>
              <Image
                src={lesauto}
                alt="De lesauto van Autorijschool Yorulmaz: een zwarte Volkswagen Polo met het Yorulmaz-logo en L-bord"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="absolute bottom-[7%] left-1/2 w-[98%] max-w-none -translate-x-1/2 drop-shadow-[0_18px_18px_rgba(12,18,28,0.35)]"
              />
              <div className="absolute top-5 left-5 rounded-2xl bg-white px-4 py-3 shadow-card">
                <p className="label text-subtle">Onze lesauto</p>
                <p className="mt-1 font-display font-semibold">Volkswagen Polo</p>
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
              plaatsen eromheen, in het verkeer waar je straks ook zelf in rijdt. Je lest in onze
              zwarte Volkswagen Polo, herkenbaar aan het Yorulmaz-logo en het L-bord op het dak.
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
