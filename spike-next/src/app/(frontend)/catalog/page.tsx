import React from 'react'
import Shell from '@/components/Shell'
import ProductCard from '@/components/ProductCard'
import { getProducts, getCategories } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function Catalog({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams
  const currentCategory = category ?? null
  const categories = await getCategories()
  const products = await getProducts({ categorySlug: currentCategory ?? undefined })

  return (
    <Shell active="catalog">
      <div className="cer-page-header">
        <div className="cer-container">
          <div className="cer-text-reveal"><span className="cer-section__subtitle">Каталог</span></div>
          <div className="cer-text-reveal"><h1>Изделия</h1></div>
          <p>Каждое изделие создано вручную с любовью к материалу</p>
        </div>
      </div>

      <section className="cer-section cer-section--no-top">
        <div className="cer-container">
          <div className="cer-catalog">
            <aside className="cer-catalog__sidebar cer-fade-left">
              <div className="cer-catalog__filter-title">Категории</div>
              <ul className="cer-catalog__filter-list">
                <li><a href="/catalog" className={currentCategory === null ? 'active' : ''}>Все</a></li>
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <a href={`/catalog?category=${cat.slug}`} className={currentCategory === cat.slug ? 'active' : ''}>{cat.name}</a>
                  </li>
                ))}
              </ul>
            </aside>
            <div>
              <div className="cer-grid cer-grid--3 cer-fade-in">
                {products.map((p) => <ProductCard key={p.slug} product={p} showCategory={true} />)}
              </div>
              {products.length === 0 && (
                <p style={{ textAlign: 'center', padding: '60px 0', color: 'var(--cer-text-muted)' }}>В этой категории пока нет изделий</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Shell>
  )
}
