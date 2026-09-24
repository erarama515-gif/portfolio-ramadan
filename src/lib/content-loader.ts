import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Dict, Locale, Project, Domain, ProjectStatus } from '@/i18n/dictionaries'
import { dict } from '@/i18n/dictionaries'

interface PayloadDoc { id: number | string; [k: string]: unknown }

function idx(n: number, locale: Locale): string {
  const s = String(n).padStart(2, '0')
  if (locale !== 'ar') return s
  const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩']
  return s.split('').map((c) => arabicDigits[Number(c)] ?? c).join('')
}

/**
 * Fetches full site content for a locale from Payload, with the
 * compiled dictionary as fallback for any missing field. Called
 * server-side by the (site) root layout.
 */
export async function loadContent(locale: Locale): Promise<Dict> {
  const base = dict[locale]

  let payload: Awaited<ReturnType<typeof getPayload>>
  try {
    payload = await getPayload({ config })
  } catch {
    return base
  }

  const safe = async <T,>(p: Promise<T>): Promise<T | null> => {
    try { return await p } catch { return null }
  }

  const [hero, numbers, process, projectsResp, domainsResp] = await Promise.all([
    safe(payload.findGlobal({ slug: 'hero', locale })),
    safe(payload.findGlobal({ slug: 'numbers', locale })),
    safe(payload.findGlobal({ slug: 'process', locale })),
    safe(payload.find({ collection: 'projects', locale, sort: 'orderIndex', limit: 100 })),
    safe(payload.find({ collection: 'domains', locale, sort: 'orderIndex', limit: 50 })),
  ])

  const projects: Project[] =
    projectsResp && projectsResp.docs.length
      ? projectsResp.docs.map((p: any, i: number) => ({
          slug: p.slug,
          index: idx(i + 1, locale),
          title: p.title ?? base.work.projects[i]?.title ?? '',
          subtitle: p.subtitle ?? '',
          blurb: p.blurb ?? '',
          tags: (p.tags ?? []).map((t: any) => t.tag).filter(Boolean),
          status: (p.status ?? 'LIVE') as ProjectStatus,
        }))
      : base.work.projects

  const domains: Domain[] =
    domainsResp && domainsResp.docs.length
      ? domainsResp.docs.map((d: any, i: number) => ({
          index: idx(i + 1, locale),
          title: d.title ?? '',
          body: d.body ?? '',
        }))
      : base.build.domains

  const heroData = hero as PayloadDoc | null
  const numbersData = numbers as any
  const processData = process as any

  return {
    ...base,
    hero: heroData
      ? {
          ...base.hero,
          tag: (heroData.tag as string) ?? base.hero.tag,
          headPre: (heroData.headPre as string) ?? base.hero.headPre,
          headItalic: (heroData.headItalic as string) ?? base.hero.headItalic,
          headPost: (heroData.headPost as string) ?? base.hero.headPost,
          subline: (heroData.subline as string) ?? base.hero.subline,
          ctaWork: (heroData.ctaWork as string) ?? base.hero.ctaWork,
          ctaContact: (heroData.ctaContact as string) ?? base.hero.ctaContact,
          metaLine: (heroData.metaLine as string) ?? base.hero.metaLine,
        }
      : base.hero,
    numbers: {
      ...base.numbers,
      stats: numbersData?.stats?.length
        ? numbersData.stats.map((s: any) => ({
            value: s.value,
            label: s.label,
            sub: s.sub,
          }))
        : base.numbers.stats,
    },
    process: {
      ...base.process,
      steps: processData?.steps?.length
        ? processData.steps.map((s: any) => ({
            num: s.num,
            title: s.title,
            body: s.body,
          }))
        : base.process.steps,
    },
    work: { ...base.work, projects },
    build: { ...base.build, domains },
  }
}

export async function loadAllContent(): Promise<Record<Locale, Dict>> {
  const [en, ar] = await Promise.all([loadContent('en'), loadContent('ar')])
  return { en, ar }
}
