'use client'
import { useEffect, useState } from 'react'
import { profileApi, getImageUrl } from '@/lib/api'
import type { Profile } from '@/types'
import toast from 'react-hot-toast'

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState<Partial<Profile>>({})
  const [avatar, setAvatar] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    profileApi.get()
      .then(p => setProfile(p))
      .catch(() => toast.error('تعذّر التحميل'))
      .finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(profile).forEach(([k, v]) => {
        if (v != null && k !== 'id' && k !== 'avatar_url' && k !== 'cv_url') fd.append(k, String(v))
      })
      if (avatar) fd.append('avatar', avatar)
      const updated = await profileApi.update(fd)
      setProfile(updated)
      setAvatar(null)
      toast.success('تم الحفظ ✓')
    } catch { toast.error('فشل الحفظ') }
    finally { setSaving(false) }
  }

  if (loading) return <div className="text-center text-text-dim py-20">جاري التحميل...</div>

  const set = (k: keyof Profile, v: any) => setProfile({ ...profile, [k]: v })

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="section-tag mb-2">◆ الملف الشخصي</div>
        <h1 className="text-3xl md:text-4xl font-black headline-ar gradient-text">تعديل الملف الشخصي</h1>
      </div>

      <div className="glass-card p-6 md:p-8 space-y-5">
        {profile.avatar_url && !avatar && (
          <div className="flex items-center gap-4">
            <img src={getImageUrl(profile.avatar_url)} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-gold/40" />
            <span className="text-text-dim text-sm">الصورة الحالية</span>
          </div>
        )}

        <Field label="الصورة الشخصية (تحميل جديد)">
          <input type="file" accept="image/*" onChange={e => setAvatar(e.target.files?.[0] || null)} className="text-sm text-text-dim" />
        </Field>

        <Field label="الاسم">
          <input className="input-gold" value={profile.name || ''} onChange={e => set('name', e.target.value)} />
        </Field>

        <Field label="المسمى الوظيفي">
          <input className="input-gold" value={profile.title || ''} onChange={e => set('title', e.target.value)} />
        </Field>

        <Field label="نبذة">
          <textarea rows={4} className="input-gold" value={profile.bio || ''} onChange={e => set('bio', e.target.value)} />
        </Field>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="الموقع">
            <input className="input-gold" value={profile.location || ''} onChange={e => set('location', e.target.value)} />
          </Field>
          <Field label="الخبرة">
            <input className="input-gold" value={profile.experience || ''} onChange={e => set('experience', e.target.value)} />
          </Field>
          <Field label="التخصص">
            <input className="input-gold" value={profile.focus || ''} onChange={e => set('focus', e.target.value)} />
          </Field>
          <Field label="البريد الإلكتروني">
            <input dir="ltr" className="input-gold" value={profile.email || ''} onChange={e => set('email', e.target.value)} />
          </Field>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-mono text-gold/70 mb-2">// {label}</label>
      {children}
    </div>
  )
}
