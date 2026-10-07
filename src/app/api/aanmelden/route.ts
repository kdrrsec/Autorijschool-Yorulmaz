import { NextResponse } from 'next/server'
import { buildConfirmationEmail, buildLeadEmail, type Lead } from '@/lib/lead-email'

/**
 * Ontvangt het contactformulier en verstuurt het als nette e-mail via Resend.
 * Heeft de leerling een e-mailadres ingevuld, dan krijgt die een bevestiging.
 *
 * Nodig in de hostingomgeving:
 * - RESEND_API_KEY      API-sleutel van resend.com
 * - CONTACT_TO_EMAIL    Waar de aanmeldingen binnenkomen
 * - CONTACT_FROM_EMAIL  Afzender op een bij Resend geverifieerd domein,
 *                       bijv. "Website Yorulmaz <website@jouwdomein.nl>"
 * - CONTACT_CONFIRMATION (optioneel) "off" zet de bevestigingsmail aan de
 *                       leerling uit
 *
 * Zonder de eerste drie antwoordt de route met 503 en valt het formulier
 * terug op WhatsApp.
 */

const limits = { name: 100, phone: 30, email: 200, interest: 120, message: 3000 }

/** Eenvoudige bescherming tegen herhaald versturen (per serverinstantie). */
const recent = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

function rateLimited(ip: string) {
  const now = Date.now()
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  hits.push(now)
  recent.set(ip, hits)
  if (recent.size > 1000) recent.clear()
  return hits.length > MAX_PER_WINDOW
}

function field(data: Record<string, unknown>, key: keyof typeof limits) {
  const value = typeof data[key] === 'string' ? (data[key] as string).trim() : ''
  return value.slice(0, limits[key])
}

export async function POST(request: Request) {
  // Ook de kleine-letter-variant, zoals die in Vercel is aangemaakt.
  const apiKey = process.env.RESEND_API_KEY ?? process.env.resend_api_key
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  let data: Record<string, unknown>
  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  // Honeypot en invultijd: bots vullen het verborgen veld in of versturen meteen.
  const startedAt = Number(data.startedAt)
  if (data.website || (Number.isFinite(startedAt) && Date.now() - startedAt < 2500)) {
    return NextResponse.json({ ok: true })
  }

  const lead: Lead = {
    subject: data.subject === 'vraag' ? 'vraag' : 'aanmelden',
    name: field(data, 'name'),
    phone: field(data, 'phone'),
    email: field(data, 'email'),
    interest: field(data, 'interest'),
    message: field(data, 'message'),
  }

  if (!lead.name || (!lead.phone && !lead.email)) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'onbekend'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  const recipients = to.split(',').map((s) => s.trim()).filter(Boolean)

  const sent = await sendEmail(apiKey, {
    from,
    to: recipients,
    ...buildLeadEmail(lead),
    ...(lead.email ? { reply_to: lead.email } : {}),
  })
  if (!sent) {
    return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  }

  // Bevestiging aan de leerling. Mislukt die, dan is de aanmelding zelf wel binnen.
  if (lead.email && process.env.CONTACT_CONFIRMATION !== 'off') {
    await sendEmail(apiKey, {
      from,
      to: [lead.email],
      ...buildConfirmationEmail(lead),
      reply_to: recipients[0],
    })
  }

  return NextResponse.json({ ok: true })
}

type Email = { from: string; to: string[]; subject: string; html: string; text: string; reply_to?: string }

async function sendEmail(apiKey: string, email: Email) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  }).catch(() => null)

  if (!res?.ok) {
    console.error('E-mail versturen mislukt', email.subject, res?.status, await res?.text().catch(() => ''))
    return false
  }
  return true
}
