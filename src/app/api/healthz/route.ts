import { NextResponse } from 'next/server'

// Простой healthcheck для Docker HEALTHCHECK и Traefik. Без auth.
// Возвращает 200, если процесс Next отвечает. Не лезет в Postgres намеренно —
// если БД упадёт, мы хотим, чтобы фронт продолжал отдавать ISR-кэш, а не падал.
export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json({ ok: true, ts: Date.now() })
}
