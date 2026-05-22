#!/bin/sh
set -e
# первый запуск: инициализируем миграции и админа (идемпотентно)
./pocketbase migrate up 2>/dev/null || true
./pocketbase admin create "${PB_ADMIN_EMAIL:-admin@ceramic.local}" "${PB_ADMIN_PASS:-ceramic123}" 2>/dev/null || true
exec ./pocketbase serve --http=0.0.0.0:8090
