import React from 'react'
import Shell from '@/components/Shell'
import FadeIn from '@/components/fx/FadeIn'
import RevealMask from '@/components/fx/RevealMask'
import { subscribe } from './actions'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Дневник мастерской — Керамика',
  description: 'Раз в месяц короткое письмо: что в работе сейчас, какие формы рождаются, заметки про материал.',
}

export default async function JournalPage({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  const { sent, error } = await searchParams
  const success = sent === '1'
  const errorText = error === 'rate'
    ? 'Слишком много попыток. Попробуйте через несколько минут.'
    : error === '1'
      ? 'Проверьте email — кажется, в нём опечатка.'
      : null

  return (
    <Shell active="journal">
      <div className="cer-page-header">
        <div className="cer-container">
          <div><RevealMask><span className="cer-section__subtitle">Дневник мастерской</span></RevealMask></div>
          <div><RevealMask delay={80}><h1>Раз в месяц короткое письмо</h1></RevealMask></div>
          <FadeIn delay={200}>
            <p>
              Что в работе сейчас, какие формы рождаются, заметки про материал. Без рассылок, без скидок.
            </p>
          </FadeIn>
        </div>
      </div>

      <section className="cer-section cer-section--no-top">
        <div className="cer-container">
          <FadeIn>
            <div style={{ maxWidth: 560, margin: '0 auto' }}>
              {success && (
                <div className="cer-flash">Подписаны. Пришлю первое письмо в начале следующего месяца.</div>
              )}
              {errorText && (
                <div className="cer-flash" style={{ borderColor: '#c0392b', color: '#c0392b', background: 'rgba(192,57,43,0.08)' }}>
                  {errorText}
                </div>
              )}

              {!success && (
                <form action={subscribe} className="cer-subscribe">
                  {/* honeypot */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                  />
                  <button type="submit" className="cer-btn cer-btn--primary">Подписаться</button>
                </form>
              )}

              {!success && (
                <div className="cer-subscribe__hint">Отписаться можно одним кликом.</div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Пример прошлого письма */}
      <section className="cer-section cer-section--no-top" style={{ background: 'var(--cer-bg-alt)' }}>
        <div className="cer-container">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <span className="cer-section__subtitle">Пример прошлого письма</span>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <article className="cer-journal-letter">
              <div className="cer-journal-letter__meta">Март 2026 · письмо №14</div>
              <h2 className="cer-journal-letter__title">Про серию «Земля» и обнажённый черепок</h2>
              <p>
                Привет. На этой неделе достала из печи первые шесть чаш «Земли». Это серия, в которой
                я почти не использую глазурь — оставляю шамот в его родной форме, только полирую
                места касания.
              </p>
              <p>
                Получилось не как задумывала: три чаши вышли темнее, чем рассчитывала. Сначала
                расстроилась, потом поняла, что это и есть та история, ради которой я делаю керамику
                без полной глазури — материал сам решает.
              </p>
              <p>На следующей неделе откроем продажи. Подписчикам — на день раньше.</p>
              <div className="cer-journal-letter__sign">А.</div>
            </article>
          </FadeIn>
        </div>
      </section>
    </Shell>
  )
}
