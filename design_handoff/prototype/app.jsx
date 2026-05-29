// App shell: sticky nav, footer, hash router, view transitions.

const ROUTES = {
  '': 'home',
  home: 'home',
  catalog: 'catalog',
  product: 'product',
  gallery: 'gallery',
  projects: 'projects',
  project: 'projectDetail',
  horeca: 'horeca',
  about: 'about',
  care: 'care',
  journal: 'journal',
  order: 'order',
};

// Страницы, у которых тёмный hero на верху — навбар стартует прозрачным/светлым
const DARK_HERO = new Set(['home', 'horeca', 'projectDetail']);

// ---------- Router (hash-based) ----------
function parseHash() {
  const h = window.location.hash.replace(/^#\/?/, '');
  const [path, ...rest] = h.split('/');
  return { route: ROUTES[path] || 'home', param: rest.join('/') };
}

function navigate(path) {
  const target = '#/' + path;
  if (window.location.hash === target) return;
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      window.location.hash = target;
    });
  } else {
    window.location.hash = target;
  }
}

// Перехват кликов по ссылкам внутри прототипа.
// forwardRef нужен, чтобы хуки вроде useScrollFade могли применить ref к самому
// <a>-элементу (на котором висит класс fx-fade). Без этого fx-fade навсегда
// остаётся с opacity:0, потому что is-visible добавляется куда-то внутрь.
const NavLink = React.forwardRef(function NavLink(
  { to, children, style, className, onClick, ...rest },
  ref
) {
  return (
    <a
      ref={ref}
      href={'#/' + to}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
        navigate(to);
      }}
      style={style}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
});

// ---------- Top Nav ----------
function TopNav({ current }) {
  const [scrolled, setScrolled] = React.useState(false);
  const isDarkHero = DARK_HERO.has(current);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [current]);

  // Visual state:
  //  - dark hero + top      → transparent bg, white text
  //  - dark hero + scrolled → cream bg with blur, dark text
  //  - light page           → always cream with blur, dark text
  const transparent = isDarkHero && !scrolled;
  const textColor = transparent ? 'rgba(255,255,255,0.95)' : 'var(--cer-text)';
  const bgStyle = transparent
    ? { background: 'transparent', boxShadow: 'none' }
    : {
        background: 'rgba(246, 243, 239, 0.85)',
        backdropFilter: 'saturate(150%) blur(14px)',
        WebkitBackdropFilter: 'saturate(150%) blur(14px)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
      };

  const links = [
    ['catalog', 'Каталог'],
    ['projects', 'Проекты'],
    ['gallery', 'Галерея'],
    ['horeca', 'Ресторанам'],
    ['order', 'На заказ'],
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: scrolled ? '16px 56px' : '24px 56px',
        color: textColor,
        transition: `padding 400ms ${EASE}, background 300ms ease, color 250ms ease, box-shadow 300ms ease`,
        ...bgStyle,
      }}
    >
      <NavLink
        to="home"
        style={{
          fontFamily: 'var(--cer-font-heading)',
          fontSize: '22px',
          letterSpacing: '0.02em',
          color: 'inherit',
        }}
      >
        Керамика
      </NavLink>
      <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
        {links.map(([key, label]) => (
          <NavLink
            key={key}
            to={key}
            style={{
              fontSize: '12px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'inherit',
              borderBottom: current === key ? `1px solid currentColor` : 'none',
              paddingBottom: '3px',
              opacity: current === key ? 1 : 0.85,
              fontWeight: 500,
            }}
          >
            {label}
          </NavLink>
        ))}
        <NavLink
          to="about"
          style={{
            fontSize: '12px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'inherit',
            opacity: 0.85,
            paddingLeft: '24px',
            borderLeft: '1px solid currentColor',
          }}
        >
          О мастере
        </NavLink>
      </nav>
    </header>
  );
}

// ---------- Footer (shared) ----------
function SiteFooter() {
  return (
    <footer
      style={{
        background: 'var(--cer-text)',
        color: 'rgba(255,255,255,0.85)',
        padding: '80px 56px 32px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '48px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--cer-font-heading)',
                fontSize: '26px',
                color: '#fff',
                marginBottom: '14px',
              }}
            >
              Керамика
            </div>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '320px',
                margin: 0,
              }}
            >
              Авторская керамика ручной работы. Штучные изделия и партии посуды для ресторанов.
            </p>
          </div>
          <FooterCol
            title="Частным"
            links={[
              ['catalog', 'Каталог'],
              ['gallery', 'Галерея'],
              ['order', 'Индивидуальный заказ'],
              ['care', 'Уход'],
            ]}
          />
          <FooterCol
            title="Ресторанам"
            links={[
              ['horeca', 'Услуги'],
              ['projects', 'Кейсы'],
              ['horeca', 'Процесс'],
              ['horeca', 'Связаться'],
            ]}
          />
          <FooterCol
            title="Студия"
            links={[
              ['about', 'О мастере'],
              ['projects', 'Проекты'],
              ['journal', 'Дневник'],
              ['order', 'Контакты'],
            ]}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '28px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.45)',
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
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div
        style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--cer-accent)',
          marginBottom: '18px',
        }}
      >
        {title}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
        {links.map(([route, label], i) => (
          <li key={i}>
            <NavLink to={route} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- App ----------
function App() {
  const [{ route, param }, setLoc] = React.useState(parseHash());
  React.useEffect(() => {
    const onHash = () => {
      setLoc(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  let page = null;
  switch (route) {
    case 'home':
      page = <HomePage />;
      break;
    case 'catalog':
      page = <CatalogPage />;
      break;
    case 'product':
      page = <ProductPage slug={param} />;
      break;
    case 'gallery':
      page = <GalleryPage />;
      break;
    case 'projects':
      page = <ProjectsPage />;
      break;
    case 'projectDetail':
      page = <ProjectDetailPage slug={param} />;
      break;
    case 'horeca':
      page = <HorecaPage />;
      break;
    case 'about':
      page = <AboutPage />;
      break;
    case 'care':
      page = <CarePage />;
      break;
    case 'journal':
      page = <JournalPage />;
      break;
    case 'order':
      page = <OrderPage />;
      break;
    default:
      page = <HomePage />;
  }

  return (
    <div className="cer-page">
      <TopNav current={route} />
      <main key={route + '/' + param} style={{ animation: `pageIn 600ms ${EASE} both` }}>
        {page}
      </main>
      <SiteFooter />
    </div>
  );
}

Object.assign(window, { App, NavLink, navigate });
