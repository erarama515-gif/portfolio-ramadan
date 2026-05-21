'use client'
import { useEffect, useState } from 'react'
import { heroApi } from '@/lib/api'
import type { Hero } from '@/types'
import toast from 'react-hot-toast'

export default function HeroAdminPage() {
  const [hero, setHero] = useState<Partial<Hero>>({ typing_words: [] })
  const [wordsInput, setWordsInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    heroApi.get()
      .then(h => {
        setHero(h)
        setWordsInput((h.typing_words || []).join(', '))
      })
      .catch(() => toast.error('تعذّر التحميل'))
      .finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const payload = {
        ...hero,
        typing_words: wordsInput.split(',').map(s => s.trim()).filter(Boolean),
      }
      const updated = await heroApi.update(payload)
      setHero(updated)
      toast.success('تم الحفظ ✓')
    } catch { toast.error('فشل الحفظ') }
    finally { setSaving(false) }
  }

  if (loading) return <div className="text-center text-text-dim py-20">جاري التحميل...</div>

  const set = (k: keyof Hero, v: any) => setHero({ ...hero, [k]: v })

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="section-tag mb-2">◆ القسم الرئيسي</div>
        <h1 className="text-3xl md:text-4xl font-black headline-ar gradient-text">تعديل Hero</h1>
      </div>

      <div className="glass-card p-6 md:p-8 space-y-5">
        <Field label="العنوان الكبير">
          <input className="input-gold" value={hero.headline || ''} onChange={e => set('headline', e.target.value)} />
        </Field>

        <Field label="العنوان الفرعي">
          <input className="input-gold" value={hero.subheadline || ''} onChange={e => set('subheadline', e.target.value)} />
        </Field>

        <Field label="كلمات الكتابة المتغيّرة (بفاصلة)">
          <input className="input-gold" value={wordsInput} onChange={e => setWordsInput(e.target.value)} placeholder="تعمل وحدها, تتحرر من البشر..." />
        </Field>

        <Field label="الوصف">
          <textarea rows={3} className="input-gold" value={hero.description || ''} onChange={e => set('description', e.target.value)} />
        </Field>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="نص الزر الأساسي">
            <input className="input-gold" value={hero.cta_primary_text || ''} onChange={e => set('cta_primary_text', e.target.value)} />
          </Field>
          <Field label="رابط الزر الأساسي">
            <input dir="ltr" className="input-gold" value={hero.cta_primary_link || ''} onChange={e => set('cta_primary_link', e.target.value)} />
          </Field>
          <Field label="نص الزر الثانوي">
            <input className="input-gold" value={hero.cta_secondary_text || ''} onChange={e => set('cta_secondary_text', e.target.value)} />
          </Field>
          <Field label="رابط الزر الثانوي">
            <input dir="ltr" className="input-gold" value={hero.cta_secondary_link || ''} onChange={e => set('cta_secondary_link', e.target.value)} />
          </Field>
        </div>

        <Field label="نص الحالة (شارة التوفّر)">
          <input className="input-gold" value={hero.status_text || ''} onChange={e => set('status_text', e.target.value)} />
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
  return (
    <div>
      <label className="block text-xs font-mono text-gold/70 mb-2">// {label}</label>
      {children}
    </div>
  )
}
