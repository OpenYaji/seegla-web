'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  LogOut, RefreshCw, Users, CalendarCheck2, Send, Search,
  Copy, Check, X, Link2, ChevronDown, Home, TrendingUp, Clock,
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

// ─── Types ────────────────────────────────────────────────────────────────────

type WaitlistLead = {
  id: number
  full_name: string
  work_email: string
  company_name: string
  company_size: string
  role: string
  status: string
  created_at: string
}

type DemoBooking = {
  id: number
  first_name: string
  last_name: string
  work_email: string
  company_name: string
  team_size: string
  requested_date: string
  requested_time: string
  status: string
  created_at: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(value: string) {
  return new Date(value).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })
}

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function isThisWeek(dateStr: string) {
  const d = new Date(dateStr)
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  return d >= weekAgo
}

const STATUS_STYLES: Record<string, string> = {
  new:       'bg-[#1B9AAA]/10 text-[#1B9AAA] border border-[#1B9AAA]/20',
  contacted: 'bg-blue-50 text-blue-600 border border-blue-200',
  qualified: 'bg-purple-50 text-purple-600 border border-purple-200',
  converted: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  archived:  'bg-slate-100 text-slate-400 border border-slate-200',
  pending:   'bg-amber-50 text-amber-600 border border-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  cancelled: 'bg-red-50 text-red-500 border border-red-200',
}

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_STYLES[status.toLowerCase()] ?? 'bg-slate-100 text-slate-500 border border-slate-200'
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${cls}`}>
      {status}
    </span>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button onClick={copy} className="ml-1 text-slate-300 hover:text-[#1B9AAA] transition-colors" title="Copy email">
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}

// ─── Send Link Modal ───────────────────────────────────────────────────────────

type Recipient = { email: string; name: string }

function SendLinkModal({
  recipients,
  onClose,
}: {
  recipients: Recipient[]
  onClose: () => void
}) {
  const [link, setLink] = useState('')
  const [subject, setSubject] = useState('Check this out from Seegla')
  const [message, setMessage] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set(recipients.map((r) => r.email)))

  const toggle = (email: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(email) ? next.delete(email) : next.add(email)
      return next
    })

  const selectAll = () => setSelected(new Set(recipients.map((r) => r.email)))
  const clearAll = () => setSelected(new Set())

  const handleSend = () => {
    if (!link.trim() || selected.size === 0) return
    const bcc = [...selected].join(',')
    const body = `${message ? message + '\n\n' : ''}${link}\n\n— Seegla Team`
    const mailto = `mailto:?bcc=${encodeURIComponent(bcc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailto, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001148]/30 backdrop-blur-sm p-4">
      <div
        className="w-full max-w-lg rounded-2xl shadow-[0_24px_80px_rgba(0,17,72,0.20)] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(240,244,255,0.95) 100%)',
          border: '1px solid rgba(255,255,255,0.60)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1B9AAA]/10">
              <Send className="h-4 w-4 text-[#1B9AAA]" />
            </div>
            <h2 className="text-base font-black text-[#001148]">Send Link to Leads</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Link input */}
          <div>
            <label className="block text-xs font-bold text-[#001148]/60 uppercase tracking-widest mb-1.5">Link URL *</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 focus-within:border-[#1B9AAA] transition-colors">
              <Link2 className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                className="flex-1 bg-transparent text-sm text-[#001148] placeholder:text-slate-300 outline-none"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-bold text-[#001148]/60 uppercase tracking-widest mb-1.5">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#001148] placeholder:text-slate-300 outline-none focus:border-[#1B9AAA] transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-[#001148]/60 uppercase tracking-widest mb-1.5">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Add a short note..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#001148] placeholder:text-slate-300 outline-none focus:border-[#1B9AAA] transition-colors resize-none"
            />
          </div>

          {/* Recipients */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#001148]/60 uppercase tracking-widest">
                Recipients ({selected.size}/{recipients.length})
              </label>
              <div className="flex gap-2">
                <button onClick={selectAll} className="text-xs text-[#1B9AAA] hover:underline font-semibold">All</button>
                <span className="text-slate-200">|</span>
                <button onClick={clearAll} className="text-xs text-slate-400 hover:underline font-semibold">None</button>
              </div>
            </div>
            <div className="max-h-40 overflow-y-auto rounded-xl border border-slate-200 bg-white divide-y divide-slate-50">
              {recipients.map((r) => (
                <label key={r.email} className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={selected.has(r.email)}
                    onChange={() => toggle(r.email)}
                    className="accent-[#1B9AAA] h-3.5 w-3.5"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#001148] truncate">{r.name}</p>
                    <p className="text-xs text-slate-400 truncate">{r.email}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <p className="text-xs text-slate-400">Opens your default email client with BCC</p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={!link.trim() || selected.size === 0}
              className="flex items-center gap-1.5 rounded-xl px-5 py-2 text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, rgba(27,154,170,0.90) 0%, rgba(21,123,137,0.80) 100%)',
                boxShadow: '0 4px 16px rgba(27,154,170,0.30)',
              }}
            >
              <Send className="h-3.5 w-3.5" /> Open Email
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [waitlist, setWaitlist] = useState<WaitlistLead[]>([])
  const [bookings, setBookings] = useState<DemoBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'waitlist' | 'bookings'>('waitlist')
  const [search, setSearch] = useState('')
  const [showSendModal, setShowSendModal] = useState(false)

  const loadData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true)
    else setLoading(true)
    setError(null)
    try {
      const [waitlistRes, bookingRes] = await Promise.all([
        fetch('/api/admin/waitlist', { cache: 'no-store' }),
        fetch('/api/admin/book', { cache: 'no-store' }),
      ])
      if ([waitlistRes.status, bookingRes.status].some((s) => s === 401 || s === 403)) {
        router.replace('/admin/login')
        return
      }
      if (!waitlistRes.ok || !bookingRes.ok) { setError('Failed to load CRM data.'); return }
      const waitlistJson = (await waitlistRes.json()) as { items: WaitlistLead[] }
      const bookingJson  = (await bookingRes.json()) as { items: DemoBooking[] }
      setWaitlist(waitlistJson.items ?? [])
      setBookings(bookingJson.items ?? [])
    } catch {
      setError('Network error while loading CRM data.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [router])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  useEffect(() => { loadData(false) }, [loadData])

  // Stats
  const newThisWeek  = waitlist.filter((l) => isThisWeek(l.created_at)).length
  const newBookings  = bookings.filter((b) => isThisWeek(b.created_at)).length
  const converted    = waitlist.filter((l) => l.status === 'converted').length
  const convRate     = waitlist.length ? Math.round((converted / waitlist.length) * 100) : 0

  // Filtered data
  const q = search.toLowerCase()
  const filteredWaitlist = waitlist.filter((l) =>
    !q || [l.full_name, l.work_email, l.company_name, l.role].some((v) => v?.toLowerCase().includes(q))
  )
  const filteredBookings = bookings.filter((b) =>
    !q || [b.first_name, b.last_name, b.work_email, b.company_name].some((v) => v?.toLowerCase().includes(q))
  )

  // All emails for Send Link
  const allRecipients: { email: string; name: string }[] = [
    ...waitlist.map((l) => ({ email: l.work_email, name: l.full_name })),
    ...bookings.map((b) => ({ email: b.work_email, name: `${b.first_name} ${b.last_name}` })),
  ].filter((r, i, arr) => arr.findIndex((x) => x.email === r.email) === i)

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #F7F9FC 0%, #ECEEF1 100%)' }}
    >
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 px-6 py-3"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.80) 0%, rgba(240,244,255,0.70) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.50)',
          boxShadow: '0 4px 24px rgba(0,17,72,0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black text-white"
              style={{ background: 'linear-gradient(135deg, #1B9AAA 0%, #157B89 100%)' }}
            >
              S
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1B9AAA]">Admin CRM</p>
              <p className="text-sm font-black text-[#001148] leading-none">Seegla Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSendModal(true)}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white transition-all hover:-translate-y-px"
              style={{
                background: 'linear-gradient(135deg, rgba(27,154,170,0.85) 0%, rgba(21,123,137,0.75) 100%)',
                border: '1px solid rgba(255,255,255,0.35)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.40) inset, 0 4px 16px rgba(27,154,170,0.25)',
              }}
            >
              <Send className="h-3.5 w-3.5" /> Send Link
            </button>
            <button
              onClick={() => loadData(true)}
              disabled={loading || refreshing}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-[#001148] transition-all hover:bg-white/70 disabled:opacity-50"
              style={{ border: '1px solid rgba(0,17,72,0.08)' }}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-[#001148] transition-all hover:bg-white/70"
              style={{ border: '1px solid rgba(0,17,72,0.08)' }}
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-[#001148] transition-all hover:bg-white/70"
              style={{ border: '1px solid rgba(0,17,72,0.08)' }}
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        {/* ── Stats ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users,       label: 'Total Waitlist',   value: waitlist.length,  sub: `${newThisWeek} this week`,  color: '#1B9AAA' },
            { icon: CalendarCheck2, label: 'Demo Requests', value: bookings.length,  sub: `${newBookings} this week`,  color: '#5E7D7E' },
            { icon: TrendingUp,  label: 'Converted',        value: converted,         sub: `${convRate}% rate`,         color: '#059669' },
            { icon: Clock,       label: 'New This Week',    value: newThisWeek + newBookings, sub: 'combined leads', color: '#7C3AED' },
          ].map(({ icon: Icon, label, value, sub, color }) => (
            <div
              key={label}
              className="rounded-2xl p-5 transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.90) 0%, rgba(240,244,255,0.80) 100%)',
                border: '1px solid rgba(255,255,255,0.60)',
                boxShadow: '0 4px 24px rgba(0,17,72,0.06), 0 1px 0 rgba(255,255,255,0.80) inset',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-bold text-[#001148]/50 uppercase tracking-widest">{label}</p>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${color}15` }}>
                  <Icon className="h-3.5 w-3.5" style={{ color }} />
                </div>
              </div>
              <p className="text-3xl font-black text-[#001148]">{value}</p>
              <p className="mt-1 text-xs text-[#001148]/40 font-medium">{sub}</p>
            </div>
          ))}
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* ── Main Table Card ────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,255,0.90) 100%)',
            border: '1px solid rgba(255,255,255,0.60)',
            boxShadow: '0 8px 40px rgba(0,17,72,0.08), 0 1px 0 rgba(255,255,255,0.80) inset',
          }}
        >
          {/* Tabs + search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 pt-5 pb-4 border-b border-slate-100">
            <div className="flex gap-1 p-1 rounded-xl bg-slate-100">
              {(['waitlist', 'bookings'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-bold transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-white text-[#001148] shadow-sm'
                      : 'text-slate-400 hover:text-[#001148]'
                  }`}
                >
                  {tab === 'waitlist' ? <Users className="h-3.5 w-3.5" /> : <CalendarCheck2 className="h-3.5 w-3.5" />}
                  {tab === 'waitlist' ? 'Waitlist' : 'Bookings'}
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-black ${activeTab === tab ? 'bg-[#1B9AAA]/10 text-[#1B9AAA]' : 'bg-slate-200 text-slate-400'}`}>
                    {tab === 'waitlist' ? waitlist.length : bookings.length}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 w-full sm:w-64 focus-within:border-[#1B9AAA] transition-colors">
              <Search className="h-3.5 w-3.5 text-slate-300 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leads..."
                className="flex-1 bg-transparent text-sm text-[#001148] placeholder:text-slate-300 outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-slate-300 hover:text-slate-500">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* ── Waitlist Table ─────────────────────────────────────────────── */}
          {activeTab === 'waitlist' && (
            loading ? (
              <LoadingRows cols={7} />
            ) : filteredWaitlist.length === 0 ? (
              <EmptyState label={search ? 'No results found.' : 'No waitlist requests yet.'} />
            ) : (
              <div className="overflow-auto">
                <table className="w-full min-w-[860px] text-sm">
                  <thead>
                    <tr className="bg-slate-50/80">
                      {['Name', 'Email', 'Company', 'Size', 'Role', 'Status', 'Created'].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-[#001148]/40">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredWaitlist.map((lead) => (
                      <tr key={lead.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1B9AAA]/10 text-[10px] font-black text-[#1B9AAA]">
                              {lead.full_name?.[0]?.toUpperCase() ?? '?'}
                            </div>
                            <span className="font-semibold text-[#001148] whitespace-nowrap">{lead.full_name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-slate-500">
                          <div className="flex items-center">
                            <span className="font-mono text-xs">{lead.work_email}</span>
                            <CopyButton text={lead.work_email} />
                          </div>
                        </td>
                        <td className="px-5 py-3.5 font-medium text-[#001148]">{lead.company_name}</td>
                        <td className="px-5 py-3.5 text-slate-400 text-xs">{lead.company_size}</td>
                        <td className="px-5 py-3.5 text-slate-400 text-xs capitalize">{lead.role}</td>
                        <td className="px-5 py-3.5"><StatusBadge status={lead.status} /></td>
                        <td className="px-5 py-3.5 text-slate-400 text-xs whitespace-nowrap">{formatShortDate(lead.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* ── Bookings Table ─────────────────────────────────────────────── */}
          {activeTab === 'bookings' && (
            loading ? (
              <LoadingRows cols={8} />
            ) : filteredBookings.length === 0 ? (
              <EmptyState label={search ? 'No results found.' : 'No demo requests yet.'} />
            ) : (
              <div className="overflow-auto">
                <table className="w-full min-w-[980px] text-sm">
                  <thead>
                    <tr className="bg-slate-50/80">
                      {['Name', 'Email', 'Company', 'Team Size', 'Date', 'Time', 'Status', 'Created'].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-[#001148]/40">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5E7D7E]/10 text-[10px] font-black text-[#5E7D7E]">
                              {b.first_name?.[0]?.toUpperCase() ?? '?'}
                            </div>
                            <span className="font-semibold text-[#001148] whitespace-nowrap">{b.first_name} {b.last_name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-slate-500">
                          <div className="flex items-center">
                            <span className="font-mono text-xs">{b.work_email}</span>
                            <CopyButton text={b.work_email} />
                          </div>
                        </td>
                        <td className="px-5 py-3.5 font-medium text-[#001148]">{b.company_name}</td>
                        <td className="px-5 py-3.5 text-slate-400 text-xs">{b.team_size}</td>
                        <td className="px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap">{b.requested_date}</td>
                        <td className="px-5 py-3.5 text-slate-400 text-xs whitespace-nowrap">{b.requested_time}</td>
                        <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                        <td className="px-5 py-3.5 text-slate-400 text-xs whitespace-nowrap">{formatShortDate(b.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {/* Footer row count */}
          {!loading && (
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/40">
              <p className="text-xs text-slate-400 font-medium">
                Showing {activeTab === 'waitlist' ? filteredWaitlist.length : filteredBookings.length} record{(activeTab === 'waitlist' ? filteredWaitlist.length : filteredBookings.length) !== 1 ? 's' : ''}
                {search && ` matching "${search}"`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Send Link Modal */}
      {showSendModal && (
        <SendLinkModal recipients={allRecipients} onClose={() => setShowSendModal(false)} />
      )}
    </div>
  )
}

// ─── Small helpers ─────────────────────────────────────────────────────────────

function LoadingRows({ cols }: { cols: number }) {
  return (
    <div className="p-5 space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex gap-3">
          {[...Array(cols)].map((_, j) => (
            <div key={j} className="h-4 rounded-md bg-slate-100 animate-pulse" style={{ flex: j === 0 ? 1.5 : 1 }} />
          ))}
        </div>
      ))}
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-300">
      <Users className="h-8 w-8 mb-3" />
      <p className="text-sm font-semibold">{label}</p>
    </div>
  )
}
