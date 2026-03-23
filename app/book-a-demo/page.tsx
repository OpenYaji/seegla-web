'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, ArrowLeft, ChevronLeft, ChevronRight, Clock, Video, Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
]

type Step = 'datetime' | 'details' | 'success'
const STEPS: { id: Step; label: string }[] = [
  { id: 'datetime', label: 'Date & Time' },
  { id: 'details', label: 'Your Details' },
  { id: 'success', label: 'Confirmed' },
]

type BookingForm = {
  firstName: string
  lastName: string
  workEmail: string
  companyName: string
  teamSize: string
  goals: string
}

const BLANK: BookingForm = {
  firstName: '', lastName: '', workEmail: '',
  companyName: '', teamSize: '', goals: '',
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function buildGrid(y: number, m: number) {
  const pad = new Date(y, m, 1).getDay()
  const days = new Date(y, m + 1, 0).getDate()
  return [...Array(pad).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
}

function isOff(y: number, m: number, d: number) {
  const date = new Date(y, m, d)
  const now = new Date(); now.setHours(0, 0, 0, 0)
  return date <= now || date.getDay() === 0 || date.getDay() === 6
}

function fmt(d: Date, opts: Intl.DateTimeFormatOptions) {
  return d.toLocaleDateString('en-US', opts)
}

// Shared field styles (DESIGN.md: bottom-border only inputs)
const inputClass =
  'w-full bg-[#F7F9FC] border-0 border-b-2 border-[#C6C5D1] focus:border-[#1B9AAA] focus:ring-0 focus:outline-none transition-all px-0 py-3 text-sm font-medium text-[#191C1E] placeholder:text-[#45464F]/40'
const labelClass =
  'block text-[10px] font-headline font-bold text-[#001148] uppercase tracking-widest mb-2'

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function BookADemoPage() {
  const today = useMemo(() => new Date(), [])
  const [step, setStep] = useState<Step>('datetime')
  const [vy, setVy] = useState(today.getFullYear())
  const [vm, setVm] = useState(today.getMonth())
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<BookingForm>(BLANK)

  const grid = useMemo(() => buildGrid(vy, vm), [vy, vm])
  const canBack = vy > today.getFullYear() || vm > today.getMonth()
  const stepIdx = STEPS.findIndex((s) => s.id === step)
  const isActive = (day: number) =>
    date?.getDate() === day && date?.getMonth() === vm && date?.getFullYear() === vy

  function set<K extends keyof BookingForm>(k: K, v: BookingForm[K]) {
    setForm((p) => ({ ...p, [k]: v }))
  }

  function prevMo() {
    if (!canBack) return
    if (vm === 0) { setVy((y) => y - 1); setVm(11) } else { setVm((m) => m - 1) }
    setDate(null); setTime(null)
  }
  function nextMo() {
    if (vm === 11) { setVy((y) => y + 1); setVm(0) } else { setVm((m) => m + 1) }
    setDate(null); setTime(null)
  }
  function pickDay(d: number) { setDate(new Date(vy, vm, d)); setTime(null) }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!date || !time) { setError('Please select a date and time first.'); return }
    if (!form.firstName || !form.lastName || !form.workEmail || !form.companyName || !form.teamSize) {
      setError('Please complete all required fields.'); return
    }
    setBusy(true)
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          requestedDate: date.toISOString().slice(0, 10),
          requestedTime: time,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) { setError(data.error ?? 'Failed to submit. Please try again.'); return }
      setStep('success')
      setForm(BLANK)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  // ── Sidebar step tracker ────────────────────────────────────────────────
  const SidebarSteps = () => (
    <div>
      {STEPS.map((s, i) => {
        const done = i < stepIdx
        const cur = i === stepIdx
        return (
          <div key={s.id} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className={cn(
                'h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-300',
                done ? 'bg-[#1B9AAA] border-[#1B9AAA] text-white'
                  : cur ? 'bg-white border-white text-[#001148]'
                    : 'border-white/20 text-white/25',
              )}>
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn('w-px h-8 mt-1 transition-all duration-300', i < stepIdx ? 'bg-[#1B9AAA]/50' : 'bg-white/10')} />
              )}
            </div>
            <div className="pt-0.5 pb-8">
              <p className={cn('text-xs font-headline font-bold',
                cur ? 'text-white' : done ? 'text-[#1B9AAA]' : 'text-white/25',
              )}>
                {s.label}
              </p>
              {s.id === 'datetime' && date && (
                <p className="text-[10px] text-white/35 mt-0.5">
                  {fmt(date, { month: 'short', day: 'numeric' })}{time ? ` · ${time}` : ''}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <div
      className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col items-center justify-center p-4 lg:p-6 relative"
      style={{ background: 'linear-gradient(135deg, #F7F9FC 0%, #ECEEF1 100%)' }}
    >
      {/* Back link */}
      <Link
        href="/"
        className="absolute top-5 left-5 inline-flex items-center gap-1.5 text-sm font-headline font-medium text-[#45464F] hover:text-[#001148] transition-colors z-10"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      {/* Card */}
      <div className="w-full max-w-[960px] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,17,72,0.12)] grid lg:grid-cols-[260px_1fr]">

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <div className="hidden lg:flex bg-[#001148] flex-col p-8">
          <Image
            src="/SECONDARY.png"
            alt="SEEGLA"
            width={200} // Doubled the base width
            height={48} // Doubled the base height
            className="h-12 w-auto object-contain mb-10 transition-transform hover:scale-105"
            priority // Added priority to prevent layout shift in the Hero
          />

          <div className="mb-8">
            <p className="text-[9px] font-headline font-bold uppercase tracking-[0.3em] text-[#1B9AAA] mb-2">
              Book a Demo
            </p>
            <h2 className="text-2xl font-headline font-extrabold text-white leading-snug mb-5">
              See SEEGLA<br />in action.
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/50">
                <div className="h-7 w-7 shrink-0 rounded-xl bg-white/5 flex items-center justify-center">
                  <Clock className="h-3.5 w-3.5 text-[#1B9AAA]" />
                </div>
                <span>30-minute session</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <div className="h-7 w-7 shrink-0 rounded-xl bg-white/5 flex items-center justify-center">
                  <Video className="h-3.5 w-3.5 text-[#1B9AAA]" />
                </div>
                <span>Google Meet · link on confirm</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10 mb-8" />
          <div className="flex-1"><SidebarSteps /></div>


        </div>

        {/* ── Main panel ──────────────────────────────────────────────────── */}
        <div className="bg-white flex flex-col">

          {/* Mobile top bar */}
          <div className="lg:hidden bg-[#001148] px-5 py-4 flex items-center gap-3">
            <Image src="/SEEGLA-LOGO-VARIATIONPRIMARY.png" alt="SEEGLA" width={72} height={20} className="h-5 w-auto object-contain" />
            <div className="ml-auto flex items-center gap-1.5">
              {STEPS.map((s, i) => (
                <div key={s.id} className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === stepIdx ? 'w-8 bg-[#1B9AAA]' : i < stepIdx ? 'w-3 bg-[#1B9AAA]/40' : 'w-3 bg-white/15',
                )} />
              ))}
            </div>
          </div>

          {/* ── Step 1: Date & Time ─────────────────────────────────────── */}
          {step === 'datetime' && (
            <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_180px]">

              {/* Calendar */}
              <div className="p-6 lg:p-8 border-r border-[#C6C5D1]/15">
                <h1 className="text-xl font-headline font-extrabold text-[#001148] mb-1">
                  When works for you?
                </h1>
                <p className="text-xs text-[#45464F] mb-6">
                  Pick any available weekday — we&apos;ll confirm within 1 business day.
                </p>

                {/* Month nav */}
                <div className="flex items-center justify-between mb-5">
                  <button
                    onClick={prevMo}
                    disabled={!canBack}
                    className={cn(
                      'h-8 w-8 rounded-xl flex items-center justify-center transition-all',
                      canBack ? 'text-[#001148] hover:bg-[#F7F9FC]' : 'text-[#C6C5D1] cursor-not-allowed',
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-headline font-extrabold text-[#001148]">
                    {MONTHS[vm]} {vy}
                  </span>
                  <button
                    onClick={nextMo}
                    className="h-8 w-8 rounded-xl flex items-center justify-center text-[#001148] hover:bg-[#F7F9FC] transition-all"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {DAYS.map((d) => (
                    <p key={d} className="text-center text-[9px] font-headline font-bold text-[#C6C5D1] uppercase tracking-widest">
                      {d}
                    </p>
                  ))}
                </div>

                {/* Day grid */}
                <div className="grid grid-cols-7 gap-0.5">
                  {grid.map((day, i) => {
                    if (!day) return <div key={`_${i}`} />
                    const off = isOff(vy, vm, day)
                    const on = isActive(day)
                    return (
                      <button
                        key={day}
                        disabled={off}
                        onClick={() => pickDay(day)}
                        className={cn(
                          'mx-auto h-10 w-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-150',
                          off && 'text-[#C6C5D1] cursor-not-allowed',
                          !off && !on && 'text-[#001148] hover:bg-[#F7F9FC]',
                          on && 'bg-[#001148] text-white shadow-[0_4px_12px_rgba(0,17,72,0.25)] scale-105',
                        )}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>

                <p className="mt-5 text-[10px] font-headline text-[#C6C5D1] text-center tracking-wider uppercase">
                  Philippine Standard Time (UTC+8)
                </p>

                {/* Mobile time slots */}
                {date && (
                  <div className="lg:hidden mt-6 pt-6 border-t border-[#C6C5D1]/20">
                    <p className="text-xs font-headline font-extrabold text-[#001148] mb-4">
                      {fmt(date, { weekday: 'long', month: 'long', day: 'numeric' })}
                      <span className="font-normal text-[#45464F] ml-2">— pick a time</span>
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {SLOTS.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={cn(
                            'rounded-xl py-2.5 text-xs font-semibold transition-all',
                            time === t
                              ? 'bg-[#001148] text-white shadow-[0_4px_12px_rgba(0,17,72,0.2)]'
                              : 'bg-[#F7F9FC] text-[#45464F] hover:bg-[#ECEEF1]',
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {time && (
                      <button
                        onClick={() => setStep('details')}
                        className="mt-4 w-full h-12 rounded-2xl bg-[#1B9AAA] text-white font-headline font-bold text-sm shadow-lg shadow-[#1B9AAA]/25 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Desktop time slot panel */}
              <div className="hidden lg:flex flex-col p-5">
                {date ? (
                  <>
                    <div className="mb-4">
                      <p className="text-[10px] font-headline font-bold uppercase tracking-widest text-[#45464F]">
                        {fmt(date, { weekday: 'long' })}
                      </p>
                      <p className="text-sm font-headline font-extrabold text-[#001148]">
                        {fmt(date, { month: 'long', day: 'numeric' })}
                      </p>
                    </div>

                    <div className="overflow-y-auto space-y-1.5" style={{ maxHeight: 280 }}>
                      {SLOTS.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={cn(
                            'w-full rounded-xl py-2.5 text-xs font-semibold transition-all duration-150',
                            time === t
                              ? 'bg-[#001148] text-white shadow-[0_4px_12px_rgba(0,17,72,0.2)] scale-[1.02]'
                              : 'bg-[#F7F9FC] text-[#45464F] hover:bg-[#ECEEF1]',
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {time && (
                      <button
                        onClick={() => setStep('details')}
                        className="mt-3 w-full h-11 shrink-0 rounded-2xl bg-[#1B9AAA] text-white font-headline font-bold text-xs shadow-[0_4px_12px_rgba(27,154,170,0.3)] hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                      >
                        Continue <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-3">
                    <div className="h-10 w-10 rounded-xl bg-[#F7F9FC] flex items-center justify-center">
                      <Clock className="h-4 w-4 text-[#C6C5D1]" />
                    </div>
                    <p className="text-xs text-[#C6C5D1] leading-relaxed font-medium">
                      Pick a date to see available times
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Step 2: Your Details ────────────────────────────────────── */}
          {step === 'details' && (
            <div className="p-6 lg:p-8 flex-1 overflow-y-auto">

              {/* Selected slot recap */}
              <button
                onClick={() => setStep('datetime')}
                className="w-full mb-6 flex items-center gap-3 rounded-2xl bg-[#F7F9FC] px-4 py-3 hover:bg-[#ECEEF1] transition-all group text-left"
              >
                <div className="h-9 w-9 shrink-0 rounded-xl bg-[#001148] flex items-center justify-center">
                  <Clock className="h-4 w-4 text-[#1B9AAA]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-headline font-extrabold text-[#001148] truncate">
                    {date && fmt(date, { weekday: 'short', month: 'short', day: 'numeric' })} · {time}
                  </p>
                  <p className="text-[10px] text-[#45464F]">30 min · tap to change</p>
                </div>
                <ChevronRight className="h-4 w-4 text-[#C6C5D1] group-hover:text-[#001148] transition-colors shrink-0" />
              </button>

              <h1 className="text-xl font-headline font-extrabold text-[#001148] mb-1">
                A bit about you
              </h1>
              <p className="text-sm text-[#45464F] mb-6">
                So we can tailor the walkthrough to your team&apos;s goals.
              </p>

              <form onSubmit={submit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>First Name <span className="text-[#ba1a1a] normal-case">*</span></label>
                    <input
                      type="text" required placeholder="Maria"
                      value={form.firstName}
                      onChange={(e) => set('firstName', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name <span className="text-[#ba1a1a] normal-case">*</span></label>
                    <input
                      type="text" required placeholder="Santos"
                      value={form.lastName}
                      onChange={(e) => set('lastName', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Work Email <span className="text-[#ba1a1a] normal-case">*</span></label>
                  <input
                    type="email" required placeholder="maria@company.com"
                    value={form.workEmail}
                    onChange={(e) => set('workEmail', e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Company <span className="text-[#ba1a1a] normal-case">*</span></label>
                    <input
                      type="text" required placeholder="Acme Corp"
                      value={form.companyName}
                      onChange={(e) => set('companyName', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Team Size <span className="text-[#ba1a1a] normal-case">*</span></label>
                    <Select required value={form.teamSize} onValueChange={(v) => set('teamSize', v)}>
                      <SelectTrigger className="w-full bg-[#F7F9FC] border-0 border-b-2 border-[#C6C5D1] focus:border-[#1B9AAA] focus:ring-0 rounded-none px-0 py-3 h-auto text-sm font-medium text-[#45464F] shadow-none">
                        <SelectValue placeholder="How many people?" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-[#C6C5D1]/20 bg-white shadow-[0_10px_30px_rgba(0,17,72,0.10)]">
                        {['1-50 employees', '51-200 employees', '201-500 employees', '500+ employees'].map((v) => (
                          <SelectItem key={v} value={v} className="text-[#001148] text-sm font-medium focus:bg-[#F7F9FC]">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    What would you like to see?{' '}
                    <span className="text-[#45464F]/40 font-normal normal-case">(optional)</span>
                  </label>
                  <Textarea
                    rows={2}
                    placeholder="Goals, challenges, specific features…"
                    value={form.goals}
                    onChange={(e) => set('goals', e.target.value)}
                    className="w-full bg-[#F7F9FC] border-0 border-b-2 border-[#C6C5D1] focus:border-[#1B9AAA] focus:ring-0 rounded-none px-0 py-3 text-sm font-medium text-[#191C1E] placeholder:text-[#45464F]/40 resize-none shadow-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-[#ba1a1a] font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full h-12 rounded-2xl bg-[#1B9AAA] font-headline font-bold text-white text-base shadow-lg shadow-[#1B9AAA]/25 hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {busy ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Locking in your slot…
                    </>
                  ) : (
                    <>Confirm My Demo <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>

                <p className="text-center text-[10px] font-headline text-[#C6C5D1] tracking-wider uppercase">
                  No credit card · No spam · We respect your time
                </p>
              </form>
            </div>
          )}

          {/* ── Step 3: Success ─────────────────────────────────────────── */}
          {step === 'success' && (
            <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
              <div className="relative mb-8">
                <div className="h-20 w-20 rounded-[1.5rem] bg-[#001148] flex items-center justify-center mx-auto shadow-[0_10px_30px_rgba(0,17,72,0.25)]">
                  <CheckCircle2 className="h-10 w-10 text-[#1B9AAA]" />
                </div>
                <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-[#1B9AAA] border-2 border-white flex items-center justify-center shadow-md">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
              </div>

              <p className="text-[10px] font-headline font-bold uppercase tracking-[0.3em] text-[#1B9AAA] mb-2">
                You&apos;re all set
              </p>
              <h2 className="text-2xl font-headline font-extrabold text-[#001148] mb-3">
                Demo booked!
              </h2>
              <p className="text-sm text-[#45464F] mb-8 max-w-[280px] leading-relaxed font-medium">
                A calendar invite is heading to your inbox. We&apos;re looking forward to meeting you.
              </p>

              {/* Booking summary */}
              <div className="w-full max-w-[320px] rounded-2xl bg-[#F7F9FC] p-5 text-left space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-[#001148] flex items-center justify-center">
                    <Clock className="h-3.5 w-3.5 text-[#1B9AAA]" />
                  </div>
                  <div>
                    <p className="text-xs font-headline font-extrabold text-[#001148]">
                      {date && fmt(date, { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-[10px] text-[#45464F] mt-0.5">{time} · 30 minutes</p>
                  </div>
                </div>
                <div className="h-px bg-[#C6C5D1]/20" />
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-[#001148] flex items-center justify-center">
                    <Video className="h-3.5 w-3.5 text-[#1B9AAA]" />
                  </div>
                  <div>
                    <p className="text-xs font-headline font-extrabold text-[#001148]">Google Meet</p>
                    <p className="text-[10px] text-[#45464F] mt-0.5">Link included in your invite</p>
                  </div>
                </div>
              </div>

              <Link href="/">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-[#C6C5D1]/30 bg-white text-[#001148] font-headline font-semibold text-sm hover:bg-[#F7F9FC] transition-all shadow-[0_4px_16px_rgba(0,17,72,0.06)]">
                  <ArrowLeft className="h-4 w-4" /> Back to home
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
