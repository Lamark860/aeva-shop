'use client'
import React, { useEffect, useRef, useState } from 'react'

// Счётчик 0 → target, запускается когда блок виден.
// Сохраняет суффикс «12+», «50–500» — для них рендерим как есть, без анимации.
export default function CountUp({
  value, duration = 1400, className,
}: { value: string | number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  // если value содержит нечисловые символы — рендерим как label
  const numeric = typeof value === 'number'
  const [val, setVal] = useState(numeric ? 0 : value)

  useEffect(() => {
    if (!numeric) return
    const el = ref.current
    if (!el) return
    const target = value as number
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now()
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - t, 3)
              setVal(Math.round(target * eased))
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration, numeric])

  return <span ref={ref} className={className}>{val}</span>
}
