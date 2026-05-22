import React from 'react'
import { formatPrice, mainImage, type Product } from '@/lib/data'

export default function ProductCard({ product, showCategory = false }: { product: Product; showCategory?: boolean }) {
  return (
    <a href={`/product/${product.slug}`} className="cer-card">
      <div className="cer-card__image-wrap">
        <img src={mainImage(product)} alt={product.name} className="cer-card__image" loading="lazy" />
      </div>
      <div className="cer-card__info">
        {showCategory && product.category && <span className="cer-card__category">{product.category}</span>}
        <h3 className="cer-card__name">{product.name}</h3>
        <span className="cer-card__price">{formatPrice(product.price)}</span>
      </div>
    </a>
  )
}
