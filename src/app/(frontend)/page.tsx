import React from 'react'
import Image from 'next/image'
import Shell from '@/components/Shell'
import ProductCard from '@/components/ProductCard'
import Lightbox from '@/components/Lightbox'
import Signature from '@/components/Signature'
import FadeIn from '@/components/fx/FadeIn'
import RevealMask from '@/components/fx/RevealMask'
import Parallax from '@/components/fx/Parallax'
import { getProducts, getGallery, getHomepage } from '@/lib/data'

// ISR: периодический фон-ребилд + мгновенный сброс через revalidatePath из хуков Payload
export const revalidate = 3600

// Полоса разветвления — три равноправных трека под hero.
// Третья карточка (HoReCa) тёмная — visual anchor для B2B-track из ТЗ.
const ROUTING = [
  { href: '/catalog', eyebrow: 'Авторские работы', title: 'Каталог', desc: 'Готовые изделия — вазы, чаши, наборы, декор.', cta: 'Открыть каталог →', dark: false },
  { href: '/order',   eyebrow: 'Индивидуально',    title: 'На заказ', desc: 'Создам изделие специально под ваш дом или подарок.', cta: 'Оставить заявку →', dark: false },
  { href: '/horeca',  eyebrow: 'Для заведений',    title: 'Ресторанам', desc: 'Разработка и производство посуды партиями для кафе и баров.', cta: 'Обсудить проект →', dark: true },
]

export default async function Home() {
  const [hp, featured, popular, galleryItems] = await Promise.all([
    getHomepage(),
    getProducts({ featured: true, limit: 3 }),
    getProducts({ limit: 4 }),
    getGallery(6),
  ])

  return (
    <Shell active="home" isHero={true}>
      {/* ============ Hero V3 ============ */}
      <section className="cer-hero-v3">
        <div className="cer-hero-v3__bg">
          <Image
            src={hp.hero.bg}
            alt="Авторская керамика"
            fill
            priority
            sizes="100vw"
            className="fx-kenburns"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="cer-hero-v3__overlay" />
        <div className="cer-hero-v3__content">
          <h1 className="cer-hero-v3__title">
            <RevealMask as="span">{hp.hero.titleLine1}</RevealMask>
            <br />
            <RevealMask as="span" delay={100}>{hp.hero.titleLine2}</RevealMask>
          </h1>
          <div className="cer-hero-v3__lead-wrap">
            <RevealMask as="span" delay={280}>
              <p className="cer-hero-v3__lead">
                Из шамотной глины. Для дома, для подарка, для ресторана.
              </p>
            </RevealMask>
          </div>
        </div>
        <div className="cer-hero-v3__scroll">Прокрутите ↓</div>
      </section>

      {/* ============ Routing strip ============ */}
      <section className="cer-routing">
        <div className="cer-routing__grid">
          {ROUTING.map((it, i) => (
            <FadeIn key={it.href} delay={i * 100}>
              <a
                href={it.href}
                className={'cer-routing__card' + (it.dark ? ' cer-routing__card--dark' : '')}
              >
                <span className="cer-routing__eyebrow">{it.eyebrow}</span>
                <h3 className="cer-routing__title">{it.title}</h3>
                <p className="cer-routing__desc">{it.desc}</p>
                <span className="cer-routing__cta">{it.cta}</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============ Избранные (3 шт) ============ */}
      <section className="cer-section">
        <div className="cer-container">
          <FadeIn>
            <div className="cer-section__title">
              <span className="cer-section__subtitle">{hp.collection.subtitle}</span>
              <h2>{hp.collection.heading}</h2>
            </div>
          </FadeIn>
          <div className="cer-grid cer-grid--3">
            {featured.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 100}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ О мастере ============ */}
      <section className="cer-section cer-section--no-top">
        <div className="cer-container">
          <div className="cer-two-col">
            <FadeIn>
              <div className="cer-two-col__image">
                <Image
                  src={hp.about.image}
                  alt="Мастер"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </FadeIn>
            <div className="cer-two-col__text">
              <FadeIn><span className="cer-section__subtitle">{hp.about.subtitle}</span></FadeIn>
              <FadeIn delay={80}>
                <h2>{hp.about.headingLine1}<br />{hp.about.headingLine2}</h2>
              </FadeIn>
              {hp.about.paragraphs.map((p, i) => (
                <FadeIn key={i} delay={160 + i * 80}><p>{p}</p></FadeIn>
              ))}
              <FadeIn delay={400}>
                <div style={{ margin: '8px 0 24px' }}><Signature /></div>
                <a href={hp.about.ctaLink} className="cer-btn cer-btn--ghost">{hp.about.ctaText}</a>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Процесс ============ */}
      <section className="cer-section" style={{ backgroundColor: 'var(--cer-bg-alt)' }}>
        <div className="cer-container">
          <FadeIn>
            <div className="cer-section__title">
              <span className="cer-section__subtitle">{hp.process.subtitle}</span>
              <h2>{hp.process.heading}</h2>
            </div>
          </FadeIn>
        </div>
        <FadeIn>
          <div className="cer-process-wrapper">
            <div className="cer-process">
              <div className="cer-process__track">
                {hp.process.steps.map((s) => (
                  <div className="cer-process__item" key={s.label}>
                    <Image src={s.image} alt={s.label} width={280} height={360} className="cer-process__image" sizes="280px" />
                    <span className="cer-process__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="cer-process-progress">
              <div className="cer-process-progress__bar" suppressHydrationWarning></div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ============ Популярное (4 шт) ============ */}
      <section className="cer-section">
        <div className="cer-container">
          <FadeIn>
            <div className="cer-section__title">
              <span className="cer-section__subtitle">{hp.popular.subtitle}</span>
              <h2>{hp.popular.heading}</h2>
            </div>
          </FadeIn>
          <div className="cer-grid cer-grid--4">
            {popular.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 80}>
                <ProductCard product={p} showCategory />
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="cer-section__cta">
              <a href={hp.popular.ctaLink} className="cer-btn cer-btn--outline">{hp.popular.ctaText}</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ Атмосферная полоса ============ */}
      <section className="cer-atmospheric">
        <Parallax speed={0.18} className="cer-atmospheric__bg">
          <Image src={hp.atmospheric.bg} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </Parallax>
        <div className="cer-atmospheric__overlay"></div>
        <FadeIn className="cer-atmospheric__text">{hp.atmospheric.text}</FadeIn>
      </section>

      {/* ============ Галерея (превью) ============ */}
      <section className="cer-section">
        <div className="cer-container">
          <FadeIn>
            <div className="cer-section__title">
              <span className="cer-section__subtitle">{hp.gallery.subtitle}</span>
              <h2>{hp.gallery.heading}</h2>
            </div>
          </FadeIn>
          <div className="cer-masonry">
            {galleryItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 60}>
                <div className="cer-masonry__item">
                  {/* Lightbox в ceramic.js читает <img>.src напрямую — оставляем native, чтобы открывался оригинал, а не /_next/image превью */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="cer-masonry__caption">{item.title}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Большой CTA ============ */}
      <section className="cer-cta">
        <div className="cer-container">
          <FadeIn><span className="cer-section__subtitle">{hp.cta.subtitle}</span></FadeIn>
          <FadeIn delay={80}><h2>{hp.cta.heading}</h2></FadeIn>
          <FadeIn delay={160}>
            <a href={hp.cta.btnLink} className="cer-btn cer-btn--primary">{hp.cta.btnText}</a>
          </FadeIn>
        </div>
      </section>

      <Lightbox />
    </Shell>
  )
}
