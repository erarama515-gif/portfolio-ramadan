import type { CollectionConfig } from 'payload'

export const Domains: CollectionConfig = {
  slug: 'domains',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'orderIndex'],
    group: 'Portfolio',
    description: 'The six "What I Build" domain cards.',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'body',  type: 'textarea', required: true, localized: true },
    { name: 'orderIndex', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
