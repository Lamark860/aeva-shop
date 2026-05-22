import React from 'react'

// Разметку оживляет ceramic.js по id #cer-lightbox (делегирование кликов по .cer-masonry img).
export default function Lightbox() {
  return (
    <div id="cer-lightbox" className="cer-lightbox">
      <button className="cer-lightbox__close">&times;</button>
      <button className="cer-lightbox__prev">&#8249;</button>
      {/* src проставляет ceramic.js при открытии */}
      <img alt="" />
      <button className="cer-lightbox__next">&#8250;</button>
    </div>
  )
}
