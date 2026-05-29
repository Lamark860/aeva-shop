import React from 'react'
import StickyNav from './StickyNav'

const links = [
  { href: '/catalog', label: 'Каталог', id: 'catalog' },
  { href: '/projects', label: 'Проекты', id: 'projects' },
  { href: '/gallery', label: 'Галерея', id: 'gallery' },
  { href: '/horeca', label: 'Ресторанам', id: 'horeca' },
  { href: '/order', label: 'На заказ', id: 'order' },
  { href: '/about', label: 'О мастере', id: 'about' },
]

// Колонки футера — «3 трека» из ТЗ.
const footerCols: { title: string; items: { href: string; label: string }[] }[] = [
  {
    title: 'Частным',
    items: [
      { href: '/catalog', label: 'Каталог' },
      { href: '/gallery', label: 'Галерея' },
      { href: '/order', label: 'Индивидуальный заказ' },
      { href: '/care', label: 'Уход' },
    ],
  },
  {
    title: 'Ресторанам',
    items: [
      { href: '/horeca', label: 'Услуги' },
      { href: '/projects', label: 'Кейсы' },
      { href: '/horeca#contact', label: 'Связаться' },
    ],
  },
  {
    title: 'Студия',
    items: [
      { href: '/about', label: 'О мастере' },
      { href: '/projects', label: 'Проекты' },
      { href: '/journal', label: 'Дневник' },
      { href: '/pages/delivery', label: 'Доставка' },
      { href: '/pages/contacts', label: 'Контакты' },
    ],
  },
]

export default function Shell({
  children, active = '', isHero = false,
}: { children: React.ReactNode; active?: string; isHero?: boolean }) {
  return (
    <>
      <StickyNav active={active} isHero={isHero} links={links} />

      {children}

      <footer className="cer-footer-v2">
        <div className="cer-footer-v2__inner">
          <div className="cer-footer-v2__cols">
            <div>
              <div className="cer-footer-v2__brand">Керамика</div>
              <p className="cer-footer-v2__tagline">
                Авторская керамика ручной работы. Штучные изделия и партии посуды для ресторанов.
              </p>
            </div>
            {footerCols.map((col) => (
              <div key={col.title}>
                <div className="cer-footer-v2__col-title">{col.title}</div>
                <ul className="cer-footer-v2__list">
                  {col.items.map((it) => (
                    <li key={it.href + it.label}>
                      <a href={it.href}>{it.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="cer-footer-v2__copy">
            <div>© {new Date().getFullYear()} Керамика · Все изделия выполнены вручную</div>
            <div className="cer-footer-v2__socials">
              <a href="https://www.instagram.com/aeva.alina" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://t.me/aeva_alina" target="_blank" rel="noopener noreferrer">Telegram</a>
              <a href="https://wa.me/79033642827" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
