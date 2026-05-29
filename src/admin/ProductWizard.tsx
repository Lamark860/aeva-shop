'use client'
// 4-шаговый визард создания изделия для админки.
// Шаги: Фото → Название/Категория/Цена → Размеры/Материал → История + публикация.
// Регистрация: admin.components.views.productWizard = { path: '/products/wizard' }.
//
// REST API Payload:
//   POST /api/media (multipart) → создание загруженного фото
//   GET  /api/categories         → список категорий для select
//   POST /api/products           → создание изделия
// Авторизация — через cookies сессии admin (credentials: 'same-origin').
import React, { useEffect, useState } from 'react'

type WizardData = {
  mediaId: number | null
  mediaUrl: string | null
  name: string
  categoryId: number | null
  price: string  // string → парсим в number при отправке
  sizeHeight: string
  sizeDiameter: string
  sizeVolume: string
  material: string
  story: string
  publishNow: boolean
}

const INITIAL: WizardData = {
  mediaId: null, mediaUrl: null,
  name: '', categoryId: null, price: '',
  sizeHeight: '', sizeDiameter: '', sizeVolume: '',
  material: '', story: '', publishNow: true,
}

const STEPS = [
  { n: 1, label: 'Фото' },
  { n: 2, label: 'Название' },
  { n: 3, label: 'Размеры' },
  { n: 4, label: 'История' },
]

const COLOR = {
  bg: 'var(--cer-bg)',
  card: '#fff',
  text: 'var(--cer-text)',
  muted: 'var(--cer-text-muted)',
  light: 'var(--cer-text-light)',
  accent: 'var(--cer-accent)',
  border: 'var(--cer-border)',
  font: 'var(--cer-font-heading)',
  bgAlt: 'var(--cer-bg-alt)',
}

export default function ProductWizard() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<WizardData>(INITIAL)
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/categories?limit=100&sort=sort_order', { credentials: 'same-origin' })
      .then((r) => r.json())
      .then((j) => { if (!cancelled) setCategories((j?.docs ?? []).map((c: any) => ({ id: c.id, name: c.name }))) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  function upd<K extends keyof WizardData>(k: K, v: WizardData[K]) {
    setData((d) => ({ ...d, [k]: v }))
  }

  async function handleFile(file: File) {
    setUploading(true); setError(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const r = await fetch('/api/media', { method: 'POST', body: fd, credentials: 'same-origin' })
      const j = await r.json()
      if (!r.ok) throw new Error(j?.errors?.[0]?.message || 'Не удалось загрузить файл')
      const doc = j?.doc ?? j
      setData((d) => ({ ...d, mediaId: doc.id, mediaUrl: doc.url ?? null }))
      setStep(2)
    } catch (e: any) {
      setError(String(e?.message ?? e))
    } finally {
      setUploading(false)
    }
  }

  async function submit() {
    setSubmitting(true); setError(null)
    try {
      const body: any = {
        name: data.name.trim(),
        price: data.price ? Number(data.price) : 0,
        story: data.story || undefined,
        material: data.material || undefined,
        sizes: {
          height: data.sizeHeight || undefined,
          diameter: data.sizeDiameter || undefined,
          volume: data.sizeVolume || undefined,
        },
      }
      if (data.categoryId) body.category = data.categoryId
      if (data.mediaId) body.photos = [data.mediaId]
      if (!data.publishNow) body._status = 'draft'

      const r = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'same-origin',
      })
      const j = await r.json()
      if (!r.ok) throw new Error(j?.errors?.[0]?.message || 'Не удалось создать изделие')
      const id = j?.doc?.id ?? j?.id
      if (id) window.location.href = `/admin/collections/products/${id}`
      else window.location.href = '/admin/collections/products'
    } catch (e: any) {
      setError(String(e?.message ?? e))
      setSubmitting(false)
    }
  }

  function canNext(): boolean {
    if (step === 1) return !!data.mediaId
    if (step === 2) return data.name.trim().length > 0 && !!data.price
    return true
  }

  return (
    <div style={{ background: COLOR.bg, minHeight: '100%' }}>
      <Header step={step} onClose={() => { window.location.href = '/admin/collections/products' }} />

      <div className="cer-admin-wizard-pad">
        <div
          className={step === 1 ? undefined : 'cer-admin-wizard-grid cer-admin-wizard-grid--two'}
          style={{
            maxWidth: step === 1 ? 720 : 960,
            margin: '0 auto',
            alignItems: 'start',
          }}
        >
          {step !== 1 && (
            <PreviewPane url={data.mediaUrl} />
          )}

          <div>
            {error && (
              <div style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid #c0392b', color: '#c0392b', padding: '12px 16px', marginBottom: 24, fontSize: 14 }}>
                {error}
              </div>
            )}

            {step === 1 && (
              <StepPhoto onFile={handleFile} uploading={uploading} mediaUrl={data.mediaUrl} />
            )}
            {step === 2 && (
              <StepNaming data={data} upd={upd} categories={categories} />
            )}
            {step === 3 && (
              <StepSizes data={data} upd={upd} />
            )}
            {step === 4 && (
              <StepStory data={data} upd={upd} />
            )}

            {step !== 1 && (
              <Nav
                step={step}
                canNext={canNext()}
                isLast={step === 4}
                submitting={submitting}
                onBack={() => setStep((s) => s - 1)}
                onSkip={step < 4 ? () => setStep((s) => s + 1) : undefined}
                onNext={step < 4 ? () => setStep((s) => s + 1) : submit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Шапка с шагами -------------------------------------------------------
function Header({ step, onClose }: { step: number; onClose: () => void }) {
  return (
    <div style={{ background: COLOR.card, borderBottom: `1px solid ${COLOR.border}`, padding: '24px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLOR.light, marginBottom: 6 }}>
            Новое изделие · шаг {step} из 4
          </div>
          <h1 style={{ fontFamily: COLOR.font, fontSize: 28, fontWeight: 400, margin: 0, color: COLOR.text }}>
            Добавляем изделие
          </h1>
        </div>
        <button type="button" onClick={onClose} style={btnGhost}>Закрыть</button>
      </div>
      <Stepper current={step} />
    </div>
  )
}

function Stepper({ current }: { current: number }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {STEPS.map((s, i) => {
        const done = current > s.n
        const cur = current === s.n
        return (
          <React.Fragment key={s.n}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: done || cur ? COLOR.accent : 'transparent',
                  border: `1px solid ${done || cur ? COLOR.accent : COLOR.border}`,
                  color: done || cur ? '#fff' : COLOR.light,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontFamily: COLOR.font, fontWeight: 500,
                }}
              >
                {done ? '✓' : s.n}
              </div>
              <span style={{ fontSize: 13, color: cur ? COLOR.text : COLOR.light, fontWeight: cur ? 500 : 400, whiteSpace: 'nowrap' }}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 1, background: current > s.n ? COLOR.accent : COLOR.border, margin: '0 12px' }} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// --- Левая колонка с превью ----------------------------------------------
function PreviewPane({ url }: { url: string | null }) {
  return (
    <div>
      <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: COLOR.card, border: `1px solid ${COLOR.border}` }}>
        {url
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', background: COLOR.bgAlt }} />
        }
      </div>
      <div style={{ fontSize: 12, color: COLOR.light, textAlign: 'center', marginTop: 12 }}>
        Так будет выглядеть в каталоге →
      </div>
    </div>
  )
}

// --- Шаги -----------------------------------------------------------------
function StepPhoto({ onFile, uploading, mediaUrl }: { onFile: (f: File) => void; uploading: boolean; mediaUrl: string | null }) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  return (
    <>
      <h2 style={{ fontFamily: COLOR.font, fontSize: 32, fontWeight: 400, margin: '0 0 8px', color: COLOR.text }}>
        С чего начнём?
      </h2>
      <p style={{ fontSize: 15, color: COLOR.muted, margin: '0 0 32px' }}>
        Загрузите главную фотографию. Остальное добавим позже.
      </p>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const f = e.dataTransfer?.files?.[0]
          if (f) onFile(f)
        }}
        style={{
          border: `2px dashed ${COLOR.border}`,
          background: COLOR.card,
          padding: '80px 40px',
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        {mediaUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mediaUrl} alt="" style={{ maxWidth: 240, maxHeight: 240, objectFit: 'cover', marginBottom: 16 }} />
            <div style={{ fontSize: 13, color: COLOR.muted, marginBottom: 16 }}>Файл загружен. Можно идти дальше или заменить.</div>
            <button type="button" onClick={() => inputRef.current?.click()} style={btnGhost} disabled={uploading}>
              {uploading ? 'Загрузка…' : 'Заменить файл'}
            </button>
          </>
        ) : (
          <>
            <div style={{ fontFamily: COLOR.font, fontSize: 40, color: COLOR.accent, marginBottom: 16 }}>⤓</div>
            <div style={{ fontFamily: COLOR.font, fontSize: 22, marginBottom: 12, color: COLOR.text }}>
              {uploading ? 'Загружаем…' : 'Перетащите фотографию сюда'}
            </div>
            <div style={{ fontSize: 13, color: COLOR.muted, marginBottom: 24 }}>
              Или выберите с компьютера. Желательно квадратное фото, не меньше 1200×1200.
            </div>
            <button type="button" onClick={() => inputRef.current?.click()} style={btnGhost} disabled={uploading}>
              {uploading ? 'Загрузка…' : 'Выбрать файл'}
            </button>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onFile(f)
          }}
        />
      </div>
    </>
  )
}

function StepNaming({ data, upd, categories }: { data: WizardData; upd: any; categories: { id: number; name: string }[] }) {
  return (
    <>
      <h2 style={{ fontFamily: COLOR.font, fontSize: 32, fontWeight: 400, margin: '0 0 8px', color: COLOR.text }}>
        Расскажите коротко
      </h2>
      <p style={{ fontSize: 15, color: COLOR.muted, margin: '0 0 32px' }}>Три поля — больше пока не нужно.</p>
      <div style={{ display: 'grid', gap: 24 }}>
        <Field label="Как назвать изделие" hint="Имя в кавычках добавляет характер. Можно дать позже.">
          <Input value={data.name} placeholder="Например: Ваза «Поток»" onChange={(v) => upd('name', v)} />
        </Field>
        <Field label="К какой категории относится" hint="Если категории нет — создадите потом.">
          <Select
            value={data.categoryId ? String(data.categoryId) : ''}
            onChange={(v) => upd('categoryId', v ? Number(v) : null)}
            options={[{ value: '', label: '— выберите —' }, ...categories.map((c) => ({ value: String(c.id), label: c.name }))]}
          />
        </Field>
        <Field label="Цена-ориентир, ₽" hint="Можно изменить при разговоре с клиентом. На сайте отображается как «от 6 500 ₽».">
          <Input value={data.price} type="number" placeholder="6500" onChange={(v) => upd('price', v)} />
        </Field>
      </div>
    </>
  )
}

function StepSizes({ data, upd }: { data: WizardData; upd: any }) {
  return (
    <>
      <h2 style={{ fontFamily: COLOR.font, fontSize: 32, fontWeight: 400, margin: '0 0 8px', color: COLOR.text }}>
        Размеры и материал
      </h2>
      <p style={{ fontSize: 15, color: COLOR.muted, margin: '0 0 32px' }}>Можно пропустить и дополнить позже.</p>
      <div style={{ display: 'grid', gap: 24 }}>
        <div className="cer-admin-wizard-sizes">
          <Field label="Высота"><Input value={data.sizeHeight} placeholder="28 см" onChange={(v) => upd('sizeHeight', v)} /></Field>
          <Field label="Диаметр"><Input value={data.sizeDiameter} placeholder="14 см" onChange={(v) => upd('sizeDiameter', v)} /></Field>
          <Field label="Объём"><Input value={data.sizeVolume} placeholder="—" onChange={(v) => upd('sizeVolume', v)} /></Field>
        </div>
        <Field label="Материал" hint="Из чего сделано, какая глазурь. Видно на странице товара.">
          <Input value={data.material} placeholder="Шамот, кратерная глазурь" onChange={(v) => upd('material', v)} />
        </Field>
      </div>
    </>
  )
}

function StepStory({ data, upd }: { data: WizardData; upd: any }) {
  return (
    <>
      <h2 style={{ fontFamily: COLOR.font, fontSize: 32, fontWeight: 400, margin: '0 0 8px', color: COLOR.text }}>
        История изделия
      </h2>
      <p style={{ fontSize: 15, color: COLOR.muted, margin: '0 0 32px' }}>
        Самое главное в авторской вещи. Можно одно предложение, можно три.
      </p>
      <div style={{ display: 'grid', gap: 24 }}>
        <Field label="Что особенного в этой работе" hint="Расскажите, как родилась форма, почему именно такой характер. Клиенту это важнее размеров.">
          <Textarea value={data.story} rows={5} placeholder="Эта форма получилась случайно — стенка просела во время сушки, а горло встало под углом. Стало понятно, что это правильнее." onChange={(v) => upd('story', v)} />
        </Field>

        <div style={{ padding: '20px 24px', background: COLOR.bgAlt, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: COLOR.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flex: '0 0 20px', marginTop: 2 }}>✓</div>
          <div style={{ flex: 1, fontSize: 13, color: COLOR.muted, lineHeight: 1.6 }}>
            После сохранения изделие появится в каталоге. Если хотите подготовить и опубликовать позже — снимите галочку ниже.
          </div>
        </div>

        <Toggle label="Опубликовать сразу" value={data.publishNow} onChange={(v) => upd('publishNow', v)} />
      </div>
    </>
  )
}

// --- Навигация ------------------------------------------------------------
function Nav({ step, canNext, isLast, submitting, onBack, onSkip, onNext }: {
  step: number; canNext: boolean; isLast: boolean; submitting: boolean;
  onBack: () => void; onSkip?: () => void; onNext: () => void;
}) {
  return (
    <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${COLOR.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {step > 1 ? <button type="button" onClick={onBack} style={btnGhost}>← Назад</button> : <span />}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {onSkip && (
          <button type="button" onClick={onSkip} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLOR.light }}>
            Пропустить шаг
          </button>
        )}
        <button type="button" onClick={onNext} disabled={!canNext || submitting} style={{ ...btnPrimary, opacity: canNext && !submitting ? 1 : 0.5, cursor: canNext && !submitting ? 'pointer' : 'not-allowed' }}>
          {submitting ? 'Сохраняем…' : (isLast ? 'Сохранить и опубликовать' : 'Дальше →')}
        </button>
      </div>
    </div>
  )
}

// --- Примитивы ------------------------------------------------------------
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: COLOR.text, marginBottom: 10, fontWeight: 500 }}>
        {label}
      </label>
      {children}
      {hint && (
        <div style={{ fontSize: 12, color: COLOR.light, marginTop: 8, fontStyle: 'italic', lineHeight: 1.5 }}>
          {hint}
        </div>
      )}
    </div>
  )
}

function Input({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', padding: '14px 16px', border: `1px solid ${COLOR.border}`, background: COLOR.card, fontSize: 15, color: COLOR.text, fontFamily: 'inherit' }}
    />
  )
}

function Textarea({ value, onChange, placeholder, rows = 5 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', padding: '14px 16px', border: `1px solid ${COLOR.border}`, background: COLOR.card, fontSize: 15, color: COLOR.text, fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.7 }}
    />
  )
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', padding: '14px 16px', border: `1px solid ${COLOR.border}`, background: COLOR.card, fontSize: 15, color: COLOR.text, fontFamily: 'inherit' }}
    >
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 0' }}>
      <button
        type="button"
        onClick={() => onChange(!value)}
        style={{
          width: 40, height: 24, borderRadius: 12,
          background: value ? COLOR.accent : COLOR.border,
          border: 'none', position: 'relative', cursor: 'pointer', flex: '0 0 40px',
        }}
        aria-pressed={value}
      >
        <span
          style={{
            position: 'absolute', top: 3, left: value ? 19 : 3,
            width: 18, height: 18, borderRadius: '50%', background: '#fff',
            transition: 'left 150ms ease',
          }}
        />
      </button>
      <span style={{ fontSize: 14, color: COLOR.text }}>{label}</span>
    </div>
  )
}

const btnPrimary: React.CSSProperties = {
  padding: '12px 28px', background: COLOR.accent, color: '#fff', border: 'none', fontFamily: 'inherit',
  fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
}
const btnGhost: React.CSSProperties = {
  padding: '12px 24px', background: 'transparent', color: COLOR.text, border: `1px solid ${COLOR.border}`,
  fontFamily: 'inherit', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
}
