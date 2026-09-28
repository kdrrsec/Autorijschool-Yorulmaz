import Image from 'next/image'
import type { Photo } from '@/content/site'

type Placeholder = 'road' | 'road-light' | 'lines' | 'lines-dark' | 'monogram'

type Props = {
  photo: Photo | null
  /** Grafische invulling zolang er nog geen echte foto is. */
  placeholder?: Placeholder
  sizes: string
  priority?: boolean
  className?: string
  reveal?: boolean
}

/**
 * Toont een echte foto (object-cover, met instelbare uitsnede) of — zolang die
 * er nog niet is — een rustige grafische invulling. Nooit een nepfoto.
 */
export function PhotoFrame({
  photo,
  placeholder = 'road',
  sizes,
  priority,
  className = '',
  reveal = true,
}: Props) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      data-reveal={reveal ? 'image' : undefined}
    >
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: photo.position ?? 'center' }}
        />
      ) : (
        <PlaceholderArt kind={placeholder} />
      )}
    </div>
  )
}

function PlaceholderArt({ kind }: { kind: Placeholder }) {
  if (kind === 'monogram') {
    return (
      <div className="absolute inset-0 flex items-end bg-stone-deep p-6" aria-hidden>
        <span className="font-display text-[9rem] leading-[0.8] font-extrabold tracking-tight text-ink/[0.07] font-wide sm:text-[12rem]">
          Y
        </span>
      </div>
    )
  }

  if (kind === 'lines' || kind === 'lines-dark') {
    const dark = kind === 'lines-dark'
    return (
      <div className={`absolute inset-0 ${dark ? 'bg-navy' : 'bg-stone-deep'}`} aria-hidden>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke={dark ? '#ffffff' : '#0c121c'} strokeOpacity={dark ? 0.2 : 0.1} strokeWidth="1.2" fill="none">
            <path d="M-20 250 C 120 230, 220 150, 420 120" />
            <path d="M-20 280 C 140 262, 250 180, 420 160" />
          </g>
          <path
            d="M-20 265 C 130 246, 235 165, 420 140"
            stroke="#e5a83b"
            strokeOpacity="0.8"
            strokeWidth="2"
            strokeDasharray="14 12"
            fill="none"
          />
        </svg>
      </div>
    )
  }

  const light = kind === 'road-light'
  return (
    <div className={`absolute inset-0 ${light ? 'bg-stone-deep' : 'bg-navy'}`} aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 700"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id={`fade-${kind}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={light ? '#e8e4dd' : '#16213a'} stopOpacity="1" />
            <stop offset="0.55" stopColor={light ? '#e8e4dd' : '#16213a'} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Wegdek in perspectief */}
        <path d="M268 250 L332 250 L620 700 L-20 700 Z" fill={light ? '#dcd7cf' : '#1b2844'} />
        <g stroke={light ? '#0c121c' : '#ffffff'} strokeOpacity={light ? 0.18 : 0.28} strokeWidth="2">
          <line x1="268" y1="250" x2="-20" y2="700" />
          <line x1="332" y1="250" x2="620" y2="700" />
        </g>
        {/* Middenstreep: kortere streepjes richting de horizon */}
        <g fill="#e5a83b">
          <polygon points="297,262 303,262 304,278 296,278" opacity="0.35" />
          <polygon points="295,300 305,300 307,330 293,330" opacity="0.5" />
          <polygon points="291,372 309,372 313,430 287,430" opacity="0.7" />
          <polygon points="283,500 317,500 326,610 274,610" opacity="0.9" />
        </g>
        <line
          x1="0"
          y1="250"
          x2="600"
          y2="250"
          stroke={light ? '#0c121c' : '#ffffff'}
          strokeOpacity="0.12"
        />
        <rect x="0" y="0" width="600" height="700" fill={`url(#fade-${kind})`} />
      </svg>
    </div>
  )
}
