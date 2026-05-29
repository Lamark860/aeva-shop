import React from 'react'

// Разметку оживляет ceramic.js по id #cer-lightbox (делегирование кликов по .cer-masonry img).
export default function Lightbox() {
  return (
    <div id="cer-lightbox" className="cer-lightbox">
      <button className="cer-lightbox__close">&times;</button>
      <button className="cer-lightbox__prev">&#8249;</button>
      {/* src проставляет ceramic.js при открытии — native <img>, не next/image */}
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img alt="" />
      <button className="cer-lightbox__next">&#8250;</button>
    </div>
  )
}
