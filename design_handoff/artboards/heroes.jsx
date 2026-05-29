// Hero — варианты подзаголовка и CTA-копирайта.

const HERO_IMG = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&h=1080&fit=crop&q=80';

// Базовый hero-фон со снимком и затемнением
function HeroBg({ src = HERO_IMG, dim = 0.45 }) {
  return (
    <React.Fragment>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, rgba(0,0,0,${dim}) 0%, rgba(0,0,0,${dim + 0.1}) 100%)`,
        }}
      />
    </React.Fragment>
  );
}

// ---------- V1: КОНТРОЛЬ (как сейчас) ----------
// Чтобы было с чем сравнивать
function HeroV1Control() {
  return (
    <CerPage>
      <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
        <HeroBg />
        <CerNav active="home" light />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
            padding: '0 56px',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--cer-font-heading)',
              fontSize: '72px',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#fff',
              margin: 0,
              marginBottom: '40px',
              letterSpacing: '-0.01em',
            }}
          >
            Авторская керамика
            <br />
            ручной работы
          </h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a
              href="#"
              style={{
                padding: '14px 36px',
                background: '#fff',
                color: 'var(--cer-text)',
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              Смотреть изделия
            </a>
            <a
              href="#"
              style={{
                padding: '14px 36px',
                border: '1px solid #fff',
                color: '#fff',
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              Индивидуальный заказ
            </a>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '56px',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          ↓ Прокрутите
        </div>
      </div>
    </CerPage>
  );
}

// ---------- V2: + ПОДЗАГОЛОВОК + СПОКОЙНЫЙ ОДИН CTA ----------
function HeroV2Subtitle() {
  return (
    <CerPage>
      <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
        <HeroBg />
        <CerNav active="home" light />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff',
            padding: '0 56px',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--cer-font-heading)',
              fontSize: '76px',
              fontWeight: 400,
              lineHeight: 1.05,
              color: '#fff',
              margin: 0,
              marginBottom: '24px',
              letterSpacing: '-0.01em',
            }}
          >
            Авторская керамика
            <br />
            ручной работы
          </h1>
          <p
            style={{
              fontFamily: 'var(--cer-font-body)',
              fontSize: '17px',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '520px',
              margin: 0,
              marginBottom: '44px',
              lineHeight: 1.6,
              letterSpacing: '0.01em',
            }}
          >
            Из шамотной глины, обожжено вручную. Штучные изделия для дома
            и партии посуды для ресторанов и кафе.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a
              href="#"
              style={{
                padding: '14px 36px',
                background: '#fff',
                color: 'var(--cer-text)',
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              К работам
            </a>
            <a
              href="#"
              style={{
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fff',
                borderBottom: '1px solid rgba(255,255,255,0.4)',
                paddingBottom: '4px',
              }}
            >
              Заказать индивидуально →
            </a>
          </div>
        </div>
      </div>
    </CerPage>
  );
}

// ---------- V3: РАЗВЕТВЛЕНИЕ АУДИТОРИЙ (тёплая полоса под hero) ----------
function HeroV3Routing() {
  return (
    <CerPage>
      <div style={{ position: 'relative', height: '100%', overflow: 'auto' }}>
        {/* Hero сам */}
        <div style={{ position: 'relative', height: '600px', overflow: 'hidden' }}>
          <HeroBg />
          <CerNav active="home" light />
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#fff',
              padding: '0 56px',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '76px',
                fontWeight: 400,
                lineHeight: 1.05,
                color: '#fff',
                margin: 0,
                marginBottom: '24px',
              }}
            >
              Авторская керамика
              <br />
              ручной работы
            </h1>
            <p
              style={{
                fontSize: '17px',
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '520px',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Из шамотной глины. Для дома, для подарка, для ресторана.
            </p>
          </div>
        </div>
        {/* Полоса с тремя путями */}
        <div style={{ background: 'var(--cer-bg)', padding: '64px 56px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              maxWidth: '1100px',
              margin: '0 auto',
            }}
          >
            {[
              {
                eyebrow: 'Авторские работы',
                title: 'Каталог',
                desc: 'Готовые изделия — вазы, чаши, наборы, декор.',
                cta: 'Открыть каталог →',
              },
              {
                eyebrow: 'Индивидуально',
                title: 'На заказ',
                desc: 'Создам изделие специально под ваш дом или подарок.',
                cta: 'Оставить заявку →',
              },
              {
                eyebrow: 'Для заведений',
                title: 'Ресторанам',
                desc: 'Разработка и производство посуды партиями для кафе и баров.',
                cta: 'Обсудить проект →',
              },
            ].map((p, i) => (
              <a
                key={i}
                href="#"
                style={{
                  display: 'block',
                  padding: '28px 28px 32px',
                  background: i === 2 ? 'var(--cer-text)' : '#fff',
                  color: i === 2 ? '#fff' : 'var(--cer-text)',
                  border: i === 2 ? 'none' : '1px solid var(--cer-border)',
                }}
              >
                <Eyebrow color={i === 2 ? 'rgba(255,255,255,0.6)' : 'var(--cer-accent)'}>{p.eyebrow}</Eyebrow>
                <h3
                  style={{
                    fontFamily: 'var(--cer-font-heading)',
                    fontSize: '32px',
                    fontWeight: 400,
                    margin: '4px 0 14px',
                    color: i === 2 ? '#fff' : 'var(--cer-text)',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    color: i === 2 ? 'rgba(255,255,255,0.7)' : 'var(--cer-text-muted)',
                    margin: '0 0 24px',
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </p>
                <span
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: i === 2 ? '#fff' : 'var(--cer-accent)',
                    fontWeight: 500,
                  }}
                >
                  {p.cta}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </CerPage>
  );
}

Object.assign(window, { HeroV1Control, HeroV2Subtitle, HeroV3Routing });
