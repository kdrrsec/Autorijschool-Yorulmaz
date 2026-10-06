import { ThumbsUp, UserRound } from 'lucide-react'
import { site } from '@/content/site'
import { Eyebrow } from '../Eyebrow'
import { PhotoFrame } from '../PhotoFrame'
import Image from 'next/image'
import lesauto from '../../../public/images/lesauto.webp'

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
            <div
              className="relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#f3f6fb] via-[#e6edf7] to-[#d3deee]"
              data-reveal="image"
            >
              {/* Studio-achtergrond: zachte lichtbundel en vloer met horizon */}
              <div className="absolute inset-x-[-10%] top-[-20%] h-[70%] rounded-[50%] bg-white/70 blur-3xl" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent via-[#cad6e8] to-[#b9c8df]" aria-hidden />
              {/* Contactschaduw onder de auto */}
              {/* Schaduwen in het perspectief van de foto: achterwiel staat hoger dan voorwiel */}
              <span className="absolute h-[7%] w-[86%] rounded-[50%] bg-[#0c121c]/35 blur-xl" style={{ left: '46%', bottom: '17%', transform: 'translate(-50%, 50%) rotate(5.6deg)' }} aria-hidden />
              <span className="absolute h-[2.6%] w-[70%] rounded-[50%] bg-[#0c121c]/55 blur-[6px]" style={{ left: '42%', bottom: '17.4%', transform: 'translate(-50%, 50%) rotate(5.6deg)' }} aria-hidden />
              <span className="absolute h-[2.4%] w-[13%] rounded-[50%] bg-[#0c121c]/80 blur-[3px]" style={{ left: '11.7%', bottom: '20.2%', transform: 'translate(-50%, 50%)' }} aria-hidden />
              <span className="absolute h-[2.8%] w-[15%] rounded-[50%] bg-[#0c121c]/85 blur-[3px]" style={{ left: '72%', bottom: '14.3%', transform: 'translate(-50%, 50%)' }} aria-hidden />
              <Image
                src={lesauto}
                alt="De lesauto van Autorijschool Yorulmaz: een zwarte Volkswagen Polo met het Yorulmaz-logo en L-bord"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="absolute bottom-[14%] left-1/2 w-[96%] max-w-none -translate-x-1/2"
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
              Autorijschool Yorulmaz is een rijschool uit Giesbeek. We geven les in Doesburg, Giesbeek en de
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
