// ---------- Dashboard ----------
// «Что в мастерской сегодня» — личный, не как корпоративный SaaS.

function AdminDashboard() {
  return (
    <AdminPage>
      <div style={{ display: 'flex', height: '100%' }}>
        <AdminSidebar active="dashboard" />
        <main style={{ flex: 1, overflow: 'auto' }}>
          <AdminTopBar
            title="Доброе утро, Анна."
            cta="Добавить изделие"
          />
          <div style={{ padding: '40px' }}>
            {/* Полоса срочного */}
            <div
              style={{
                background: 'var(--cer-text)',
                color: '#fff',
                padding: '24px 32px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--cer-accent)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--cer-font-heading)',
                  fontSize: '20px',
                  flex: '0 0 48px',
                }}
              >
                4
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '22px', marginBottom: '4px' }}>
                  Новые заявки за последние сутки
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                  3 индивидуальных заказа и 1 запрос от ресторана
                </div>
              </div>
              <button style={{ ...btnPrimary, background: '#fff', color: 'var(--cer-text)' }}>
                Открыть заявки →
              </button>
            </div>

            {/* Тройка карточек: дайджест */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
              <DigestCard label="Изделий в каталоге" value="24" delta="+3 за неделю" />
              <DigestCard label="Заявок всего" value="127" delta="68 — индивидуально, 12 — рестораны" />
              <DigestCard label="Подписаны на дневник" value="247" delta="последнее письмо 18 дней назад" warn />
            </div>

            {/* Две колонки: последние заявки + последние изделия */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '24px' }}>
              <Panel
                title="Последние заявки"
                action="Все заявки →"
                items={[
                  ['Мария К.', 'Хочется вазу под одну ветку, цвета сухой земли', '5 мин назад', 'new'],
                  ['Поле · Денис', 'Расширяем меню, нужны 80 новых тарелок', '2 часа назад', 'new'],
                  ['Олег Т.', 'Подарок жене — кружка для утреннего кофе', 'Вчера', 'new'],
                  ['Анастасия В.', 'Видела чашу «Рассвет», хочу две такие', '2 дня назад', 'done'],
                  ['Ресторан Норра', 'Доукомплектация после поломки', '3 дня назад', 'done'],
                ]}
              />
              <Panel
                title="Последние изделия"
                action="Все изделия →"
                photos={[
                  ['Ваза «Поток»', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&h=200&fit=crop&q=80'],
                  ['Чаша «Рассвет»', 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=200&h=200&fit=crop&q=80'],
                  ['Набор «Семья»', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200&h=200&fit=crop&q=80'],
                  ['Тарелка «Земля»', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop&q=80'],
                ]}
              />
            </div>
          </div>
        </main>
      </div>
    </AdminPage>
  );
}

function DigestCard({ label, value, delta, warn }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--cer-border)', padding: '24px 28px' }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cer-text-muted)', marginBottom: '12px' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '44px', color: 'var(--cer-text)', lineHeight: 1, marginBottom: '8px' }}>
        {value}
      </div>
      <div style={{ fontSize: '13px', color: warn ? 'var(--cer-accent)' : 'var(--cer-text-muted)' }}>
        {delta}
      </div>
    </div>
  );
}

function Panel({ title, action, items, photos }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--cer-border)' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--cer-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '20px', fontWeight: 400, margin: 0 }}>{title}</h3>
        <a href="#" style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cer-accent)' }}>
          {action}
        </a>
      </div>
      {items && (
        <div>
          {items.map(([who, msg, when, status], i) => (
            <div
              key={i}
              style={{
                padding: '16px 24px',
                borderBottom: i < items.length - 1 ? '1px solid var(--cer-border)' : 'none',
                display: 'grid',
                gridTemplateColumns: '6px 1fr auto',
                gap: '16px',
                alignItems: 'start',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  marginTop: '6px',
                  borderRadius: '50%',
                  background: status === 'new' ? 'var(--cer-accent)' : 'var(--cer-border)',
                }}
              />
              <div>
                <div style={{ fontSize: '14px', color: 'var(--cer-text)', marginBottom: '4px', fontWeight: 500 }}>{who}</div>
                <div
                  style={{
                    fontSize: '13px',
                    color: 'var(--cer-text-muted)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {msg}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--cer-text-light)', whiteSpace: 'nowrap' }}>{when}</div>
            </div>
          ))}
        </div>
      )}
      {photos && (
        <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {photos.map(([name, src], i) => (
            <div key={i} style={{ cursor: 'pointer' }}>
              <div style={{ aspectRatio: '1/1', overflow: 'hidden', marginBottom: '8px' }}>
                <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '14px' }}>{name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { AdminDashboard });
