'use client'
import { useEffect, useState } from 'react'
import { seoApi } from '@/lib/api'
import type { SEO } from '@/types'
import toast from 'react-hot-toast'

export default function SEOAdminPage() {
  const [seo, setSeo] = useState<Partial<SEO>>({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    seoApi.get().then(setSeo).catch(() => toast.error('تعذّر التحميل')).finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    try { const updated = await seoApi.update(seo); setSeo(updated); toast.success('تم الحفظ ✓') }
    catch { toast.error('فشل الحفظ') } finally { setSaving(false) }
  }

  if (loading) return <div className="text-center text-text-dim py-20">جاري التحميل...</div>

  const set = (k: keyof SEO, v: any) => setSeo({ ...seo, [k]: v })

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="section-tag mb-2">◆ SEO</div>
        <h1 className="text-3xl md:text-4xl font-black headline-ar gradient-text">إعدادات الـ SEO</h1>
      </div>

      <div className="glass-card p-6 md:p-8 space-y-5">
        <Field label="عنوان الموقع (Title)">
          <input className="input-gold" value={seo.site_title || ''} onChange={e => set('site_title', e.target.value)} />
        </Field>
        <Field label="وصف الموقع (Meta Description)">
          <textarea rows={3} className="input-gold" value={seo.site_description || ''} onChange={e => set('site_description', e.target.value)} />
        </Field>
        <Field label="الكلمات المفتاحية (بفاصلة)">
          <input className="input-gold" value={seo.keywords || ''} onChange={e => set('keywords', e.target.value)} />
        </Field>
        <Field label="صورة OG (URL)">
          <input dir="ltr" className="input-gold" value={seo.og_image || ''} onChange={e => set('og_image', e.target.value)} />
        </Field>
        <Field label="الـ Favicon (URL)">
          <input dir="ltr" className="input-gold" value={seo.favicon || ''} onChange={e => set('favicon', e.target.value)} />
        </Field>

        <div className="flex justify-end pt-4 border-t border-gold/15">
          <button onClick={save} disabled={saving} className="btn-gold disabled:opacity-50">
            {saving ? 'جاري الحفظ...' : 'حفظ ✓'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-mono text-gold/70 mb-2">// {label}</label>{children}</div>
}
