import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'orderIndex', 'featured'],
    group: 'Portfolio',
    description: 'Every project shown in Selected Work and served at /work/[slug].',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'orderIndex', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'LIVE',
      options: [
        { label: 'Live', value: 'LIVE' },
        { label: 'Private', value: 'PRIVATE' },
        { label: 'Infrastructure', value: 'INFRASTRUCTURE' },
      ],
      admin: { position: 'sidebar' },
    },

    { name: 'subtitle', type: 'text', localized: true },
    { name: 'blurb', type: 'textarea', localized: true },

    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },

    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'caseStudy',
      type: 'group',
      label: 'Case Study',
      fields: [
        { name: 'role',     type: 'text', localized: true },
        { name: 'timeline', type: 'text', localized: true },
        { name: 'industry', type: 'text', localized: true },

        {
          name: 'challenge',
          type: 'array',
          localized: true,
          fields: [{ name: 'paragraph', type: 'textarea' }],
        },
        {
          name: 'approach',
          type: 'array',
          localized: true,
          fields: [{ name: 'paragraph', type: 'textarea' }],
        },
        {
          name: 'architecture',
          type: 'array',
          localized: true,
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'note',  type: 'text' },
          ],
        },
        {
          name: 'features',
          type: 'array',
          localized: true,
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'body',  type: 'textarea' },
          ],
        },
        {
          name: 'techGroups',
          type: 'array',
          localized: true,
          fields: [
            { name: 'group', type: 'text', required: true },
            { name: 'items', type: 'array', fields: [{ name: 'item', type: 'text' }] },
          ],
        },
        {
          name: 'results',
          type: 'array',
          localized: true,
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
