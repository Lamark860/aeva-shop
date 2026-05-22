// Общие UI-компоненты для прототипа.

// ---------- Eyebrow ----------
function Eb({ children, light, color }) {
  return (
    <span
      className="fx-eyebrow"
      style={color ? { color } : light ? { color: 'rgba(255,255,255,0.7)' } : undefined}
    >
      {children}
    </span>
  );
}

// ---------- Magnetic Button ----------
function MagneticBtn({ to, children, variant = 'primary', external, onClick, ...rest }) {
  const ref = useMagnetic(0.25);
  const className = `fx-btn fx-btn--${variant}`;
  const handle = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    if (to) navigate(to);
  };
  return (
    <a
      href={to ? '#/' + to : '#'}
      ref={ref}
      onClick={external ? undefined : handle}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

// ---------- Section header (Eyebrow + H2 + p) ----------
function SectionHeader({ eyebrow, title, subtitle, center, light, style }) {
  return (
    <div
      style={{
        textAlign: center ? 'center' : 'left',
        marginBottom: '48px',
        color: light ? '#fff' : undefined,
        ...style,
      }}
    >
      {eyebrow && <FadeIn><Eb light={light}>{eyebrow}</Eb></FadeIn>}
      {title && (
        <FadeIn delay={80}>
          <h2 className="fx-h2" style={light ? { color: '#fff' } : undefined}>{title}</h2>
        </FadeIn>
      )}
      {subtitle && (
        <FadeIn delay={160}>
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: light ? 'rgba(255,255,255,0.75)' : 'var(--cer-text-muted)',
              margin: '16px auto 0',
              maxWidth: center ? '560px' : 'none',
            }}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </div>
  );
}

// ---------- ProductCard (для каталога и главной) ----------
function ProductCard({ product, showCategory, delay = 0 }) {
  const ref = useScrollFade({ delay });
  return (
    <NavLink ref={ref} to={`product/${product.slug}`} className="fx-card fx-fade">
      <div>
        <div className="fx-card__img-wrap" style={{ aspectRatio: '1/1' }}>
          <img className="fx-card__img" src={product.image} alt={product.name} loading="lazy" />
        </div>
        <div style={{ padding: '16px 0' }}>
          {showCategory && (
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--cer-accent)',
                marginBottom: '6px',
              }}
            >
              {product.categoryName}
            </div>
          )}
          <h3
            style={{
              fontFamily: 'var(--cer-font-heading)',
              fontSize: '20px',
              fontWeight: 400,
              margin: '0 0 6px',
              color: 'var(--cer-text)',
            }}
          >
            {product.name}
          </h3>
          <div style={{ fontSize: '14px', color: 'var(--cer-text-muted)' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '6px', color: 'var(--cer-text-light)' }}>
              от
            </span>
            {product.priceFrom.toLocaleString('ru-RU')} ₽
          </div>
        </div>
      </div>
    </NavLink>
  );
}

// ---------- Lightbox ----------
function useLightbox() {
  const [src, setSrc] = React.useState(null);
  React.useEffect(() => {
    if (!src) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setSrc(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [src]);
  const view = src
    ? (
        <div className="fx-lightbox" onClick={() => setSrc(null)}>
          <img src={src} className="fx-lightbox__img" alt="" />
        </div>
      )
    : null;
  return [view, setSrc];
}

// ---------- Cursor follower ----------
function CursorFollower() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = -100, ty = -100, cx = -100, cy = -100;
    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.add('is-active');
      const target = e.target.closest('a, button, .fx-hoverable');
      el.classList.toggle('is-hover', !!target);
    };
    const onLeave = () => el.classList.remove('is-active');
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="fx-cursor" ref={ref} />;
}

// ---------- Generic page-header (cream bg, маленький hero для не-home страниц) ----------
function PageHero({ eyebrow, title, subtitle, dense }) {
  return (
    <section
      style={{
        padding: dense ? '160px 56px 60px' : '180px 56px 100px',
        maxWidth: '1100px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <FadeIn><Eb>{eyebrow}</Eb></FadeIn>
      <FadeIn delay={100}>
        <h1 className="fx-h1" style={{ margin: '8px 0 24px' }}>{title}</h1>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={200}>
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.7,
              color: 'var(--cer-text-muted)',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            {subtitle}
          </p>
        </FadeIn>
      )}
    </section>
  );
}

Object.assign(window, { Eb, MagneticBtn, SectionHeader, ProductCard, useLightbox, CursorFollower, PageHero });
