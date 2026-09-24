import type { GlobalConfig } from 'payload'

export const Numbers: GlobalConfig = {
  slug: 'numbers',
  admin: {
    group: 'Content',
    description: 'The four stat tiles under "By the Numbers".',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      localized: true,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'sub',   type: 'text' },
      ],
    },
  ],
}
