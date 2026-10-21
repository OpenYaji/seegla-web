'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full min-h-12 rounded-md border-0 border-b-2 border-hairline bg-surface-high px-4 py-3 text-sm font-medium text-ink placeholder:text-ink-muted/50 focus:border-eucalyptus-deep focus:outline-none'

const labelClass =
  'mb-2 block text-label-md font-bold uppercase tracking-[0.12em] text-navy'

/**
 * Waitlist form.
 *
 * The three states this view can be in are all present and each one says what
 * happened: idle with a labelled field, loading with a busy button, and error
 * with the server's message next to the form rather than a red border alone.
 * Colour never carries the error on its own.
 */
export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    companySize: '1-50',
    role: 'hr',
  })

  const update = (key: keyof typeof form) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm({ ...form, [key]: event.target.value })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErrorMsg(data.error ?? 'We could not save that. Please check the fields and try again.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setErrorMsg('We could not reach the server. Check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-10 text-center" role="status">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="mx-auto h-12 w-12 text-eucalyptus-deep"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12.5l2.5 2.5L16 9.5" />
        </svg>
        <h3 className="mt-5 font-headline text-title-md font-extrabold text-navy">
          You&apos;re on the list.
        </h3>
        <p className="mt-2 text-ink-muted">
          We&apos;ll reach out with early access details soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="wl-name">
            Full name
          </label>
          <input
            id="wl-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Juan Dela Cruz"
            value={form.fullName}
            onChange={update('fullName')}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="wl-email">
            Work email
          </label>
          <input
            id="wl-email"
            name="workEmail"
            type="email"
            required
            autoComplete="email"
            placeholder="juan@company.ph"
            value={form.workEmail}
            onChange={update('workEmail')}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="wl-company">
          Company name
        </label>
        <input
          id="wl-company"
          name="companyName"
          type="text"
          required
          autoComplete="organization"
          placeholder="Enter your organization"
          value={form.companyName}
          onChange={update('companyName')}
          className={inputClass}
        />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="wl-size">
            Company size
          </label>
          <div className="relative">
            <select
              id="wl-size"
              name="companySize"
              value={form.companySize}
              onChange={update('companySize')}
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value="1-50">1 to 50 employees</option>
              <option value="51-200">51 to 200 employees</option>
              <option value="201-500">201 to 500 employees</option>
              <option value="500+">More than 500 employees</option>
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="wl-role">
            Your role
          </label>
          <div className="relative">
            <select
              id="wl-role"
              name="role"
              value={form.role}
              onChange={update('role')}
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value="hr">HR Manager</option>
              <option value="ceo">CEO or Founder</option>
              <option value="ops">Operations</option>
              <option value="wellness">Wellness Lead</option>
              <option value="other">Other</option>
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div aria-live="polite">
        {status === 'error' && (
          <p className="rounded-md bg-error/10 px-4 py-3 text-sm font-medium text-error">
            {errorMsg}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="cta-primary focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl px-8 py-4 font-headline text-base font-extrabold text-on-navy transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === 'loading' ? 'Submitting…' : 'Join the Waitlist'}
      </button>
    </form>
  )
}
