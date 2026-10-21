import AnimateOnScroll from '@/components/ui/animate-on-scroll'
import { HOW_IT_WORKS, STEPS } from './content'

/**
 * How it works.
 *
 * Composition: 7/5 split, the mirror of the hero, so the page alternates
 * rather than repeating one grid.
 *
 * The three steps are an editorial numbered list, not three cards. Identical
 * cards with round icon tiles made the steps look interchangeable; the ordinal
 * and the whitespace carry the sequence instead.
 *
 * The moments inside the day panel use the same short eucalyptus rule the
 * problem section uses, so the page's one repeated gesture runs through every
 * list on it.
 */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface-lowest py-20 sm:py-24">
      <div className="mx-auto max-w-shell px-6 sm:px-8 lg:px-12">
        <AnimateOnScroll once>
          <p className="breadcrumb text-eucalyptus-deep">
            <span>{HOW_IT_WORKS.label}</span>
          </p>
          <h2 className="mt-5 max-w-[24ch] font-headline text-headline-md font-extrabold text-navy sm:text-[2.25rem]">
            {HOW_IT_WORKS.headline}
          </h2>
        </AnimateOnScroll>

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <ol className="lg:col-span-7">
            {STEPS.map((step, i) => {
              const [ordinal, ...rest] = step.title.split('. ')
              return (
                <li key={step.title} className="[&:not(:first-child)]:mt-12">
                  <AnimateOnScroll animation="fade-up" delay={i * 80} once>
                    <div className="grid gap-4 sm:grid-cols-[5rem_1fr] sm:gap-8">
                      <span
                        aria-hidden="true"
                        className="font-headline text-[2.5rem] font-extrabold leading-none tracking-tight text-eucalyptus-deep"
                      >
                        {ordinal}
                      </span>
                      <div>
                        <h3 className="font-headline text-title-md font-extrabold text-navy">
                          {rest.join('. ')}
                        </h3>
                        <p className="mt-3 max-w-copy leading-relaxed text-ink-muted">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                </li>
              )
            })}
          </ol>

          <div className="lg:col-span-5">
            <AnimateOnScroll animation="fade-left" delay={120} once>
              <div className="rounded-lg bg-navy p-8 sm:p-10">
                <p className="breadcrumb text-on-navy-muted">
                  <span>{HOW_IT_WORKS.day.label}</span>
                </p>
                <dl className="mt-8 space-y-8">
                  {HOW_IT_WORKS.day.moments.map((moment) => (
                    <div key={moment.time}>
                      <span
                        aria-hidden="true"
                        className="block h-px w-10 bg-eucalyptus"
                      />
                      <dt className="mt-5 font-headline text-label-md font-bold uppercase tracking-[0.18em] text-eucalyptus">
                        {moment.time}
                      </dt>
                      <dd className="mt-2 leading-relaxed text-on-navy-muted">
                        {moment.body}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
