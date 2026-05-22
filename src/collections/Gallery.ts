import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'size', 'sort_order'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'image', type: 'text', required: true, admin: { description: 'URL изображения' } },
    { name: 'description', type: 'textarea' },
    {
      name: 'size', type: 'select', defaultValue: 'normal',
      options: [
        { label: 'Обычный', value: 'normal' },
        { label: 'Широкий', value: 'wide' },
        { label: 'Высокий', value: 'tall' },
      ],
    },
    { name: 'sort_order', type: 'number', defaultValue: 0 },
  ],
}
