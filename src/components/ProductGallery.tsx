'use client'
import React, { useState } from 'react'
import Image from 'next/image'

// Главное фото + ряд thumb'ов. Клик по thumb сменяет main image.
// Простой клиент-компонент без либ. Lightbox можно добавить позже.
export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [main, setMain] = useState(0)
  if (!images || images.length === 0) return null
  return (
    <div>
      <div className="cer-product__main-image-wrap">
        <Image
          key={main}
          src={images[main]}
          alt={alt}
          fill
          priority
          className="cer-product__main-image"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      {images.length > 1 && (
        <div className="cer-product-v2__thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setMain(i)}
              className={'cer-product-v2__thumb' + (i === main ? ' cer-product-v2__thumb--active' : '')}
              aria-label={`Фото ${i + 1}`}
            >
              <Image src={src} alt="" width={80} height={80} sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
