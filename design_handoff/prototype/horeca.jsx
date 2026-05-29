// HorecaPage — отдельная B2B страница для ресторанов с case-study, процессом и формой

const HC_PHOTOS = {
  hero: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&h=1400&fit=crop&q=85',
  case1: 'https://images.unsplash.com/photo-1551218372-a8789b81b253?w=900&h=1100&fit=crop&q=80',
  case2: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900&h=1100&fit=crop&q=80',
  case3: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&h=1100&fit=crop&q=80',
  food1: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&h=900&fit=crop&q=80',
  food2: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&h=900&fit=crop&q=80',
  food3: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&h=900&fit=crop&q=80',
  food4: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&h=900&fit=crop&q=80',
};

function HorecaPage() {
  return (
    <React.Fragment>
      <HorecaHero />
      <HorecaMetrics />
      <HorecaPartners />
      <HorecaCases />
      <HorecaFoodStrip />
      <HorecaProcess />
      <HorecaForm />
    </React.Fragment>
  );
}

function HorecaHero() {
  return (
    <section
      style={{
        position: 'relative',
        height: '85vh',
        minHeight: '620px',
        overflow: 'hidden',
        background: '#1a1612',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={HC_PHOTOS.hero} alt="" className="fx-kenburns" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,15,12,0.55)' }} />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 56px',
          maxWidth: '1200px',
          margin: '0 auto',
          color: '#fff',
        }}
      >
        <FadeIn><Eb light>Для ресторанов и кафе</Eb></FadeIn>
        <h1
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: 'clamp(48px, 6vw, 88px)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#fff',
            margin: '8px 0 24px',
            letterSpacing: '-0.015em',
            maxWidth: '1000px',
          }}
        >
          <RevealMask as="span">Авторская посуда,</RevealMask>
          <br />
          <RevealMask as="span" delay={120}>сделанная под вашу концепцию.</RevealMask>
        </h1>
        <FadeIn delay={200}>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', maxWidth: '620px', margin: '0 0 36px', lineHeight: 1.6 }}>
            Разработка формы под концепцию заведения и производство партиями от 50 до 500 единиц.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <div>
            <a href="#contact" className="fx-btn fx-btn--primary">Обсудить проект</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function HorecaMetrics() {
  const [r1, v1] = useCountUp(12);
  const [r2] = useCountUp(0); // placeholder
  return (
    <section style={{ background: 'var(--cer-bg-alt)', padding: '64px 56px' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px',
        }}
      >
        <div ref={r1}>
          <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '52px', color: 'var(--cer-accent)', lineHeight: 1, marginBottom: '10px' }}>
            {v1}+
          </div>
          <div style={{ fontSize: '14px', color: 'var(--cer-text-muted)' }}>заведений по России</div>
        </div>
        <FadeIn delay={120}>
          <div>
            <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '52px', color: 'var(--cer-accent)', lineHeight: 1, marginBottom: '10px' }}>
              50–500
            </div>
            <div style={{ fontSize: '14px', color: 'var(--cer-text-muted)' }}>единиц в партии</div>
          </div>
        </FadeIn>
        <FadeIn delay={240}>
          <div>
            <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '52px', color: 'var(--cer-accent)', lineHeight: 1, marginBottom: '10px' }}>
              8–14
            </div>
            <div style={{ fontSize: '14px', color: 'var(--cer-text-muted)' }}>недель от эскиза до отгрузки</div>
          </div>
        </FadeIn>
        <FadeIn delay={360}>
          <div>
            <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '52px', color: 'var(--cer-accent)', lineHeight: 1, marginBottom: '10px' }}>
              Шамот
            </div>
            <div style={{ fontSize: '14px', color: 'var(--cer-text-muted)' }}>выдерживает посудомойку</div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function HorecaPartners() {
  return (
    <section style={{ padding: '100px 56px 60px', maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
      <SectionHeader eyebrow="Сотрудничества" title="С кем работали" center />
      <FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '24px', alignItems: 'center' }}>
          {['Norra', 'Утро', 'Поле', 'Хлеб & Соль', 'Sad', 'Эра'].map((name) => (
            <div
              key={name}
              style={{
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '22px',
                color: 'var(--cer-text-light)',
                borderTop: '1px solid var(--cer-border)',
                borderBottom: '1px solid var(--cer-border)',
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

function HorecaCases() {
  const cases = [
    {
      img: HC_PHOTOS.case1,
      place: 'Norra · авторский ресторан',
      project: '240 предметов · 6 форм',
      note: 'Тейстинг-сет, шамот, молочная глазурь',
      slug: 'norra',
    },
    {
      img: HC_PHOTOS.case2,
      place: 'Поле · фарм-ту-тэйбл',
      project: '180 предметов · 4 формы',
      note: 'Сезонное меню, шероховатый черепок',
      slug: 'etazh',
    },
    {
      img: HC_PHOTOS.case3,
      place: 'Утро · кафе завтраков',
      project: '320 предметов · 5 форм',
      note: 'Тарелки и кружки, выдерживают посудомойку',
      slug: 'utro-cafe',
    },
  ];
  return (
    <section style={{ padding: '60px 56px 100px', maxWidth: '1280px', margin: '0 auto' }}>
      <SectionHeader eyebrow="Кейсы" title="Готовые проекты на столах." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {cases.map((c, i) => (
          <NavLink
            key={i}
            to={`project/${c.slug}`}
            className="fx-card"
            style={{ color: 'var(--cer-text)', textDecoration: 'none', display: 'block' }}
          >
            <FadeIn delay={i * 80}>
              <div className="fx-card__img-wrap" style={{ overflow: 'hidden', marginBottom: '20px' }}>
                <img className="fx-card__img" src={c.img} alt="" style={{ aspectRatio: '4/5' }} loading="lazy" />
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cer-accent)', marginBottom: '8px' }}>
                {c.project}
              </div>
              <h3 className="fx-h3" style={{ margin: '0 0 8px', fontSize: '22px' }}>{c.place}</h3>
              <div style={{ fontSize: '14px', color: 'var(--cer-text-muted)' }}>{c.note}</div>
            </FadeIn>
          </NavLink>
        ))}
      </div>
    </section>
  );
}

function HorecaFoodStrip() {
  return (
    <section style={{ padding: '0 0 100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
        {[HC_PHOTOS.food1, HC_PHOTOS.food2, HC_PHOTOS.food3, HC_PHOTOS.food4].map((src, i) => (
          <FadeIn key={src} delay={i * 60}>
            <div style={{ overflow: 'hidden', aspectRatio: '1/1' }}>
              <img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn>
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--cer-text-light)' }}>
          Изделия в работе: ужин в Norra, завтрак в Утре, сет «Поля»
        </div>
      </FadeIn>
    </section>
  );
}

function HorecaProcess() {
  const steps = [
    { n: '01', title: 'Бриф', text: 'Обсуждаем концепцию, меню, объём партии и сроки. Час разговора голосом или встреча.' },
    { n: '02', title: 'Эскизы', text: '2–3 направления формы. Согласуем материал и тип глазури. Срок 1–2 недели.' },
    { n: '03', title: 'Прототипы', text: 'Один-два тестовых образца каждой утверждённой формы. Тестируете на реальном блюде.' },
    { n: '04', title: 'Производство', text: 'Партия от 50 до 500 единиц. Аванс 50%, доплата при отгрузке.' },
  ];
  return (
    <section style={{ background: 'var(--cer-bg-alt)', padding: '100px 56px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <SectionHeader eyebrow="Как работаем" title="От первого письма до сервировки." center />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          {steps.map((s, i) => (
            <FadeIn key={s.n} delay={i * 100}>
              <div>
                <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '24px', color: 'var(--cer-accent)', marginBottom: '16px' }}>
                  {s.n}
                </div>
                <h3 className="fx-h3" style={{ margin: '0 0 12px', fontSize: '22px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--cer-text-muted)', margin: 0 }}>{s.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function HorecaForm() {
  return (
    <section id="contact" style={{ padding: '120px 56px', maxWidth: '720px', margin: '0 auto' }}>
      <SectionHeader
        eyebrow="Расскажите о проекте"
        title="Обсудим вашу посуду."
        subtitle="Отвечу в течение рабочего дня. Если приложите концепцию или мудборд — ещё быстрее."
        center
      />
      <form style={{ display: 'grid', gap: '20px' }} onSubmit={(e) => { e.preventDefault(); alert('Демо: заявка отправлена'); }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Field label="Заведение" placeholder="Название" />
          <Field label="Город" placeholder="Москва" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Field label="Ваше имя" placeholder="" />
          <Field label="Должность" placeholder="Шеф, бренд-шеф, закупщик…" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Field label="Email" placeholder="" type="email" />
          <Field label="Телефон / Telegram" placeholder="" />
        </div>
        <Sel label="Тип проекта" options={['Новое заведение, открытие', 'Обновление концепции', 'Расширение действующего набора', 'Пока разведка']} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Sel label="Ориентир по партии" options={['до 50 единиц', '50–150', '150–300', '300+', 'Пока не знаю']} />
          <Sel label="К какому сроку" options={['не срочно', 'в течение квартала', 'к открытию', 'обсудим']} />
        </div>
        <Field label="Концепция или меню — пара слов" placeholder="Тейстинг, фарм-ту-тэйбл, японский бар…" textarea />
        {/* honeypot */}
        <input type="text" name="hp" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} />
        <div style={{ textAlign: 'center', paddingTop: '12px' }}>
          <button type="submit" className="fx-btn fx-btn--primary">Отправить заявку</button>
        </div>
      </form>
    </section>
  );
}

function Field({ label, placeholder, textarea, type = 'text' }) {
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
        <textarea placeholder={placeholder} rows={3} style={fieldStyle} />
      ) : (
        <input type={type} placeholder={placeholder} style={fieldStyle} />
      )}
    </div>
  );
}

function Sel({ label, options }) {
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
      <select style={fieldStyle}>
        <option>—</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

const fieldStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid var(--cer-border)',
  background: '#fff',
  fontFamily: 'var(--cer-font-body)',
  fontSize: '15px',
  color: 'var(--cer-text)',
  resize: 'vertical',
};

Object.assign(window, { HorecaPage });
