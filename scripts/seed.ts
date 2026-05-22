import { getPayload, type CollectionSlug } from 'payload'
import config from '@payload-config'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const seed = JSON.parse(readFileSync(join(__dirname, '../src/data/seed.json'), 'utf-8'))

const payload = await getPayload({ config })

async function findOne(collection: CollectionSlug, where: Record<string, any>) {
  const { docs } = await payload.find({ collection, where, limit: 1 })
  return docs[0] ?? null
}

// --- admin user ---
const users = await payload.find({ collection: 'users', limit: 1 })
if (users.totalDocs === 0) {
  await payload.create({ collection: 'users', data: { email: 'admin@ceramic.local', password: 'ceramic123' } })
  console.log('✓ admin создан: admin@ceramic.local / ceramic123')
} else {
  console.log('· admin уже есть')
}

// --- categories ---
const catMap: Record<string, any> = {}
for (const c of seed.categories) {
  const existing = await findOne('categories', { slug: { equals: c.slug } })
  catMap[c.name] = existing?.id ?? (await payload.create({ collection: 'categories', data: c })).id
}
console.log(`✓ categories: ${Object.keys(catMap).length}`)

// --- products ---
let pCount = 0
for (const p of seed.products) {
  if (await findOne('products', { slug: { equals: p.slug } })) continue
  await payload.create({
    collection: 'products',
    data: {
      name: p.name, slug: p.slug, description: p.description, short_description: p.short_description,
      price: p.price, category: catMap[p.category], images: p.images.map((url: string) => ({ url })),
      featured: !!p.featured, sort_order: p.sort_order ?? 0,
    },
  })
  pCount++
}
console.log(`✓ products: +${pCount}`)

// --- gallery ---
let gCount = 0
for (const g of seed.gallery) {
  if (await findOne('gallery', { title: { equals: g.title } })) continue
  await payload.create({ collection: 'gallery', data: g })
  gCount++
}
console.log(`✓ gallery: +${gCount}`)

console.log('\n✅ Seed готов. Админка: http://localhost:3000/admin')
process.exit(0)
