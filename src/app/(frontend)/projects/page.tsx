import React from 'react'
import Image from 'next/image'
import Shell from '@/components/Shell'
import { getProjects } from '@/lib/data'

// ISR: список проектов кэшируется и пересобирается по требованию
// (revalidatePath из хуков Projects) либо раз в час.
export const revalidate = 3600
export const metadata = {
  title: 'Проекты — Керамика',
  description: 'Реализованные проекты: посуда для ресторанов и кафе, частные заказы, авторские коллекции.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <Shell active="projects">
      <div className="cer-page-header">
        <div className="cer-container">
          <div className="cer-text-reveal"><span className="cer-section__subtitle">Проекты</span></div>
          <div className="cer-text-reveal"><h1>Работы со смыслом</h1></div>
          <p>Законченные истории — серии под интерьеры, посуда для ресторанов, авторские коллекции</p>
        </div>
      </div>

      <section className="cer-section cer-section--no-top">
        <div className="cer-container">
          {projects.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '60px 0', color: 'var(--cer-text-muted)' }}>
              Проекты скоро появятся
            </p>
          ) : (
            <div className="cer-projects">
              {projects.map((p, i) => (
                <a
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className={`cer-project-row cer-fade-in${i % 2 === 1 ? ' cer-project-row--reverse' : ''}`}
                >
                  <div className="cer-project-row__media">
                    {p.image && (
                      <Image
                        className="cer-project-row__img"
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <div className="cer-project-row__body">
                    <div className="cer-project-row__meta">
                      {p.year && <span>{p.year}</span>}
                      {p.year && <span>·</span>}
                      <span>{p.typeLabel}</span>
                    </div>
                    <h2 className="cer-project-row__title">{p.title}</h2>
                    {p.subtitle && <div className="cer-project-row__subtitle">{p.subtitle}</div>}
                    {p.description && <p className="cer-project-row__desc">{p.description}</p>}
                    <span className="cer-project-row__more">Смотреть проект →</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </Shell>
  )
}
