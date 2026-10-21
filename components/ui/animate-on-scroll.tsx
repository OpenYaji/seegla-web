'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in'
  threshold?: number
  once?: boolean
}

const REDUCE_MOTION = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCE_MOTION)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

/**
 * Scroll reveal.
 *
 * Three changes from the previous version:
 *
 * 1. `once` now defaults to true. The old default re-hid the element every
 *    time it scrolled out of view, so a section that was already read faded
 *    away again on the way back up.
 *
 * 2. Anyone who asked their operating system to reduce motion gets the
 *    content immediately, with no transition and no hidden state. The
 *    previous version left the element at opacity zero until an observer
 *    fired, which meant a reduced-motion user could be served invisible text.
 *
 * 3. The motion preference is read with `useSyncExternalStore` rather than
 *    stored in component state. The state version needed a `setState` inside
 *    an effect, which React reported as a state update on an unmounted
 *    component. The subscription version has no such update at all.
 *
 * The sideways reveals move by one rem, not two. A two rem shift pushed the
 * column past the page gutter on a phone and gave the document a horizontal
 * scrollbar before the element ever appeared.
 */
export default function AnimateOnScroll({
  children,
  className,
  delay = 0,
  animation = 'fade-up',
  threshold = 0.12,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCE_MOTION).matches,
    () => false
  )

  useEffect(() => {
    if (reduced) return
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [threshold, once, reduced])

  const shown = reduced || isVisible

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        !shown && 'opacity-0',
        !shown && animation === 'fade-up'    && 'translate-y-8',
        !shown && animation === 'fade-down'  && '-translate-y-8',
        !shown && animation === 'fade-left'  && 'translate-x-4',
        !shown && animation === 'fade-right' && '-translate-x-4',
        !shown && animation === 'zoom-in'    && 'scale-95',
        shown && 'opacity-100 translate-y-0 translate-x-0 scale-100',
        className
      )}
      style={{
        transitionDelay: reduced ? '0ms' : `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </div>
  )
}
