/**
 * Server-side helpers for reading content out of Payload.
 * Used by (site)/page.tsx and (site)/work/[slug]/page.tsx.
 *
 * Falls back to the dictionary content when the DB is empty
 * (i.e. before the first seed) so pages never render blank.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/i18n/dictionaries'
import { dict } from '@/i18n/dictionaries'

async function payloadInstance() {
  return getPayload({ config })
}

export async function readHero(locale: Locale) {
  try {
    const payload = await payloadInstance()
    const doc = await payload.findGlobal({ slug: 'hero', locale })
    if (doc && doc.headPre) return doc
  } catch {}
  return dict[locale].hero
}

export async function readProjects(locale: Locale) {
  try {
    const payload = await payloadInstance()
    const { docs } = await payload.find({
      collection: 'projects',
      locale,
      sort: 'orderIndex',
      limit: 100,
    })
    if (docs.length) return docs
  } catch {}
  return dict[locale].work.projects
}

export async function readDomains(locale: Locale) {
  try {
    const payload = await payloadInstance()
    const { docs } = await payload.find({
      collection: 'domains',
      locale,
      sort: 'orderIndex',
      limit: 50,
    })
    if (docs.length) return docs
  } catch {}
  return dict[locale].build.domains
}
