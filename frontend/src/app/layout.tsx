import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/Toaster'

export const metadata: Metadata = {
  title: 'إسلام رمضان · إنجاز · مهندس أنظمة الأعمال',
  description: 'مؤسس إنجاز للخدمات الإلكترونية ومتخصص في أتمتة الأعمال وتحليل الأنظمة. مؤلف كتاب «عصر الاتصال المفرط» — في اقتصاد الانتباه وإعادة برمجة الدماغ في العصر الرقمي.',
  keywords: 'إسلام رمضان, إنجاز, أتمتة الأعمال, تحليل الأنظمة, اقتصاد الانتباه, عصر الاتصال المفرط, Islam Ramadan, Enjaz',
  authors: [{ name: 'Islam Ramadan' }],
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    title: 'إسلام رمضان · إنجاز',
    description: 'مهندس أنظمة الأعمال · مؤسس إنجاز · مؤلف كتاب «عصر الاتصال المفرط»',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'إسلام رمضان · إنجاز',
    description: 'مهندس أنظمة الأعمال · مؤسس إنجاز · مؤلف كتاب «عصر الاتصال المفرط»',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body>
        {children}
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: {
              background: '#100c08',
              color: '#ece5d6',
              border: '1px solid rgba(200,169,106,.25)',
              fontFamily: 'Tajawal, sans-serif',
              fontSize: '.88rem',
              padding: '12px 16px',
            },
            success: { iconTheme: { primary: '#c8a96a', secondary: '#06050a' } },
            error: { iconTheme: { primary: '#8b1a1a', secondary: '#ece5d6' } },
          }}
        />
      </body>
    </html>
  )
}
