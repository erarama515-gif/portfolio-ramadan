import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { caseStudies } from '@/content/case-studies'
import { dict } from '@/i18n/dictionaries'
import { loadCaseStudyBothLocales } from '@/lib/case-study-loader'
import { CaseStudyView } from './CaseStudyView'

interface Params { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  return Object.keys(caseStudies).map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params
  const project = dict.en.work.projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Eslam Ramadan`,
    description: project.blurb,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  if (!caseStudies[slug]) notFound()
  const cs = await loadCaseStudyBothLocales(slug)
  return <CaseStudyView slug={slug} caseStudy={cs} />
}
