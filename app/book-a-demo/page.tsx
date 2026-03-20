'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, ArrowLeft, ChevronLeft, ChevronRight, Clock, Video, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const SLOTS = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM']

type Step = 'datetime' | 'details' | 'success'
const STEPS: { id: Step; label: string }[] = [
  { id: 'datetime', label: 'Date & time' },
  { id: 'details', label: 'Your details' },
  { id: 'success', label: 'Confirmed' },
]

type BookingFormState = {
  firstName: string
  lastName: string
  workEmail: string
  companyName: string
  teamSize: string
  goals: string
}

const INITIAL_FORM: BookingFormState = {
  firstName: '',
  lastName: '',
  workEmail: '',
  companyName: '',
  teamSize: '',
  goals: '',
}

function buildGrid(y: number, m: number) {
  const pad = new Date(y, m, 1).getDay()
  const days = new Date(y, m + 1, 0).getDate()
  return [...Array(pad).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
}

function isOff(y: number, m: number, d: number) {
  const date = new Date(y, m, d)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return date <= now || date.getDay() === 0 || date.getDay() === 6
}

function fmt(d: Date, opts: Intl.DateTimeFormatOptions) {
  return d.toLocaleDateString('en-US', opts)
}

export default function BookADemoPage() {
  const today = useMemo(() => new Date(), [])
  const [step, setStep] = useState<Step>('datetime')
  const [vy, setVy] = useState(today.getFullYear())
  const [vm, setVm] = useState(today.getMonth())
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<BookingFormState>(INITIAL_FORM)

  const grid = useMemo(() => buildGrid(vy, vm), [vy, vm])
  const canBack = vy > today.getFullYear() || vm > today.getMonth()
  const stepIdx = STEPS.findIndex((s) => s.id === step)

  function setField<K extends keyof BookingFormState>(key: K, value: BookingFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function prevMo() {
    if (!canBack) return
    if (vm === 0) {
      setVy((y) => y - 1)
      setVm(11)
    } else {
      setVm((m) => m - 1)
    }
    setDate(null)
    setTime(null)
  }

  function nextMo() {
    if (vm === 11) {
      setVy((y) => y + 1)
      setVm(0)
    } else {
      setVm((m) => m + 1)
    }
    setDate(null)
    setTime(null)
  }

  function pickDay(d: number) {
    setDate(new Date(vy, vm, d))
    setTime(null)
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!date || !time) {
      setError('Please select a date and time first.')
      return
    }

    if (!form.firstName || !form.lastName || !form.workEmail || !form.companyName || !form.teamSize) {
      setError('Please complete all required fields.')
      return
    }

    setBusy(true)

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          requestedDate: date.toISOString().slice(0, 10),
          requestedTime: time,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        setError(data.error ?? 'Failed to submit booking. Please try again.')
        return
      }

      setStep('success')
      setForm(INITIAL_FORM)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const isActive = (day: number) => date?.getDate() === day && date?.getMonth() === vm && date?.getFullYear() === vy

  const SidebarSteps = () => (
    <div>
      {STEPS.map((s, i) => {
        const done = i < stepIdx
        const cur = i === stepIdx

        return (
          <div key={s.id} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-300',
                  done
                    ? 'bg-[#1B9AAA] border-[#1B9AAA] text-white'
                    : cur
                      ? 'bg-white border-white text-[#001148]'
                      : 'border-white/20 text-white/25',
                )}
              >
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn('w-px h-8 mt-1 transition-all duration-300', i < stepIdx ? 'bg-[#1B9AAA]/50' : 'bg-white/10')} />
              )}
            </div>
            <div className="pt-0.5 pb-8">
              <p className={cn('text-xs font-bold', cur ? 'text-white' : done ? 'text-[#1B9AAA]' : 'text-white/25')}>
                {s.label}
              </p>
              {s.id === 'datetime' && date && (
                <p className="text-[10px] text-white/35 mt-0.5">
                  {fmt(date, { month: 'short', day: 'numeric' })}
                  {time ? ` - ${time}` : ''}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-slate-50 flex flex-col items-center justify-center p-4 lg:p-6 relative">
      <Link href="/" className="absolute top-5 left-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-[#001148] transition-colors z-10">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="w-full max-w-[960px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 border border-slate-100 grid lg:grid-cols-[240px_1fr]">
        <div className="hidden lg:flex bg-[#001148] flex-col p-7">
          <Image src="/SEEGLA-LOGO-VARIATIONPRIMARY.png" alt="SEEGLA" width={88} height={24} className="h-6 w-auto object-contain mb-7" />

          <div className="mb-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1B9AAA] mb-1.5">Book a Demo</p>
            <h2 className="text-xl font-black text-white leading-snug mb-4">
              See SEEGLA
              <br />
              in action.
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-xs text-white/50">
                <Clock className="h-3.5 w-3.5 text-[#1B9AAA] shrink-0" />
                <span>30-minute session</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/50">
                <Video className="h-3.5 w-3.5 text-[#1B9AAA] shrink-0" />
                <span>Google Meet - link on confirm</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10 mb-6" />
          <div className="flex-1"><SidebarSteps /></div>

          <div className="pt-5 border-t border-white/10 flex flex-wrap gap-2">
            {['500+ companies', '50k+ employees', '98% retention'].map((s) => (
              <span key={s} className="text-[9px] font-medium text-white/25 border border-white/10 rounded-full px-2 py-0.5">{s}</span>
            ))}
          </div>
        </div>

        <div className="bg-white flex flex-col">
          <div className="lg:hidden bg-[#001148] px-5 py-4 flex items-center gap-3">
            <Image src="/SEEGLA-LOGO-VARIATIONPRIMARY.png" alt="SEEGLA" width={72} height={20} className="h-5 w-auto object-contain" />
            <div className="ml-auto flex items-center gap-1">
              {STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === stepIdx ? 'w-8 bg-[#1B9AAA]' : i < stepIdx ? 'w-3 bg-[#1B9AAA]/40' : 'w-3 bg-white/15',
                  )}
                />
              ))}
            </div>
          </div>

          {step === 'datetime' && (
            <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_172px] lg:divide-x lg:divide-slate-100">
              <div className="p-5 lg:p-7">
                <h1 className="text-xl font-black text-[#001148] mb-0.5">When works for you?</h1>
                <p className="text-xs text-slate-400 mb-5">Pick any available weekday - we&apos;ll confirm within 1 business day.</p>

                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMo} disabled={!canBack} className={cn('p-1.5 rounded-xl transition-all', canBack ? 'hover:bg-slate-100 text-[#001148]' : 'text-slate-200 cursor-not-allowed')}>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-black text-[#001148]">{MONTHS[vm]} {vy}</span>
                  <button onClick={nextMo} className="p-1.5 rounded-xl hover:bg-slate-100 text-[#001148] transition-all">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 mb-1.5">
                  {DAYS.map((d) => <p key={d} className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-wider">{d}</p>)}
                </div>

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
                          off && 'text-slate-200 cursor-not-allowed',
                          !off && !on && 'text-[#001148] hover:bg-slate-100',
                          on && 'bg-[#001148] text-white shadow-md shadow-[#001148]/25 scale-105',
                        )}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>

                <p className="mt-4 text-[10px] text-slate-300 text-center">Philippine Standard Time (UTC+8)</p>

                {date && (
                  <div className="lg:hidden mt-5 pt-5 border-t border-slate-100">
                    <p className="text-xs font-black text-[#001148] mb-3">
                      {fmt(date, { weekday: 'long', month: 'long', day: 'numeric' })}
                      <span className="font-normal text-slate-400 ml-1">- pick a time</span>
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {SLOTS.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={cn(
                            'rounded-xl border py-2.5 text-xs font-semibold transition-all',
                            time === t ? 'bg-[#001148] border-[#001148] text-white shadow-sm' : 'border-slate-200 text-slate-500 hover:border-[#001148]/40 hover:text-[#001148]',
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {time && (
                      <Button onClick={() => setStep('details')} className="mt-4 w-full h-11 rounded-2xl bg-[#001148] text-white font-bold hover:bg-[#001148]/90 shadow-lg shadow-[#001148]/20">
                        Continue - Your details
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <div className="hidden lg:flex flex-col p-5">
                {date ? (
                  <>
                    <div className="mb-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{fmt(date, { weekday: 'long' })}</p>
                      <p className="text-sm font-black text-[#001148]">{fmt(date, { month: 'long', day: 'numeric' })}</p>
                    </div>

                    <div className="overflow-y-auto space-y-1.5 pr-0.5" style={{ maxHeight: 300 }}>
                      {SLOTS.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTime(t)}
                          className={cn(
                            'w-full rounded-xl border py-2.5 text-xs font-semibold transition-all duration-150',
                            time === t
                              ? 'bg-[#001148] border-[#001148] text-white shadow-sm scale-[1.02]'
                              : 'border-slate-200 text-slate-500 hover:border-[#001148]/30 hover:text-[#001148] hover:bg-slate-50',
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {time && (
                      <Button onClick={() => setStep('details')} className="mt-3 w-full h-10 rounded-2xl bg-[#001148] text-white text-xs font-bold hover:bg-[#001148]/90 shadow-md shadow-[#001148]/20 shrink-0">
                        Continue -
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-slate-300" />
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">Pick a date to see available times</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="p-6 lg:p-7 flex-1 overflow-y-auto">
              <button
                onClick={() => setStep('datetime')}
                className="w-full mb-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 hover:border-[#001148]/20 hover:bg-slate-100/60 transition-all group text-left"
              >
                <div className="h-9 w-9 shrink-0 rounded-xl bg-[#001148] flex items-center justify-center">
                  <Clock className="h-4 w-4 text-[#1B9AAA]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-[#001148] truncate">
                    {date && fmt(date, { weekday: 'short', month: 'short', day: 'numeric' })} &middot; {time}
                  </p>
                  <p className="text-[10px] text-slate-400">30 min &middot; tap to change</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-[#001148] transition-colors shrink-0" />
              </button>

              <h1 className="text-xl font-black text-[#001148] mb-0.5">A bit about you</h1>
              <p className="text-sm text-slate-400 mb-4">So we can tailor the walkthrough to your team&apos;s goals.</p>

              <form onSubmit={submit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="fn" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">First Name <span className="text-[#F47560] normal-case">*</span></Label>
                    <Input
                      id="fn"
                      required
                      placeholder="Maria"
                      value={form.firstName}
                      onChange={(e) => setField('firstName', e.target.value)}
                      className="h-10 rounded-xl border-slate-200 text-[#001148] text-sm placeholder:text-slate-300 focus:border-[#001148]/40 focus:ring-[#001148]/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ln" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Name <span className="text-[#F47560] normal-case">*</span></Label>
                    <Input
                      id="ln"
                      required
                      placeholder="Santos"
                      value={form.lastName}
                      onChange={(e) => setField('lastName', e.target.value)}
                      className="h-10 rounded-xl border-slate-200 text-[#001148] text-sm placeholder:text-slate-300 focus:border-[#001148]/40 focus:ring-[#001148]/10"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="em" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Work Email <span className="text-[#F47560] normal-case">*</span></Label>
                  <Input
                    id="em"
                    type="email"
                    required
                    placeholder="maria@company.com"
                    value={form.workEmail}
                    onChange={(e) => setField('workEmail', e.target.value)}
                    className="h-10 rounded-xl border-slate-200 text-[#001148] text-sm placeholder:text-slate-300 focus:border-[#001148]/40 focus:ring-[#001148]/10"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="co" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company <span className="text-[#F47560] normal-case">*</span></Label>
                    <Input
                      id="co"
                      required
                      placeholder="Acme Corp"
                      value={form.companyName}
                      onChange={(e) => setField('companyName', e.target.value)}
                      className="h-10 rounded-xl border-slate-200 text-[#001148] text-sm placeholder:text-slate-300 focus:border-[#001148]/40 focus:ring-[#001148]/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Team Size <span className="text-[#F47560] normal-case">*</span></Label>
                    <Select required value={form.teamSize} onValueChange={(value) => setField('teamSize', value)}>
                      <SelectTrigger className="h-10 rounded-xl border-slate-200 text-sm text-slate-400 focus:border-[#001148]/40 focus:ring-[#001148]/10">
                        <SelectValue placeholder="How many people?" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-200 bg-white">
                        {['1-50 employees', '51-200 employees', '201-500 employees', '500+ employees'].map((v) => (
                          <SelectItem key={v} value={v} className="text-[#001148] text-sm focus:bg-slate-50">{v}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="msg" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    What would you like to see? <span className="text-slate-300 font-normal normal-case">(optional)</span>
                  </Label>
                  <Textarea
                    id="msg"
                    rows={2}
                    placeholder="Goals, challenges, specific features..."
                    value={form.goals}
                    onChange={(e) => setField('goals', e.target.value)}
                    className="rounded-xl border-slate-200 text-[#001148] text-sm placeholder:text-slate-300 focus:border-[#001148]/40 focus:ring-[#001148]/10 resize-none"
                  />
                </div>
                <Button type="submit" disabled={busy} className="w-full h-11 rounded-2xl bg-[#001148] font-bold text-white hover:bg-[#001148]/90 shadow-lg shadow-[#001148]/15 disabled:opacity-60 text-sm">
                  {busy ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Locking in your slot...
                    </span>
                  ) : 'Confirm My Demo -'}
                </Button>

                {error && <p className="text-center text-xs text-[#F47560]">{error}</p>}

                <p className="text-center text-[10px] text-slate-300">No credit card - No spam - We respect your time</p>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
              <div className="relative mb-6">
                <div className="h-20 w-20 rounded-3xl bg-[#001148] flex items-center justify-center mx-auto shadow-xl shadow-[#001148]/30">
                  <CheckCircle2 className="h-10 w-10 text-[#1B9AAA]" />
                </div>
                <div className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-[#1B9AAA] border-2 border-white flex items-center justify-center shadow-md">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1B9AAA] mb-1.5">You&apos;re all set</p>
              <h2 className="text-2xl font-black text-[#001148] mb-2">Demo booked!</h2>
              <p className="text-sm text-slate-400 mb-6 max-w-[260px] leading-relaxed">
                A calendar invite is heading to your inbox. We&apos;re looking forward to meeting you.
              </p>

              <div className="w-full max-w-[300px] rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-[#001148] flex items-center justify-center">
                    <Clock className="h-3.5 w-3.5 text-[#1B9AAA]" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#001148]">{date && fmt(date, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{time} - 30 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-xl bg-[#001148] flex items-center justify-center">
                    <Video className="h-3.5 w-3.5 text-[#1B9AAA]" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#001148]">Google Meet</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Link included in your invite</p>
                  </div>
                </div>
              </div>

              <Link href="/">
                <Button variant="outline" className="rounded-2xl border-slate-200 text-[#001148] hover:bg-slate-50 gap-2 text-sm">
                  <ArrowLeft className="h-4 w-4" /> Back to home
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

