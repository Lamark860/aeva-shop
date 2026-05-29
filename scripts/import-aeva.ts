// Импорт контента, собранного с shop-aeva.ru, в Payload.
// Запуск: docker compose -f docker-compose.dev.yml exec app npm run import:aeva
//
// Идемпотентность по slug:
//  - Category: создаётся если нет
//  - Media: переиспользуется по полю `alt` (мы кладём туда aeva-{slug}-{idx}),
//    иначе создаётся (file читается с диска)
//  - Product: пропускается если уже есть с таким slug. Если хочется перезалить —
//    удалить запись в админке.
//
// Структура данных:
//   imports/aeva/vases.json    — массив { slug, name, price, description, sizes, images, sourceUrl }
//   imports/aeva/photos/{slug}/{idx}.{jpg|png}  — фото
import { getPayload } from 'payload'
import config from '@payload-config'
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, extname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMPORTS_DIR = join(__dirname, '../imports/aeva')
const VASES_JSON = join(IMPORTS_DIR, 'vases.json')
const TABLEWARE_JSON = join(IMPORTS_DIR, 'tableware.json')
const PHOTOS_DIR = join(IMPORTS_DIR, 'photos')

type ImportedProduct = {
  slug: string
  name: string
  price: number | null
  description?: string
  // aeva отдаёт разные комбинации: чаще height+diameter+weight, иногда width/depth/neckDiameter,
  // числа — могут быть number (см) или string. Адаптируем в normalizeSizes ниже.
  sizes?: Record<string, number | string | undefined>
  images?: string[]          // оригинальные URLы (не используются — фото берём из локальных файлов)
  sourceUrl?: string
}

// Нормализация полей размеров в три текстовых поля Payload (height/diameter/volume).
// «Лишние» данные (вес, толщина горла) уходят в текстовое поле height/volume как пометки.
function normalizeSizes(s?: ImportedProduct['sizes']): { height?: string; diameter?: string; volume?: string } | undefined {
  if (!s) return undefined
  const cm = (v: any): string | undefined => {
    if (v == null) return undefined
    if (typeof v === 'number') {
      // эвристика: >50 — миллиметры (как width:500), иначе сантиметры
      return v > 50 ? `${v / 10} см` : `${v} см`
    }
    const str = String(v).trim()
    if (!str) return undefined
    return /см|мм|cm|mm/i.test(str) ? str : str + ' см'
  }
  const h = cm(s.height)
  const d = cm(s.diameter) || cm(s.width)
  const extras: string[] = []
  if (s.depth)         extras.push(`глубина ${cm(s.depth)}`)
  if (s.neckDiameter)  extras.push(`горло ${cm(s.neckDiameter)}`)
  if (s.weight)        extras.push(`вес ${typeof s.weight === 'number' ? s.weight + ' г' : s.weight}`)
  if (s.volume && !extras.includes(`объём ${cm(s.volume)}`)) extras.push(`объём ${cm(s.volume)}`)
  const volumeLine = extras.length ? extras.join(' · ') : undefined
  if (!h && !d && !volumeLine) return undefined
  return { height: h, diameter: d, volume: volumeLine }
}

const payload = await getPayload({ config })

async function findOne(collection: string, where: Record<string, any>) {
  const { docs } = await payload.find({ collection: collection as any, where, limit: 1 })
  return docs[0] ?? null
}

// Создание/получение категории по slug
async function ensureCategory(slug: string, name: string, sortOrder = 0): Promise<number> {
  const existing = await findOne('categories', { slug: { equals: slug } })
  if (existing) return existing.id as number
  const created = await payload.create({
    collection: 'categories',
    data: { slug, name, sort_order: sortOrder } as any,
  })
  return created.id as number
}

// Заливка фото из локального файла, идемпотентная по alt
async function uploadPhoto(filePath: string, altKey: string): Promise<number | null> {
  const existing = await findOne('media', { alt: { equals: altKey } })
  if (existing) return existing.id as number
  if (!existsSync(filePath)) {
    console.warn(`  ⚠ нет файла: ${filePath}`)
    return null
  }
  const stat = statSync(filePath)
  if (!stat.isFile() || stat.size === 0) {
    console.warn(`  ⚠ пустой/не-файл: ${filePath}`)
    return null
  }
  const buffer = readFileSync(filePath)
  const ext = extname(filePath).toLowerCase().replace('.', '') || 'jpg'
  const mimetype = ext === 'png' ? 'image/png' : 'image/jpeg'
  const filename = altKey.replace(/[^a-z0-9_-]/gi, '_') + '.' + ext
  const doc = await payload.create({
    collection: 'media',
    data: { alt: altKey } as any,
    file: { data: buffer, mimetype, name: filename, size: stat.size } as any,
  })
  return doc.id as number
}

function readJsonArray(path: string): ImportedProduct[] {
  if (!existsSync(path)) return []
  try {
    const raw = JSON.parse(readFileSync(path, 'utf-8'))
    return Array.isArray(raw) ? raw : []
  } catch (e) {
    console.warn(`⚠ не разобрал ${path}: ${(e as Error).message}`)
    return []
  }
}

async function importBatch(items: ImportedProduct[], categoryId: number, batchLabel: string) {
  console.log(`\n— ${batchLabel}: ${items.length} наименований —`)
  let created = 0, skipped = 0
  for (let i = 0; i < items.length; i++) {
    const p = items[i]
    if (!p.slug || !p.name) { console.warn(`  ⚠ пропуск без slug/name`, p); continue }
    if (await findOne('products', { slug: { equals: p.slug } })) {
      skipped++; continue
    }

    // фото
    const photoDir = join(PHOTOS_DIR, p.slug)
    const photoIds: number[] = []
    if (existsSync(photoDir)) {
      const files = readdirSync(photoDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort()
      for (let j = 0; j < files.length; j++) {
        const id = await uploadPhoto(join(photoDir, files[j]), `aeva-${p.slug}-${j}`)
        if (id) photoIds.push(id)
      }
    }

    const sizes = normalizeSizes(p.sizes)

    await payload.create({
      collection: 'products',
      data: {
        name: p.name,
        slug: p.slug,
        price: p.price ?? 0,
        category: categoryId,
        description: '',                          // короткие характеристики (пусто — не было на aeva)
        story: p.description || undefined,        // художественное описание идёт в «История изделия»
        sizes,
        photos: photoIds.length ? photoIds : undefined,
        inStock: false,                           // все на aeva сейчас «нет в наличии»
        sort_order: i,
      } as any,
    })
    created++
    console.log(`  ✓ ${p.slug}  (${photoIds.length} фото)`)
  }
  console.log(`— ${batchLabel}: создано ${created}, пропущено (уже есть) ${skipped}`)
}

// === Pages (about/delivery/contacts из соотв. JSON) =========================
type PageInput = { title: string; subtitle?: string; body: string }

async function ensurePage(slug: string, file: string, defaultTitle: string) {
  const path = join(IMPORTS_DIR, file)
  if (!existsSync(path)) { console.log(`· ${file} нет — пропускаю Pages/${slug}`); return }
  let data: PageInput
  try {
    const raw = JSON.parse(readFileSync(path, 'utf-8'))
    data = { title: raw.title || defaultTitle, subtitle: raw.subtitle, body: raw.body || '' }
  } catch (e) {
    console.warn(`⚠ ${file} не разобран: ${(e as Error).message}`); return
  }
  const existing = await findOne('pages', { slug: { equals: slug } })
  if (existing) {
    await payload.update({ collection: 'pages', id: existing.id, data: data as any })
    console.log(`  ✓ pages/${slug} обновлена`)
  } else {
    await payload.create({ collection: 'pages', data: { slug, ...data } as any })
    console.log(`  ✓ pages/${slug} создана`)
  }
}

// === About-портреты (фото из /photos/_about → в Media для использования в /about) ===
async function importAboutPhotos() {
  const dir = join(PHOTOS_DIR, '_about')
  if (!existsSync(dir)) { console.log('· нет _about фото — пропускаю'); return }
  const files = readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort()
  if (!files.length) return
  console.log(`\n— About: ${files.length} фото —`)
  for (let i = 0; i < files.length; i++) {
    const id = await uploadPhoto(join(dir, files[i]), `aeva-about-${i}`)
    if (id) console.log(`  ✓ aeva-about-${i} (Media #${id})`)
  }
}

// === Hero (фото из hero.json → в Media + рекомендация Homepage global) ======
async function importHero() {
  const heroDir = join(PHOTOS_DIR, '_hero')
  if (!existsSync(heroDir)) { console.log('· нет _hero фото — пропускаю'); return }
  const files = readdirSync(heroDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort()
  if (!files.length) return
  console.log(`\n— Hero: ${files.length} фото —`)
  const ids: number[] = []
  for (let i = 0; i < files.length; i++) {
    const id = await uploadPhoto(join(heroDir, files[i]), `aeva-hero-${i}`)
    if (id) ids.push(id)
  }
  if (ids.length === 0) return
  // Подставляем первое фото в Homepage global как heroPhoto (если поле есть)
  try {
    const hp: any = await payload.findGlobal({ slug: 'homepage' })
    await payload.updateGlobal({ slug: 'homepage', data: { ...hp, heroPhoto: ids[0] } as any })
    console.log(`  ✓ homepage.heroPhoto ← Media #${ids[0]}`)
  } catch (e) {
    console.log(`  · homepage не обновлён (поле heroPhoto?): ${(e as Error).message}`)
  }
}

// === основной поток ========================================================
const vasy = readJsonArray(VASES_JSON)
const tableware = readJsonArray(TABLEWARE_JSON)

if (vasy.length === 0 && tableware.length === 0 && !existsSync(join(IMPORTS_DIR, 'about.json'))) {
  console.error(`⨯ Не найдено импорт-файлов в ${IMPORTS_DIR}`)
  process.exit(1)
}

const vasyCatId = await ensureCategory('vazy', 'Вазы', 10)
const tablewareCatId = await ensureCategory('posuda', 'Посуда', 20)

if (vasy.length) await importBatch(vasy, vasyCatId, 'Вазы')
if (tableware.length) await importBatch(tableware, tablewareCatId, 'Посуда')

console.log('\n— Pages —')
await ensurePage('about', 'about.json', 'Обо мне')
await ensurePage('delivery', 'delivery.json', 'Доставка')
await ensurePage('contacts', 'contacts.json', 'Контакты')

await importAboutPhotos()
await importHero()

console.log('\n✅ Импорт завершён.')
process.exit(0)
