import { MessageSquareQuote, Star } from 'lucide-react'
import { site } from '@/content/site'
import { Button } from '../Button'
import { Eyebrow } from '../Eyebrow'
import { IconTile } from '../IconTile'
import { Student } from '../illustrations/People'

export function Reviews() {
  const reviews = site.reviews

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-sky py-20 sm:py-28 lg:py-32">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Reviews</Eyebrow>
          <h2
            id="reviews-title"
            className="mt-5 text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2.75rem]"
            data-reveal
          >
            Ervaringen van leerlingen
          </h2>
        </div>

        {reviews.length > 0 ? (
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <li
                key={`${review.name}-${i}`}
                className="flex flex-col rounded-3xl bg-white p-7 shadow-card"
                data-reveal
                style={{ '--reveal-delay': `${(i % 3) * 90}ms` } as React.CSSProperties}
              >
                {review.rating ? (
                  <div className="mb-4 flex gap-1 text-signal" role="img" aria-label={`${review.rating} van de 5 sterren`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className={`size-4 ${s < review.rating! ? 'fill-current' : 'opacity-30'}`} />
                    ))}
                  </div>
                ) : (
                  <MessageSquareQuote className="mb-4 size-6 text-signal" aria-hidden />
                )}
                <blockquote className=" flex-1 text-[1.05rem] leading-relaxed text-ink/85">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-signal-soft font-display font-bold text-signal-deep">
                    {review.name.charAt(0)}
                  </span>
                  <span className="leading-tight">
                    <span className="block font-semibold">{review.name}</span>
                    {(review.context || review.source) && (
                      <span className="block text-sm text-muted">
                        {[review.context, review.source && `via ${review.source}`].filter(Boolean).join(' · ')}
                      </span>
                    )}
                  </span>
                </figcaption>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="relative mx-auto mt-12 grid max-w-4xl items-center gap-8 overflow-hidden rounded-[2rem] bg-white p-7 shadow-card sm:p-10 md:grid-cols-[1fr_auto] lg:mt-16"
            data-reveal
          >
            <div>
              <IconTile icon={MessageSquareQuote} tone="signal" />
              <p className="mt-6 font-display text-[1.35rem] leading-snug font-medium tracking-[-0.01em] sm:text-[1.6rem]">
                Hier komen binnenkort de ervaringen van onze leerlingen te staan.
              </p>
              <p className="mt-3 max-w-md text-muted">
                Benieuwd hoe een les bij ons verloopt? Het beste antwoord krijg je in een proefles.
              </p>
              <div className="mt-7">
                <Button href="/#aanvragen">Proefles aanvragen</Button>
              </div>
            </div>
            <Student className="mx-auto hidden w-40 md:block lg:w-48" />
          </div>
        )}
      </div>
    </section>
  )
}
