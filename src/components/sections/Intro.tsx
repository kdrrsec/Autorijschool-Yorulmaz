import Link from 'next/link'
import { Eyebrow } from '../Eyebrow'
import { ArrowRight } from '../Icons'
import { Instructor, Student } from '../illustrations/People'
import { Cone, Road, TrafficLight } from '../illustrations/Deco'

export function Intro() {
  return (
    <section aria-labelledby="intro-title">
      <div className="container-site">
        <div className="grid items-start gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-x-10 lg:py-28">
          <div className="lg:col-span-6">
            <Eyebrow>Autorijschool Yorulmaz</Eyebrow>
            <h2
              id="intro-title"
              className="mt-5 text-[2rem] leading-[1.08] font-semibold tracking-[-0.02em] sm:text-[2.6rem] lg:text-[3rem]"
              data-reveal
            >
              Persoonlijke rijlessen in Doesburg en omgeving
            </h2>

            {/* Instructeur en leerling onderweg */}
            <div
              className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[2rem] bg-sky sm:aspect-[16/8] lg:mt-12"
              data-reveal="image"
            >
              <div className="absolute -top-12 -right-12 size-48 rounded-full bg-sky-deep" aria-hidden />
              <div className="absolute top-8 right-[30%] size-14 rounded-full bg-white/70" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 h-[20%]">
                <Road className="h-full w-full" />
              </div>
              <TrafficLight className="absolute bottom-[14%] left-[7%] w-[7%]" />
              <Instructor className="absolute bottom-[5%] left-[22%] w-[22%]" />
              <Student className="absolute bottom-[5%] left-[50%] w-[22%]" />
              <Cone className="absolute right-[8%] bottom-[6%] w-[8%]" />
              <div className="absolute top-4 left-4 rounded-2xl bg-white px-3.5 py-2.5 shadow-card sm:top-5 sm:left-5">
                <p className="text-sm font-bold">Samen naar je rijbewijs</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-12" data-reveal>
            <p className="text-[1.15rem] leading-relaxed text-ink/85">
              Leren rijden doe je niet in een paar lessen, en niet iedereen leert op dezelfde manier.
              Daarom krijg je bij Autorijschool Yorulmaz uitleg die bij jou past, lessen die rustig
              opbouwen en na iedere les een eerlijk beeld van waar je staat.
            </p>
            <p className="mt-5 text-muted">
              Het doel is niet alleen slagen, maar daarna ook zelfstandig en veilig blijven rijden.
            </p>
            <Link
              href="/#over-ons"
              className="group mt-8 inline-flex items-center gap-2 border-b-2 border-signal pb-1 font-semibold transition-colors hover:border-navy"
            >
              Over Yorulmaz
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
