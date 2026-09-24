import { ReactNode } from 'react'
import { Container } from './Container'
import { cn } from '@/lib/cn'

/**
 * Section masthead — a running header shared by every non-hero section.
 * Layout mirrors a book chapter opener:
 *
 *   [— eyebrow]                                [Fig. NN]
 *   [Title text  *italic accent word*  post]
 *   [Optional kicker paragraph]                [right slot]
 *
 * All divided by a top hairline.
 */
interface Props {
  id?: string
  eyebrow: string
  figure?: string
  titlePre: string
  titleItalic: string
  titlePost?: string
  kicker?: ReactNode
  rightSlot?: ReactNode
  className?: string
}

export function SectionMasthead({
  id,
  eyebrow,
  figure,
  titlePre,
  titleItalic,
  titlePost,
  kicker,
  rightSlot,
  className,
}: Props) {
  return (
    <div id={id} className={cn('border-t border-line pt-12 md:pt-16', className)}>
      <Container>
        <div className="flex items-baseline justify-between mb-6">
          <p className="cap">— {eyebrow}</p>
          {figure && <p className="cap text-fg-4">{figure}</p>}
        </div>

        <h2 className="h-section text-fg max-w-3xl [text-wrap:balance]">
          <span>{titlePre} </span>
          <span className="h-section-italic">{titleItalic}</span>
          {titlePost && <span>{titlePost}</span>}
        </h2>

        {(kicker || rightSlot) && (
          <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            {kicker && <p className="lead">{kicker}</p>}
            {rightSlot && <div className="md:ml-auto">{rightSlot}</div>}
          </div>
        )}
      </Container>
    </div>
  )
}
