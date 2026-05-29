'use client'
import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

// Миниатюра для колонки «Фото» в списке изделий.
// Источник в порядке приоритета: первый загруженный photo (Media.url),
// иначе первый URL из массива images[]. Если ничего нет — серый плейсхолдер.
export default function ImageCell({ cellData, rowData }: DefaultCellComponentProps) {
  const photos = cellData as unknown
  let url: string | null = null

  if (Array.isArray(photos) && photos.length > 0) {
    const first = photos[0] as { url?: string } | number | string | null
    if (typeof first === 'object' && first?.url) url = first.url
  }

  if (!url && rowData && Array.isArray((rowData as any).images) && (rowData as any).images.length > 0) {
    url = (rowData as any).images[0]?.url ?? null
  }

  const styleBase: React.CSSProperties = {
    width: 48,
    height: 48,
    borderRadius: 4,
    objectFit: 'cover',
    background: '#E6DED6',
    display: 'block',
  }

  if (!url) return <div style={styleBase} aria-label="нет фото" />
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt="" style={styleBase} />
}
