import React from 'react'

const links = [
  { href: '/', label: 'Главная', id: 'home' },
  { href: '/catalog', label: 'Каталог', id: 'catalog' },
  { href: '/gallery', label: 'Галерея', id: 'gallery' },
  { href: '/order', label: 'На заказ', id: 'order' },
]

export default function Shell({
  children, active = '', isHero = false,
}: { children: React.ReactNode; active?: string; isHero?: boolean }) {
  const navClass = 'cer-nav' + (isHero ? '' : ' cer-nav--inner')
  return (
    <>
      <nav className={navClass}>
        <div className="cer-nav__inner">
          <a href="/" className="cer-nav__brand">Керамика</a>
          <button className="cer-nav__toggle" aria-label="Меню"><span></span><span></span><span></span></button>
          <ul className="cer-nav__links">
            {links.map((l) => (
              <li key={l.id}>
                <a href={l.href} className={`cer-nav__link ${active === l.id ? 'cer-nav__link--active' : ''}`}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {children}

      <footer className="cer-footer">
        <div className="cer-container">
          <div className="cer-footer__inner">
            <div>
              <div className="cer-footer__brand">Керамика</div>
              <p>Авторская керамика<br />ручной работы</p>
            </div>
            <div>
              <div className="cer-footer__heading">Навигация</div>
              <ul className="cer-footer__links">
                <li><a href="/">Главная</a></li>
                <li><a href="/catalog">Каталог</a></li>
                <li><a href="/gallery">Галерея</a></li>
                <li><a href="/order">Индивидуальный заказ</a></li>
              </ul>
            </div>
            <div>
              <div className="cer-footer__heading">Контакты</div>
              <ul className="cer-footer__links">
                <li>hello@ceramic-studio.ru</li>
                <li>+7 (999) 123-45-67</li>
              </ul>
              <div className="cer-footer__socials">
                <a href="#">Instagram</a><a href="#">Telegram</a><a href="#">VK</a>
              </div>
            </div>
          </div>
          <div className="cer-footer__copy">&copy; {new Date().getFullYear()} Керамика. Все изделия выполнены вручную.</div>
        </div>
      </footer>
    </>
  )
}
