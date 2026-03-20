'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'How it Works',    href: '/#how-it-works'    },
  { label: 'Features',           href: '/#features'           },
  { label: 'ROI & Benefits',  href: '/#roi-benefits'    },
  { label: 'FAQ',           href: '/#faq'           },

]

export default function MarketingNav() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [scrolled, setScrolled]           = useState(false)
  const [mobileOpen, setMobileOpen]       = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ['how-it-works', 'roi-benefits', 'success-stories', 'about', 'faq']
      const offset   = window.scrollY + 120

      for (const id of sections) {
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
      <div
        className={`flex w-full max-w-6xl items-center justify-between md:grid md:grid-cols-3 rounded-2xl border border-slate-200 bg-white px-5 py-1 transition-all duration-300 ${
          scrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-start py-1" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center overflow-hidden h-14 w-[240px] group">
            <Image
              src="/seeglat2.png"
              alt="SEEGLA"
              width={240}
              height={120}
              className="h-14 w-auto object-contain transition-all duration-300 md:group-hover:opacity-0 md:group-hover:-translate-y-full absolute left-0"
              priority
            />
            <span className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-[#001148] opacity-0 translate-y-full transition-all duration-300 md:group-hover:opacity-100 md:group-hover:translate-y-0">
              Homepage
            </span>
          </div>
        </Link>

        {/* Desktop nav - Centered */}
        <nav className="hidden items-center justify-center gap-1 text-sm font-medium md:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const id       = sectionId(href)
            const isActive = activeSection === id
            return (
              <a
                key={id}
                href={href}
                className={`rounded-lg px-3 py-1.5 transition-all duration-150 ${
                  isActive
                    ? 'bg-[#001148] text-white -translate-y-0.5 shadow-[0_4px_0_0_rgba(0,17,72,0.25)]'
                    : 'text-[#001148]/60 hover:bg-[#001148] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_rgba(0,17,72,0.25)]'
                }`}
              >
                {label}
              </a>
            )
          })}
        </nav>

        {/* CTA - Right Aligned */}
        <div className="hidden items-center justify-end gap-2 md:flex">
          <Link href="/book-a-demo">
            <Button
              size="sm"
              className="gap-1.5 rounded-full bg-[#1B9AAA] font-bold text-white transition-all duration-150 hover:bg-[#157B89] hover:-translate-y-0.5 shadow-[0_4px_0_0_rgba(27,154,170,0.35)] hover:shadow-[0_6px_0_0_rgba(27,154,170,0.35)] active:translate-y-1 active:shadow-[0_1px_0_0_rgba(27,154,170,0.35)]"
            >
              Request a Demo <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex justify-end md:hidden">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#001148] transition-colors hover:bg-slate-100"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <nav className="mb-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#001148] hover:bg-slate-50 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <Link href="/waitlist" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full rounded-full border-[#001148]/20 font-semibold text-[#001148]">
                Join Waitlist
              </Button>
            </Link>
            <Link href="/book-a-demo" onClick={() => setMobileOpen(false)}>
              <Button className="w-full gap-1.5 rounded-full bg-[#1B9AAA] font-bold text-white hover:bg-[#157B89]">
                Request a Demo <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
