import type { CollectionConfig } from 'payload'

export const SocialLinks: CollectionConfig = {
  slug: 'socialLinks',
  admin: {
    useAsTitle: 'platform',
    defaultColumns: ['platform', 'url', 'orderIndex'],
    group: 'Portfolio',
    description: 'Social handles shown in the personal brand strip and footer.',
  },
  access: { read: () => true },
  fields: [
    { name: 'platform', type: 'text', required: true },
    { name: 'url', type: 'text', required: true },
    { name: 'iconSlug', type: 'text' },
    { name: 'orderIndex', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
