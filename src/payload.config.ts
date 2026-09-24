import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
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

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./data/payload.sqlite',
    },
  }),

  localization: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    fallback: true,
  },

  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  sharp,

  telemetry: false,
})
