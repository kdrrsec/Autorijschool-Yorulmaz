'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { site, whatsappHref, trialLessonMessage } from '@/content/site'
import { WhatsApp } from './Icons'

/** Compacte actiebalk op mobiel. Verschijnt na de hero en verdwijnt bij het contactblok. */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('home')
    const contact = document.getElementById('contact')
    if (!hero || !contact) return

    let pastHero = false
    let atContact = false
    const update = () => setVisible(pastHero && !atContact)

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) pastHero = !entry.isIntersecting
        if (entry.target === contact) atContact = entry.isIntersecting
      }
      update()
    })
    observer.observe(hero)
    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm transition-transform duration-300 ease-out sm:hidden ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Link
          href="/#aanvragen"
          className="flex min-h-12 items-center justify-center rounded-[3px] bg-ink text-[0.95rem] font-semibold text-paper"
        >
          Proefles aanvragen
        </Link>
        <a
          href={whatsappHref(trialLessonMessage)}
          {...(site.contact.whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="flex min-h-12 items-center justify-center gap-2 rounded-[3px] border border-ink/20 px-4 text-[0.95rem] font-semibold"
        >
          <WhatsApp className="size-[1.1rem] text-wa" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
