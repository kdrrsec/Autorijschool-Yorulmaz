'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { nav, site, whatsappHref, trialLessonMessage } from '@/content/site'
import { Logo } from './Logo'
import { ArrowRight, WhatsApp } from './Icons'

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
        open
          ? 'border-b border-line bg-paper'
          : scrolled
            ? 'border-b border-line bg-paper/95 shadow-[0_1px_12px_rgba(12,18,28,0.05)] backdrop-blur-sm'
            : 'border-b border-transparent bg-paper'
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Logo onClick={close} />

        <nav aria-label="Hoofdmenu" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative px-3.5 py-2 text-[0.95rem] font-medium text-ink/75 transition-colors hover:text-ink"
                >
                  {item.label}
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#proefles"
            className="group hidden min-h-11 items-center gap-2 rounded-[3px] bg-ink px-5 text-[0.925rem] font-semibold text-paper transition-colors hover:bg-navy-soft sm:inline-flex"
          >
            Proefles aanvragen
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
                className={`absolute left-0 h-[1.5px] w-6 bg-ink transition-transform duration-300 ${open ? 'top-[5px] rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] bg-ink transition-all duration-300 ${open ? 'top-[5px] w-6 -rotate-45' : 'top-[10.5px] w-4'}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobiel menu */}
      <div
        id="mobiel-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label="Mobiel menu" className="container-site flex min-h-full flex-col pt-4 pb-8">
          <ol className="divide-y divide-line">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-baseline gap-4 py-4 text-ink transition-colors active:text-muted"
                >
                  <span className="w-6 font-display text-xs font-semibold text-subtle tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-[1.65rem] leading-none font-semibold tracking-tight">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-auto grid gap-3 pt-10">
            <Link
              href="/#proefles"
              onClick={close}
              className="flex min-h-13 items-center justify-between rounded-[3px] bg-ink px-5 font-semibold text-paper"
            >
              Proefles aanvragen
              <ArrowRight />
            </Link>
            <a
              href={whatsappHref(trialLessonMessage)}
              onClick={close}
              {...(site.contact.whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex min-h-13 items-center justify-between rounded-[3px] border border-ink/20 px-5 font-semibold text-ink"
            >
              <span className="flex items-center gap-2.5">
                <WhatsApp className="size-[1.1rem] text-wa" />
                WhatsApp
              </span>
              <ArrowRight />
            </a>
            <p className="label mt-4 text-subtle">
              {site.name} · {site.region}
            </p>
          </div>
        </nav>
      </div>
    </header>
  )
}
