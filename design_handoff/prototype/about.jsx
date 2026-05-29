// AboutPage — личная страница автора, длинная и спокойная

const ABT = {
  portrait: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1100&h=1400&fit=crop&q=85',
  workshop: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1100&h=1100&fit=crop&q=85',
  hands: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=900&h=1100&fit=crop&q=80',
  wheel: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=900&h=1100&fit=crop&q=80',
  detail: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=900&h=1100&fit=crop&q=80',
};

function AboutPage() {
  return (
    <React.Fragment>
      <AboutIntro />
      <AboutQuote />
      <AboutMaterial />
      <AboutTriptych />
      <AboutThreeTypes />
      <AboutSignature />
    </React.Fragment>
  );
}

function AboutIntro() {
  return (
    <section style={{ padding: '180px 56px 100px', maxWidth: '1100px', margin: '0 auto' }}>
      <FadeIn><Eb>О мастере</Eb></FadeIn>
      <FadeIn delay={100}>
        <h1
          className="fx-h1"
          style={{ margin: '8px 0 56px', fontSize: 'clamp(56px, 7vw, 96px)' }}
        >
          Я делаю керамику,
          <br />
          с которой хочется
          <br />
          провести утро.
        </h1>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
        <FadeIn>
          <div style={{ overflow: 'hidden' }}>
            <img src={ABT.portrait} alt="Мастер" style={{ width: '100%', display: 'block', aspectRatio: '4/5', objectFit: 'cover' }} />
          </div>
        </FadeIn>
        <div style={{ paddingTop: '32px' }}>
          <FadeIn delay={100}>
            <p
              style={{
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '30px',
                fontWeight: 400,
                lineHeight: 1.4,
                color: 'var(--cer-text)',
                margin: '0 0 24px',
              }}
            >
              Меня зовут Анна. Я работаю с глиной уже двенадцать лет.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: '0 0 18px' }}>
              Пришла в керамику случайно — на воркшоп по гончарному кругу в дождливое воскресенье.
              К концу занятия знала: это надолго. Через год бросила предыдущую работу и купила первую
              печь — маленькую, дешёвую, постоянно ломающуюся. Сейчас у меня их три.
            </p>
          </FadeIn>
          <FadeIn delay={280}>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: 0 }}>
              Делаю штучные авторские работы и партии посуды для ресторанов. Считаю, что хорошая
              посуда — это та, которую берёшь в руки и не хочется отпускать.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function AboutQuote() {
  return (
    <section style={{ background: 'var(--cer-bg-alt)', padding: '120px 56px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <p
            style={{
              fontFamily: 'var(--cer-font-heading)',
              fontSize: 'clamp(28px, 3.6vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.35,
              color: 'var(--cer-text)',
              margin: 0,
              letterSpacing: '-0.005em',
            }}
          >
            «Я не пытаюсь делать идеально. Идеальное — холодное. Я хочу, чтобы было видно: это руки.»
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function AboutMaterial() {
  return (
    <section style={{ padding: '120px 56px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '64px', alignItems: 'center' }}>
        <FadeIn>
          <div style={{ overflow: 'hidden' }}>
            <img src={ABT.workshop} alt="" style={{ width: '100%', display: 'block', aspectRatio: '1/1', objectFit: 'cover' }} />
          </div>
        </FadeIn>
        <div>
          <FadeIn><Eb>Материал</Eb></FadeIn>
          <FadeIn delay={100}>
            <h2 className="fx-h2" style={{ margin: '6px 0 28px' }}>Шамот, без упрощений.</h2>
          </FadeIn>
          <FadeIn delay={180}>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: '0 0 18px' }}>
              Работаю только с шамотной глиной. Она тяжелее в обработке, чем фарфор или фаянс, —
              но именно она даёт ту самую тёплую, живую поверхность.
            </p>
          </FadeIn>
          <FadeIn delay={260}>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: 0 }}>
              Глазури мешаю сама. Двойной обжиг: первый при 950°C, второй при 1230°C. Иногда —
              третий, если работа просит ещё один слой.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function AboutTriptych() {
  return (
    <section style={{ padding: '0 56px 120px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '1280px', margin: '0 auto' }}>
        {[ABT.hands, ABT.wheel, ABT.detail].map((src, i) => (
          <FadeIn key={src} delay={i * 100}>
            <div style={{ overflow: 'hidden' }}>
              <img src={src} alt="" style={{ width: '100%', display: 'block', aspectRatio: '3/4', objectFit: 'cover' }} />
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function AboutThreeTypes() {
  const items = [
    {
      n: '01',
      title: 'Авторские штучные изделия',
      text: 'Вазы, чаши, декор. Каждое изделие — единственное. Живут в каталоге, можно купить или заказать что-то похожее.',
      cta: 'catalog',
      ctaLabel: 'Каталог →',
    },
    {
      n: '02',
      title: 'Индивидуальные заказы',
      text: 'Когда нужна вещь под конкретный интерьер или подарок. Обсуждаем, делаю эскиз, согласовываем — и в работу.',
      cta: 'order',
      ctaLabel: 'Заказать →',
    },
    {
      n: '03',
      title: 'Партии для ресторанов и кафе',
      text: 'Разработка формы под концепцию заведения и производство тиражом от 50 до 500 единиц. Срок от 8 недель.',
      cta: 'horeca',
      ctaLabel: 'Подробнее →',
    },
  ];
  return (
    <section style={{ padding: '0 56px 140px', maxWidth: '900px', margin: '0 auto' }}>
      <FadeIn><Eb>Что я делаю</Eb></FadeIn>
      <FadeIn delay={80}>
        <h2 className="fx-h2" style={{ margin: '6px 0 48px' }}>Три типа работ.</h2>
      </FadeIn>
      {items.map((item, i) => (
        <FadeIn key={item.n} delay={i * 100}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto',
              gap: '32px',
              padding: '36px 0',
              borderTop: '1px solid var(--cer-border)',
              alignItems: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '28px', color: 'var(--cer-accent)' }}>
              {item.n}
            </div>
            <div>
              <h3 className="fx-h3" style={{ margin: '0 0 8px', fontSize: '26px' }}>{item.title}</h3>
              <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--cer-text-muted)', margin: 0 }}>{item.text}</p>
            </div>
            <NavLink to={item.cta} className="fx-link" style={{ whiteSpace: 'nowrap' }}>
              {item.ctaLabel}
            </NavLink>
          </div>
        </FadeIn>
      ))}
    </section>
  );
}

function AboutSignature() {
  return (
    <section style={{ background: 'var(--cer-bg-alt)', padding: '120px 56px', textAlign: 'center' }}>
      <FadeIn><Eb>Поговорим</Eb></FadeIn>
      <FadeIn delay={100}>
        <h2 className="fx-h2" style={{ margin: '8px auto 32px', maxWidth: '720px' }}>
          Напишите, если хочется
          <br />
          обсудить вашу идею.
        </h2>
      </FadeIn>
      <FadeIn delay={200}>
        <MagneticBtn to="order" variant="primary">Связаться со мной</MagneticBtn>
      </FadeIn>
      <FadeIn delay={400}>
        <div
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '48px',
            color: 'var(--cer-accent)',
            marginTop: '64px',
            fontStyle: 'italic',
            opacity: 0.6,
          }}
        >
          А.
        </div>
      </FadeIn>
    </section>
  );
}

Object.assign(window, { AboutPage });
