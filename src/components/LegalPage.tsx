import { Eyebrow } from './Eyebrow'

export function LegalPage({
  label,
  title,
  updated,
  children,
}: {
  label: string
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <article className="pt-16 lg:pt-[4.5rem]">
      <div className="container-site py-16 sm:py-24">
        <div className="max-w-2xl">
          <Eyebrow reveal={false}>{label}</Eyebrow>
          <h1 className="mt-5 text-[2.3rem] leading-[1.05] font-bold tracking-[-0.025em] sm:text-[3rem]">
            {title}
          </h1>
          <p className="mt-4 text-sm text-subtle">Laatst bijgewerkt: {updated}</p>
          <div className="mt-12 space-y-5 text-ink/85 [&_h2]:mt-12 [&_h2]:text-[1.35rem] [&_h2]:leading-tight [&_h2]:font-semibold [&_h2]:text-ink [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </div>
    </article>
  )
}
