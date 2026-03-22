'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'ROI', href: '/#roi' },
  { label: 'FAQ', href: '/#faq' },
]

const SECTION_IDS = ['how-it-works', 'features', 'roi', 'faq', 'waitlist']

export default function MarketingNav() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const offset = window.scrollY + 120
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && offset >= el.offsetTop && offset < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
          return
        }
      }
      setActiveSection('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const sectionId = (href: string) => href.replace('/#', '')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">

      {/* ── Nav container — glass ──────────────────────────────────────────── */}
      <div
        className={`flex w-full max-w-7xl items-center justify-between md:grid md:grid-cols-3 rounded-2xl px-5 py-1 transition-all duration-500 ${scrolled
          ? 'shadow-[0_8px_32px_rgba(0,17,72,0.18),0_1px_0_rgba(255,255,255,0.6)_inset]'
          : 'shadow-[0_4px_24px_rgba(0,17,72,0.10),0_1px_0_rgba(255,255,255,0.5)_inset]'
          }`}
        style={{
          background: scrolled
            ? 'linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(240,244,255,0.60) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(230,237,255,0.40) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.45)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-start py-1"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative flex items-center overflow-hidden h-14 w-[240px] group">
            <Image
              src="/seeglat2.png"
              alt="SEEGLA"
              width={240}
              height={120}
              className="h-14 w-auto object-contain transition-all duration-300 md:group-hover:opacity-0 md:group-hover:-translate-y-full absolute left-0"
              priority
            />
            <span className="absolute left-1/2 -translate-x-1/2 text-lg font-headline font-bold text-[#001148] opacity-0 translate-y-full transition-all duration-300 md:group-hover:opacity-100 md:group-hover:translate-y-0 whitespace-nowrap">
              Homepage
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center justify-center gap-1 md:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const id = sectionId(href)
            const isActive = activeSection === id
            return (
              <a
                key={id}
                href={href}
                className={`relative rounded-xl px-3 py-1.5 font-headline text-sm font-bold transition-all duration-200 ${isActive
                  ? '-translate-y-0.5'
                  : 'hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                style={
                  isActive
                    ? {
                      color: '#ffffff',
                      background: 'linear-gradient(135deg, rgba(27,154,170,0.80) 0%, rgba(21,123,137,0.65) 100%)',
                      boxShadow: '0 1px 0 rgba(255,255,255,0.40) inset, 0 -1px 0 rgba(0,17,72,0.10) inset, 0 4px 16px rgba(27,154,170,0.30)',
                      border: '1px solid rgba(255,255,255,0.35)',
                    }
                    : {
                      color: '#000000',
                      background: 'transparent',
                      border: '1px solid transparent',
                    }
                }
                onMouseEnter={(e) => {
                  if (isActive) return
                  const el = e.currentTarget
                  el.style.color = '#ffffff'
                  el.style.background = 'linear-gradient(135deg, rgba(27,154,170,0.75) 0%, rgba(21,123,137,0.65) 100%)'
                  el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.40) inset, 0 -1px 0 rgba(0,17,72,0.10) inset, 0 4px 16px rgba(27,154,170,0.30)'
                  el.style.border = '1px solid rgba(255,255,255,0.35)'
                }}
                onMouseLeave={(e) => {
                  if (isActive) return
                  const el = e.currentTarget
                  el.style.color = '#000000'
                  el.style.background = 'transparent'
                  el.style.boxShadow = 'none'
                  el.style.border = '1px solid transparent'
                }}
                onMouseDown={(e) => {
                  const el = e.currentTarget
                  el.style.background = 'linear-gradient(135deg, rgba(21,123,137,0.85) 0%, rgba(27,154,170,0.70) 100%)'
                  el.style.boxShadow = '0 2px 6px rgba(0,17,72,0.15) inset'
                }}
                onMouseUp={(e) => {
                  if (isActive) return
                  const el = e.currentTarget
                  el.style.background = 'linear-gradient(135deg, rgba(27,154,170,0.75) 0%, rgba(21,123,137,0.65) 100%)'
                  el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.40) inset, 0 4px 16px rgba(27,154,170,0.30)'
                }}
              >
                {label}
              </a>
            )
          })}
        </nav>

        {/* Book a Demo — glass teal button */}
        <div className="hidden items-center justify-end gap-2 md:flex">
          <Link href="/book-a-demo">
            <button
              className="group relative flex items-center gap-2 rounded-xl px-6 py-3 font-headline text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                color: '#ffffff',
                background: 'linear-gradient(135deg, rgba(27,154,170,0.75) 0%, rgba(21,123,137,0.65) 100%)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.35)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.40) inset, 0 -1px 0 rgba(0,17,72,0.10) inset, 0 4px 16px rgba(27,154,170,0.30)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.background = 'linear-gradient(135deg, rgba(27,154,170,0.90) 0%, rgba(21,123,137,0.80) 100%)'
                el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.50) inset, 0 -1px 0 rgba(0,17,72,0.12) inset, 0 6px 20px rgba(27,154,170,0.40)'
                el.style.border = '1px solid rgba(255,255,255,0.50)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = 'linear-gradient(135deg, rgba(27,154,170,0.75) 0%, rgba(21,123,137,0.65) 100%)'
                el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.40) inset, 0 -1px 0 rgba(0,17,72,0.10) inset, 0 4px 16px rgba(27,154,170,0.30)'
                el.style.border = '1px solid rgba(255,255,255,0.35)'
              }}
              onMouseDown={(e) => {
                const el = e.currentTarget
                el.style.background = 'linear-gradient(135deg, rgba(21,123,137,0.85) 0%, rgba(27,154,170,0.70) 100%)'
                el.style.boxShadow = '0 2px 6px rgba(0,17,72,0.15) inset'
                el.style.transform = 'translateY(1px)'
              }}
              onMouseUp={(e) => {
                const el = e.currentTarget
                el.style.background = 'linear-gradient(135deg, rgba(27,154,170,0.90) 0%, rgba(21,123,137,0.80) 100%)'
                el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.50) inset, 0 6px 20px rgba(27,154,170,0.40)'
                el.style.transform = 'translateY(-2px)'
              }}
            >
              Book a Demo
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex justify-end md:hidden">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#001148] transition-colors"
            style={{ background: 'rgba(255,255,255,0.40)', border: '1px solid rgba(255,255,255,0.50)' }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — glass */}
      {mobileOpen && (
        <div
          className="absolute top-full left-4 right-4 mt-2 rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,17,72,0.16)]"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.80) 0%, rgba(240,244,255,0.70) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.50)',
          }}
        >
          <nav className="mb-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 font-headline text-sm font-bold text-black transition-all duration-150 hover:-translate-y-px active:translate-y-px"
                style={{ border: '1px solid transparent' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(198,197,209,0.25) 100%)'
                  el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 10px rgba(0,17,72,0.08)'
                  el.style.border = '1px solid rgba(255,255,255,0.55)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.background = 'transparent'
                  el.style.boxShadow = 'none'
                  el.style.border = '1px solid transparent'
                }}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <a
              href="/#waitlist"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center rounded-xl px-4 py-2.5 font-headline text-sm font-semibold text-[#001148] transition-all duration-150"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.70) 0%, rgba(198,197,209,0.25) 100%)',
                border: '1px solid rgba(255,255,255,0.55)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 4px 12px rgba(0,17,72,0.07)',
              }}
            >
              Join Waitlist
            </a>
            <Link
              href="/book-a-demo"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 font-headline text-sm font-bold text-white transition-all duration-150"
              style={{
                background: 'linear-gradient(135deg, rgba(27,154,170,0.80) 0%, rgba(21,123,137,0.70) 100%)',
                border: '1px solid rgba(255,255,255,0.35)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.40) inset, 0 4px 16px rgba(27,154,170,0.30)',
              }}
            >
              Book a Demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
