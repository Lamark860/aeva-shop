// HomePage — главная с V3 hero (выбранный вариант) и полным потоком секций.

const HOME_HERO_IMG = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=2400&h=1400&fit=crop&q=85';
const HOME_ABOUT_IMG = 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=900&h=1200&fit=crop&q=80';
const HOME_ATM_IMG = 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=2400&h=1400&fit=crop&q=85';
const PROC_STEPS = [
  ['Замес глины', 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=720&h=920&fit=crop&q=80'],
  ['Гончарный круг', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=720&h=920&fit=crop&q=80'],
  ['Формовка', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=720&h=920&fit=crop&q=80'],
  ['Сушка', 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=720&h=920&fit=crop&q=80'],
  ['Обжиг', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=720&h=920&fit=crop&q=80'],
  ['Глазурование', 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=720&h=920&fit=crop&q=80'],
];

function HomePage() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 3);
  const popular = PRODUCTS.slice(0, 4);
  const [lightbox, openLightbox] = useLightbox();

  return (
    <React.Fragment>
      <HomeHero />
      <RoutingStrip />
      <FeaturedSection products={featured} />
      <AboutStrip />
      <ProcessSection />
      <PopularSection products={popular} />
      <AtmosphericBand />
      <GalleryStrip onOpen={openLightbox} />
      <BigCTA />
      {lightbox}
    </React.Fragment>
  );
}

// ---------- Hero ----------
function HomeHero() {
  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '720px',
        overflow: 'hidden',
        background: '#1a1612',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          src={HOME_HERO_IMG}
          alt=""
          className="fx-kenburns"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.55) 100%)',
        }}
      />
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
          padding: '0 56px',
          color: '#fff',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--cer-font-heading)',
            fontSize: 'clamp(56px, 7vw, 96px)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#fff',
            margin: 0,
            letterSpacing: '-0.015em',
          }}
        >
          <RevealMask as="span">Авторская керамика</RevealMask>
          <br />
          <RevealMask as="span" delay={100}>ручной работы</RevealMask>
        </h1>
        <div style={{ marginTop: '32px', overflow: 'hidden' }}>
          <RevealMask as="span" delay={280}>
            <p
              style={{
                fontSize: '18px',
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '560px',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Из шамотной глины. Для дома, для подарка, для ресторана.
            </p>
          </RevealMask>
        </div>
      </div>

      {/* indicator ↓ */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '11px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          zIndex: 2,
          animation: 'bob 2.4s ease-in-out infinite',
        }}
      >
        Прокрутите ↓
      </div>
      <style>{`@keyframes bob { 0%,100%{transform:translate(-50%,0);opacity:.6} 50%{transform:translate(-50%,8px);opacity:1} }`}</style>
    </section>
  );
}

// ---------- Routing strip ----------
function RoutingStrip() {
  const items = [
    {
      key: 'catalog',
      eyebrow: 'Авторские работы',
      title: 'Каталог',
      desc: 'Готовые изделия — вазы, чаши, наборы, декор.',
      cta: 'Открыть каталог →',
      dark: false,
    },
    {
      key: 'order',
      eyebrow: 'Индивидуально',
      title: 'На заказ',
      desc: 'Создам изделие специально под ваш дом или подарок.',
      cta: 'Оставить заявку →',
      dark: false,
    },
    {
      key: 'horeca',
      eyebrow: 'Для заведений',
      title: 'Ресторанам',
      desc: 'Разработка и производство посуды партиями для кафе и баров.',
      cta: 'Обсудить проект →',
      dark: true,
    },
  ];
  return (
    <section style={{ background: 'var(--cer-bg)', padding: '80px 56px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {items.map((it, i) => (
          <RoutingCard key={it.key} item={it} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}

function RoutingCard({ item, delay }) {
  const ref = useScrollFade({ delay });
  return (
    <NavLink
      ref={ref}
      to={item.key}
      className="fx-fade fx-card"
      style={{
        padding: '32px 32px 36px',
        background: item.dark ? 'var(--cer-text)' : '#fff',
        color: item.dark ? '#fff' : 'var(--cer-text)',
        border: item.dark ? 'none' : '1px solid var(--cer-border)',
        textDecoration: 'none',
      }}
    >
      <div>
        <Eb color={item.dark ? 'rgba(255,255,255,0.6)' : 'var(--cer-accent)'}>{item.eyebrow}</Eb>
        <h3
          className="fx-h3"
          style={{
            margin: '4px 0 14px',
            color: item.dark ? '#fff' : 'var(--cer-text)',
            fontSize: '36px',
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontSize: '15px',
            color: item.dark ? 'rgba(255,255,255,0.7)' : 'var(--cer-text-muted)',
            margin: '0 0 28px',
            lineHeight: 1.6,
            minHeight: '48px',
          }}
        >
          {item.desc}
        </p>
        <span
          style={{
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: item.dark ? '#fff' : 'var(--cer-accent)',
            fontWeight: 500,
          }}
        >
          {item.cta}
        </span>
      </div>
    </NavLink>
  );
}

// ---------- Featured (3 products) ----------
function FeaturedSection({ products }) {
  return (
    <section style={{ padding: '100px 56px', maxWidth: '1200px', margin: '0 auto' }}>
      <SectionHeader eyebrow="Коллекция" title="Избранные работы" center />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}

// ---------- About strip ----------
function AboutStrip() {
  return (
    <section style={{ padding: '60px 56px 120px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        <FadeIn>
          <div style={{ overflow: 'hidden' }}>
            <img
              src={HOME_ABOUT_IMG}
              alt="Мастер за работой"
              style={{ width: '100%', display: 'block', aspectRatio: '4/5', objectFit: 'cover' }}
            />
          </div>
        </FadeIn>
        <div>
          <FadeIn><Eb>О мастере</Eb></FadeIn>
          <FadeIn delay={100}>
            <h2 className="fx-h2" style={{ margin: '8px 0 24px' }}>Каждое изделие — история.</h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: '0 0 14px' }}>
              Я создаю керамику вручную в небольшой мастерской. Каждое изделие уникально — от
              формовки до финального обжига.
            </p>
          </FadeIn>
          <FadeIn delay={280}>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: '0 0 32px' }}>
              Натуральная глина, ручная лепка, двойной обжиг — каждая деталь продумана
              и выполнена с любовью к материалу.
            </p>
          </FadeIn>
          <FadeIn delay={360}>
            <NavLink to="about" className="fx-link">Больше о мастере →</NavLink>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ---------- Process ----------
function ProcessSection() {
  const trackRef = React.useRef(null);
  const barRef = React.useRef(null);
  React.useEffect(() => {
    const track = trackRef.current;
    const bar = barRef.current;
    if (!track || !bar) return;
    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      const pct = max > 0 ? track.scrollLeft / max : 0;
      const barWidth = 18; // %
      bar.style.left = `${pct * (100 - barWidth)}%`;
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section style={{ background: 'var(--cer-bg-alt)', padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 56px' }}>
        <SectionHeader eyebrow="Процесс" title="Как создаётся керамика" center />
      </div>
      <FadeIn>
        <div className="fx-process" ref={trackRef}>
          <div className="fx-process__track">
            {PROC_STEPS.map(([label, src], i) => (
              <div className="fx-process__item" key={label}>
                <img src={src} alt={label} loading="lazy" />
                <div className="fx-process__label">
                  <span className="fx-process__num">0{i + 1}</span>
                  <span>{label}</span>
                </div>
              </div>
            ))}
            {/* запас прокрутки */}
            <div style={{ flex: '0 0 56px' }} />
          </div>
        </div>
        <div className="fx-progress" style={{ maxWidth: 'none', margin: '32px 56px 0' }}>
          <div className="fx-progress__bar" ref={barRef} />
        </div>
      </FadeIn>
    </section>
  );
}

// ---------- Popular (4 products) ----------
function PopularSection({ products }) {
  return (
    <section style={{ padding: '120px 56px', maxWidth: '1280px', margin: '0 auto' }}>
      <SectionHeader eyebrow="Изделия" title="Популярные работы" center />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} showCategory delay={i * 80} />
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '56px' }}>
        <FadeIn>
          <MagneticBtn to="catalog" variant="outline-dark">Весь каталог</MagneticBtn>
        </FadeIn>
      </div>
    </section>
  );
}

// ---------- Atmospheric band ----------
function AtmosphericBand() {
  const ref = useParallax(0.18);
  return (
    <section
      style={{
        position: 'relative',
        height: '60vh',
        minHeight: '420px',
        overflow: 'hidden',
        background: '#241d18',
      }}
    >
      <div style={{ position: 'absolute', inset: '-15% 0', overflow: 'hidden' }}>
        <img
          ref={ref}
          src={HOME_ATM_IMG}
          alt=""
          style={{ width: '100%', height: '130%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 56px',
        }}
      >
        <FadeIn>
          <h2
            style={{
              fontFamily: 'var(--cer-font-heading)',
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 400,
              color: '#fff',
              margin: 0,
              letterSpacing: '-0.01em',
              maxWidth: '900px',
              lineHeight: 1.15,
            }}
          >
            Каждое изделие уникально.
          </h2>
        </FadeIn>
      </div>
    </section>
  );
}

// ---------- Gallery strip (preview) ----------
function GalleryStrip({ onOpen }) {
  const items = GALLERY.slice(0, 6);
  return (
    <section style={{ padding: '120px 56px', maxWidth: '1280px', margin: '0 auto' }}>
      <SectionHeader eyebrow="Галерея" title="Из мастерской" center />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {items.map((src, i) => (
          <FadeIn delay={i * 60} key={src}>
            <div className="fx-hoverable" style={{ overflow: 'hidden', cursor: 'zoom-in' }} onClick={() => onOpen(src)}>
              <img
                src={src}
                alt=""
                loading="lazy"
                style={{
                  width: '100%',
                  height: '320px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 900ms cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>
          </FadeIn>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <FadeIn>
          <NavLink to="gallery" className="fx-link">Вся галерея →</NavLink>
        </FadeIn>
      </div>
    </section>
  );
}

// ---------- Big CTA ----------
function BigCTA() {
  return (
    <section style={{ background: 'var(--cer-bg-alt)', padding: '120px 56px', textAlign: 'center' }}>
      <FadeIn><Eb>Индивидуально</Eb></FadeIn>
      <FadeIn delay={100}>
        <h2 className="fx-h2" style={{ margin: '8px auto 32px', maxWidth: '760px' }}>
          Можно создать изделие
          <br />
          специально для вас.
        </h2>
      </FadeIn>
      <FadeIn delay={200}>
        <MagneticBtn to="order" variant="primary">Оставить заявку</MagneticBtn>
      </FadeIn>
    </section>
  );
}

Object.assign(window, { HomePage });
