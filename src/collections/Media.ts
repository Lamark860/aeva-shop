import type { CollectionConfig } from 'payload'

// Загруженные изображения (фото изделий, галерея). Файлы лежат в MEDIA_DIR
// (в Docker — том /app/media). Публичны на чтение.
export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: {
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: ['image/*'],
  },
  fields: [
    { name: 'alt', type: 'text', label: 'Описание (alt)' },
  ],
}
