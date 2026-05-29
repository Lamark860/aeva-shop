import React from 'react'
import Shell from '@/components/Shell'
import FadeIn from '@/components/fx/FadeIn'
import RevealMask from '@/components/fx/RevealMask'
import { getCarePage } from '@/lib/data'

export const revalidate = 3600

export async function generateMetadata() {
  const c = await getCarePage()
  return {
    title: `${c.title} — Керамика`,
    description: c.lead,
  }
}

export default async function CarePage() {
  const c = await getCarePage()
  return (
    <Shell active="care">
      <div className="cer-page-header">
        <div className="cer-container">
          {/* див-обёртка для каждого RevealMask: сам он inline-block, иначе subtitle и h1
              встают на одну строку при коротком тексте */}
          <div><RevealMask><span className="cer-section__subtitle">{c.subtitle}</span></RevealMask></div>
          <div><RevealMask delay={80}><h1>{c.title}</h1></RevealMask></div>
          <FadeIn delay={200}><p>{c.lead}</p></FadeIn>
        </div>
      </div>

      <section className="cer-section cer-section--no-top">
        <div className="cer-container">
          <div className="cer-numbered">
            {c.items.map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="cer-numbered__item">
                  <div className="cer-numbered__num">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h3 className="cer-numbered__title">{item.heading}</h3>
                    <p className="cer-numbered__text">{item.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {c.footer.text && (
            <FadeIn>
              <div style={{ maxWidth: 760, margin: '64px auto 0', padding: 32, background: 'var(--cer-bg-alt)', textAlign: 'center' }}>
                <div style={{ fontSize: 15, color: 'var(--cer-text-muted)', lineHeight: 1.7 }}>
                  {c.footer.text}{c.footer.linkText && ' '}
                  {c.footer.linkText && (
                    <a href={c.footer.linkHref || '#'} style={{ color: 'var(--cer-accent)', borderBottom: '1px solid' }}>
                      {c.footer.linkText}
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </Shell>
  )
}
