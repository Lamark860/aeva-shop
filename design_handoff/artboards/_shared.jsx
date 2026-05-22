// Общие константы и хелперы для всех артбордов

// Все артборды оборачиваются в этот компонент, который даёт .cer-page контекст
// и нейтрализует 100vh у hero (артборды — фиксированного размера).
function CerPage({ children, style = {} }) {
  return (
    <div
      className="cer-page"
      style={{
        background: 'var(--cer-bg)',
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

// Навбар, как на референсе: лого слева, пункты справа
function CerNav({ active = '', light = false }) {
  const items = [
    ['home', 'Главная', '#'],
    ['catalog', 'Каталог', '#'],
    ['projects', 'Проекты', '#'],
    ['gallery', 'Галерея', '#'],
    ['order', 'На заказ', '#'],
  ];
  const color = light ? 'rgba(255,255,255,0.9)' : 'var(--cer-text)';
  return (
    <header
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '28px 56px',
        zIndex: 5,
        color,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--cer-font-heading)',
          fontSize: '22px',
          letterSpacing: '0.02em',
        }}
      >
        Керамика
      </div>
      <nav style={{ display: 'flex', gap: '36px' }}>
        {items.map(([key, label]) => (
          <a
            key={key}
            href="#"
            style={{
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color,
              borderBottom: active === key ? `1px solid ${light ? '#fff' : 'var(--cer-text)'}` : 'none',
              paddingBottom: '3px',
            }}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

// Маленький футер для длинных страниц (компактный)
function CerFooterMini() {
  return (
    <footer
      style={{
        background: 'var(--cer-text)',
        color: 'rgba(255,255,255,0.85)',
        padding: '48px 56px 32px',
        fontFamily: 'var(--cer-font-body)',
        fontSize: '13px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '20px', color: '#fff' }}>Керамика</div>
        <div style={{ display: 'flex', gap: '24px', opacity: 0.7 }}>
          <span>Instagram</span>
          <span>Telegram</span>
          <span>hello@ceramic-studio.ru</span>
        </div>
      </div>
    </footer>
  );
}

// Eyebrow / маленький над-заголовок
function Eyebrow({ children, color }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '12px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: color || 'var(--cer-accent)',
        marginBottom: '14px',
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

// Серая плашка-плейсхолдер для будущих фото
function PhotoPlaceholder({ ratio = '1/1', label, src, style = {}, imgStyle = {} }) {
  const wrap = {
    aspectRatio: ratio,
    background: 'var(--cer-bg-muted)',
    overflow: 'hidden',
    position: 'relative',
    ...style,
  };
  if (src) {
    return (
      <div style={wrap}>
        <img
          src={src}
          alt={label || ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...imgStyle }}
        />
      </div>
    );
  }
  return (
    <div style={wrap}>
      {label ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(43,43,43,0.4)',
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}

Object.assign(window, { CerPage, CerNav, CerFooterMini, Eyebrow, PhotoPlaceholder });
