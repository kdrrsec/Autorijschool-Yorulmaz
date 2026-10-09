'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { isSection, sections, type SectionSlug } from '@/content/site'

/**
 * Onderdelen van de homepage hebben een eigen adres zonder "#", zoals
 * /tarieven. Op de homepage scrollt een klik soepel naar het onderdeel en
 * past alleen het adres aan; wie zo'n adres opent, komt direct bij het
 * onderdeel uit. Oude links met een hash (/#tarieven) worden omgezet.
 */

const isHomeContent = (pathname: string) => pathname === '/' || isSection(pathname.slice(1))

function scrollToId(id: string, smooth: boolean) {
  const behavior = smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto'
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
}

function slugForId(id: string) {
  return (Object.keys(sections) as SectionSlug[]).find((slug) => sections[slug].id === id)
}

export function SectionLinkHandler() {
  const pathname = usePathname()
  /** Adres dat we zelf net hebben gezet; dan niet nog eens scrollen. */
  const ownChange = useRef<string | null>(null)

  // Binnenkomen op /tarieven enz., of met een oude hash-link
  useEffect(() => {
    if (ownChange.current === pathname) {
      ownChange.current = null
      return
    }
    const slug = pathname.slice(1)
    let timer: number | undefined
    if (isSection(slug)) {
      timer = window.setTimeout(() => scrollToId(sections[slug].id, false), 60)
    } else if (pathname === '/' && window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1))
      timer = window.setTimeout(() => {
        scrollToId(id, false)
        const target = slugForId(id)
        ownChange.current = target ? `/${target}` : '/'
        history.replaceState(history.state, '', ownChange.current)
      }, 60)
    }
    return () => window.clearTimeout(timer)
  }, [pathname])

  // Klikken
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.('a[href]')
      if (!link || link.getAttribute('target') === '_blank') return
      const href = link.getAttribute('href')!

      // Link naar een onderdeel op dezelfde pagina, bijv. "#aanvragen"
      if (href.startsWith('#')) {
        const id = href.slice(1)
        if (!document.getElementById(id)) return
        e.preventDefault()
        window.setTimeout(() => scrollToId(id, true), 20)
        return
      }

      // Op de homepage: /tarieven enz. en het logo (/) scrollen in plaats van laden
      if (!isHomeContent(pathname)) return
      const slug = href.slice(1)
      if (href !== '/' && !(href.startsWith('/') && isSection(slug))) return
      const id = href === '/' ? 'home' : sections[slug as SectionSlug].id

      e.preventDefault()
      if (window.location.pathname !== href) {
        ownChange.current = href
        history.replaceState(history.state, '', href)
      }
      // Even wachten zodat een open mobiel menu eerst sluit en scrollen weer mag.
      window.setTimeout(() => scrollToId(id, true), 20)
    }

    // Capture-fase: vóór de eigen klik-afhandeling van Next.js <Link>.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname])

  return null
}
