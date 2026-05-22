// ProductPage — улучшенная страница товара.
// Размеры, материал, история, уход, похожие работы, sticky CTA.

function ProductPage({ slug }) {
  const product = getProduct(slug);
  const [main, setMain] = React.useState(0);
  const [lightbox, openLightbox] = useLightbox();
  const related = relatedProducts(product.slug, 3);

  return (
    <React.Fragment>
      {/* Crumb */}
      <section style={{ padding: '140px 56px 0', maxWidth: '1280px', margin: '0 auto' }}>
        <FadeIn>
          <div
            style={{
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--cer-text-light)',
              textAlign: 'center',
            }}
          >
            <NavLink to="catalog" style={{ color: 'var(--cer-accent)' }}>Каталог</NavLink>
            <span style={{ margin: '0 12px', color: 'var(--cer-text-light)' }}>·</span>
            <span>{product.categoryName}</span>
          </div>
        </FadeIn>
      </section>

      {/* Main 2-col */}
      <section style={{ padding: '40px 56px 100px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '64px', alignItems: 'start' }}>
          {/* Gallery */}
          <FadeIn>
            <div>
              <div
                className="fx-hoverable"
                style={{ overflow: 'hidden', cursor: 'zoom-in', aspectRatio: '1/1' }}
                onClick={() => openLightbox(product.images[main])}
              >
                <img
                  key={main}
                  src={product.images[main]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    animation: `pageIn 500ms ${EASE} both`,
                  }}
                />
              </div>
              {product.images.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  {product.images.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setMain(i)}
                      style={{
                        width: '80px',
                        height: '80px',
                        border: i === main ? '1px solid var(--cer-accent)' : '1px solid var(--cer-border)',
                        background: 'transparent',
                        padding: 0,
                        cursor: 'pointer',
                        opacity: i === main ? 1 : 0.6,
                        transition: 'opacity 250ms ease',
                      }}
                    >
                      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Info (sticky) */}
          <div className="fx-sticky-cta">
            <FadeIn>
              <Eb>{product.categoryName}</Eb>
              <h1 className="fx-h1" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: '8px 0 16px' }}>
                {product.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '32px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--cer-text-light)',
                  }}
                >
                  Ориентир от
                </span>
                <span style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '28px', color: 'var(--cer-text)' }}>
                  {product.priceFrom.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--cer-text-muted)', margin: '0 0 32px' }}>
                {product.short}. {product.story}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', borderTop: '1px solid var(--cer-border)' }}>
                {product.features.map((f, i) => (
                  <li
                    key={i}
                    style={{
                      padding: '14px 0',
                      borderBottom: '1px solid var(--cer-border)',
                      fontSize: '15px',
                      color: 'var(--cer-text)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--cer-accent)',
                        flex: '0 0 6px',
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <MagneticBtn to={`order?product=${product.slug}`} variant="primary">
                  Заказать это изделие
                </MagneticBtn>
                <MagneticBtn to="order" variant="outline-dark">
                  Заказать похожее
                </MagneticBtn>
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--cer-text-light)',
                  marginTop: '20px',
                  lineHeight: 1.6,
                }}
              >
                Точная цена зависит от размера и финиша — обсудим в заявке.
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section style={{ background: 'var(--cer-bg-alt)', padding: '80px 56px' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
          }}
        >
          <SpecBlock label="Размеры" rows={[['Высота', product.sizes.height], ['Диаметр', product.sizes.diameter], ['Объём', product.sizes.volume]]} />
          <SpecBlock label="Материал" rows={[['Состав', product.material]]} body={product.story} />
          <SpecBlock label="Уход" body={product.care} ctaLabel="Подробнее об уходе →" ctaTo="care" />
        </div>
      </section>

      {/* Related */}
      <section style={{ padding: '120px 56px', maxWidth: '1280px', margin: '0 auto' }}>
        <SectionHeader eyebrow="Похожие работы" title="Из той же категории" center />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {related.map((p, i) => (
            <ProductCard key={p.slug} product={p} showCategory delay={i * 80} />
          ))}
        </div>
      </section>

      {lightbox}
    </React.Fragment>
  );
}

function SpecBlock({ label, rows, body, ctaLabel, ctaTo }) {
  return (
    <FadeIn>
      <div>
        <div
          style={{
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--cer-accent)',
            marginBottom: '20px',
          }}
        >
          {label}
        </div>
        {rows && (
          <dl style={{ margin: 0 }}>
            {rows.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--cer-border)' }}>
                <dt style={{ fontSize: '14px', color: 'var(--cer-text-light)' }}>{k}</dt>
                <dd style={{ margin: 0, fontSize: '14px', color: 'var(--cer-text)' }}>{v || '—'}</dd>
              </div>
            ))}
          </dl>
        )}
        {body && (
          <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--cer-text-muted)', margin: rows ? '20px 0 0' : 0 }}>
            {body}
          </p>
        )}
        {ctaLabel && ctaTo && (
          <NavLink
            to={ctaTo}
            style={{
              display: 'inline-block',
              marginTop: '16px',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--cer-accent)',
              borderBottom: '1px solid var(--cer-accent)',
              paddingBottom: '3px',
            }}
          >
            {ctaLabel}
          </NavLink>
        )}
      </div>
    </FadeIn>
  );
}

Object.assign(window, { ProductPage });
