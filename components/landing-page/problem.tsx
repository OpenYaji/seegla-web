import AnimateOnScroll from '@/components/ui/animate-on-scroll'
import { PROBLEM } from './content'

/**
 * The problem.
 *
 * Composition: 5/7 split on navy. The figure carries the left column, the two
 * consequences sit on the right as plain statements.
 *
 * There are no cards here. The figure and each consequence are separated by
 * whitespace and marked with a short eucalyptus rule, which is the motif the
 * breadcrumb also uses. A row of icon cards would have made three equal
 * things out of one statistic and two consequences.
 */
export default function Problem() {
  return (
    <section id="the-problem" className="bg-navy py-24 sm:py-28">
      <div className="mx-auto max-w-shell px-6 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <AnimateOnScroll animation="fade-right" once>
              <p className="breadcrumb text-on-navy-muted">
                <span>{PROBLEM.label}</span>
              </p>
              <h2 className="mt-6 font-headline text-headline-md font-extrabold leading-tight text-on-navy sm:text-[2.25rem]">
                {PROBLEM.headline}
              </h2>

              <div className="mt-12">
                <span
                  aria-hidden="true"
                  className="block h-px w-10 bg-eucalyptus"
                />
                <p className="mt-8 font-headline text-[clamp(3.5rem,8vw,5rem)] font-extrabold leading-none tracking-tight text-on-navy">
                  {PROBLEM.lead.figure}
                </p>
                <p className="mt-4 text-lg leading-snug text-on-navy-muted">
                  <span className="font-bold text-on-navy">
                    Filipino employees
                  </span>{' '}
                  report feeling burned out
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="lg:col-span-7 lg:pt-16">
            <AnimateOnScroll animation="fade-left" delay={120} once>
              <p className="max-w-copy text-xl leading-relaxed text-on-navy-muted">
                {PROBLEM.body}
              </p>

              <dl className="mt-16 space-y-12">
                {PROBLEM.points.map((point) => (
                  <div key={point.title}>
                    <span
                      aria-hidden="true"
                      className="block h-px w-10 bg-eucalyptus"
                    />
                    <dt className="mt-5 font-headline text-title-md font-bold text-on-navy">
                      {point.title}
                    </dt>
                    <dd className="mt-1 text-on-navy-muted">{point.body}</dd>
                  </div>
                ))}
              </dl>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
