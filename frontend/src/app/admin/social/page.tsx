'use client'
import GenericCrud from '@/components/admin/GenericCrud'
import { socialApi } from '@/lib/api'
import type { SocialLink } from '@/types'

export default function SocialAdminPage() {
  return (
    <GenericCrud<SocialLink>
      title="الروابط الاجتماعية"
      tag="Social"
      api={socialApi}
      fields={[
        { key: 'platform', label: 'المنصة', placeholder: 'LinkedIn / X / Email...', dir: 'ltr' },
        { key: 'url', label: 'الرابط', type: 'url', dir: 'ltr' },
        { key: 'icon', label: 'الأيقونة (رمز)', default: '◈' },
        { key: 'order_index', label: 'الترتيب', type: 'number', default: 0 },
      ]}
      renderItem={s => (
        <div className="flex items-center gap-3">
          <span className="text-2xl text-gold">{s.icon}</span>
          <div>
            <div className="font-bold">{s.platform}</div>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-text-dim text-xs hover:text-gold" dir="ltr">{s.url}</a>
          </div>
        </div>
      )}
    />
  )
}
