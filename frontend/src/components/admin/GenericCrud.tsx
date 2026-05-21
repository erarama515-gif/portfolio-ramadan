'use client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export interface FieldDef {
  key: string
  label: string
  type?: 'text' | 'number' | 'textarea' | 'select' | 'url'
  placeholder?: string
  options?: { value: string; label: string }[]
  dir?: 'rtl' | 'ltr'
  default?: any
}

interface GenericCrudProps<T> {
  title: string
  tag: string
  api: {
    list: () => Promise<T[]>
    create: (data: any) => Promise<T>
    update: (id: number, data: any) => Promise<T>
    delete: (id: number) => Promise<any>
  }
  fields: FieldDef[]
  renderItem: (item: T) => React.ReactNode
}

export default function GenericCrud<T extends { id: number }>({
  title, tag, api, fields, renderItem,
}: GenericCrudProps<T>) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<any | null>(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.list()
      setItems(data)
    } catch { toast.error('تعذّر التحميل') }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const empty = () => {
    const o: any = {}
    fields.forEach(f => o[f.key] = f.default ?? (f.type === 'number' ? 0 : ''))
    return o
  }

  const save = async () => {
    if (!editing) return
    setSaving(true)
    try {
      const payload: any = { ...editing }
      fields.forEach(f => { if (f.type === 'number') payload[f.key] = parseInt(payload[f.key]) || 0 })
      if (editing.id) await api.update(editing.id, payload)
      else await api.create(payload)
      toast.success('تم الحفظ ✓')
      setEditing(null)
      load()
    } catch { toast.error('فشل الحفظ') }
    finally { setSaving(false) }
  }

  const del = async (id: number) => {
    if (!confirm('حذف هذا العنصر؟')) return
    try { await api.delete(id); toast.success('تم الحذف'); load() }
    catch { toast.error('فشل الحذف') }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="section-tag mb-2">◆ {tag}</div>
          <h1 className="text-3xl md:text-4xl font-black headline-ar">
            <span className="gradient-text">{title}</span>
          </h1>
        </div>
        <button onClick={() => setEditing(empty())} className="btn-gold">+ إضافة</button>
      </div>

      {loading ? (
        <div className="glass-card p-12 text-center text-text-dim">جاري التحميل...</div>
      ) : items.length === 0 ? (
        <div className="glass-card p-12 text-center text-text-dim">لا توجد عناصر بعد</div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="glass-card p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">{renderItem(item)}</div>
              <div className="flex flex-col gap-2 shrink-0">
                <button onClick={() => setEditing({ ...item })} className="text-gold/80 hover:text-gold text-xs px-3 py-1 border border-gold/20 rounded">
                  تعديل
                </button>
                <button onClick={() => del(item.id)} className="text-red-400/80 hover:text-red-400 text-xs px-3 py-1 border border-red-500/20 rounded">
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" dir="rtl">
            <h2 className="text-2xl font-bold gradient-text mb-6">
              {editing.id ? 'تعديل' : 'إضافة جديد'}
            </h2>
            <div className="space-y-4">
              {fields.map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-mono text-gold/70 mb-2">// {f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      dir={f.dir}
                      className="input-gold"
                      placeholder={f.placeholder}
                      value={editing[f.key] || ''}
                      onChange={e => setEditing({ ...editing, [f.key]: e.target.value })}
                    />
                  ) : f.type === 'select' ? (
                    <select
                      className="input-gold"
                      value={editing[f.key] || ''}
                      onChange={e => setEditing({ ...editing, [f.key]: e.target.value })}
                    >
                      {f.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  ) : (
                    <input
                      type={f.type === 'number' ? 'number' : f.type === 'url' ? 'url' : 'text'}
                      dir={f.dir}
                      className="input-gold"
                      placeholder={f.placeholder}
                      value={editing[f.key] ?? ''}
                      onChange={e => setEditing({ ...editing, [f.key]: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gold/15">
              <button onClick={() => setEditing(null)} className="btn-ghost-gold">إلغاء</button>
              <button onClick={save} disabled={saving} className="btn-gold disabled:opacity-50">
                {saving ? 'جاري الحفظ...' : 'حفظ ✓'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
