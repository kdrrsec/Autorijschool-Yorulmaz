/**
 * De lesauto van Autorijschool Yorulmaz: een zwarte VW Polo (5-deurs) in
 * zijaanzicht, met rode streep, logo op de portieren en daklicht met L-bord.
 * Vlakke illustratiestijl met zachte glans.
 */
export function LessonCar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 210" className={className} aria-hidden role="presentation">
      <defs>
        <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a505b" />
          <stop offset="0.28" stopColor="#1c2027" />
          <stop offset="0.65" stopColor="#0f1115" />
          <stop offset="1" stopColor="#07080a" />
        </linearGradient>
        <linearGradient id="car-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b6778" />
          <stop offset="0.5" stopColor="#2a313c" />
          <stop offset="1" stopColor="#161a21" />
        </linearGradient>
        <linearGradient id="car-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f6f9" />
          <stop offset="1" stopColor="#aab2be" />
        </linearGradient>
        <radialGradient id="car-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0c121c" stopOpacity="0.45" />
          <stop offset="1" stopColor="#0c121c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="214" cy="186" rx="196" ry="14" fill="url(#car-shadow)" />

      {/* Daklicht met logo en L-bord */}
      <g>
        <rect x="128" y="46" width="10" height="10" fill="#0b0d10" />
        <rect x="186" y="46" width="10" height="10" fill="#0b0d10" />
        <path d="M118 30 L204 30 Q208 30 208 34 L208 48 L114 48 L114 34 Q114 30 118 30 Z" fill="#0b0d10" />
        <image href="/images/logo.png" x="118" y="31" width="86" height="16" preserveAspectRatio="xMidYMid meet" />
        <rect x="210" y="24" width="26" height="26" rx="3" fill="#1f5fbf" stroke="#0b0d10" strokeWidth="2" />
        <text x="223" y="45" textAnchor="middle" fontSize="21" fontWeight="900" fill="#ffffff" fontFamily="Arial, sans-serif">
          L
        </text>
      </g>

      {/* Donkere wielkasten */}
      <path d="M65 156 A35 35 0 0 1 135 156 Z" fill="#050607" />
      <path d="M291 156 A35 35 0 0 1 361 156 Z" fill="#050607" />

      {/* Carrosserie: Polo-silhouet, hatchback achter, korte motorkap voor */}
      <path
        d="M36 148 L36 114 Q37 102 46 96 L78 66 Q86 59 100 58 Q170 52 222 55 Q238 56 250 64 L300 96 L362 102 Q388 106 394 122 L396 144 Q396 156 384 156 L361 156 A35 35 0 0 0 291 156 L135 156 A35 35 0 0 0 65 156 L46 156 Q36 156 36 148 Z"
        fill="url(#car-body)"
        stroke="#050607"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Glans langs de schouderlijn */}
      <path d="M52 100 Q200 95 358 104" fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="2" />
      <path d="M150 132 Q220 128 286 132" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="8" />

      {/* Ramen */}
      <path d="M70 92 L90 70 Q96 63 106 63 L118 62 L118 92 Z" fill="url(#car-glass)" />
      <path d="M124 61 Q156 58 188 58 L188 92 L124 92 Z" fill="url(#car-glass)" />
      <path d="M195 58 L222 59 Q234 60 244 66 L284 92 L195 92 Z" fill="url(#car-glass)" />
      <path d="M130 61 L150 60 L134 92 L124 92 Z" fill="#ffffff" opacity="0.1" />
      <path d="M205 58 L222 59 L200 92 L195 92 Z" fill="#ffffff" opacity="0.1" />

      {/* Deurnaden, grepen, spiegel */}
      <path d="M121 62 V148" stroke="#000" strokeOpacity="0.6" strokeWidth="1.5" />
      <path d="M191 58 V154" stroke="#000" strokeOpacity="0.6" strokeWidth="1.5" />
      <path d="M288 92 Q294 118 290 146" fill="none" stroke="#000" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="160" y="100" width="14" height="3" rx="1.5" fill="#3a404a" />
      <rect x="252" y="100" width="14" height="3" rx="1.5" fill="#3a404a" />
      <path d="M280 90 Q284 82 294 84 L298 94 L286 98 Z" fill="#0b0d10" stroke="#2a2f37" strokeWidth="1" />

      {/* Rode streep op het achterportier */}
      <path d="M50 98 Q62 100 70 106 L124 148 L112 150 L60 108 Q54 104 50 98 Z" fill="#e3000f" />
      <path d="M64 101 Q70 103 76 108 L120 144 L116 145 L72 110 Q68 105 64 101 Z" fill="#ffffff" opacity="0.85" />

      {/* Logo op de portieren */}
      <image href="/images/logo.png" x="130" y="102" width="166" height="47" preserveAspectRatio="xMidYMid meet" />

      {/* Lampen en bumpers */}
      <path d="M362 104 Q386 106 392 118 L370 120 Q362 114 362 104 Z" fill="#dfe6ef" stroke="#050607" strokeWidth="1.5" />
      <path d="M366 108 Q380 110 386 116 L372 116 Z" fill="#ffffff" opacity="0.9" />
      <path d="M36 102 L50 98 L48 116 L36 118 Z" fill="#b3000c" stroke="#050607" strokeWidth="1.5" />
      <rect x="372" y="138" width="24" height="8" rx="4" fill="#050607" />
      <rect x="34" y="138" width="22" height="8" rx="4" fill="#050607" />

      {/* Wielen met zilveren 5-spaaks velgen */}
      {[100, 326].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="158" r="31" fill="#050607" />
          <circle cx={cx} cy="158" r="28" fill="#15181d" />
          <circle cx={cx} cy="158" r="20" fill="#2b3038" />
          {[0, 72, 144, 216, 288].map((a) => (
            <path
              key={a}
              d={`M${cx - 3.5} 158 L${cx - 6.5} 139 L${cx + 6.5} 139 L${cx + 3.5} 158 Z`}
              fill="url(#car-rim)"
              transform={`rotate(${a} ${cx} 158)`}
            />
          ))}
          <circle cx={cx} cy="158" r="20" fill="none" stroke="url(#car-rim)" strokeWidth="3" />
          <circle cx={cx} cy="158" r="5.5" fill="#d8dde4" stroke="#6c7584" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  )
}
