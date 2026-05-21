'use client'
import { useEffect, useState } from 'react'
import { settingsApi } from '@/lib/api'
import type { SiteSettings } from '@/types'
import toast from 'react-hot-toast'

export default function SettingsAdminPage() {
  const [s, setS] = useState<Partial<SiteSettings>>({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    settingsApi.get().then(setS).catch(() => toast.error('تعذّر التحميل')).finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    try { const updated = await settingsApi.update(s); setS(updated); toast.success('تم الحفظ ✓') }
    catch { toast.error('فشل الحفظ') } finally { setSaving(false) }
  }

  if (loading) return <div className="text-center text-text-dim py-20">جاري التحميل...</div>

  const set = (k: keyof SiteSettings, v: any) => setS({ ...s, [k]: v })
  const Toggle = ({ k, label, hint }: { k: keyof SiteSettings; label: string; hint: string }) => (
    <label className="flex items-center justify-between gap-4 p-4 rounded-md border border-gold/15 hover:border-gold/30 transition cursor-pointer">
      <div>
        <div className="font-bold">{label}</div>
        <div className="text-text-faint text-xs mt-0.5">{hint}</div>
      </div>
      <input
        type="checkbox"
        checked={!!s[k]}
        onChange={e => set(k, e.target.checked)}
        className="w-5 h-5 accent-gold"
      />
    </label>
  )

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="section-tag mb-2">◆ الإعدادات</div>
        <h1 className="text-3xl md:text-4xl font-black headline-ar gradient-text">إعدادات الموقع</h1>
      </div>

      <div className="glass-card p-6 md:p-8 space-y-3">
        <Toggle k="show_book" label="عرض قسم الكتاب" hint="إظهار/إخفاء قسم الكتاب" />
        <Toggle k="show_terminal" label="عرض الترمنال" hint="سجلات النظام المتحركة" />
        <Toggle k="show_architecture" label="عرض البنية" hint="مخطط طبقات النظام" />
        <Toggle k="show_ticker" label="عرض الشريط المتحرك" hint="الشريط الأفقي للأخبار" />

        <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gold/15">
          <div>
            <label className="block text-xs font-mono text-gold/70 mb-2">// اللون الأساسي</label>
            <input type="color" value={s.primary_color || '#d4af37'} onChange={e => set('primary_color', e.target.value)} className="w-full h-10 rounded border border-gold/20 bg-bg-deep" />
          </div>
          <div>
            <label className="block text-xs font-mono text-gold/70 mb-2">// لون التمييز</label>
            <input type="color" value={s.accent_color || '#c8a96a'} onChange={e => set('accent_color', e.target.value)} className="w-full h-10 rounded border border-gold/20 bg-bg-deep" />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gold/15">
          <button onClick={save} disabled={saving} className="btn-gold disabled:opacity-50">
            {saving ? 'جاري الحفظ...' : 'حفظ ✓'}
          </button>
        </div>
      </div>
    </div>
  )
}
