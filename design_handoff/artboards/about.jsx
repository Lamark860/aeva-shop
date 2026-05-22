// «О мастере» — длинная редакционная страница. Не «команда и миссия»,
// а личная страница автора. Большой воздух, паузы, крупная типографика.

const PHOTO = {
  portrait1: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=900&h=1100&fit=crop&q=80',
  hands: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=900&h=700&fit=crop&q=80',
  workshop: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=900&h=900&fit=crop&q=80',
  wheel: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=900&h=1100&fit=crop&q=80',
  detail: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=900&h=900&fit=crop&q=80',
};

function About() {
  return (
    <CerPage>
      <CerNav active="about" />

      {/* Hero / введение */}
      <section style={{ padding: '180px 56px 100px', maxWidth: '1100px', margin: '0 auto' }}>
        <Eyebrow>О мастере</Eyebrow>
        <h1
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '84px',
            fontWeight: 400,
            lineHeight: 1.05,
            margin: '8px 0 48px',
            letterSpacing: '-0.015em',
            maxWidth: '900px',
          }}
        >
          Я делаю керамику,
          <br />
          с которой хочется
          <br />
          провести утро.
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }}>
          <PhotoPlaceholder src={PHOTO.portrait1} ratio="4/5" />
          <div style={{ paddingTop: '32px' }}>
            <p
              style={{
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '28px',
                fontWeight: 400,
                lineHeight: 1.4,
                color: 'var(--cer-text)',
                margin: 0,
                marginBottom: '24px',
              }}
            >
              Меня зовут Анна. Я работаю с глиной уже двенадцать лет.
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--cer-text-muted)' }}>
              Пришла в керамику случайно — на воркшоп по гончарному кругу в дождливое
              воскресенье. К концу занятия знала: это надолго. Через год бросила
              предыдущую работу и купила первую печь — маленькую, дешёвую, постоянно
              ломающуюся. Сейчас у меня их три.
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--cer-text-muted)' }}>
              Делаю штучные авторские работы и партии посуды для ресторанов.
              Считаю, что хорошая посуда — это та, которую берёшь в руки и не хочется
              отпускать.
            </p>
          </div>
        </div>
      </section>

      {/* Цитата */}
      <section style={{ background: 'var(--cer-bg-alt)', padding: '120px 56px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--cer-font-heading)',
              fontSize: '40px',
              fontWeight: 400,
              lineHeight: 1.35,
              color: 'var(--cer-text)',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            «Я не пытаюсь делать идеально. Идеальное — холодное.
            <br />
            Я хочу, чтобы было видно: это руки.»
          </p>
        </div>
      </section>

      {/* Двухколонник: фото мастерской + текст про материал */}
      <section style={{ padding: '120px 56px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <PhotoPlaceholder src={PHOTO.workshop} ratio="1/1" />
          <div>
            <Eyebrow>Материал</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '48px',
                fontWeight: 400,
                lineHeight: 1.15,
                margin: '6px 0 28px',
              }}
            >
              Шамот, без
              <br />
              упрощений.
            </h2>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: '0 0 18px' }}>
              Работаю только с шамотной глиной. Она тяжелее в обработке, чем фарфор
              или фаянс, — но именно она даёт ту самую тёплую, живую поверхность.
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: 0 }}>
              Глазури мешаю сама. Двойной обжиг: первый при 950°C, второй при 1230°C.
              Иногда — третий, если работа просит ещё один слой.
            </p>
          </div>
        </div>
      </section>

      {/* Триптих работы рук */}
      <section style={{ padding: '0 56px 120px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <PhotoPlaceholder src={PHOTO.hands} ratio="3/4" />
          <PhotoPlaceholder src={PHOTO.wheel} ratio="3/4" />
          <PhotoPlaceholder src={PHOTO.detail} ratio="3/4" />
        </div>
      </section>

      {/* Что я делаю */}
      <section style={{ padding: '0 56px 140px', maxWidth: '900px', margin: '0 auto' }}>
        <Eyebrow>Что я делаю</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '48px',
            fontWeight: 400,
            lineHeight: 1.15,
            margin: '6px 0 48px',
          }}
        >
          Три типа работ.
        </h2>
        {[
          {
            n: '01',
            title: 'Авторские штучные изделия',
            text: 'Вазы, чаши, декор. Каждое изделие — единственное. Они живут в каталоге, можно купить или заказать что-то похожее.',
          },
          {
            n: '02',
            title: 'Индивидуальные заказы',
            text: 'Когда нужна вещь под конкретный интерьер, под определённый цвет, форму, размер. Обсуждаем, делаю эскиз, согласовываем — и в работу.',
          },
          {
            n: '03',
            title: 'Партии для ресторанов и кафе',
            text: 'Разработка формы под концепцию заведения и производство тиражом от 50 до 500 единиц. Срок от 8 недель.',
          },
        ].map((item) => (
          <div
            key={item.n}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: '32px',
              padding: '32px 0',
              borderTop: '1px solid var(--cer-border)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '28px',
                color: 'var(--cer-accent)',
                paddingTop: '4px',
              }}
            >
              {item.n}
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--cer-font-heading)',
                  fontSize: '26px',
                  fontWeight: 400,
                  margin: '0 0 8px',
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--cer-text-muted)', margin: 0 }}>
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Подпись + CTA */}
      <section style={{ background: 'var(--cer-bg-alt)', padding: '120px 56px', textAlign: 'center' }}>
        <Eyebrow>Поговорим</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '56px',
            fontWeight: 400,
            lineHeight: 1.1,
            margin: '8px 0 32px',
          }}
        >
          Напишите, если хочется
          <br />
          обсудить вашу идею.
        </h2>
        <a
          href="#"
          style={{
            display: 'inline-block',
            padding: '15px 40px',
            background: 'var(--cer-accent)',
            color: '#fff',
            fontSize: '13px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Связаться со мной
        </a>
        <div
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '40px',
            color: 'var(--cer-accent)',
            marginTop: '64px',
            fontStyle: 'italic',
            opacity: 0.7,
          }}
        >
          А.
        </div>
      </section>

      <CerFooterMini />
    </CerPage>
  );
}

Object.assign(window, { About });
