// Заводит коллекции в Pocketbase и засеивает данные из _visual/seed.json.
// Идемпотентно: повторный запуск не плодит дубли.
import PocketBase from 'pocketbase';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seed = JSON.parse(readFileSync(join(__dirname, '../src/data/seed.json'), 'utf-8'));

const PB_URL = process.env.PB_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL || 'admin@ceramic.local';
const ADMIN_PASS = process.env.PB_ADMIN_PASS || 'ceramic123';

const pb = new PocketBase(PB_URL);
await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASS);
console.log('✓ admin authed');

async function getCollection(name) {
  try { return await pb.collections.getOne(name); }
  catch { return null; }
}

async function ensureCollection(def) {
  const existing = await getCollection(def.name);
  if (existing) { console.log(`· collection ${def.name} уже есть`); return existing; }
  const created = await pb.collections.create(def);
  console.log(`✓ collection ${def.name} создана`);
  return created;
}

// ---- categories ----
await ensureCollection({
  name: 'categories', type: 'base',
  listRule: '', viewRule: '',
  schema: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'description', type: 'text' },
    { name: 'image', type: 'text' },
    { name: 'sort_order', type: 'number' },
  ],
  indexes: ['CREATE UNIQUE INDEX idx_cat_slug ON categories (slug)'],
});

const catCol = await getCollection('categories');

// ---- products ----
await ensureCollection({
  name: 'products', type: 'base',
  listRule: '', viewRule: '',
  schema: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'description', type: 'text' },
    { name: 'short_description', type: 'text' },
    { name: 'price', type: 'number', required: true },
    { name: 'category', type: 'relation', options: { collectionId: catCol.id, maxSelect: 1, cascadeDelete: false } },
    { name: 'images', type: 'json', options: { maxSize: 2000000 } },
    { name: 'featured', type: 'bool' },
    { name: 'sort_order', type: 'number' },
  ],
  indexes: ['CREATE UNIQUE INDEX idx_prod_slug ON products (slug)'],
});

const prodCol = await getCollection('products');

// ---- gallery ----
await ensureCollection({
  name: 'gallery', type: 'base',
  listRule: '', viewRule: '',
  schema: [
    { name: 'title', type: 'text', required: true },
    { name: 'image', type: 'text', required: true },
    { name: 'description', type: 'text' },
    { name: 'size', type: 'select', options: { maxSelect: 1, values: ['normal', 'wide', 'tall'] } },
    { name: 'sort_order', type: 'number' },
  ],
});

// ---- orders ----  (создавать может любой — форма заявки; читать/менять — только админ)
await ensureCollection({
  name: 'orders', type: 'base',
  createRule: '',
  schema: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'message', type: 'text', required: true },
    { name: 'product', type: 'relation', options: { collectionId: prodCol.id, maxSelect: 1, cascadeDelete: false } },
    { name: 'status', type: 'select', options: { maxSelect: 1, values: ['new', 'done'] } },
  ],
});

// ---------------- SEED DATA ----------------
async function findBy(collection, field, value) {
  try {
    const r = await pb.collection(collection).getFirstListItem(`${field}="${value}"`);
    return r;
  } catch { return null; }
}

// categories
const catMap = {};
for (const c of seed.categories) {
  let rec = await findBy('categories', 'slug', c.slug);
  if (!rec) rec = await pb.collection('categories').create(c);
  catMap[c.name] = rec.id;
}
console.log(`✓ categories: ${Object.keys(catMap).length}`);

// products
let pCount = 0;
for (const p of seed.products) {
  if (await findBy('products', 'slug', p.slug)) continue;
  await pb.collection('products').create({
    name: p.name, slug: p.slug, description: p.description,
    short_description: p.short_description, price: p.price,
    category: catMap[p.category] ?? null, images: p.images,
    featured: !!p.featured, sort_order: p.sort_order ?? 0,
  });
  pCount++;
}
console.log(`✓ products: +${pCount}`);

// gallery
let gCount = 0;
for (const g of seed.gallery) {
  if (await findBy('gallery', 'title', g.title)) continue;
  await pb.collection('gallery').create(g);
  gCount++;
}
console.log(`✓ gallery: +${gCount}`);

console.log('\n✅ Seed готов. Админка: ' + PB_URL + '/_/');
