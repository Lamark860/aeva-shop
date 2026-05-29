// Слой данных через Payload Local API (без HTTP — прямой вызов в том же процессе).
import { getPayload } from 'payload'
import config from '@payload-config'

export interface Category { name: string; slug: string; description?: string; image?: string }
export interface ProductSizes { height?: string; diameter?: string; volume?: string }
export interface Product {
  name: string; slug: string; description: string; short_description?: string
  price: number; category: string; categorySlug?: string; images: string[]; featured?: boolean
  inStock?: boolean
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

// На этапе `next build` Payload не может инициализироваться (нет PAYLOAD_SECRET и БД) —
// prerender ISR-страниц (/, /about, /care, /gallery, /projects) иначе падает
// («missing secret key» / «cannot connect to Postgres»). В build-фазе отдаём безопасную
// заглушку (дефолты/пусто); рантайм-ISR заполнит реальными данными после деплоя (правка
// контента в админке или кнопка «Сбросить кэш» на дашборде дёргают revalidate).
// В РАНТАЙМЕ ошибки НЕ глотаем — пусть будет видимый сбой и логи, не маскируем мисконфиг.
const IS_BUILD = process.env.NEXT_PHASE === 'phase-production-build'
async function safeQuery<T>(run: (payload: Awaited<ReturnType<typeof client>>) => Promise<T>, buildFallback: T): Promise<T> {
  try {
    return await run(await client())
  } catch (e) {
    if (IS_BUILD) {
      console.warn('[data] build-time prerender fallback:', (e as Error)?.message)
      return buildFallback
    }
    throw e
  }
}

// Выбираем нужный размер из Payload Media: thumbnail (400) / card (900) / large (1600) / original (2400).
// `media` — это либо объект Media (depth≥1), либо строка-URL (fallback из текстового поля).
// Если запрошенный sizes-вариант не сгенерирован (старая запись, нечеткая высота) — падаем
// вниз по приоритету. Frontend не нужно знать про эти sizes — он просто получает строку.
type MediaLike = { url?: string; sizes?: Record<string, { url?: string } | undefined> } | string | null | undefined
function pickSize(media: MediaLike, preferred: 'thumbnail' | 'card' | 'large'): string {
  if (!media) return ''
  if (typeof media === 'string') return media
  const fallback: Record<typeof preferred, string[]> = {
    thumbnail: ['thumbnail', 'card', 'large'],
    card:      ['card', 'large', 'thumbnail'],
    large:     ['large', 'card'],
  }
  for (const k of fallback[preferred]) {
    const u = media.sizes?.[k]?.url
    if (u) return u
  }
  return media.url || ''
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}
// «от 5 800 ₽» — цена всегда ориентир, точная зависит от размера/финиша (ТЗ)
export function formatPriceFrom(price: number): string {
  return 'от ' + formatPrice(price)
}
export function mainImage(p: Product): string { return p.images?.[0] ?? '' }

function mapProduct(doc: any): Product {
  // приоритет — загруженные фото (Media: берём large 1600px вместо оригинала 2400px,
  // дальше next/image даёт нужный финальный размер), иначе URL-ссылки (демо/fallback)
  const uploaded = Array.isArray(doc.photos)
    ? doc.photos.map((m: any) => pickSize(m, 'large')).filter(Boolean)
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
    // если поля нет в БД (старые записи) — считаем в наличии по умолчанию
    inStock: doc.inStock !== false,
    sizes, material: doc.material || undefined, story: doc.story || undefined, care: doc.care || undefined,
  }
}

function mapProject(doc: any): Project {
  // hero проекта — full-screen, берём large; галерея — карточки, берём card
  const main = (typeof doc.mainPhoto === 'object' && doc.mainPhoto)
    ? pickSize(doc.mainPhoto, 'large')
    : (doc.mainImage || '')
  const gallery = Array.isArray(doc.gallery)
    ? doc.gallery.map((g: any) => (typeof g.photo === 'object' && g.photo ? pickSize(g.photo, 'card') : g.image)).filter(Boolean)
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
  const docs = await safeQuery(p => p.find({ collection: 'categories', sort: 'sort_order', limit: 100 }).then(r => r.docs), [] as any[])
  return docs.map((d: any) => ({ name: d.name, slug: d.slug, description: d.description, image: d.image }))
}

// sort: 'default' (sort_order asc, по умолчанию) | 'new' (createdAt desc)
//       | 'price_asc' | 'price_desc'
export type ProductSort = 'default' | 'new' | 'price_asc' | 'price_desc'

const SORT_MAP: Record<ProductSort, string> = {
  default: 'sort_order',
  new: '-createdAt',
  price_asc: 'price',
  price_desc: '-price',
}

export async function getProducts(opts: {
  categorySlug?: string; featured?: boolean; limit?: number
  sort?: ProductSort
  excludeSlug?: string
} = {}): Promise<Product[]> {
  const where: any = {}
  if (opts.featured) where.featured = { equals: true }
  if (opts.categorySlug) where['category.slug'] = { equals: opts.categorySlug }
  if (opts.excludeSlug) where.slug = { not_equals: opts.excludeSlug }
  const sortKey = SORT_MAP[opts.sort ?? 'default']
  const docs = await safeQuery(p => p.find({
    collection: 'products', sort: sortKey, depth: 1, where,
    limit: opts.limit ?? 100,
  }).then(r => r.docs), [] as any[])
  return docs.map(mapProduct)
}

// Похожие изделия для страницы товара — берём из той же категории,
// исключая текущий slug. Если категории нет — пустой массив.
export async function getRelatedProducts(slug: string, categorySlug: string | undefined, limit = 3): Promise<Product[]> {
  if (!categorySlug) return []
  return getProducts({ categorySlug, excludeSlug: slug, limit })
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const docs = await safeQuery(p => p.find({ collection: 'products', where: { slug: { equals: slug } }, depth: 1, limit: 1 }).then(r => r.docs), [] as any[])
  return docs[0] ? mapProduct(docs[0]) : null
}

export async function getGallery(limit?: number): Promise<GalleryItem[]> {
  const docs = await safeQuery(p => p.find({ collection: 'gallery', sort: 'sort_order', depth: 1, limit: limit ?? 100 }).then(r => r.docs), [] as any[])
  // gallery масонри + lightbox — lightbox читает img.src напрямую для оригинала,
  // поэтому оставляем url оригинала (не sizes). Когда перейдём на «зумленный» lightbox
  // с отдельным data-full-src — здесь можно будет card.
  return docs.map((d: any) => ({
    title: d.title,
    image: (typeof d.photo === 'object' && d.photo?.url) ? d.photo.url : d.image,
    size: d.size,
  }))
}

export async function createOrder(data: {
  name: string; email: string; phone?: string; message: string; productSlug?: string
  type?: string; purpose?: string; deadline?: string; budget?: string; referenceLink?: string
}): Promise<void> {
  const payload = await client()
  let product: number | undefined
  if (data.productSlug) {
    const { docs } = await payload.find({ collection: 'products', where: { slug: { equals: data.productSlug } }, limit: 1 })
    product = docs[0]?.id
  }
  // пустые select'ы (value="") отфильтровываем, чтобы Payload не ругался на enum
  const enumOrUndef = (v?: string) => (v && v !== '' ? v : undefined)
  await payload.create({
    collection: 'orders',
    data: {
      name: data.name, email: data.email,
      phone: data.phone ?? '', message: data.message,
      product, status: 'new',
      type: enumOrUndef(data.type),
      purpose: enumOrUndef(data.purpose),
      deadline: enumOrUndef(data.deadline),
      budget: enumOrUndef(data.budget),
      referenceLink: data.referenceLink || undefined,
    } as any,
  })
}

// --- Проекты (портфолио) ---------------------------------------------------
export async function getProjects(opts: { featured?: boolean; limit?: number } = {}): Promise<Project[]> {
  const where: any = {}
  if (opts.featured) where.featured = { equals: true }
  const docs = await safeQuery(p => p.find({ collection: 'projects', sort: 'sort_order', depth: 1, where, limit: opts.limit ?? 100 }).then(r => r.docs), [] as any[])
  return docs.map(mapProject)
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const docs = await safeQuery(p => p.find({ collection: 'projects', where: { slug: { equals: slug } }, depth: 1, limit: 1 }).then(r => r.docs), [] as any[])
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

// --- Pages (свободные текстовые страницы) -----------------------------------
export interface Page { slug: string; title: string; subtitle?: string; body: string }
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const docs = await safeQuery(p => p.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, depth: 0 }).then(r => r.docs), [] as any[])
  const d: any = docs[0]
  if (!d) return null
  return { slug: d.slug, title: d.title, subtitle: d.subtitle || undefined, body: d.body || '' }
}

// --- Страница «Ресторанам» (Global) ----------------------------------------
export interface HorecaMetric { value: string; label: string }
export interface HorecaStep { heading: string; text: string }
export interface HorecaPage {
  hero: { bg: string; meta: string; title: string; lead: string; btnText: string }
  metrics: HorecaMetric[]
  cases: { subtitle: string; heading: string }
  process: { subtitle: string; heading: string; steps: HorecaStep[] }
  form: { subtitle: string; heading: string; lead: string; btnText: string }
}

export const HORECA_DEFAULTS: HorecaPage = {
  hero: {
    bg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&h=1400&fit=crop&q=85',
    meta: 'Для ресторанов и кафе',
    title: 'Авторская посуда под вашу концепцию',
    lead: 'Разработка формы под концепцию заведения и производство партиями от 50 до 500 единиц.',
    btnText: 'Обсудить проект',
  },
  metrics: [
    { value: '12+', label: 'заведений по России' },
    { value: '50–500', label: 'единиц в партии' },
    { value: '8–14', label: 'недель от эскиза до отгрузки' },
    { value: 'Шамот', label: 'выдерживает посудомойку' },
  ],
  cases: { subtitle: 'Кейсы', heading: 'Готовые проекты на столах' },
  process: {
    subtitle: 'Как работаем',
    heading: 'От первого письма до сервировки',
    steps: [
      { heading: 'Бриф', text: 'Обсуждаем концепцию, меню, объём партии и сроки. Час разговора голосом или встреча.' },
      { heading: 'Эскизы', text: '2–3 направления формы. Согласуем материал и тип глазури. Срок 1–2 недели.' },
      { heading: 'Прототипы', text: 'Один-два тестовых образца каждой утверждённой формы. Тестируете на реальном блюде.' },
      { heading: 'Производство', text: 'Партия от 50 до 500 единиц. Аванс 50%, доплата при отгрузке.' },
    ],
  },
  form: {
    subtitle: 'Расскажите о проекте',
    heading: 'Обсудим вашу посуду',
    lead: 'Отвечу в течение рабочего дня. Если приложите концепцию или мудборд — ещё быстрее.',
    btnText: 'Отправить заявку',
  },
}

export async function getHorecaPage(): Promise<HorecaPage> {
  const g: any = await safeQuery(p => p.findGlobal({ slug: 'horeca-page', depth: 1 }), null)
  const d = HORECA_DEFAULTS

  const metrics: HorecaMetric[] = Array.isArray(g?.metrics)
    ? g.metrics.map((m: any) => ({ value: str(m?.value, ''), label: str(m?.label, '') })).filter((m: HorecaMetric) => m.value && m.label)
    : []
  const steps: HorecaStep[] = Array.isArray(g?.steps)
    ? g.steps.map((s: any) => ({ heading: str(s?.heading, ''), text: str(s?.text, '') })).filter((s: HorecaStep) => s.heading && s.text)
    : []

  return {
    hero: {
      bg: img(g?.heroBgPhoto, g?.heroBgUrl, d.hero.bg),
      meta: str(g?.heroMeta, d.hero.meta),
      title: str(g?.heroTitle, d.hero.title),
      lead: str(g?.heroLead, d.hero.lead),
      btnText: str(g?.heroBtnText, d.hero.btnText),
    },
    metrics: metrics.length ? metrics : d.metrics,
    cases: {
      subtitle: str(g?.casesSubtitle, d.cases.subtitle),
      heading: str(g?.casesHeading, d.cases.heading),
    },
    process: {
      subtitle: str(g?.processSubtitle, d.process.subtitle),
      heading: str(g?.processHeading, d.process.heading),
      steps: steps.length ? steps : d.process.steps,
    },
    form: {
      subtitle: str(g?.formSubtitle, d.form.subtitle),
      heading: str(g?.formHeading, d.form.heading),
      lead: str(g?.formLead, d.form.lead),
      btnText: str(g?.formBtnText, d.form.btnText),
    },
  }
}

// --- Страница «О мастере» (Global) -----------------------------------------
export interface AboutType { heading: string; text: string; ctaText: string; ctaLink: string }
export interface AboutPage {
  portraitPhoto: string  // путь к фото; '' = использовать конвенциональное aeva-about-0
  quote: { text: string; author: string }
  material: { photo: string; subtitle: string; heading: string; paragraphs: string[] }
  triptych: string[]
  types: { subtitle: string; heading: string; items: AboutType[] }
  cta: { subtitle: string; headingLine1: string; headingLine2: string; btnText: string; btnLink: string }
}

export const ABOUT_DEFAULTS: AboutPage = {
  portraitPhoto: '',  // → /api/media/file/aeva-about-0.jpg по соглашению (из импорта)
  quote: {
    text: 'Я не пытаюсь делать идеально. Идеальное — холодное. Я хочу, чтобы было видно: это руки.',
    author: '',
  },
  material: {
    photo: '',
    subtitle: 'Материал',
    heading: 'Шамот, без упрощений.',
    paragraphs: [
      'Работаю только с шамотной глиной. Она тяжелее в обработке, чем фарфор или фаянс, — но именно она даёт ту самую тёплую, живую поверхность.',
      'Глазури мешаю сама. Двойной обжиг: первый при 950°C, второй при 1230°C. Иногда — третий, если работа просит ещё один слой.',
    ],
  },
  triptych: [],
  types: {
    subtitle: 'Что я делаю',
    heading: 'Три типа работ.',
    items: [
      { heading: 'Авторские штучные изделия', text: 'Вазы, чаши, декор. Каждое изделие — единственное. Живут в каталоге, можно купить или заказать что-то похожее.', ctaText: 'Каталог →', ctaLink: '/catalog' },
      { heading: 'Индивидуальные заказы', text: 'Когда нужна вещь под конкретный интерьер или подарок. Обсуждаем, делаю эскиз, согласовываем — и в работу.', ctaText: 'Заказать →', ctaLink: '/order' },
      { heading: 'Партии для ресторанов и кафе', text: 'Разработка формы под концепцию заведения и производство тиражом от 50 до 500 единиц. Срок от 8 недель.', ctaText: 'Подробнее →', ctaLink: '/horeca' },
    ],
  },
  cta: {
    subtitle: 'Поговорим',
    headingLine1: 'Напишите, если хочется',
    headingLine2: 'обсудить вашу идею.',
    btnText: 'Связаться со мной',
    btnLink: '/order',
  },
}

export async function getAboutPage(): Promise<AboutPage> {
  const g: any = await safeQuery(p => p.findGlobal({ slug: 'about-page', depth: 1 }), null)
  const d = ABOUT_DEFAULTS

  const mParas: string[] = Array.isArray(g?.materialParagraphs)
    ? g.materialParagraphs.map((p: any) => str(p?.text, '')).filter(Boolean)
    : []
  const triptych: string[] = Array.isArray(g?.triptych)
    ? g.triptych.map((t: any) => (typeof t.photo === 'object' && t.photo ? pickSize(t.photo, 'large') : '')).filter(Boolean)
    : []
  const types: AboutType[] = Array.isArray(g?.types)
    ? g.types.map((it: any) => ({
        heading: str(it?.heading, ''),
        text: str(it?.text, ''),
        ctaText: str(it?.ctaText, ''),
        ctaLink: str(it?.ctaLink, ''),
      })).filter((t: AboutType) => t.heading && t.text)
    : []

  return {
    portraitPhoto: pickSize(g?.portraitPhoto, 'large'),
    quote: {
      text: str(g?.quoteText, d.quote.text),
      author: str(g?.quoteAuthor, d.quote.author),
    },
    material: {
      photo: pickSize(g?.materialPhoto, 'large'),
      subtitle: str(g?.materialSubtitle, d.material.subtitle),
      heading: str(g?.materialHeading, d.material.heading),
      paragraphs: mParas.length ? mParas : d.material.paragraphs,
    },
    triptych: triptych.length ? triptych : d.triptych,
    types: {
      subtitle: str(g?.typesSubtitle, d.types.subtitle),
      heading: str(g?.typesHeading, d.types.heading),
      items: types.length ? types : d.types.items,
    },
    cta: {
      subtitle: str(g?.ctaSubtitle, d.cta.subtitle),
      headingLine1: str(g?.ctaHeadingLine1, d.cta.headingLine1),
      headingLine2: str(g?.ctaHeadingLine2, d.cta.headingLine2),
      btnText: str(g?.ctaBtnText, d.cta.btnText),
      btnLink: str(g?.ctaBtnLink, d.cta.btnLink),
    },
  }
}

// --- Страница «Уход» (Global) ----------------------------------------------
export interface CareItem { heading: string; text: string }
export interface CarePage {
  subtitle: string; title: string; lead: string
  items: CareItem[]
  footer: { text: string; linkText: string; linkHref: string }
}

export const CARE_DEFAULTS: CarePage = {
  subtitle: 'Уход',
  title: 'Как ухаживать за керамикой',
  lead: 'Шамот — материал прочный и неприхотливый, но пара деталей продлевают жизнь изделия на годы.',
  items: [
    { heading: 'Перед первым использованием', text: 'Промойте изделие тёплой водой с каплей нейтрального мыла. Шамот пористый, в первые дни может «потеть» — это нормально, через неделю проходит.' },
    { heading: 'Мытьё', text: 'Большинство моих изделий выдерживают посудомоечную машину. На странице каждого товара отмечено, можно ли — если не отмечено, лучше вручную мягкой губкой.' },
    { heading: 'Микроволновка и духовка', text: 'Шамотная посуда без металлических вкраплений ставится в духовку до 200°C и в микроволновку. Декор и изделия с грубой керамикой — только сервировка, не нагревать.' },
    { heading: 'Перепады температуры', text: 'Не заливайте кипяток в холодную чашу из холодильника и наоборот. Шамот это переносит лучше фарфора, но не любит резких контрастов.' },
    { heading: 'Скол или трещина', text: 'Напишите мне в личку — могу починить или сделать замену. Многое восстанавливается, не выбрасывайте сразу.' },
  ],
  footer: {
    text: 'Остались вопросы про конкретное изделие?',
    linkText: 'Напишите мне',
    linkHref: '/order',
  },
}

export async function getCarePage(): Promise<CarePage> {
  const g: any = await safeQuery(p => p.findGlobal({ slug: 'care-page', depth: 0 }), null)
  const d = CARE_DEFAULTS
  const items: CareItem[] = Array.isArray(g?.items)
    ? g.items.map((it: any) => ({ heading: str(it?.heading, ''), text: str(it?.text, '') })).filter((it: CareItem) => it.heading && it.text)
    : []
  const f = g?.footer || {}
  return {
    subtitle: str(g?.subtitle, d.subtitle),
    title: str(g?.title, d.title),
    lead: str(g?.lead, d.lead),
    items: items.length ? items : d.items,
    footer: {
      text: str(f.text, d.footer.text),
      linkText: str(f.linkText, d.footer.linkText),
      linkHref: str(f.linkHref, d.footer.linkHref),
    },
  }
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
// картинка: загруженное фото (upload, нужного размера) → URL-поле → дефолт
const img = (photo: any, url: any, fallback: string, size: 'thumbnail' | 'card' | 'large' = 'large'): string => {
  const uploaded = typeof photo === 'object' && photo ? pickSize(photo, size) : ''
  return uploaded || str(url, fallback)
}

export async function getHomepage(): Promise<Homepage> {
  const g: any = await safeQuery(p => p.findGlobal({ slug: 'homepage', depth: 1 }), null)
  const d = HOMEPAGE_DEFAULTS

  const aboutParas = Array.isArray(g?.aboutParagraphs)
    ? g.aboutParagraphs.map((p: any) => p?.text).filter((t: any) => typeof t === 'string' && t.trim())
    : []
  // process: 280×360 ширины на сайте — card (900) с запасом
  const steps = Array.isArray(g?.processSteps)
    ? g.processSteps.map((s: any) => ({ label: str(s?.label, ''), image: img(s?.photo, s?.image, '', 'card') })).filter((s: any) => s.label && s.image)
    : []
  // insta: квадраты ~500px — card достаточно
  const instaImgs = Array.isArray(g?.instaImages)
    ? g.instaImages.map((i: any) => img(i?.photo, i?.image, '', 'card')).filter(Boolean)
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
