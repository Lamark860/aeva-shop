// Маленькая иконка — collapsed sidebar и т.п.
import React from 'react'

export default function Icon() {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Керамика"
    >
      <circle cx={14} cy={14} r={13} stroke="#B7795A" strokeWidth={1.5} />
      <text
        x={14}
        y={19}
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontStyle="italic"
        fontSize={16}
        fill="#B7795A"
      >
        К
      </text>
    </svg>
  )
}
