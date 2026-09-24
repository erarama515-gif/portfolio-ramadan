import type { GlobalConfig } from 'payload'

export const Profile: GlobalConfig = {
  slug: 'profile',
  admin: {
    group: 'Identity',
    description: 'The single-source profile: name, title, tagline, headshot.',
  },
  access: { read: () => true },
  fields: [
    { name: 'fullName', type: 'text', localized: true, required: true },
    { name: 'firstName', type: 'text', localized: true, required: true },
    { name: 'lastName',  type: 'text', localized: true, required: true },
    { name: 'role',      type: 'text', localized: true },
    { name: 'tagline',   type: 'textarea', localized: true },
    { name: 'location',  type: 'text', localized: true },
    { name: 'email',     type: 'email' },
    { name: 'headshot',  type: 'upload', relationTo: 'media' },
  ],
}
