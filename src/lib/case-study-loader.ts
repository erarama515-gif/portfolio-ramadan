import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/i18n/dictionaries'
import { caseStudies, type CaseStudy } from '@/content/case-studies'

/**
 * Load a project's full case-study payload for a given locale.
 * Falls back to the static case-studies file when Payload can't
 * find the project or a field is missing.
 */
export async function loadCaseStudy(
  slug: string,
  locale: Locale,
): Promise<CaseStudy | null> {
  const fallback = caseStudies[slug]?.[locale] ?? null

  let payload: Awaited<ReturnType<typeof getPayload>>
  try {
    payload = await getPayload({ config })
  } catch {
    return fallback
  }

  try {
    const { docs } = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      locale,
      limit: 1,
    })
    const p = docs[0] as any
    if (!p || !p.caseStudy) return fallback

    const cs = p.caseStudy
    return {
      meta: {
        role: cs.role ?? fallback?.meta.role ?? '',
        timeline: cs.timeline ?? fallback?.meta.timeline ?? '',
        industry: cs.industry ?? fallback?.meta.industry ?? '',
      },
      challenge:
        cs.challenge?.length
          ? cs.challenge.map((c: any) => c.paragraph).filter(Boolean)
          : fallback?.challenge ?? [],
      approach:
        cs.approach?.length
          ? cs.approach.map((c: any) => c.paragraph).filter(Boolean)
          : fallback?.approach ?? [],
      architecture:
        cs.architecture?.length
          ? cs.architecture.map((n: any) => ({ label: n.label, note: n.note }))
          : fallback?.architecture ?? [],
      features:
        cs.features?.length
          ? cs.features.map((f: any) => ({ title: f.title, body: f.body }))
          : fallback?.features ?? [],
      results:
        cs.results?.length
          ? cs.results.map((r: any) => ({ value: r.value, label: r.label }))
          : fallback?.results ?? [],
      techGroups:
        cs.techGroups?.length
          ? cs.techGroups.map((g: any) => ({
              group: g.group,
              items: (g.items ?? []).map((i: any) => i.item).filter(Boolean),
            }))
          : fallback?.techGroups ?? [],
    }
  } catch {
    return fallback
  }
}

export async function loadCaseStudyBothLocales(slug: string) {
  const [en, ar] = await Promise.all([
    loadCaseStudy(slug, 'en'),
    loadCaseStudy(slug, 'ar'),
  ])
  return { en, ar }
}
