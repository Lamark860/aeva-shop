import type { CollectionConfig } from 'payload'
import { notifyNewOrder } from '../lib/notify'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: { singular: 'Заявка', plural: 'Заявки' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'type', 'status', 'createdAt'],
    description: 'Заявки на индивидуальный заказ с формы сайта.',
    components: {
      views: {
        list: { Component: '@/admin/OrdersListView' },
      },
    },
  },
  access: {
    create: () => true, // форма заявки — публичная
    read: ({ req }) => !!req.user, // читать только в админке
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    // Уведомление только при создании заявки (не при смене статуса в админке).
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        let product: string | undefined
        if (doc.product) {
          try {
            const p = await req.payload.findByID({ collection: 'products', id: doc.product, depth: 0 })
            product = p?.name
          } catch {
            /* товар мог быть удалён — не критично */
          }
        }
        await notifyNewOrder({ name: doc.name, email: doc.email, phone: doc.phone, message: doc.message, product })
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
            { name: 'name', type: 'text', required: true, label: 'Имя' },
            { name: 'email', type: 'email', required: true, label: 'Email' },
            { name: 'phone', type: 'text', label: 'Телефон / Telegram' },
            { name: 'product', type: 'relationship', relationTo: 'products', label: 'Изделие (если по конкретному товару)' },
            {
              name: 'type', type: 'select', label: 'Что хотят заказать',
              options: [
                { label: 'Ваза', value: 'vase' },
                { label: 'Чаша', value: 'bowl' },
                { label: 'Тарелка / Блюдо', value: 'plate' },
                { label: 'Кружка', value: 'mug' },
                { label: 'Набор', value: 'set' },
                { label: 'Декор', value: 'decor' },
                { label: 'Что-то другое', value: 'other' },
              ],
            },
            {
              name: 'purpose', type: 'select', label: 'Назначение',
              options: [
                { label: 'Для себя', value: 'self' },
                { label: 'Подарок', value: 'gift' },
                { label: 'Интерьер', value: 'interior' },
                { label: 'Не уверен(а)', value: 'unsure' },
              ],
            },
            {
              name: 'deadline', type: 'select', label: 'К какому сроку',
              options: [
                { label: 'не срочно', value: 'flexible' },
                { label: 'в течение месяца', value: 'month' },
                { label: 'к конкретной дате', value: 'date' },
                { label: 'обсудим', value: 'discuss' },
              ],
            },
            {
              name: 'budget', type: 'select', label: 'Ориентир по бюджету',
              options: [
                { label: 'до 3 000 ₽', value: 'lt3k' },
                { label: '3 000 – 7 000 ₽', value: '3k_7k' },
                { label: '7 000 – 15 000 ₽', value: '7k_15k' },
                { label: '15 000+ ₽', value: 'gt15k' },
                { label: 'Пока не знаю', value: 'unknown' },
              ],
            },
            { name: 'referenceLink', type: 'text', label: 'Ссылка на референс', admin: { description: 'Фото в Instagram, Pinterest и т.п.' } },
            { name: 'message', type: 'textarea', required: true, label: 'Опишите, что хотелось бы' },
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
              admin: { description: 'Клиент это не увидит. Например: позвонить в субботу, переслать ссылку на похожее.' },
              access: { read: ({ req }) => !!req.user },
            },
          ],
        },
      ],
    },
  ],
}
