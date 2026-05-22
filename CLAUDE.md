# CLAUDE.md

Контекст проекта для агента. Инструкции по запуску — в `README.md`, здесь — ориентир и грабли.

## Что это
Магазин авторской керамики. **Next.js 15 (App Router) + Payload 3 (встроенная CMS) + Postgres.**
Перенесён со старого Yii2-модуля; дизайн-система и анимации сохранены 1:1 (исходники в `_visual/`).

## Карта кода
- `src/app/(frontend)/` — витрина: `page.tsx` (главная), `catalog/`, `product/[slug]/`, `gallery/`, `order/`
- `src/app/(payload)/`  — admin UI + REST/GraphQL (boilerplate Payload, **не править вручную**)
- `src/collections/`    — модель данных: Categories, Products, Gallery, Orders, Users
- `src/lib/data.ts`     — **единственная точка доступа к данным** через Payload Local API. Страницы зовут `getProducts()/getCategories()/getProductBySlug()/getGallery()/createOrder()`, маппят записи в простые типы. Менять источник данных — здесь, страницы не трогать.
- `src/components/`      — `Shell` (навбар/футер, проп `active`/`isHero`), `ProductCard`, `Lightbox`
- `public/css/ceramic.css`, `public/js/ceramic.js` — дизайн-система и анимации, **копия из `_visual/`**. Это источник визуала; правки вносить осознанно, `_visual/` — референс.
- `scripts/seed.ts`     — сидинг демо-данных (`payload run`)
- `src/migrations/`     — миграции Payload (см. грабли ниже)

## Команды
- `npm run dev` — dev на :3000 (нужен dev-Postgres: контейнер `ceramic-next-pg` на :5435)
- `npm run seed` — схема + админ + демо-данные (идемпотентно)
- `npm run generate:types` — перегенерить `src/payload-types.ts` после изменения коллекций
- Docker: `docker compose -f docker-compose.local.yml up --build` (прод-образ локально, :3001)

## Грабли (важно)
- **Прод НЕ делает push-схему — только миграции.** Если поменял коллекцию (`src/collections/*`):
  `npx payload migrate:create <name>` → закоммить файлы из `src/migrations/`. Иначе в проде
  витрина падает `relation does not exist`. В Docker миграции накатывает one-shot сервис
  `migrate` до старта `app` (см. `docker-compose.yml`).
- **id в Postgres — числовые** (не uuid). Учитывай в типах (relation `product` = `number`).
- **Не запускать интерактивные scaffold-CLI** (`create-payload-app` и т.п.) в этой среде —
  падают на TTY даже через `!`. Каркас собирать вручную.
- Изображения сейчас — внешние URL (поле `images` = массив `{url}`), не загруженные файлы.
  Том `uploads` в compose вхолостую, пока нет upload-коллекции `Media`.
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

## Следующие шаги
- Media-коллекция Payload (upload) → фото через админку, том `uploads` оживает
- email-адаптер для уведомлений о заявках (сейчас в консоль)
