# CLAUDE.md

Контекст проекта для агента. Инструкции по запуску — в `README.md`, здесь — ориентир и грабли.

## Что это
Магазин авторской керамики. **Next.js 15 (App Router) + Payload 3 (встроенная CMS) + Postgres.**
Перенесён со старого Yii2-модуля; дизайн-система и анимации сохранены 1:1 (исходники в `_visual/`).

## Карта кода
- `src/app/(frontend)/` — витрина: `page.tsx`, `catalog/`, `product/[slug]/`, `about/`, `care/`,
  `horeca/`, `journal/`, `gallery/`, `order/`, `projects/[slug]/`, `pages/[slug]/`
- `src/app/(payload)/`  — admin UI + REST/GraphQL (boilerplate Payload, **не править вручную**;
  `layout.tsx` импортирует наш `admin.css`)
- `src/collections/`    — Categories, Products, Media, Orders, **Pages**, Subscribers,
  Gallery, Projects, HorecaInquiries, Users
- `src/globals/Homepage/` — Payload Global: hero/о мастере/процесс/атмосфера/CTA/insta.
  Картинки по паттерну upload+URL-fallback. В админке — «Главная страница».
- `src/admin/`          — кастомные компоненты Payload-админки:
  - `admin.css` — токены сайта (Playfair, терракота), темный sidebar
  - `Logo.tsx`, `Icon.tsx` — графика admin
  - `ImageCell.tsx` — миниатюра 48×48 в списке Products
  - `Dashboard.tsx` — главный экран мастера (приветствие, цифры, последние заявки/изделия)
  - `OrdersListView.tsx` — карточки заявок (Orders + HoReCa)
  - `ProductWizard.tsx` — 4-шаговый визард создания изделия (`/admin/products/wizard`)
- `src/lib/data.ts`     — **единственная точка доступа к данным** через Payload Local API.
  `getProducts()/getCategories()/getProductBySlug()/getGallery()/getHomepage()/getPageBySlug()
  /createOrder()/...`. `getHomepage()` merge'ит глобал поверх `HOMEPAGE_DEFAULTS`,
  пустые поля → дефолт. **Менять источник данных — здесь, страницы не трогать.**
- `src/lib/revalidate.ts` — `safeRevalidate()`: ISR-сброс кэша из хуков Payload,
  безопасен вне request-scope (seed/CLI не падают).
- `src/components/`     — `Shell` (nav+footer), `StickyNav`, `ProductCard`, `ProductGallery`,
  `Lightbox`, `Signature`, `SortSelect`, `fx/*` (FadeIn/RevealMask/Parallax/CountUp/useScrollFade)
- `public/css/ceramic.css`, `public/js/ceramic.js` — дизайн-система и анимации,
  **копия из `_visual/`**. Это источник визуала; правки вносить осознанно.
- `scripts/seed.ts`     — сидинг демо-данных
- `scripts/import-aeva.ts` — импорт контента из `imports/aeva/` (идемпотентный)
- `src/migrations/`     — миграции Payload (см. грабли ниже)
- `imports/aeva/`       — данные с shop-aeva.ru: `vases.json` / `tableware.json` /
  `about.json` / `delivery.json` / `contacts.json` / `hero.json` + `photos/{slug}/`.
  В git не пускаем (~170МБ). Для re-import — положить рядом и `npm run import:aeva`.

## Команды
Всё через Docker. Локально `npm run …` запускать не нужно (и не стоит — `node_modules` хоста и контейнера разной архитектуры).

**Dev (hot reload):**
- `docker compose -f docker-compose.dev.yml up` — поднимает app + Postgres
  - витрина: http://localhost:3070 · админка: http://localhost:3070/admin
  - Postgres наружу: `localhost:5470` (для DataGrip/psql)
- `docker compose -f docker-compose.dev.yml down` — остановить
- `docker compose -f docker-compose.dev.yml exec app npm run seed` — схема + админ + демо-данные
- `docker compose -f docker-compose.dev.yml exec app npm run import:aeva` — импорт контента с shop-aeva.ru (из `imports/aeva/*.json` + `imports/aeva/photos/`)
- `docker compose -f docker-compose.dev.yml exec app npm run generate:types` — после изменения коллекций
- `docker compose -f docker-compose.dev.yml exec app npx payload generate:importmap` — после добавления admin-компонентов
- `docker compose -f docker-compose.dev.yml exec app npx payload migrate:create <name>` — после изменения схемы коллекций

**Прод-образ локально (без Traefik):**
- `docker compose -f docker-compose.local.yml up --build` — :3001

**Прод (на VPS, под Traefik):**
- `docker compose up -d` — нужен `.env` рядом (см. `.env.example`) и внешняя сеть `proxy`

**Старый dev-Postgres `ceramic-next-pg` (:5435)** оставлен независимо — данные в нём не используются новым compose'ом. Если не нужен — `docker rm -f ceramic-next-pg`.

## Тесты
Автотестов в проекте нет (сознательно — см. ROADMAP #14). Проверка ручная:
визуал через chrome-devtools MCP, серверные изменения — глазами в админке и на витрине.
Не ищи `npm test` — его нет; не пиши тесты «попутно», если задача этого не требует.

## Грабли (важно)
- **Прод НЕ делает push-схему — только миграции.** Если поменял коллекцию (`src/collections/*`):
  `docker compose -f docker-compose.dev.yml exec app npx payload migrate:create <name>` →
  закоммить файлы из `src/migrations/`. Иначе в проде витрина падает `relation does not exist`.
  В Docker миграции накатывает one-shot сервис `migrate` до старта `app` (см. `docker-compose.yml`).
- **`docker compose -f ... up` без `-d`** — foreground-команда держит контейнеры. Если убить
  shell-команду (kill PID), контейнеры тоже падают. Используй `up -d` для нормальной работы.
- **`payload migrate` на dev интерактивный** — спрашивает «It looks like you've run Payload
  in dev mode...». Через `exec -T` зависает. На dev не запускай — Payload в dev-mode пушит
  схему сам. Миграции делай через `migrate:create` (генерация файла без applying), а apply
  пойдёт на проде через one-shot сервис.
- **id в Postgres — числовые** (не uuid). Учитывай в типах (relation `product` = `number`).
- **ISR:** главная/галерея/товар — `export const revalidate = 3600` + мгновенный сброс через
  `safeRevalidate()` в `afterChange/afterDelete`-хуках. Каталог и заказ читают `searchParams`
  → всегда динамические.
- **Не запускать интерактивные scaffold-CLI** (`create-payload-app` и т.п.) в этой среде —
  падают на TTY даже через `!`. Каркас собирать вручную.
- **CSS-специфичность `.cer-page h1`/`.cer-page p` (0,1,1)** перебивает одиночные классы
  типа `.cer-project-hero__title`, `.cer-hero-v3__title`, `.cer-routing__title`,
  `.cer-hero-v3__lead`, `.cer-project-hero__lead`, `.cer-routing__card--dark .cer-routing__desc`
  (всё 0,1,0/0,2,0) — color сваливается на дефолт `--cer-text-muted` и текст становится тёмным
  на тёмном overlay/фоне. Любой `color: white` для hero/dark-секций пиши как двойной
  селектор: `.cer-project-hero h1.cer-project-hero__title, ...` (для p — `.cer-hero-v3 p.cer-hero-v3__lead`).
- **`StickyNav` модификаторы**: CSS знает только `.cer-nav` (default: белый текст поверх hero)
  и `.cer-nav--scrolled` (cream + тёмный). `--transparent` НЕ существует. Логика
  в `src/components/StickyNav.tsx`: `showBg = !isHero || scrolled` → `cer-nav--scrolled`.
  Старый scroll-handler в `ceramic.js` удалён — конфликтовал с React.
- **`.fx-reveal-mask`** имеет `overflow:hidden` для эффекта «текст выезжает снизу».
  `padding-bottom: 0.18em` и стартовый `translateY(calc(100% + 0.18em))` — чтобы descender
  букв `у/р/д` не срезался после анимации.
- **`.fx-reveal-mask { display: inline-block }`** — следствие предыдущего пункта (для маски
  по тексту). Если поставить два `<RevealMask as="div">` подряд (subtitle + h1) — они
  всё равно встанут на одну строку. Решение: оборачивать каждый в внешний `<div>`, а сам
  RevealMask оставлять как `<span>` (default).
- **`.cer-two-col { align-items: start }`** + `.cer-two-col__image` имеет
  `position: sticky; top: 100px` на десктопе (>=769px). Это потому что на /about правая
  колонка часто длиннее левой картинки — с `align-items: center` фото уезжало в середину
  и оказывалось ниже viewport. На мобиле sticky отключается, две колонки превращаются в одну.
- **`next/image` + Lightbox несовместимы для masonry**: `ceramic.js` lightbox читает
  `img.src` напрямую. С `next/image` src = `/_next/image?url=...&w=NNN` (низкое разрешение).
  Поэтому masonry в `gallery/page.tsx` и `page.tsx`, и сам `Lightbox.tsx` оставлены
  как native `<img>` с `eslint-disable @next/next/no-img-element`.
- **Payload 3.84 не имеет `admin.css` в `buildConfig`** — даст TS-ошибку. Глобальный admin
  CSS грузится через `import '@/admin/admin.css'` в `src/app/(payload)/layout.tsx`.
- **AdminViewServerProps ≠ ServerProps**. В Dashboard (top-level `admin.components.views.dashboard`)
  приходит `initPageResult.req.payload`. В list view коллекции (`collection.admin.components.views.list.Component`)
  приходят props типа `ServerProps`: `payload` доступен напрямую, `initPageResult` нет.
- **После добавления нового admin-компонента** нужен `npx payload generate:importmap` —
  иначе runtime warning «PayloadComponent not found in importMap».
- **Mobile-адаптация админки** через классы в `src/admin/admin.css` (`.cer-admin-pad`,
  `.cer-admin-digest`, `.cer-admin-two-panel`, `.cer-admin-order-card`,
  `.cer-admin-wizard-grid--two`, `.cer-admin-wizard-sizes` и др., breakpoint 700px).
  Inline-styles в React-компонентах нельзя media-квирить — все grid'ы и paddings, которые
  должны перестраиваться, вынесены в эти классы. Если добавляешь новый кастомный admin-вид
  с grid layout — заводи media-query там же, не в inline.
- **`<body class="cer-page">`** — все страницы оборачиваются в `.cer-page` (см. `layout.tsx`).
  Это поднимает специфичность `.cer-page *` правил.
- Dev-доступы (сменить для прода): админка `admin@ceramic.local` / `ceramic123`.

## Деплой
`docker compose up -d` под Traefik (TLS/Let's Encrypt). Перед первым запуском — `.env`
из `.env.example` (`DOMAIN`, `DB_PASSWORD`, `PAYLOAD_SECRET`). Демо-данные в прод не нужны:
первого админа заводишь на `/admin`, товары добавляешь там же.

## Решение по стеку (чтобы не пересматривать)
Выбран Next+Payload после сравнения с Astro+Pocketbase. Причины: уже была нужна
полноценная админка (Payload даёт идиоматично), один язык/приложение, нулевой потолок
под будущую корзину/оплату. Платим бóльшим весом в эксплуатации (Postgres + Node) —
осознанно. Astro-спайк удалён.

## Состояние и планы
См. `ROADMAP.md` — что сделано (главный сайт, админка, контент с aeva, Docker dev)
и что осталось (контакты, очистка dummy, email, оптимизация Media, zero-downtime).
