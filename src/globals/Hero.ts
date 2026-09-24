import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  admin: {
    group: 'Content',
    description: 'The main landing hero — headline, subline, CTAs and meta.',
  },
  access: { read: () => true },
  fields: [
    { name: 'tag',        type: 'text', localized: true },
    { name: 'headPre',    type: 'text', localized: true },
    { name: 'headItalic', type: 'text', localized: true },
    { name: 'headPost',   type: 'text', localized: true },
    { name: 'subline',    type: 'textarea', localized: true },
    { name: 'ctaWork',    type: 'text', localized: true },
    { name: 'ctaContact', type: 'text', localized: true },
    { name: 'metaLine',   type: 'text', localized: true },
    { name: 'availability', type: 'text', localized: true },
  ],
}
