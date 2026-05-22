# spike-astro — Astro + Pocketbase

Прототип №1 для выбора стека. Витрина на Astro (SSR), данные и админка — Pocketbase.

## Запуск локально (быстрая итерация)

```bash
npm install

# 1) Pocketbase (бэкенд + админка)
./pocketbase serve            # http://127.0.0.1:8090  (админка: /_/)
#   первый раз — инициализация:
#   ./pocketbase migrate up
#   ./pocketbase admin create admin@ceramic.local ceramic123

# 2) Залить коллекции + демо-данные (идемпотентно)
npm run seed

# 3) Витрина
npm run dev                   # http://localhost:4321
```

Без запущенного Pocketbase витрина всё равно работает — падает на `seed.json`
(см. fallback в `src/lib/data.ts`), как demo-режим в оригинале.

## Запуск в Docker (как aeva-eat)

```bash
docker compose up --build     # витрина :4321, pocketbase :8090
# первый раз — засеять данные в контейнерный PB:
PB_URL=http://localhost:8090 npm run seed
```

## Доступы (спайк, не прод!)
- Админка Pocketbase: http://localhost:8090/_/ — `admin@ceramic.local` / `ceramic123`

## Что внутри
- `src/pages/` — главная, каталог (+фильтр), карточка товара, галерея, форма заявки
- `src/lib/data.ts` — слой данных (PB + fallback на seed)
- `src/layouts/Layout.astro` — общий каркас (навбар/футер/визуал)
- `public/css|js` — дизайн-система и анимации (копия из `_visual/`, не правлены)
- `scripts/seed.mjs` — коллекции + сидинг
- `pocketbase`, `pb_data/` — бинарник и БД (в .gitignore)

## Проверено
- Все страницы 200, данные читаются из PB
- Фильтр каталога по категориям
- Форма заявки → запись в PB `orders` с привязкой к товару (relation)
- Админка PB: CRUD товаров/категорий/галереи/заявок из коробки
- `npm run build` (SSR) собирается
