'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import MarketingNav from '@/components/marketing/navbar'
import AnimateOnScroll from '@/components/ui/animate-on-scroll'
import {
  Zap, CreditCard, BarChart3, Footprints, Moon, Flame, Bell,
  ShieldCheck, CheckCircle2, ChevronDown, Check, ArrowUp,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    icon: Zap,
    title: '1. Daily Challenges',
    description:
      'Employees complete short, engaging wellness challenges that build healthy habits without disrupting work. Designed for the high-performance professional.',
  },
  {
    icon: CreditCard,
    title: '2. Company-Funded Rewards',
    description:
      'Points earned can be redeemed for local perks or cash via GCash integration, motivating participation and rewarding consistent healthy behavior.',
  },
  {
    icon: BarChart3,
    title: '3. Measurable Impact',
    description:
      'Track team performance, monitor burnout risk, and measure ROI with clean dashboards built for HR leaders and executives.',
  },
]

const FAQS = [
  {
    q: 'What is Seegla and who is it for?',
    a: 'Seegla is the first gamified corporate wellness platform specifically built for the Filipino workforce. It is designed for HR managers and CEOs at Philippine companies — particularly BPOs, SMEs, and mid-size corporations with 20 to 500 employees — who want to reduce burnout, improve productivity, and retain their people.',
  },
  {
    q: 'How does the pricing work?',
    a: 'Seegla is currently in beta and free for our partner companies. Our beta program is now closed to new applicants — but you can join the waitlist to be first in line when we open to new companies.',
  },
  {
    q: 'How do employees join?',
    a: 'HR managers receive a unique 6-character company code when they onboard. Employees download the Seegla app on their personal phone — iOS or Android — enter the company code, and are live within minutes. No IT setup required.',
  },
  {
    q: 'What activities earn points?',
    a: 'Points are earned only through verified activities — daily burnout check-in (10 pts), step tracking via Google Fit or Apple Health (up to 20 pts per day), daily login streak (5 pts per day), and the 8PM Promo Hour bonus points drop (15 to 30 pts). All points are verified by the app.',
  },
  {
    q: 'Can employers see individual employee health data?',
    a: 'No. Individual employee responses are completely private. HR managers and CEOs only see aggregated, anonymized team and department-level wellness scores. Seegla is fully compliant with the Philippine Data Privacy Act — Republic Act 10173.',
  },
  {
    q: 'What does the HR dashboard show?',
    a: 'The HR dashboard shows the company’s overall wellness score updated daily, a burnout risk index flagging departments with consistently low scores, check-in completion rates, department-by-department comparisons, and an automated weekly wellness report.',
  },
  {
    q: 'How does the rewards system work?',
    a: 'Companies fund their own rewards budget through the Seegla platform. HR sets the rewards table (e.g., 1,000 points = ₱50 via GCash). Employees earn points through verified daily activities and redeem them based on their company’s table. Seegla processes the redemption automatically.',
  },
  {
    q: 'Is Seegla available on iOS and Android?',
    a: 'Yes. Seegla is built using React Native via Expo — a single codebase that runs natively on both iOS and Android. No wearable device is required.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {FAQS.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-[#C6C5D1]/10 shadow-[0_10px_30px_rgba(0,17,72,0.06)] overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 p-8 text-left"
          >
            <span className="text-lg font-headline font-bold text-[#001148]">{item.q}</span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-[#45464F] transition-transform duration-200 ${open === i ? 'rotate-180' : ''
                }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? 'max-h-64' : 'max-h-0'
              }`}
          >
            <p className="px-8 pb-8 text-[#45464F] leading-relaxed font-medium">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function WaitlistForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    companySize: '1-50',
    role: 'hr',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setErrorMsg('Could not connect. Please try again.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-[#F7F9FC] border-0 border-b-2 border-[#C6C5D1] focus:border-[#1B9AAA] focus:ring-0 focus:outline-none transition-all px-0 py-4 text-sm font-medium text-[#191C1E] placeholder:text-[#45464F]/50'
  const labelClass =
    'block text-[10px] font-headline font-bold text-[#001148] uppercase tracking-widest mb-3'

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-[#1B9AAA] mb-4" />
        <h3 className="text-2xl font-headline font-extrabold text-[#001148] mb-2">
          You&apos;re on the list.
        </h3>
        <p className="text-[#45464F] font-medium">
          We&apos;ll reach out with early access details soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            required
            placeholder="Juan Dela Cruz"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Work Email</label>
          <input
            type="email"
            required
            placeholder="juan@company.ph"
            value={form.workEmail}
            onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Company Name</label>
        <input
          type="text"
          required
          placeholder="Enter your organization"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className={labelClass}>Company Size</label>
          <select
            value={form.companySize}
            onChange={(e) => setForm({ ...form, companySize: e.target.value })}
            className={inputClass}
          >
            <option value="1-50">1–50 employees</option>
            <option value="51-200">51–200 employees</option>
            <option value="201-500">201–500 employees</option>
            <option value="500+">500+ employees</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className={inputClass}
          >
            <option value="hr">HR Manager</option>
            <option value="ceo">CEO / Founder</option>
            <option value="ops">Operations</option>
            <option value="wellness">Wellness Lead</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      {status === 'error' && (
        <p className="text-sm text-[#ba1a1a] font-medium">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#1B9AAA] text-white py-5 rounded-2xl font-headline font-extrabold text-base hover:brightness-110 transition-all shadow-xl shadow-[#1B9AAA]/20 disabled:opacity-60"
      >
        {status === 'loading' ? 'Submitting…' : 'Join the Waitlist'}
      </button>
    </form>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <MarketingNav />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <header
        className="relative pt-32 pb-32 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #F7F9FC 0%, #ECEEF1 100%)' }}
      >
        <div className="max-w-[1280px] mx-auto px-8 text-center">
          <AnimateOnScroll animation="fade-up">
            <span className="inline-block bg-[#001148]/5 text-[#001148] px-4 py-1.5 rounded-full text-[10px] font-headline font-bold tracking-[0.2em] mb-8 uppercase">
              B2B CORPORATE WELLNESS PLATFORM
            </span>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={80}>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-[#001148] leading-[1.1] mb-8 tracking-tight max-w-4xl mx-auto">
              Your Healthiest Employees Are Your{' '}
              <span className="text-[#1B9AAA]">Top Performers.</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={160}>
            <p className="text-xl text-[#45464F] mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
              Seegla helps companies boost employee wellness, increase engagement, and reduce
              healthcare costs — delivering measurable results for the modern Filipino workforce.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={240}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link href="/book-a-demo">
                <button className="cursor-pointer bg-[#1B9AAA] text-white px-10 py-5 rounded-2xl font-headline font-bold text-base shadow-lg shadow-[#1B9AAA]/20 hover:-translate-y-1 transition-all active:scale-95">
                  Book a Demo
                </button>
              </Link>

              <a href="#waitlist">
                <button className="cursor-pointer bg-white text-[#001148] px-10 py-5 rounded-2xl font-headline font-bold text-base border border-[#C6C5D1]/30 shadow-[0_10px_30px_rgba(0,17,72,0.06)] hover:bg-[#ECEEF1] transition-all active:scale-95">
                  Join the Waitlist
                </button>
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </header>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <AnimateOnScroll>
            <div className="text-center mb-24">
              <span className="text-[#1B9AAA] font-headline font-bold tracking-widest text-xs uppercase">
                The Ecosystem
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-[#001148] mt-6">
                Simple, measurable, and impactful wellness.
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {STEPS.map((s, i) => (
              <AnimateOnScroll key={s.title} animation="fade-up" delay={i * 100}>
                <div className="p-10 rounded-3xl bg-[#F7F9FC] border border-[#C6C5D1]/20 hover:border-[#1B9AAA]/30 transition-colors h-full">
                  <div className="w-16 h-16 bg-[#1B9AAA]/10 rounded-2xl flex items-center justify-center mb-10">
                    <s.icon className="h-8 w-8 text-[#1B9AAA]" />
                  </div>
                  <h3 className="text-2xl font-headline font-extrabold text-[#001148] mb-5">
                    {s.title}
                  </h3>
                  <p className="text-[#45464F] leading-relaxed font-medium">{s.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES BENTO ───────────────────────────────────────────────────── */}
      <section id="features" className="py-32 bg-[#ECEEF1]/50">
        <div className="max-w-[1280px] mx-auto px-8">
          <AnimateOnScroll>
            <div className="mb-20 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-[#001148]">
                Everything they need. In their pocket.
              </h2>
              <p className="text-lg text-[#45464F] mt-6 font-medium">
                Built natively with{' '}
                <span className="text-[#1B9AAA] font-bold">React Native via Expo</span> for a
                premium experience on iOS and Android. Under 60 seconds to complete a full day.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Burnout check-in — large dark card */}
            <div className="md:col-span-5">
              <AnimateOnScroll animation="fade-up">
                <div className="rounded-[2rem] bg-[#001148] p-10 flex flex-col justify-between text-white relative overflow-hidden min-h-[420px]">
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-headline font-bold tracking-widest mb-8 border border-white/20 uppercase">
                      Core Experience
                    </span>
                    <h3 className="text-3xl font-headline font-extrabold mb-6">
                      60-second burnout check-in
                    </h3>
                    <p className="text-white/70 leading-relaxed max-w-sm">
                      Just 3 questions a day. Identify stress patterns before they lead to
                      turnover. Fast, anonymous, and essential.
                    </p>
                  </div>
                  <div className="mt-12 bg-white/5 rounded-t-3xl p-6 h-40 border-t border-x border-white/20">
                    <div className="w-full h-5 bg-white/10 rounded mb-4" />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-16 bg-[#1B9AAA]/30 rounded-xl flex items-center justify-center text-2xl">
                        😊
                      </div>
                      <div className="h-16 bg-white/10 rounded-xl" />
                      <div className="h-16 bg-white/10 rounded-xl" />
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* 8PM Promo Hour */}
            <div className="md:col-span-4">
              <AnimateOnScroll animation="fade-up" delay={80}>
                <div
                  className="rounded-[2rem] p-10 flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[420px]"
                  style={{ background: '#001f24' }}
                >
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background: 'linear-gradient(135deg, rgba(27,154,170,0.4) 0%, transparent 100%)',
                    }}
                  />
                  <div className="relative z-10">
                    <Moon className="h-16 w-16 text-[#1B9AAA] mb-6 mx-auto" />
                    <h4 className="text-3xl font-headline font-extrabold text-white mb-4 tracking-tight">
                      8PM Promo Hour
                    </h4>
                    <p className="text-[#1B9AAA]/80 font-medium">
                      Nightly bonus points drop to keep healthy habits alive outside office hours.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Auto step tracking */}
            <div className="md:col-span-3">
              <AnimateOnScroll animation="fade-up" delay={160}>
                <div className="rounded-[2rem] bg-white p-10 border border-[#C6C5D1]/10 shadow-[0_10px_30px_rgba(0,17,72,0.06)] flex flex-col justify-between min-h-[420px]">
                  <div>
                    <div className="w-14 h-14 bg-[#1B9AAA]/10 rounded-2xl flex items-center justify-center mb-8">
                      <Footprints className="h-7 w-7 text-[#1B9AAA]" />
                    </div>
                    <h4 className="text-2xl font-headline font-extrabold text-[#001148] mb-3">
                      Auto step tracking
                    </h4>
                    <p className="text-[#45464F] text-sm font-medium">
                      Seamless integration with Google Fit &amp; Apple Health.
                    </p>
                  </div>
                  <span className="text-[10px] font-headline font-bold text-[#5E7D7E] uppercase tracking-widest border-t border-[#C6C5D1]/10 pt-6 mt-6 block">
                    Native SDK Integration
                  </span>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Employee Feed */}
            <div className="md:col-span-4">
              <AnimateOnScroll animation="fade-up">
                <div className="rounded-[2rem] bg-white p-10 border border-[#C6C5D1]/10 shadow-[0_10px_30px_rgba(0,17,72,0.06)] flex flex-col justify-between min-h-[260px]">
                  <div>
                    <div className="flex -space-x-3 mb-8">
                      {[
                        { initials: 'JD', bg: 'bg-[#001148]' },
                        { initials: 'AM', bg: 'bg-[#1B9AAA]' },
                        { initials: 'KL', bg: 'bg-[#5E7D7E]' },
                      ].map(({ initials, bg }) => (
                        <div
                          key={initials}
                          className={`w-12 h-12 rounded-full border-4 border-white ${bg} text-white flex items-center justify-center font-bold text-sm`}
                        >
                          {initials}
                        </div>
                      ))}
                    </div>
                    <h4 className="text-2xl font-headline font-extrabold text-[#001148] mb-3">
                      Employee Feed
                    </h4>
                    <p className="text-[#45464F] text-sm font-medium">
                      Team recognition &amp; peer kudos. Foster a culture of appreciation and
                      healthy competition via leaderboards.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Streak Counters */}
            <div className="md:col-span-3">
              <AnimateOnScroll animation="fade-up" delay={80}>
                <div className="rounded-[2rem] bg-[#1B9AAA] p-10 text-white flex flex-col justify-between min-h-[260px]">
                  <Flame className="h-12 w-12" />
                  <div>
                    <h4 className="text-2xl font-headline font-extrabold mb-2">Streak Counters</h4>
                    <p className="text-white/80 text-sm font-medium">
                      Behavioral science-backed mechanics to ensure consistency.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Privacy & Reminders */}
            <div className="md:col-span-5">
              <AnimateOnScroll animation="fade-up" delay={160}>
                <div className="rounded-[2rem] bg-white p-10 border border-[#C6C5D1]/10 shadow-[0_10px_30px_rgba(0,17,72,0.06)] grid grid-cols-2 gap-10 min-h-[260px]">
                  <div className="flex flex-col gap-4">
                    <ShieldCheck className="h-8 w-8 text-[#5E7D7E]" />
                    <h5 className="text-lg font-headline font-extrabold text-[#001148]">
                      Private Tracking
                    </h5>
                    <p className="text-xs text-[#45464F] font-medium leading-relaxed">
                      Hydration &amp; sleep logs kept 100% private. Habits without corporate
                      pressure.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Bell className="h-8 w-8 text-[#5E7D7E]" />
                    <h5 className="text-lg font-headline font-extrabold text-[#001148]">
                      Push Reminders
                    </h5>
                    <p className="text-xs text-[#45464F] font-medium leading-relaxed">
                      Smart, non-intrusive notifications for movement and mindfulness.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROI ──────────────────────────────────────────────────────────────── */}
      <section id="roi" className="py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <AnimateOnScroll animation="fade-right">
              <div>
                <span className="text-[#5E7D7E] font-headline font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
                  Business Impact
                </span>
                <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-[#001148] leading-tight mb-8">
                  Invest in wellness.<br />See measurable results.
                </h2>
                <p className="text-lg text-[#45464F] mb-10 leading-relaxed font-medium">
                  Seegla turns employee wellness into a strategic business advantage. We move
                  beyond &ldquo;perks&rdquo; into real-world HR data that impacts the bottom line,
                  specifically targeting the Philippine workforce&apos;s unique challenges.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Lower Turnover',
                      body: 'Replacing an employee in PH costs up to 1.5× their annual salary. Boost retention via meaningful engagement.',
                    },
                    {
                      title: 'Real-time HR Dashboards',
                      body: 'Institutional-grade data analytics to monitor organization-wide burnout levels instantly.',
                    },
                    {
                      title: 'Fewer Sick Days',
                      body: 'Clients report an average of 32% reduction in unplanned absences within the first 90 days.',
                    },
                  ].map(({ title, body }) => (
                    <div key={title} className="flex items-start gap-5">
                      <div className="w-6 h-6 rounded-full bg-[#5E7D7E]/10 flex items-center justify-center shrink-0 mt-1">
                        <Check className="h-3.5 w-3.5 text-[#5E7D7E]" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#001148]">{title}</h4>
                        <p className="text-sm text-[#45464F] font-medium">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-left" delay={150}>
              <div className="rounded-[2rem] bg-[#001148] p-16 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[#5E7D7E]/10 opacity-30" />
                <div className="relative z-10">
                  <span className="text-[#1B9AAA] font-headline font-extrabold tracking-[0.3em] text-sm uppercase">
                    Projected Value
                  </span>
                  <div className="mt-8 mb-4">
                    <span className="text-8xl md:text-9xl font-headline font-extrabold text-white tracking-tighter">
                      42x
                    </span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-white mb-8">
                    Return on Investment
                  </h3>
                  <div className="h-1 w-20 bg-[#1B9AAA]/40 mx-auto mb-8" />
                  <p className="text-white/70 text-base font-medium leading-relaxed max-w-xs mx-auto">
                    Calculated for a 200-person company at only{' '}
                    <span className="text-white font-bold">₱199/employee/month.</span>
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-32 bg-[#F7F9FC]">
        <div className="max-w-[1280px] mx-auto px-8">
          <AnimateOnScroll>
            <div className="text-center mb-20">
              <h2 className="text-4xl font-headline font-extrabold text-[#001148]">
                Frequently Asked Questions
              </h2>
            </div>
          </AnimateOnScroll>
          <FaqAccordion />
        </div>
      </section>

      {/* ── LEAD CAPTURE ─────────────────────────────────────────────────────── */}
      <section id="waitlist" className="py-32 bg-[#001148] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10 items-center">
          <AnimateOnScroll animation="fade-right">
            <div>
              <h2 className="text-5xl md:text-7xl font-headline font-extrabold text-white mb-8 tracking-tighter">
                Be first.<br />Get ahead.
              </h2>
              <p className="text-white/70 text-xl max-w-md font-medium leading-relaxed">
                Join the waitlist today and lead the shift toward a healthier, more engaged
                organization. Limited spots available for our 2026 Beta cohort.
              </p>
              <div className="mt-12 flex items-center gap-4 text-[#1B9AAA]">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-xs font-headline font-bold tracking-[0.2em] uppercase">
                  No credit card required
                </span>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-left" delay={150}>
            <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl">
              <WaitlistForm />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#001148] pt-24 pb-12">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 pb-16 border-b border-white/10">
            <div>
              <Image
                src="/SEEGLA-LOGO-VARIATIONPRIMARY.png"
                alt="SEEGLA"
                width={110}
                height={30}
                className="h-8 w-auto mb-8 brightness-0 invert"
              />
              <p className="text-white/50 text-sm leading-relaxed max-w-sm font-medium">
                © 2026 Seegla. Philippines. The first gamified corporate wellness platform for
                the Filipino workforce. Healthy People. Growing Business.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-6">
                <h5 className="text-white font-headline font-bold text-xs tracking-widest uppercase">
                  Platform
                </h5>
                <a href="#how-it-works" className="text-white/50 hover:text-[#1B9AAA] text-sm transition-colors">
                  How It Works
                </a>
                <a href="#features" className="text-white/50 hover:text-[#1B9AAA] text-sm transition-colors">
                  Features
                </a>
                <a href="#roi" className="text-white/50 hover:text-[#1B9AAA] text-sm transition-colors">
                  ROI
                </a>
                <a href="#faq" className="text-white/50 hover:text-[#1B9AAA] text-sm transition-colors">
                  FAQ
                </a>
              </div>
              <div className="flex flex-col gap-6">
                <h5 className="text-white font-headline font-bold text-xs tracking-widest uppercase">
                  Company
                </h5>
                <Link href="/book-a-demo" className="text-white/50 hover:text-[#1B9AAA] text-sm transition-colors cursor-pointer">
                  Book a Demo
                </Link>
                <a href="#waitlist" className="text-white/50 hover:text-[#1B9AAA] text-sm transition-colors cursor-pointer">
                  Join Waitlist
                </a>
                <Link href="/admin/login" className="text-white/50 hover:text-[#1B9AAA] text-sm transition-colors">
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[10px] text-white/30 font-headline font-bold tracking-[0.3em] uppercase">
              Built for the future of work.
            </span>
            <span className="text-[10px] text-white/30 font-headline font-bold tracking-[0.2em] uppercase">
              Philippines · B2B Corporate Wellness
            </span>
          </div>
        </div>
      </footer>

      {/* ── Scroll to top ─────────────────────────────────────────────────── */}
      <ScrollToTop />
    </div>
  )
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="group fixed bottom-8 right-8 z-50 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(230,237,255,0.50) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.50)',
        boxShadow: '0 4px 24px rgba(0,17,72,0.12), 0 1px 0 rgba(255,255,255,0.60) inset',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.background = 'linear-gradient(135deg, rgba(27,154,170,0.80) 0%, rgba(21,123,137,0.65) 100%)'
        el.style.boxShadow = '0 4px 24px rgba(27,154,170,0.30), 0 1px 0 rgba(255,255,255,0.40) inset'
        el.style.border = '1px solid rgba(255,255,255,0.40)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(230,237,255,0.50) 100%)'
        el.style.boxShadow = '0 4px 24px rgba(0,17,72,0.12), 0 1px 0 rgba(255,255,255,0.60) inset'
        el.style.border = '1px solid rgba(255,255,255,0.50)'
      }}
    >
      <ArrowUp className="h-4 w-4 text-[#001148] transition-colors duration-200 group-hover:text-white" />
    </button>
  )
}
