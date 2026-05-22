import React from 'react'
import { redirect } from 'next/navigation'
import Shell from '@/components/Shell'
import { getProductBySlug, formatPrice, mainImage } from '@/lib/data'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  return { title: product ? `${product.name} — Керамика` : 'Изделие — Керамика' }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) redirect('/catalog')

  const images = product.images ?? []
  const features = (product.description ?? '').split('\n').map((s) => s.trim()).filter(Boolean)

  return (
    <Shell active="catalog">
      <div className="cer-page-header">
        <div className="cer-container">
          <span className="cer-section__subtitle"><a href="/catalog">Каталог</a></span>
        </div>
      </div>

      <section className="cer-section cer-section--no-top">
        <div className="cer-container">
          <div className="cer-product">
            <div className="cer-product__gallery cer-fade-left">
              <img src={mainImage(product)} alt={product.name} className="cer-product__main-image" />
              {images.length > 1 && (
                <div className="cer-product__thumbs">
                  {images.map((img, i) => (
                    <img key={i} src={img} alt={product.name} className={`cer-product__thumb ${i === 0 ? 'cer-product__thumb--active' : ''}`} />
                  ))}
                </div>
              )}
            </div>

            <div className="cer-product__info cer-fade-right">
              {product.category && <div className="cer-product__category">{product.category}</div>}
              <h1 className="cer-product__name">{product.name}</h1>
              <span className="cer-product__price">{formatPrice(product.price)}</span>
              {features.length > 0 && (
                <ul className="cer-product__features">
                  {features.map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              )}
              <div className="cer-product__actions">
                <a href={`/order?product=${product.slug}`} className="cer-btn cer-btn--primary">Заказать</a>
                <a href="/catalog" className="cer-btn cer-btn--outline">Назад в каталог</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  )
}
