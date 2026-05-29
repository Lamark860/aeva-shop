import React from 'react'
import Image from 'next/image'
import Shell from '@/components/Shell'
import MetricValue from '@/components/fx/MetricValue'
import { getProjects, getHorecaPage } from '@/lib/data'
import { submitHoreca } from './actions'

// Форма + чтение searchParams (sent/error) → страница динамическая.
export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Ресторанам — Керамика',
  description: 'Авторская посуда под концепцию заведения. Разработка форм и производство партиями от 50 до 500 единиц.',
}

const PROJECT_TYPE_OPTIONS = [
  { value: 'new', label: 'Новое заведение, открытие' },
  { value: 'update', label: 'Обновление концепции' },
  { value: 'expand', label: 'Расширение действующего набора' },
  { value: 'scouting', label: 'Пока разведка' },
]
const BATCH_OPTIONS = [
  { value: 'lt50', label: 'до 50 единиц' },
  { value: '50_150', label: '50–150' },
  { value: '150_300', label: '150–300' },
  { value: 'gt300', label: '300+' },
  { value: 'unknown', label: 'Пока не знаю' },
]
const TIMELINE_OPTIONS = [
  { value: 'flexible', label: 'не срочно' },
  { value: 'quarter', label: 'в течение квартала' },
  { value: 'opening', label: 'к открытию' },
  { value: 'discuss', label: 'обсудим' },
]

export default async function HorecaPage({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  const { sent, error } = await searchParams
  const success = sent === '1'
  const errorText = error === 'rate'
    ? 'Слишком много заявок за короткое время. Попробуйте через несколько минут.'
    : error === '1'
      ? 'Проверьте поля: название заведения, контактное лицо и корректный email обязательны.'
      : null

  const [cases, h] = await Promise.all([
    getProjects({ featured: true, limit: 3 }),
    getHorecaPage(),
  ])

  return (
    <Shell active="horeca" isHero={true}>
      {/* Hero */}
      <section className="cer-project-hero cer-project-hero--center">
        <div className="cer-project-hero__bg">
          <Image src={h.hero.bg} alt="" fill priority sizes="100vw" className="fx-kenburns" style={{ objectFit: 'cover' }} />
        </div>
        <div className="cer-project-hero__overlay" />
        <div className="cer-project-hero__content">
          <div className="cer-container">
            {h.hero.meta && <div className="cer-project-hero__meta"><span>{h.hero.meta}</span></div>}
            <h1 className="cer-project-hero__title">{h.hero.title}</h1>
            {h.hero.lead && <p className="cer-project-hero__lead">{h.hero.lead}</p>}
            {h.hero.btnText && <div><a href="#contact" className="cer-btn cer-btn--primary">{h.hero.btnText}</a></div>}
          </div>
        </div>
      </section>

      {/* Метрики */}
      {h.metrics.length > 0 && (
        <section className="cer-section" style={{ background: 'var(--cer-bg-alt)' }}>
          <div className="cer-container">
            <div className="cer-metrics cer-fade-in">
              {h.metrics.map((m, i) => (
                <div key={i}>
                  <div className="cer-metric__value"><MetricValue value={m.value} /></div>
                  <div className="cer-metric__label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Кейсы (featured-проекты) */}
      {cases.length > 0 && (
        <section className="cer-section">
          <div className="cer-container">
            <div className="cer-section__title cer-text-reveal">
              {h.cases.subtitle && <span className="cer-section__subtitle">{h.cases.subtitle}</span>}
              {h.cases.heading && <h2>{h.cases.heading}</h2>}
            </div>
            <div className="cer-cases cer-fade-in">
              {cases.map((c) => (
                <a key={c.slug} href={`/projects/${c.slug}`} className="cer-case">
                  <div className="cer-case__img-wrap">
                    {c.image && (
                      <Image className="cer-case__img" src={c.image} alt={c.title} fill sizes="(min-width: 768px) 33vw, 100vw" style={{ objectFit: 'cover' }} />
                    )}
                  </div>
                  <div className="cer-case__meta">{c.typeLabel}{c.year ? ` · ${c.year}` : ''}</div>
                  <h3 className="cer-case__title">{c.title}</h3>
                  {c.subtitle && <div className="cer-case__note">{c.subtitle}</div>}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Процесс */}
      {h.process.steps.length > 0 && (
        <section className="cer-section" style={{ background: 'var(--cer-bg-alt)' }}>
          <div className="cer-container">
            <div className="cer-section__title cer-text-reveal">
              {h.process.subtitle && <span className="cer-section__subtitle">{h.process.subtitle}</span>}
              {h.process.heading && <h2>{h.process.heading}</h2>}
            </div>
            <div className="cer-steps cer-fade-in">
              {h.process.steps.map((s, i) => (
                <div key={i}>
                  <div className="cer-step__num">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="cer-step__title">{s.heading}</h3>
                  <p className="cer-step__text">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Форма */}
      <section className="cer-section" id="contact">
        <div className="cer-container">
          <div className="cer-section__title cer-text-reveal" style={{ textAlign: 'center' }}>
            {h.form.subtitle && <span className="cer-section__subtitle">{h.form.subtitle}</span>}
            {h.form.heading && <h2>{h.form.heading}</h2>}
            {h.form.lead && <p>{h.form.lead}</p>}
          </div>

          <div className="cer-order cer-order--wide">
            {success && <div className="cer-flash">Заявка отправлена! Свяжусь с вами в течение рабочего дня.</div>}
            {errorText && (
              <div className="cer-flash" style={{ borderColor: '#c0392b', color: '#c0392b', background: 'rgba(192,57,43,0.08)' }}>
                {errorText}
              </div>
            )}

            {!success && (
              <form action={submitHoreca} className="cer-order__form">
                {/* honeypot */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="cer-order__row">
                  <div className="form-group">
                    <label htmlFor="venueName">Заведение</label>
                    <input type="text" id="venueName" name="venueName" placeholder="Название" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Город</label>
                    <input type="text" id="city" name="city" placeholder="Москва" />
                  </div>
                </div>

                <div className="cer-order__row">
                  <div className="form-group">
                    <label htmlFor="name">Ваше имя</label>
                    <input type="text" id="name" name="name" placeholder="Как к вам обращаться" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="position">Должность</label>
                    <input type="text" id="position" name="position" placeholder="Шеф, бренд-шеф, закупщик…" />
                  </div>
                </div>

                <div className="cer-order__row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Телефон / Telegram</label>
                    <input type="text" id="phone" name="phone" placeholder="+7 (___) ___-__-__" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="projectType">Тип проекта</label>
                  <select id="projectType" name="projectType" defaultValue="">
                    <option value="">—</option>
                    {PROJECT_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>

                <div className="cer-order__row">
                  <div className="form-group">
                    <label htmlFor="batchSize">Ориентир по партии</label>
                    <select id="batchSize" name="batchSize" defaultValue="">
                      <option value="">—</option>
                      {BATCH_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="timeline">К какому сроку</label>
                    <select id="timeline" name="timeline" defaultValue="">
                      <option value="">—</option>
                      {TIMELINE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="conceptDescription">Концепция или меню — пара слов</label>
                  <textarea id="conceptDescription" name="conceptDescription" rows={4} placeholder="Тейстинг, фарм-ту-тэйбл, японский бар…"></textarea>
                </div>

                <div className="cer-order__submit">
                  <button type="submit" className="cer-btn cer-btn--primary">{h.form.btnText}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </Shell>
  )
}
