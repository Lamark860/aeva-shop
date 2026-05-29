// ---------- Медиа-библиотека ----------
// Главный экран с фото + drag-n-drop. Это центральная фишка для мастера —
// он работает с фотографиями, и интерфейс должен это уважать.

function AdminMedia() {
  const photos = [
    { src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop&q=80', name: 'vaza-potok-01.jpg', size: '2.4 MB', used: 'Ваза «Поток»' },
    { src: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=400&h=400&fit=crop&q=80', name: 'rassvet-main.jpg', size: '1.8 MB', used: 'Чаша «Рассвет»' },
    { src: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop&q=80', name: 'semya-set.jpg', size: '3.1 MB', used: 'Набор «Семья»' },
    { src: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop&q=80', name: 'okean-blyudo.jpg', size: '2.0 MB', used: 'Блюдо «Океан»' },
    { src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=400&fit=crop&q=80', name: 'zemlya-plate.jpg', size: '1.6 MB', used: 'Тарелка «Земля»' },
    { src: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop&q=80', name: 'utro-kruzhka.jpg', size: '1.4 MB', used: null },
    { src: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=400&fit=crop&q=80', name: 'tishina-vaza.jpg', size: '2.2 MB', used: 'Ваза «Тишина»' },
    { src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=400&fit=crop&q=80', name: 'meditaciya.jpg', size: '1.3 MB', used: null },
    { src: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=400&h=400&fit=crop&q=80', name: 'vecher-decor.jpg', size: '1.9 MB', used: 'Подсвечник «Вечер»' },
    { src: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400&h=400&fit=crop&q=80', name: 'studio-01.jpg', size: '2.8 MB', used: 'Главная · О мастере' },
    { src: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=400&h=400&fit=crop&q=80', name: 'process-detail.jpg', size: '1.7 MB', used: 'Процесс' },
    { src: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=400&fit=crop&q=80', name: 'workshop-corner.jpg', size: '2.3 MB', used: null },
  ];
  return (
    <AdminPage>
      <div style={{ display: 'flex', height: '100%' }}>
        <AdminSidebar active="gallery" />
        <main style={{ flex: 1, overflow: 'auto' }}>
          <AdminTopBar
            title="Медиа-библиотека"
            cta="Загрузить фото"
            secondary="Папки"
          />
          <div style={{ padding: '32px 40px 40px' }}>
            {/* Drop zone */}
            <div
              style={{
                border: '2px dashed var(--cer-border)',
                background: '#fff',
                padding: '40px',
                textAlign: 'center',
                marginBottom: '32px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--cer-font-heading)',
                  fontSize: '28px',
                  color: 'var(--cer-accent)',
                  marginBottom: '12px',
                }}
              >
                ⤓
              </div>
              <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '20px', marginBottom: '8px' }}>
                Перетащите фотографии сюда
              </div>
              <div style={{ fontSize: '13px', color: 'var(--cer-text-muted)', marginBottom: '20px' }}>
                Или нажмите, чтобы выбрать. JPG, PNG, WEBP. До 10 МБ за фото.
              </div>
              <button style={btnGhost}>Выбрать с компьютера</button>
            </div>

            {/* Фильтры */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px' }}>
              {['Все · 142', 'Изделия · 96', 'Главная · 18', 'Проекты · 22', 'Не используется · 6'].map((c, i) => (
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
              <select
                style={{
                  padding: '8px 14px',
                  border: '1px solid var(--cer-border)',
                  background: '#fff',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
              >
                <option>Сначала новые</option>
                <option>Сначала старые</option>
                <option>По размеру</option>
              </select>
            </div>

            {/* Сетка фото */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              {photos.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1px solid var(--cer-border)',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
                    <img src={p.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    {!p.used && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: 'rgba(43,43,43,0.85)',
                          color: '#fff',
                          padding: '3px 8px',
                          fontSize: '10px',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Не используется
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--cer-text)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginBottom: '4px',
                      }}
                    >
                      {p.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--cer-text-light)' }}>
                      {p.size}
                      {p.used && (
                        <span style={{ color: 'var(--cer-accent)' }}> · {p.used}</span>
                      )}
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

Object.assign(window, { AdminMedia });
