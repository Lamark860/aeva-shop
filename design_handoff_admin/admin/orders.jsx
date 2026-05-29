// ---------- Заявки ----------
function AdminOrders() {
  const orders = [
    { who: 'Мария К.', email: 'maria@…', type: 'Ваза', purpose: 'Для себя', budget: '7-15к', when: '5 мин назад', msg: 'Хочется вазу под одну ветку, цвета сухой земли. Высота примерно 30 см.', status: 'new' },
    { who: 'Поле · Денис', email: 'denis@pole.cafe', type: 'HoReCa', purpose: '80 тарелок', budget: '—', when: '2 часа назад', msg: 'Расширяем меню, нужны 80 новых тарелок к сентябрю.', status: 'new', horeca: true },
    { who: 'Олег Т.', email: 'oleg@…', type: 'Кружка', purpose: 'Подарок жене', budget: '3-7к', when: 'Вчера', msg: 'Подарок жене — кружка для утреннего кофе, она любит молочные оттенки.', status: 'new' },
    { who: 'Анастасия В.', email: 'nastya@…', type: 'Чаша', purpose: 'Для себя', budget: '3-7к', when: '2 дня назад', msg: 'Видела чашу «Рассвет», хочу две такие — для меня и сестры.', status: 'in-progress' },
    { who: 'Ресторан Норра', email: 'chef@norra.…', type: 'HoReCa', purpose: 'Доукомплектация', budget: '—', when: '3 дня назад', msg: 'Часть посуды побилась после премьеры. Нужно 20 тарелок «тейстинг-сет».', status: 'done', horeca: true },
    { who: 'Игорь С.', email: 'igor@…', type: 'Набор', purpose: 'Свадебный подарок', budget: '15к+', when: '5 дней назад', msg: 'Свадебный подарок другу. Хочется набор из 6 чаш в едином характере.', status: 'done' },
  ];
  return (
    <AdminPage>
      <div style={{ display: 'flex', height: '100%' }}>
        <AdminSidebar active="orders" />
        <main style={{ flex: 1, overflow: 'auto' }}>
          <AdminTopBar
            title="Заявки"
            secondary="Экспорт"
          />
          <div style={{ padding: '32px 40px 40px' }}>
            {/* Фильтры */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', alignItems: 'center' }}>
              {[
                ['Все', 24],
                ['Новые', 4, true],
                ['В работе', 8],
                ['Готовы', 12],
                ['Только рестораны', 5],
              ].map(([label, n, primary], i) => (
                <button
                  key={i}
                  style={{
                    padding: '8px 14px',
                    border: '1px solid var(--cer-border)',
                    background: primary ? 'var(--cer-accent)' : '#fff',
                    color: primary ? '#fff' : 'var(--cer-text)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {label}
                  <span style={{ opacity: 0.7, fontSize: '11px' }}>{n}</span>
                </button>
              ))}
            </div>

            {/* Список карточек */}
            <div style={{ display: 'grid', gap: '12px' }}>
              {orders.map((o, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1px solid var(--cer-border)',
                    borderLeft: `3px solid ${o.status === 'new' ? 'var(--cer-accent)' : o.status === 'in-progress' ? '#D4A574' : 'var(--cer-border)'}`,
                    padding: '20px 24px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr auto auto',
                    gap: '24px',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '17px', marginBottom: '4px' }}>
                      {o.who}
                      {o.horeca && (
                        <span
                          style={{
                            marginLeft: '8px',
                            padding: '2px 8px',
                            background: 'var(--cer-text)',
                            color: '#fff',
                            fontSize: '10px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            verticalAlign: 'middle',
                          }}
                        >
                          HoReCa
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--cer-text-light)' }}>{o.email}</div>
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--cer-accent)',
                        marginBottom: '6px',
                      }}
                    >
                      <span>{o.type}</span>
                      <span style={{ color: 'var(--cer-text-light)' }}>·</span>
                      <span style={{ color: 'var(--cer-text-light)' }}>{o.purpose}</span>
                      {o.budget !== '—' && (
                        <React.Fragment>
                          <span style={{ color: 'var(--cer-text-light)' }}>·</span>
                          <span style={{ color: 'var(--cer-text-light)' }}>{o.budget}</span>
                        </React.Fragment>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: 'var(--cer-text-muted)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {o.msg}
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--cer-text-light)', whiteSpace: 'nowrap' }}>{o.when}</div>
                  <StatusPill status={o.status} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </AdminPage>
  );
}

function StatusPill({ status }) {
  const map = {
    new: { label: 'Новая', bg: 'rgba(183,121,90,0.12)', color: 'var(--cer-accent)' },
    'in-progress': { label: 'В работе', bg: 'rgba(212,165,116,0.15)', color: '#A06845' },
    done: { label: 'Готово', bg: 'rgba(43,43,43,0.06)', color: 'var(--cer-text-muted)' },
  };
  const s = map[status];
  return (
    <span
      style={{
        padding: '6px 14px',
        background: s.bg,
        color: s.color,
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {s.label}
    </span>
  );
}

// ---------- Детальная карточка заявки ----------
function AdminOrderDetail() {
  return (
    <AdminPage>
      <div style={{ display: 'flex', height: '100%' }}>
        <AdminSidebar active="orders" />
        <main style={{ flex: 1, overflow: 'auto' }}>
          <AdminTopBar
            crumbs={['Заявки', '↩ Назад к списку']}
            title="Мария К."
            cta="Ответить на email"
            secondary="Отметить «В работе»"
          />
          <div style={{ padding: '40px', maxWidth: '900px' }}>
            {/* Шапка */}
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--cer-border)',
                padding: '32px',
                marginBottom: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cer-accent)', marginBottom: '8px' }}>
                    Новая · 5 минут назад
                  </div>
                  <h2 style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '28px', fontWeight: 400, margin: '0 0 8px' }}>
                    Хочется вазу под одну ветку
                  </h2>
                  <div style={{ fontSize: '14px', color: 'var(--cer-text-muted)' }}>
                    От Мария К. · <a href="#" style={{ color: 'var(--cer-accent)' }}>maria@gmail.com</a> · +7 (___) ___-__-__
                  </div>
                </div>
                <StatusPill status="new" />
              </div>

              {/* Структурированные поля */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '20px',
                  padding: '24px 0',
                  borderTop: '1px solid var(--cer-border)',
                  borderBottom: '1px solid var(--cer-border)',
                  marginBottom: '24px',
                }}
              >
                <InfoBlock label="Тип" value="Ваза" />
                <InfoBlock label="Назначение" value="Для себя" />
                <InfoBlock label="Бюджет" value="7 000 – 15 000 ₽" />
                <InfoBlock label="Срок" value="В течение месяца" />
              </div>

              {/* Сообщение */}
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cer-text-light)', marginBottom: '12px' }}>
                  Описание заказа
                </div>
                <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--cer-text)', margin: 0 }}>
                  Хочется вазу под одну ветку, цвета сухой земли. Высота примерно 30 см, тонкое горло. Чтобы можно было поставить
                  на тумбочку у входа. Видела ваше в Instagram, очень близко по характеру — может быть что-то похожее?
                </p>
              </div>
            </div>

            {/* Заметка для себя */}
            <div style={{ background: 'var(--cer-bg-alt)', padding: '20px 24px', marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cer-text-light)', marginBottom: '10px' }}>
                Моя заметка (только для меня)
              </div>
              <textarea
                placeholder="Напишите что-то для себя — клиент это не увидит. Например: позвонить в субботу, переслать ссылку на похожее изделие…"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid var(--cer-border)',
                  background: '#fff',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  minHeight: '80px',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Действия */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                padding: '20px 24px',
                background: '#fff',
                border: '1px solid var(--cer-border)',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '13px', color: 'var(--cer-text-muted)', flex: 1 }}>
                Что делаем с заявкой?
              </div>
              <button style={btnGhost}>Архивировать</button>
              <button style={btnGhost}>В работу</button>
              <button style={btnPrimary}>Ответить на email →</button>
            </div>
          </div>
        </main>
      </div>
    </AdminPage>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cer-text-light)', marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '16px', color: 'var(--cer-text)', lineHeight: 1.3 }}>
        {value}
      </div>
    </div>
  );
}

Object.assign(window, { AdminOrders, AdminOrderDetail });
