import { whatsappHref, trialLessonMessage } from '@/content/site'
import { Button } from '../Button'
import { License3D } from '../illustrations/License3D'

export function TrialCta() {
  return (
    <section id="proefles" aria-labelledby="proefles-title" className="py-20 sm:py-24">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-12 text-paper sm:px-12 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -right-20 -bottom-32 size-96 rounded-full bg-navy-soft" aria-hidden />
          <div className="pointer-events-none absolute top-8 right-[38%] size-3 rounded-full bg-signal" aria-hidden />
          <div className="pointer-events-none absolute bottom-10 left-[46%] size-2 rounded-full bg-white/40" aria-hidden />

          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="label text-signal" data-reveal>
                Proefles
              </p>
              <h2
                id="proefles-title"
                className="mt-5 text-[2.4rem] leading-[1] font-bold tracking-[-0.03em] sm:text-[3.25rem] lg:text-[3.75rem]"
                data-reveal
              >
                Klaar om te beginnen?
              </h2>
              <p className="mt-6 max-w-lg text-lg text-paper/70" data-reveal>
                Plan je eerste rijles en ontdek of Autorijschool Yorulmaz bij jou past.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row" data-reveal>
                <Button href="/#aanvragen" variant="signal">
                  Proefles aanvragen
                </Button>
                <Button href={whatsappHref(trialLessonMessage)} variant="outline-light" icon="whatsapp">
                  WhatsApp
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
              <License3D uid="cta" className="mx-auto w-[88%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
