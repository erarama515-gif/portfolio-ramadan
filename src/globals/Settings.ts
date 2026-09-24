import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: 'System',
    description: 'Site-wide SEO defaults and feature flags.',
  },
  access: { read: () => true },
  fields: [
    { name: 'siteTitle',        type: 'text', localized: true },
    { name: 'siteDescription',  type: 'textarea', localized: true },
    { name: 'keywords',         type: 'text', localized: true },
    { name: 'ogImage',          type: 'upload', relationTo: 'media' },
    { name: 'primaryColor',     type: 'text', defaultValue: '#F26D50' },
    { name: 'availabilityFlag', type: 'checkbox', defaultValue: true },
  ],
}
