'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { LogOut, RefreshCw, Users, CalendarCheck2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

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

function formatDate(value: string) {
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [waitlist, setWaitlist] = useState<WaitlistLead[]>([])
  const [bookings, setBookings] = useState<DemoBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true)
    else setLoading(true)
    setError(null)

    try {
      const [waitlistRes, bookingRes] = await Promise.all([
        fetch('/api/admin/waitlist', { cache: 'no-store' }),
        fetch('/api/admin/book', { cache: 'no-store' }),
      ])

      if (waitlistRes.status === 401 || waitlistRes.status === 403 || bookingRes.status === 401 || bookingRes.status === 403) {
        router.replace('/admin/login')
        return
      }

      if (!waitlistRes.ok || !bookingRes.ok) {
        setError('Failed to load CRM data.')
        return
      }

      const waitlistJson = (await waitlistRes.json()) as { items: WaitlistLead[] }
      const bookingJson = (await bookingRes.json()) as { items: DemoBooking[] }

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

  useEffect(() => {
    loadData(false)
  }, [loadData])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1B9AAA]">Admin CRM</p>
            <h1 className="mt-1 text-2xl font-black text-[#001148]">Leads Dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">View incoming waitlist and demo booking requests.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => loadData(true)}
              disabled={loading || refreshing}
              variant="outline"
              className="rounded-xl"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={handleSignOut} variant="outline" className="rounded-xl">
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
            <Link href="/">
              <Button variant="outline" className="rounded-xl">Home</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">Waitlist Requests</p>
              <Users className="h-4 w-4 text-[#1B9AAA]" />
            </div>
            <p className="mt-2 text-3xl font-black text-[#001148]">{waitlist.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">Demo Requests</p>
              <CalendarCheck2 className="h-4 w-4 text-[#1B9AAA]" />
            </div>
            <p className="mt-2 text-3xl font-black text-[#001148]">{bookings.length}</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-[#F47560]/30 bg-[#F47560]/10 px-4 py-3 text-sm text-[#9f2f1e]">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-[#001148]">Waitlist Leads</h2>
            </div>

            {loading ? (
              <p className="p-5 text-sm text-slate-400">Loading waitlist leads...</p>
            ) : waitlist.length === 0 ? (
              <p className="p-5 text-sm text-slate-400">No waitlist requests yet.</p>
            ) : (
              <div className="overflow-auto">
                <table className="w-full min-w-[860px] text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Name</th>
                      <th className="text-left px-4 py-3 font-semibold">Email</th>
                      <th className="text-left px-4 py-3 font-semibold">Company</th>
                      <th className="text-left px-4 py-3 font-semibold">Size</th>
                      <th className="text-left px-4 py-3 font-semibold">Role</th>
                      <th className="text-left px-4 py-3 font-semibold">Status</th>
                      <th className="text-left px-4 py-3 font-semibold">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.map((lead) => (
                      <tr key={lead.id} className="border-t border-slate-100">
                        <td className="px-4 py-3 font-medium text-[#001148]">{lead.full_name}</td>
                        <td className="px-4 py-3 text-slate-600">{lead.work_email}</td>
                        <td className="px-4 py-3 text-slate-600">{lead.company_name}</td>
                        <td className="px-4 py-3 text-slate-600">{lead.company_size}</td>
                        <td className="px-4 py-3 text-slate-600">{lead.role}</td>
                        <td className="px-4 py-3 text-slate-600">{lead.status}</td>
                        <td className="px-4 py-3 text-slate-600">{formatDate(lead.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-[#001148]">Demo Bookings</h2>
            </div>

            {loading ? (
              <p className="p-5 text-sm text-slate-400">Loading demo requests...</p>
            ) : bookings.length === 0 ? (
              <p className="p-5 text-sm text-slate-400">No demo requests yet.</p>
            ) : (
              <div className="overflow-auto">
                <table className="w-full min-w-[980px] text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Name</th>
                      <th className="text-left px-4 py-3 font-semibold">Email</th>
                      <th className="text-left px-4 py-3 font-semibold">Company</th>
                      <th className="text-left px-4 py-3 font-semibold">Team Size</th>
                      <th className="text-left px-4 py-3 font-semibold">Requested Date</th>
                      <th className="text-left px-4 py-3 font-semibold">Time</th>
                      <th className="text-left px-4 py-3 font-semibold">Status</th>
                      <th className="text-left px-4 py-3 font-semibold">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-t border-slate-100">
                        <td className="px-4 py-3 font-medium text-[#001148]">{booking.first_name} {booking.last_name}</td>
                        <td className="px-4 py-3 text-slate-600">{booking.work_email}</td>
                        <td className="px-4 py-3 text-slate-600">{booking.company_name}</td>
                        <td className="px-4 py-3 text-slate-600">{booking.team_size}</td>
                        <td className="px-4 py-3 text-slate-600">{booking.requested_date}</td>
                        <td className="px-4 py-3 text-slate-600">{booking.requested_time}</td>
                        <td className="px-4 py-3 text-slate-600">{booking.status}</td>
                        <td className="px-4 py-3 text-slate-600">{formatDate(booking.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
