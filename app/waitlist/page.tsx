'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle2, ArrowLeft, Zap, Users, Bell, Star } from 'lucide-react'

const WAITLIST_PERKS = [
  { icon: Bell, text: 'First to know when early access opens' },
  { icon: Zap, text: 'Priority onboarding - skip the queue' },
  { icon: Star, text: 'Locked-in early adopter pricing' },
  { icon: Users, text: 'Exclusive access to the beta program' },
]

type WaitlistFormState = {
  fullName: string
  workEmail: string
  companyName: string
  companySize: string
  role: string
}

const INITIAL_FORM: WaitlistFormState = {
  fullName: '',
  workEmail: '',
  companyName: '',
  companySize: '',
  role: '',
}

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<WaitlistFormState>(INITIAL_FORM)

  function setField<K extends keyof WaitlistFormState>(key: K, value: WaitlistFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!form.fullName || !form.workEmail || !form.companyName || !form.companySize || !form.role) {
      setError('Please complete all required fields.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        setError(data.error ?? 'Failed to submit. Please try again.')
        return
      }

      setSubmitted(true)
      setForm(INITIAL_FORM)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-50 flex flex-col items-center justify-center relative">
      <Link
        href="/"
        className="absolute top-6 left-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-[#001148] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="w-full max-w-3xl mx-6 grid lg:grid-cols-[1fr_320px] rounded-2xl overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/80">
        <div className="bg-[#001148] p-8 flex flex-col justify-center">
          <div className="mb-6 flex items-center">
            <Image
              src="/SEEGLA-LOGO-VARIATIONSECONDARY.png"
              alt="SEEGLA"
              width={100}
              height={28}
              className="h-7 w-auto object-contain"
            />
          </div>

          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-white/40">Early Access</p>
          <h1 className="mb-3 text-2xl font-black leading-tight text-white">
            Be first.
            <br />
            <span className="text-[#1B9AAA]">Get ahead.</span>
          </h1>
          <p className="mb-6 text-sm text-slate-400 leading-relaxed">
            SEEGLA is rolling out to select companies first. Join the waitlist and lock in early adopter benefits.
          </p>

          <ul className="space-y-4 mb-8">
            {WAITLIST_PERKS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-3.5 w-3.5 text-[#1B9AAA]" />
                </div>
                <span className="pt-1 text-xs leading-snug text-slate-300">{text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {['500+ companies', '50k+ employees', '98% retention'].map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-500"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 flex flex-col justify-center">
          {!submitted ? (
            <>
              <h2 className="mb-1 text-xl font-black text-[#001148]">Join the Waitlist</h2>
              <p className="mb-5 text-sm text-slate-400">Reserve your spot. We&apos;ll reach out when your slot opens.</p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-xs font-semibold text-[#001148]">
                    Full Name <span className="text-[#F47560]">*</span>
                  </Label>
                  <Input
                    id="name"
                    required
                    placeholder="Maria Santos"
                    value={form.fullName}
                    onChange={(e) => setField('fullName', e.target.value)}
                    className="h-9 rounded-lg border-slate-200 bg-white text-[#001148] text-sm placeholder:text-slate-400 focus:border-[#1B9AAA] focus:ring-[#1B9AAA]/20"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs font-semibold text-[#001148]">
                    Work Email <span className="text-[#F47560]">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="maria@company.com"
                    value={form.workEmail}
                    onChange={(e) => setField('workEmail', e.target.value)}
                    className="h-9 rounded-lg border-slate-200 bg-white text-[#001148] text-sm placeholder:text-slate-400 focus:border-[#1B9AAA] focus:ring-[#1B9AAA]/20"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="company" className="text-xs font-semibold text-[#001148]">
                    Company Name <span className="text-[#F47560]">*</span>
                  </Label>
                  <Input
                    id="company"
                    required
                    placeholder="Acme Corp"
                    value={form.companyName}
                    onChange={(e) => setField('companyName', e.target.value)}
                    className="h-9 rounded-lg border-slate-200 bg-white text-[#001148] text-sm placeholder:text-slate-400 focus:border-[#1B9AAA] focus:ring-[#1B9AAA]/20"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-[#001148]">
                      Company Size <span className="text-[#F47560]">*</span>
                    </Label>
                    <Select
                      required
                      value={form.companySize}
                      onValueChange={(value) => setField('companySize', value)}
                    >
                      <SelectTrigger className="h-9 rounded-lg border-slate-200 bg-white text-slate-500 text-sm focus:border-[#1B9AAA] focus:ring-[#1B9AAA]/20">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-200 bg-white">
                        <SelectItem value="1-50" className="text-[#001148] focus:bg-[#E8F6F8] focus:text-[#001148]">1 - 50</SelectItem>
                        <SelectItem value="51-200" className="text-[#001148] focus:bg-[#E8F6F8] focus:text-[#001148]">51 - 200</SelectItem>
                        <SelectItem value="201-500" className="text-[#001148] focus:bg-[#E8F6F8] focus:text-[#001148]">201 - 500</SelectItem>
                        <SelectItem value="500+" className="text-[#001148] focus:bg-[#E8F6F8] focus:text-[#001148]">500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold text-[#001148]">
                      Your Role <span className="text-[#F47560]">*</span>
                    </Label>
                    <Select
                      required
                      value={form.role}
                      onValueChange={(value) => setField('role', value)}
                    >
                      <SelectTrigger className="h-9 rounded-lg border-slate-200 bg-white text-slate-500 text-sm focus:border-[#1B9AAA] focus:ring-[#1B9AAA]/20">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-200 bg-white">
                        <SelectItem value="hr" className="text-[#001148] focus:bg-[#E8F6F8] focus:text-[#001148]">HR Manager</SelectItem>
                        <SelectItem value="ceo" className="text-[#001148] focus:bg-[#E8F6F8] focus:text-[#001148]">CEO / Founder</SelectItem>
                        <SelectItem value="ops" className="text-[#001148] focus:bg-[#E8F6F8] focus:text-[#001148]">Operations</SelectItem>
                        <SelectItem value="wellness" className="text-[#001148] focus:bg-[#E8F6F8] focus:text-[#001148]">Wellness Lead</SelectItem>
                        <SelectItem value="other" className="text-[#001148] focus:bg-[#E8F6F8] focus:text-[#001148]">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 rounded-full bg-[#001148] font-bold text-white hover:bg-[#001148]/90 transition-all duration-150 shadow-md disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Saving your spot...
                    </span>
                  ) : (
                    'Reserve My Spot'
                  )}
                </Button>

                {error && <p className="text-center text-xs text-[#F47560]">{error}</p>}

                <p className="text-center text-xs text-slate-400">No credit card required - We&apos;ll only email you about SEEGLA</p>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F6F8]">
                <CheckCircle2 className="h-8 w-8 text-[#1B9AAA]" />
              </div>
              <h2 className="mb-2 text-xl font-black text-[#001148]">You&apos;re on the list!</h2>
              <p className="mb-6 max-w-xs text-sm text-slate-400 leading-relaxed">
                We&apos;ll reach out when your slot opens. Keep an eye on your inbox - you&apos;re in early.
              </p>
              <Link href="/">
                <Button
                  variant="outline"
                  className="rounded-full border-[#001148]/20 text-[#001148] hover:bg-[#001148]/5 gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to home
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

