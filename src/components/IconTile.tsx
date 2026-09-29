import type { LucideIcon } from 'lucide-react'

const tones = {
  signal: 'bg-signal-soft text-signal-deep',
  sky: 'bg-sky-deep text-blue',
  mint: 'bg-mint text-wa',
  rose: 'bg-rose text-amber-deep',
  navy: 'bg-navy text-signal',
} as const

export type Tone = keyof typeof tones

export function IconTile({
  icon: Icon,
  tone = 'signal',
  size = 'md',
}: {
  icon: LucideIcon
  tone?: Tone
  size?: 'sm' | 'md' | 'lg'
}) {
  const s = size === 'lg' ? 'size-16 rounded-2xl' : size === 'sm' ? 'size-10 rounded-xl' : 'size-13 rounded-2xl'
  const i = size === 'lg' ? 'size-7' : size === 'sm' ? 'size-5' : 'size-6'
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${s} ${tones[tone]}`} aria-hidden>
      <Icon className={i} strokeWidth={1.9} />
    </span>
  )
}
