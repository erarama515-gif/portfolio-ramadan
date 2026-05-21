'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { authApi } from '@/lib/api'

const navItems = [
  { href: '/admin/dashboard', label: 'لوحة التحكم', icon: '◆' },
  { href: '/admin/profile', label: 'الملف الشخصي', icon: '◈' },
  { href: '/admin/hero', label: 'القسم الرئيسي', icon: '◇' },
  { href: '/admin/projects', label: 'المشاريع', icon: '◉' },
  { href: '/admin/book', label: 'الكتاب', icon: '▣' },
  { href: '/admin/contact-messages', label: 'الرسائل', icon: '✉' },
  { href: '/admin/skills', label: 'المهارات', icon: '▲' },
  { href: '/admin/tech', label: 'المنظومة التقنية', icon: '⬢' },
  { href: '/admin/services', label: 'الخدمات', icon: '●' },
  { href: '/admin/timeline', label: 'الرحلة', icon: '─' },
  { href: '/admin/terminal', label: 'سجلات النظام', icon: '>_' },
  { href: '/admin/ticker', label: 'الشريط المتحرك', icon: '↔' },
  { href: '/admin/social', label: 'الروابط', icon: '@' },
  { href: '/admin/seo', label: 'SEO', icon: '#' },
  { href: '/admin/settings', label: 'الإعدادات', icon: '⚙' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false)
      return
    }
    const token = Cookies.get('admin_token')
    if (!token) {
      router.replace('/admin/login')
      return
    }
    authApi.me()
      .then(u => {
        setUser(u)
        setChecking(false)
      })
      .catch(() => {
        Cookies.remove('admin_token')
        router.replace('/admin/login')
      })
  }, [pathname, isLoginPage, router])

  const logout = () => {
    Cookies.remove('admin_token')
    router.push('/admin/login')
  }

  if (isLoginPage) return <>{children}</>

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-gold/60 text-sm">جاري التحقق...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 right-0 h-screen w-72 bg-bg-card border-l border-gold/15 z-40
        transition-transform duration-300 overflow-y-auto
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gold/15">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <span className="text-gold text-2xl group-hover:rotate-180 transition-transform duration-700">◆</span>
            <div>
              <div className="font-display font-extrabold gradient-text">ENJAZ · إنجاز</div>
              <div className="text-xs text-text-faint font-mono mt-0.5">// admin panel</div>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(item => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-all
                  ${active
                    ? 'bg-gold/15 text-gold border border-gold/30'
                    : 'text-text-dim hover:text-gold hover:bg-gold/5 border border-transparent'
                  }
                `}
              >
                <span className="font-mono w-6 text-center text-xs">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gold/15 mt-4">
          {user && (
            <div className="px-4 py-3 mb-3 bg-bg-deep rounded-md">
              <div className="text-xs text-text-faint font-mono mb-1">// مُسجَّل دخول</div>
              <div className="text-gold text-sm font-bold" dir="ltr">{user.username}</div>
            </div>
          )}
          <button
            onClick={logout}
            className="w-full px-4 py-2.5 rounded-md text-sm text-red-400/80 hover:bg-red-500/10 hover:text-red-400 border border-red-500/20 hover:border-red-500/40 transition-all flex items-center gap-3"
          >
            <span className="font-mono">↩</span>
            <span>تسجيل الخروج</span>
          </button>
          <Link
            href="/"
            className="w-full mt-2 px-4 py-2.5 rounded-md text-sm text-text-dim hover:bg-gold/5 hover:text-gold border border-gold/15 transition-all flex items-center gap-3"
          >
            <span className="font-mono">↗</span>
            <span>عرض الموقع</span>
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-20 bg-bg-card/95 backdrop-blur-xl border-b border-gold/15 px-6 py-4 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="text-gold">◆</span>
            <span className="font-display font-bold gradient-text text-sm">ENJAZ Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gold text-xl w-10 h-10 flex items-center justify-center rounded-md border border-gold/20"
          >
            ☰
          </button>
        </header>

        <main className="p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
