import Link from 'next/link'
import { ArrowRight, WhatsApp } from './Icons'

type Variant = 'primary' | 'signal' | 'outline' | 'outline-light' | 'whatsapp'

const styles: Record<Variant, string> = {
  primary: 'bg-navy text-paper shadow-card hover:bg-navy-soft',
  signal: 'bg-signal text-ink hover:bg-[#efb857]',
  outline: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  'outline-light': 'border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink',
  whatsapp: 'border border-ink/15 bg-white text-ink shadow-card hover:border-wa hover:text-wa',
}

type Props = {
  href: string
  variant?: Variant
  children: React.ReactNode
  className?: string
  icon?: 'arrow' | 'whatsapp' | 'none'
}

export function Button({ href, variant = 'primary', children, className = '', icon = 'arrow' }: Props) {
  const external = href.startsWith('http')
  const content = (
    <>
      {icon === 'whatsapp' && <WhatsApp className="size-[1.1rem]" />}
      <span>{children}</span>
      {icon === 'arrow' && (
        <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
      )}
    </>
  )
  const classes = `group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-6 text-[0.975rem] font-semibold transition-colors duration-200 active:translate-y-px ${styles[variant]} ${className}`

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
