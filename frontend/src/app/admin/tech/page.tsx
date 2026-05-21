'use client'
import GenericCrud from '@/components/admin/GenericCrud'
import { techApi } from '@/lib/api'
import type { TechStack } from '@/types'

export default function TechAdminPage() {
  return (
    <GenericCrud<TechStack>
      title="المنظومة التقنية"
      tag="المنظومة التقنية"
      api={techApi}
      fields={[
        { key: 'name', label: 'اسم التقنية' },
        { key: 'color', label: 'اللون (HEX)', default: '#c8a96a' },
        { key: 'sort_order', label: 'الترتيب', type: 'number', default: 0 },
      ]}
      renderItem={t => (
        <div className="flex items-center gap-3">
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/10"
            style={{ background: t.color, boxShadow: `0 0 12px ${t.color}55` }}
          />
          <span className="font-bold">{t.name}</span>
          <span className="text-text-faint text-xs font-mono tabular-nums ml-auto">{t.color}</span>
        </div>
      )}
    />
  )
}
