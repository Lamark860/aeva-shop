import type { CollectionConfig } from 'payload'
import { safeRevalidate } from '../lib/revalidate'
import { slugField } from '../lib/slugify'

// slug → пути, которые надо пересобрать. Известные slug'и подменяют /pages/[slug]
// своим маршрутом верхнего уровня (страница рендерит контент через getPageBySlug).
const KNOWN_PAGE_ROUTES: Record<string, string[]> = {
  about: ['/about'],
  care: ['/care'],
  horeca: ['/horeca'],
}
function pathsForSlug(slug: string | undefined): string[] {
  if (!slug) return []
  return KNOWN_PAGE_ROUTES[slug] ?? ['/pages/' + slug]
}

// Редактируемые из админки текстовые страницы: /pages/[slug].
// Используем для «Доставка», «Контакты», вариант — «Обо мне» если хочется
// иметь несколько версий, FAQ и пр. Тело — простой textarea (markdown-like),
// абзацы разбиваются по пустой строке. Если потребуется rich-text — заменим на lexical.
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Страница', plural: 'Страницы' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Свободные текстовые страницы (доставка, контакты и т.п.).',
  },
  access: { read: () => true },
  // некоторые slug'и не показываются на /pages/[slug], а используются как источник
  // данных для отдельных маршрутов: 'about' → /about, 'care' → /care, 'horeca' → /horeca.
  // Сбрасываем оба варианта — лишний revalidatePath дешевле, чем устаревший контент.
  hooks: {
    afterChange: [({ doc }) => { safeRevalidate(...pathsForSlug(doc.slug)) }],
    afterDelete: [({ doc }) => { safeRevalidate(...pathsForSlug((doc as any)?.slug)) }],
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Заголовок' },
    slugField('title'),
    {
      name: 'subtitle', type: 'text', label: 'Подзаголовок',
      admin: { description: 'Маленький текст под заголовком. Опционально.' },
    },
    {
      name: 'body', type: 'textarea', required: true, label: 'Текст',
      admin: { description: 'Абзацы разделять пустой строкой. URL-ы превратятся в ссылки автоматически.' },
    },
  ],
}
