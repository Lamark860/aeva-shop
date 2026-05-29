// ProjectsPage и ProjectDetailPage

function ProjectsPage() {
  return (
    <React.Fragment>
      <PageHero
        eyebrow="Проекты"
        title="Работы со смыслом."
        subtitle="Законченные истории — серии под интерьеры, посуда для ресторанов, авторские коллекции."
      />
      <section style={{ padding: '40px 56px 140px', maxWidth: '1200px', margin: '0 auto' }}>
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.slug} project={p} reverse={i % 2 === 1} />
        ))}
      </section>
    </React.Fragment>
  );
}

function ProjectRow({ project, reverse }) {
  const ref = useScrollFade();
  return (
    <NavLink
      ref={ref}
      to={`project/${project.slug}`}
      className="fx-fade fx-card"
      style={{
        display: 'grid',
        gridTemplateColumns: reverse ? '1fr 1.3fr' : '1.3fr 1fr',
        gap: '64px',
        alignItems: 'center',
        padding: '72px 0',
        borderTop: '1px solid var(--cer-border)',
        textDecoration: 'none',
      }}
    >
      <div style={{ order: reverse ? 1 : 0, overflow: 'hidden' }} className="fx-card__img-wrap">
        <img className="fx-card__img" src={project.image} alt={project.title} loading="lazy" style={{ aspectRatio: '3/2' }} />
      </div>
      <div style={{ order: reverse ? 0 : 1 }}>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--cer-accent)',
            marginBottom: '18px',
          }}
        >
          <span>{project.year}</span>
          <span style={{ color: 'var(--cer-text-light)' }}>·</span>
          <span style={{ color: 'var(--cer-text-light)' }}>{project.type}</span>
        </div>
        <h2 className="fx-h2" style={{ margin: '0 0 8px', fontSize: 'clamp(28px, 3vw, 40px)' }}>{project.title}</h2>
        <div style={{ fontSize: '14px', color: 'var(--cer-text-light)', marginBottom: '18px' }}>{project.subtitle}</div>
        <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'var(--cer-text-muted)', margin: '0 0 24px', maxWidth: '460px' }}>
          {project.desc}
        </p>
        <span
          style={{
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--cer-accent)',
            borderBottom: '1px solid var(--cer-accent)',
            paddingBottom: '3px',
            fontWeight: 500,
          }}
        >
          Смотреть проект →
        </span>
      </div>
    </NavLink>
  );
}

function ProjectDetailPage({ slug }) {
  const project = getProject(slug);
  return (
    <React.Fragment>
      {/* Header */}
      <section
        style={{
          position: 'relative',
          height: '75vh',
          minHeight: '560px',
          overflow: 'hidden',
          background: '#1a1612',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={project.image}
            alt=""
            className="fx-kenburns"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 56px 80px',
            maxWidth: '1200px',
            margin: '0 auto',
            color: '#fff',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '16px',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '16px',
            }}
          >
            <RevealMask as="span">{project.year}</RevealMask>
            <span>·</span>
            <RevealMask as="span" delay={80}>{project.type}</RevealMask>
          </div>
          <h1
            style={{
              fontFamily: 'var(--cer-font-heading)',
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: '#fff',
              margin: 0,
              maxWidth: '900px',
            }}
          >
            <RevealMask as="span" delay={160}>{project.title}</RevealMask>
          </h1>
        </div>
      </section>

      {/* Facts strip */}
      {project.facts.length > 0 && (
        <section style={{ background: 'var(--cer-bg-alt)', padding: '80px 56px' }}>
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: `repeat(${project.facts.length}, 1fr)`,
              gap: '40px',
            }}
          >
            {project.facts.map(([k, v], i) => (
              <FadeIn key={k} delay={i * 100}>
                <div>
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
                  <div style={{ fontFamily: 'var(--cer-font-heading)', fontSize: '20px', lineHeight: 1.35, color: 'var(--cer-text)' }}>
                    {v}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* Description */}
      <section style={{ padding: '120px 56px', maxWidth: '760px', margin: '0 auto' }}>
        <FadeIn><Eb>История проекта</Eb></FadeIn>
        <FadeIn delay={80}>
          <h2 className="fx-h2" style={{ margin: '8px 0 32px' }}>{project.desc}</h2>
        </FadeIn>
        <FadeIn delay={160}>
          <p style={{ fontSize: '18px', lineHeight: 1.85, color: 'var(--cer-text-muted)', margin: 0 }}>
            Шеф искал посуду, которая не отвлекает от блюда, но и не растворяется в нём. На тейстинге
            одно блюдо живёт 4–6 минут — за это время гость должен обратить внимание на форму один
            раз, в первую секунду. Сделали восемь эскизов, шесть прототипов, четыре полных тестовых
            сета на реальном меню.
          </p>
        </FadeIn>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section style={{ padding: '0 56px 100px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {project.gallery.map((src, i) => (
              <FadeIn key={src} delay={i * 100}>
                <div className="fx-card__img-wrap" style={{ overflow: 'hidden' }}>
                  <img src={src} alt="" loading="lazy" className="fx-card__img" style={{ aspectRatio: '1/1' }} />
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* Quote */}
      {project.quote && (
        <section style={{ background: 'var(--cer-text)', color: '#fff', padding: '120px 56px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <FadeIn>
              <p
                style={{
                  fontFamily: 'var(--cer-font-heading)',
                  fontSize: 'clamp(24px, 2.6vw, 34px)',
                  fontWeight: 400,
                  lineHeight: 1.4,
                  color: '#fff',
                  margin: 0,
                }}
              >
                {project.quote}
              </p>
            </FadeIn>
            <FadeIn delay={150}>
              <div
                style={{
                  marginTop: '32px',
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {project.quoteAuthor}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '120px 56px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <FadeIn><Eb>У вас похожий проект?</Eb></FadeIn>
        <FadeIn delay={80}>
          <h2 className="fx-h2" style={{ margin: '8px 0 32px' }}>Расскажите, что нужно.</h2>
        </FadeIn>
        <FadeIn delay={160}>
          <MagneticBtn to="horeca" variant="primary">Обсудить проект</MagneticBtn>
        </FadeIn>
      </section>
    </React.Fragment>
  );
}

Object.assign(window, { ProjectsPage, ProjectDetailPage });
