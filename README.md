# ceramic

Магазин авторской керамики ручной работы. **Next.js 15 (App Router) + Payload 3 + Postgres.**
Витрина и админка — в одном приложении, Payload как встроенная CMS.

Перенесён со старого Yii2-модуля; дизайн-система и анимации сохранены без изменений
(см. `_visual/` — переносимый референс CSS/JS, демо-данные и старые вьюхи).

## Запуск локально

```bash
npm install

# Postgres для dev (отдельный контейнер на :5435)
docker start ceramic-next-pg   # уже создан; либо см. docker-compose.local.yml

npm run seed                   # схема + админ + демо-данные (идемпотентно)
npm run dev                    # http://localhost:3000
```

- Витрина: http://localhost:3000
- Админка: http://localhost:3000/admin

`.env` задаёт `DATABASE_URI` и `PAYLOAD_SECRET`. Схема в Postgres создаётся
автоматически (push-режим) при первом обращении Payload.

## Docker

- `Dockerfile` — multi-stage standalone (Next `output: 'standalone'`)
- `docker-compose.yml` — **продакшн** под Traefik (TLS/Let's Encrypt, без портов наружу)
- `docker-compose.local.yml` — локальная проверка прод-образа без Traefik

### Локально (прод-образ)
```bash
docker compose -f docker-compose.local.yml up --build
# витрина http://localhost:3001 · админка http://localhost:3001/admin
```

### На VPS (Traefik)
```bash
cp .env.example .env          # DOMAIN, DB_PASSWORD, PAYLOAD_SECRET (openssl rand -base64 32)
docker compose build
docker compose up -d
docker compose logs -f app
```
Подгони под свой Traefik: внешняя сеть (`proxy`), entrypoints (`web`/`websecure`),
certresolver (`letsencrypt`) — `docker network ls` и твой `traefik.yml`.
Первого админа заводишь на `/admin`.

**Про `./uploads:/app/media`:** том под загрузку файлов, но сейчас изображения —
внешние URL, не файлы. Пока том no-op; оживёт с upload-коллекцией `Media` (см. ниже).

## Структура
- `src/app/(frontend)/` — витрина (главная/каталог/товар/галерея/заявка)
- `src/app/(payload)/`  — admin UI + REST/GraphQL (boilerplate Payload)
- `src/collections/`    — Categories / Products / Gallery / Orders / Users
- `src/lib/data.ts`     — данные через Payload Local API (без HTTP)
- `src/components/`      — Shell (навбар/футер), ProductCard
- `public/css|js`        — дизайн-система и анимации
- `scripts/seed.ts`      — сидинг через `payload run`
- `_visual/`             — референс: исходный CSS/JS, демо-данные, старые .php-вьюхи

## Доступы (dev/спайк — сменить для прода!)
- Админка: `admin@ceramic.local` / `ceramic123`

## Дальнейшие шаги
- Media-коллекция Payload (upload) → фото через админку, том `uploads` оживает
- email-адаптер для уведомлений о заявках (сейчас в консоль)
- миграции Payload вместо push-режима для контролируемых деплоев
