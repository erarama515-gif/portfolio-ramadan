'use client'
import { useEffect, useState } from 'react'
import { bookApi, getImageUrl } from '@/lib/api'
import type { Book } from '@/types'
import toast from 'react-hot-toast'

export default function BookAdminPage() {
  const [book, setBook] = useState<Partial<Book>>({ chapters: [], quotes: [] })
  const [cover, setCover] = useState<File | null>(null)
  const [chaptersJson, setChaptersJson] = useState('[]')
  const [quotesJson, setQuotesJson] = useState('[]')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bookApi.get()
      .then(b => {
        setBook(b)
        setChaptersJson(JSON.stringify(b.chapters || [], null, 2))
        setQuotesJson(JSON.stringify(b.quotes || [], null, 2))
      })
      .catch(() => toast.error('تعذّر التحميل'))
      .finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      let chapters: any = []
      let quotes: any = []
      try { chapters = JSON.parse(chaptersJson) } catch { toast.error('JSON الفصول غير صحيح'); setSaving(false); return }
      try { quotes = JSON.parse(quotesJson) } catch { toast.error('JSON الاقتباسات غير صحيح'); setSaving(false); return }

      const fd = new FormData()
      Object.entries(book).forEach(([k, v]) => {
        if (v != null && k !== 'id' && k !== 'cover_url' && k !== 'chapters' && k !== 'quotes') {
          fd.append(k, String(v))
        }
      })
      fd.append('chapters', JSON.stringify(chapters))
      fd.append('quotes', JSON.stringify(quotes))
      if (cover) fd.append('cover', cover)

      const updated = await bookApi.update(fd)
      setBook(updated)
      setCover(null)
      toast.success('تم الحفظ ✓')
    } catch { toast.error('فشل الحفظ') }
    finally { setSaving(false) }
  }

  if (loading) return <div className="text-center text-text-dim py-20">جاري التحميل...</div>

  const set = (k: keyof Book, v: any) => setBook({ ...book, [k]: v })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="section-tag mb-2">◆ الكتاب</div>
        <h1 className="text-3xl md:text-4xl font-black headline-ar gradient-text">تعديل صفحة الكتاب</h1>
      </div>

      <div className="glass-card p-6 md:p-8 space-y-5">
        {book.cover_url && !cover && (
          <div className="flex items-center gap-4">
            <img src={getImageUrl(book.cover_url)} alt="" className="w-24 h-36 object-cover border-2 border-gold/40 rounded" />
            <span className="text-text-dim text-sm">الغلاف الحالي</span>
          </div>
        )}

        <Field label="غلاف الكتاب">
          <input type="file" accept="image/*" onChange={e => setCover(e.target.files?.[0] || null)} className="text-sm text-text-dim" />
        </Field>

        <Field label="عنوان الكتاب">
          <input className="input-gold" value={book.title || ''} onChange={e => set('title', e.target.value)} />
        </Field>

        <Field label="العنوان الفرعي">
          <input className="input-gold" value={book.subtitle || ''} onChange={e => set('subtitle', e.target.value)} />
        </Field>

        <Field label="التاج لاين (جملة مثيرة)">
          <input className="input-gold" value={book.tagline || ''} onChange={e => set('tagline', e.target.value)} />
        </Field>

        <Field label="الوصف">
          <textarea rows={5} className="input-gold" value={book.description || ''} onChange={e => set('description', e.target.value)} />
        </Field>

        <div className="grid md:grid-cols-3 gap-4">
          <Field label="الحالة">
            <select className="input-gold" value={book.status || 'coming_soon'} onChange={e => set('status', e.target.value)}>
              <option value="coming_soon">قريباً</option>
              <option value="preorder">حجز مسبق</option>
              <option value="published">صدر</option>
            </select>
          </Field>
          <Field label="تاريخ الإصدار">
            <input className="input-gold" value={book.release_date || ''} onChange={e => set('release_date', e.target.value)} placeholder="2026" />
          </Field>
          <Field label="رابط الحجز/الشراء">
            <input dir="ltr" className="input-gold" value={book.preorder_url || ''} onChange={e => set('preorder_url', e.target.value)} />
          </Field>
        </div>

        <Field label='الفصول (JSON: [{"number":1,"title":"..."}])'>
          <textarea rows={8} dir="ltr" className="input-gold font-mono text-xs" value={chaptersJson} onChange={e => setChaptersJson(e.target.value)} />
        </Field>

        <Field label='الاقتباسات (JSON: [{"text":"...","chapter":"..."}])'>
          <textarea rows={8} dir="ltr" className="input-gold font-mono text-xs" value={quotesJson} onChange={e => setQuotesJson(e.target.value)} />
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
