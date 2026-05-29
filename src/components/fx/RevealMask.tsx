'use client'
import React from 'react'
import { useScrollFade } from './useScrollFade'

// Reveal-маска: текст «вылезает» снизу из-под обрезающей полосы.
// Применяется к строкам H1/H2 в hero, page-headers и т.п.
export default function RevealMask({
  children, as: Tag = 'span', delay = 0, className = '', style,
}: {
  children: React.ReactNode
  as?: any
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useScrollFade<HTMLElement>({ delay })
  const T: any = Tag
  return (
    <T ref={ref} className={('fx-reveal-mask ' + className).trim()} style={style}>
      <span className="fx-reveal-inner">{children}</span>
    </T>
  )
}
