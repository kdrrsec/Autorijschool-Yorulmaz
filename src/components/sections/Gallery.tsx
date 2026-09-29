import { site } from '@/content/site'
import { Eyebrow } from '../Eyebrow'
import { ArrowUpRight } from '../Icons'
import { PhotoFrame } from '../PhotoFrame'

export function Gallery() {
  const [large, small1, small2] = site.photos.gallery
  // Zonder echte foto's tonen we deze sectie niet.
  if (!site.photos.gallery.some(Boolean)) return null

  return (
    <section aria-labelledby="fotos-title" className="py-20 sm:py-28 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>In beeld</Eyebrow>
            <h2
              id="fotos-title"
              className="mt-5 text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2.75rem]"
              data-reveal
            >
              Onderweg met Yorulmaz
            </h2>
          </div>
          {site.contact.instagram && (
            <a
              href={site.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 self-start border-b border-ink/25 pb-1 font-semibold transition-colors hover:border-ink sm:self-auto"
            >
              Meer op Instagram
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <PhotoFrame
            photo={large}
            placeholder="lines-dark"
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="col-span-2 aspect-[4/3] rounded-3xl lg:col-span-7 lg:row-span-2 lg:aspect-auto lg:min-h-[36rem]"
          />
          <PhotoFrame
            photo={small1}
            placeholder="road-light"
            sizes="(min-width: 1024px) 38vw, 50vw"
            className="aspect-square rounded-3xl sm:aspect-[4/3] lg:col-span-5 lg:aspect-[16/10]"
          />
          <PhotoFrame
            photo={small2}
            placeholder="lines"
            sizes="(min-width: 1024px) 30vw, 50vw"
            className="aspect-square rounded-3xl sm:aspect-[4/3] lg:col-span-5 lg:col-start-8 lg:aspect-[16/10]"
          />
        </div>
      </div>
    </section>
  )
}
