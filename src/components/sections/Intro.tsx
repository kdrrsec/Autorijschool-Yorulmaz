import Link from 'next/link'
import { Eyebrow } from '../Eyebrow'
import { ArrowRight } from '../Icons'

export function Intro() {
  return (
    <section aria-labelledby="intro-title">
      <div className="container-site">
        <div className="grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:gap-x-10 lg:py-28">
          <div className="lg:col-span-6">
            <Eyebrow>Autorijschool Yorulmaz</Eyebrow>
            <h2
              id="intro-title"
              className="mt-5 text-[2rem] leading-[1.08] font-semibold tracking-[-0.02em] sm:text-[2.6rem] lg:text-[3rem]"
              data-reveal
            >
              Persoonlijke rijlessen in Doesburg en omgeving
            </h2>
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
