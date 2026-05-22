// GalleryPage — masonry-сетка с lightbox

function GalleryPage() {
  const [lightbox, openLightbox] = useLightbox();
  return (
    <React.Fragment>
      <PageHero
        eyebrow="Галерея"
        title="Из мастерской"
        subtitle="Процесс создания, детали изделий, атмосфера."
      />
      <section style={{ padding: '40px 56px 140px', maxWidth: '1280px', margin: '0 auto' }}>
        <div className="fx-masonry">
          {GALLERY.map((src, i) => (
            <FadeIn key={src} delay={(i % 6) * 60}>
              <div onClick={() => openLightbox(src)}>
                <img src={src} alt="" loading="lazy" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
      {lightbox}
    </React.Fragment>
  );
}

Object.assign(window, { GalleryPage });
