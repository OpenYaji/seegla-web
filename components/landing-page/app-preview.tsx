'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

type Slide = {
  key: string
  src: string
  alt: string
  title?: string
  kicker?: string
  meta?: string
}

/**
 * The screens inside the phone frame.
 *
 * A scroll track with snap points, so a screen is moved with a swipe, a
 * trackpad, the arrow keys, or the dots. It is a real scroll container
 * rather than a gesture handler, which means it cannot trap the page scroll
 * and it works the same way for everyone.
 *
 * The dots are there because a swipe is not an affordance. Someone who
 * cannot swipe needs a way to reach the next screen, and so does anyone
 * who simply does not know the frame can be dragged.
 */
export default function AppPreview({ slides }: { slides: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' })
  }, [])

  // The dot follows the screen, whichever way the screen moved.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const index = Math.round(track.scrollLeft / track.clientWidth)
      setActive((current) => (current === index ? current : index))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  if (slides.length === 0) return null

  return (
    <>
      <div
        ref={trackRef}
        role="region"
        aria-label="Seegla app screens"
        tabIndex={0}
        className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
      >
        {slides.map((slide) => (
          <div
            key={slide.key}
            className="relative h-full w-full shrink-0 snap-center"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 640px) 11.5rem, (max-width: 1024px) 13rem, 16.5rem"
              className="object-cover"
            />

            {slide.title ? (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/90 to-transparent px-3.5 pb-8 pt-14">
                <p className="font-headline text-[0.7rem] font-bold leading-tight text-on-navy">
                  {slide.title}
                </p>
                {slide.kicker ? (
                  <p className="mt-1 text-[0.62rem] italic leading-tight text-on-navy-muted">
                    {slide.kicker}
                  </p>
                ) : null}
                {slide.meta ? (
                  <p className="mt-1 text-[0.58rem] leading-tight text-on-navy-muted">
                    {slide.meta}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* One dot per screen. They are the visible way to reach a screen
          without swiping. */}
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Show ${slide.title ?? `screen ${i + 1}`}`}
            aria-current={i === active}
            className="focus-ring flex h-5 w-5 items-center justify-center rounded-full"
          >
            <span
              className={`block h-1.5 w-1.5 rounded-full transition-colors ${
                i === active ? 'bg-on-navy' : 'bg-on-navy/50'
              }`}
            />
          </button>
        ))}
      </div>
    </>
  )
}
