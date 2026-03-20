'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in'
  threshold?: number
  once?: boolean
}

export default function AnimateOnScroll({
  children,
  className,
  delay = 0,
  animation = 'fade-up',
  threshold = 0.1,
  once = false,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
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
  }, [threshold, once])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        !isVisible && 'opacity-0',
        !isVisible && animation === 'fade-up' && 'translate-y-10',
        !isVisible && animation === 'fade-down' && '-translate-y-10',
        !isVisible && animation === 'fade-left' && 'translate-x-10',
        !isVisible && animation === 'fade-right' && '-translate-x-10',
        !isVisible && animation === 'zoom-in' && 'scale-95',
        isVisible && 'opacity-100 translate-y-0 translate-x-0 scale-100',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
