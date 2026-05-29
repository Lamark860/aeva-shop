import type { CollectionConfig } from 'payload'
import { safeRevalidate } from '../lib/revalidate'
import { slugField } from '../lib/slugify'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Изделие', plural: 'Изделия' },
  admin: {
    useAsTitle: 'name',
    // photos первой — рендерится через ImageCell как миниатюра первого фото
    defaultColumns: ['photos', 'name', 'category', 'price', 'featured'],
    description: 'Изделия каталога.',
  },
  access: { read: () => true },
  // правки товара отражаются сразу: главная (превью + featured), каталог и все страницы товаров
  hooks: {
    afterChange: [() => { safeRevalidate('/', '/catalog', ['/product/[slug]', 'page']) }],
    afterDelete: [() => { safeRevalidate('/', '/catalog', ['/product/[slug]', 'page']) }],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Основное',
          fields: [
            { name: 'name', type: 'text', required: true, label: 'Название изделия', admin: { description: 'Как отображается на сайте. Напр.: «Ваза „Тишина“».' } },
            slugField('name'),
            { name: 'category', type: 'relationship', relationTo: 'categories', label: 'Категория' },
            {
              name: 'price', type: 'number', required: true, label: 'Цена-ориентир, от (₽)',
              admin: { description: 'На сайте показывается с приставкой «от». Можно менять при разговоре с клиентом.', step: 100 },
            },
            { name: 'inStock', type: 'checkbox', defaultValue: true, label: 'В наличии', admin: { description: 'Если снять — на сайте появится бейдж «Нет в наличии», заказ через форму всё равно возможен.' } },
            { name: 'featured', type: 'checkbox', defaultValue: false, label: 'Показывать в «Избранных» на главной', admin: { description: 'Не больше 4–5 одновременно — это лицо сайта.' } },
            { name: 'short_description', type: 'text', label: 'Короткое описание', admin: { description: '1–2 предложения, видны в карточке каталога.' } },
            { name: 'description', type: 'textarea', label: 'Характеристики', admin: { description: 'Каждая строка → отдельный пункт списка на странице товара.' } },
            { name: 'story', type: 'textarea', label: 'История изделия', admin: { description: 'Маленький рассказ — как родилась форма, что особенного. Клиенту это важнее размеров.' } },
            { name: 'sort_order', type: 'number', defaultValue: 0, label: 'Порядок сортировки' },
          ],
        },
        {
          label: 'Фотографии',
          fields: [
            {
              name: 'photos', type: 'upload', relationTo: 'media', hasMany: true,
              label: 'Фото (загруженные)',
              admin: {
                description: 'Приоритетны. Первое — главное изображение.',
                components: { Cell: '@/admin/ImageCell' },
              },
            },
            {
              name: 'images', type: 'array', label: 'Фото по URL (запасной вариант / демо)',
              labels: { singular: 'Ссылка', plural: 'Ссылки' },
              fields: [{ name: 'url', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Размеры и материал',
          fields: [
            {
              name: 'sizes', type: 'group', label: 'Размеры',
              admin: { description: 'Строки — можно писать диапазоны, напр. «6–10 см».' },
              fields: [
                { name: 'height', type: 'text', label: 'Высота' },
                { name: 'diameter', type: 'text', label: 'Диаметр' },
                { name: 'volume', type: 'text', label: 'Объём' },
              ],
            },
            { name: 'material', type: 'text', label: 'Материал', admin: { description: 'Напр.: «Шамот · обжиг 1230°C».' } },
          ],
        },
        {
          label: 'Уход',
          fields: [
            { name: 'care', type: 'text', label: 'Уход', admin: { description: 'Что можно и нельзя: посудомойка, микроволновка, температура.' } },
          ],
        },
      ],
    },
  ],
}
