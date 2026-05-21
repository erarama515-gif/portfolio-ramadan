'use client'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { authApi } from '@/lib/api'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      toast.error('من فضلك أدخل بيانات الدخول')
      return
    }
    setLoading(true)
    try {
      const res = await authApi.login(username, password)
      if (res?.access_token) {
        Cookies.set('admin_token', res.access_token, { expires: 1, sameSite: 'lax' })
        toast.success('تم الدخول بنجاح')
        router.push('/admin/dashboard')
      } else {
        toast.error('تعذّر الدخول')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || 'بيانات الدخول غير صحيحة')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg relative overflow-hidden">
      {/* Decorative gold blur */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gold/10 blur-3xl rounded-full" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent-warm/10 blur-3xl rounded-full" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-gold text-4xl mb-3">◆</div>
          <h1 className="text-3xl font-black headline-ar gradient-text mb-2">لوحة التحكم</h1>
          <p className="text-text-dim text-sm font-mono">// admin · enjaz.system</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-8 space-y-5">
          <div>
            <label className="block text-xs font-mono text-gold/70 mb-2">// اسم المستخدم</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              dir="ltr"
              className="w-full bg-bg-deep border border-gold/20 rounded-md px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition text-text"
              autoComplete="username"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-gold/70 mb-2">// كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              dir="ltr"
              className="w-full bg-bg-deep border border-gold/20 rounded-md px-4 py-3 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition text-text"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري الدخول...' : 'دخول →'}
          </button>

          <div className="text-center text-xs text-text-faint font-mono pt-2 border-t border-gold/10">
            افتراضياً: admin / admin123 (غيّرها بعد أول دخول)
          </div>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-text-dim hover:text-gold text-sm transition-colors">
            ← العودة للموقع
          </a>
        </div>
      </div>
    </div>
  )
}
