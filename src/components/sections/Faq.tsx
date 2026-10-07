import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/content/faq'
import { Eyebrow } from '../Eyebrow'

export function Faq({ items, title = 'Veelgestelde vragen' }: { items: FaqItem[]; title?: string }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-sky py-20 sm:py-24 lg:py-28">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4">
          <Eyebrow>Vragen</Eyebrow>
          <h2
            id="faq-title"
            className="mt-5 text-[1.9rem] leading-[1.1] font-semibold tracking-[-0.02em] sm:text-[2.5rem]"
            data-reveal
          >
            {title}
          </h2>
          <p className="mt-5 max-w-sm text-muted" data-reveal>
            Staat je vraag er niet bij? Stuur ons gerust een bericht, dan helpen we je verder.
          </p>
        </div>

        <div className="space-y-3 lg:col-span-8" data-reveal>
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-line/70 bg-white shadow-card open:shadow-lift"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-[1.05rem] font-semibold transition-colors hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal sm:px-6 [&::-webkit-details-marker]:hidden">
                <h3>{item.question}</h3>
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-sky text-navy transition-transform duration-300 group-open:rotate-180">
                  <ChevronDown className="size-4" aria-hidden />
                </span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-muted sm:px-6">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
