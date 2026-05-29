// Лого для админки Payload — рендерится в шапке боковой панели.
// Простой текст-марка в Playfair Display.
import React from 'react'

export default function Logo() {
  return (
    <div
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 24,
        fontStyle: 'italic',
        color: '#fff',
        letterSpacing: '-0.01em',
        padding: '4px 0',
      }}
    >
      Керамика
    </div>
  )
}
