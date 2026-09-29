'use client'

import { consentRequired, openCookieSettings } from '@/lib/consent'

export function CookieSettingsLink({ className = '' }: { className?: string }) {
  if (!consentRequired) return null
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie-instellingen
    </button>
  )
}
