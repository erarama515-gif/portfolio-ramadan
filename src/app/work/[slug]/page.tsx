import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { caseStudies } from '@/content/case-studies'
import { dict } from '@/i18n/dictionaries'
import { CaseStudyView } from './CaseStudyView'

interface Params { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  return Object.keys(caseStudies).map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Params },
): Promise<Metadata> {
  const project = dict.en.work.projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Eslam Ramadan`,
    description: project.blurb,
  }
}

export default function CaseStudyPage({ params }: { params: Params }) {
  if (!caseStudies[params.slug]) notFound()
  return <CaseStudyView slug={params.slug} />
}
