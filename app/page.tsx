'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import MarketingNav from '@/components/marketing/navbar'
import AnimateOnScroll from '@/components/ui/animate-on-scroll'
import {
  Activity, Award, Users, ShieldCheck, BarChart3,
  HeartPulse, CheckCircle2, ArrowRight, Building2, Flame,
  Footprints, Droplet, Moon, TrendingUp, ChevronDown, Zap,
  Target, Trophy, Quote,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    step: '01',
    icon: Target,
    title: 'Daily Challenges',
    description: 'Employees complete short, engaging wellness challenges that build healthy habits without disrupting work.',
    tag: 'Habit Building',
  },
  {
    step: '02',
    icon: Trophy,
    title: 'Company-Funded Rewards',
    description: 'Points earned can be redeemed for perks or cash, motivating participation and rewarding healthy behavior.',
    tag: 'Incentives',
  },
  {
    step: '03',
    icon: BarChart3,
    title: 'Measurable Impact',
    description: 'Track team performance, monitor wellness progress, and measure ROI with clean, easy-to-use dashboards.',
    tag: 'Analytics',
  },
]

const BENEFITS = [
  { icon: TrendingUp,  text: 'Reduce sick days and improve overall productivity' },
  { icon: ShieldCheck, text: 'Lower healthcare costs with quantifiable, measurable ROI' },
  { icon: Users,       text: 'Boost employee engagement and retention through gamified wellness' },
  { icon: Award,       text: 'Company-funded rewards make wellness tangible and motivating' },
  { icon: BarChart3,   text: 'Real-time dashboards built for HR and Operations teams' },
]

const STATS = [
  { value: '42×',  label: 'Average ROI',        sub: 'for 200-person teams'    },
  { value: '32%',  label: 'Fewer Sick Days',     sub: 'avg. across clients'     },
  { value: '89%',  label: 'Participation Rate',  sub: 'monthly active'          },
  { value: '2.4×', label: 'Team Engagement',     sub: 'improvement vs baseline' },
]

const TESTIMONIALS = [
  {
    company: 'Ayala Land Corp',
    industry: 'Real Estate · 1,200+ employees',
    metric: '38% fewer sick days',
    quote: 'SEEGLA transformed how we approach employee wellness. The ROI was visible within the first quarter.',
    role: 'Chief People Officer',
  },
  {
    company: 'MedFirst Healthcare',
    industry: 'Healthcare · 850 employees',
    metric: '94% participation rate',
    quote: 'Our team actually looks forward to the daily challenges. Engagement and morale have never been higher.',
    role: 'HR Director',
  },
  {
    company: 'TechVentures PH',
    industry: 'Technology · 320 employees',
    metric: '52× ROI achieved',
    quote: 'The analytics dashboard alone is worth it. We can finally tie wellness initiatives to business outcomes.',
    role: 'Chief Operating Officer',
  },
]

const FAQS = [
  {
    q: 'What is SEEGLA and who is it for?',
    a: 'SEEGLA is a B2B corporate wellness platform designed for Philippine companies, HR teams, and wellness service providers. It lets employees track daily health habits, join team challenges, earn rewards, and compete on leaderboards — all managed through a dedicated HR admin dashboard.',
  },
  {
    q: 'How does the licensing model work?',
    a: 'SEEGLA uses a per-employee, per-month (PEPM) seat-based model. You purchase a license for a set number of employee seats. Our team issues you a license key, activates your organization, and you\'re live the same day. Annual and multi-year terms are available at discounted rates.',
  },
  {
    q: 'Can I manage multiple companies from one account?',
    a: 'Yes. Resellers and service providers get a System Admin dashboard that lets you onboard, configure, and monitor every client organization from a single login. You can issue license keys, adjust seat counts, and view cross-organization analytics in real time.',
  },
  {
    q: 'Does SEEGLA work as a mobile app?',
    a: 'Yes. SEEGLA is built as a progressive web app (PWA) that installs on Android and iOS, plus a native Android APK via Capacitor. Employees get a clean, fast mobile experience with real-time step tracking using their phone\'s accelerometer — no wearable required.',
  },
  {
    q: 'What health metrics can employees track?',
    a: 'Employees can track steps, water intake, sleep hours, exercise minutes, nutrition logs, and meditation sessions. The platform also features a live accelerometer-based step counter, daily habit streaks, and a community feed for sharing wellness tips and recipes.',
  },
  {
    q: 'How do rewards and points work?',
    a: 'Employees earn points by logging daily health habits, completing challenges, hitting streak milestones, and sharing peer-validated tips. Points can be redeemed for vouchers through the Brand Marketplace — available on SIGLA and ANGAT plans.',
  },
  {
    q: 'Is employee health data kept private?',
    a: 'Absolutely. SEEGLA uses row-level security (RLS) so each employee only sees their own data. HR admins see aggregated, anonymized team analytics. Individual health logs are never shared with management without employee consent.',
  },
  {
    q: 'What is the minimum number of employees to get started?',
    a: 'There\'s no hard minimum. The BUHAY plan supports up to 50 employees, SIGLA covers 51–200, and ANGAT is custom-priced for 1,000+ seats. We also offer a starter license for smaller teams who want to pilot the platform first.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard Mockup (hero visual)
// ─────────────────────────────────────────────────────────────────────────────

function DashboardMockup() {
  const bars = [58, 72, 65, 85, 79, 88, 92, 70, 83, 89, 76, 94]

  return (
    <div className="relative mx-auto max-w-[420px]">
      {/* Floating badges */}
      <div className="absolute -right-3 top-10 z-10 rounded-xl bg-white px-3 py-2 shadow-xl ring-1 ring-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-[#1B9AAA] animate-pulse" />
          <span className="text-[10px] font-bold text-[#001148]">89% active today</span>
        </div>
      </div>
      <div className="absolute -left-3 bottom-16 z-10 rounded-xl bg-white px-3 py-2 shadow-xl ring-1 ring-slate-100">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="h-3 w-3 text-[#F47560]" />
          <span className="text-[10px] font-bold text-[#001148]">ROI: 42× return</span>
        </div>
      </div>

      {/* Tablet frame */}
      <div className="rounded-2xl bg-[#001148] p-2.5 shadow-2xl ring-1 ring-[#001148]/30">
        <div className="overflow-hidden rounded-xl bg-white">

          {/* Dashboard header */}
          <div className="flex items-center justify-between bg-[#001148] px-4 py-3">
            <span className="text-sm font-black tracking-wide text-white">SEEGLA</span>
            <span className="text-[10px] font-medium text-white/50">Employee Health Dashboard</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1B9AAA]">
              <Users className="h-3 w-3 text-white" />
            </div>
          </div>

          {/* KPI tiles */}
          <div className="grid grid-cols-3 gap-2 p-3">
            {[
              { label: 'Active Employees', value: '476',   sub: '+12 this week',   bg: 'bg-[#001148]' },
              { label: 'Participation',    value: '89%',   sub: 'Monthly active',  bg: 'bg-[#1B9AAA]' },
              { label: 'Points Redeemed', value: '3,975', sub: 'This quarter',     bg: 'bg-[#F47560]' },
            ].map(({ label, value, sub, bg }) => (
              <div key={label} className={`${bg} rounded-xl p-3 text-white`}>
                <p className="text-lg font-black leading-none">{value}</p>
                <p className="mt-1 text-[8px] font-semibold leading-tight opacity-90">{label}</p>
                <p className="mt-0.5 text-[7px] opacity-60">{sub}</p>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="mx-3 mb-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <p className="mb-2 text-[8px] font-bold uppercase tracking-widest text-slate-400">
              Employee Health Metrics — Last 12 Months
            </p>
            <div className="flex items-end gap-0.5 h-14">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i % 3 === 0 ? '#001148' : i % 3 === 1 ? '#1B9AAA' : '#D4EFF2',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Top performers */}
          <div className="mx-3 mb-3 rounded-xl border border-slate-100 bg-white p-3">
            <p className="mb-2 text-[8px] font-bold uppercase tracking-widest text-slate-400">Top Performers</p>
            {[
              { name: 'Maria S.', pts: '1,240', pct: 92 },
              { name: 'Juan C.',  pts: '1,185', pct: 88 },
              { name: 'Ana R.',   pts: '1,020', pct: 76 },
            ].map(({ name, pts, pct }) => (
              <div key={name} className="mb-2 flex items-center gap-2 last:mb-0">
                <span className="w-11 text-[9px] font-semibold text-slate-700">{name}</span>
                <div className="flex-1 h-1.5 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#1B9AAA] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[9px] font-black text-[#001148]">{pts}pts</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Phone Mockup
// ─────────────────────────────────────────────────────────────────────────────

function PhoneMockup() {
  const metrics = [
    { Icon: Footprints, label: 'Steps',    value: '7,842', sub: '78% of goal', pct: 78, bg: 'bg-[#E8F6F8]', text: 'text-[#001148]', bar: 'bg-[#1B9AAA]' },
    { Icon: Droplet,    label: 'Water',    value: '1.4L',  sub: '70% of goal', pct: 70, bg: 'bg-[#FEF0EB]', text: 'text-[#001148]', bar: 'bg-[#F47560]' },
    { Icon: Moon,       label: 'Sleep',    value: '7.5h',  sub: 'Goal met',    pct: 94, bg: 'bg-[#E8F6F8]', text: 'text-[#001148]', bar: 'bg-[#1B9AAA]' },
    { Icon: Activity,   label: 'Exercise', value: '25min', sub: '83% of goal', pct: 83, bg: 'bg-[#EEF0F8]', text: 'text-[#001148]', bar: 'bg-[#001148]' },
  ]

  return (
    <div className="relative mx-auto w-[262px]">
      <div className="absolute -right-10 top-14 z-10 rounded-2xl bg-white px-3 py-1.5 shadow-xl ring-1 ring-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-[#1B9AAA]" />
          <span className="text-[10px] font-bold text-[#001148]">+12 pts earned</span>
        </div>
      </div>
      <div className="absolute -left-10 bottom-28 z-10 rounded-2xl bg-white px-3 py-1.5 shadow-xl ring-1 ring-slate-100">
        <div className="flex items-center gap-1.5">
          <Flame className="h-3 w-3 text-[#F47560]" />
          <span className="text-[10px] font-bold text-[#001148]">14-day streak</span>
        </div>
      </div>

      <div className="relative rounded-[44px] bg-[#001148] p-2.5 shadow-2xl ring-2 ring-[#001148]/40">
        <div className="absolute -left-[3px] top-20 h-9 w-[3px] rounded-l-full bg-[#001148]/60" />
        <div className="absolute -left-[3px] top-32 h-7 w-[3px] rounded-l-full bg-[#001148]/60" />
        <div className="absolute -right-[3px] top-28 h-12 w-[3px] rounded-r-full bg-[#001148]/60" />

        <div className="overflow-hidden rounded-[36px] bg-white">
          <div className="flex items-center justify-between bg-white px-5 pt-3 pb-1 text-[11px] font-bold text-[#001148]">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-px">
                {[3, 5, 7, 9].map((h, i) => (
                  <div key={i} className="w-[3px] rounded-sm bg-[#001148]" style={{ height: h }} />
                ))}
              </div>
              <div className="h-2.5 w-5 rounded-sm border border-[#001148] p-px">
                <div className="h-full w-3/4 rounded-sm bg-[#001148]" />
              </div>
            </div>
          </div>
          <div className="mx-auto h-5 w-[72px] rounded-b-2xl bg-[#001148] -mt-px mb-1.5" />
          <div className="bg-white px-4 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-slate-500">Good morning</p>
                <p className="text-sm font-black text-[#001148]">Maria Santos</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F6F8]">
                <HeartPulse className="h-4 w-4 text-[#1B9AAA]" />
              </div>
            </div>
          </div>
          <div className="mx-3 mb-2.5 flex items-center gap-2.5 rounded-2xl bg-[#001148] px-3 py-2.5 shadow-sm">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/20">
              <Flame className="h-3.5 w-3.5 text-[#F47560]" />
            </div>
            <div>
              <p className="text-[11px] font-bold leading-tight text-white">14-Day Streak!</p>
              <p className="text-[9px] text-white/50">Keep logging daily</p>
            </div>
            <span className="ml-auto text-lg">🔥</span>
          </div>
          <div className="px-3 pb-1">
            <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">Today&apos;s Habits</p>
            <div className="grid grid-cols-2 gap-1.5">
              {metrics.map(({ Icon, label, value, sub, pct, bg, text, bar }) => (
                <div key={label} className={`${bg} rounded-2xl p-2.5`}>
                  <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-xl bg-[#001148] shadow-sm">
                    <Icon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <p className={`text-sm font-black leading-tight ${text}`}>{value}</p>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">{label}</p>
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/60">
                    <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="mt-0.5 text-[8px] font-semibold text-slate-500">{sub}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-around border-t border-slate-100 bg-white px-4 py-2.5">
            {[
              { Icon: HeartPulse, label: 'Home',    active: true  },
              { Icon: BarChart3,  label: 'Stats',   active: false },
              { Icon: Award,      label: 'Rewards', active: false },
              { Icon: Users,      label: 'Team',    active: false },
            ].map(({ Icon, label, active }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <Icon className={`h-[18px] w-[18px] ${active ? 'text-[#1B9AAA]' : 'text-slate-300'}`} />
                <span className={`text-[8px] font-semibold ${active ? 'text-[#001148]' : 'text-slate-400'}`}>{label}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center bg-white pb-2 pt-0.5">
            <div className="h-[3px] w-20 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ accordion
// ─────────────────────────────────────────────────────────────────────────────

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {FAQS.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50"
          >
            <span className="font-semibold text-[#001148] text-sm leading-snug">{item.q}</span>
            <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? 'max-h-96' : 'max-h-0'}`}>
            <p className="px-6 pb-5 text-sm leading-relaxed text-slate-500">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
        backgroundImage: 'linear-gradient(rgba(0,17,72,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,17,72,.6) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
          }}
        />
        {/* Soft teal glow top-right */}
        <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-[#1B9AAA] opacity-[0.06] blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16">
          <div className="grid items-center gap-16 lg:grid-cols-1">

        {/* Center — copy */}
        <div className="text-center mx-auto max-w-3xl">
          <AnimateOnScroll animation="fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1B9AAA]/20 bg-[#E8F6F8] px-4 py-1.5 text-sm font-semibold text-[#1B9AAA]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1B9AAA] animate-pulse" />
          B2B Corporate Wellness Platform
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={80}>
            <h1 className="mb-5 text-4xl font-black leading-[1.06] tracking-tight text-[#001148] md:text-5xl lg:text-6xl">
          Your Healthiest<br />
          Employees Are Your<br />
          <span className="text-[#1B9AAA]">Top Performers.</span>
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={160}>
            <p className="mb-8 mx-auto max-w-lg text-lg leading-relaxed text-slate-500">
          SEEGLA helps Philippine companies boost employee wellness, increase engagement, and reduce healthcare costs — delivering measurable ROI from day one.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={240}>
            <div className="flex flex-wrap justify-center gap-3">
          <Link href="/book-a-demo">
            <Button
              size="lg"
              className="h-12 gap-2 rounded-full bg-[#1B9AAA] px-8 text-base font-bold text-white hover:bg-[#157B89] hover:-translate-y-0.5 transition-all duration-150 shadow-[0_6px_0_0_rgba(27,154,170,0.3)]"
            >
              Request a Demo <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/waitlist">
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-[#001148]/20 bg-white px-8 text-base font-semibold text-[#001148] hover:bg-[#001148]/5 hover:-translate-y-0.5 transition-all duration-150"
            >
              Join the Waitlist
            </Button>
          </Link>
            </div>
            <p className="mt-4 text-xs text-slate-400">
          Seat-based licensing · Annual or multi-year terms · Starter license free
            </p>
          </AnimateOnScroll>
        </div>

            {/* Right — dashboard mockup */}


          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────────── */}
      <div className="border-y border-slate-100 bg-[#F7F9FC] py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-6">
          {[
            { value: 'PEPM',    label: 'Seat-Based Licensing'  },
            { value: 'Mobile',  label: 'iOS & Android Ready'   },
          ].map((stat, i) => (
            <AnimateOnScroll key={stat.label} animation="zoom-in" delay={i * 70}>
              <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 shadow-sm">
                <p className="text-base font-black text-[#001148]">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
        <section id="how-it-works" className="bg-white py-28">
        <div className="mx-auto max-w-6xl px-6">
          <AnimateOnScroll>
            <div className="mb-16 max-w-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#1B9AAA]">
                How It Works
              </p>
              <h2 className="text-4xl font-black leading-tight tracking-tight text-[#001148] md:text-5xl">
                Simple, measurable,<br />and impactful wellness.
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <AnimateOnScroll key={s.step} animation="fade-up" delay={i * 100}>
                <div className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-[#1B9AAA] hover:shadow-xl hover:-translate-y-1">
                  <span className="absolute right-6 top-5 text-7xl font-black text-slate-100 leading-none select-none group-hover:text-[#E8F6F8] transition-colors">
                    {s.step}
                  </span>

                  <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#001148]">
                    <s.icon className="h-6 w-6 text-white" />
                  </div>

                  <span className="relative z-10 mb-3 inline-block w-fit rounded-full bg-[#E8F6F8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1B9AAA]">
                    {s.tag}
                  </span>

                  <h3 className="relative z-10 mb-3 text-xl font-black text-[#001148]">{s.title}</h3>
                  <p className="relative z-10 flex-1 text-sm leading-relaxed text-slate-500">{s.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / FOR SYSTEM ADMINS ────────────────────────────────────────── */}
      <section id="features" className="bg-[#F7F9FC] py-28">
        <div className="mx-auto max-w-6xl px-6">
          <AnimateOnScroll>
            <div className="overflow-hidden rounded-3xl bg-white border border-slate-200 p-10 md:p-14 relative shadow-sm">
              <div className="md:flex md:items-center md:gap-16">
                <div className="flex-1">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1B9AAA]/20 bg-[#E8F6F8] px-4 py-1.5 text-sm font-semibold text-[#1B9AAA]">
                    <Building2 className="h-3.5 w-3.5" />
                    For Resellers &amp; Service Providers
                  </div>
                  <h2 className="mb-5 text-3xl font-black text-[#001148] md:text-4xl">
                    One admin panel.<br />Every license. Full control.
                  </h2>
                  <p className="mb-7 text-slate-500 leading-relaxed max-w-lg">
                    Manage every client license from a single login — issue keys, adjust seat counts, monitor platform-wide analytics, and suspend or renew licenses in real time.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Issue and revoke license keys per client',
                      'Control seat limits and license expiry',
                      'View MRR and cross-org health analytics',
                      'Apply white-label branding per organization',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1B9AAA]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/book-a-demo">
                    <Button className="gap-2 rounded-full bg-[#001148] px-6 font-bold text-white hover:bg-[#001148]/80 transition-all duration-150">
                      Talk to Our Team <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="mt-10 md:mt-0 flex shrink-0 items-center justify-center">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Licenses Issued', value: '500+',  icon: Zap        },
                      { label: 'Orgs Managed',    value: '120+',  icon: Building2  },
                      { label: 'Seats Active',    value: '50K+',  icon: Users      },
                      { label: 'Uptime SLA',      value: '99.9%', icon: ShieldCheck },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="rounded-2xl border border-[#001148]/10 bg-[#001148] p-5 text-center">
                        <Icon className="h-5 w-5 mx-auto mb-2 text-[#1B9AAA]" />
                        <p className="text-xl font-black text-white">{value}</p>
                        <p className="text-[10px] text-white/40 mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── APP PREVIEW ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <AnimateOnScroll animation="fade-right">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#1B9AAA]">
                  Employee Experience
                </p>
                <h2 className="mb-5 text-4xl font-black leading-tight tracking-tight text-[#001148] md:text-5xl">
                  Everything they need,<br />in their pocket.
                </h2>
                <p className="mb-8 text-slate-500 leading-relaxed">
                  From daily habit logging to team challenges and rewards — SEEGLA runs beautifully as a native Android app. Under 60 seconds to log a full day.
                </p>
                <ul className="space-y-3.5">
                  {[
                    'Real-time step, water, sleep & exercise tracking',
                    'Streak counters and daily goal progress',
                    'Team leaderboard and peer accountability',
                    'One-tap habit logging with instant point rewards',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1B9AAA]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" delay={150}>
              <div className="flex justify-center lg:justify-end">
                <PhoneMockup />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
      
    

      {/* ── ROI & BENEFITS ───────────────────────────────────────────────────── */}
      <section id="roi-benefits" className="bg-[#F7F9FC] py-32 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,17,72,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,17,72,.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-start gap-16 lg:grid-cols-2">

            {/* Left — copy */}
            <AnimateOnScroll animation="fade-right">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#1B9AAA]">
                  ROI &amp; Benefits
                </p>
                <h2 className="mb-5 text-3xl font-black leading-tight tracking-tight text-[#001148] md:text-4xl">
                  Invest in wellness.<br />See measurable results.
                </h2>
                <p className="mb-8 text-slate-500 leading-relaxed text-sm">
                  SEEGLA turns employee wellness into a strategic advantage — with hard data to back every HR decision.
                </p>

                <ul className="space-y-4">
                  {BENEFITS.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#1B9AAA]/20 bg-[#E8F6F8]">
                        <Icon className="h-3.5 w-3.5 text-[#1B9AAA]" />
                      </div>
                      <span className="pt-1 text-sm leading-snug text-slate-700">{text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link href="/book-a-demo">
                    <Button className="gap-2 rounded-full bg-[#001148] px-6 font-bold text-white hover:bg-[#001148]/80 transition-all duration-150">
                      Get Your ROI Estimate <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right — stats grid */}
            <AnimateOnScroll animation="fade-left" delay={150}>
              <div className="grid grid-cols-2 gap-3 mt-10">
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`rounded-2xl border p-6 ${
                      i === 0
                        ? 'border-[#001148] bg-[#001148] text-white'
                        : i === 1
                        ? 'border-[#1B9AAA] bg-[#1B9AAA] text-white'
                        : i === 2
                        ? 'border-[#F47560] bg-[#F47560] text-white'
                        : 'border-slate-200 bg-white text-[#001148]'
                    }`}
                  >
                    <p className="text-4xl font-black leading-none">{stat.value}</p>
                    <p className="mt-2.5 text-sm font-bold">{stat.label}</p>
                    <p className={`mt-0.5 text-xs ${i < 3 ? 'opacity-70' : 'text-slate-500'}`}>{stat.sub}</p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </section>

      


      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-white py-28">
        <div className="mx-auto max-w-2xl px-6">
          <AnimateOnScroll>
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#1B9AAA]">FAQ</p>
              <h2 className="text-4xl font-black tracking-tight text-[#001148] md:text-5xl">Questions answered.</h2>
              <p className="mt-4 text-slate-500">Everything you need to know before licensing SEEGLA.</p>
            </div>
          </AnimateOnScroll>
          <FaqAccordion />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <AnimateOnScroll animation="zoom-in">
            <div className="relative overflow-hidden rounded-3xl bg-[#001148] px-10 py-20 text-center shadow-2xl">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="pointer-events-none absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-[#1B9AAA] opacity-[0.1] blur-[80px]" />
              <div className="relative">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#1B9AAA]">Get Started Today</p>
                <h2 className="mb-5 text-3xl font-black text-white md:text-5xl leading-tight">
                  Ready to build a healthier,<br />more productive workforce?
                </h2>
                <p className="mx-auto mb-10 max-w-lg text-white/50 leading-relaxed">
                  Talk to our team, get a license key, and have your first organization live within the day. Only pay for what you actually use.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/book-a-demo">
                    <Button
                      size="lg"
                      className="h-12 gap-2 rounded-full bg-[#1B9AAA] px-8 font-bold text-white hover:bg-[#157B89] shadow-[0_6px_0_0_rgba(27,154,170,0.4)] hover:-translate-y-0.5 transition-all duration-150"
                    >
                      Request a Demo <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/waitlist">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 rounded-full border-white/20 bg-white/5 px-8 font-semibold text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-150"
                    >
                      Join the Waitlist
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Image
              src="/SEEGLA-LOGO-VARIATIONPRIMARY.png"
              alt="SEEGLA"
              width={110}
              height={30}
              className="h-7 w-auto object-contain"
            />
            <nav className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <a href="#how-it-works"    className="hover:text-[#001148] transition-colors">How It Works</a>
              <a href="#roi-benefits"    className="hover:text-[#001148] transition-colors">ROI &amp; Benefits</a>
              <a href="#success-stories" className="hover:text-[#001148] transition-colors">Success Stories</a>
              <a href="#about"           className="hover:text-[#001148] transition-colors">About</a>
              <a href="#faq"             className="hover:text-[#001148] transition-colors">FAQ</a>
              <Link href="/book-a-demo"  className="hover:text-[#001148] transition-colors">Book a Demo</Link>
              <Link href="/waitlist"     className="hover:text-[#001148] transition-colors">Join Waitlist</Link>
            </nav>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-100 pt-6 md:flex-row">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} SEEGLA. Building healthier workplaces, one metric at a time.
            </p>
            <p className="text-xs text-slate-400">Philippines · B2B Corporate Wellness Platform</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
