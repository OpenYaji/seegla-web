import AnimateOnScroll from '@/components/ui/animate-on-scroll'
import WaitlistForm from './waitlist-form'
import { WAITLIST } from './content'

/**
 * Lead capture.
 *
 * The list markers are a real list marker, coloured once, rather than a
 * character in the text. The footnote carries a small mark instead of a
 * third icon set.
 */
export default function Waitlist() {
  return (
    <section id="waitlist" className="bg-navy py-20 sm:py-24">
      <div className="mx-auto grid max-w-shell items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <AnimateOnScroll animation="fade-right" once>
          <div>
            <h2 className="font-headline text-[clamp(2rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-on-navy">
              {WAITLIST.headline}
              <br />
              {WAITLIST.headlineSecond}
            </h2>
            <p className="mt-6 max-w-copy text-lg leading-relaxed text-on-navy-muted">
              {WAITLIST.body}
            </p>

            <ul className="mt-10 space-y-4 text-on-navy-muted">
              {WAITLIST.points.map((point) => (
                <li key={point} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-3 h-px w-5 shrink-0 bg-eucalyptus"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="mt-10 flex items-center gap-3 font-headline text-label-md font-bold uppercase tracking-[0.16em] text-eucalyptus">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l7 3v6c0 4.2-2.9 7.7-7 9-4.1-1.3-7-4.8-7-9V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              {WAITLIST.footnote}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-left" delay={120} once>
          <div className="rounded-lg bg-surface-lowest p-8 shadow-float sm:p-12">
            <WaitlistForm />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
