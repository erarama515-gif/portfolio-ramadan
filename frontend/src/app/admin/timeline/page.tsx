'use client'
import GenericCrud from '@/components/admin/GenericCrud'
import { timelineApi } from '@/lib/api'
import type { TimelineItem } from '@/types'

export default function TimelineAdminPage() {
  return (
    <GenericCrud<TimelineItem>
      title="الرحلة"
      tag="الجدول الزمني"
      api={timelineApi}
      fields={[
        { key: 'year', label: 'السنة' },
        { key: 'title', label: 'العنوان' },
        { key: 'company', label: 'الشركة / السياق' },
        { key: 'description', label: 'الوصف', type: 'textarea' },
        { key: 'order_index', label: 'الترتيب', type: 'number', default: 0 },
      ]}
      renderItem={t => (
        <div>
          <div className="text-gold text-xs font-mono mb-1">{t.year}</div>
          <div className="font-bold">{t.title}</div>
          <div className="text-gold/60 text-sm">{t.company}</div>
          <p className="text-text-dim text-sm mt-1 line-clamp-2">{t.description}</p>
        </div>
      )}
    />
  )
}
