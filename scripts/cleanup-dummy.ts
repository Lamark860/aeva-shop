import { getPayload, type CollectionSlug } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const PRODUCT_SLUGS = [
  'chasha-rassvet', 'vaza-tishina', 'tarelka-zemlya', 'kruzhka-utro',
  'podsvechnik-vecher', 'piala-meditaciya', 'vaza-potok', 'nabor-semya',
  'blyudo-okean',
]

const PROJECT_SLUGS = ['norra', 'tihoe-utro', 'semeyniy-serviz']

const GALLERY_TITLES = [
  'Мастерская', 'Гончарный круг', 'Глазурование', 'Детали', 'Текстуры',
  'Коллекция', 'Руки мастера', 'Инструменты', 'Обжиг',
]

async function deleteBy(collection: CollectionSlug, field: string, values: string[]) {
  let removed = 0
  for (const v of values) {
    const { docs } = await payload.find({ collection, where: { [field]: { equals: v } }, limit: 10 })
    for (const d of docs) {
      await payload.delete({ collection, id: d.id })
      removed++
    }
  }
  return removed
}

const p = await deleteBy('products', 'slug', PRODUCT_SLUGS)
console.log(`✓ products удалено: ${p}`)

const pr = await deleteBy('projects', 'slug', PROJECT_SLUGS)
console.log(`✓ projects удалено: ${pr}`)

const g = await deleteBy('gallery', 'title', GALLERY_TITLES)
console.log(`✓ gallery удалено: ${g}`)

console.log('\n✅ Очистка завершена.')
process.exit(0)
