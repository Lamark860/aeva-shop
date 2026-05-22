import React from 'react'
import Shell from '@/components/Shell'

export default function NotFound() {
  return (
    <Shell active="">
      <section className="cer-section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="cer-container" style={{ textAlign: 'center' }}>
          <span className="cer-section__subtitle">Ошибка 404</span>
          <h1 style={{ marginBottom: '16px' }}>Эта работа<br />уже нашла свой дом</h1>
          <p style={{ maxWidth: 480, margin: '0 auto 32px' }}>
            Страница не найдена — возможно, изделие уже продано или переехало.
            Посмотрите остальные работы.
          </p>
          <div className="cer-hero__buttons" style={{ marginTop: 0 }}>
            <a href="/catalog" className="cer-btn cer-btn--primary">Смотреть каталог</a>
            <a href="/" className="cer-btn cer-btn--outline">На главную</a>
          </div>
        </div>
      </section>
    </Shell>
  )
}
