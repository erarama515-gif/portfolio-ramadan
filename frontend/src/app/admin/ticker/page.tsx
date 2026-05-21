'use client'
import GenericCrud from '@/components/admin/GenericCrud'
import { tickerApi } from '@/lib/api'
import type { TickerMessage } from '@/types'

export default function TickerAdminPage() {
  return (
    <GenericCrud<TickerMessage>
      title="الشريط المتحرك"
      tag="Ticker"
      api={tickerApi}
      fields={[
        { key: 'text', label: 'نص الرسالة' },
        { key: 'order_index', label: 'الترتيب', type: 'number', default: 0 },
      ]}
      renderItem={t => <div className="text-gold/80">◆ {t.text}</div>}
    />
  )
}
