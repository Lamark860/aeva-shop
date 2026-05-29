# Next.js 15 + Payload 3 — multi-stage standalone (образ ~250–350 МБ)
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

# --- зависимости ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# --- dev: hot reload через volume mount (см. docker-compose.dev.yml) ---
# Этот стейдж не несёт исходники — compose mount'ит весь репозиторий поверх /app,
# а node_modules/.next держим в анонимных volumes контейнера.
FROM base AS dev
WORKDIR /app
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json* ./
RUN npm ci
EXPOSE 3000
CMD ["npm", "run", "dev"]

# --- сборка ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Payload требует PAYLOAD_SECRET, чтобы инициализироваться при prerender ISR-страниц
# (/, /about, /care, /gallery, /projects) на этапе `next build`. Значение используется
# ТОЛЬКО во время сборки и НЕ попадает в финальный образ (стадия runner отдельная) —
# настоящий секрет приходит из env контейнера в рантайме. Без него build падает:
# "missing secret key. A secret key is needed to secure Payload."
RUN PAYLOAD_SECRET=build-time-placeholder-not-used-at-runtime npm run build

# --- финальный образ ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# папка под загрузки (для будущей Media-коллекции Payload)
RUN mkdir -p /app/media && chown nextjs:nodejs /app/media

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# /api/healthz возвращает 200 как только Next принимает запросы.
# Traefik и blue-green/raw-port deploy-скрипты ждут healthy перед переключением.
# ВАЖНО: 127.0.0.1, а НЕ localhost — busybox wget в alpine резолвит localhost в IPv6 ::1
# первым, а Next standalone слушает только IPv4 0.0.0.0:3000 → wget на ::1 даёт
# "Connection refused" и контейнер вечно unhealthy (хотя приложение работает).
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=5 \
  CMD wget --quiet --spider http://127.0.0.1:3000/api/healthz || exit 1

CMD ["node", "server.js"]
