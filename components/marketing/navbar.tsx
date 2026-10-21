'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SITE_NAV } from '@/components/landing-page/content'

const SECTION_IDS = SITE_NAV.categories.map((c) => c.href.replace('#', ''))

/**
 * Marketing navigation.
 *
 * Two tiers, following the reference design: a utility row with the brand,
 * the partner-pricing line, the primary action and a log-in link, and a
 * category row separated by a hairline.
 *
 * The previous version drove its hover, active and pressed states from
 * twenty inline mouse handlers that mutated element styles. That is why it
 * could not express a focus state, and it is why the active item was a
 * glowing gradient pill. All of it is now a class, so the states are visible
 * to the keyboard as well as the mouse.
 */
export default function MarketingNav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const sectionIds = SECTION_IDS

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const probe = window.scrollY + 140
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && probe >= el.offsetTop && probe < el.offsetTop + el.offsetHeight) {
          current = id
          break
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the mobile menu, and focus returns to the control that
  // opened it.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-surface-lowest">
      <div className="mx-auto flex h-20 max-w-shell items-center gap-4 px-6 sm:px-8 lg:px-12">
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="marketing-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="focus-ring -ml-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-navy transition-colors hover:bg-surface-low md:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>

        <Link href="/" className="focus-ring flex min-h-11 shrink-0 items-center rounded-md" aria-label="Seegla home">
          <Image
            src="/seeglat2.png"
            alt="Seegla"
            width={240}
            height={120}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <span
          aria-hidden="true"
          className="hidden h-6 w-px bg-hairline lg:block"
        />
        <p className="hidden text-sm text-ink-muted lg:block">
          {SITE_NAV.note}
        </p>

        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <p className="hidden text-sm text-ink-muted xl:block">
            {SITE_NAV.stat.lead}{' '}
            <span className="font-headline font-bold text-eucalyptus-deep">
              {SITE_NAV.stat.figure}
            </span>{' '}
            {SITE_NAV.stat.tail}
          </p>

          <Link
            href={SITE_NAV.cta.href}
            className="cta-primary focus-ring inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 font-headline text-xs font-extrabold uppercase tracking-[0.1em] text-on-navy transition-transform hover:-translate-y-0.5 sm:px-6 sm:text-sm"
          >
            {SITE_NAV.cta.label}
          </Link>

          <Link
            href={SITE_NAV.login.href}
            className="focus-ring hidden min-h-11 items-center gap-2 rounded-md px-2 text-sm font-medium text-navy transition-colors hover:text-eucalyptus-deep sm:inline-flex"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
            </svg>
            {SITE_NAV.login.label}
          </Link>
        </div>
      </div>

      <nav aria-label="Sections" className="hidden border-t border-hairline/50 md:block">
        <ul className="mx-auto flex h-12 max-w-shell items-center justify-center gap-8 px-6 sm:px-8 lg:gap-10 lg:px-12">
          {SITE_NAV.categories.map((category) => {
            const id = category.href.replace('#', '')
            const isActive = active === id
            return (
              <li key={category.href}>
                <a
                  href={category.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`focus-ring inline-flex h-12 items-center border-b-2 text-label-md font-bold uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? 'border-eucalyptus text-navy'
                      : 'border-transparent text-ink-muted hover:border-hairline hover:text-navy'
                  }`}
                >
                  {category.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {open && (
        <div
          ref={menuRef}
          id="marketing-menu"
          className="absolute inset-x-0 top-full border-t border-hairline/50 bg-surface-lowest shadow-float md:hidden"
        >
          <nav aria-label="Sections" className="px-6 py-4">
            <ul className="flex flex-col">
              {SITE_NAV.categories.map((category) => (
                <li key={category.href}>
                  <a
                    href={category.href}
                    onClick={() => setOpen(false)}
                    className="focus-ring flex min-h-12 items-center border-b border-hairline/40 text-sm font-bold uppercase tracking-[0.12em] text-navy last:border-b-0"
                  >
                    {category.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href={SITE_NAV.login.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring flex min-h-12 items-center text-sm font-bold uppercase tracking-[0.12em] text-navy"
                >
                  {SITE_NAV.login.label}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
