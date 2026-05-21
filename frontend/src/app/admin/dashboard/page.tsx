'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { portfolioApi, contactApi } from '@/lib/api'

interface Stats {
  projects: number
  skills: number
  services: number
  messages: number
  unread: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0, skills: 0, services: 0, messages: 0, unread: 0
  })
  const [loading, setLoading] = useState(true)
  const [apiHealthy, setApiHealthy] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await portfolioApi.getAll()
        const msgs = await contactApi.listMessages().catch(() => [])
        setStats({
          projects: data.projects?.length || 0,
          skills: data.skills?.length || 0,
          services: data.services?.length || 0,
          messages: msgs.length || 0,
          unread: msgs.filter((m: any) => !m.read).length || 0,
        })
        setApiHealthy(true)
      } catch {
        setApiHealthy(false)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const cards = [
    { label: 'إجمالي المشاريع', value: stats.projects, color: 'text-gold-bright', href: '/admin/projects' },
    { label: 'المهارات', value: stats.skills, color: 'text-gold', href: '/admin/skills' },
    { label: 'الخدمات', value: stats.services, color: 'text-accent-warm', href: '/admin/services' },
    { label: 'رسائل جديدة', value: stats.unread, color: 'text-red-400', href: '/admin/contact-messages' },
  ]

  const quickLinks = [
    { href: '/admin/profile', label: 'تعديل الملف الشخصي', icon: '◈' },
    { href: '/admin/hero', label: 'تعديل القسم الرئيسي', icon: '◇' },
    { href: '/admin/projects', label: 'إدارة المشاريع', icon: '◉' },
    { href: '/admin/book', label: 'تعديل صفحة الكتاب', icon: '▣' },
    { href: '/admin/contact-messages', label: 'مراجعة الرسائل', icon: '✉' },
    { href: '/admin/settings', label: 'إعدادات الموقع', icon: '⚙' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <div className="section-tag mb-3">◆ لوحة التحكم</div>
        <h1 className="text-4xl md:text-5xl font-black headline-ar mb-2">
          مرحباً، <span className="gradient-text">إسلام</span>
        </h1>
        <p className="text-text-dim">إدارة محتوى المنظومة بالكامل من هنا</p>
      </div>

      {/* Health */}
      <div className={`glass-card p-4 mb-8 flex items-center gap-3 ${apiHealthy ? 'border-green-500/30' : 'border-red-500/30'}`}>
        <span className={`w-3 h-3 rounded-full ${apiHealthy ? 'bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.6)]' : 'bg-red-400'}`} />
        <span className="text-sm">
          {apiHealthy ? (
            <><span className="text-green-400">صحة النظام: ممتازة</span> · جميع الخدمات تعمل</>
          ) : (
            <><span className="text-red-400">النظام غير متصل</span> · تحقّق من الـ Backend</>
          )}
        </span>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map(c => (
          <Link
            key={c.label}
            href={c.href}
            className="glass-card p-6 hover:-translate-y-1 transition-transform duration-300"
          >
            <div className={`text-4xl font-black ${c.color} tabular-nums mb-2`}>
              {loading ? '—' : c.value}
            </div>
            <div className="text-text-dim text-sm">{c.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="font-mono text-gold text-sm mb-6">// روابط سريعة</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {quickLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 p-4 rounded-md border border-gold/15 hover:border-gold/40 hover:bg-gold/5 transition-all"
            >
              <span className="text-gold text-lg">{l.icon}</span>
              <span className="text-sm">{l.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
