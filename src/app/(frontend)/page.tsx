import React from 'react'
import Shell from '@/components/Shell'
import ProductCard from '@/components/ProductCard'
import Lightbox from '@/components/Lightbox'
import Signature from '@/components/Signature'
import { getProducts, getGallery, getHomepage } from '@/lib/data'

// ISR: периодический фон-ребилд + мгновенный сброс через revalidatePath из хуков Payload
export const revalidate = 3600

export default async function Home() {
  const [hp, collectionPreview, featured, galleryItems] = await Promise.all([
    getHomepage(),
    getProducts({ limit: 3 }),
    getProducts({ featured: true, limit: 4 }),
    getGallery(9),
  ])

  return (
    <Shell active="home" isHero={true}>
      <section className="cer-hero">
        <div className="cer-hero__bg">
          <img src={hp.hero.bg} alt="Авторская керамика" />
        </div>
        <div className="cer-hero__overlay"></div>
        <div className="cer-hero__content">
          <h1 className="cer-hero__title">{hp.hero.titleLine1}<br />{hp.hero.titleLine2}</h1>
          <div className="cer-hero__buttons">
            <a href={hp.hero.primaryBtnLink} className="cer-btn cer-btn--primary">{hp.hero.primaryBtnText}</a>
            <a href={hp.hero.outlineBtnLink} className="cer-btn cer-btn--outline">{hp.hero.outlineBtnText}</a>
          </div>
        </div>
      </section>

      <section className="cer-section">
        <div className="cer-container">
          <div className="cer-section__title cer-fade-in">
            <span className="cer-section__subtitle">{hp.collection.subtitle}</span>
            <h2>{hp.collection.heading}</h2>
          </div>
          <div className="cer-grid cer-grid--3 cer-fade-in">
            {collectionPreview.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <section className="cer-section cer-section--no-top">
        <div className="cer-container">
          <div className="cer-two-col">
            <div className="cer-two-col__image cer-reveal-image cer-fade-left">
              <img src={hp.about.image} alt="Мастер" loading="lazy" />
            </div>
            <div className="cer-two-col__text cer-fade-right">
              <span className="cer-section__subtitle">{hp.about.subtitle}</span>
              <h2>{hp.about.headingLine1}<br />{hp.about.headingLine2}</h2>
              {hp.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <div style={{ margin: '8px 0 24px' }}><Signature /></div>
              <a href={hp.about.ctaLink} className="cer-btn cer-btn--ghost">{hp.about.ctaText}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="cer-section" style={{ backgroundColor: 'var(--cer-bg-alt)' }}>
        <div className="cer-container">
          <div className="cer-section__title cer-fade-in">
            <span className="cer-section__subtitle">{hp.process.subtitle}</span>
            <h2>{hp.process.heading}</h2>
          </div>
        </div>
        <div className="cer-process-wrapper cer-fade-in">
          <div className="cer-process">
            <div className="cer-process__track">
              {hp.process.steps.map((s) => (
                <div className="cer-process__item" key={s.label}>
                  <img src={s.image} alt={s.label} className="cer-process__image" loading="lazy" />
                  <span className="cer-process__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cer-process-progress"><div className="cer-process-progress__bar" suppressHydrationWarning></div></div>
        </div>
      </section>

      <section className="cer-section">
        <div className="cer-container">
          <div className="cer-section__title cer-fade-in">
            <span className="cer-section__subtitle">{hp.popular.subtitle}</span>
            <h2>{hp.popular.heading}</h2>
          </div>
          <div className="cer-grid cer-grid--4 cer-fade-in">
            {featured.map((p) => <ProductCard key={p.slug} product={p} showCategory={true} />)}
          </div>
          <div className="cer-section__cta cer-fade-in">
            <a href={hp.popular.ctaLink} className="cer-btn cer-btn--outline">{hp.popular.ctaText}</a>
          </div>
        </div>
      </section>

      <section className="cer-atmospheric">
        <div className="cer-atmospheric__bg">
          <img src={hp.atmospheric.bg} alt="" loading="lazy" />
        </div>
        <div className="cer-atmospheric__overlay"></div>
        <div className="cer-atmospheric__text">{hp.atmospheric.text}</div>
      </section>

      <section className="cer-section">
        <div className="cer-container">
          <div className="cer-section__title cer-fade-in">
            <span className="cer-section__subtitle">{hp.gallery.subtitle}</span>
            <h2>{hp.gallery.heading}</h2>
          </div>
          <div className="cer-masonry cer-fade-in">
            {galleryItems.map((item) => (
              <div className="cer-masonry__item" key={item.title}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="cer-masonry__caption">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cer-cta cer-fade-in">
        <div className="cer-container">
          <span className="cer-section__subtitle">{hp.cta.subtitle}</span>
          <h2>{hp.cta.heading}</h2>
          <a href={hp.cta.btnLink} className="cer-btn cer-btn--primary">{hp.cta.btnText}</a>
        </div>
      </section>

      <section className="cer-section cer-section--no-bottom">
        <div className="cer-container">
          <div className="cer-section__title cer-fade-in">
            <span className="cer-section__subtitle">{hp.insta.subtitle}</span>
            <h2>{hp.insta.heading}</h2>
          </div>
        </div>
        <div className="cer-insta-grid cer-fade-in">
          {hp.insta.images.map((img, i) => (
            <div className="cer-insta-grid__item" key={i}><img src={img} alt="" loading="lazy" /></div>
          ))}
        </div>
      </section>

      <Lightbox />
    </Shell>
  )
}
