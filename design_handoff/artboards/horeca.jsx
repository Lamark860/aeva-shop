// «Для ресторанов» — отдельная HoReCa-страница. Кейсы, сотрудничества,
// процесс работы, форма для шефов/закупщиков с другими полями.

const HC_PHOTO = {
  hero: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=900&fit=crop&q=80',
  case1: 'https://images.unsplash.com/photo-1551218372-a8789b81b253?w=900&h=900&fit=crop&q=80',
  case2: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=900&h=900&fit=crop&q=80',
  case3: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&h=900&fit=crop&q=80',
  food1: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=900&h=900&fit=crop&q=80',
  food2: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&h=900&fit=crop&q=80',
  food3: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&h=900&fit=crop&q=80',
  food4: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&h=900&fit=crop&q=80',
};

function Horeca() {
  return (
    <CerPage>
      {/* Hero — компактный, не на весь экран */}
      <section style={{ position: 'relative', height: '560px', overflow: 'hidden' }}>
        <img
          src={HC_PHOTO.hero}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,15,12,0.55)' }} />
        <CerNav active="horeca" light />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 56px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          <Eyebrow color="rgba(255,255,255,0.7)">Для ресторанов и кафе</Eyebrow>
          <h1
            style={{
              fontFamily: 'var(--cer-font-heading)',
              fontSize: '76px',
              fontWeight: 400,
              lineHeight: 1.05,
              color: '#fff',
              margin: '8px 0 24px',
              letterSpacing: '-0.015em',
              maxWidth: '900px',
            }}
          >
            Авторская посуда,
            <br />
            сделанная под вашу концепцию.
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '600px',
              margin: '0 0 36px',
              lineHeight: 1.6,
            }}
          >
            Разработка формы под концепцию заведения и производство партиями
            от 50 до 500 единиц.
          </p>
          <div>
            <a
              href="#contact"
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
          </div>
        </div>
      </section>

      {/* Метрики / факты строкой */}
      <section style={{ background: 'var(--cer-bg-alt)', padding: '60px 56px' }}>
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
            ['12+', 'заведений по России'],
            ['50–500', 'единиц в партии'],
            ['8–14 нед', 'от эскиза до отгрузки'],
            ['Шамот', 'выдерживает посудомойку'],
          ].map(([n, l]) => (
            <div key={l}>
              <div
                style={{
                  fontFamily: 'var(--cer-font-heading)',
                  fontSize: '42px',
                  color: 'var(--cer-accent)',
                  lineHeight: 1,
                  marginBottom: '10px',
                }}
              >
                {n}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--cer-text-muted)', lineHeight: 1.5 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* С кем работали — логотипы (плейсхолдеры) */}
      <section style={{ padding: '100px 56px 60px', maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow>Сотрудничества</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '40px',
            fontWeight: 400,
            margin: '8px 0 48px',
          }}
        >
          С кем работали
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          {['Norra', 'Утро', 'Поле', 'Хлеб & Соль', 'Sad', 'Эра'].map((name) => (
            <div
              key={name}
              style={{
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '24px',
                color: 'var(--cer-text-light)',
                letterSpacing: '0.05em',
                borderTop: '1px solid var(--cer-border)',
                borderBottom: '1px solid var(--cer-border)',
                padding: '0 8px',
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* Кейсы — три карточки */}
      <section style={{ padding: '60px 56px 100px', maxWidth: '1280px', margin: '0 auto' }}>
        <Eyebrow>Кейсы</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '48px',
            fontWeight: 400,
            margin: '8px 0 48px',
          }}
        >
          Готовые проекты на столах.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            {
              img: HC_PHOTO.case1,
              place: 'Norra · авторский ресторан',
              project: '240 предметов · 6 форм',
              note: 'Тейстинг-сет, шамот, молочная глазурь',
            },
            {
              img: HC_PHOTO.case2,
              place: 'Поле · фарм-ту-тэйбл',
              project: '180 предметов · 4 формы',
              note: 'Сезонное меню, шероховатый черепок',
            },
            {
              img: HC_PHOTO.case3,
              place: 'Утро · кафе завтраков',
              project: '320 предметов · 5 форм',
              note: 'Тарелки и кружки, выдерживают посудомойку',
            },
          ].map((c, i) => (
            <a href="#" key={i} style={{ color: 'var(--cer-text)', display: 'block' }}>
              <PhotoPlaceholder src={c.img} ratio="4/5" style={{ marginBottom: '20px' }} />
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--cer-accent)',
                  marginBottom: '8px',
                }}
              >
                {c.project}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--cer-font-heading)',
                  fontSize: '22px',
                  fontWeight: 400,
                  margin: '0 0 8px',
                  lineHeight: 1.3,
                }}
              >
                {c.place}
              </h3>
              <div style={{ fontSize: '14px', color: 'var(--cer-text-muted)' }}>{c.note}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Полоса фото с готовой едой */}
      <section style={{ padding: '0 0 100px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '4px',
            maxWidth: '100%',
          }}
        >
          <PhotoPlaceholder src={HC_PHOTO.food1} ratio="1/1" />
          <PhotoPlaceholder src={HC_PHOTO.food2} ratio="1/1" />
          <PhotoPlaceholder src={HC_PHOTO.food3} ratio="1/1" />
          <PhotoPlaceholder src={HC_PHOTO.food4} ratio="1/1" />
        </div>
        <div
          style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '13px',
            color: 'var(--cer-text-light)',
            letterSpacing: '0.05em',
          }}
        >
          Изделия в работе: ужин в Norra, завтрак в Утре, сет «Поля»
        </div>
      </section>

      {/* Процесс работы */}
      <section style={{ background: 'var(--cer-bg-alt)', padding: '100px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Eyebrow>Как работаем</Eyebrow>
            <h2
              style={{
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '48px',
                fontWeight: 400,
                margin: '8px 0 0',
              }}
            >
              От первого письма до сервировки.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {[
              { n: '01', title: 'Бриф', text: 'Обсуждаем концепцию, меню, объём партии и сроки. Час разговора голосом или встреча.' },
              { n: '02', title: 'Эскизы', text: '2–3 направления формы. Согласуем материал и тип глазури. Срок 1–2 недели.' },
              { n: '03', title: 'Прототипы', text: 'Один-два тестовых образца каждой утверждённой формы. Тестируете на реальном блюде.' },
              { n: '04', title: 'Производство', text: 'Партия от 50 до 500 единиц. Аванс 50%, доплата при отгрузке.' },
            ].map((s) => (
              <div key={s.n}>
                <div
                  style={{
                    fontFamily: 'var(--cer-font-heading)',
                    fontSize: '24px',
                    color: 'var(--cer-accent)',
                    marginBottom: '16px',
                  }}
                >
                  {s.n}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--cer-font-heading)',
                    fontSize: '22px',
                    fontWeight: 400,
                    margin: '0 0 12px',
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--cer-text-muted)', margin: 0 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Дифференцированная форма для шефа/закупщика */}
      <section id="contact" style={{ padding: '120px 56px', maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Eyebrow>Расскажите о проекте</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--cer-font-heading)',
              fontSize: '48px',
              fontWeight: 400,
              margin: '8px 0 16px',
            }}
          >
            Обсудим вашу посуду.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--cer-text-muted)', margin: 0 }}>
            Отвечу в течение рабочего дня. Если приложите концепцию или мудборд — ещё быстрее.
          </p>
        </div>
        <form style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FormField label="Заведение" placeholder="Название" />
            <FormField label="Город" placeholder="Москва" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FormField label="Ваше имя" placeholder="" />
            <FormField label="Должность" placeholder="Шеф, бренд-шеф, закупщик…" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FormField label="Email" placeholder="" />
            <FormField label="Телефон / Telegram" placeholder="" />
          </div>
          <FormSelect label="Тип проекта" options={['Новое заведение, открытие', 'Обновление концепции', 'Расширение действующего набора', 'Пока разведка']} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <FormSelect label="Ориентир по партии" options={['до 50 единиц', '50–150', '150–300', '300+', 'Пока не знаю']} />
            <FormSelect label="К какому сроку" options={['не срочно', 'в течение квартала', 'к открытию (укажу в описании)', 'обсудим']} />
          </div>
          <FormField label="Концепция или меню — пара слов" placeholder="Тейстинг, фарм-ту-тэйбл, японский бар…" textarea />
          <div style={{ textAlign: 'center', paddingTop: '12px' }}>
            <button
              type="button"
              style={{
                padding: '15px 48px',
                background: 'var(--cer-accent)',
                color: '#fff',
                border: 'none',
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Отправить заявку
            </button>
          </div>
        </form>
      </section>

      <CerFooterMini />
    </CerPage>
  );
}

function FormField({ label, placeholder, textarea }) {
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
          rows={3}
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
          type="text"
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
        }}
      >
        <option>—</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

Object.assign(window, { Horeca });
