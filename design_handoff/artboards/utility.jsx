// Утилитарные артборды: уход, журнал, кликабельный шаг процесса,
// футер с разветвлением, карточка товара с ценой-ориентиром.

// ---------- Уход за керамикой ----------
function Care() {
  const items = [
    {
      n: '01',
      title: 'Перед первым использованием',
      text: 'Промойте изделие тёплой водой с каплей нейтрального мыла. Шамот пористый, в первые дни может «потеть» — это нормально, через неделю проходит.',
    },
    {
      n: '02',
      title: 'Мытьё',
      text: 'Большинство моих изделий выдерживают посудомоечную машину. На странице каждого товара отмечено, можно ли — если не отмечено, лучше вручную мягкой губкой.',
    },
    {
      n: '03',
      title: 'Микроволновка и духовка',
      text: 'Шамотная посуда без металлических вкраплений ставится в духовку до 200°C и в микроволновку. Декор и изделия с грубой керамикой — только сервировка, не нагревать.',
    },
    {
      n: '04',
      title: 'Перепады температуры',
      text: 'Не заливайте кипяток в холодную чашу из холодильника и наоборот. Шамот это переносит лучше фарфора, но не любит резких контрастов.',
    },
    {
      n: '05',
      title: 'Скол или трещина',
      text: 'Напишите мне в личку — могу починить или сделать замену. Многое восстанавливается, не выбрасывайте сразу.',
    },
  ];
  return (
    <CerPage>
      <CerNav active="care" />

      <section style={{ padding: '180px 56px 80px', maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow>Уход</Eyebrow>
        <h1
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '72px',
            fontWeight: 400,
            lineHeight: 1.05,
            margin: '8px 0 24px',
            letterSpacing: '-0.015em',
          }}
        >
          Как ухаживать за керамикой.
        </h1>
        <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--cer-text-muted)', margin: 0 }}>
          Шамот — материал прочный и неприхотливый, но пара деталей продлевают
          жизнь изделия на годы.
        </p>
      </section>

      <section style={{ padding: '20px 56px 120px', maxWidth: '760px', margin: '0 auto' }}>
        {items.map((item) => (
          <div
            key={item.n}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: '32px',
              padding: '36px 0',
              borderTop: '1px solid var(--cer-border)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '24px',
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
                  fontSize: '24px',
                  fontWeight: 400,
                  margin: '0 0 10px',
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
        <div
          style={{
            marginTop: '64px',
            padding: '32px',
            background: 'var(--cer-bg-alt)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '15px', color: 'var(--cer-text-muted)', lineHeight: 1.7 }}>
            Остались вопросы про конкретное изделие?{' '}
            <a
              href="#"
              style={{
                color: 'var(--cer-accent)',
                borderBottom: '1px solid var(--cer-accent)',
                paddingBottom: '2px',
              }}
            >
              Напишите мне
            </a>
            , отвечу в течение дня.
          </div>
        </div>
      </section>

      <CerFooterMini />
    </CerPage>
  );
}

// ---------- Дневник мастерской ----------
function Journal() {
  return (
    <CerPage>
      <CerNav active="journal" />

      <section style={{ padding: '180px 56px 60px', maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow>Дневник мастерской</Eyebrow>
        <h1
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: '72px',
            fontWeight: 400,
            lineHeight: 1.05,
            margin: '8px 0 24px',
            letterSpacing: '-0.015em',
          }}
        >
          Раз в месяц
          <br />
          короткое письмо.
        </h1>
        <p style={{ fontSize: '17px', lineHeight: 1.7, color: 'var(--cer-text-muted)', margin: 0 }}>
          Что в работе сейчас, какие формы рождаются, заметки про материал.
          Без рассылок, без скидок, без «эксклюзивных предложений».
        </p>
      </section>

      {/* Форма подписки */}
      <section style={{ padding: '0 56px 100px', maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
          <input
            type="email"
            placeholder="your@email.com"
            style={{
              flex: 1,
              padding: '14px 18px',
              border: '1px solid var(--cer-border)',
              background: '#fff',
              fontFamily: 'var(--cer-font-body)',
              fontSize: '15px',
            }}
          />
          <button
            type="button"
            style={{
              padding: '0 28px',
              background: 'var(--cer-accent)',
              color: '#fff',
              border: 'none',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Подписаться
          </button>
        </div>
        <div
          style={{
            fontSize: '13px',
            color: 'var(--cer-text-light)',
            marginTop: '14px',
            textAlign: 'center',
          }}
        >
          Отписаться можно одним кликом. Сейчас подписаны 247 человек.
        </div>
      </section>

      {/* Пример письма */}
      <section style={{ padding: '0 56px 120px', maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Eyebrow>Пример прошлого письма</Eyebrow>
        </div>
        <article
          style={{
            background: '#fff',
            padding: '56px 64px',
            border: '1px solid var(--cer-border)',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--cer-text-light)',
              marginBottom: '20px',
            }}
          >
            Март 2026 · письмо №14
          </div>
          <h2
            style={{
              fontFamily: 'var(--cer-font-heading)',
              fontSize: '36px',
              fontWeight: 400,
              margin: '0 0 28px',
              lineHeight: 1.2,
            }}
          >
            Про серию «Земля» и обнажённый черепок
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: '0 0 18px' }}>
            Привет. На этой неделе достала из печи первые шесть чаш «Земли». Это
            серия, в которой я почти не использую глазурь — оставляю шамот в его
            родной форме, только полирую места касания.
          </p>
          <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: '0 0 18px' }}>
            Получилось не как задумывала: три чаши вышли темнее, чем рассчитывала.
            Сначала расстроилась, потом поняла, что это и есть та история, ради
            которой я делаю керамику без полной глазури — материал сам решает.
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
      </section>

      <CerFooterMini />
    </CerPage>
  );
}

// ---------- Кликабельный шаг процесса (до/после) ----------
function ProcessClickable() {
  return (
    <CerPage>
      <section style={{ padding: '80px 56px', background: 'var(--cer-bg-alt)', minHeight: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Eyebrow>Главная · блок «Процесс»</Eyebrow>
          <h2 style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '38px', fontWeight: 400, margin: '8px 0 12px' }}>
            Шаг превращается в маленькую модалку.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--cer-text-muted)', margin: 0 }}>
            Сейчас «Замес глины» — просто подпись. Можно сделать каждый шаг
            кликабельным с короткой историей.
          </p>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.6fr',
              gap: '40px',
              alignItems: 'stretch',
            }}
          >
            {/* Лента шагов слева */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Замес глины', 'Гончарный круг', 'Формовка', 'Сушка', 'Обжиг', 'Глазурование'].map((s, i) => (
                <div
                  key={s}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 18px',
                    background: i === 1 ? '#fff' : 'transparent',
                    border: i === 1 ? '1px solid var(--cer-accent)' : '1px solid transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--cer-font-heading)',
                      fontSize: '16px',
                      color: i === 1 ? 'var(--cer-accent)' : 'var(--cer-text-light)',
                      width: '24px',
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: i === 1 ? 'var(--cer-text)' : 'var(--cer-text-muted)',
                      fontWeight: i === 1 ? 500 : 400,
                    }}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>

            {/* Раскрытая карточка справа */}
            <div style={{ background: '#fff', padding: '32px', display: 'grid', gridTemplateRows: 'auto 1fr', gap: '24px' }}>
              <PhotoPlaceholder
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=900&h=520&fit=crop&q=80"
                ratio="16/9"
              />
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--cer-accent)',
                    marginBottom: '10px',
                  }}
                >
                  Шаг 02
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--cer-font-heading)',
                    fontSize: '32px',
                    fontWeight: 400,
                    margin: '0 0 16px',
                  }}
                >
                  Гончарный круг
                </h3>
                <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--cer-text-muted)', margin: '0 0 12px' }}>
                  На круге рождается базовая форма — стенки, дно, горловина.
                  Для одной чаши уходит 8–15 минут, для крупной вазы — час и больше.
                </p>
                <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--cer-text-muted)', margin: 0 }}>
                  Самое медитативное в работе. И самое сложное: глина не прощает
                  торопливости.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CerPage>
  );
}

// ---------- Footer с разветвлением аудиторий ----------
function FooterRouting() {
  return (
    <CerPage style={{ background: 'var(--cer-text)' }}>
      <footer
        style={{
          background: 'var(--cer-text)',
          color: 'rgba(255,255,255,0.85)',
          padding: '80px 56px 40px',
          minHeight: '100%',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '48px',
              paddingBottom: '56px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Brand */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--cer-font-heading)',
                  fontSize: '28px',
                  color: '#fff',
                  marginBottom: '16px',
                }}
              >
                Керамика
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: '320px', margin: 0 }}>
                Авторская керамика ручной работы. Штучные изделия и партии посуды
                для ресторанов.
              </p>
            </div>

            {/* Для частных */}
            <div>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--cer-accent)',
                  marginBottom: '20px',
                }}
              >
                Частным
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
                {['Каталог', 'Галерея', 'Индивидуальный заказ', 'Уход за керамикой'].map((l) => (
                  <li key={l}>
                    <a href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Для ресторанов */}
            <div>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--cer-accent)',
                  marginBottom: '20px',
                }}
              >
                Ресторанам
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
                {['Услуги', 'Кейсы', 'Процесс работы', 'Связаться'].map((l) => (
                  <li key={l}>
                    <a href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Studio */}
            <div>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--cer-accent)',
                  marginBottom: '20px',
                }}
              >
                Студия
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
                {['О мастере', 'Проекты', 'Дневник', 'Контакты'].map((l) => (
                  <li key={l}>
                    <a href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '32px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.05em',
            }}
          >
            <div>© 2026 Керамика · Все изделия выполнены вручную</div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Instagram
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Telegram
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>
                hello@ceramic-studio.ru
              </a>
            </div>
          </div>
        </div>
      </footer>
    </CerPage>
  );
}

// ---------- Карточка товара с ценой-ориентиром ----------
function ProductCardIndicative() {
  return (
    <CerPage>
      <section style={{ padding: '60px 56px', minHeight: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Eyebrow>Карточка товара</Eyebrow>
          <h2 style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '36px', fontWeight: 400, margin: '8px 0 12px' }}>
            Цена как ориентир, не ценник.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--cer-text-muted)', margin: 0 }}>
            Сравнение: было / стало
          </p>
        </div>
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
          }}
        >
          {/* Было */}
          <div>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--cer-text-light)',
                marginBottom: '16px',
              }}
            >
              Сейчас
            </div>
            <PhotoPlaceholder
              src="https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=700&h=700&fit=crop&q=80"
              ratio="1/1"
              style={{ marginBottom: '16px' }}
            />
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--cer-accent)',
                marginBottom: '6px',
              }}
            >
              Вазы
            </div>
            <h3
              style={{
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '20px',
                fontWeight: 400,
                margin: '0 0 8px',
              }}
            >
              Ваза «Тишина»
            </h3>
            <div style={{ fontSize: '15px', color: 'var(--cer-text)' }}>5 800 ₽</div>
          </div>

          {/* Стало */}
          <div>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--cer-accent)',
                marginBottom: '16px',
              }}
            >
              Предложение
            </div>
            <PhotoPlaceholder
              src="https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=700&h=700&fit=crop&q=80"
              ratio="1/1"
              style={{ marginBottom: '16px' }}
            />
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--cer-accent)',
                marginBottom: '6px',
              }}
            >
              Вазы
            </div>
            <h3
              style={{
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '20px',
                fontWeight: 400,
                margin: '0 0 8px',
              }}
            >
              Ваза «Тишина»
            </h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '11px', color: 'var(--cer-text-light)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                от
              </span>
              <span style={{ fontSize: '15px', color: 'var(--cer-text)' }}>5 800 ₽</span>
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--cer-text-light)',
                marginTop: '6px',
                lineHeight: 1.5,
              }}
            >
              Точная цена зависит от размера и финиша — обсудим в заявке.
            </div>
          </div>
        </div>
      </section>
    </CerPage>
  );
}

Object.assign(window, { Care, Journal, ProcessClickable, FooterRouting, ProductCardIndicative });
