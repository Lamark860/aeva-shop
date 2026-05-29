// CatalogPage — каталог с сайдбаром-категориями + сортировка.

function CatalogPage() {
  const [active, setActive] = React.useState('all');
  const [sort, setSort] = React.useState('default');

  const filtered = React.useMemo(() => {
    let list = active === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.priceFrom - a.priceFrom);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    return list;
  }, [active, sort]);

  return (
    <React.Fragment>
      <PageHero
        eyebrow="Каталог"
        title="Изделия"
        subtitle="Каждое изделие создано вручную с любовью к материалу. Цены — ориентир, точная стоимость зависит от размера и финиша."
      />
      <section style={{ padding: '40px 56px 140px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '64px', alignItems: 'start' }}>
          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '110px' }}>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--cer-text-light)',
                marginBottom: '20px',
              }}
            >
              Категории
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '4px' }}>
              {CATEGORIES.map((c) => {
                const on = c.slug === active;
                return (
                  <li key={c.slug}>
                    <button
                      type="button"
                      onClick={() => setActive(c.slug)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '8px 0',
                        fontSize: '15px',
                        cursor: 'pointer',
                        color: on ? 'var(--cer-accent)' : 'var(--cer-text)',
                        fontWeight: on ? 500 : 400,
                        textAlign: 'left',
                        width: '100%',
                        position: 'relative',
                        transition: 'color 250ms ease',
                      }}
                    >
                      {c.name}
                      {on && (
                        <span
                          style={{
                            position: 'absolute',
                            left: '-16px',
                            top: '50%',
                            width: '6px',
                            height: '6px',
                            background: 'var(--cer-accent)',
                            borderRadius: '50%',
                            transform: 'translateY(-50%)',
                          }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--cer-text-light)',
                marginTop: '48px',
                marginBottom: '12px',
              }}
            >
              Сортировка
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid var(--cer-border)',
                background: '#fff',
                fontSize: '14px',
                fontFamily: 'inherit',
                color: 'var(--cer-text)',
                cursor: 'pointer',
              }}
            >
              <option value="default">По порядку</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="name">По алфавиту</option>
            </select>

            <div
              style={{
                marginTop: '48px',
                padding: '20px',
                background: 'var(--cer-bg-alt)',
                fontSize: '13px',
                lineHeight: 1.6,
                color: 'var(--cer-text-muted)',
              }}
            >
              Не нашли нужного? Я делаю под заказ —{' '}
              <NavLink to="order" style={{ color: 'var(--cer-accent)', borderBottom: '1px solid' }}>
                обсудим
              </NavLink>
              .
            </div>
          </aside>

          {/* Grid */}
          <div
            key={active + sort}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              animation: `pageIn 500ms ${EASE} both`,
            }}
          >
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} showCategory delay={i * 60} />
            ))}
            {filtered.length === 0 && (
              <div
                style={{
                  gridColumn: '1/-1',
                  padding: '80px 40px',
                  textAlign: 'center',
                  background: 'var(--cer-bg-alt)',
                }}
              >
                <p style={{ fontSize: '17px', color: 'var(--cer-text-muted)', margin: 0 }}>
                  В этой категории пока пусто. Загляните позже или{' '}
                  <NavLink to="order" style={{ color: 'var(--cer-accent)', borderBottom: '1px solid' }}>
                    закажите индивидуально
                  </NavLink>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

Object.assign(window, { CatalogPage });
