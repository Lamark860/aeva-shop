# spike-next — Next.js 15 + Payload 3 + Postgres

Прототип №2 для выбора стека. Витрина и админка — в одном Next-приложении,
Payload как встроенная CMS, данные в Postgres.

## Запуск локально

```bash
npm install

# Postgres (для dev поднят отдельным контейнером на :5435)
docker start ceramic-next-pg   # или см. docker-compose ниже

# Залить схему + админа + демо-данные (идемпотентно)
npm run seed                   # создаёт admin@ceramic.local / ceramic123

npm run dev                    # http://localhost:3000
```

- Витрина: http://localhost:3000
- Админка Payload: http://localhost:3000/admin

`.env` задаёт `DATABASE_URI` и `PAYLOAD_SECRET`. Схема в Postgres создаётся
автоматически (push-режим drizzle) при первом обращении Payload.

## Запуск в Docker (как aeva-eat)

```bash
docker compose up --build      # web :3000, postgres :5432(внутр.)
# первый раз — засеять:
docker compose exec web npm run seed
```

## Структура (Payload 3 — внутри Next App Router)
- `src/app/(frontend)/` — витрина (главная/каталог/товар/галерея/заявка)
- `src/app/(payload)/`  — admin UI + REST/GraphQL (boilerplate Payload)
- `src/collections/`    — Categories / Products / Gallery / Orders / Users
- `src/lib/data.ts`     — слой данных через **Payload Local API** (без HTTP)
- `src/components/`      — Shell (навбар/футер), ProductCard
- `public/css|js`        — дизайн-система и анимации (копия из `_visual/`)
- `scripts/seed.ts`      — `payload run` сидинг

## Доступы (спайк, не прод!)
- Админка: admin@ceramic.local / ceramic123

## Проверено
- Все страницы + /admin отдают 200
- Витрина читает из Payload (Postgres), фильтр каталога по категориям
- Форма заявки (server action) → запись в `orders` (подтверждено в Postgres)
- Админка Payload: CRUD всех коллекций
