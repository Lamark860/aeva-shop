import type { CollectionConfig } from 'payload'
import { safeRevalidate } from '../lib/revalidate'
import { slugField } from '../lib/slugify'

// Портфолио / case-study (страницы /projects и /projects/[slug]).
export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Проект', plural: 'Проекты' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'year', 'featured', 'sort_order'],
    description: 'Реализованные заказы и коллекции для портфолио.',
  },
  access: { read: () => true },
  hooks: {
    afterChange: [() => { safeRevalidate('/', '/projects', ['/projects/[slug]', 'page']) }],
    afterDelete: [() => { safeRevalidate('/', '/projects', ['/projects/[slug]', 'page']) }],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Основное',
          fields: [
            { name: 'title', type: 'text', required: true, label: 'Заголовок', admin: { description: 'Напр.: «Norra · посуда для тейстинга».' } },
            slugField('title'),
            { name: 'year', type: 'text', label: 'Год', admin: { description: 'Напр.: 2026.' } },
            {
              name: 'type', type: 'select', label: 'Тип проекта', defaultValue: 'restaurant',
              options: [
                { label: 'Для ресторана', value: 'restaurant' },
                { label: 'Частный заказ', value: 'private' },
                { label: 'Авторская коллекция', value: 'collection' },
                { label: 'Для кафе', value: 'cafe' },
              ],
            },
            { name: 'subtitle', type: 'text', label: 'Подзаголовок', admin: { description: 'Краткая строка под заголовком: объём, формы, материал.' } },
            { name: 'description', type: 'textarea', label: 'Описание' },
            { name: 'featured', type: 'checkbox', defaultValue: false, label: 'Показывать на главной' },
            { name: 'sort_order', type: 'number', defaultValue: 0, label: 'Порядок сортировки' },
          ],
        },
        {
          label: 'Фотографии',
          fields: [
            { name: 'mainPhoto', type: 'upload', relationTo: 'media', label: 'Главное фото (загруженное)', admin: { description: 'Приоритетно над URL ниже.' } },
            { name: 'mainImage', type: 'text', label: 'Главное фото по URL (запасной / демо)' },
            {
              name: 'gallery', type: 'array', label: 'Галерея',
              labels: { singular: 'Фото', plural: 'Фото' },
              fields: [
                { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото (загруженное)' },
                { name: 'image', type: 'text', label: 'Фото по URL (запасной)' },
              ],
            },
          ],
        },
        {
          label: 'Факты и цитата',
          fields: [
            {
              name: 'facts', type: 'array', label: 'Факты',
              labels: { singular: 'Факт', plural: 'Факты' },
              admin: { description: 'Пары «параметр — значение»: заведение, объём, материал, срок.' },
              fields: [
                { name: 'key', type: 'text', required: true, label: 'Параметр' },
                { name: 'value', type: 'text', required: true, label: 'Значение' },
              ],
            },
            { name: 'quote', type: 'textarea', label: 'Цитата' },
            { name: 'quoteAuthor', type: 'text', label: 'Автор цитаты' },
          ],
        },
      ],
    },
  ],
}
