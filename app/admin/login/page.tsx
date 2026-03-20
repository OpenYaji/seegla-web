'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useMemo, useState } from 'react'
import { ArrowLeft, Lock } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    const res = await fetch('/api/admin/waitlist?limit=1', { cache: 'no-store' })

    if (!res.ok) {
      await supabase.auth.signOut()
      setError('This account is not allowed to access admin CRM.')
      setLoading(false)
      return
    }

    router.replace('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#001148] transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mt-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1B9AAA]">Admin</p>
          <h1 className="mt-1 text-2xl font-black text-[#001148]">CRM Login</h1>
          <p className="mt-2 text-sm text-slate-400">Use your admin account to view waitlist and demo requests.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold text-[#001148]">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
              className="h-10 rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-semibold text-[#001148]">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="h-10 rounded-xl"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full h-10 rounded-xl bg-[#001148] hover:bg-[#001148]/90 text-white font-bold">
            {loading ? 'Signing in...' : 'Sign in to CRM'}
          </Button>

          {error && <p className="text-xs text-center text-[#F47560]">{error}</p>}
        </form>

        <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-500 flex items-start gap-2">
          <Lock className="h-3.5 w-3.5 mt-0.5 text-slate-400" />
          <p>Access is restricted to users listed in the <code>admin_users</code> table.</p>
        </div>
      </div>
    </div>
  )
}
