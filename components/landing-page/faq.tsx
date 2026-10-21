'use client'

import { useId, useState } from 'react'
import AnimateOnScroll from '@/components/ui/animate-on-scroll'
import { FAQS } from './content'

/**
 * Frequently asked questions.
 *
 * A native disclosure: a real button, aria-expanded, and a region the button
 * controls. The open panel animates with the grid-rows technique, so the
 * height is content-driven rather than a guessed max-height.
 *
 * The open item gets a background shift instead of a border, which is the
 * surface hierarchy DESIGN.md asks for.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section id="faq" className="bg-surface-low py-20 sm:py-24">
      <div className="mx-auto max-w-shell px-6 sm:px-8 lg:px-12">
        <AnimateOnScroll once>
          <div className="flex justify-center">
            <p className="breadcrumb text-eucalyptus-deep">
              <span>FAQ</span>
            </p>
          </div>
          <h2 className="mt-5 text-center font-headline text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-navy">
            Why SEEGLA?
          </h2>
        </AnimateOnScroll>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            const buttonId = `${baseId}-btn-${i}`
            const panelId = `${baseId}-panel-${i}`

            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-lg transition-colors duration-300 ${
                  isOpen ? 'bg-surface-lowest' : 'bg-surface-lowest/60'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="focus-ring flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                  >
                    <span className="font-headline text-title-md font-extrabold text-navy">
                      {item.q}
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-7 text-base leading-relaxed text-ink-muted sm:px-8">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
