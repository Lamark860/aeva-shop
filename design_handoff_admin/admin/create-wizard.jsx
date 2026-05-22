// ---------- Визард создания нового изделия ----------
// 4 шага: фото → название и категория → размеры и материал → описание.
// На каждом шаге — большая фотка/иллюстрация слева, минимум полей справа.

// Шаг 1 — Фото
function AdminCreateStep1() {
  return (
    <AdminCreateShell step={1} title="С чего начнём?" subtitle="Загрузите главную фотографию. Остальное добавим позже.">
      <div
        style={{
          border: '2px dashed var(--cer-border)',
          background: '#fff',
          padding: '80px 40px',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '40px',
            color: 'var(--cer-accent)',
            marginBottom: '16px',
          }}
        >
          ⤓
        </div>
        <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '22px', marginBottom: '12px' }}>
          Перетащите фотографию сюда
        </div>
        <div style={{ fontSize: '13px', color: 'var(--cer-text-muted)', marginBottom: '24px' }}>
          Или выберите с компьютера. Желательно квадратное фото, не меньше 1200×1200.
        </div>
        <button style={btnGhost}>Выбрать файл</button>
      </div>
      <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--cer-text-light)' }}>
        Можно также выбрать из{' '}
        <a href="#" style={{ color: 'var(--cer-accent)' }}>медиа-библиотеки</a>
      </div>
    </AdminCreateShell>
  );
}

// Шаг 2 — Название и категория
function AdminCreateStep2() {
  return (
    <AdminCreateShell
      step={2}
      title="Расскажите коротко"
      subtitle="Два-три поля — больше пока не нужно."
      preview="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop&q=80"
    >
      <FormFieldLite
        label="Как назвать изделие"
        placeholder="Например: Ваза «Поток»"
        hint="Имя в кавычках добавляет характер. Можно дать позже."
      />
      <FormFieldLite
        label="К какой категории относится"
        select={['Чаши', 'Вазы', 'Тарелки', 'Кружки', 'Наборы', 'Декор']}
        value="Вазы"
        hint="Если категории нет — создадите потом."
      />
      <FormFieldLite
        label="Цена-ориентир, ₽"
        placeholder="6500"
        hint="Можно изменить при разговоре с клиентом. На сайте отображается как «от 6 500 ₽»."
      />
    </AdminCreateShell>
  );
}

// Шаг 3 — Размеры и материал
function AdminCreateStep3() {
  return (
    <AdminCreateShell
      step={3}
      title="Размеры и материал"
      subtitle="Можно пропустить и дополнить позже."
      preview="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop&q=80"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <FormFieldLite label="Высота" placeholder="28 см" />
        <FormFieldLite label="Диаметр" placeholder="14 см" />
        <FormFieldLite label="Объём" placeholder="—" />
      </div>
      <FormFieldLite
        label="Материал"
        placeholder="Шамот, кратерная глазурь"
        hint="Из чего сделано, какая глазурь. Видно на странице товара."
      />
    </AdminCreateShell>
  );
}

// Шаг 4 — История + публикация
function AdminCreateStep4() {
  return (
    <AdminCreateShell
      step={4}
      title="История изделия"
      subtitle="Самое главное в авторской вещи. Можно одно предложение, можно три."
      preview="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop&q=80"
      isLast
    >
      <FormFieldLite
        label="Что особенного в этой работе"
        textarea
        placeholder="Эта форма получилась случайно — стенка просела во время сушки, а горло встало под углом. Стало понятно, что это правильнее."
        hint="Расскажите, как родилась форма, почему именно такой характер. Клиенту это важнее размеров."
      />

      <div
        style={{
          marginTop: '8px',
          padding: '20px 24px',
          background: 'var(--cer-bg-alt)',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'var(--cer-accent)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            flex: '0 0 20px',
            marginTop: '2px',
          }}
        >
          ✓
        </div>
        <div style={{ flex: 1, fontSize: '13px', color: 'var(--cer-text-muted)', lineHeight: 1.6 }}>
          После сохранения изделие сразу появится в каталоге. Если хотите подготовить и опубликовать
          позже — снимите галочку ниже.
        </div>
      </div>

      <FormToggleLite label="Опубликовать сразу" value={true} />
    </AdminCreateShell>
  );
}

// ---------- Shell-обёртка визарда ----------
function AdminCreateShell({ step, title, subtitle, preview, children, isLast }) {
  const steps = [
    { n: 1, label: 'Фото' },
    { n: 2, label: 'Название' },
    { n: 3, label: 'Размеры' },
    { n: 4, label: 'История' },
  ];
  return (
    <AdminPage>
      <div style={{ display: 'flex', height: '100%' }}>
        <AdminSidebar active="products" />
        <main style={{ flex: 1, overflow: 'auto', background: 'var(--cer-bg)' }}>
          {/* Верх с шагами */}
          <div style={{ background: '#fff', borderBottom: '1px solid var(--cer-border)', padding: '24px 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cer-text-light)', marginBottom: '6px' }}>
                  Новое изделие · шаг {step} из 4
                </div>
                <h1 style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '28px', fontWeight: 400, margin: 0 }}>
                  Добавляем изделие
                </h1>
              </div>
              <button style={btnGhost}>Закрыть</button>
            </div>

            {/* Stepper */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {steps.map((s, i) => {
                const done = step > s.n;
                const cur = step === s.n;
                return (
                  <React.Fragment key={s.n}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: done || cur ? 'var(--cer-accent)' : 'transparent',
                          border: '1px solid ' + (done || cur ? 'var(--cer-accent)' : 'var(--cer-border)'),
                          color: done || cur ? '#fff' : 'var(--cer-text-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontFamily: 'var(--cer-font-heading)',
                          fontWeight: 500,
                        }}
                      >
                        {done ? '✓' : s.n}
                      </div>
                      <span
                        style={{
                          fontSize: '13px',
                          color: cur ? 'var(--cer-text)' : 'var(--cer-text-light)',
                          fontWeight: cur ? 500 : 400,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        style={{
                          flex: 1,
                          height: '1px',
                          background: step > s.n ? 'var(--cer-accent)' : 'var(--cer-border)',
                          margin: '0 12px',
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Контент шага */}
          <div style={{ padding: '48px 40px' }}>
            <div
              style={{
                maxWidth: preview ? '960px' : '640px',
                margin: '0 auto',
                display: preview ? 'grid' : 'block',
                gridTemplateColumns: preview ? '1fr 1.2fr' : 'none',
                gap: '48px',
                alignItems: 'start',
              }}
            >
              {preview && (
                <div>
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#fff' }}>
                    <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--cer-text-light)', textAlign: 'center', marginTop: '12px' }}>
                    Так будет выглядеть в каталоге →
                  </div>
                </div>
              )}
              <div>
                <h2 style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '32px', fontWeight: 400, margin: '0 0 8px' }}>
                  {title}
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--cer-text-muted)', margin: '0 0 32px' }}>{subtitle}</p>
                <div style={{ display: 'grid', gap: '24px' }}>{children}</div>

                {/* Навигация */}
                <div
                  style={{
                    marginTop: '40px',
                    paddingTop: '24px',
                    borderTop: '1px solid var(--cer-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {step > 1 ? <button style={btnGhost}>← Назад</button> : <span />}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {!isLast && (
                      <a href="#" style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cer-text-light)' }}>
                        Пропустить шаг
                      </a>
                    )}
                    <button style={btnPrimary}>
                      {isLast ? 'Сохранить и опубликовать' : 'Дальше →'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminPage>
  );
}

// ---------- Поле визарда — крупнее и спокойнее ----------
function FormFieldLite({ label, placeholder, value, hint, textarea, select }) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '12px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--cer-text)',
          marginBottom: '10px',
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          defaultValue={value}
          placeholder={placeholder}
          rows={5}
          style={{
            width: '100%',
            padding: '14px 16px',
            border: '1px solid var(--cer-border)',
            background: '#fff',
            fontFamily: 'var(--cer-font-body)',
            fontSize: '15px',
            color: 'var(--cer-text)',
            resize: 'vertical',
            lineHeight: 1.7,
          }}
        />
      ) : select ? (
        <select
          defaultValue={value}
          style={{
            width: '100%',
            padding: '14px 16px',
            border: '1px solid var(--cer-border)',
            background: '#fff',
            fontFamily: 'var(--cer-font-body)',
            fontSize: '15px',
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
          placeholder={placeholder}
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
      )}
      {hint && (
        <div style={{ fontSize: '12px', color: 'var(--cer-text-light)', marginTop: '8px', fontStyle: 'italic', lineHeight: 1.5 }}>
          {hint}
        </div>
      )}
    </div>
  );
}

function FormToggleLite({ label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '4px 0' }}>
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
          }}
        />
      </button>
      <span style={{ fontSize: '14px', color: 'var(--cer-text)' }}>{label}</span>
    </div>
  );
}

Object.assign(window, { AdminCreateStep1, AdminCreateStep2, AdminCreateStep3, AdminCreateStep4 });
