// Простой in-memory rate-limit (скользящее окно) по ключу (обычно IP).
// Достаточно для single-instance standalone-деплоя за Traefik. При горизонтальном
// масштабировании заменить на Redis. Память не растёт неограниченно: устаревшие
// метки чистятся при доступе к ключу + редкая полная уборка.
type Timestamps = number[]

const store = new Map<string, Timestamps>()
let lastSweep = 0

function sweep(now: number, windowMs: number): void {
  if (now - lastSweep < windowMs) return
  lastSweep = now
  for (const [key, hits] of store) {
    const fresh = hits.filter((t) => now - t < windowMs)
    if (fresh.length) store.set(key, fresh)
    else store.delete(key)
  }
}

/** true — запрос разрешён; false — лимит исчерпан. */
export function rateLimit(key: string, max = 5, windowMs = 10 * 60_000): boolean {
  const now = Date.now()
  sweep(now, windowMs)
  const hits = (store.get(key) ?? []).filter((t) => now - t < windowMs)
  if (hits.length >= max) {
    store.set(key, hits)
    return false
  }
  hits.push(now)
  store.set(key, hits)
  return true
}
