import { notFound } from 'next/navigation'

// Ловит все непойманные пути и отдаёт стилизованный (frontend)/not-found.tsx.
// Конкретные роуты (/catalog, /product/[slug], /admin и т.д.) приоритетнее.
export default function CatchAll() {
  notFound()
}
