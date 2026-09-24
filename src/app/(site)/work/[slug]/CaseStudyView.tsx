'use client'
import { useLocale } from '@/i18n/LocaleContext'
import type { CaseStudy } from '@/content/case-studies'
import type { Locale } from '@/i18n/dictionaries'
import { Navbar } from '@/sections/Navbar'
import { Footer } from '@/sections/Footer'
import { CaseHero } from '@/sections/case-study/CaseHero'
import { CaseSection } from '@/sections/case-study/CaseSection'
import { ArchitectureFigure } from '@/sections/case-study/ArchitectureFigure'
import { FeatureGrid } from '@/sections/case-study/FeatureGrid'
import { ResultsTiles } from '@/sections/case-study/ResultsTiles'
import { TechStack } from '@/sections/case-study/TechStack'
import { NextCase } from '@/sections/case-study/NextCase'

type CaseStudyByLocale = Record<Locale, CaseStudy | null>

export function CaseStudyView({
  slug,
  caseStudy,
}: {
  slug: string
  caseStudy: CaseStudyByLocale
}) {
  const { t, locale } = useLocale()
  const cs = caseStudy[locale]
  const project = t.work.projects.find((p) => p.slug === slug)

  if (!cs || !project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="cap">Case study not found.</p>
      </main>
    )
  }

  const currentIdx = t.work.projects.findIndex((p) => p.slug === slug)
  const next = t.work.projects[(currentIdx + 1) % t.work.projects.length]

  return (
    <main className="relative">
      <Navbar />

      <CaseHero project={project} meta={cs.meta} backLabel={t.caseStudy.backLabel} />

      <CaseSection eyebrow={t.caseStudy.challenge} figure="Fig. 01">
        <div className="prose-precise max-w-none text-fg-2 text-[1.0625rem] leading-relaxed space-y-6">
          {cs.challenge.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </CaseSection>

      <CaseSection eyebrow={t.caseStudy.approach} figure="Fig. 02">
        <div className="prose-precise max-w-none text-fg-2 text-[1.0625rem] leading-relaxed space-y-6">
          {cs.approach.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </CaseSection>

      <CaseSection eyebrow={t.caseStudy.system} figure="Fig. 03">
        <ArchitectureFigure layers={cs.architecture} />
      </CaseSection>

      <CaseSection eyebrow={t.caseStudy.features} figure="Fig. 04">
        <FeatureGrid features={cs.features} />
      </CaseSection>

      <CaseSection eyebrow={t.caseStudy.tech} figure="Fig. 05">
        <TechStack groups={cs.techGroups} />
      </CaseSection>

      <CaseSection eyebrow={t.caseStudy.results} figure="Fig. 06">
        <ResultsTiles results={cs.results} />
      </CaseSection>

      <NextCase next={next} cta={t.caseStudy.nextCta} />

      <Footer />
    </main>
  )
}
