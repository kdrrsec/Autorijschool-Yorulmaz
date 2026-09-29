/** Lesauto in zijaanzicht, vlakke illustratiestijl met zachte schaduwen. */
export function LessonCar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 210" className={className} aria-hidden role="presentation">
      <defs>
        <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#eef2f8" />
          <stop offset="1" stopColor="#cfd8e6" />
        </linearGradient>
        <linearGradient id="car-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b5a8c" />
          <stop offset="1" stopColor="#1b2b4a" />
        </linearGradient>
        <linearGradient id="car-glass-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="car-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#0c121c" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0c121c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="212" cy="184" rx="190" ry="14" fill="url(#car-shadow)" />

      {/* Daklicht */}
      <g>
        <rect x="178" y="30" width="84" height="22" rx="6" fill="#16213a" />
        <rect x="182" y="33" width="76" height="16" rx="4" fill="#e3000f" />
        <text x="220" y="45" textAnchor="middle" fontSize="11" fontWeight="800" letterSpacing="1.5" fill="#ffffff" fontFamily="Arial, sans-serif">
          LESAUTO
        </text>
        <rect x="196" y="52" width="10" height="6" fill="#16213a" />
        <rect x="234" y="52" width="10" height="6" fill="#16213a" />
      </g>

      {/* Carrosserie */}
      <path
        d="M34 150 L34 122 Q36 104 56 100 L108 94 L150 64 Q160 57 176 56 L272 56 Q290 57 300 66 L338 94 L372 100 Q392 105 394 124 L394 150 Q394 162 382 162 L46 162 Q34 162 34 150 Z"
        fill="url(#car-body)"
        stroke="#16213a"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Ramen */}
      <path d="M122 94 L158 66 Q164 62 174 62 L220 62 L220 94 Z" fill="url(#car-glass)" />
      <path d="M228 62 L270 62 Q284 62 294 70 L326 94 L228 94 Z" fill="url(#car-glass)" />
      <path d="M122 94 L158 66 Q164 62 174 62 L200 62 L160 94 Z" fill="url(#car-glass-shine)" />
      <path d="M250 62 L270 62 L236 94 L218 94 Z" fill="#fff" opacity="0.12" />

      {/* Streep en belettering */}
      <path d="M36 128 H392" stroke="#16213a" strokeWidth="10" />
      <path d="M36 136 H392" stroke="#e3000f" strokeWidth="3" />
      <text x="224" y="119" textAnchor="middle" fontSize="15" fontWeight="900" fontStyle="italic" letterSpacing="1" fill="#16213a" fontFamily="Arial Black, Arial, sans-serif">
        <tspan fill="#e3000f">Y</tspan>ORULMAZ
      </text>

      {/* Deur en details */}
      <path d="M224 96 V158" stroke="#16213a" strokeOpacity="0.35" strokeWidth="2" />
      <path d="M140 96 Q136 130 150 158" stroke="#16213a" strokeOpacity="0.2" strokeWidth="2" fill="none" />
      <rect x="236" y="104" width="16" height="4" rx="2" fill="#16213a" opacity="0.5" />
      <rect x="160" y="104" width="16" height="4" rx="2" fill="#16213a" opacity="0.5" />
      <path d="M318 88 L334 86 Q340 86 338 92 L326 96 Z" fill="#16213a" />

      {/* Lampen */}
      <path d="M376 104 Q390 108 392 120 L378 120 Q372 112 376 104 Z" fill="#ffe7a3" stroke="#16213a" strokeWidth="2" />
      <path d="M36 106 L48 104 L48 118 L35 118 Z" fill="#e0524a" stroke="#16213a" strokeWidth="2" />

      {/* Bumpers */}
      <rect x="360" y="146" width="36" height="10" rx="5" fill="#16213a" />
      <rect x="30" y="146" width="34" height="10" rx="5" fill="#16213a" />

      {/* Wielen */}
      {[108, 318].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="160" r="33" fill="#f4f6fa" />
          <circle cx={cx} cy="160" r="28" fill="#1b2233" />
          <circle cx={cx} cy="160" r="15" fill="#d5dce7" />
          <circle cx={cx} cy="160" r="5" fill="#8391a8" />
          {[0, 72, 144, 216, 288].map((a) => (
            <rect
              key={a}
              x={cx - 1.5}
              y={147}
              width="3"
              height="9"
              rx="1.5"
              fill="#8391a8"
              transform={`rotate(${a} ${cx} 160)`}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}
