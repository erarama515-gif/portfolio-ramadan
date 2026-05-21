'use client'
import GenericCrud from '@/components/admin/GenericCrud'
import { skillsApi } from '@/lib/api'
import type { Skill } from '@/types'

export default function SkillsAdminPage() {
  return (
    <GenericCrud<Skill>
      title="المهارات"
      tag="المهارات"
      api={skillsApi}
      fields={[
        { key: 'name', label: 'اسم المهارة' },
        { key: 'percentage', label: 'النسبة (٠-١٠٠)', type: 'number', default: 80 },
        { key: 'category', label: 'الفئة', default: 'core' },
        { key: 'order_index', label: 'الترتيب', type: 'number', default: 0 },
      ]}
      renderItem={s => (
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-bold">{s.name}</span>
            <span className="text-gold text-sm tabular-nums">{s.percentage}%</span>
          </div>
          <div className="h-1.5 bg-bg-deep rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-bright" style={{ width: `${s.percentage}%` }} />
          </div>
        </div>
      )}
    />
  )
}
