'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Laat links als "/#contact" naar het juiste onderdeel scrollen zonder dat er
 * een "#..." in de adresbalk komt. "#home" gaat helemaal naar boven.
 *
 * - Klik op dezelfde pagina: soepel scrollen, adres blijft schoon.
 * - Binnenkomen met een hash (bijv. vanaf een plaatspagina naar "/#tarieven"):
 *   eerst naar het onderdeel, daarna de hash uit het adres halen.
 */
export function HashLinkHandler() {
  const pathname = usePathname()

  useEffect(() => {
    const scrollTo = (id: string, smooth: boolean) => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
        return true
      }
      const target = document.getElementById(id)
      if (!target) return false
      target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
      return true
    }
    const prefersSmooth = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanUrl = () => history.replaceState(history.state, '', window.location.pathname + window.location.search)

    // Binnenkomen met een hash in het adres
    let initial: number | undefined
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1))
      initial = window.setTimeout(() => {
        scrollTo(id, false)
        cleanUrl()
      }, 60)
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.('a[href^="/#"], a[href^="#"]')
      if (!link) return
      const href = link.getAttribute('href')!
      // "/#..." hoort bij de homepage; op een andere pagina gewoon laten navigeren.
      if (href.startsWith('/#') && pathname !== '/') return
      const id = href.split('#')[1]
      if (id !== 'home' && !document.getElementById(id)) return

      e.preventDefault()
      cleanUrl()
      // Even wachten zodat een open mobiel menu eerst sluit en scrollen weer mag.
      window.setTimeout(() => scrollTo(id, prefersSmooth()), 20)
    }

    // Capture-fase: vóór de eigen klik-afhandeling van Next.js <Link>.
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.clearTimeout(initial)
    }
  }, [pathname])

  return null
}
