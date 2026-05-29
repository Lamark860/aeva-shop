import type { CollectionConfig } from 'payload'

// Загруженные изображения (фото изделий, галерея). Файлы лежат в MEDIA_DIR
// (в Docker — том /app/media). Публичны на чтение.
//
// Обработка при upload:
//  - original: ужимается до 2400px по большей стороне (избыточные мегапиксели не нужны)
//              и пересохраняется как jpeg q=82 — EXIF выкидывается (withMetadata default false),
//              EXIF-orientation Payload применяет автоматически через sharp.rotate()
//  - imageSizes: thumbnail / card / large — для разных контекстов на сайте.
//    Payload автогенерит файлы и заполняет doc.sizes.{name}.url
export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: {
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: ['image/*'],
    // original — максимум 2400px по большей стороне, fit:inside, не апскейлим
    resizeOptions: { width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true },
    // single jpeg формат, ~82% качества — стандартный sweet spot для веба
    formatOptions: { format: 'jpeg', options: { quality: 82, mozjpeg: true } },
    // EXIF не приклеивается обратно (default false) — метаданные с фотоаппарата уходят
    withMetadata: false,
    // focal point для будущей точечной обрезки в админке
    focalPoint: true,
    imageSizes: [
      // миниатюра для админки (список изделий) и быстрых превью
      { name: 'thumbnail', width: 400, height: 400, fit: 'cover',
        formatOptions: { format: 'jpeg', options: { quality: 80, mozjpeg: true } } },
      // карточки каталога / featured
      { name: 'card', width: 900, height: 900, fit: 'inside', withoutEnlargement: true,
        formatOptions: { format: 'jpeg', options: { quality: 82, mozjpeg: true } } },
      // главная фотография на странице товара (ProductGallery main)
      { name: 'large', width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true,
        formatOptions: { format: 'jpeg', options: { quality: 84, mozjpeg: true } } },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', label: 'Описание (alt)' },
  ],
}
