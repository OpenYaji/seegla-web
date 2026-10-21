import Link from 'next/link'
import AppFrame from './app-frame'
import { FEATURES } from './content'

/**
 * The features section.
 *
 * The horizontal band of cards that sat here repeated the feature set a
 * second time, right under the phone frame that already carried it. The band
 * is gone. What is left is the copy and the product: the frame slides through
 * the features one screen at a time.
 *
 * The section keeps its id, so the navigation and the footer still land here.
 */
export default function Features() {
  return (
    <section id="features" className="bg-surface-low py-20 sm:py-24">
      <div className="mx-auto max-w-shell px-6 sm:px-8 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="breadcrumb text-eucalyptus-deep">
              <span>{FEATURES.label}</span>
            </p>
            <h2 className="mt-5 max-w-[22ch] font-headline text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight text-navy">
              {FEATURES.headline}
            </h2>
            <p className="mt-6 max-w-copy text-lg leading-relaxed text-ink-muted">
              {FEATURES.lead}
            </p>

            <Link
              href={FEATURES.cta.href}
              className="cta-primary focus-ring mt-8 inline-flex min-h-12 items-center justify-center rounded-xl px-8 py-4 font-headline text-sm font-extrabold uppercase tracking-[0.1em] text-on-navy transition-transform hover:-translate-y-0.5"
            >
              {FEATURES.cta.label}
            </Link>
          </div>

          {/* The app, in a phone frame. It fills the half of the section the
              copy leaves open, and it is where the real screenshot lands. */}
          <div className="lg:col-span-6 lg:flex lg:justify-end">
            <AppFrame />
          </div>
        </div>
      </div>
    </section>
  )
}
