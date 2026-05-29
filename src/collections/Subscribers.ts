import type { CollectionConfig } from 'payload'

// Подписчики дневника (форма подписки на /journal, опц. чекбокс в /order).
export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  labels: { singular: 'Подписчик', plural: 'Подписчики' },
  admin: { useAsTitle: 'email', defaultColumns: ['email', 'source', 'createdAt'], description: 'Подписки на дневник мастерской.' },
  access: {
    create: () => true, // публичная форма подписки
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true, label: 'Email' },
    {
      name: 'source', type: 'select', label: 'Откуда', defaultValue: 'journal',
      options: [
        { label: 'Дневник', value: 'journal' },
        { label: 'Форма заказа', value: 'order' },
      ],
    },
  ],
}
