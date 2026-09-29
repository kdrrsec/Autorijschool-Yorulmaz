import { site, whatsappHref } from '@/content/site'
import { ContactForm } from '../ContactForm'
import { Eyebrow } from '../Eyebrow'
import { Mail, MapPin, Phone, WhatsApp } from '../Icons'

export function Contact() {
  const { phone, whatsapp, email } = site.contact

  const rows = [
    {
      icon: <MapPin />,
      label: 'Lesgebied',
      value: site.region,
      href: null,
    },
    {
      icon: <Phone />,
      label: 'Telefoon',
      value: phone,
      href: phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : null,
    },
    {
      icon: <WhatsApp />,
      label: 'WhatsApp',
      value: whatsapp ? 'Stuur een bericht' : null,
      href: whatsapp ? whatsappHref() : null,
    },
    {
      icon: <Mail />,
      label: 'E-mail',
      value: email,
      href: email ? `mailto:${email}` : null,
    },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28 lg:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Eyebrow>Contact</Eyebrow>
          <h2
            id="contact-title"
            className="mt-5 text-[2.1rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2.75rem]"
            data-reveal
          >
            Neem contact op
          </h2>
          <p className="mt-6 max-w-md text-muted" data-reveal>
            Een vraag over rijlessen of meteen een proefles plannen? Stuur een bericht, bel of vul
            het formulier in. Je krijgt zo snel mogelijk antwoord.
          </p>

          <div className="mt-10" data-reveal>
            <ul className="grid gap-3">
              {rows.map((row, i) => (
                <li key={row.label} className="flex items-center gap-4 rounded-2xl border border-line/70 bg-white p-3 pr-4 shadow-card">
                  <span className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${['bg-sky-deep text-blue', 'bg-signal-soft text-signal-deep', 'bg-mint text-wa', 'bg-rose text-[#a8336b]'][i]}`}>
                    {row.icon}
                  </span>
                  <span className="label w-20 shrink-0 text-subtle sm:w-24">{row.label}</span>
                  {row.value && row.href ? (
                    <a
                      href={row.href}
                      {...(row.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="min-w-0 truncate font-medium underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span className={row.value ? 'font-medium' : 'text-subtle italic'}>
                      {row.value ?? 'Volgt binnenkort'}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="aanvragen" className="scroll-mt-24 lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
