import React from 'react'
import Script from 'next/script'

export const metadata = {
  title: 'Авторская керамика ручной работы',
  description: 'Авторская керамика ручной работы',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/ceramic.css" />
      </head>
      <body className="cer-page">
        {/* эти div'ы оживляет ceramic.js (инлайн-стили) — гасим hydration-warning */}
        <div className="cer-scroll-progress" suppressHydrationWarning></div>
        <div className="cer-grain"></div>
        <div className="cer-cursor" suppressHydrationWarning></div>
        {children}
        {/* afterInteractive — ceramic.js стартует строго после гидратации */}
        <Script src="/js/ceramic.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
