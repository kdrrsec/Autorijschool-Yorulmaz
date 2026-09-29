'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Zorgt dat links als "/#contact" of het logo ("/#home") op de homepage altijd
 * soepel scrollen, ook als die hash al in de adresbalk staat. "#home" gaat
 * helemaal naar boven.
 */
export function HashLinkHandler() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.('a[href^="/#"], a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')!.split('#')[1]
      const target = id === 'home' ? document.body : document.getElementById(id)
      if (!target) return

      e.preventDefault()
      history.replaceState(null, '', id === 'home' ? '/' : `/#${id}`)
      // Even wachten zodat een open mobiel menu eerst sluit en scrollen weer mag.
      window.setTimeout(() => {
        const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
        } else {
          target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
        }
      }, 20)
    }

    // Capture-fase: vóór de eigen klik-afhandeling van Next.js <Link>.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname])

  return null
}
