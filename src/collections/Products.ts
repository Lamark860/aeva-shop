import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'category', 'price', 'featured'] },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'short_description', type: 'text' },
    { name: 'description', type: 'textarea', admin: { description: 'Каждая строка → пункт характеристик' } },
    { name: 'price', type: 'number', required: true },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Фото (загруженные)',
      admin: { description: 'Приоритетны. Первое — главное изображение.' },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Фото по URL (запасной вариант / демо)',
      labels: { singular: 'Ссылка', plural: 'Ссылки' },
      fields: [{ name: 'url', type: 'text', required: true }],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sort_order', type: 'number', defaultValue: 0 },
  ],
}
