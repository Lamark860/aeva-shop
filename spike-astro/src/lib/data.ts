// Слой данных. Читает из Pocketbase; при недоступности — fallback на seed.json
// (повторяет логику оригинального ProductService с demo-данными).
import PocketBase from 'pocketbase';
import seed from '../data/seed.json';

// process.env — для runtime (Docker), import.meta.env — для локального dev
const PB_URL = process.env.PB_URL || import.meta.env.PB_URL || 'http://127.0.0.1:8090';

export interface Category { name: string; slug: string; description?: string; image?: string; sort_order?: number; }
export interface Product {
  name: string; slug: string; description: string; short_description?: string;
  price: number; category: string; images: string[]; featured?: boolean;
}
export interface GalleryItem { title: string; image: string; size?: 'normal' | 'wide' | 'tall'; }

function pb() { return new PocketBase(PB_URL); }

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}
export function mainImage(p: Product): string { return p.images?.[0] ?? ''; }

function mapProduct(rec: any): Product {
  return {
    name: rec.name, slug: rec.slug, description: rec.description ?? '',
    short_description: rec.short_description, price: rec.price,
    category: rec.expand?.category?.name ?? '',
    images: Array.isArray(rec.images) ? rec.images : [],
    featured: !!rec.featured,
  };
}

// ---- seed fallback ----
const seedCats = seed.categories as Category[];
const seedProds = seed.products as Product[];
const seedGallery = seed.gallery as GalleryItem[];

export async function getCategories(): Promise<Category[]> {
  try {
    const recs = await pb().collection('categories').getFullList({ sort: 'sort_order' });
    return recs.map((r: any) => ({ name: r.name, slug: r.slug, description: r.description, image: r.image, sort_order: r.sort_order }));
  } catch {
    return [...seedCats].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  }
}

export async function getProducts(opts: { categorySlug?: string; featured?: boolean; limit?: number } = {}): Promise<Product[]> {
  try {
    const filters: string[] = [];
    if (opts.featured) filters.push('featured=true');
    if (opts.categorySlug) filters.push(`category.slug="${opts.categorySlug}"`);
    const recs = await pb().collection('products').getFullList({
      sort: 'sort_order', expand: 'category',
      filter: filters.join(' && ') || undefined,
    });
    const list = recs.map(mapProduct);
    return opts.limit ? list.slice(0, opts.limit) : list;
  } catch {
    let list = [...seedProds];
    if (opts.featured) list = list.filter((p) => p.featured);
    if (opts.categorySlug) {
      const cat = seedCats.find((c) => c.slug === opts.categorySlug);
      list = cat ? list.filter((p) => p.category === cat.name) : [];
    }
    return opts.limit ? list.slice(0, opts.limit) : list;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const rec = await pb().collection('products').getFirstListItem(`slug="${slug}"`, { expand: 'category' });
    return mapProduct(rec);
  } catch {
    return seedProds.find((p) => p.slug === slug) ?? null;
  }
}

export async function getGallery(limit?: number): Promise<GalleryItem[]> {
  try {
    const recs = await pb().collection('gallery').getFullList({ sort: 'sort_order' });
    const list = recs.map((r: any) => ({ title: r.title, image: r.image, size: r.size }));
    return limit ? list.slice(0, limit) : list;
  } catch {
    return limit ? seedGallery.slice(0, limit) : [...seedGallery];
  }
}

export async function createOrder(data: { name: string; email: string; phone?: string; message: string; productSlug?: string }): Promise<void> {
  const client = pb();
  let product: string | null = null;
  if (data.productSlug) {
    try { product = (await client.collection('products').getFirstListItem(`slug="${data.productSlug}"`)).id; } catch {}
  }
  await client.collection('orders').create({
    name: data.name, email: data.email, phone: data.phone ?? '',
    message: data.message, product, status: 'new',
  });
}
