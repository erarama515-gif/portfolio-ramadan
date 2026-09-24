import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contactMessages',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'company', 'createdAt'],
    group: 'System',
    description: 'Read-only inbox for contact form submissions.',
  },
  access: {
    create: () => true,   // public form can create
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 200 },
    { name: 'email', type: 'email', required: true },
    { name: 'company', type: 'text', maxLength: 200 },
    { name: 'message', type: 'textarea', required: true, maxLength: 5000 },
  ],
}
