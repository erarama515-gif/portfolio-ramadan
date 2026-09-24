/**
 * Seed script — populates a fresh Payload database with the same
 * content that lives in src/i18n/dictionaries.ts and
 * src/content/case-studies.ts. Idempotent: skips records that
 * already exist.
 *
 * Run once after `payload migrate` (or first admin visit):
 *   npx tsx src/lib/seed.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config'
import { dict } from '../i18n/dictionaries'
import { caseStudies } from '../content/case-studies'

async function seed() {
  const payload = await getPayload({ config })

  const enHero = dict.en.hero
  const arHero = dict.ar.hero

  // — Hero global —
  await payload.updateGlobal({
    slug: 'hero',
    data: {
      tag: enHero.tag,
      headPre: enHero.headPre,
      headItalic: enHero.headItalic,
      headPost: enHero.headPost,
      subline: enHero.subline,
      ctaWork: enHero.ctaWork,
      ctaContact: enHero.ctaContact,
      metaLine: enHero.metaLine,
      availability: 'open to one project this month',
    },
    locale: 'en',
  })
  await payload.updateGlobal({
    slug: 'hero',
    data: {
      tag: arHero.tag,
      headPre: arHero.headPre,
      headItalic: arHero.headItalic,
      headPost: arHero.headPost,
      subline: arHero.subline,
      ctaWork: arHero.ctaWork,
      ctaContact: arHero.ctaContact,
      metaLine: arHero.metaLine,
      availability: 'متاح لمشروع واحد هذا الشهر',
    },
    locale: 'ar',
  })

  // — Profile global —
  await payload.updateGlobal({
    slug: 'profile',
    data: {
      fullName: 'Eslam Ramadan',
      firstName: 'Eslam',
      lastName: 'Ramadan',
      role: 'Digital Business Architect',
      tagline: enHero.subline,
      location: 'Cairo · Egypt',
      email: 'eslaaaramaa@gmail.com',
    },
    locale: 'en',
  })
  await payload.updateGlobal({
    slug: 'profile',
    data: {
      fullName: 'إسلام رمضان',
      firstName: 'إسلام',
      lastName: 'رمضان',
      role: 'مهندس أنظمة رقمية للأعمال',
      tagline: arHero.subline,
      location: 'القاهرة · مصر',
    },
    locale: 'ar',
  })

  // — Numbers global —
  await payload.updateGlobal({
    slug: 'numbers',
    data: { stats: dict.en.numbers.stats },
    locale: 'en',
  })
  await payload.updateGlobal({
    slug: 'numbers',
    data: { stats: dict.ar.numbers.stats },
    locale: 'ar',
  })

  // — Process global —
  await payload.updateGlobal({
    slug: 'process',
    data: { steps: dict.en.process.steps },
    locale: 'en',
  })
  await payload.updateGlobal({
    slug: 'process',
    data: { steps: dict.ar.process.steps },
    locale: 'ar',
  })

  // — Settings global —
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      siteTitle: 'Eslam Ramadan — Digital Business Architect',
      siteDescription:
        'From business problems to digital systems. ERP · CRM · POS · SaaS · AI Automation.',
      keywords: 'Eslam Ramadan, portfolio, digital business, ERP, POS, SaaS, automation',
      primaryColor: '#F26D50',
      availabilityFlag: true,
    },
    locale: 'en',
  })

  // — Domains collection —
  const enDomains = dict.en.build.domains
  const arDomains = dict.ar.build.domains
  for (let i = 0; i < enDomains.length; i++) {
    const en = enDomains[i]
    const ar = arDomains[i]
    const existing = await payload.find({
      collection: 'domains',
      where: { title: { equals: en.title } },
      limit: 1,
    })
    let id: number | string
    if (existing.docs[0]) {
      id = existing.docs[0].id
      await payload.update({
        collection: 'domains',
        id,
        data: { title: en.title, body: en.body, orderIndex: i },
        locale: 'en',
      })
    } else {
      const created = await payload.create({
        collection: 'domains',
        data: { title: en.title, body: en.body, orderIndex: i },
        locale: 'en',
      })
      id = created.id
    }
    await payload.update({
      collection: 'domains',
      id,
      data: { title: ar.title, body: ar.body },
      locale: 'ar',
    })
  }

  // — Projects collection —
  const enProjects = dict.en.work.projects
  const arProjects = dict.ar.work.projects
  for (let i = 0; i < enProjects.length; i++) {
    const en = enProjects[i]
    const ar = arProjects[i]
    const cs = caseStudies[en.slug]
    const csEN = cs?.en
    const csAR = cs?.ar

    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: en.slug } },
      limit: 1,
    })
    let id: number | string
    const enData = {
      slug: en.slug,
      title: en.title,
      subtitle: en.subtitle,
      blurb: en.blurb,
      status: en.status,
      orderIndex: i,
      featured: true,
      tags: en.tags.map((t) => ({ tag: t })),
      caseStudy: csEN
        ? {
            role: csEN.meta.role,
            timeline: csEN.meta.timeline,
            industry: csEN.meta.industry,
            challenge: csEN.challenge.map((paragraph) => ({ paragraph })),
            approach: csEN.approach.map((paragraph) => ({ paragraph })),
            architecture: csEN.architecture,
            features: csEN.features,
            techGroups: csEN.techGroups.map((g) => ({
              group: g.group,
              items: g.items.map((item) => ({ item })),
            })),
            results: csEN.results,
          }
        : undefined,
    }
    if (existing.docs[0]) {
      id = existing.docs[0].id
      await payload.update({ collection: 'projects', id, data: enData, locale: 'en' })
    } else {
      const created = await payload.create({ collection: 'projects', data: enData, locale: 'en' })
      id = created.id
    }
    // Arabic
    await payload.update({
      collection: 'projects',
      id,
      data: {
        title: ar.title,
        subtitle: ar.subtitle,
        blurb: ar.blurb,
        caseStudy: csAR
          ? {
              role: csAR.meta.role,
              timeline: csAR.meta.timeline,
              industry: csAR.meta.industry,
              challenge: csAR.challenge.map((paragraph) => ({ paragraph })),
              approach: csAR.approach.map((paragraph) => ({ paragraph })),
              architecture: csAR.architecture,
              features: csAR.features,
              techGroups: csAR.techGroups.map((g) => ({
                group: g.group,
                items: g.items.map((item) => ({ item })),
              })),
              results: csAR.results,
            }
          : undefined,
      },
      locale: 'ar',
    })
  }

  console.log('✔ seed complete')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
