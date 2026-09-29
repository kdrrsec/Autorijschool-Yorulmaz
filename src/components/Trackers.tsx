'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { CONSENT_EVENT, readConsent, trackers, type Consent } from '@/lib/consent'

type Gtag = (...args: unknown[]) => void
type Fbq = (...args: unknown[]) => void
declare global {
  interface Window {
    gtag?: Gtag
    fbq?: Fbq
  }
}

export const LEAD_EVENT = 'yorulmaz:lead'

/**
 * Laadt Google Analytics en de Meta-pixel pas na toestemming, en meet
 * klikken op WhatsApp/telefoon en verstuurde aanmeldingen als conversie.
 */
export function Trackers() {
  const [consent, setConsent] = useState<Consent | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- keuze staat alleen in de browser
    setConsent(readConsent())
    const onConsent = (e: Event) => setConsent((e as CustomEvent<Consent>).detail)
    window.addEventListener(CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  // Conversies: WhatsApp/telefoon-klikken en aanmeldformulier
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]')
      const href = link?.getAttribute('href') ?? ''
      const method = href.startsWith('https://wa.me/') ? 'whatsapp' : href.startsWith('tel:') ? 'telefoon' : null
      if (!method) return
      window.gtag?.('event', 'contact', { method })
      window.fbq?.('track', 'Contact')
    }
    const onLead = () => {
      window.gtag?.('event', 'generate_lead')
      window.fbq?.('track', 'Lead')
    }
    document.addEventListener('click', onClick)
    window.addEventListener(LEAD_EVENT, onLead)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener(LEAD_EVENT, onLead)
    }
  }, [])

  const { gaId, metaPixelId } = trackers

  return (
    <>
      {gaId && consent?.analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}
      {metaPixelId && consent?.marketing && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  )
}
