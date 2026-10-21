'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import type { HeroSlide } from '@/lib/marketing-images'

/**
 * The interactive half of the hero carousel. The slide list arrives as a
 * prop, so the images can come from the folder on disk.
 *
 * Two deliberate departures from the reference design:
 *
 * 1. The carousel does not advance on a timer. A carousel that moves on its
 *    own needs a pause control to satisfy WCAG 2.2.2, and a pause control
 *    that sits in the hero is more visual weight than the reference spends on
 *    anything else. The track below shows position, and the arrows and the
 *    dots drive it.
 *
 * 2. The copy sits directly on the photograph. A panel behind the words was
 *    tried and cut: it drew a visible rectangle on the picture. Legibility
 *    comes from the scrim instead, a full-bleed vertical wash with no edges,
 *    so the photograph is darkened rather than framed.
 *
 * The slide list arrives as a prop, read from the folder on the server. There
 * is no API route and no polling: the browser asks for the pictures straight
 * from `/public/marketing/`, and a refresh picks up a file that was added,
 * renamed or replaced.
 */

export default function HeroCarouselClient({
  slides,
}: {
  slides: HeroSlide[]
}) {
  const [index, setIndex] = useState(0)
  const count = slides.length

  const go = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') go(index - 1)
      if (event.key === 'ArrowRight') go(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index])

  // The slide set is fixed for the life of the page, so the index only ever
  // has to be clamped once, while rendering.
  if (!count) return null

  const active = Math.min(index, count - 1)
  const slide = slides[active]

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Seegla product highlights"
      className="relative isolate overflow-hidden bg-navy"
    >
      <div className="relative h-[clamp(30rem,78vh,44rem)] w-full">
        {slides.map((item, i) => (
          <div
            key={item.file}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === active ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              priority={i === 0}
              /* Every slide is in the viewport. Left lazy, the second and
                 third slides are not fetched until they scroll into view,
                 which flashes an empty frame when the visitor advances. */
              loading={i === 0 ? undefined : 'eager'}
              sizes="100vw"
              /* Served straight from `public/marketing/`, bypassing the image
                 optimizer. The optimizer caches by URL and would keep serving
                 an old encoding after a file is swapped; unoptimized plus the
                 `?v=<mtime>` token means a changed file always shows. */
              unoptimized
              className="object-cover"
            />
          </div>
        ))}

        {/* Scrim. A gradient rather than a flat wash: strong where the text
            sits, light at the edges so the photograph still reads. */}
        <div aria-hidden="true" className="hero-scrim absolute inset-0" />

        {/* The copy sits on the photograph, with no panel behind it. The scrim
            above is what carries the contrast. */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-2xl text-center">
            <p className="text-balance font-headline text-label-md font-bold uppercase tracking-[0.2em] text-on-navy">
              {slide.kicker}
            </p>
            <h1 className="mt-4 text-balance font-headline text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[1.05] tracking-tight text-on-navy">
              {slide.title}
            </h1>
            <Link
              href={slide.cta.href}
              className="focus-ring mt-9 inline-flex min-h-12 items-center justify-center rounded-xl bg-on-navy px-9 py-4 font-headline text-sm font-extrabold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-surface-low"
            >
              {slide.cta.label}
            </Link>
          </div>
        </div>

        {/* Previous and next. On a narrow screen the copy reaches the edges, so
            the arrows move to the foot of the hero instead of sitting on the
            headline. From lg they take the edges, as the reference places
            them. */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="focus-ring absolute bottom-20 left-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-on-navy/90 text-navy transition-colors hover:bg-on-navy lg:bottom-auto lg:left-6 lg:top-1/2 lg:h-12 lg:w-12 lg:-translate-y-1/2"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="focus-ring absolute bottom-20 right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-on-navy/90 text-navy transition-colors hover:bg-on-navy lg:bottom-auto lg:right-6 lg:top-1/2 lg:h-12 lg:w-12 lg:-translate-y-1/2"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Progress track. The hit area is 44px tall; the bar inside it is
            the visible indicator, so the control is still tappable. */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 pb-1">
          {slides.map((item, i) => (
            <button
              key={item.file}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className="focus-ring flex h-11 w-11 items-center justify-center lg:w-8"
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-on-navy' : 'w-2.5 bg-on-navy/80 hover:bg-on-navy'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        Slide {active + 1} of {count}: {slide.title}
      </p>
    </section>
  )
}
