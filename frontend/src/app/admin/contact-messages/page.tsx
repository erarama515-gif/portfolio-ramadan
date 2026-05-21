'use client'
import { useEffect, useState } from 'react'
import { contactApi } from '@/lib/api'
import type { ContactMessage } from '@/types'
import toast from 'react-hot-toast'

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const list = await contactApi.listMessages()
      setMessages(list.sort((a: any, b: any) => +new Date(b.created_at) - +new Date(a.created_at)))
    } catch { toast.error('تعذّر التحميل') }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const markRead = async (id: number) => {
    try {
      await contactApi.markRead(id)
      load()
    } catch { toast.error('فشل') }
  }

  if (loading) return <div className="text-center text-text-dim py-20">جاري التحميل...</div>

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="section-tag mb-2">◆ الرسائل</div>
          <h1 className="text-3xl md:text-4xl font-black headline-ar">
            <span className="gradient-text">صندوق الوارد</span>
          </h1>
          <p className="text-text-dim text-sm mt-2">
            {messages.filter(m => !m.read).length} رسالة غير مقروءة من {messages.length}
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="glass-card p-12 text-center text-text-dim">لا توجد رسائل بعد</div>
      ) : (
        <div className="space-y-3">
          {messages.map(m => (
            <div
              key={m.id}
              onClick={() => { setSelected(m); if (!m.read) markRead(m.id) }}
              className={`glass-card p-5 cursor-pointer transition-all hover:border-gold/40 ${!m.read ? 'border-gold/40 bg-gold/5' : ''}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                <div className="flex items-center gap-2">
                  {!m.read && <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />}
                  <span className="font-bold">{m.name}</span>
                  <span className="text-text-faint text-xs" dir="ltr">‹{m.email}›</span>
                </div>
                <span className="text-text-faint text-xs font-mono" dir="ltr">
                  {new Date(m.created_at).toLocaleString('ar-EG')}
                </span>
              </div>
              {m.subject && <div className="text-gold text-sm mb-1">{m.subject}</div>}
              <p className="text-text-dim text-sm line-clamp-2">{m.message}</p>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="glass-card p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
              <div>
                <div className="text-xs text-gold/70 font-mono mb-1">// من</div>
                <div className="font-bold text-lg">{selected.name}</div>
                <a href={`mailto:${selected.email}`} className="text-gold text-sm hover:underline" dir="ltr">{selected.email}</a>
              </div>
              <button onClick={() => setSelected(null)} className="text-text-dim hover:text-gold text-2xl">✕</button>
            </div>
            <div className="text-xs text-text-faint font-mono mb-4" dir="ltr">
              {new Date(selected.created_at).toLocaleString('ar-EG')}
            </div>
            {selected.subject && (
              <div className="mb-4 pb-4 border-b border-gold/15">
                <div className="text-xs text-gold/70 font-mono mb-1">// الموضوع</div>
                <div className="text-lg">{selected.subject}</div>
              </div>
            )}
            <div className="text-text leading-loose whitespace-pre-wrap">{selected.message}</div>
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gold/15">
              <a href={`mailto:${selected.email}?subject=${encodeURIComponent('Re: ' + (selected.subject || ''))}`} className="btn-gold">
                الرد عبر البريد ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
