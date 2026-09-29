import { Check, Package } from 'lucide-react'
import { site, whatsappHref, signupMessage } from '@/content/site'
import { Button } from '../Button'
import { PhotoFrame } from '../PhotoFrame'
import { License3D } from '../illustrations/License3D'
import Image from 'next/image'
import lesautoZij from '../../../public/images/lesauto-zij.webp'
import { Cone, Road, TrafficLight } from '../illustrations/Deco'

const checks = ['Rijles vanaf €60', 'Pakketten incl. praktijkexamen', 'Lesgebied Doesburg e.o.']

export function Hero() {
  return (
    <section id="home" className="pt-16 lg:pt-[4.5rem]" aria-labelledby="hero-title">
      <div className="relative overflow-hidden bg-sky">
        {/* Zachte achtergrondvormen */}
        <div className="pointer-events-none absolute -top-32 -right-24 size-[34rem] rounded-full bg-sky-deep/70" aria-hidden />
        <div className="pointer-events-none absolute top-40 -left-40 size-80 rounded-full bg-white/60" aria-hidden />
        {!site.photos.hero && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 lg:h-32">
            <Road className="h-full w-full" />
          </div>
        )}

        <div className="container-site relative grid items-center gap-y-6 pt-10 pb-0 sm:pt-14 lg:grid-cols-12 lg:gap-x-8 lg:pt-16">
          <div className="lg:col-span-6 lg:pb-44">
            <h1
              id="hero-title"
              className="text-[2.5rem] leading-[1.03] font-bold tracking-[-0.025em] sm:text-[3.3rem] lg:text-[3.4rem] xl:text-[3.9rem]"
              data-reveal
              style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            >
              Met <span className="text-signal">vertrouwen</span> de weg op.
              <span className="mt-1 block text-navy/55">
                Stap voor stap naar je <span className="relative whitespace-nowrap text-navy">rijbewijs.<span className="absolute inset-x-0 -bottom-1 h-2 -rotate-1 rounded-full bg-signal/80" aria-hidden /></span>
              </span>
            </h1>

            <p
              className="mt-7 max-w-[34rem] text-lg leading-relaxed text-muted"
              data-reveal
              style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
            >
              Rustig uitgelegd, op jouw tempo en met een duidelijk plan richting het examen. Zo
              haal je niet alleen je rijbewijs, maar rijd je daarna ook zelfverzekerd verder.
            </p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2" data-reveal style={{ '--reveal-delay': '200ms' } as React.CSSProperties}>
              {checks.map((c) => (
                <li key={c} className="flex items-center gap-2.5 text-[0.975rem] font-medium">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-wa text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>

            <div
              className="mt-9 flex flex-col gap-3 sm:flex-row"
              data-reveal
              style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
            >
              <Button href="/#tarieven">Bekijk tarieven</Button>
              <Button href={whatsappHref(signupMessage)} variant="whatsapp" icon="whatsapp">
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Illustratie */}
          <div className="relative lg:col-span-6 lg:self-end">
            {site.photos.hero ? (
              <PhotoFrame
                photo={site.photos.hero}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="mb-10 aspect-[4/3] rounded-3xl shadow-lift"
              />
            ) : (
              <div className="relative mx-auto aspect-[6/5] w-full max-w-[36rem]">
                <TrafficLight className="absolute bottom-[5rem] left-[2%] w-[8%] lg:bottom-[7rem]" />
                <Cone className="absolute right-[3%] bottom-2 w-[9%] lg:bottom-3" />
                <div className="absolute bottom-[2.7rem] left-[13%] w-[74%] animate-drive lg:bottom-[3.8rem]">
                  <div className="absolute inset-x-[4%] -bottom-[3%] h-[9%] rounded-[50%] bg-[#05070b]/55 blur-md" aria-hidden />
                  <Image
                    src={lesautoZij}
                    alt="De lesauto van Autorijschool Yorulmaz: zwarte Volkswagen Polo met logo en L-bord"
                    priority
                    sizes="(min-width: 1024px) 480px, 80vw"
                    className="relative h-auto w-full"
                  />
                </div>
                <License3D className="absolute -top-[4%] right-0 w-[50%]" />

                <div className="absolute -top-[20%] left-[4%] hidden animate-float items-center xl:flex gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
                    <Package className="size-5" strokeWidth={2} />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-bold">Lespakketten</span>
                    <span className="block text-xs text-muted">Incl. praktijkexamen</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
