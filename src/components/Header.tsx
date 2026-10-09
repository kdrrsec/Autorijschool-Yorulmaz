'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { nav, site, whatsappHref, signupMessage } from '@/content/site'
import { Logo } from './Logo'
import { ArrowRight, Phone, WhatsApp } from './Icons'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      root.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? 'border-b border-white/10 bg-navy shadow-[0_4px_20px_rgba(12,18,28,0.25)]'
          : 'border-b border-transparent bg-navy'
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Logo onClick={close} priority />

        <nav aria-label="Hoofdmenu" className="hidden lg:block lg:-translate-x-5">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative px-3.5 py-2 text-[0.95rem] font-medium text-white/75 transition-colors hover:text-white"
                >
                  {item.label}
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-signal transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/aanmelden"
            className="group hidden min-h-11 items-center gap-2 rounded-xl bg-signal px-5 text-[0.925rem] font-semibold text-white transition-colors hover:bg-signal-deep sm:inline-flex"
          >
            Plan je les
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="relative -mr-2 inline-flex size-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobiel-menu"
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-white transition-transform duration-300 ${open ? 'top-[5px] rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] bg-white transition-all duration-300 ${open ? 'top-[5px] w-6 -rotate-45' : 'top-[10.5px] w-4'}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobiel menu */}
      <div
        id="mobiel-menu"
        ref={panelRef}
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-navy transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Versiering binnen het paneel houden, anders wordt het menu scrollbaar */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -top-24 -right-24 size-72 rounded-full bg-signal/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 size-80 rounded-full bg-navy-soft" />
        </div>

        <nav aria-label="Mobiel menu" className="container-site relative flex min-h-full flex-col pt-6 pb-8 [@media(max-height:700px)]:pt-3 [@media(max-height:700px)]:pb-5">
          <ul className="space-y-2">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={`transition-[opacity,translate] duration-500 ease-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
              >
                <Link
                  href={item.href}
                  onClick={close}
                  className="group flex items-center justify-between rounded-2xl px-4 py-4 text-white [@media(max-height:700px)]:py-2.5 transition-colors hover:bg-white/5 active:bg-white/10"
                >
                  <span className="font-display text-[1.7rem] leading-none font-semibold tracking-tight">{item.label}</span>
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-signal group-active:bg-signal">
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10 [@media(max-height:700px)]:pt-6">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/aanmelden"
                onClick={close}
                className="flex min-h-13 items-center justify-center gap-2 rounded-xl bg-signal px-4 font-semibold text-white"
              >
                Plan je les
              </Link>
              <a
                href={whatsappHref(signupMessage)}
                onClick={close}
                {...(site.contact.whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex min-h-13 items-center justify-center gap-2 rounded-xl bg-wa px-4 font-semibold text-white"
              >
                <WhatsApp className="size-[1.1rem]" />
                WhatsApp
              </a>
            </div>
            {site.contact.phone && (
              <a
                href={`tel:${site.contact.phone.replace(/[^\d+]/g, '')}`}
                className="mt-3 flex min-h-13 items-center justify-center gap-2.5 rounded-xl border border-white/15 font-semibold text-white"
              >
                <Phone className="size-[1.1rem]" />
                Bel {site.contact.phone}
              </a>
            )}
            <p className="mt-6 text-center text-sm text-white/50">{site.region}</p>
          </div>
        </nav>
      </div>
    </header>
  )
}
