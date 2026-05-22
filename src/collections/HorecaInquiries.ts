import type { CollectionConfig } from 'payload'
import { notifyNewHoreca } from '../lib/notify'

// B2B-заявки от ресторанов/кафе (форма на /horeca). Отдельный track от обычных заказов.
export const HorecaInquiries: CollectionConfig = {
  slug: 'horeca-inquiries',
  labels: { singular: 'HoReCa-заявка', plural: 'HoReCa-заявки' },
  admin: {
    useAsTitle: 'venueName',
    defaultColumns: ['venueName', 'city', 'name', 'status', 'createdAt'],
    description: 'Заявки от заведений (рестораны, кафе, бары).',
  },
  access: {
    create: () => true, // публичная форма
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return
        await notifyNewHoreca({
          venueName: doc.venueName,
          city: doc.city,
          name: doc.name,
          email: doc.email,
          phone: doc.phone,
          position: doc.position,
          projectType: doc.projectType,
          batchSize: doc.batchSize,
          timeline: doc.timeline,
          conceptDescription: doc.conceptDescription,
        })
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Заявка',
          fields: [
            { name: 'venueName', type: 'text', required: true, label: 'Заведение' },
            { name: 'city', type: 'text', label: 'Город' },
            { name: 'name', type: 'text', required: true, label: 'Контактное лицо' },
            { name: 'position', type: 'text', label: 'Должность', admin: { description: 'Шеф, бренд-шеф, закупщик…' } },
            { name: 'email', type: 'email', required: true, label: 'Email' },
            { name: 'phone', type: 'text', label: 'Телефон / Telegram' },
            {
              name: 'projectType', type: 'select', label: 'Тип проекта',
              options: [
                { label: 'Новое заведение, открытие', value: 'new' },
                { label: 'Обновление концепции', value: 'update' },
                { label: 'Расширение действующего набора', value: 'expand' },
                { label: 'Пока разведка', value: 'scouting' },
              ],
            },
            {
              name: 'batchSize', type: 'select', label: 'Ориентир по партии',
              options: [
                { label: 'до 50 единиц', value: 'lt50' },
                { label: '50–150', value: '50_150' },
                { label: '150–300', value: '150_300' },
                { label: '300+', value: 'gt300' },
                { label: 'Пока не знаю', value: 'unknown' },
              ],
            },
            {
              name: 'timeline', type: 'select', label: 'К какому сроку',
              options: [
                { label: 'не срочно', value: 'flexible' },
                { label: 'в течение квартала', value: 'quarter' },
                { label: 'к открытию', value: 'opening' },
                { label: 'обсудим', value: 'discuss' },
              ],
            },
            { name: 'conceptDescription', type: 'textarea', label: 'Концепция или меню', admin: { description: 'Тейстинг, фарм-ту-тэйбл, японский бар…' } },
          ],
        },
        {
          label: 'Обработка',
          fields: [
            {
              name: 'status', type: 'select', defaultValue: 'new', label: 'Статус',
              options: [
                { label: 'Новая', value: 'new' },
                { label: 'В работе', value: 'in-progress' },
                { label: 'Обработана', value: 'done' },
              ],
            },
            {
              name: 'internalNote', type: 'textarea', label: 'Моя заметка (только для меня)',
              admin: { description: 'Клиент это не увидит. Например: позвонить в пятницу, прислать кейс Norra.' },
              access: { read: ({ req }) => !!req.user },
            },
          ],
        },
      ],
    },
  ],
}
