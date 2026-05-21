'use client'
import { useEffect, useState } from 'react'
import { projectsApi } from '@/lib/api'
import type { Project } from '@/types'
import toast from 'react-hot-toast'

interface EditingProject {
  id?: number
  title: string
  description: string
  full_description: string
  tags: string
  live_url: string
  repo_url: string
  status: 'live' | 'draft' | 'archived'
  featured: boolean
  order_index: number
  metrics_json: string
}

const EMPTY: EditingProject = {
  title: '',
  description: '',
  full_description: '',
  tags: '',
  live_url: '',
  repo_url: '',
  status: 'draft',
  featured: false,
  order_index: 0,
  metrics_json: '{"عميل":"+0","نمو":"0%","ROI":"0x"}',
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editing, setEditing] = useState<EditingProject | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const list = await projectsApi.list()
      setProjects(list)
    } catch { toast.error('تعذّر التحميل') }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const openEdit = (p: Project) => {
    setEditing({
      id: p.id,
      title: p.title,
      description: p.description,
      full_description: p.full_description || '',
      tags: p.tags || '',
      live_url: p.live_url || '',
      repo_url: p.repo_url || '',
      status: p.status as any,
      featured: !!p.featured,
      order_index: p.order_index || 0,
      metrics_json: JSON.stringify(p.metrics || {}, null, 2),
    })
    setImage(null)
  }

  const save = async () => {
    if (!editing) return
    setSaving(true)
    try {
      let metrics: any = {}
      try { metrics = JSON.parse(editing.metrics_json) } catch {}
      const fd = new FormData()
      fd.append('title', editing.title)
      fd.append('description', editing.description)
      fd.append('full_description', editing.full_description)
      fd.append('tags', editing.tags)
      fd.append('live_url', editing.live_url)
      fd.append('repo_url', editing.repo_url)
      fd.append('status', editing.status)
      fd.append('featured', String(editing.featured))
      fd.append('order_index', String(editing.order_index))
      fd.append('metrics', JSON.stringify(metrics))
      if (image) fd.append('image', image)

      if (editing.id) await projectsApi.update(editing.id, fd)
      else await projectsApi.create(fd)

      toast.success('تم الحفظ ✓')
      setEditing(null)
      setImage(null)
      load()
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || 'فشل الحفظ')
    } finally { setSaving(false) }
  }

  const del = async (id: number) => {
    if (!confirm('حذف هذا المشروع؟')) return
    try {
      await projectsApi.delete(id)
      toast.success('تم الحذف')
      load()
    } catch { toast.error('فشل الحذف') }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="section-tag mb-2">◆ إدارة المشاريع</div>
          <h1 className="text-3xl md:text-4xl font-black headline-ar">
            <span className="gradient-text">الأعمال</span>
          </h1>
        </div>
        <button onClick={() => { setEditing({...EMPTY}); setImage(null) }} className="btn-gold">
          + إضافة مشروع
        </button>
      </div>

      {loading ? (
        <div className="glass-card p-12 text-center text-text-dim">جاري التحميل...</div>
      ) : projects.length === 0 ? (
        <div className="glass-card p-12 text-center text-text-dim">لا توجد مشاريع بعد</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map(p => (
            <div key={p.id} className="glass-card p-5 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold truncate">{p.title}</h3>
                  {p.featured && <span className="text-gold text-xs">★</span>}
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    p.status === 'live' ? 'bg-green-500/15 text-green-400' :
                    p.status === 'draft' ? 'bg-yellow-500/15 text-yellow-400' :
                    'bg-text-faint/15 text-text-faint'
                  }`}>
                    {p.status === 'live' ? 'منشور' : p.status === 'draft' ? 'مسودة' : 'مؤرشف'}
                  </span>
                </div>
                <p className="text-text-dim text-sm line-clamp-2">{p.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => openEdit(p)} className="text-gold/80 hover:text-gold text-xs px-2 py-1 border border-gold/20 rounded">
                  تعديل
                </button>
                <button onClick={() => del(p.id)} className="text-red-400/80 hover:text-red-400 text-xs px-2 py-1 border border-red-500/20 rounded">
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto" dir="rtl">
            <h2 className="text-2xl font-bold gradient-text mb-6">
              {editing.id ? 'تعديل المشروع' : 'مشروع جديد'}
            </h2>
            <div className="space-y-4">
              <Field label="اسم المشروع">
                <input className="input-gold" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} />
              </Field>
              <Field label="الوصف المختصر">
                <textarea rows={2} className="input-gold" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} />
              </Field>
              <Field label="الوصف الكامل">
                <textarea rows={4} className="input-gold" value={editing.full_description} onChange={e => setEditing({...editing, full_description: e.target.value})} />
              </Field>
              <Field label="الوسوم (بفاصلة)">
                <input dir="ltr" className="input-gold font-mono text-sm" value={editing.tags} onChange={e => setEditing({...editing, tags: e.target.value})} />
              </Field>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="رابط مباشر">
                  <input dir="ltr" className="input-gold" value={editing.live_url} onChange={e => setEditing({...editing, live_url: e.target.value})} />
                </Field>
                <Field label="رابط المستودع">
                  <input dir="ltr" className="input-gold" value={editing.repo_url} onChange={e => setEditing({...editing, repo_url: e.target.value})} />
                </Field>
              </div>
              <Field label="المقاييس (JSON)">
                <textarea rows={4} dir="ltr" className="input-gold font-mono text-xs" value={editing.metrics_json} onChange={e => setEditing({...editing, metrics_json: e.target.value})} />
              </Field>
              <Field label="الصورة">
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="text-sm text-text-dim" />
              </Field>
              <div className="grid md:grid-cols-3 gap-4">
                <Field label="الحالة">
                  <select className="input-gold" value={editing.status} onChange={e => setEditing({...editing, status: e.target.value as any})}>
                    <option value="draft">مسودة</option>
                    <option value="live">منشور</option>
                    <option value="archived">مؤرشف</option>
                  </select>
                </Field>
                <Field label="ترتيب">
                  <input type="number" className="input-gold" value={editing.order_index} onChange={e => setEditing({...editing, order_index: parseInt(e.target.value) || 0})} />
                </Field>
                <label className="flex items-end gap-2 pb-3 cursor-pointer">
                  <input type="checkbox" checked={editing.featured} onChange={e => setEditing({...editing, featured: e.target.checked})} className="accent-gold w-4 h-4" />
                  <span className="text-sm">مميّز ★</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gold/15">
              <button onClick={() => { setEditing(null); setImage(null) }} className="btn-ghost-gold">
                إلغاء
              </button>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-mono text-gold/70 mb-2">// {label}</label>
      {children}
    </div>
  )
}
