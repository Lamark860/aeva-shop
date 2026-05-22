// CarePage · JournalPage · OrderPage — компактные страницы

// =================== CARE ===================
function CarePage() {
  const items = [
    { n: '01', title: 'Перед первым использованием', text: 'Промойте изделие тёплой водой с каплей нейтрального мыла. Шамот пористый, в первые дни может «потеть» — это нормально, через неделю проходит.' },
    { n: '02', title: 'Мытьё', text: 'Большинство моих изделий выдерживают посудомоечную машину. На странице каждого товара отмечено, можно ли — если не отмечено, лучше вручную мягкой губкой.' },
    { n: '03', title: 'Микроволновка и духовка', text: 'Шамотная посуда без металлических вкраплений ставится в духовку до 200°C и в микроволновку. Декор и изделия с грубой керамикой — только сервировка, не нагревать.' },
    { n: '04', title: 'Перепады температуры', text: 'Не заливайте кипяток в холодную чашу из холодильника и наоборот. Шамот это переносит лучше фарфора, но не любит резких контрастов.' },
    { n: '05', title: 'Скол или трещина', text: 'Напишите мне в личку — могу починить или сделать замену. Многое восстанавливается, не выбрасывайте сразу.' },
  ];
  return (
    <React.Fragment>
      <PageHero
        eyebrow="Уход"
        title="Как ухаживать за керамикой."
        subtitle="Шамот — материал прочный и неприхотливый, но пара деталей продлевают жизнь изделия на годы."
      />
      <section style={{ padding: '20px 56px 120px', maxWidth: '760px', margin: '0 auto' }}>
        {items.map((item, i) => (
          <FadeIn key={item.n} delay={i * 80}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '32px',
                padding: '36px 0',
                borderTop: '1px solid var(--cer-border)',
              }}
            >
              <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '24px', color: 'var(--cer-accent)' }}>{item.n}</div>
              <div>
                <h3 className="fx-h3" style={{ margin: '0 0 10px', fontSize: '24px' }}>{item.title}</h3>
                <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--cer-text-muted)', margin: 0 }}>{item.text}</p>
              </div>
            </div>
          </FadeIn>
        ))}
        <FadeIn>
          <div style={{ marginTop: '64px', padding: '32px', background: 'var(--cer-bg-alt)', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', color: 'var(--cer-text-muted)', lineHeight: 1.7 }}>
              Остались вопросы про конкретное изделие?{' '}
              <NavLink to="order" style={{ color: 'var(--cer-accent)', borderBottom: '1px solid' }}>Напишите мне</NavLink>
              , отвечу в течение дня.
            </div>
          </div>
        </FadeIn>
      </section>
    </React.Fragment>
  );
}

// =================== JOURNAL ===================
function JournalPage() {
  return (
    <React.Fragment>
      <PageHero
        eyebrow="Дневник мастерской"
        title="Раз в месяц короткое письмо."
        subtitle="Что в работе сейчас, какие формы рождаются, заметки про материал. Без рассылок, без скидок."
      />
      <section style={{ padding: '0 56px 80px', maxWidth: '560px', margin: '0 auto' }}>
        <FadeIn>
          <form
            onSubmit={(e) => { e.preventDefault(); alert('Демо: подписка оформлена'); }}
            style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              style={{ flex: 1, padding: '14px 18px', border: '1px solid var(--cer-border)', background: '#fff', fontFamily: 'var(--cer-font-body)', fontSize: '15px' }}
            />
            <button type="submit" className="fx-btn fx-btn--primary" style={{ padding: '0 28px' }}>
              Подписаться
            </button>
          </form>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ fontSize: '13px', color: 'var(--cer-text-light)', marginTop: '14px', textAlign: 'center' }}>
            Отписаться можно одним кликом. Сейчас подписаны 247 человек.
          </div>
        </FadeIn>
      </section>
      <section style={{ padding: '0 56px 140px', maxWidth: '720px', margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Eb>Пример прошлого письма</Eb>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <article style={{ background: '#fff', padding: '56px 64px', border: '1px solid var(--cer-border)' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cer-text-light)', marginBottom: '20px' }}>
              Март 2026 · письмо №14
            </div>
            <h2 className="fx-h2" style={{ margin: '0 0 28px', fontSize: 'clamp(24px, 3vw, 36px)' }}>
              Про серию «Земля» и обнажённый черепок
            </h2>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: '0 0 18px' }}>
              Привет. На этой неделе достала из печи первые шесть чаш «Земли». Это серия, в которой
              я почти не использую глазурь — оставляю шамот в его родной форме, только полирую
              места касания.
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: '0 0 18px' }}>
              Получилось не как задумывала: три чаши вышли темнее, чем рассчитывала. Сначала
              расстроилась, потом поняла, что это и есть та история, ради которой я делаю керамику
              без полной глазури — материал сам решает.
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: '0 0 24px' }}>
              На следующей неделе откроем продажи. Подписчикам — на день раньше.
            </p>
            <div
              style={{
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '28px',
                color: 'var(--cer-accent)',
                fontStyle: 'italic',
                opacity: 0.6,
                marginTop: '24px',
              }}
            >
              А.
            </div>
          </article>
        </FadeIn>
      </section>
    </React.Fragment>
  );
}

// =================== ORDER ===================
function OrderPage() {
  const [sent, setSent] = React.useState(false);
  return (
    <React.Fragment>
      <PageHero
        eyebrow="На заказ"
        title="Индивидуальный заказ"
        subtitle="Расскажите, какое изделие хотелось бы — я подготовлю эскиз и согласую с вами."
      />
      <section style={{ padding: '0 56px 140px', maxWidth: '720px', margin: '0 auto' }}>
        {sent ? (
          <FadeIn>
            <div
              style={{
                background: 'var(--cer-bg-alt)',
                padding: '64px 32px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--cer-accent)',
                  color: '#fff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '24px',
                  animation: `pageIn 600ms ${EASE} both`,
                }}
              >
                ✓
              </div>
              <h2 className="fx-h2" style={{ margin: '0 0 16px', fontSize: '32px' }}>Заявка отправлена.</h2>
              <p style={{ fontSize: '16px', color: 'var(--cer-text-muted)', maxWidth: '440px', margin: '0 auto 24px' }}>
                Обычно отвечаю в течение дня. Если срочно — пишите в Telegram, проверяю чаще.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="fx-btn fx-btn--outline-dark"
              >
                Отправить ещё
              </button>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              style={{ display: 'grid', gap: '20px' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <FormField label="Имя" placeholder="Как к вам обращаться" />
                <FormField label="Email" placeholder="your@email.com" type="email" />
              </div>
              <FormField label="Телефон / Telegram" placeholder="+7 (___) ___-__-__ или @username" />

              <FormSelect
                label="Что вы хотите заказать"
                options={['Ваза', 'Чаша', 'Тарелка / Блюдо', 'Кружка', 'Набор', 'Декор', 'Что-то другое']}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <FormSelect label="Назначение" options={['Для себя', 'Подарок', 'Интерьер', 'Не уверен(а)']} />
                <FormSelect label="К какому сроку" options={['не срочно', 'в течение месяца', 'к конкретной дате', 'обсудим']} />
              </div>

              <FormSelect
                label="Ориентир по бюджету"
                options={['до 3 000 ₽', '3 000 – 7 000 ₽', '7 000 – 15 000 ₽', '15 000+ ₽', 'Пока не знаю']}
              />

              <FormField
                label="Опишите, что хотелось бы"
                placeholder="Форма, размер, цвет, для чего — что приходит в голову. Можно совсем коротко."
                textarea
              />

              <FormField label="Ссылка на референс (необязательно)" placeholder="Фото в Instagram, Pinterest…" />

              {/* honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
              />

              <div style={{ textAlign: 'center', paddingTop: '12px' }}>
                <button type="submit" className="fx-btn fx-btn--primary">Отправить заявку</button>
                <div style={{ fontSize: '13px', color: 'var(--cer-text-light)', marginTop: '14px' }}>
                  Обычно отвечаю в течение дня
                </div>
              </div>
            </form>
          </FadeIn>
        )}
      </section>
    </React.Fragment>
  );
}

function FormField({ label, placeholder, textarea, type = 'text' }) {
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
      {textarea ? (
        <textarea
          placeholder={placeholder}
          rows={4}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid var(--cer-border)',
            background: '#fff',
            fontFamily: 'var(--cer-font-body)',
            fontSize: '15px',
            color: 'var(--cer-text)',
            resize: 'vertical',
          }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid var(--cer-border)',
            background: '#fff',
            fontFamily: 'var(--cer-font-body)',
            fontSize: '15px',
            color: 'var(--cer-text)',
          }}
        />
      )}
    </div>
  );
}

function FormSelect({ label, options }) {
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
      <select
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '1px solid var(--cer-border)',
          background: '#fff',
          fontFamily: 'var(--cer-font-body)',
          fontSize: '15px',
          color: 'var(--cer-text)',
          appearance: 'none',
          backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 12 8\'%3E%3Cpath fill=\'none\' stroke=\'%23B7795A\' stroke-width=\'1.5\' d=\'M1 1l5 5 5-5\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
          backgroundSize: '12px',
          paddingRight: '40px',
        }}
      >
        <option>—</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

Object.assign(window, { CarePage, JournalPage, OrderPage });
