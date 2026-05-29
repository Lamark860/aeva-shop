# ceramic

Магазин авторской керамики ручной работы. **Next.js 15 (App Router) + Payload 3.84 + Postgres 16.**
Витрина и админка — в одном приложении, Payload как встроенная CMS.

Перенесён со старого Yii2-модуля; дизайн 1:1 в `_visual/`. Контент — реальные товары
и тексты с [shop-aeva.ru](https://shop-aeva.ru) (16 ваз + 12 единиц посуды + страницы об авторе / доставке / контактах).

## Запуск локально

Всё через Docker, локально `npm` не запускаем (node_modules контейнера ≠ хоста).

```bash
docker compose -f docker-compose.dev.yml up -d
# витрина http://localhost:3070 · админка http://localhost:3070/admin
# postgres наружу localhost:5470 (для DataGrip / psql)

# первый запуск БД: создать схему + админа + базовые seed
docker compose -f docker-compose.dev.yml exec app npm run seed

# залить контент aeva (нужны файлы в imports/aeva/)
docker compose -f docker-compose.dev.yml exec app npm run import:aeva
```

Hot reload работает через bind mount; `node_modules` и `.next` — анонимные volumes.

### Полезные команды внутри контейнера
```bash
docker compose -f docker-compose.dev.yml exec app npm run generate:types        # после правки коллекций
docker compose -f docker-compose.dev.yml exec app npx payload migrate:create <name>
docker compose -f docker-compose.dev.yml exec app npx payload generate:importmap  # после добавления admin-компонента
```

## Прод

- `Dockerfile` — multi-stage standalone (Next `output: 'standalone'`, образ ~250-350 МБ)
- `docker-compose.prod-port.yml` — **текущий прод**: single-app raw-порт `:8092`, без Traefik (домен — позже)
- `docker-compose.yml` / `docker-compose.prod-bg.yml` — варианты под Traefik (single / blue-green) — включаются вместе с доменом
- `docker-compose.local.yml` — локальная проверка прод-образа без Traefik (на :3001)

### На VPS (Traefik)
```bash
cp .env.example .env          # DOMAIN, DB_PASSWORD, PAYLOAD_SECRET (openssl rand -base64 32)
docker network create proxy   # если ещё нет общей сети с Traefik
docker compose up -d
docker compose logs -f app
```

Миграции Payload накатываются one-shot сервисом `migrate` до старта `app`.

## Структура
```
src/
  app/(frontend)/    — витрина: главная, /catalog, /product/[slug], /about, /care,
                       /horeca, /journal, /gallery, /order, /projects, /pages/[slug]
  app/(payload)/     — admin UI + REST/GraphQL (boilerplate Payload, не править вручную)
  collections/       — Categories, Products, Media, Orders, Pages, Subscribers,
                       Gallery, Projects, HorecaInquiries, Users
  globals/Homepage/  — редактируемая главная страница
  admin/             — кастомные компоненты Payload-админки:
                       admin.css, Logo, Icon, ImageCell, Dashboard,
                       OrdersListView, ProductWizard
  lib/data.ts        — единственная точка доступа к данным через Payload Local API
  lib/revalidate.ts  — ISR-сброс кэша из хуков
  components/        — Shell (nav+footer), ProductCard, ProductGallery,
                       Lightbox, StickyNav, fx/* (FadeIn/RevealMask/CountUp/Parallax)
  migrations/        — Payload миграции (накатываются на проде)
public/css|js        — дизайн-система и анимации (источник — _visual/)
scripts/             — seed.ts, import-aeva.ts
imports/aeva/        — `vases.json` / `tableware.json` / `about/delivery/contacts/hero.json`
                       + photos/{slug}/ (бэкап оригиналов для re-import; не в git)
_visual/             — переносимый референс CSS/JS, демо-данные, старые .php-вьюхи
```
> Дизайн-макеты (`design_handoff/`, `design_handoff_admin/`) — внутренняя референс-документация,
> не в git (хранятся локально). Подробные планы — тоже во внутренней вике `_local_docs/`.

## Доступы (dev — сменить для прода!)
- Админка: `admin@ceramic.local` / `ceramic123`

## Что дальше
Планы и состояние — во внутренней документации (`_local_docs/`, не в git).
Подробности по архитектуре и граблям — [CLAUDE.md](./CLAUDE.md).
