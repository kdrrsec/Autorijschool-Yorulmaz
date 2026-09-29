/** Vlakke "poppetjes": instructeur en leerling. Eenvoudige, vriendelijke stijl. */

const ink = '#16213a'

function Face({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx - 8} cy={cy - 2} r="2.4" fill={ink} />
      <circle cx={cx + 8} cy={cy - 2} r="2.4" fill={ink} />
      <path d={`M${cx - 7} ${cy + 8} Q${cx} ${cy + 14} ${cx + 7} ${cy + 8}`} fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx={cx - 14} cy={cy + 6} r="3.5" fill="#f08c8c" opacity="0.35" />
      <circle cx={cx + 14} cy={cy + 6} r="3.5" fill="#f08c8c" opacity="0.35" />
    </g>
  )
}

export function Instructor({ className = '' }: { className?: string }) {
  const skin = '#c98e67'
  return (
    <svg viewBox="0 0 170 360" className={className} aria-hidden role="presentation">
      <ellipse cx="85" cy="346" rx="54" ry="8" fill={ink} opacity="0.12" />
      {/* Benen */}
      <rect x="58" y="222" width="22" height="116" rx="10" fill="#2b3a5c" />
      <rect x="88" y="222" width="22" height="116" rx="10" fill="#24324f" />
      <path d="M52 338 Q54 328 70 328 L80 328 L80 344 L54 344 Q50 344 52 338 Z" fill={ink} />
      <path d="M88 328 L100 328 Q116 328 118 338 Q120 344 114 344 L88 344 Z" fill={ink} />
      {/* Arm links (achter) */}
      <path d="M50 140 Q34 186 52 214" stroke="#16213a" strokeWidth="20" strokeLinecap="round" fill="none" />
      {/* Romp */}
      <path d="M44 146 Q46 118 85 114 Q124 118 126 146 L120 232 L50 232 Z" fill="#16213a" />
      <path d="M72 116 L85 136 L98 116 Z" fill="#fff" />
      <rect x="92" y="150" width="18" height="4" rx="2" fill="#d7263d" />
      {/* Hals en hoofd */}
      <rect x="76" y="94" width="18" height="24" rx="6" fill={skin} />
      <circle cx="85" cy="70" r="30" fill={skin} />
      <circle cx="56" cy="74" r="6" fill={skin} />
      <circle cx="114" cy="74" r="6" fill={skin} />
      <path d="M55 66 Q54 36 86 36 Q116 36 116 62 Q106 52 94 54 Q80 46 68 56 Q60 58 55 66 Z" fill="#231a17" />
      <Face cx={85} cy={76} />
      {/* Arm rechts met klembord */}
      <path d="M120 142 Q138 172 116 190" stroke="#16213a" strokeWidth="20" strokeLinecap="round" fill="none" />
      <g transform="rotate(-8 100 190)">
        <rect x="74" y="160" width="50" height="64" rx="6" fill="#d7263d" />
        <rect x="79" y="168" width="40" height="52" rx="3" fill="#fff" />
        <rect x="90" y="156" width="18" height="9" rx="3" fill="#8391a8" />
        <path d="M85 180 l4 4 l7 -8 M85 194 l4 4 l7 -8" stroke="#1f8f4e" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="99" y="179" width="14" height="3" rx="1.5" fill="#c6cedb" />
        <rect x="99" y="193" width="14" height="3" rx="1.5" fill="#c6cedb" />
        <rect x="85" y="207" width="28" height="3" rx="1.5" fill="#c6cedb" />
      </g>
      <circle cx="112" cy="192" r="9" fill={skin} />
    </svg>
  )
}

export function Student({ className = '' }: { className?: string }) {
  const skin = '#f0c29e'
  return (
    <svg viewBox="0 0 170 360" className={className} aria-hidden role="presentation">
      <ellipse cx="85" cy="346" rx="54" ry="8" fill={ink} opacity="0.12" />
      {/* Paardenstaart */}
      <path d="M104 52 Q134 60 128 104 Q122 90 110 86 Z" fill="#7a4a2a" />
      {/* Benen */}
      <rect x="60" y="222" width="21" height="116" rx="10" fill="#3d5a99" />
      <rect x="88" y="222" width="21" height="116" rx="10" fill="#34508b" />
      <path d="M54 338 Q56 328 70 328 L81 328 L81 344 L56 344 Q52 344 54 338 Z" fill="#fff" stroke={ink} strokeWidth="2" />
      <path d="M88 328 L100 328 Q114 328 116 338 Q118 344 112 344 L88 344 Z" fill="#fff" stroke={ink} strokeWidth="2" />
      {/* Arm links in de zij */}
      <path d="M50 144 Q30 176 56 196" stroke="#d7263d" strokeWidth="19" strokeLinecap="round" fill="none" />
      <circle cx="58" cy="197" r="8.5" fill={skin} />
      {/* Romp */}
      <path d="M46 148 Q48 120 85 116 Q122 120 124 148 L118 232 L52 232 Z" fill="#d7263d" />
      <path d="M70 118 Q85 132 100 118" fill="none" stroke="#a3182b" strokeWidth="3" />
      {/* Hals en hoofd */}
      <rect x="77" y="96" width="16" height="24" rx="6" fill={skin} />
      <circle cx="85" cy="72" r="29" fill={skin} />
      <path d="M55 72 Q52 38 86 38 Q118 38 115 70 Q108 56 92 56 Q70 54 62 68 Q58 70 55 72 Z" fill="#7a4a2a" />
      <Face cx={85} cy={78} />
      {/* Arm rechts omhoog met rijbewijs */}
      <path d="M120 146 Q140 110 136 70" stroke="#d7263d" strokeWidth="19" strokeLinecap="round" fill="none" />
      <g transform="rotate(12 138 44)">
        <rect x="112" y="24" width="54" height="36" rx="5" fill="#f3d7ea" stroke={ink} strokeWidth="2" />
        <rect x="117" y="30" width="14" height="18" rx="2" fill="#c3cfe2" />
        <rect x="135" y="31" width="24" height="4" rx="2" fill={ink} opacity="0.6" />
        <rect x="135" y="39" width="18" height="3" rx="1.5" fill={ink} opacity="0.3" />
        <text x="148" y="56" fontSize="9" fontWeight="800" fill={ink} fontFamily="Arial, sans-serif">B</text>
        <rect x="117" y="51" width="8" height="5" rx="1" fill="#1f3f95" />
      </g>
      <circle cx="136" cy="64" r="8.5" fill={skin} />
      {/* Sterretjes */}
      <path d="M22 60 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" fill="#d7263d" />
      <path d="M150 104 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" fill="#d7263d" />
    </svg>
  )
}
