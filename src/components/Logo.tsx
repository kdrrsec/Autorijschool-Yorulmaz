import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/images/logo.png'

export function Logo({
  className = 'h-11 lg:h-[3.25rem]',
  onClick,
  priority,
}: {
  className?: string
  onClick?: () => void
  priority?: boolean
}) {
  return (
    <Link
      href="/#home"
      onClick={onClick}
      aria-label="Autorijschool Yorulmaz, naar de homepage"
      className="inline-flex shrink-0 transition-opacity hover:opacity-90"
    >
      <Image
        src={logo}
        alt="Autorijschool Yorulmaz – Met vertrouwen de weg op"
        priority={priority}
        sizes="200px"
        className={`w-auto ${className}`}
      />
    </Link>
  )
}
