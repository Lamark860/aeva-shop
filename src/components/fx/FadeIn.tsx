'use client'
import React from 'react'
import { useScrollFade } from './useScrollFade'

// Обёртка для появления секции/блока при попадании в viewport.
// Использует CSS-классы из styles/animations.css (fx-fade → +.is-visible).
export default function FadeIn({
  children, as = 'div', delay = 0, className = '', style,
}: {
  children: React.ReactNode
  as?: any
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useScrollFade<HTMLElement>({ delay })
  const Tag: any = as
  return (
    <Tag ref={ref} className={('fx-fade ' + className).trim()} style={style}>
      {children}
    </Tag>
  )
}
