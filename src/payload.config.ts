import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Domains } from './collections/Domains'
import { SocialLinks } from './collections/SocialLinks'
import { ContactMessages } from './collections/ContactMessages'

import { Profile } from './globals/Profile'
import { Hero } from './globals/Hero'
import { Numbers } from './globals/Numbers'
import { Process } from './globals/Process'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** Auto-select the adapter from DATABASE_URI. postgres:// or postgresql://
 *  routes to Postgres (production), everything else falls back to SQLite. */
function selectDatabaseAdapter() {
  const uri = process.env.DATABASE_URI || 'file:./data/payload.sqlite'
  if (uri.startsWith('postgres://') || uri.startsWith('postgresql://')) {
    return postgresAdapter({
      pool: { connectionString: uri },
    })
  }
  return sqliteAdapter({ client: { url: uri } })
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Eslam Ramadan Studio',
    },
    components: {},
  },

  collections: [Users, Media, Projects, Domains, SocialLinks, ContactMessages],
  globals: [Profile, Hero, Numbers, Process, Settings],

  editor: lexicalEditor(),

  db: selectDatabaseAdapter(),

  localization: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    fallback: true,
  },

  secret: (() => {
    if (process.env.PAYLOAD_SECRET) return process.env.PAYLOAD_SECRET
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'PAYLOAD_SECRET must be set in production. Generate a long random string ' +
          'and add it to your environment.',
      )
    }
    return 'dev-secret-change-me'
  })(),

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  sharp,

  telemetry: false,
})
