import AnimateOnScroll from '@/components/ui/animate-on-scroll'
import { ROI } from './content'

/**
 * Business impact.
 *
 * The figure sits in a navy panel, which is the tonal layering DESIGN.md
 * asks for: one raised dark block against a light section, instead of a
 * floating card with a shadow on every side.
 *
 * The four benefits are a list, marked with the same short eucalyptus rule
 * the problem section uses. That rule is the page's one repeated gesture.
 *
 * On a wide screen the panel leads and the copy follows, the mirror of how
 * it works. Both sections carry a dark block and a column of text, so
 * putting them the other way round keeps the page from repeating one split
 * twice. The markup still reads heading first, so the copy leads on a phone.
 */
export default function BusinessImpact() {
  return (
    <section id="roi" className="bg-surface-lowest py-20 sm:py-24">
      <div className="mx-auto max-w-shell px-6 sm:px-8 lg:px-12">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:order-first lg:col-span-5">
            <AnimateOnScroll animation="fade-right" once>
              <div className="rounded-lg bg-navy p-10 text-on-navy sm:p-12">
                <p className="font-headline text-label-md font-extrabold uppercase tracking-[0.2em] text-eucalyptus">
                  {ROI.figure.label}
                </p>
                <p className="mt-8 font-headline text-[clamp(3.5rem,9vw,5rem)] font-extrabold leading-none tracking-tight text-on-navy">
                  {ROI.figure.value}
                </p>
                <p className="mt-4 font-headline text-title-md font-bold text-on-navy">
                  {ROI.figure.caption}
                </p>
                <p className="mt-8 border-t border-on-navy/20 pt-6 text-sm leading-relaxed text-on-navy-muted">
                  {ROI.figure.note}
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="lg:order-last lg:col-span-7">
            <AnimateOnScroll animation="fade-left" delay={120} once>
              <p className="breadcrumb text-eucalyptus-deep">
                <span>{ROI.label}</span>
              </p>
              <h2 className="mt-5 max-w-[16ch] font-headline text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight text-navy">
                {ROI.headline}
                <br />
                {ROI.headlineSecond}
              </h2>
              <p className="mt-6 max-w-copy text-lg leading-relaxed text-ink-muted">
                {ROI.body}
              </p>

              <ul className="mt-12 space-y-8">
                {ROI.points.map((point) => (
                  <li key={point} className="flex gap-5">
                    <span
                      aria-hidden="true"
                      className="mt-3 h-px w-6 shrink-0 bg-eucalyptus"
                    />
                    <span className="text-base leading-relaxed text-ink-muted">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
