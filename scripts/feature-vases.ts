import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const FEATURED_SLUGS = ['vaza-black-oil', 'vaza-loni', 'vaza-mramor', 'vaza-aria']

for (const slug of FEATURED_SLUGS) {
  const { docs } = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1 })
  if (!docs[0]) {
    console.warn(`! не найдено: ${slug}`)
    continue
  }
  await payload.update({ collection: 'products', id: docs[0].id, data: { featured: true } })
  console.log(`★ ${slug} → featured=true`)
}

console.log('\n✅ Готово.')
process.exit(0)
