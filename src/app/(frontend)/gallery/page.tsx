import React from 'react'
import Shell from '@/components/Shell'
import Lightbox from '@/components/Lightbox'
import { getGallery } from '@/lib/data'

// ISR: фон-ребилд + мгновенный сброс через revalidatePath из хуков Gallery
export const revalidate = 3600
export const metadata = { title: 'Галерея — Керамика' }

export default async function GalleryPage() {
  const items = await getGallery()
  return (
    <Shell active="gallery">
      <div className="cer-page-header">
        <div className="cer-container">
          <div className="cer-text-reveal"><span className="cer-section__subtitle">Галерея</span></div>
          <div className="cer-text-reveal"><h1>Из мастерской</h1></div>
          <p>Процесс создания, детали изделий, атмосфера</p>
        </div>
      </div>

      <section className="cer-section cer-section--no-top">
        <div className="cer-container">
          <div className="cer-masonry cer-fade-in">
            {items.map((item) => (
              <div className="cer-masonry__item" key={item.title}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="cer-masonry__caption">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox />
    </Shell>
  )
}
