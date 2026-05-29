import type { GlobalConfig } from 'payload'
import { safeRevalidate } from '../lib/revalidate'

// Страница «Ресторанам». Форма (поля и валидация) — в actions.ts, не редактируется.
// Кейсы тянутся из коллекции Projects (featured=true) — заголовок секции редактируется здесь.
export const HorecaPage: GlobalConfig = {
  slug: 'horeca-page',
  label: 'Страница «Ресторанам»',
  access: { read: () => true },
  hooks: { afterChange: [() => { safeRevalidate('/horeca') }] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'heroBgPhoto', type: 'upload', relationTo: 'media', label: 'Фон (загруженное)' },
            { name: 'heroBgUrl', type: 'text', label: 'Фон по URL (запасной)' },
            { name: 'heroMeta', type: 'text', label: 'Метка над заголовком', admin: { description: 'Напр. «Для ресторанов и кафе».' } },
            { name: 'heroTitle', type: 'text', label: 'Заголовок' },
            { name: 'heroLead', type: 'textarea', label: 'Лид' },
            { name: 'heroBtnText', type: 'text', label: 'Кнопка — текст' },
          ],
        },
        {
          label: 'Метрики',
          description: 'Четыре крупные цифры/слова в первой секции. Можно писать диапазоны: «50–500», «12+», «Шамот».',
          fields: [
            {
              name: 'metrics', type: 'array', label: 'Метрики',
              labels: { singular: 'Метрика', plural: 'Метрики' },
              maxRows: 6,
              fields: [
                { name: 'value', type: 'text', required: true, label: 'Значение', admin: { description: 'Напр.: «12+», «50–500», «8–14», «Шамот».' } },
                { name: 'label', type: 'text', required: true, label: 'Подпись', admin: { description: 'Напр.: «заведений по России».' } },
              ],
            },
          ],
        },
        {
          label: 'Кейсы',
          description: 'Кейсы берутся из коллекции «Проекты» (с галочкой «featured»). Здесь — только заголовки секции.',
          fields: [
            { name: 'casesSubtitle', type: 'text', label: 'Надзаголовок', admin: { description: 'Напр. «Кейсы».' } },
            { name: 'casesHeading', type: 'text', label: 'Заголовок секции' },
          ],
        },
        {
          label: 'Процесс',
          fields: [
            { name: 'processSubtitle', type: 'text', label: 'Надзаголовок', admin: { description: 'Напр. «Как работаем».' } },
            { name: 'processHeading', type: 'text', label: 'Заголовок секции' },
            {
              name: 'steps', type: 'array', label: 'Этапы',
              labels: { singular: 'Этап', plural: 'Этапы' },
              admin: { description: 'Номера 01, 02, … автоматические по порядку.' },
              fields: [
                { name: 'heading', type: 'text', required: true, label: 'Название этапа' },
                { name: 'text', type: 'textarea', required: true, label: 'Описание этапа' },
              ],
            },
          ],
        },
        {
          label: 'Над формой',
          fields: [
            { name: 'formSubtitle', type: 'text', label: 'Надзаголовок', admin: { description: 'Напр. «Расскажите о проекте».' } },
            { name: 'formHeading', type: 'text', label: 'Заголовок' },
            { name: 'formLead', type: 'textarea', label: 'Лид над формой' },
            { name: 'formBtnText', type: 'text', label: 'Кнопка отправки' },
          ],
        },
      ],
    },
  ],
}
