import { site } from '@/content/site'
import { Button } from '../Button'
import { Eyebrow } from '../Eyebrow'

export function Reviews() {
  const [featured, ...rest] = site.reviews

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-stone py-20 sm:py-28 lg:py-32">
      <div className="container-site">
        <Eyebrow>Reviews</Eyebrow>
        <h2
          id="reviews-title"
          className="mt-5 max-w-2xl text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2.75rem]"
          data-reveal
        >
          Ervaringen van leerlingen
        </h2>

        {featured ? (
          <>
            <figure className="mt-14 max-w-4xl lg:mt-20" data-reveal>
              <span
                className="block font-display text-[4.5rem] leading-[0.6] font-bold text-signal"
                aria-hidden
              >
                “
              </span>
              <blockquote className="mt-4 font-display text-[1.5rem] leading-[1.3] font-medium tracking-[-0.015em] sm:text-[2rem]">
                {featured.text}
              </blockquote>
              <ReviewAuthor review={featured} />
            </figure>

            {rest.length > 0 && (
              <div className="mt-16 grid gap-x-10 border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((review, i) => (
                  <figure
                    key={`${review.name}-${i}`}
                    className="border-b border-ink/15 py-8 sm:border-b-0 sm:pt-8"
                    data-reveal
                  >
                    <blockquote className="text-[1.05rem] leading-relaxed text-ink/85">
                      “{review.text}”
                    </blockquote>
                    <ReviewAuthor review={review} />
                  </figure>
                ))}
              </div>
            )}
          </>
        ) : (
          <div
            className="mt-12 grid gap-8 border-t border-ink/15 pt-8 lg:mt-16 lg:grid-cols-12 lg:gap-x-10"
            data-reveal
          >
            <p className="font-display text-[1.35rem] leading-snug font-medium tracking-[-0.01em] sm:text-[1.6rem] lg:col-span-7">
              Hier komen binnenkort de ervaringen van onze leerlingen te staan.
            </p>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-muted">
                Benieuwd hoe een les bij ons verloopt? Het beste antwoord krijg je in een proefles.
              </p>
              <div className="mt-6">
                <Button href="/#aanvragen" variant="outline">
                  Proefles aanvragen
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ReviewAuthor({ review }: { review: (typeof site.reviews)[number] }) {
  return (
    <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="font-semibold">{review.name}</span>
      {review.context && <span className="text-sm text-muted">{review.context}</span>}
      {review.source && <span className="label text-subtle">via {review.source}</span>}
    </figcaption>
  )
}
