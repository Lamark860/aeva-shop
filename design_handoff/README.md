# Handoff · aeva-shop · UI/UX update

## Что это

Папка с дизайн-референсами для миграции дизайна сайта **aeva-shop** на новую структуру.

Внутри — два HTML-прототипа:

1. **`Mockups.html`** — design canvas с эскизами (статичные мокапы) разных страниц и решений. Это **обзор предложений**.
2. **`Prototype.html`** — живой кликабельный прототип со всеми страницами, навигацией, анимациями и переходами. Это **финальный референс**, по которому нужно делать.

> **Важно:** файлы в этой папке — это **дизайн-референсы на HTML/CSS/React (Babel)**, а не production-код. Задача — пересобрать эти страницы внутри уже существующего проекта `aeva-shop` (Next.js 15 App Router + Payload 3 + Postgres), используя его архитектуру и паттерны. **Прототип не нужно копировать «как есть» в `src/app/(frontend)/`**.

## Степень детализации

**High-fidelity.** Финальные цвета, типографика, отступы, анимации. Все значения берутся 1:1 — текущий `ceramic.css` уже содержит дизайн-токены, в прототипе используется он же.

---

## Стек проекта (уже на месте, не менять)

- Next.js 15 (App Router) · `src/app/(frontend)/`
- Payload 3 как встроенная CMS · `src/app/(payload)/`, `src/collections/`
- Postgres · через `@payloadcms/db-postgres`
- Слой данных · `src/lib/data.ts` (Payload Local API, без HTTP)
- Дизайн-система · `public/css/ceramic.css` (= `_visual/css/ceramic.css`)
- Поведение/анимации старого сайта · `public/js/ceramic.js`

**Не использовать в продакшне:**
- Babel-standalone, React UMD development build
- Inline JSX через `<script type="text/babel">`
- Хэш-роутер (в прототипе он только для демо)

---

## Что изменилось в IA сайта

| Страница (URL) | Статус | Файлы прототипа |
|---|---|---|
| `/` — главная | **переделать** (новый Hero V3 + полоса разветвления) | `prototype/home.jsx` |
| `/catalog` | улучшить (sidebar категорий + сортировка) | `prototype/catalog.jsx` |
| `/product/[slug]` | **сильно переделать** (sticky CTA, размеры/материал/уход, похожие) | `prototype/product.jsx` |
| `/gallery` | как есть, masonry уже ок | `prototype/gallery.jsx` |
| `/projects` | **новое** — case study портфолио | `prototype/projects.jsx` (`ProjectsPage`) |
| `/projects/[slug]` | **новое** — развёрнутый case study | `prototype/projects.jsx` (`ProjectDetailPage`) |
| `/horeca` | **новое** — отдельная B2B-страница | `prototype/horeca.jsx` |
| `/about` | **новое** — личная страница автора | `prototype/about.jsx` |
| `/care` | **новое** — уход за керамикой | `prototype/misc.jsx` (`CarePage`) |
| `/journal` | **новое** — дневник + подписка | `prototype/misc.jsx` (`JournalPage`) |
| `/order` | улучшить (структурированные поля) | `prototype/misc.jsx` (`OrderPage`) |

### Новые коллекции Payload

| Коллекция | Поля (минимум) | Использование |
|---|---|---|
| `projects` | slug, year, type (enum: ресторан/частный/коллекция/кафе), title, subtitle, description, mainImage (relation→media), gallery (array→media), facts (array of key/value), quote, quoteAuthor | `/projects`, `/projects/[slug]` |
| `subscribers` | email, createdAt, source (enum: journal/order) | подписка на дневник |
| `homepageGlobal` (Global, не collection) | aboutTitle, aboutBody (rich text), processSteps (array: label, image), instaImages (array: url) | редактируемый текст главной |

### Изменения существующих коллекций

**Products** — добавить:
- `priceFrom` (number) — переименовать существующее `price` или добавить рядом. На фронте отображается как «от 5 800 ₽»
- `sizes` (group: height, diameter, volume) — все строковые, чтобы можно было писать «6–10 см»
- `material` (text)
- `story` (textarea) — история конкретного изделия
- `care` (text) — что можно/нельзя
- `categoryName` дублирует `category.name` — оставить relation, на фронте резолвить через `depth: 1` (уже делает `data.ts:mapProduct`)

**Orders** — структурированная форма требует новых полей:
- `type` (enum: ваза/чаша/тарелка/кружка/набор/декор/другое)
- `purpose` (enum: себе/подарок/интерьер/неуверен)
- `deadline` (enum: не_срочно/в_течение_месяца/конкретная_дата/обсудим)
- `budget` (enum: до_3к/3к-7к/7к-15к/15к+/не_знаю)
- `referenceLink` (text)
- старое `message` сохраняется как «Опишите, что хотелось бы»

**Orders для HoReCa** — отдельная коллекция `horecaInquiries` или discriminator в `Orders`:
- venueName, city, position (string), batchSize (enum), timeline (enum), conceptDescription (textarea)

---

## Решения по дизайну (закрытые, не пересматривать)

1. **Hero V3** — выбран вариант с тёмным фоном + ken-burns, reveal-маски на H1, ниже короткая полоса из 3 карточек: «Каталог / На заказ / Ресторанам». Третья карточка — тёмная (`var(--cer-text)` background) для визуального якоря HoReCa-track.
2. **Цены как ориентир** — все цены префиксированы «от» с маленьким caption «Точная цена зависит от размера и финиша». Никаких корзин и оплат.
3. **Без отзывов**, без бейджей «в единственном экземпляре», без расширенных фильтров каталога (цвет/размер/наличие). Не работает для авторской керамики.
4. **HoReCa — отдельный track**, не подраздел. Своя форма с полями для шефа/закупщика. На главной — равноправная третья карточка в полосе разветвления.
5. **Анимационная лексика — единая**: длинный `ease-out cubic-bezier(0.16, 1, 0.3, 1)`, длительности 600-1100мс. Никаких spring overshoot, shimmer, glow, пульсаций.
6. **Курсор-следователь** — есть в прототипе, **под вопросом**. Включить/отключить по решению владельца.

---

## Анимации — что обязательно перенести

| Эффект | Где | Реализация в проде |
|---|---|---|
| Reveal-маска H1 (translateY 100% → 0 под clip-mask) | hero на главной, projects detail, horeca | CSS + IntersectionObserver, либо Framer Motion variants |
| Ken-burns на hero-фото (22s, scale 1→1.12, slight pan) | главная hero, horeca hero, project detail hero | чистый CSS `@keyframes` |
| Scroll-fade (opacity 0+24px → 1+0) | везде на секциях/карточках | IntersectionObserver, см. `prototype/anim.jsx:useScrollFade` |
| Stagger карточек (80мс между детьми) | каталог, избранные, похожие | `transitionDelay: i * 80ms` |
| Magnetic CTA (курсор тянет кнопку с лагом) | главные CTA | см. `prototype/anim.jsx:useMagnetic`, либо отказаться — это nice-to-have |
| Parallax atmospheric band (фон уезжает медленнее) | главная, секция «Каждое изделие уникально» | scroll-based transform, см. `useParallax` |
| Counter 0→N | HoReCa метрики («12+ заведений») | `useCountUp` в `anim.jsx` |
| Lightbox с zoom-in (scale 0.92→1) | галерея, страница товара | CSS animation `lbImgIn`, см. `prototype/styles.css` |
| Page transitions (cross-fade) | переключение страниц | View Transitions API в Next.js: `<Link>` + `unstable_ViewTransition` или `useRouter().push()` обёрнутый в `document.startViewTransition` |
| Sticky nav с переходом transparent → cream/blur при скролле | везде поверх тёмных hero | scroll listener, см. `prototype/app.jsx:TopNav` |
| `prefers-reduced-motion` | глобально | media query в `styles.css`, см. конец файла |

**Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` — единая кривая для всех transition и animation.

---

## Маппинг файлов

### Прототип → исходный код проекта

```
prototype/home.jsx           → src/app/(frontend)/page.tsx (переписать)
prototype/catalog.jsx        → src/app/(frontend)/catalog/page.tsx (переписать)
prototype/product.jsx        → src/app/(frontend)/product/[slug]/page.tsx (переписать)
prototype/gallery.jsx        → src/app/(frontend)/gallery/page.tsx (минимальные правки)
prototype/projects.jsx       → src/app/(frontend)/projects/page.tsx + projects/[slug]/page.tsx (новые)
prototype/horeca.jsx         → src/app/(frontend)/horeca/page.tsx (новая)
prototype/about.jsx          → src/app/(frontend)/about/page.tsx (новая)
prototype/misc.jsx → Care    → src/app/(frontend)/care/page.tsx (новая)
prototype/misc.jsx → Journal → src/app/(frontend)/journal/page.tsx (новая)
prototype/misc.jsx → Order   → src/app/(frontend)/order/page.tsx (переписать форму)
prototype/app.jsx → TopNav   → src/components/Shell.tsx (обновить навбар, добавить sticky-transparent логику)
prototype/app.jsx → SiteFooter → src/components/Shell.tsx (новый футер с разветвлением)
prototype/ui.jsx → ProductCard → src/components/ProductCard.tsx (обновить с priceFrom)
prototype/anim.jsx           → src/hooks/ или src/lib/animations.ts (vanilla, без зависимостей)
prototype/styles.css         → public/css/animations.css или включить в ceramic.css
prototype/data.jsx           → НЕ переносить, демо-данные. Использовать `src/lib/data.ts`
```

### Что сохранить от текущего кода

- `src/lib/data.ts` — слой данных корректный, **только расширить** новыми getters: `getProjects()`, `getProjectBySlug()`, `getHomepageGlobal()`, `createSubscriber()`, `createHorecaInquiry()`.
- `src/components/Shell.tsx` — обновить, но структура `<Shell active="…" isHero>` правильная, использовать её же.
- `public/css/ceramic.css` — оставить как базовый CSS дизайн-системы. Прототип построен поверх него.

---

## Технические задачи (отдельно от UI)

Эти пункты обсуждались с владельцем и записаны в техдолг:

- [ ] Заменить `export const dynamic = 'force-dynamic'` на `export const revalidate = 3600` + `revalidatePath()` в Payload `afterChange`-хуках коллекций
- [ ] Media-коллекция Payload (upload) вместо внешних URL в `images: [{ url }]`. Перейти на `next/image` для AVIF/WebP/responsive `srcset`
- [ ] Honeypot (`<input name="website" tabIndex={-1}>` со скрытием) + rate-limit на server action `submitOrder` и аналог для HoReCa
- [ ] Telegram-bot уведомления о заявках (через `node-telegram-bot-api` или прямой fetch к Bot API) — в хук `Orders:afterChange` и `horecaInquiries:afterChange`
- [ ] Email-адаптер для подтверждений клиенту (`@payloadcms/email-resend` или nodemailer)
- [ ] SEO: `app/sitemap.ts`, `app/robots.ts`, `generateMetadata()` на товаре и проекте, JSON-LD Product
- [ ] Кастомизация Payload admin: брендинг (CSS-переменные), русские лейблы и admin.description, группировка полей через tabs, hidden:true для slug + auto-generate в beforeChange-хуке
- [ ] Favicon + apple-touch-icon
- [ ] 404 страница в стилистике («Эта работа уже нашла свой дом»)
- [ ] Print stylesheet для страницы товара

---

## Файлы в этой папке

- `README.md` — этот файл
- `Prototype.html` + `prototype/` — живой прототип со всеми страницами, **главный референс**
- `Mockups.html` + `artboards/` + `design-canvas.jsx` — design canvas с обзорными мокапами
- `ceramic.css` — копия дизайн-системы (= `_visual/css/ceramic.css` в основном проекте)

## Как запустить прототип локально

Открыть `Prototype.html` в любом современном браузере. Дополнительные зависимости не нужны (всё подгружается с CDN).

Hash-роутер: `#/home`, `#/catalog`, `#/product/okean`, `#/projects`, `#/project/norra`, `#/horeca`, `#/about`, `#/care`, `#/journal`, `#/order`.

---

## Контакт

Вопросы по дизайн-решениям — к владельцу проекта.
