import { Button } from '@/components/Button'

export default function NotFound() {
  return (
    <section className="pt-16 lg:pt-[4.5rem]">
      <div className="container-site py-24 sm:py-32">
        <p className="label text-muted">Fout 404</p>
        <h1 className="mt-5 max-w-xl text-[2.3rem] leading-[1.05] font-bold tracking-[-0.025em] sm:text-[3rem]">
          Deze pagina bestaat niet (meer).
        </h1>
        <p className="mt-5 max-w-md text-muted">Misschien is de link verouderd. Via de homepage vind je alles terug.</p>
        <div className="mt-9">
          <Button href="/">Naar de homepage</Button>
        </div>
      </div>
    </section>
  )
}
