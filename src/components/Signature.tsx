import React from 'react'

// Подпись-клеймо мастера «А.» — как штамп на донышке керамики.
export default function Signature({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Клеймо мастера" style={{ display: 'block' }}>
      <circle cx="32" cy="32" r="29" fill="none" stroke="var(--cer-accent)" strokeWidth="1.25" opacity="0.55" />
      <text x="32" y="43" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif"
            fontStyle="italic" fontSize="34" fill="var(--cer-accent)">А</text>
    </svg>
  )
}
