// Слой данных через Payload Local API (без HTTP — прямой вызов в том же процессе).
import { getPayload } from 'payload'
import config from '@payload-config'

export interface Category { name: string; slug: string; description?: string; image?: string }
export interface Product {
  name: string; slug: string; description: string; short_description?: string
  price: number; category: string; images: string[]; featured?: boolean
}
export interface GalleryItem { title: string; image: string; size?: 'normal' | 'wide' | 'tall' }

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
  return {
    name: doc.name, slug: doc.slug, description: doc.description ?? '',
    short_description: doc.short_description, price: doc.price,
    category: typeof doc.category === 'object' && doc.category ? doc.category.name : '',
    images: uploaded.length ? uploaded : urls,
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
