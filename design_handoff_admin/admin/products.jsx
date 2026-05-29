// ---------- Список изделий — галерея, а не таблица ----------
function AdminProducts() {
  const items = [
    { name: 'Ваза «Поток»', cat: 'Вазы', price: 'от 6 500 ₽', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop&q=80', featured: true },
    { name: 'Чаша «Рассвет»', cat: 'Чаши', price: 'от 3 200 ₽', img: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=400&h=400&fit=crop&q=80', featured: true },
    { name: 'Набор «Семья»', cat: 'Наборы', price: 'от 8 900 ₽', img: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop&q=80', featured: true },
    { name: 'Блюдо «Океан»', cat: 'Тарелки', price: 'от 4 200 ₽', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop&q=80', featured: true },
    { name: 'Тарелка «Земля»', cat: 'Тарелки', price: 'от 2 400 ₽', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=400&fit=crop&q=80' },
    { name: 'Кружка «Утро»', cat: 'Кружки', price: 'от 1 800 ₽', img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop&q=80' },
    { name: 'Ваза «Тишина»', cat: 'Вазы', price: 'от 5 800 ₽', img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=400&fit=crop&q=80' },
    { name: 'Пиала «Медитация»', cat: 'Чаши', price: 'от 1 500 ₽', img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=400&fit=crop&q=80' },
    { name: 'Подсвечник «Вечер»', cat: 'Декор', price: 'от 2 100 ₽', img: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=400&h=400&fit=crop&q=80' },
  ];
  return (
    <AdminPage>
      <div style={{ display: 'flex', height: '100%' }}>
        <AdminSidebar active="products" />
        <main style={{ flex: 1, overflow: 'auto' }}>
          <AdminTopBar
            title="Изделия"
            cta="Добавить изделие"
            secondary="Импорт"
          />
          <div style={{ padding: '32px 40px 40px' }}>
            {/* Фильтры */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                marginBottom: '32px',
                flexWrap: 'wrap',
              }}
            >
              {['Все · 24', 'Чаши · 6', 'Вазы · 4', 'Тарелки · 5', 'Кружки · 3', 'Наборы · 4', 'Декор · 2'].map((c, i) => (
                <button
                  key={c}
                  style={{
                    padding: '8px 14px',
                    border: i === 0 ? '1px solid var(--cer-accent)' : '1px solid var(--cer-border)',
                    background: i === 0 ? 'var(--cer-accent)' : '#fff',
                    color: i === 0 ? '#fff' : 'var(--cer-text)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {c}
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <input
                type="text"
                placeholder="Поиск по названию"
                style={{
                  padding: '8px 14px',
                  border: '1px solid var(--cer-border)',
                  background: '#fff',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  width: '240px',
                }}
              />
            </div>

            {/* Галерея карточек */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {items.map((it, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1px solid var(--cer-border)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  {it.featured && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'var(--cer-accent)',
                        color: '#fff',
                        padding: '4px 10px',
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        zIndex: 2,
                      }}
                    >
                      Избранное
                    </div>
                  )}
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                    <img src={it.img} alt={it.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ padding: '16px 18px 18px' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cer-accent)', marginBottom: '6px' }}>
                      {it.cat}
                    </div>
                    <h3 style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '18px', fontWeight: 400, margin: '0 0 8px' }}>
                      {it.name}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: 'var(--cer-text-muted)' }}>{it.price}</span>
                      <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cer-accent)' }}>
                        Изменить →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </AdminPage>
  );
}

Object.assign(window, { AdminProducts });
