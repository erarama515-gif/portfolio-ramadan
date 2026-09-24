import type { GlobalConfig } from 'payload'

export const Process: GlobalConfig = {
  slug: 'process',
  admin: {
    group: 'Content',
    description: 'The six-step working method.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      localized: true,
      fields: [
        { name: 'num',   type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'body',  type: 'textarea' },
      ],
    },
  ],
}
