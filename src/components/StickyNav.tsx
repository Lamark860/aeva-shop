'use client'
import React, { useEffect, useState } from 'react'

// Навбар с двумя визуальными состояниями:
//  - isHero && !scrolled → прозрачный, белый текст (поверх тёмного hero)
//  - иначе               → cream + blur, тёмный текст
// scrollY > 80 — порог переключения. Подписываемся пассивно.
type Link = { href: string; label: string; id: string }

export default function StickyNav({
  active = '',
  isHero = false,
  links,
}: {
  active?: string
  isHero?: boolean
  links: Link[]
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Три состояния:
  //  - hero + не скроллено → '' (дефолтные .cer-nav стили: белый текст поверх hero)
  //  - hero + скроллено    → 'cer-nav--scrolled' (cream + blur + тёмный)
  //  - не hero             → 'cer-nav--scrolled' (то же — сразу cream + тёмный)
  // .cer-nav--transparent в CSS не существует, не используем.
  const showBg = !isHero || scrolled
  const navClass = ['cer-nav', showBg ? 'cer-nav--scrolled' : ''].filter(Boolean).join(' ')

  return (
    <nav className={navClass}>
      <div className="cer-nav__inner">
        <a href="/" className="cer-nav__brand">Керамика</a>
        <button className="cer-nav__toggle" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
        <ul className="cer-nav__links">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                className={`cer-nav__link ${active === l.id ? 'cer-nav__link--active' : ''}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
