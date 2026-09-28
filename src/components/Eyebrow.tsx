export function Eyebrow({
  children,
  tone = 'dark',
  className = '',
  reveal = true,
}: {
  children: React.ReactNode
  tone?: 'dark' | 'light'
  className?: string
  reveal?: boolean
}) {
  return (
    <p
      className={`label flex items-center gap-3 ${tone === 'dark' ? 'text-muted' : 'text-paper/60'} ${className}`}
      data-reveal={reveal ? '' : undefined}
    >
      <span className="h-px w-6 bg-signal" aria-hidden />
      {children}
    </p>
  )
}
