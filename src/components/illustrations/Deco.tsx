/** Kleine verkeers-illustraties als decoratie. */

export function Cone({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" className={className} aria-hidden role="presentation">
      <ellipse cx="40" cy="92" rx="34" ry="5" fill="#0c121c" opacity="0.12" />
      <rect x="6" y="80" width="68" height="10" rx="3" fill="#e0662f" />
      <path d="M30 8 Q40 2 50 8 L66 82 H14 Z" fill="#f27a3d" />
      <path d="M25 32 H55 L58 46 H22 Z M19 58 H61 L64 72 H16 Z" fill="#fff" />
      <path d="M30 8 Q40 2 50 8 L44 8 Q40 6 36 8 Z" fill="#c4521f" />
      <path d="M34 10 L24 80 H18 L32 10 Z" fill="#fff" opacity="0.2" />
    </svg>
  )
}

export function TrafficLight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 150" className={className} aria-hidden role="presentation">
      <rect x="26" y="96" width="8" height="54" rx="3" fill="#8391a8" />
      <rect x="8" y="4" width="44" height="100" rx="14" fill="#16213a" />
      <circle cx="30" cy="26" r="11" fill="#e0524a" opacity="0.3" />
      <circle cx="30" cy="54" r="11" fill="#e5a83b" opacity="0.3" />
      <circle cx="30" cy="82" r="11" fill="#39c777" />
      <circle cx="30" cy="82" r="16" fill="#39c777" opacity="0.2" />
      <circle cx="26" cy="78" r="3" fill="#fff" opacity="0.6" />
    </svg>
  )
}

export function RoadSign({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 150" className={className} aria-hidden role="presentation">
      <rect x="31" y="56" width="8" height="94" rx="3" fill="#8391a8" />
      <circle cx="35" cy="34" r="30" fill="#fff" stroke="#16213a" strokeWidth="3" />
      <circle cx="35" cy="34" r="25" fill="#1f5fbf" />
      <path d="M35 18 V46 M35 18 L25 28 M35 18 L45 28" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/** Gebogen weg met middenstreep, als ondergrond voor de auto. */
export function Road({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 120" preserveAspectRatio="none" className={className} aria-hidden role="presentation">
      <path d="M0 40 Q300 0 600 40 L600 120 L0 120 Z" fill="#26324d" />
      <path d="M0 40 Q300 0 600 40" fill="none" stroke="#3a4a6e" strokeWidth="6" />
      <path d="M0 82 Q300 44 600 82" fill="none" stroke="#e5a83b" strokeWidth="5" strokeDasharray="28 22" />
    </svg>
  )
}
