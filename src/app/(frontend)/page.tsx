import React from 'react'
import Shell from '@/components/Shell'
import ProductCard from '@/components/ProductCard'
import Lightbox from '@/components/Lightbox'
import { getProducts, getGallery } from '@/lib/data'

export const dynamic = 'force-dynamic'

const steps: [string, string][] = [
  ['Замес глины', 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=560&h=720&fit=crop&q=80'],
  ['Гончарный круг', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=560&h=720&fit=crop&q=80'],
  ['Формовка', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=560&h=720&fit=crop&q=80'],
  ['Сушка', 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=560&h=720&fit=crop&q=80'],
  ['Обжиг', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=560&h=720&fit=crop&q=80'],
  ['Глазурование', 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=560&h=720&fit=crop&q=80'],
]
const instaImages = [
  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=500&h=500&fit=crop',
]

export default async function Home() {
  const [collectionPreview, featured, galleryItems] = await Promise.all([
    getProducts({ limit: 3 }),
    getProducts({ featured: true, limit: 4 }),
    getGallery(9),
  ])

  return (
    <Shell active="home" isHero={true}>
      <section className="cer-hero">
        <div className="cer-hero__bg">
          <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&h=1080&fit=crop&q=80" alt="Авторская керамика" />
        </div>
        <div className="cer-hero__overlay"></div>
        <div className="cer-hero__content">
          <h1 className="cer-hero__title">Авторская керамика<br />ручной работы</h1>
          <div className="cer-hero__buttons">
            <a href="/catalog" className="cer-btn cer-btn--primary">Смотреть изделия</a>
            <a href="/order" className="cer-btn cer-btn--outline">Индивидуальный заказ</a>
          </div>
        </div>
      </section>

      <section className="cer-section">
        <div className="cer-container">
          <div className="cer-section__title cer-fade-in">
            <span className="cer-section__subtitle">Коллекция</span>
            <h2>Избранные работы</h2>
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
              <img src="https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&h=1000&fit=crop&q=80" alt="Мастер" loading="lazy" />
            </div>
            <div className="cer-two-col__text cer-fade-right">
              <span className="cer-section__subtitle">О мастере</span>
              <h2>Каждое изделие —<br />история</h2>
              <p>Я создаю керамику вручную в небольшой мастерской. Каждое изделие уникально.</p>
              <p>Натуральная глина, ручная лепка, двойной обжиг — каждая деталь продумана и выполнена с любовью к материалу.</p>
              <a href="/gallery" className="cer-btn cer-btn--ghost">Смотреть галерею</a>
            </div>
          </div>
        </div>
      </section>

      <section className="cer-section" style={{ backgroundColor: 'var(--cer-bg-alt)' }}>
        <div className="cer-container">
          <div className="cer-section__title cer-fade-in">
            <span className="cer-section__subtitle">Процесс</span>
            <h2>Как создаётся керамика</h2>
          </div>
        </div>
        <div className="cer-process-wrapper cer-fade-in">
          <div className="cer-process">
            <div className="cer-process__track">
              {steps.map((s) => (
                <div className="cer-process__item" key={s[0]}>
                  <img src={s[1]} alt={s[0]} className="cer-process__image" loading="lazy" />
                  <span className="cer-process__label">{s[0]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cer-process-progress"><div className="cer-process-progress__bar"></div></div>
        </div>
      </section>

      <section className="cer-section">
        <div className="cer-container">
          <div className="cer-section__title cer-fade-in">
            <span className="cer-section__subtitle">Изделия</span>
            <h2>Популярные работы</h2>
          </div>
          <div className="cer-grid cer-grid--4 cer-fade-in">
            {featured.map((p) => <ProductCard key={p.slug} product={p} showCategory={true} />)}
          </div>
          <div className="cer-section__cta cer-fade-in">
            <a href="/catalog" className="cer-btn cer-btn--outline">Весь каталог</a>
          </div>
        </div>
      </section>

      <section className="cer-atmospheric">
        <div className="cer-atmospheric__bg">
          <img src="https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=1920&h=1080&fit=crop&q=80" alt="" loading="lazy" />
        </div>
        <div className="cer-atmospheric__overlay"></div>
        <div className="cer-atmospheric__text">Каждое изделие уникально</div>
      </section>

      <section className="cer-section">
        <div className="cer-container">
          <div className="cer-section__title cer-fade-in">
            <span className="cer-section__subtitle">Галерея</span>
            <h2>Из мастерской</h2>
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
          <span className="cer-section__subtitle">Индивидуально</span>
          <h2>Можно создать изделие специально для вас</h2>
          <a href="/order" className="cer-btn cer-btn--primary">Оставить заявку</a>
        </div>
      </section>

      <section className="cer-section cer-section--no-bottom">
        <div className="cer-container">
          <div className="cer-section__title cer-fade-in">
            <span className="cer-section__subtitle">@ceramic_studio</span>
            <h2>Атмосфера мастерской</h2>
          </div>
        </div>
        <div className="cer-insta-grid cer-fade-in">
          {instaImages.map((img, i) => (
            <div className="cer-insta-grid__item" key={i}><img src={img} alt="" loading="lazy" /></div>
          ))}
        </div>
      </section>

      <Lightbox />
    </Shell>
  )
}
