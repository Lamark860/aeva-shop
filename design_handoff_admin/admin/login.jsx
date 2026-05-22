// ---------- Login — сдержанный, без фото-полотна ----------
function AdminLogin() {
  return (
    <AdminPage style={{ background: 'var(--cer-bg)' }}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '440px' }}>
          {/* Лого */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '36px', marginBottom: '8px' }}>
              Керамика
            </div>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--cer-text-light)',
              }}
            >
              Мастерская · админка
            </div>
          </div>

          {/* Карточка формы */}
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--cer-border)',
              padding: '48px 48px 40px',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '28px',
                fontWeight: 400,
                lineHeight: 1.2,
                margin: '0 0 8px',
              }}
            >
              С возвращением.
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--cer-text-muted)', margin: '0 0 32px' }}>
              Войдите, чтобы добавить изделия или посмотреть заявки.
            </p>

            <div style={{ display: 'grid', gap: '20px' }}>
              <Field label="Email" value="anna@ceramic-studio.ru" />
              <Field label="Пароль" value="••••••••••" type="password" />
              <button style={{ ...btnPrimary, padding: '14px 22px', marginTop: '8px' }}>Войти</button>
            </div>
          </div>

          <div
            style={{
              fontSize: '12px',
              color: 'var(--cer-text-light)',
              textAlign: 'center',
              marginTop: '24px',
            }}
          >
            Забыли пароль?{' '}
            <a href="#" style={{ color: 'var(--cer-accent)', borderBottom: '1px solid var(--cer-accent)' }}>
              Сбросить
            </a>
          </div>
        </div>
      </div>
    </AdminPage>
  );
}

function Field({ label, value, type = 'text' }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--cer-text-muted)',
          marginBottom: '8px',
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      <input
        type={type}
        defaultValue={value}
        style={{
          width: '100%',
          padding: '14px 16px',
          border: '1px solid var(--cer-border)',
          background: '#fff',
          fontFamily: 'var(--cer-font-body)',
          fontSize: '15px',
          color: 'var(--cer-text)',
        }}
      />
    </div>
  );
}

Object.assign(window, { AdminLogin });
