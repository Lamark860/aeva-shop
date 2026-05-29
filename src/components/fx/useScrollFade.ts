'use client'
import { useEffect, useRef } from 'react'

// IntersectionObserver: добавляет .is-visible когда элемент входит в viewport.
// CSS-классы fx-fade / fx-reveal-mask стартуют со скрытым состоянием,
// этот хук — единственный, кто их «зажигает».
export function useScrollFade<T extends HTMLElement = HTMLElement>(opts: {
  threshold?: number; once?: boolean; delay?: number
} = {}) {
  const { threshold = 0.15, once = true, delay = 0 } = opts
  const ref = useRef<T | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (delay) el.style.transitionDelay = `${delay}ms`
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-visible')
            if (once) io.unobserve(el)
          } else if (!once) {
            el.classList.remove('is-visible')
          }
        })
      },
      { threshold, rootMargin: '0px 0px -80px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once, delay])
  return ref
}
