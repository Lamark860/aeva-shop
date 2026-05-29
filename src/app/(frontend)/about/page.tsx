import React from 'react'
import Image from 'next/image'
import Shell from '@/components/Shell'
import FadeIn from '@/components/fx/FadeIn'
import RevealMask from '@/components/fx/RevealMask'
import { getPageBySlug, getAboutPage } from '@/lib/data'

// Интро (заголовок + большой текст рядом с портретом) — Pages doc slug='about'.
// Остальные секции (цитата, материал, триптих, 3 типа работ, CTA) — Global AboutPage.
export const revalidate = 3600
export const metadata = {
  title: 'О мастере — Керамика',
  description: 'Алина, основательница AEVA. Авторская посуда для ресторанов и частных интерьеров.',
}

// Парсим body на (intro-параграф) + (параграфы | подзаголовки).
//   - первая строка — крупный intro
//   - короткая строка без знаков препинания на конце = подзаголовок
function parseAboutBody(body: string): { intro: string; rest: { text: string; isSubheading: boolean }[] } {
  const paragraphs = body.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean)
  const intro = paragraphs[0] ?? ''
  const rest = paragraphs.slice(1).map(p => ({
    text: p,
    isSubheading: p.length <= 55 && !/[.:!?]$/.test(p) && !p.includes('\n'),
  }))
  return { intro, rest }
}

export default async function AboutPage() {
  const [pageDoc, about] = await Promise.all([getPageBySlug('about'), getAboutPage()])
  const portraitSrc = about.portraitPhoto || '/api/media/file/aeva-about-0.jpg'
  const useCms = !!pageDoc?.body
  const parsed = useCms ? parseAboutBody(pageDoc!.body) : { intro: '', rest: [] }
  // если триптих и материал-фото не загружены — секции либо упрощаются, либо скрываются

  return (
    <Shell active="about">
      {/* Intro */}
      <section className="cer-section" style={{ paddingTop: '180px' }}>
        <div className="cer-container">
          {/* RevealMask внутри обёрнут в div: сам он display:inline-block (для маски descender'ов),
              два as="div" рядом всё равно встают inline. Внешний div принудительно ставит их в столбец. */}
          <div><RevealMask><span className="cer-section__subtitle">О мастере</span></RevealMask></div>
          <div style={{ marginTop: 8 }}>
            <RevealMask delay={80}>
              <h1 style={{ fontSize: 'clamp(48px, 6vw, 88px)', margin: '0 0 56px', lineHeight: 1.05 }}>
                {useCms ? (pageDoc!.title || 'Обо мне') : (<>Я делаю керамику,<br />с которой хочется<br />провести утро.</>)}
              </h1>
            </RevealMask>
          </div>
          <div className="cer-two-col">
            <FadeIn>
              <div className="cer-two-col__image">
                <Image src={portraitSrc} alt="Алина, основательница AEVA" fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: 'cover' }} />
              </div>
            </FadeIn>
            <div className="cer-two-col__text">
              {useCms ? (
                <>
                  <FadeIn>
                    <p style={{ fontFamily: 'var(--cer-font-heading)', fontSize: 30, lineHeight: 1.4, margin: '0 0 24px', color: 'var(--cer-text)' }}>
                      {parsed.intro}
                    </p>
                  </FadeIn>
                  {parsed.rest.map((p, i) => (
                    <FadeIn key={i} delay={120 + i * 40}>
                      {p.isSubheading
                        ? <h3 style={{ fontFamily: 'var(--cer-font-heading)', fontSize: 22, fontWeight: 400, color: 'var(--cer-accent)', margin: '32px 0 12px' }}>{p.text}</h3>
                        : <p style={{ marginBottom: 14 }}>{p.text}</p>}
                    </FadeIn>
                  ))}
                </>
              ) : (
                <FadeIn>
                  <p style={{ fontFamily: 'var(--cer-font-heading)', fontSize: 30, lineHeight: 1.4, color: 'var(--cer-text)' }}>
                    Заполните страницу «Обо мне» в админке (раздел «Страницы», документ slug=about).
                  </p>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      {about.quote.text && (
        <section className="cer-about-quote">
          <FadeIn>
            <p>«{about.quote.text}»</p>
            {about.quote.author && (
              <p style={{ marginTop: 16, fontSize: 14, color: 'var(--cer-text-light)' }}>— {about.quote.author}</p>
            )}
          </FadeIn>
        </section>
      )}

      {/* Material */}
      {(about.material.heading || about.material.paragraphs.length > 0) && (
        <section className="cer-section">
          <div className="cer-container">
            <div className="cer-two-col">
              {about.material.photo && (
                <FadeIn>
                  <div className="cer-two-col__image">
                    <Image src={about.material.photo} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: 'cover' }} />
                  </div>
                </FadeIn>
              )}
              <div className="cer-two-col__text">
                {about.material.subtitle && <FadeIn><span className="cer-section__subtitle">{about.material.subtitle}</span></FadeIn>}
                {about.material.heading && <FadeIn delay={80}><h2>{about.material.heading}</h2></FadeIn>}
                {about.material.paragraphs.map((p, i) => (
                  <FadeIn key={i} delay={160 + i * 80}><p>{p}</p></FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Triptych */}
      {about.triptych.length > 0 && (
        <section className="cer-section cer-section--no-top">
          <div className="cer-container">
            <div className="cer-about-triptych">
              {about.triptych.map((src, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div>
                    <Image src={src} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" style={{ objectFit: 'cover' }} />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Three types */}
      {about.types.items.length > 0 && (
        <section className="cer-section">
          <div className="cer-container">
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              {about.types.subtitle && <FadeIn><span className="cer-section__subtitle">{about.types.subtitle}</span></FadeIn>}
              {about.types.heading && <FadeIn delay={80}><h2 style={{ margin: '8px 0 48px' }}>{about.types.heading}</h2></FadeIn>}
              <div className="cer-numbered">
                {about.types.items.map((t, i) => (
                  <FadeIn key={i} delay={i * 100}>
                    <div className="cer-numbered__item" style={{ gridTemplateColumns: '80px 1fr auto', alignItems: 'center' }}>
                      <div className="cer-numbered__num">{String(i + 1).padStart(2, '0')}</div>
                      <div>
                        <h3 className="cer-numbered__title">{t.heading}</h3>
                        <p className="cer-numbered__text">{t.text}</p>
                      </div>
                      {t.ctaText && t.ctaLink && (
                        <a href={t.ctaLink} className="cer-section__subtitle" style={{ color: 'var(--cer-accent)', borderBottom: '1px solid', whiteSpace: 'nowrap' }}>
                          {t.ctaText}
                        </a>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Signature CTA */}
      {(about.cta.headingLine1 || about.cta.headingLine2) && (
        <section className="cer-cta">
          <div className="cer-container">
            {about.cta.subtitle && <FadeIn><span className="cer-section__subtitle">{about.cta.subtitle}</span></FadeIn>}
            <FadeIn delay={80}>
              <h2>{about.cta.headingLine1}{about.cta.headingLine2 && <><br />{about.cta.headingLine2}</>}</h2>
            </FadeIn>
            {about.cta.btnText && about.cta.btnLink && (
              <FadeIn delay={160}>
                <a href={about.cta.btnLink} className="cer-btn cer-btn--primary">{about.cta.btnText}</a>
              </FadeIn>
            )}
          </div>
        </section>
      )}
    </Shell>
  )
}
