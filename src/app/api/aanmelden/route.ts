import { NextResponse } from 'next/server'
import { buildLeadEmail, type Lead } from '@/lib/lead-email'

/**
 * Ontvangt het contactformulier en verstuurt het als nette e-mail via Resend.
 *
 * Nodig in de hostingomgeving:
 * - RESEND_API_KEY      API-sleutel van resend.com
 * - CONTACT_TO_EMAIL    Waar de aanmeldingen binnenkomen
 * - CONTACT_FROM_EMAIL  Afzender op een bij Resend geverifieerd domein,
 *                       bijv. "Website Yorulmaz <website@jouwdomein.nl>"
 *
 * Zonder deze instellingen antwoordt de route met 503 en valt het formulier
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
  const apiKey = process.env.RESEND_API_KEY
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

  const { subject, html, text } = buildLeadEmail(lead)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: to.split(',').map((s) => s.trim()).filter(Boolean),
      subject,
      html,
      text,
      ...(lead.email ? { reply_to: lead.email } : {}),
    }),
  }).catch(() => null)

  if (!res?.ok) {
    console.error('Aanmelding versturen mislukt', res?.status, await res?.text().catch(() => ''))
    return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
