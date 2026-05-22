// Слой данных через Payload Local API (без HTTP — прямой вызов в том же процессе).
import { getPayload } from 'payload'
import config from '@payload-config'

export interface Category { name: string; slug: string; description?: string; image?: string }
export interface ProductSizes { height?: string; diameter?: string; volume?: string }
export interface Product {
  name: string; slug: string; description: string; short_description?: string
  price: number; category: string; categorySlug?: string; images: string[]; featured?: boolean
  sizes?: ProductSizes; material?: string; story?: string; care?: string
}
export interface GalleryItem { title: string; image: string; size?: 'normal' | 'wide' | 'tall' }

export interface ProjectFact { key: string; value: string }
export interface Project {
  slug: string; title: string; year?: string; type: string; typeLabel: string
  subtitle?: string; description?: string; image: string; gallery: string[]
  facts: ProjectFact[]; quote?: string; quoteAuthor?: string; featured?: boolean
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  restaurant: 'Для ресторана', private: 'Частный заказ', collection: 'Авторская коллекция', cafe: 'Для кафе',
}

export interface Homepage {
  hero: { bg: string; titleLine1: string; titleLine2: string; primaryBtnText: string; primaryBtnLink: string; outlineBtnText: string; outlineBtnLink: string }
  collection: { subtitle: string; heading: string }
  about: { image: string; subtitle: string; headingLine1: string; headingLine2: string; paragraphs: string[]; ctaText: string; ctaLink: string }
  process: { subtitle: string; heading: string; steps: { label: string; image: string }[] }
  popular: { subtitle: string; heading: string; ctaText: string; ctaLink: string }
  atmospheric: { bg: string; text: string }
  gallery: { subtitle: string; heading: string }
  cta: { subtitle: string; heading: string; btnText: string; btnLink: string }
  insta: { subtitle: string; heading: string; images: string[] }
}

async function client() { return await getPayload({ config }) }

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}
export function mainImage(p: Product): string { return p.images?.[0] ?? '' }

function mapProduct(doc: any): Product {
  // приоритет — загруженные фото (Media), иначе URL-ссылки (демо/fallback)
  const uploaded = Array.isArray(doc.photos)
    ? doc.photos.map((m: any) => (typeof m === 'object' ? m?.url : null)).filter(Boolean)
    : []
  const urls = Array.isArray(doc.images) ? doc.images.map((i: any) => i.url).filter(Boolean) : []
  const cat = typeof doc.category === 'object' && doc.category ? doc.category : null
  const sizes = doc.sizes && (doc.sizes.height || doc.sizes.diameter || doc.sizes.volume)
    ? { height: doc.sizes.height || undefined, diameter: doc.sizes.diameter || undefined, volume: doc.sizes.volume || undefined }
    : undefined
  return {
    name: doc.name, slug: doc.slug, description: doc.description ?? '',
    short_description: doc.short_description, price: doc.price,
    category: cat ? cat.name : '',
    categorySlug: cat ? cat.slug : undefined,
    images: uploaded.length ? uploaded : urls,
    featured: !!doc.featured,
    sizes, material: doc.material || undefined, story: doc.story || undefined, care: doc.care || undefined,
  }
}

function mapProject(doc: any): Project {
  const main = (typeof doc.mainPhoto === 'object' && doc.mainPhoto?.url) ? doc.mainPhoto.url : (doc.mainImage || '')
  const gallery = Array.isArray(doc.gallery)
    ? doc.gallery.map((g: any) => (typeof g.photo === 'object' && g.photo?.url ? g.photo.url : g.image)).filter(Boolean)
    : []
  const facts = Array.isArray(doc.facts)
    ? doc.facts.map((f: any) => ({ key: f.key, value: f.value })).filter((f: any) => f.key && f.value)
    : []
  return {
    slug: doc.slug, title: doc.title, year: doc.year || undefined,
    type: doc.type, typeLabel: PROJECT_TYPE_LABELS[doc.type] ?? doc.type,
    subtitle: doc.subtitle || undefined, description: doc.description || undefined,
    image: main, gallery, facts,
    quote: doc.quote || undefined, quoteAuthor: doc.quoteAuthor || undefined,
    featured: !!doc.featured,
  }
}

export async function getCategories(): Promise<Category[]> {
  const payload = await client()
  const { docs } = await payload.find({ collection: 'categories', sort: 'sort_order', limit: 100 })
  return docs.map((d: any) => ({ name: d.name, slug: d.slug, description: d.description, image: d.image }))
}

export async function getProducts(opts: { categorySlug?: string; featured?: boolean; limit?: number } = {}): Promise<Product[]> {
  const payload = await client()
  const where: any = {}
  if (opts.featured) where.featured = { equals: true }
  if (opts.categorySlug) where['category.slug'] = { equals: opts.categorySlug }
  const { docs } = await payload.find({
    collection: 'products', sort: 'sort_order', depth: 1, where,
    limit: opts.limit ?? 100,
  })
  return docs.map(mapProduct)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const payload = await client()
  const { docs } = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, depth: 1, limit: 1 })
  return docs[0] ? mapProduct(docs[0]) : null
}

export async function getGallery(limit?: number): Promise<GalleryItem[]> {
  const payload = await client()
  const { docs } = await payload.find({ collection: 'gallery', sort: 'sort_order', depth: 1, limit: limit ?? 100 })
  return docs.map((d: any) => ({
    title: d.title,
    image: (typeof d.photo === 'object' && d.photo?.url) ? d.photo.url : d.image,
    size: d.size,
  }))
}

export async function createOrder(data: { name: string; email: string; phone?: string; message: string; productSlug?: string }): Promise<void> {
  const payload = await client()
  let product: number | undefined
  if (data.productSlug) {
    const { docs } = await payload.find({ collection: 'products', where: { slug: { equals: data.productSlug } }, limit: 1 })
    product = docs[0]?.id
  }
  await payload.create({
    collection: 'orders',
    data: { name: data.name, email: data.email, phone: data.phone ?? '', message: data.message, product, status: 'new' },
  })
}

// --- Проекты (портфолио) ---------------------------------------------------
export async function getProjects(opts: { featured?: boolean; limit?: number } = {}): Promise<Project[]> {
  const payload = await client()
  const where: any = {}
  if (opts.featured) where.featured = { equals: true }
  const { docs } = await payload.find({ collection: 'projects', sort: 'sort_order', depth: 1, where, limit: opts.limit ?? 100 })
  return docs.map(mapProject)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const payload = await client()
  const { docs } = await payload.find({ collection: 'projects', where: { slug: { equals: slug } }, depth: 1, limit: 1 })
  return docs[0] ? mapProject(docs[0]) : null
}

// --- Подписчики дневника ---------------------------------------------------
export async function createSubscriber(email: string, source: 'journal' | 'order' = 'journal'): Promise<void> {
  const payload = await client()
  // не дублируем существующий email (поле unique — иначе упало бы с ошибкой)
  const { docs } = await payload.find({ collection: 'subscribers', where: { email: { equals: email } }, limit: 1 })
  if (docs.length) return
  await payload.create({ collection: 'subscribers', data: { email, source } })
}

// --- HoReCa-заявки ---------------------------------------------------------
export async function createHorecaInquiry(data: {
  venueName: string; city?: string; name: string; email: string; phone?: string; position?: string
  projectType?: string; batchSize?: string; timeline?: string; conceptDescription?: string
}): Promise<void> {
  const payload = await client()
  // значения enum приходят из select'ов формы как строки — соответствие гарантировано на уровне формы
  await payload.create({ collection: 'horeca-inquiries', data: { ...data, status: 'new' } as any })
}

// --- Главная (Payload Global «homepage») ---------------------------------
// Дефолты = текущий контент. Пустые поля глобала подменяются ими, чтобы
// витрина никогда не оставалась с дырами (особенно в проде до заполнения).
const HOMEPAGE_DEFAULTS: Homepage = {
  hero: {
    bg: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&h=1080&fit=crop&q=80',
    titleLine1: 'Авторская керамика', titleLine2: 'ручной работы',
    primaryBtnText: 'Смотреть изделия', primaryBtnLink: '/catalog',
    outlineBtnText: 'Индивидуальный заказ', outlineBtnLink: '/order',
  },
  collection: { subtitle: 'Коллекция', heading: 'Избранные работы' },
  about: {
    image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&h=1000&fit=crop&q=80',
    subtitle: 'О мастере', headingLine1: 'Каждое изделие —', headingLine2: 'история',
    paragraphs: [
      'Я создаю керамику вручную в небольшой мастерской. Каждое изделие уникально.',
      'Натуральная глина, ручная лепка, двойной обжиг — каждая деталь продумана и выполнена с любовью к материалу.',
    ],
    ctaText: 'Смотреть галерею', ctaLink: '/gallery',
  },
  process: {
    subtitle: 'Процесс', heading: 'Как создаётся керамика',
    steps: [
      { label: 'Замес глины', image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=560&h=720&fit=crop&q=80' },
      { label: 'Гончарный круг', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=560&h=720&fit=crop&q=80' },
      { label: 'Формовка', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=560&h=720&fit=crop&q=80' },
      { label: 'Сушка', image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=560&h=720&fit=crop&q=80' },
      { label: 'Обжиг', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=560&h=720&fit=crop&q=80' },
      { label: 'Глазурование', image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=560&h=720&fit=crop&q=80' },
    ],
  },
  popular: { subtitle: 'Изделия', heading: 'Популярные работы', ctaText: 'Весь каталог', ctaLink: '/catalog' },
  atmospheric: {
    bg: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=1920&h=1080&fit=crop&q=80',
    text: 'Каждое изделие уникально',
  },
  gallery: { subtitle: 'Галерея', heading: 'Из мастерской' },
  cta: { subtitle: 'Индивидуально', heading: 'Можно создать изделие специально для вас', btnText: 'Оставить заявку', btnLink: '/order' },
  insta: {
    subtitle: '@ceramic_studio', heading: 'Атмосфера мастерской',
    images: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=500&h=500&fit=crop',
    ],
  },
}

// строка из глобала или дефолт (пустые/пробельные значения игнорируем)
const str = (v: any, fallback: string): string => (typeof v === 'string' && v.trim() ? v : fallback)
// картинка: загруженное фото (upload) → URL-поле → дефолт
const img = (photo: any, url: any, fallback: string): string => {
  const uploaded = typeof photo === 'object' && photo?.url ? photo.url : null
  return uploaded ?? str(url, fallback)
}

export async function getHomepage(): Promise<Homepage> {
  const payload = await client()
  const g: any = await payload.findGlobal({ slug: 'homepage', depth: 1 })
  const d = HOMEPAGE_DEFAULTS

  const aboutParas = Array.isArray(g?.aboutParagraphs)
    ? g.aboutParagraphs.map((p: any) => p?.text).filter((t: any) => typeof t === 'string' && t.trim())
    : []
  const steps = Array.isArray(g?.processSteps)
    ? g.processSteps.map((s: any) => ({ label: str(s?.label, ''), image: img(s?.photo, s?.image, '') })).filter((s: any) => s.label && s.image)
    : []
  const instaImgs = Array.isArray(g?.instaImages)
    ? g.instaImages.map((i: any) => img(i?.photo, i?.image, '')).filter(Boolean)
    : []

  return {
    hero: {
      bg: img(g?.heroPhoto, g?.heroImage, d.hero.bg),
      titleLine1: str(g?.titleLine1, d.hero.titleLine1),
      titleLine2: str(g?.titleLine2, d.hero.titleLine2),
      primaryBtnText: str(g?.primaryBtnText, d.hero.primaryBtnText),
      primaryBtnLink: str(g?.primaryBtnLink, d.hero.primaryBtnLink),
      outlineBtnText: str(g?.outlineBtnText, d.hero.outlineBtnText),
      outlineBtnLink: str(g?.outlineBtnLink, d.hero.outlineBtnLink),
    },
    collection: {
      subtitle: str(g?.collectionSubtitle, d.collection.subtitle),
      heading: str(g?.collectionHeading, d.collection.heading),
    },
    about: {
      image: img(g?.aboutPhoto, g?.aboutImage, d.about.image),
      subtitle: str(g?.aboutSubtitle, d.about.subtitle),
      headingLine1: str(g?.aboutHeadingLine1, d.about.headingLine1),
      headingLine2: str(g?.aboutHeadingLine2, d.about.headingLine2),
      paragraphs: aboutParas.length ? aboutParas : d.about.paragraphs,
      ctaText: str(g?.aboutCtaText, d.about.ctaText),
      ctaLink: str(g?.aboutCtaLink, d.about.ctaLink),
    },
    process: {
      subtitle: str(g?.processSubtitle, d.process.subtitle),
      heading: str(g?.processHeading, d.process.heading),
      steps: steps.length ? steps : d.process.steps,
    },
    popular: {
      subtitle: str(g?.popularSubtitle, d.popular.subtitle),
      heading: str(g?.popularHeading, d.popular.heading),
      ctaText: str(g?.popularCtaText, d.popular.ctaText),
      ctaLink: str(g?.popularCtaLink, d.popular.ctaLink),
    },
    atmospheric: {
      bg: img(g?.atmosphericPhoto, g?.atmosphericImage, d.atmospheric.bg),
      text: str(g?.atmosphericText, d.atmospheric.text),
    },
    gallery: {
      subtitle: str(g?.gallerySubtitle, d.gallery.subtitle),
      heading: str(g?.galleryHeading, d.gallery.heading),
    },
    cta: {
      subtitle: str(g?.ctaSubtitle, d.cta.subtitle),
      heading: str(g?.ctaHeading, d.cta.heading),
      btnText: str(g?.ctaBtnText, d.cta.btnText),
      btnLink: str(g?.ctaBtnLink, d.cta.btnLink),
    },
    insta: {
      subtitle: str(g?.instaSubtitle, d.insta.subtitle),
      heading: str(g?.instaHeading, d.insta.heading),
      images: instaImgs.length ? instaImgs : d.insta.images,
    },
  }
}
