import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'status', 'createdAt'] },
  access: {
    create: () => true, // форма заявки — публичная
    read: ({ req }) => !!req.user, // читать только в админке
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    { name: 'product', type: 'relationship', relationTo: 'products' },
    {
      name: 'status', type: 'select', defaultValue: 'new',
      options: [
        { label: 'Новая', value: 'new' },
        { label: 'Обработана', value: 'done' },
      ],
    },
  ],
}
