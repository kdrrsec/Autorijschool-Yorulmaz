/**
 * Gestileerd rijbewijs (categorie B) als "3D" kaart: SVG-illustratie met
 * een CSS-perspectief, dikte-rand en zachte schaduw. Bewust geen replica
 * van het echte document: geen persoonsgegevens, geen officiële teksten.
 */
export function License3D({
  className = '',
  float = true,
  uid = 'l1',
}: {
  className?: string
  float?: boolean
  /** Unieke prefix voor SVG-id's als de kaart vaker op de pagina staat. */
  uid?: string
}) {
  const id = (name: string) => `${uid}-${name}`
  return (
    <div className={`license-3d ${float ? 'animate-float-slow' : ''} ${className}`} aria-hidden>
      <div className="license-3d__card">
        {/* Dikte van de kaart */}
        <div className="license-3d__edge" />
        <svg viewBox="0 0 340 214" className="relative block h-auto w-full" role="presentation">
          <defs>
            <linearGradient id={id('lic-bg')} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fbe3ee" />
              <stop offset="0.45" stopColor="#f1dcf0" />
              <stop offset="1" stopColor="#d9e6fb" />
            </linearGradient>
            <linearGradient id={id('lic-gloss')} x1="0" y1="0" x2="1" y2="0.6">
              <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
              <stop offset="0.35" stopColor="#fff" stopOpacity="0.08" />
              <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id('lic-photo')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#dfe7f3" />
              <stop offset="1" stopColor="#c3cfe2" />
            </linearGradient>
            <pattern id={id('lic-guilloche')} width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M0 7 Q3.5 0 7 7 T14 7" fill="none" stroke="#c9a3c8" strokeOpacity="0.35" strokeWidth="0.6" />
            </pattern>
            <clipPath id={id('lic-clip')}>
              <rect width="340" height="214" rx="16" />
            </clipPath>
          </defs>

          <g clipPath={`url(#${id('lic-clip')})`}>
            <rect width="340" height="214" fill={`url(#${id('lic-bg')})`} />
            <rect width="340" height="214" fill={`url(#${id('lic-guilloche')})`} />
            <circle cx="300" cy="190" r="90" fill="#fff" opacity="0.25" />

            {/* EU-blok */}
            <rect x="18" y="18" width="42" height="42" rx="6" fill="#1f3f95" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2
              return <circle key={i} cx={39 + Math.cos(a) * 12} cy={36 + Math.sin(a) * 12} r="1.9" fill="#ffd23f" />
            })}
            <text x="39" y="56" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">
              NL
            </text>

            <text x="74" y="36" fontSize="20" fontWeight="800" letterSpacing="2.5" fill="#1b2544" fontFamily="Arial, sans-serif">
              RIJBEWIJS
            </text>
            <text x="75" y="53" fontSize="8.5" letterSpacing="1.2" fill="#6b5a7a" fontFamily="Arial, sans-serif">
              AUTORIJSCHOOL YORULMAZ
            </text>

            {/* Pasfoto */}
            <rect x="18" y="76" width="82" height="104" rx="8" fill={`url(#${id('lic-photo')})`} />
            <circle cx="59" cy="116" r="20" fill="#f2c7a5" />
            <path d="M39 112 Q40 92 59 92 Q79 92 79 112 Q72 102 59 103 Q46 102 39 112 Z" fill="#3b2a24" />
            <path d="M24 180 Q26 146 59 144 Q92 146 94 180 Z" fill="#16213a" />
            <path d="M52 144 L59 156 L66 144 Z" fill="#fff" />

            {/* Tekstregels */}
            {[84, 104, 124, 144].map((y, i) => (
              <g key={y}>
                <text x="116" y={y + 7} fontSize="8" fontWeight="700" fill="#8a6f8f" fontFamily="Arial, sans-serif">
                  {i + 1}.
                </text>
                <rect x="130" y={y} width={[120, 96, 70, 108][i]} height="8" rx="4" fill="#1b2544" opacity={i === 0 ? 0.75 : 0.28} />
              </g>
            ))}

            {/* Handtekening */}
            <path d="M118 176 q10 -14 18 -2 t16 -4 q6 -8 12 2 t20 -6" fill="none" stroke="#1b2544" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />

            {/* Categorie B */}
            <rect x="252" y="150" width="70" height="46" rx="10" fill="#ffffff" opacity="0.85" />
            <text x="270" y="183" fontSize="26" fontWeight="800" fill="#1b2544" fontFamily="Arial, sans-serif">
              B
            </text>
            <g transform="translate(290 164)" fill="#1f3f95">
              <rect x="0" y="6" width="24" height="8" rx="3" />
              <path d="M4 6 L8 0 H17 L21 6 Z" />
              <circle cx="6" cy="15" r="3" fill="#1b2544" />
              <circle cx="18" cy="15" r="3" fill="#1b2544" />
            </g>

            {/* Chip / hologram */}
            <rect x="268" y="80" width="46" height="36" rx="7" fill="#e6c36a" />
            <path d="M268 92 H314 M268 104 H314 M284 80 V116 M298 80 V116" stroke="#b8923b" strokeWidth="1.2" />
            <circle cx="291" cy="138" r="7" fill="#a7d4f2" opacity="0.8" />
            <circle cx="296" cy="135" r="5" fill="#f4b7d8" opacity="0.8" />

            <rect width="340" height="214" fill={`url(#${id('lic-gloss')})`} />
          </g>
          <rect x="0.75" y="0.75" width="338.5" height="212.5" rx="15.5" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="license-3d__shadow" />
    </div>
  )
}
