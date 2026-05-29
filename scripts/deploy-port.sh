#!/usr/bin/env bash
# Деплой в raw-port режиме: один app-контейнер + проброс ${APP_PORT}, без Traefik/домена.
# Временный режим до выдачи домена. Когда домен приедет → перейти на blue-green:
# scripts/deploy.sh + docker-compose.prod-bg.yml (см. _local_docs/internal/deploy/auto-deploy.md).
#
# Использовать на VPS из корня репозитория:
#   ./scripts/deploy-port.sh
#
# Требования:
#   - docker-compose.prod-port.yml
#   - .env рядом: DB_PASSWORD, PAYLOAD_SECRET, APP_PORT, NEXT_PUBLIC_SERVER_URL
#   - Это НЕ blue-green: при ребилде app пересоздаётся (короткий блип, секунды).
#     Зато проще и не требует Traefik. Для zero-downtime — режим домена (blue-green).
set -euo pipefail

COMPOSE="docker compose -f docker-compose.prod-port.yml"

# Порт берём из .env (для финального health-check)
APP_PORT=$(grep -E '^APP_PORT=' .env 2>/dev/null | cut -d= -f2- | tr -d '[:space:]')
APP_PORT=${APP_PORT:-8092}

echo "→ Собираю образ…"
$COMPOSE build app

echo "→ Поднимаю postgres…"
$COMPOSE up -d postgres

echo "→ Накатываю миграции Payload…"
$COMPOSE run --rm migrate

echo "→ Пересоздаю app на :${APP_PORT}…"
# --no-deps: postgres/migrate уже отработали выше, не трогаем их
$COMPOSE up -d --no-deps app

echo "→ Жду Docker-healthcheck контейнера…"
for i in $(seq 1 60); do
  status=$(docker inspect --format='{{.State.Health.Status}}' ceramic-app 2>/dev/null || echo "")
  if [ "$status" = "healthy" ]; then
    echo "  ✓ ceramic-app healthy"
    break
  fi
  if [ "$i" = "60" ]; then
    echo "✗ ceramic-app не стал healthy за 60 итераций — логи:"
    $COMPOSE logs --tail=80 app
    exit 1
  fi
  sleep 2
done

echo "→ Внешний health-check http://localhost:${APP_PORT}/api/healthz …"
for i in 1 2 3 4 5 6; do
  if curl -fsS "http://localhost:${APP_PORT}/api/healthz" >/dev/null; then
    echo "  ✓ 200 OK"
    break
  fi
  if [ "$i" = "6" ]; then
    echo "✗ /api/healthz не ответил 200"
    exit 1
  fi
  echo "  ждём ($i)…"; sleep 3
done

echo "→ Чистка: висячие образы + build cache старше 14 дней (бережём диск общего VPS)…"
docker image prune -f
docker builder prune -f --filter until=336h

echo "✅ Готово. http://<IP>:${APP_PORT}  ·  admin: /admin"
