'use client'
import { useLocale } from '@/i18n/LocaleContext'
import { getCaseStudy } from '@/content/case-studies'
import { Navbar } from '@/sections/Navbar'
import { Footer } from '@/sections/Footer'
import { CaseHero } from '@/sections/case-study/CaseHero'
import { CaseSection } from '@/sections/case-study/CaseSection'
import { ArchitectureFigure } from '@/sections/case-study/ArchitectureFigure'
import { FeatureGrid } from '@/sections/case-study/FeatureGrid'
import { ResultsTiles } from '@/sections/case-study/ResultsTiles'
import { TechStack } from '@/sections/case-study/TechStack'
import { NextCase } from '@/sections/case-study/NextCase'

export function CaseStudyView({ slug }: { slug: string }) {
  const { t, locale } = useLocale()
  const cs = getCaseStudy(slug, locale)
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

      {/* Challenge */}
      <CaseSection eyebrow={t.caseStudy.challenge} figure="Fig. 01">
        <div className="prose-precise max-w-none text-fg-2 text-[1.0625rem] leading-relaxed space-y-6">
          {cs.challenge.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </CaseSection>

      {/* Approach */}
      <CaseSection eyebrow={t.caseStudy.approach} figure="Fig. 02">
        <div className="prose-precise max-w-none text-fg-2 text-[1.0625rem] leading-relaxed space-y-6">
          {cs.approach.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </CaseSection>

      {/* System */}
      <CaseSection eyebrow={t.caseStudy.system} figure="Fig. 03">
        <ArchitectureFigure layers={cs.architecture} />
      </CaseSection>

      {/* Features */}
      <CaseSection eyebrow={t.caseStudy.features} figure="Fig. 04">
        <FeatureGrid features={cs.features} />
      </CaseSection>

      {/* Tech */}
      <CaseSection eyebrow={t.caseStudy.tech} figure="Fig. 05">
        <TechStack groups={cs.techGroups} />
      </CaseSection>

      {/* Results */}
      <CaseSection eyebrow={t.caseStudy.results} figure="Fig. 06">
        <ResultsTiles results={cs.results} />
      </CaseSection>

      {/* Next case */}
      <NextCase next={next} cta={t.caseStudy.nextCta} />

      <Footer />
    </main>
  )
}
