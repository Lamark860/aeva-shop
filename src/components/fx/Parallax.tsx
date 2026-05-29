'use client'
import React, { useEffect, useRef } from 'react'

// Элемент медленно смещается при скролле — медленнее основного контента.
// Используется для фонов «атмосферных» полос.
export default function Parallax({
  children, speed = 0.18, className = '', style,
}: {
  children: React.ReactNode
  speed?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const tick = () => {
      const r = el.getBoundingClientRect()
      const center = r.top + r.height / 2
      const viewportCenter = window.innerHeight / 2
      const offset = (center - viewportCenter) * speed * -1
      el.style.transform = `translate3d(0, ${offset}px, 0)`
      raf = 0
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [speed])
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
