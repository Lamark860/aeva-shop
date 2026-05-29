#!/usr/bin/env bash
# Blue-green деплой для ceramic. Без даунтайма: новый цвет поднимается параллельно
# с активным, Traefik автоматически load-balance'ит, healthcheck исключает не-готовый
# backend. Старый цвет глушится только когда новый стабилен.
#
# Использовать на VPS из корня репозитория:
#   ./scripts/deploy.sh
#
# Требования:
#   - docker-compose.prod-bg.yml + .env с DOMAIN, DB_PASSWORD, PAYLOAD_SECRET
#   - Traefik в сети `proxy`
#   - Первый запуск: docker compose -f docker-compose.prod-bg.yml up -d postgres migrate app-blue
set -euo pipefail

COMPOSE="docker compose -f docker-compose.prod-bg.yml"
BLUE="ceramic-app-blue"
GREEN="ceramic-app-green"

# --- 1. Определить активный цвет (тот что running и healthy) ---
is_running() { docker ps --format '{{.Names}}' | grep -qx "$1"; }

if is_running "$BLUE" && ! is_running "$GREEN"; then
  ACTIVE="blue";  ACTIVE_NAME="$BLUE";  NEXT="green"; NEXT_NAME="$GREEN"
elif is_running "$GREEN" && ! is_running "$BLUE"; then
  ACTIVE="green"; ACTIVE_NAME="$GREEN"; NEXT="blue";  NEXT_NAME="$BLUE"
elif is_running "$BLUE" && is_running "$GREEN"; then
  echo "✗ Оба цвета уже подняты — что-то пошло не так в прошлом деплое."
  echo "  Проверьте 'docker ps' и остановите лишний вручную, потом повторите."
  exit 1
else
  echo "✗ Ни blue, ни green не запущены. Это первый запуск?"
  echo "  Запустите вручную: $COMPOSE up -d postgres migrate app-blue"
  exit 1
fi

echo "→ Активен: $ACTIVE  ·  поднимаем: $NEXT"

# --- 2. Собрать новый образ ---
echo "→ Собираю новый образ…"
$COMPOSE build "app-$NEXT"

# --- 3. Запустить миграции (separately, не блокируя активный) ---
echo "→ Накатываю миграции…"
$COMPOSE run --rm migrate

# --- 4. Запустить новый цвет ---
echo "→ Запускаю app-$NEXT…"
$COMPOSE --profile "$NEXT" up -d --no-deps "app-$NEXT"

# --- 5. Подождать healthy ---
echo "→ Жду healthcheck…"
for i in $(seq 1 60); do
  status=$(docker inspect --format='{{.State.Health.Status}}' "$NEXT_NAME" 2>/dev/null || echo "")
  if [ "$status" = "healthy" ]; then
    echo "  ✓ $NEXT healthy"
    break
  fi
  if [ "$i" = "60" ]; then
    echo "✗ $NEXT не стал healthy за 60 итераций — откатываю"
    $COMPOSE stop "app-$NEXT"
    exit 1
  fi
  sleep 2
done

# --- 6. Дать Traefik подхватить новый backend и убедиться что старый ещё работает ---
sleep 5

# --- 7. Остановить старый ---
echo "→ Останавливаю app-$ACTIVE…"
$COMPOSE stop "app-$ACTIVE"
$COMPOSE rm -f "app-$ACTIVE"

echo "✅ Готово. Активен: $NEXT"
