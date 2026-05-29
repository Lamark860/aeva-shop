import React from 'react'
import Shell from '@/components/Shell'
import ProductCard from '@/components/ProductCard'
import SortSelect from '@/components/SortSelect'
import FadeIn from '@/components/fx/FadeIn'
import RevealMask from '@/components/fx/RevealMask'
import { getProducts, getCategories, type ProductSort } from '@/lib/data'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Каталог — Керамика' }

const VALID_SORTS: ProductSort[] = ['default', 'new', 'price_asc', 'price_desc']

export default async function Catalog({
  searchParams,
}: { searchParams: Promise<{ category?: string; sort?: string }> }) {
  const { category, sort: sortParam } = await searchParams
  const currentCategory = category ?? null
  const sort: ProductSort = (VALID_SORTS as string[]).includes(sortParam ?? '')
    ? (sortParam as ProductSort)
    : 'default'

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ categorySlug: currentCategory ?? undefined, sort }),
  ])

  return (
    <Shell active="catalog">
      <div className="cer-page-header">
        <div className="cer-container">
          <RevealMask as="div"><h1>Каталог</h1></RevealMask>
          <FadeIn delay={150}><p>Вазы, чаши, тарелки, кружки, наборы и декор. Каждое изделие в одном экземпляре.</p></FadeIn>
        </div>
      </div>

      <section className="cer-section cer-section--no-top">
        <div className="cer-container">
          <div className="cer-catalog">
            <FadeIn>
              <aside className="cer-catalog__sidebar">
                <div className="cer-catalog__filter-title">Категории</div>
                <ul className="cer-catalog__filter-list">
                  <li>
                    <a
                      href={'/catalog' + (sort !== 'default' ? `?sort=${sort}` : '')}
                      className={currentCategory === null ? 'active' : ''}
                    >
                      Все
                    </a>
                  </li>
                  {categories.map((cat) => {
                    const qs = new URLSearchParams()
                    qs.set('category', cat.slug)
                    if (sort !== 'default') qs.set('sort', sort)
                    return (
                      <li key={cat.slug}>
                        <a href={`/catalog?${qs.toString()}`} className={currentCategory === cat.slug ? 'active' : ''}>
                          {cat.name}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </aside>
            </FadeIn>
            <div>
              <div className="cer-catalog__toolbar">
                <span className="cer-catalog__count">
                  {products.length} {pluralize(products.length, ['изделие', 'изделия', 'изделий'])}
                </span>
                <SortSelect value={sort} category={currentCategory} />
              </div>

              <div className="cer-grid cer-grid--3">
                {products.map((p, i) => (
                  <FadeIn key={p.slug} delay={i * 60}>
                    <ProductCard product={p} showCategory />
                  </FadeIn>
                ))}
              </div>
              {products.length === 0 && (
                <p style={{ textAlign: 'center', padding: '60px 0', color: 'var(--cer-text-muted)' }}>
                  В этой категории пока нет изделий
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Shell>
  )
}

// Простое склонение для счётчика товаров.
function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}
