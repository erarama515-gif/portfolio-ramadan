'use client'
import GenericCrud from '@/components/admin/GenericCrud'
import { servicesApi } from '@/lib/api'
import type { Service } from '@/types'

export default function ServicesAdminPage() {
  return (
    <GenericCrud<Service>
      title="الخدمات"
      tag="الخدمات"
      api={servicesApi}
      fields={[
        { key: 'icon', label: 'الأيقونة (رمز أو إيموجي)', default: '◆' },
        { key: 'title', label: 'العنوان' },
        { key: 'description', label: 'الوصف', type: 'textarea' },
        { key: 'order_index', label: 'الترتيب', type: 'number', default: 0 },
      ]}
      renderItem={s => (
        <div className="flex items-start gap-3">
          <span className="text-2xl text-gold shrink-0">{s.icon}</span>
          <div>
            <div className="font-bold">{s.title}</div>
            <p className="text-text-dim text-sm line-clamp-2">{s.description}</p>
          </div>
        </div>
      )}
    />
  )
}
