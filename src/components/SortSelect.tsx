'use client'
import React from 'react'

// Селект сортировки в каталоге — submit при изменении (без JS-кнопки).
// Сохраняем уже выбранную категорию через hidden-инпут (read из props).
export default function SortSelect({ value, category }: { value: string; category: string | null }) {
  return (
    <form method="get" action="/catalog" className="cer-sort">
      <label htmlFor="sort">Сортировка:</label>
      {category && <input type="hidden" name="category" value={category} />}
      <select
        id="sort"
        name="sort"
        defaultValue={value}
        onChange={(e) => e.currentTarget.form?.submit()}
      >
        <option value="default">По умолчанию</option>
        <option value="new">Сначала новые</option>
        <option value="price_asc">Цена ↑</option>
        <option value="price_desc">Цена ↓</option>
      </select>
    </form>
  )
}
