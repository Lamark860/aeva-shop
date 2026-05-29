import React from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import Shell from '@/components/Shell'
import { getProjectBySlug } from '@/lib/data'

// ISR: страницы проектов кэшируются и пересобираются по требованию
// (revalidatePath) или раз в час; новые slug'и рендерятся on-demand.
export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  return {
    title: project ? `${project.title} — Проекты — Керамика` : 'Проект — Керамика',
    description: project?.subtitle || project?.description || undefined,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) redirect('/projects')

  return (
    <Shell active="projects" isHero={true}>
      {/* Hero с ken-burns */}
      <section className="cer-project-hero">
        {project.image && (
          <div className="cer-project-hero__bg">
            <Image src={project.image} alt="" fill priority sizes="100vw" className="fx-kenburns" style={{ objectFit: 'cover' }} />
          </div>
        )}
        <div className="cer-project-hero__overlay" />
        <div className="cer-project-hero__content">
          <div className="cer-container">
            <div className="cer-project-hero__meta">
              {project.year && <span>{project.year}</span>}
              {project.year && <span>·</span>}
              <span>{project.typeLabel}</span>
            </div>
            <h1 className="cer-project-hero__title">{project.title}</h1>
          </div>
        </div>
      </section>

      {/* Полоса фактов */}
      {project.facts.length > 0 && (
        <section className="cer-section" style={{ background: 'var(--cer-bg-alt)' }}>
          <div className="cer-container">
            <div className="cer-facts cer-fade-in">
              {project.facts.map((f) => (
                <div className="cer-fact" key={f.key}>
                  <div className="cer-fact__key">{f.key}</div>
                  <div className="cer-fact__value">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* История проекта */}
      {(project.subtitle || project.description) && (
        <section className="cer-section">
          <div className="cer-container">
            <div className="cer-project-story cer-fade-in">
              <span className="cer-section__subtitle">История проекта</span>
              {project.subtitle && <h2>{project.subtitle}</h2>}
              {project.description && <p>{project.description}</p>}
            </div>
          </div>
        </section>
      )}

      {/* Галерея проекта */}
      {project.gallery.length > 0 && (
        <section className="cer-section cer-section--no-top">
          <div className="cer-container">
            <div className="cer-project-gallery cer-fade-in">
              {project.gallery.map((src, i) => (
                <div className="cer-project-gallery__item" key={i}>
                  <Image src={src} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Цитата */}
      {project.quote && (
        <section className="cer-section cer-project-quote">
          <div className="cer-container">
            <p className="cer-project-quote__text cer-fade-in">{project.quote}</p>
            {project.quoteAuthor && <div className="cer-project-quote__author">{project.quoteAuthor}</div>}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="cer-section" style={{ textAlign: 'center' }}>
        <div className="cer-container">
          <div className="cer-fade-in">
            <span className="cer-section__subtitle">У вас похожий проект?</span>
            <h2 style={{ margin: '8px 0 32px' }}>Расскажите, что нужно</h2>
            <div className="cer-section__cta" style={{ marginTop: 0 }}>
              <a href="/order" className="cer-btn cer-btn--primary">Обсудить проект</a>
              <a href="/projects" className="cer-btn cer-btn--outline">Все проекты</a>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  )
}
