// ---------- Редактирование изделия — табы вместо простыни ----------
function AdminProductEdit() {
  const [tab, setTab] = React.useState('basic');
  const tabs = [
    ['basic', 'Основное'],
    ['photos', 'Фотографии'],
    ['details', 'Размеры и материал'],
    ['care', 'Уход'],
    ['seo', 'SEO'],
  ];
  return (
    <AdminPage>
      <div style={{ display: 'flex', height: '100%' }}>
        <AdminSidebar active="products" />
        <main style={{ flex: 1, overflow: 'auto' }}>
          <AdminTopBar
            crumbs={['Изделия']}
            title="Ваза «Поток»"
            cta="Сохранить"
            secondary="Посмотреть на сайте"
          />

          {/* Табы */}
          <div style={{ borderBottom: '1px solid var(--cer-border)', background: '#fff', padding: '0 40px' }}>
            <div style={{ display: 'flex', gap: '32px' }}>
              {tabs.map(([key, label]) => {
                const on = key === tab;
                return (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '20px 0',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      color: on ? 'var(--cer-accent)' : 'var(--cer-text-muted)',
                      borderBottom: on ? '2px solid var(--cer-accent)' : '2px solid transparent',
                      fontWeight: on ? 500 : 400,
                      cursor: 'pointer',
                      marginBottom: '-1px',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ padding: '40px', maxWidth: '900px' }}>
            <div style={{ background: '#fff', border: '1px solid var(--cer-border)', padding: '40px' }}>
              <FormField
                label="Название изделия"
                value="Ваза «Поток»"
                hint="Как изделие отображается на сайте. Например: «Ваза „Тишина“»."
              />
              <FormField
                label="Категория"
                value="Вазы"
                select={['Чаши', 'Вазы', 'Тарелки', 'Кружки', 'Наборы', 'Декор']}
                hint="Выберите, к какой группе относится изделие."
              />
              <FormField
                label="Короткое описание"
                value="Высокая ваза с асимметричным горлом"
                hint="1–2 предложения, видны в карточке каталога."
              />
              <FormField
                label="Цена (ориентир, от)"
                value="6500"
                suffix="₽"
                hint="На сайте показывается с приставкой «от». Можно менять при разговоре с клиентом."
              />
              <FormToggle
                label="Показывать в «Избранных работах» на главной"
                value={true}
                hint="Не больше 4–5 одновременно — это лицо сайта."
              />
              <FormField
                label="История изделия"
                value="Эта форма получилась случайно — стенка просела во время сушки, а горло встало под углом. Стало понятно, что это правильнее."
                textarea
                hint="Маленький рассказ — что особенного, как родилось. Видно на странице товара."
              />
              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid var(--cer-border)' }}>
                <button style={{ ...btnGhost, color: '#c0392b', borderColor: 'rgba(192,57,43,0.3)' }}>Удалить изделие</button>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={btnGhost}>Отменить</button>
                  <button style={btnPrimary}>Сохранить</button>
                </div>
              </div>
            </div>

            {/* Sidebar совет / подсказка */}
            <div
              style={{
                marginTop: '24px',
                background: 'var(--cer-bg-alt)',
                padding: '20px 24px',
                fontSize: '13px',
                color: 'var(--cer-text-muted)',
                lineHeight: 1.6,
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '22px', color: 'var(--cer-accent)', lineHeight: 1 }}>i</div>
              <div>
                <strong style={{ color: 'var(--cer-text)' }}>Совет:</strong> история изделия — это то, что отличает авторскую керамику от магазинной.
                Расскажите, как родилась форма, почему именно такой цвет, для какого случая делалось.
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminPage>
  );
}

function FormField({ label, value, hint, textarea, select, suffix }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '12px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--cer-text)',
          marginBottom: '8px',
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        {textarea ? (
          <textarea
            defaultValue={value}
            rows={4}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid var(--cer-border)',
              background: '#fff',
              fontFamily: 'var(--cer-font-body)',
              fontSize: '14px',
              color: 'var(--cer-text)',
              resize: 'vertical',
              lineHeight: 1.6,
            }}
          />
        ) : select ? (
          <select
            defaultValue={value}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid var(--cer-border)',
              background: '#fff',
              fontFamily: 'var(--cer-font-body)',
              fontSize: '14px',
              color: 'var(--cer-text)',
              appearance: 'none',
            }}
          >
            {select.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            defaultValue={value}
            style={{
              width: '100%',
              padding: '12px 16px',
              paddingRight: suffix ? '40px' : '16px',
              border: '1px solid var(--cer-border)',
              background: '#fff',
              fontFamily: 'var(--cer-font-body)',
              fontSize: '14px',
              color: 'var(--cer-text)',
            }}
          />
        )}
        {suffix && (
          <span
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '14px',
              color: 'var(--cer-text-light)',
            }}
          >
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <div style={{ fontSize: '12px', color: 'var(--cer-text-light)', marginTop: '6px', fontStyle: 'italic', lineHeight: 1.5 }}>
          {hint}
        </div>
      )}
    </div>
  );
}

function FormToggle({ label, value, hint }) {
  return (
    <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
      <button
        type="button"
        style={{
          width: '40px',
          height: '24px',
          borderRadius: '12px',
          background: value ? 'var(--cer-accent)' : 'var(--cer-border)',
          border: 'none',
          position: 'relative',
          cursor: 'pointer',
          flex: '0 0 40px',
          marginTop: '2px',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '3px',
            left: value ? '19px' : '3px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#fff',
            transition: 'left 200ms ease',
          }}
        />
      </button>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', color: 'var(--cer-text)', marginBottom: '4px' }}>{label}</div>
        {hint && <div style={{ fontSize: '12px', color: 'var(--cer-text-light)', fontStyle: 'italic' }}>{hint}</div>}
      </div>
    </div>
  );
}

Object.assign(window, { AdminProductEdit });
