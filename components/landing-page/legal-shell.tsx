import Image from 'next/image'
import Link from 'next/link'

/**
 * Shared frame for the legal pages.
 *
 * The note at the top is deliberate. These pages were written from the
 * product's actual behaviour, not from a signed document, so they are marked
 * for legal review rather than presented as settled.
 */
export default function LegalShell({
  title,
  updated,
  intro,
  children,
}: {
  title: string
  updated: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-surface-base">
      <header className="border-b border-hairline/50 bg-surface-lowest">
        <div className="mx-auto flex h-20 max-w-shell items-center gap-4 px-6 sm:px-8 lg:px-12">
          <Link href="/" className="focus-ring flex shrink-0 items-center rounded-md" aria-label="Seegla home">
            <Image src="/seeglat2.png" alt="Seegla" width={240} height={120} className="h-9 w-auto" />
          </Link>
          <Link
            href="/"
            className="focus-ring ml-auto inline-flex min-h-11 items-center rounded-md px-2 text-sm font-medium text-navy transition-colors hover:text-eucalyptus-deep"
          >
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <p className="breadcrumb text-eucalyptus-deep">
          <span>Legal</span>
        </p>
        <h1 className="mt-5 font-headline text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight text-navy">
          {title}
        </h1>
        <p className="mt-3 text-sm text-ink-muted">Last updated {updated}</p>

        <div className="mt-8 rounded-lg border border-hairline/60 bg-surface-high px-5 py-4">
          <p className="text-sm leading-relaxed text-ink-muted">
            <span className="font-semibold text-navy">Note for review.</span> This page was
            drafted from how Seegla actually works on {updated}. It is not yet signed off by
            legal counsel. Have a lawyer check it before you publish it to visitors.
          </p>
        </div>

        <p className="mt-10 text-lg leading-relaxed text-ink-muted">{intro}</p>

        <div className="mt-10 space-y-10">{children}</div>
      </main>

      <footer className="border-t border-hairline/50 bg-surface-lowest py-10">
        <div className="mx-auto max-w-shell px-6 sm:px-8 lg:px-12">
          <p className="text-sm text-ink-muted">
            © 2026 Seegla. Philippines. Healthy People. Growing Business.
          </p>
        </div>
      </footer>
    </div>
  )
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="font-headline text-title-md font-extrabold text-navy">{heading}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-muted">{children}</div>
    </section>
  )
}
