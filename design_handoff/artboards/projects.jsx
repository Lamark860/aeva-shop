// «Проекты» — case study портфолио. Не просто галерея, а законченные работы:
// серия ваз для интерьера, посуда для ресторана, авторская коллекция.

const PRJ_PHOTO = {
  norra: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop&q=80',
  norra2: 'https://images.unsplash.com/photo-1551218372-a8789b81b253?w=900&h=900&fit=crop&q=80',
  norra3: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900&h=900&fit=crop&q=80',
  interior: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop&q=80',
  zemlya: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=1200&h=800&fit=crop&q=80',
  morning: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=1200&h=800&fit=crop&q=80',
};

// ---------- Список проектов ----------
function ProjectsList() {
  const projects = [
    {
      year: '2026',
      type: 'Для ресторана',
      title: 'Norra · посуда для тейстинга',
      subtitle: '240 предметов · 6 форм · шамот',
      desc: 'Разработка полной линейки тарелок и блюд для авторского сет-меню. От формовки до отгрузки — четыре месяца.',
      img: PRJ_PHOTO.norra,
    },
    {
      year: '2025',
      type: 'Частный заказ',
      title: 'Серия ваз «Этаж»',
      subtitle: '6 объектов · частный интерьер · Москва',
      desc: 'Шесть напольных и настольных ваз для квартиры в Хамовниках. Согласование форм под существующий интерьер.',
      img: PRJ_PHOTO.interior,
    },
    {
      year: '2025',
      type: 'Авторская коллекция',
      title: 'Земля · ограниченная серия',
      subtitle: '12 изделий · шамот, неполная глазурь',
      desc: 'Личная серия — чаши, блюда и кувшины с обнажённым черепком. Каждое изделие в единственном экземпляре.',
      img: PRJ_PHOTO.zemlya,
    },
    {
      year: '2024',
      type: 'Для кафе',
      title: 'Утро · посуда для завтраков',
      subtitle: '180 предметов · 4 формы · кафе «Утро»',
      desc: 'Тарелки, мисочки и кружки для меню завтраков. Молочный шамот, мягкая форма, выдерживает посудомойку.',
      img: PRJ_PHOTO.morning,
    },
  ];
  return (
    <CerPage>
      <CerNav active="projects" />

      <section style={{ padding: '180px 56px 80px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow>Проекты</Eyebrow>
        <h1
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '84px',
            fontWeight: 400,
            lineHeight: 1.05,
            margin: '8px 0 24px',
            letterSpacing: '-0.015em',
          }}
        >
          Работы со смыслом.
        </h1>
        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.7,
            color: 'var(--cer-text-muted)',
            maxWidth: '560px',
            margin: '0 auto',
          }}
        >
          Законченные истории — серии под интерьеры, посуда для ресторанов,
          авторские коллекции. От идеи до результата.
        </p>
      </section>

      <section style={{ padding: '40px 56px 140px', maxWidth: '1200px', margin: '0 auto' }}>
        {projects.map((p, i) => (
          <a
            href="#"
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '1.3fr 1fr' : '1fr 1.3fr',
              gap: '64px',
              alignItems: 'center',
              padding: '64px 0',
              borderTop: '1px solid var(--cer-border)',
              color: 'var(--cer-text)',
            }}
          >
            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <PhotoPlaceholder src={p.img} ratio="3/2" />
            </div>
            <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--cer-accent)',
                  marginBottom: '20px',
                }}
              >
                <span>{p.year}</span>
                <span style={{ color: 'var(--cer-text-light)' }}>·</span>
                <span style={{ color: 'var(--cer-text-light)' }}>{p.type}</span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--cer-font-heading)',
                  fontSize: '40px',
                  fontWeight: 400,
                  lineHeight: 1.15,
                  margin: '0 0 8px',
                }}
              >
                {p.title}
              </h2>
              <div
                style={{
                  fontSize: '15px',
                  color: 'var(--cer-text-light)',
                  marginBottom: '20px',
                }}
              >
                {p.subtitle}
              </div>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.75,
                  color: 'var(--cer-text-muted)',
                  margin: '0 0 28px',
                  maxWidth: '480px',
                }}
              >
                {p.desc}
              </p>
              <span
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--cer-accent)',
                  borderBottom: '1px solid var(--cer-accent)',
                  paddingBottom: '4px',
                  fontWeight: 500,
                }}
              >
                Смотреть проект →
              </span>
            </div>
          </a>
        ))}
      </section>

      <CerFooterMini />
    </CerPage>
  );
}

// ---------- Развёрнутый case study ----------
function ProjectDetail() {
  return (
    <CerPage>
      <CerNav active="projects" />

      {/* Шапка */}
      <section style={{ padding: '180px 56px 64px', maxWidth: '1100px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--cer-accent)',
            marginBottom: '24px',
            justifyContent: 'center',
          }}
        >
          <span>2026</span>
          <span style={{ color: 'var(--cer-text-light)' }}>·</span>
          <span style={{ color: 'var(--cer-text-light)' }}>Для ресторана</span>
        </div>
        <h1
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '84px',
            fontWeight: 400,
            lineHeight: 1.05,
            margin: '0 0 16px',
            textAlign: 'center',
            letterSpacing: '-0.015em',
          }}
        >
          Norra · посуда
          <br />
          для тейстинга
        </h1>
        <p
          style={{
            fontSize: '18px',
            lineHeight: 1.6,
            color: 'var(--cer-text-muted)',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          240 предметов, шесть форм, шамот с молочной полуматовой глазурью.
        </p>
      </section>

      {/* Главное фото */}
      <section style={{ padding: '40px 56px 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <PhotoPlaceholder src={PRJ_PHOTO.norra} ratio="3/2" />
        </div>
      </section>

      {/* Факты проекта */}
      <section style={{ background: 'var(--cer-bg-alt)', padding: '80px 56px' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
          }}
        >
          {[
            ['Заведение', 'Norra, авторский ресторан'],
            ['Объём', '240 предметов, 6 форм'],
            ['Материал', 'Шамот, ручная глазурь'],
            ['Срок', '14 недель от эскиза до отгрузки'],
          ].map(([k, v]) => (
            <div key={k}>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--cer-text-light)',
                  marginBottom: '10px',
                }}
              >
                {k}
              </div>
              <div
                style={{
                  fontFamily: 'var(--cer-font-heading)',
                  fontSize: '20px',
                  lineHeight: 1.35,
                  color: 'var(--cer-text)',
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Текст про процесс */}
      <section style={{ padding: '120px 56px', maxWidth: '760px', margin: '0 auto' }}>
        <Eyebrow>История проекта</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '40px',
            fontWeight: 400,
            lineHeight: 1.2,
            margin: '8px 0 32px',
          }}
        >
          Как мы пришли к этой форме.
        </h2>
        <p style={{ fontSize: '18px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: '0 0 18px' }}>
          Шеф Norra искал посуду, которая не отвлекает от блюда, но и не растворяется
          в нём. На тейстинге одно блюдо живёт 4-6 минут — за это время гость должен
          обратить внимание на форму один раз, в первую секунду.
        </p>
        <p style={{ fontSize: '18px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: '0 0 18px' }}>
          Сделали восемь эскизов, шесть прототипов, четыре полных тестовых сета на
          реальном меню. Финальная форма — асимметричная тарелка с глубоким бортом
          с одной стороны и почти плоской с другой.
        </p>
        <p style={{ fontSize: '18px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: 0 }}>
          Глазурь — молочно-матовая с лёгкой кратерной структурой. Тон подобран
          под основное освещение зала.
        </p>
      </section>

      {/* Два фото — деталь + готовый стол */}
      <section style={{ padding: '0 56px 120px' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          <PhotoPlaceholder src={PRJ_PHOTO.norra2} ratio="1/1" />
          <PhotoPlaceholder src={PRJ_PHOTO.norra3} ratio="1/1" />
        </div>
      </section>

      {/* Цитата клиента */}
      <section style={{ background: 'var(--cer-text)', color: '#fff', padding: '120px 56px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--cer-font-heading)',
              fontSize: '34px',
              fontWeight: 400,
              lineHeight: 1.4,
              color: '#fff',
              margin: 0,
              letterSpacing: '-0.005em',
            }}
          >
            «Анна сделала ровно то, что было нужно, — посуду, которую гость
            замечает один раз и потом забывает, потому что смотрит в тарелку.»
          </p>
          <div
            style={{
              marginTop: '32px',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Денис К. · шеф ресторана Norra
          </div>
        </div>
      </section>

      {/* CTA в конце */}
      <section style={{ padding: '120px 56px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <Eyebrow>У вас похожий проект?</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '48px',
            fontWeight: 400,
            lineHeight: 1.15,
            margin: '8px 0 32px',
          }}
        >
          Расскажите, что нужно.
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
          Обсудить проект
        </a>
      </section>

      <CerFooterMini />
    </CerPage>
  );
}

Object.assign(window, { ProjectsList, ProjectDetail });
