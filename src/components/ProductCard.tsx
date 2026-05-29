import React from 'react'
import Image from 'next/image'
import { formatPriceFrom, mainImage, type Product } from '@/lib/data'

export default function ProductCard({
  product, showCategory = false, showHint = false,
}: { product: Product; showCategory?: boolean; showHint?: boolean }) {
  return (
    <a href={`/product/${product.slug}`} className="cer-card">
      <div className="cer-card__image-wrap">
        <Image
          src={mainImage(product)}
          alt={product.name}
          fill
          className="cer-card__image"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        {product.inStock === false && <span className="cer-card__sold-out">Нет в наличии</span>}
      </div>
      <div className="cer-card__info">
        {showCategory && product.category && <span className="cer-card__category">{product.category}</span>}
        <h3 className="cer-card__name">{product.name}</h3>
        <div className="cer-card__price-row">
          <span className="cer-card__price">{formatPriceFrom(product.price)}</span>
          {showHint && (
            <span className="cer-card__price-hint">Точная цена — от размера и финиша</span>
          )}
        </div>
      </div>
    </a>
  )
}
