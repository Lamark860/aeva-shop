import React from 'react'
import Shell from '@/components/Shell'
import { submitOrder } from './actions'

export const dynamic = 'force-dynamic'

export default async function OrderPage({ searchParams }: { searchParams: Promise<{ product?: string; sent?: string; error?: string }> }) {
  const { product = '', sent, error } = await searchParams
  const success = sent === '1'

  return (
    <Shell active="order">
      <div className="cer-page-header">
        <div className="cer-container">
          <span className="cer-section__subtitle">На заказ</span>
          <h1>Индивидуальный заказ</h1>
          <p>Можно создать изделие специально для вас</p>
        </div>
      </div>

      <section className="cer-section cer-section--no-top">
        <div className="cer-container">
          <div className="cer-order">
            {success && <div className="cer-flash">Заявка отправлена! Мы свяжемся с вами в ближайшее время.</div>}
            {error === '1' && (
              <div className="cer-flash" style={{ borderColor: '#c0392b', color: '#c0392b', background: 'rgba(192,57,43,0.08)' }}>
                Проверьте поля: имя, корректный email и описание заказа обязательны.
              </div>
            )}

            {!success && (
              <form action={submitOrder} className="cer-order__form">
                <div className="form-group">
                  <label htmlFor="name">Имя</label>
                  <input type="text" id="name" name="name" placeholder="Как к вам обращаться" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input type="text" id="phone" name="phone" placeholder="+7 (___) ___-__-__" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Что хотите заказать</label>
                  <textarea id="message" name="message" rows={5} placeholder="Опишите, какое изделие вы хотели бы заказать — форму, размер, цвет, назначение..."></textarea>
                </div>
                <input type="hidden" name="product" value={product} />
                <div className="cer-order__submit">
                  <button type="submit" className="cer-btn cer-btn--primary">Отправить заявку</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </Shell>
  )
}
