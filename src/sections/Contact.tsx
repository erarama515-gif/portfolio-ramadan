'use client'
import { useState } from 'react'
import { useLocale } from '@/i18n/LocaleContext'
import { Container } from '@/components/ui/Container'
import { SectionMasthead } from '@/components/ui/SectionMasthead'
import { cn } from '@/lib/cn'

/**
 * Contact — editorial framing. Title on top, then a two-column
 * layout: left is a manifesto CTA + email; right is a compact form.
 *
 * The CTA is not "Contact me" — it's "Start a conversation".
 */
export function Contact() {
  const { t } = useLocale()
  const { contact } = t
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="pb-24 md:pb-32">
      <SectionMasthead
        eyebrow={contact.eyebrow}
        figure={contact.figure}
        titlePre={contact.titlePre}
        titleItalic={contact.titleItalic}
        titlePost={contact.titlePost}
        kicker={contact.kicker}
      />

      <Container className="mt-16 md:mt-20">
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          {/* Left · manifesto + direct email */}
          <div className="col-span-12 lg:col-span-5">
            <a
              href={`mailto:${contact.email}?subject=Business%20inquiry`}
              className={cn(
                'group inline-flex items-baseline gap-3',
                'font-serif italic text-[1.75rem] md:text-[2.25rem] leading-tight',
                'text-fg hover:text-accent transition-colors',
              )}
            >
              <span>{contact.email}</span>
              <span
                aria-hidden
                className="text-accent transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              >
                ↗
              </span>
            </a>

            <div className="mt-10 space-y-2">
              <p className="cap">— {contact.meta}</p>
              <p className="cap text-fg-4">— {contact.quietMeta}</p>
            </div>
          </div>

          {/* Right · form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-x-4 gap-y-6 lg:pl-10 lg:border-l lg:border-line lg:rtl:border-l-0 lg:rtl:border-r lg:rtl:pl-0 lg:rtl:pr-10"
          >
            <FieldGroup label="Name" name="name" />
            <FieldGroup label="Company" name="company" optional />
            <FieldGroup label="Email" name="email" type="email" full />
            <FieldGroup label="Message" name="message" as="textarea" full />

            <div className="col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
              <button
                type="submit"
                disabled={sent}
                className={cn(
                  'group inline-flex items-center gap-2 h-10 pl-4 pr-2 rounded-md',
                  'bg-accent text-bg font-medium text-[13.5px]',
                  'hover:bg-accent-2 transition-colors duration-150',
                  'disabled:opacity-70 disabled:cursor-not-allowed',
                )}
              >
                <span>{sent ? '✓  Sent — I’ll reply within 24h' : contact.cta}</span>
                {!sent && (
                  <span className="kbd border-bg/30 bg-bg/15 text-bg/80">↵</span>
                )}
              </button>

              <span className="cap text-fg-4">
                or press <span className="kbd">⌘</span>
                <span className="kbd">↵</span> to send
              </span>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}

/* — Field — */

function FieldGroup({
  label,
  name,
  type = 'text',
  as = 'input',
  full = false,
  optional = false,
}: {
  label: string
  name: string
  type?: string
  as?: 'input' | 'textarea'
  full?: boolean
  optional?: boolean
}) {
  return (
    <div className={cn('flex flex-col gap-2', full ? 'col-span-2' : 'col-span-2 sm:col-span-1')}>
      <label htmlFor={name} className="flex items-baseline justify-between">
        <span className="cap">— {label}</span>
        {optional && <span className="cap text-fg-4">optional</span>}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          required={!optional}
          rows={5}
          className={cn(
            'w-full bg-surface border border-line rounded-md p-3',
            'text-[14.5px] text-fg placeholder:text-fg-4 resize-none',
            'focus:outline-none focus:border-accent transition-colors',
          )}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={!optional}
          className={cn(
            'w-full h-11 bg-surface border border-line rounded-md px-3',
            'text-[14.5px] text-fg placeholder:text-fg-4',
            'focus:outline-none focus:border-accent transition-colors',
          )}
        />
      )}
    </div>
  )
}
