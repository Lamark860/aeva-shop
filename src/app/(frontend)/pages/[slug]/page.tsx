import React from 'react'
import { notFound } from 'next/navigation'
import Shell from '@/components/Shell'
import RevealMask from '@/components/fx/RevealMask'
import FadeIn from '@/components/fx/FadeIn'
import { getPageBySlug } from '@/lib/data'

// ISR — мгновенный сброс из afterChange-хука Pages. Если страница ещё не создана
// в админке (или slug опечатан) — 404.
export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getPageBySlug(slug)
  return { title: p ? `${p.title} — Керамика` : 'Страница — Керамика', description: p?.subtitle || undefined }
}

export default async function FreePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) notFound()

  // Тело страницы — текст из админки, разбиваем по пустым строкам в параграфы.
  // URL-ы автолинкуем (простой подход, без markdown).
  const paragraphs = page.body.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean)

  return (
    <Shell active="">
      <div className="cer-page-header">
        <div className="cer-container">
          <RevealMask as="div"><h1>{page.title}</h1></RevealMask>
          {page.subtitle && <FadeIn delay={150}><p>{page.subtitle}</p></FadeIn>}
        </div>
      </div>
      <section className="cer-section cer-section--no-top">
        <div className="cer-container" style={{ maxWidth: 760 }}>
          {paragraphs.map((p, i) => (
            <FadeIn key={i} delay={i * 60}>
              <p style={{ fontSize: 17, lineHeight: 1.75, marginBottom: 20, color: 'var(--cer-text)' }}>
                {linkify(p)}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>
    </Shell>
  )
}

// Простой автолинк https://... и phone +7…
function linkify(text: string): React.ReactNode[] {
  const re = /(https?:\/\/[^\s)]+|\+?\d[\d\s\-()]{7,}\d)/g
  const out: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(re)) {
    const start = m.index!
    if (start > last) out.push(text.slice(last, start))
    const val = m[0]
    if (val.startsWith('http')) {
      out.push(<a key={start} href={val} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cer-accent)' }}>{val}</a>)
    } else {
      const tel = val.replace(/[^\d+]/g, '')
      out.push(<a key={start} href={`tel:${tel}`} style={{ color: 'var(--cer-accent)' }}>{val}</a>)
    }
    last = start + val.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}
