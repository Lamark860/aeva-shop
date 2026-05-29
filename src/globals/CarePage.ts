import type { GlobalConfig } from 'payload'
import { safeRevalidate } from '../lib/revalidate'

// Страница «Уход за керамикой» — простая структура: лид + пронумерованный список + CTA-врезка.
// Номера 01/02/… выставляются автоматически по порядку в массиве, drag-n-drop меняет порядок.
export const CarePage: GlobalConfig = {
  slug: 'care-page',
  label: 'Страница «Уход»',
  access: { read: () => true },
  hooks: { afterChange: [() => { safeRevalidate('/care') }] },
  fields: [
    { name: 'subtitle', type: 'text', label: 'Надзаголовок', admin: { description: 'Маленькая подпись над основным заголовком, напр. «Уход».' } },
    { name: 'title', type: 'text', label: 'Заголовок страницы' },
    { name: 'lead', type: 'textarea', label: 'Лид', admin: { description: '1–2 предложения вступления под заголовком.' } },
    {
      name: 'items', type: 'array', label: 'Пункты ухода',
      labels: { singular: 'Пункт', plural: 'Пункты' },
      admin: { description: 'Порядок задаётся перетаскиванием. Номера 01, 02, … подставляются автоматически.' },
      fields: [
        { name: 'heading', type: 'text', required: true, label: 'Заголовок пункта' },
        { name: 'text', type: 'textarea', required: true, label: 'Текст пункта' },
      ],
    },
    {
      name: 'footer', type: 'group', label: 'Блок «Остались вопросы» внизу',
      fields: [
        { name: 'text', type: 'textarea', label: 'Текст', admin: { description: 'Можно оставить пустым — блок не покажется.' } },
        { name: 'linkText', type: 'text', label: 'Текст ссылки', admin: { description: 'Напр. «Напишите мне».' } },
        { name: 'linkHref', type: 'text', label: 'Куда ведёт ссылка', admin: { description: 'Напр. /order или mailto:…' } },
      ],
    },
  ],
}
