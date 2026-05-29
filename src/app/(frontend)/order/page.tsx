import React from 'react'
import Shell from '@/components/Shell'
import FadeIn from '@/components/fx/FadeIn'
import { submitOrder } from './actions'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Индивидуальный заказ — Керамика',
  description: 'Расскажите, какое изделие хотелось бы — подготовлю эскиз и согласую.',
}

// Те же значения, что в коллекции Orders.ts (синхронизированы вручную)
const TYPE_OPTIONS = [
  { value: 'vase', label: 'Ваза' },
  { value: 'bowl', label: 'Чаша' },
  { value: 'plate', label: 'Тарелка / Блюдо' },
  { value: 'mug', label: 'Кружка' },
  { value: 'set', label: 'Набор' },
  { value: 'decor', label: 'Декор' },
  { value: 'other', label: 'Что-то другое' },
]
const PURPOSE_OPTIONS = [
  { value: 'self', label: 'Для себя' },
  { value: 'gift', label: 'Подарок' },
  { value: 'interior', label: 'Интерьер' },
  { value: 'unsure', label: 'Не уверен(а)' },
]
const DEADLINE_OPTIONS = [
  { value: 'flexible', label: 'не срочно' },
  { value: 'month', label: 'в течение месяца' },
  { value: 'date', label: 'к конкретной дате' },
  { value: 'discuss', label: 'обсудим' },
]
const BUDGET_OPTIONS = [
  { value: 'lt3k', label: 'до 3 000 ₽' },
  { value: '3k_7k', label: '3 000 – 7 000 ₽' },
  { value: '7k_15k', label: '7 000 – 15 000 ₽' },
  { value: 'gt15k', label: '15 000+ ₽' },
  { value: 'unknown', label: 'Пока не знаю' },
]

export default async function OrderPage({ searchParams }: { searchParams: Promise<{ product?: string; sent?: string; error?: string }> }) {
  const { product = '', sent, error } = await searchParams
  const success = sent === '1'
  const errorText = error === 'rate'
    ? 'Слишком много заявок за короткое время. Попробуйте через несколько минут.'
    : error === '1'
      ? 'Проверьте поля: имя, корректный email и описание заказа обязательны.'
      : null

  return (
    <Shell active="order">
      <div className="cer-page-header">
        <div className="cer-container">
          <FadeIn><span className="cer-section__subtitle">На заказ</span></FadeIn>
          <FadeIn delay={80}><h1>Индивидуальный заказ</h1></FadeIn>
          <FadeIn delay={160}>
            <p>Расскажите, какое изделие хотелось бы — подготовлю эскиз и согласую.</p>
          </FadeIn>
        </div>
      </div>

      <section className="cer-section cer-section--no-top">
        <div className="cer-container">
          <div className="cer-order cer-order--wide">
            {success && (
              <FadeIn>
                <div className="cer-flash">
                  Заявка отправлена! Свяжусь с вами в течение рабочего дня.
                </div>
              </FadeIn>
            )}
            {errorText && (
              <div className="cer-flash" style={{ borderColor: '#c0392b', color: '#c0392b', background: 'rgba(192,57,43,0.08)' }}>
                {errorText}
              </div>
            )}

            {!success && (
              <FadeIn>
                <form action={submitOrder} className="cer-order__form">
                  {/* honeypot: скрыт от людей (aria-hidden + off-screen), боты заполняют → заявка отбрасывается */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="cer-order__row">
                    <div className="form-group">
                      <label htmlFor="name">Имя</label>
                      <input type="text" id="name" name="name" placeholder="Как к вам обращаться" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Телефон / Telegram</label>
                    <input type="text" id="phone" name="phone" placeholder="+7 (___) ___-__-__ или @username" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="type">Что вы хотите заказать</label>
                    <select id="type" name="type" defaultValue="">
                      <option value="">—</option>
                      {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>

                  <div className="cer-order__row">
                    <div className="form-group">
                      <label htmlFor="purpose">Назначение</label>
                      <select id="purpose" name="purpose" defaultValue="">
                        <option value="">—</option>
                        {PURPOSE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="deadline">К какому сроку</label>
                      <select id="deadline" name="deadline" defaultValue="">
                        <option value="">—</option>
                        {DEADLINE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="budget">Ориентир по бюджету</label>
                    <select id="budget" name="budget" defaultValue="">
                      <option value="">—</option>
                      {BUDGET_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Опишите, что хотелось бы</label>
                    <textarea
                      id="message" name="message" rows={5}
                      placeholder="Форма, размер, цвет, для чего — что приходит в голову. Можно совсем коротко."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="referenceLink">Ссылка на референс (необязательно)</label>
                    <input type="text" id="referenceLink" name="referenceLink" placeholder="Фото в Instagram, Pinterest…" />
                  </div>

                  <input type="hidden" name="product" value={product} />

                  <div className="cer-order__submit">
                    <button type="submit" className="cer-btn cer-btn--primary">Отправить заявку</button>
                    <div style={{ fontSize: 13, color: 'var(--cer-text-light)', marginTop: 14 }}>
                      Обычно отвечаю в течение дня
                    </div>
                  </div>
                </form>
              </FadeIn>
            )}
          </div>
        </div>
      </section>
    </Shell>
  )
}
