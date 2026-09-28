import { whatsappHref, trialLessonMessage } from '@/content/site'
import { Button } from '../Button'

export function TrialCta() {
  return (
    <section id="proefles" aria-labelledby="proefles-title" className="bg-navy text-paper">
      <div className="container-site relative py-20 sm:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <p className="label text-signal" data-reveal>
              Proefles
            </p>
            <h2
              id="proefles-title"
              className="mt-5 text-[2.5rem] leading-[1] font-bold tracking-[-0.03em] sm:text-[3.5rem] lg:text-[4.25rem]"
              data-reveal
            >
              Klaar om te beginnen?
            </h2>
            <p className="mt-6 max-w-lg text-lg text-paper/70" data-reveal>
              Plan je eerste rijles en ontdek of Autorijschool Yorulmaz bij jou past.
            </p>
          </div>

          <div
            className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end"
            data-reveal
          >
            <Button href="/#aanvragen" variant="signal">
              Proefles aanvragen
            </Button>
            <Button href={whatsappHref(trialLessonMessage)} variant="outline-light" icon="whatsapp">
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
