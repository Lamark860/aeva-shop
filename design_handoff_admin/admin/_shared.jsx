// Кастомная админка Payload — макеты в стилистике сайта.
// Принципы:
//  - Использовать дизайн-токены ceramic.css (терракота, кремовый, Playfair)
//  - Дружелюбные русские лейблы вместо технических
//  - Меньше «таблиц», больше карточек с фотками
//  - Главный экран = «что мне сегодня делать», а не список коллекций
//  - Группировка полей через табы — не простыня

// ---------- Shared ----------
const ADMIN = {
  bg: 'var(--cer-bg)',
  panel: '#fff',
  border: 'var(--cer-border)',
};

function AdminPage({ children, style = {} }) {
  return (
    <div
      className="cer-page"
      style={{
        background: ADMIN.bg,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Левая колонка-меню (общая для всех экранов админки)
function AdminSidebar({ active }) {
  const items = [
    ['dashboard', 'Главная', '◐'],
    ['products', 'Изделия', '◇'],
    ['categories', 'Категории', '⊟'],
    ['gallery', 'Галерея', '⊞'],
    ['projects', 'Проекты', '◈'],
    ['orders', 'Заявки', '✱', 3],
    ['horeca', 'Ресторанам', '☐', 1],
    ['journal', 'Дневник', '✎'],
    ['subscribers', 'Подписчики', '✓'],
  ];
  return (
    <aside
      style={{
        width: '260px',
        flex: '0 0 260px',
        background: 'var(--cer-text)',
        color: 'rgba(255,255,255,0.8)',
        padding: '28px 0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '0 28px 32px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '22px', color: '#fff' }}>
          Керамика
        </div>
        <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
          Мастерская · админка
        </div>
      </div>

      <nav style={{ padding: '20px 0', flex: 1 }}>
        {items.map(([key, label, icon, badge]) => {
          const on = key === active;
          return (
            <div
              key={key}
              style={{
                padding: '12px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                fontSize: '14px',
                background: on ? 'rgba(183,121,90,0.15)' : 'transparent',
                color: on ? '#fff' : 'rgba(255,255,255,0.7)',
                borderLeft: on ? '2px solid var(--cer-accent)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              <span style={{ color: on ? 'var(--cer-accent)' : 'rgba(255,255,255,0.4)', fontSize: '16px' }}>
                {icon}
              </span>
              <span style={{ flex: 1 }}>{label}</span>
              {badge ? (
                <span
                  style={{
                    background: 'var(--cer-accent)',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    fontWeight: 600,
                  }}
                >
                  {badge}
                </span>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--cer-accent)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--cer-font-heading)',
              fontSize: '16px',
            }}
          >
            А
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontSize: '13px' }}>Анна</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Мастер</div>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', cursor: 'pointer' }}>↗</span>
        </div>
      </div>
    </aside>
  );
}

// Верхняя «панель» страницы — крошки + заголовок + основной CTA
function AdminTopBar({ crumbs = [], title, cta, secondary }) {
  return (
    <div
      style={{
        padding: '24px 40px 24px',
        borderBottom: '1px solid var(--cer-border)',
        background: '#fff',
      }}
    >
      {crumbs.length > 0 && (
        <div style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cer-text-light)', marginBottom: '8px' }}>
          {crumbs.join(' · ')}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <h1 style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '34px', fontWeight: 400, margin: 0, letterSpacing: '-0.01em' }}>
          {title}
        </h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          {secondary && (
            <button style={btnGhost}>{secondary}</button>
          )}
          {cta && (
            <button style={btnPrimary}>{cta}</button>
          )}
        </div>
      </div>
    </div>
  );
}

const btnPrimary = {
  background: 'var(--cer-accent)',
  color: '#fff',
  border: 'none',
  padding: '11px 22px',
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: 'var(--cer-font-body)',
};
const btnGhost = {
  background: 'transparent',
  color: 'var(--cer-text)',
  border: '1px solid var(--cer-border)',
  padding: '11px 22px',
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontWeight: 500,
  cursor: 'pointer',
  fontFamily: 'var(--cer-font-body)',
};

Object.assign(window, { AdminPage, AdminSidebar, AdminTopBar, btnPrimary, btnGhost });
