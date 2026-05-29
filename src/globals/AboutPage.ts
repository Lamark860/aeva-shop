import type { GlobalConfig } from 'payload'
import { safeRevalidate } from '../lib/revalidate'

// Страница «О мастере». Intro (заголовок, body, портрет) — отдельно в Pages doc slug='about'
// (текст пишется как обычный markdown-like body). Остальные секции — здесь, со своей структурой.
export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Страница «О мастере»',
  access: { read: () => true },
  hooks: { afterChange: [() => { safeRevalidate('/about') }] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Портрет',
          description: 'Главное фото в начале страницы. Текст рядом редактируется в коллекции «Страницы», документ slug=about.',
          fields: [
            { name: 'portraitPhoto', type: 'upload', relationTo: 'media', label: 'Портрет (загруженное фото)', admin: { description: 'Если пусто — используется фото с alt=aeva-about-0 из Media.' } },
          ],
        },
        {
          label: 'Цитата',
          fields: [
            { name: 'quoteText', type: 'textarea', label: 'Текст цитаты', admin: { description: 'Без кавычек — они добавятся автоматически.' } },
            { name: 'quoteAuthor', type: 'text', label: 'Автор (необязательно)' },
          ],
        },
        {
          label: 'Материал',
          fields: [
            { name: 'materialPhoto', type: 'upload', relationTo: 'media', label: 'Фото слева' },
            { name: 'materialSubtitle', type: 'text', label: 'Надзаголовок', admin: { description: 'Напр. «Материал».' } },
            { name: 'materialHeading', type: 'text', label: 'Заголовок секции' },
            {
              name: 'materialParagraphs', type: 'array', label: 'Абзацы',
              labels: { singular: 'Абзац', plural: 'Абзацы' },
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
          ],
        },
        {
          label: 'Три фото (триптих)',
          description: 'Три фото в ряд между «Материалом» и «Три типа работ». Можно пропустить — секция не покажется.',
          fields: [
            {
              name: 'triptych', type: 'array', label: 'Фото',
              labels: { singular: 'Фото', plural: 'Фото' },
              maxRows: 3,
              fields: [{ name: 'photo', type: 'upload', relationTo: 'media', required: true }],
            },
          ],
        },
        {
          label: 'Три типа работ',
          fields: [
            { name: 'typesSubtitle', type: 'text', label: 'Надзаголовок', admin: { description: 'Напр. «Что я делаю».' } },
            { name: 'typesHeading', type: 'text', label: 'Заголовок секции' },
            {
              name: 'types', type: 'array', label: 'Типы работ',
              labels: { singular: 'Тип', plural: 'Типы' },
              admin: { description: 'Номера 01, 02, … подставляются автоматически.' },
              fields: [
                { name: 'heading', type: 'text', required: true, label: 'Название типа' },
                { name: 'text', type: 'textarea', required: true, label: 'Описание' },
                { name: 'ctaText', type: 'text', label: 'Кнопка — текст', admin: { description: 'Напр. «Каталог →».' } },
                { name: 'ctaLink', type: 'text', label: 'Кнопка — ссылка', admin: { description: 'Напр. /catalog.' } },
              ],
            },
          ],
        },
        {
          label: 'CTA внизу',
          fields: [
            { name: 'ctaSubtitle', type: 'text', label: 'Надзаголовок', admin: { description: 'Напр. «Поговорим».' } },
            { name: 'ctaHeadingLine1', type: 'text', label: 'Заголовок, строка 1' },
            { name: 'ctaHeadingLine2', type: 'text', label: 'Заголовок, строка 2' },
            { name: 'ctaBtnText', type: 'text', label: 'Кнопка — текст' },
            { name: 'ctaBtnLink', type: 'text', label: 'Кнопка — ссылка' },
          ],
        },
      ],
    },
  ],
}
