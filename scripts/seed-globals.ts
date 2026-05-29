// Префиллит Globals дефолтными текстами из data.ts. Запускается разово.
// До этого Алина видела пустые поля в админке, хотя на сайте уже были тексты
// (фронт подменял пустоту дефолтами). Теперь админка показывает то же что сайт.
//
// Идемпотентно: если поле уже заполнено (отличается от дефолта) — НЕ перезаписывает.
// upload-поля (portraitPhoto, materialPhoto, heroBgPhoto, triptych) не трогаем —
// Алина прикрепит сама из медиатеки.
import { getPayload } from 'payload'
import config from '@payload-config'
import { CARE_DEFAULTS, ABOUT_DEFAULTS, HORECA_DEFAULTS } from '@/lib/data'

const payload = await getPayload({ config })

// --- Care ---
const careCurrent: any = await payload.findGlobal({ slug: 'care-page', depth: 0 })
const careData: any = {
  subtitle: careCurrent?.subtitle || CARE_DEFAULTS.subtitle,
  title: careCurrent?.title || CARE_DEFAULTS.title,
  lead: careCurrent?.lead || CARE_DEFAULTS.lead,
  items: Array.isArray(careCurrent?.items) && careCurrent.items.length
    ? careCurrent.items
    : CARE_DEFAULTS.items.map(it => ({ heading: it.heading, text: it.text })),
  footer: {
    text: careCurrent?.footer?.text || CARE_DEFAULTS.footer.text,
    linkText: careCurrent?.footer?.linkText || CARE_DEFAULTS.footer.linkText,
    linkHref: careCurrent?.footer?.linkHref || CARE_DEFAULTS.footer.linkHref,
  },
}
await payload.updateGlobal({ slug: 'care-page', data: careData })
console.log('✓ care-page залит')

// --- About ---
const aboutCurrent: any = await payload.findGlobal({ slug: 'about-page', depth: 0 })
const aboutData: any = {
  // portraitPhoto/materialPhoto/triptych — оставляем как есть (uploads)
  quoteText: aboutCurrent?.quoteText || ABOUT_DEFAULTS.quote.text,
  quoteAuthor: aboutCurrent?.quoteAuthor || ABOUT_DEFAULTS.quote.author,
  materialSubtitle: aboutCurrent?.materialSubtitle || ABOUT_DEFAULTS.material.subtitle,
  materialHeading: aboutCurrent?.materialHeading || ABOUT_DEFAULTS.material.heading,
  materialParagraphs: Array.isArray(aboutCurrent?.materialParagraphs) && aboutCurrent.materialParagraphs.length
    ? aboutCurrent.materialParagraphs
    : ABOUT_DEFAULTS.material.paragraphs.map(text => ({ text })),
  typesSubtitle: aboutCurrent?.typesSubtitle || ABOUT_DEFAULTS.types.subtitle,
  typesHeading: aboutCurrent?.typesHeading || ABOUT_DEFAULTS.types.heading,
  types: Array.isArray(aboutCurrent?.types) && aboutCurrent.types.length
    ? aboutCurrent.types
    : ABOUT_DEFAULTS.types.items.map(it => ({ heading: it.heading, text: it.text, ctaText: it.ctaText, ctaLink: it.ctaLink })),
  ctaSubtitle: aboutCurrent?.ctaSubtitle || ABOUT_DEFAULTS.cta.subtitle,
  ctaHeadingLine1: aboutCurrent?.ctaHeadingLine1 || ABOUT_DEFAULTS.cta.headingLine1,
  ctaHeadingLine2: aboutCurrent?.ctaHeadingLine2 || ABOUT_DEFAULTS.cta.headingLine2,
  ctaBtnText: aboutCurrent?.ctaBtnText || ABOUT_DEFAULTS.cta.btnText,
  ctaBtnLink: aboutCurrent?.ctaBtnLink || ABOUT_DEFAULTS.cta.btnLink,
}
await payload.updateGlobal({ slug: 'about-page', data: aboutData })
console.log('✓ about-page залит')

// --- Horeca ---
const horecaCurrent: any = await payload.findGlobal({ slug: 'horeca-page', depth: 0 })
const horecaData: any = {
  // heroBgPhoto оставляем — Алина прикрепит. heroBgUrl как fallback URL по умолчанию.
  heroBgUrl: horecaCurrent?.heroBgUrl || HORECA_DEFAULTS.hero.bg,
  heroMeta: horecaCurrent?.heroMeta || HORECA_DEFAULTS.hero.meta,
  heroTitle: horecaCurrent?.heroTitle || HORECA_DEFAULTS.hero.title,
  heroLead: horecaCurrent?.heroLead || HORECA_DEFAULTS.hero.lead,
  heroBtnText: horecaCurrent?.heroBtnText || HORECA_DEFAULTS.hero.btnText,
  metrics: Array.isArray(horecaCurrent?.metrics) && horecaCurrent.metrics.length
    ? horecaCurrent.metrics
    : HORECA_DEFAULTS.metrics.map(m => ({ value: m.value, label: m.label })),
  casesSubtitle: horecaCurrent?.casesSubtitle || HORECA_DEFAULTS.cases.subtitle,
  casesHeading: horecaCurrent?.casesHeading || HORECA_DEFAULTS.cases.heading,
  processSubtitle: horecaCurrent?.processSubtitle || HORECA_DEFAULTS.process.subtitle,
  processHeading: horecaCurrent?.processHeading || HORECA_DEFAULTS.process.heading,
  steps: Array.isArray(horecaCurrent?.steps) && horecaCurrent.steps.length
    ? horecaCurrent.steps
    : HORECA_DEFAULTS.process.steps.map(s => ({ heading: s.heading, text: s.text })),
  formSubtitle: horecaCurrent?.formSubtitle || HORECA_DEFAULTS.form.subtitle,
  formHeading: horecaCurrent?.formHeading || HORECA_DEFAULTS.form.heading,
  formLead: horecaCurrent?.formLead || HORECA_DEFAULTS.form.lead,
  formBtnText: horecaCurrent?.formBtnText || HORECA_DEFAULTS.form.btnText,
}
await payload.updateGlobal({ slug: 'horeca-page', data: horecaData })
console.log('✓ horeca-page залит')

console.log('\n✅ Globals префиллены. Заходите в админку — поля теперь видны.')
process.exit(0)
