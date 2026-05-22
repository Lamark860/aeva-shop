import type { GlobalConfig } from 'payload'
import { safeRevalidate } from '../lib/revalidate'

// Изображение: загруженное (приоритет) + URL-запасной — паттерн как в Gallery/Products.
// prefix='' даёт поля photo/image (для array-секций со своей областью имён);
// иначе — <prefix>Photo/<prefix>Image, чтобы поля верхнего уровня не конфликтовали.
const imagePair = (label: string, prefix = '') => {
  const photo = prefix ? `${prefix}Photo` : 'photo'
  const image = prefix ? `${prefix}Image` : 'image'
  return [
    { name: photo, type: 'upload' as const, relationTo: 'media' as const, label: `${label} (загруженное)`, admin: { description: 'Приоритетно над URL ниже' } },
    { name: image, type: 'text' as const, label: `${label} по URL (запасной / демо)` },
  ]
}

// Редактируемая главная. Все поля опциональны: пустые подменяются дефолтами в getHomepage().
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Главная страница',
  access: { read: () => true },
  // правки контента главной отражаются сразу
  hooks: { afterChange: [() => { safeRevalidate('/') }] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            ...imagePair('Фон', 'hero'),
            { name: 'titleLine1', type: 'text', label: 'Заголовок, строка 1' },
            { name: 'titleLine2', type: 'text', label: 'Заголовок, строка 2' },
            { name: 'primaryBtnText', type: 'text', label: 'Кнопка (основная) — текст' },
            { name: 'primaryBtnLink', type: 'text', label: 'Кнопка (основная) — ссылка' },
            { name: 'outlineBtnText', type: 'text', label: 'Кнопка (контур) — текст' },
            { name: 'outlineBtnLink', type: 'text', label: 'Кнопка (контур) — ссылка' },
          ],
        },
        {
          label: 'Коллекция',
          description: 'Заголовки секции. Товары подтягиваются из коллекции Products.',
          fields: [
            { name: 'collectionSubtitle', type: 'text', label: 'Надзаголовок' },
            { name: 'collectionHeading', type: 'text', label: 'Заголовок' },
          ],
        },
        {
          label: 'О мастере',
          fields: [
            ...imagePair('Фото мастера', 'about'),
            { name: 'aboutSubtitle', type: 'text', label: 'Надзаголовок' },
            { name: 'aboutHeadingLine1', type: 'text', label: 'Заголовок, строка 1' },
            { name: 'aboutHeadingLine2', type: 'text', label: 'Заголовок, строка 2' },
            {
              name: 'aboutParagraphs', type: 'array', label: 'Абзацы текста',
              labels: { singular: 'Абзац', plural: 'Абзацы' },
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
            { name: 'aboutCtaText', type: 'text', label: 'Кнопка — текст' },
            { name: 'aboutCtaLink', type: 'text', label: 'Кнопка — ссылка' },
          ],
        },
        {
          label: 'Процесс',
          fields: [
            { name: 'processSubtitle', type: 'text', label: 'Надзаголовок' },
            { name: 'processHeading', type: 'text', label: 'Заголовок' },
            {
              name: 'processSteps', type: 'array', label: 'Этапы',
              labels: { singular: 'Этап', plural: 'Этапы' },
              fields: [
                { name: 'label', type: 'text', required: true, label: 'Название этапа' },
                ...imagePair('Фото'),
              ],
            },
          ],
        },
        {
          label: 'Популярное',
          description: 'Заголовки секции. Изделия — из Products с галочкой «featured».',
          fields: [
            { name: 'popularSubtitle', type: 'text', label: 'Надзаголовок' },
            { name: 'popularHeading', type: 'text', label: 'Заголовок' },
            { name: 'popularCtaText', type: 'text', label: 'Кнопка — текст' },
            { name: 'popularCtaLink', type: 'text', label: 'Кнопка — ссылка' },
          ],
        },
        {
          label: 'Атмосфера',
          fields: [
            ...imagePair('Фон', 'atmospheric'),
            { name: 'atmosphericText', type: 'text', label: 'Текст по центру' },
          ],
        },
        {
          label: 'Галерея',
          description: 'Заголовки секции. Изображения — из коллекции Gallery.',
          fields: [
            { name: 'gallerySubtitle', type: 'text', label: 'Надзаголовок' },
            { name: 'galleryHeading', type: 'text', label: 'Заголовок' },
          ],
        },
        {
          label: 'CTA',
          fields: [
            { name: 'ctaSubtitle', type: 'text', label: 'Надзаголовок' },
            { name: 'ctaHeading', type: 'text', label: 'Заголовок' },
            { name: 'ctaBtnText', type: 'text', label: 'Кнопка — текст' },
            { name: 'ctaBtnLink', type: 'text', label: 'Кнопка — ссылка' },
          ],
        },
        {
          label: 'Instagram',
          fields: [
            { name: 'instaSubtitle', type: 'text', label: 'Надзаголовок' },
            { name: 'instaHeading', type: 'text', label: 'Заголовок' },
            {
              name: 'instaImages', type: 'array', label: 'Изображения',
              labels: { singular: 'Изображение', plural: 'Изображения' },
              fields: imagePair('Фото'),
            },
          ],
        },
      ],
    },
  ],
}
