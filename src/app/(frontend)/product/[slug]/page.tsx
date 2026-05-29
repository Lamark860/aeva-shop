import React from 'react'
import { redirect } from 'next/navigation'
import Shell from '@/components/Shell'
import ProductCard from '@/components/ProductCard'
import ProductGallery from '@/components/ProductGallery'
import FadeIn from '@/components/fx/FadeIn'
import { getProductBySlug, getRelatedProducts, formatPriceFrom } from '@/lib/data'

// ISR: страницы товаров кэшируются и пересобираются по требованию (revalidatePath)
// или раз в час; новые slug'и рендерятся on-demand (dynamicParams по умолчанию true)
export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Изделие — Керамика' }
  const desc = product.short_description || product.story || `${product.name} — авторская керамика ручной работы.`
  return {
    title: `${product.name} — Керамика`,
    description: desc,
    openGraph: { title: product.name, description: desc, images: product.images.slice(0, 1) },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) redirect('/catalog')

  const features = (product.description ?? '')
    .split('\n').map((s) => s.trim()).filter(Boolean)

  const related = await getRelatedProducts(product.slug, product.categorySlug, 3)

  // JSON-LD Product (микроразметка для поиска)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description || product.story || product.name,
    image: product.images,
    category: product.category || undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <Shell active="catalog">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Хлебные крошки */}
      <div className="cer-page-header" style={{ paddingBottom: 16 }}>
        <div className="cer-container" style={{ textAlign: 'center' }}>
          <span className="cer-section__subtitle">
            <a href="/catalog" style={{ color: 'var(--cer-accent)' }}>Каталог</a>
            {product.category && (
              <>
                <span style={{ margin: '0 12px', color: 'var(--cer-text-light)' }}>·</span>
                <span>{product.category}</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Main 2-col: галерея + sticky info */}
      <section className="cer-section cer-section--no-top">
        <div className="cer-container">
          <div className="cer-product-v2">
            <FadeIn>
              <ProductGallery images={product.images} alt={product.name} />
            </FadeIn>

            <div className="cer-product-v2__info">
              <FadeIn>
                {product.category && <span className="cer-section__subtitle">{product.category}</span>}
                <h1 className="cer-product__name" style={{ margin: '8px 0 16px' }}>{product.name}</h1>

                <div className="cer-product-v2__price-row">
                  <span className="cer-product-v2__price-label">Ориентир</span>
                  <span className="cer-product-v2__price">{formatPriceFrom(product.price)}</span>
                </div>

                {(product.short_description || product.story) && (
                  <p className="cer-product-v2__intro">
                    {[product.short_description, product.story].filter(Boolean).join('. ')}
                  </p>
                )}

                {features.length > 0 && (
                  <ul className="cer-product-v2__features">
                    {features.map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                )}

                <div className="cer-product__actions">
                  <a href={`/order?product=${product.slug}`} className="cer-btn cer-btn--primary">
                    Заказать это изделие
                  </a>
                  <a href="/order" className="cer-btn cer-btn--outline">
                    Заказать похожее
                  </a>
                </div>

                <div className="cer-product-v2__hint">
                  Точная цена зависит от размера и финиша — обсудим в заявке.
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Specs: размеры / материал+история / уход */}
      {(product.sizes || product.material || product.story || product.care) && (
        <section className="cer-section" style={{ background: 'var(--cer-bg-alt)' }}>
          <div className="cer-container">
            <div className="cer-specs">
              {product.sizes && (
                <FadeIn>
                  <div>
                    <div className="cer-spec__label">Размеры</div>
                    <dl className="cer-spec__rows">
                      <div className="cer-spec__row"><dt>Высота</dt><dd>{product.sizes.height || '—'}</dd></div>
                      <div className="cer-spec__row"><dt>Диаметр</dt><dd>{product.sizes.diameter || '—'}</dd></div>
                      <div className="cer-spec__row"><dt>Объём</dt><dd>{product.sizes.volume || '—'}</dd></div>
                    </dl>
                  </div>
                </FadeIn>
              )}
              {(product.material || product.story) && (
                <FadeIn delay={80}>
                  <div>
                    <div className="cer-spec__label">Материал</div>
                    {product.material && (
                      <dl className="cer-spec__rows">
                        <div className="cer-spec__row"><dt>Состав</dt><dd>{product.material}</dd></div>
                      </dl>
                    )}
                    {product.story && (
                      <p className={'cer-spec__body' + (product.material ? ' cer-spec__body--with-rows' : '')}>
                        {product.story}
                      </p>
                    )}
                  </div>
                </FadeIn>
              )}
              {product.care && (
                <FadeIn delay={160}>
                  <div>
                    <div className="cer-spec__label">Уход</div>
                    <p className="cer-spec__body">{product.care}</p>
                    <a href="/care" className="cer-section__subtitle" style={{ display: 'inline-block', marginTop: 16, color: 'var(--cer-accent)', borderBottom: '1px solid var(--cer-accent)', paddingBottom: 3 }}>
                      Подробнее об уходе →
                    </a>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Похожие изделия */}
      {related.length > 0 && (
        <section className="cer-section">
          <div className="cer-container">
            <FadeIn>
              <div className="cer-section__title">
                <span className="cer-section__subtitle">Похожие работы</span>
                <h2>Из той же категории</h2>
              </div>
            </FadeIn>
            <div className="cer-grid cer-grid--3">
              {related.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 80}>
                  <ProductCard product={p} showCategory />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </Shell>
  )
}
