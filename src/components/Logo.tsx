import Link from 'next/link'

export function Logo({ tone = 'dark', onClick }: { tone?: 'dark' | 'light'; onClick?: () => void }) {
  const main = tone === 'dark' ? 'text-ink' : 'text-paper'
  return (
    <Link
      href="/#home"
      onClick={onClick}
      aria-label="Autorijschool Yorulmaz, naar de homepage"
      className="group inline-flex flex-col leading-none"
    >
      <span
        className={`font-display text-[1.3rem] font-extrabold tracking-[0.04em] font-wide ${main}`}
      >
        YORULMAZ
      </span>
      <span className="mt-1 flex items-center gap-2">
        <span className="h-px w-5 bg-signal transition-all duration-300 group-hover:w-7" />
        <span
          className={`text-[0.625rem] font-semibold tracking-[0.32em] ${tone === 'dark' ? 'text-muted' : 'text-paper/65'}`}
        >
          AUTORIJSCHOOL
        </span>
      </span>
    </Link>
  )
}
