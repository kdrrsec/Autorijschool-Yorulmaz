import { site, whatsappHref } from '@/content/site'

export type Lead = {
  subject: 'aanmelden' | 'vraag'
  name: string
  phone: string
  email: string
  interest: string
  message: string
}

const color = {
  navy: '#16213a',
  ink: '#0c121c',
  signal: '#e3000f',
  muted: '#5b6475',
  line: '#e4e8f0',
  sky: '#eef3fb',
  wa: '#1f8f4e',
}

function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** 06 12345678 / +31 6 ... / 0031 6 ... → 316... voor wa.me */
function toWhatsApp(phone: string) {
  let digits = phone.replace(/\D/g, '')
  if (digits.startsWith('00')) digits = digits.slice(2)
  else if (digits.startsWith('0')) digits = `31${digits.slice(1)}`
  return digits.length >= 10 ? digits : null
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('nl-NL', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Amsterdam',
  }).format(date)
}

function button(href: string, label: string, bg: string) {
  return `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;border-radius:10px;background:${bg};color:#ffffff;font-weight:600;font-size:15px;text-decoration:none;">${label}</a>`
}

/** Gedeelde opmaak: navy kop met logo, rode lijn, witte kaart. */
function layout({ title, preheader, body, footer }: { title: string; preheader: string; body: string; footer: string }) {
  const logo = `${site.url.replace(/\/$/, '')}/images/logo.png`
  return `<!doctype html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${color.sky};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${color.ink};">
  <div style="display:none;max-height:0;overflow:hidden;">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${color.sky};padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden;">
        <tr><td style="background:${color.navy};padding:28px 32px;">
          <img src="${esc(logo)}" width="150" alt="${esc(site.name)}" style="display:block;border:0;height:auto;max-width:150px;">
        </td></tr>
        <tr><td style="height:4px;background:${color.signal};line-height:4px;font-size:0;">&nbsp;</td></tr>
        ${body}
        <tr><td style="padding:24px 32px 28px;">
          <p style="margin:0;font-size:12px;line-height:1.6;color:${color.muted};border-top:1px solid ${color.line};padding-top:16px;">${footer}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function intro(eyebrow: string, heading: string, sub: string) {
  return `<tr><td style="padding:32px 32px 8px;">
          <p style="margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${color.signal};font-weight:700;">${eyebrow}</p>
          <h1 style="margin:0;font-size:26px;line-height:1.2;color:${color.ink};">${heading}</h1>
          ${sub ? `<p style="margin:10px 0 0;font-size:15px;line-height:1.6;color:${color.muted};">${sub}</p>` : ''}
        </td></tr>`
}

function detailRows(rows: [string, string][]) {
  return `<tr><td style="padding:20px 32px 4px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${color.line};border-radius:12px;">
            ${rows
              .map(
                ([label, value], i) => `<tr>
              <td style="padding:14px 16px;${i ? `border-top:1px solid ${color.line};` : ''}font-size:13px;color:${color.muted};width:110px;vertical-align:top;">${label}</td>
              <td style="padding:14px 16px;${i ? `border-top:1px solid ${color.line};` : ''}font-size:16px;font-weight:600;color:${color.ink};">${value}</td>
            </tr>`,
              )
              .join('')}
          </table>
        </td></tr>`
}

/** Mail naar de rijschool met alle ingevulde gegevens. */
export function buildLeadEmail(lead: Lead, receivedAt = new Date()) {
  const isSignup = lead.subject === 'aanmelden'
  const heading = isSignup ? 'Nieuwe aanmelding' : 'Nieuwe vraag'
  const subject = isSignup
    ? `Nieuwe aanmelding: ${lead.name}${lead.interest ? ` (${lead.interest})` : ''}`
    : `Nieuwe vraag van ${lead.name}`

  const rows: [string, string][] = [['Naam', esc(lead.name)]]
  if (lead.phone) rows.push(['Telefoon', `<a href="tel:${esc(lead.phone.replace(/[^\d+]/g, ''))}" style="color:${color.ink};">${esc(lead.phone)}</a>`])
  if (lead.email) rows.push(['E-mail', `<a href="mailto:${esc(lead.email)}" style="color:${color.ink};">${esc(lead.email)}</a>`])
  if (isSignup && lead.interest) rows.push(['Interesse', esc(lead.interest)])

  const wa = lead.phone ? toWhatsApp(lead.phone) : null
  const buttons: string[] = []
  if (lead.phone) buttons.push(button(`tel:${lead.phone.replace(/[^\d+]/g, '')}`, 'Bellen', color.navy))
  if (wa)
    buttons.push(
      button(`https://wa.me/${wa}?text=${encodeURIComponent(`Hoi ${lead.name}, bedankt voor je bericht aan ${site.name}!`)}`, 'WhatsApp', color.wa),
    )
  if (lead.email)
    buttons.push(button(`mailto:${lead.email}?subject=${encodeURIComponent(`Re: ${heading.toLowerCase()} bij ${site.name}`)}`, 'Mail terug', color.signal))

  const body = [
    intro('Via de website', esc(heading), esc(formatDate(receivedAt))),
    detailRows(rows),
    lead.message
      ? `<tr><td style="padding:20px 32px 4px;">
          <p style="margin:0 0 8px;font-size:13px;color:${color.muted};">Bericht</p>
          <div style="padding:16px 18px;background:${color.sky};border-left:3px solid ${color.signal};border-radius:8px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${esc(lead.message)}</div>
        </td></tr>`
      : '',
    buttons.length ? `<tr><td style="padding:24px 32px 8px;">${buttons.join('')}</td></tr>` : '',
  ].join('\n')

  const html = layout({
    title: subject,
    preheader: `${heading} van ${lead.name} via de website.`,
    body,
    footer: `Dit bericht is verstuurd via het formulier op de website van ${esc(site.name)}.${lead.email ? ' Beantwoorden gaat direct naar de afzender.' : ''}`,
  })

  const text = [
    `${heading} via de website`,
    formatDate(receivedAt),
    '',
    `Naam: ${lead.name}`,
    lead.phone && `Telefoon: ${lead.phone}`,
    lead.email && `E-mail: ${lead.email}`,
    isSignup && lead.interest && `Interesse: ${lead.interest}`,
    lead.message && `\nBericht:\n${lead.message}`,
  ]
    .filter(Boolean)
    .join('\n')

  return { subject, html, text }
}

/**
 * Alleen een veilige voornaam: letters, koppelteken en apostrof. Zo kan het
 * formulier niet misbruikt worden om eigen tekst of links naar een ander te mailen.
 */
function safeFirstName(name: string) {
  const first = name.trim().split(/\s+/)[0] ?? ''
  return /^[\p{L}][\p{L}'-]{0,29}$/u.test(first) ? first : ''
}

/** Alleen keuzes die echt in het formulier staan worden herhaald. */
function knownInterest(interest: string) {
  const options = [
    'Losse rijlessen',
    'Weet ik nog niet',
    ...site.packages.map((p) => `${p.name} (${p.title})`),
  ]
  return options.includes(interest) ? interest : ''
}

/** Bevestiging voor de leerling. Bevat bewust geen tekst die de bezoeker zelf heeft getypt. */
export function buildConfirmationEmail(lead: Lead) {
  const isSignup = lead.subject === 'aanmelden'
  const firstName = safeFirstName(lead.name)
  const interest = isSignup ? knownInterest(lead.interest) : ''
  const phone = /^[+\d][\d\s()-]{5,19}$/.test(lead.phone) ? lead.phone : ''
  const greeting = firstName ? `Bedankt, ${firstName}!` : 'Bedankt!'
  const subject = isSignup ? `Je aanmelding bij ${site.name} is binnen` : `We hebben je vraag ontvangen`
  const lead1 = isSignup
    ? 'We hebben je aanmelding voor rijlessen goed ontvangen. We nemen zo snel mogelijk contact met je op om je eerste les in te plannen.'
    : 'We hebben je vraag goed ontvangen en nemen zo snel mogelijk contact met je op.'

  const rows: [string, string][] = []
  if (interest) rows.push(['Je keuze', esc(interest)])
  if (phone) rows.push(['Telefoon', esc(phone)])

  const contact: string[] = []
  if (site.contact.whatsapp) contact.push(button(whatsappHref(), 'WhatsApp ons', color.wa))
  if (site.contact.phone) contact.push(button(`tel:${site.contact.phone.replace(/[^\d+]/g, '')}`, `Bel ${site.contact.phone}`, color.navy))

  const body = [
    intro(isSignup ? 'Aanmelding ontvangen' : 'Vraag ontvangen', esc(greeting), esc(lead1)),
    rows.length ? detailRows(rows) : '',
    contact.length
      ? `<tr><td style="padding:24px 32px 4px;">
          <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${color.ink};">Liever meteen contact? Stuur ons een WhatsApp of bel gerust.</p>
          ${contact.join('')}
        </td></tr>`
      : '',
    `<tr><td style="padding:16px 32px 0;">
          <p style="margin:0;font-size:15px;line-height:1.6;color:${color.ink};">Tot snel!<br><strong>${esc(site.name)}</strong><br><span style="color:${color.muted};">Met vertrouwen de weg op.</span></p>
        </td></tr>`,
  ].join('\n')

  const html = layout({
    title: subject,
    preheader: lead1,
    body,
    footer: `Je ontvangt deze e-mail omdat je het formulier op de website van ${esc(site.name)} hebt ingevuld. Heb je dit niet zelf gedaan? Dan kun je deze e-mail negeren.`,
  })

  const text = [
    greeting,
    '',
    lead1,
    interest && `\nJe keuze: ${interest}`,
    phone && `Telefoon: ${phone}`,
    '',
    site.contact.whatsapp && `WhatsApp: ${whatsappHref()}`,
    site.contact.phone && `Bellen: ${site.contact.phone}`,
    '',
    'Tot snel!',
    site.name,
  ]
    .filter((line): line is string => typeof line === 'string')
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')

  return { subject, html, text }
}
