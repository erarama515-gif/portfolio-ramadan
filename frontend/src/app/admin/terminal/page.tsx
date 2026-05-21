'use client'
import GenericCrud from '@/components/admin/GenericCrud'
import { terminalApi } from '@/lib/api'
import type { TerminalLog } from '@/types'

export default function TerminalAdminPage() {
  return (
    <GenericCrud<TerminalLog>
      title="سجلات النظام"
      tag="Terminal"
      api={terminalApi}
      fields={[
        { key: 'timestamp', label: 'الطابع الزمني', placeholder: '00:00:01', dir: 'ltr', default: '00:00:00' },
        { key: 'log_type', label: 'النوع', type: 'select', default: 'info', options: [
          { value: 'info', label: 'info' },
          { value: 'success', label: 'success' },
          { value: 'warning', label: 'warning' },
          { value: 'error', label: 'error' },
        ]},
        { key: 'message', label: 'الرسالة', placeholder: 'service starting...', dir: 'ltr' },
        { key: 'order_index', label: 'الترتيب', type: 'number', default: 0 },
      ]}
      renderItem={l => (
        <div className="font-mono text-sm" dir="ltr">
          <span className="text-gold/50">[{l.timestamp}]</span>{' '}
          <span className={
            l.log_type === 'success' ? 'text-green-400' :
            l.log_type === 'warning' ? 'text-yellow-400' :
            l.log_type === 'error' ? 'text-red-400' : 'text-text-dim'
          }>▸ {l.message}</span>
        </div>
      )}
    />
  )
}
