// Кастомный list view для коллекций заявок (orders, horeca-inquiries).
// Карточки вместо таблицы, цветные статусы, чипы-фильтры по статусу,
// для horeca-inquiries — бейдж «HoReCa».
// Server component, props из AdminViewServerProps. Регистрация: views.list.Component в коллекции.
import React from 'react'
import Link from 'next/link'
import type { ServerProps, SanitizedCollectionConfig } from 'payload'

type ListViewProps = ServerProps & {
  collectionConfig?: SanitizedCollectionConfig
}

const ORDER_TYPE_LABELS: Record<string, string> = {
  vase: 'Ваза', bowl: 'Чаша', plate: 'Тарелка / Блюдо', mug: 'Кружка',
  set: 'Набор', decor: 'Декор', other: 'Другое',
}
const PURPOSE_LABELS: Record<string, string> = {
  self: 'Для себя', gift: 'Подарок', interior: 'Интерьер', unsure: 'Не уверен(а)',
}
const BUDGET_LABELS: Record<string, string> = {
  lt3k: 'до 3 000 ₽', '3k_7k': '3 000 – 7 000 ₽', '7k_15k': '7 000 – 15 000 ₽',
  gt15k: '15 000+ ₽', unknown: 'Не знаю',
}
const HORECA_BATCH_LABELS: Record<string, string> = {
  lt50: 'до 50 шт', '50_150': '50–150 шт', '150_300': '150–300 шт',
  gt300: '300+ шт', unknown: 'Не знает',
}
const HORECA_TIMELINE_LABELS: Record<string, string> = {
  flexible: 'не срочно', quarter: 'в квартал', opening: 'к открытию', discuss: 'обсудим',
}
const STATUS_LABELS: Record<string, string> = {
  new: 'Новая', 'in-progress': 'В работе', done: 'Готово',
}

const COLOR = {
  bg: 'var(--cer-bg)',
  card: '#fff',
  text: 'var(--cer-text)',
  muted: 'var(--cer-text-muted)',
  light: 'var(--cer-text-light)',
  accent: 'var(--cer-accent)',
  border: 'var(--cer-border)',
  font: 'var(--cer-font-heading)',
}

const STATUS_STYLE: Record<string, { bg: string; color: string; stripe: string }> = {
  new:           { bg: 'rgba(183,121,90,0.12)', color: 'var(--cer-accent)', stripe: 'var(--cer-accent)' },
  'in-progress': { bg: 'rgba(212,165,116,0.15)', color: '#A06845',            stripe: '#D4A574' },
  done:          { bg: 'rgba(43,43,43,0.06)',   color: 'var(--cer-text-muted)', stripe: 'var(--cer-border)' },
}

function timeAgo(iso?: string): string {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  if (m < 1) return 'только что'
  if (m < 60) return `${m} мин назад`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} ч назад`
  const d = Math.floor(h / 24)
  if (d === 1) return 'вчера'
  if (d < 7) return `${d} дн назад`
  return new Date(iso).toLocaleDateString('ru-RU')
}

export default async function OrdersListView({ collectionConfig, payload, searchParams }: ListViewProps) {
  if (!collectionConfig) return <div style={{ padding: 40 }}>Коллекция не найдена.</div>
  const slug = collectionConfig.slug
  const isHoreca = slug === 'horeca-inquiries'

  const statusFilter = typeof searchParams?.status === 'string' ? searchParams.status : ''
  const where = statusFilter ? { status: { equals: statusFilter } } : undefined

  const [docs, allCount, newCount, inProgressCount, doneCount] = await Promise.all([
    payload.find({ collection: slug as any, where, sort: '-createdAt', limit: 50, depth: 0 }),
    payload.count({ collection: slug as any }),
    payload.count({ collection: slug as any, where: { status: { equals: 'new' } } }),
    payload.count({ collection: slug as any, where: { status: { equals: 'in-progress' } } }),
    payload.count({ collection: slug as any, where: { status: { equals: 'done' } } }),
  ])

  const basePath = `/admin/collections/${slug}`
  const chips: { key: string; label: string; count: number; active: boolean }[] = [
    { key: '',            label: 'Все',      count: allCount.totalDocs,        active: statusFilter === '' },
    { key: 'new',         label: 'Новые',    count: newCount.totalDocs,        active: statusFilter === 'new' },
    { key: 'in-progress', label: 'В работе', count: inProgressCount.totalDocs, active: statusFilter === 'in-progress' },
    { key: 'done',        label: 'Готовы',   count: doneCount.totalDocs,       active: statusFilter === 'done' },
  ]

  return (
    <div className="cer-admin-pad-list" style={{ background: COLOR.bg, minHeight: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
        <h1 style={{ fontFamily: COLOR.font, fontSize: 28, fontWeight: 400, margin: 0, color: COLOR.text }}>
          {isHoreca ? 'HoReCa-заявки' : 'Заявки'}
        </h1>
      </div>

      {/* Чипы-фильтры */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        {chips.map((c) => (
          <Link
            key={c.key || 'all'}
            href={c.key ? `${basePath}?status=${c.key}` : basePath}
            style={{
              padding: '8px 14px',
              border: `1px solid ${COLOR.border}`,
              background: c.active ? COLOR.accent : COLOR.card,
              color: c.active ? '#fff' : COLOR.text,
              fontSize: 13,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {c.label}
            <span style={{ opacity: 0.7, fontSize: 11 }}>{c.count}</span>
          </Link>
        ))}
      </div>

      {/* Список карточек */}
      {docs.docs.length === 0 ? (
        <div style={{ background: COLOR.card, border: `1px solid ${COLOR.border}`, padding: '48px 24px', textAlign: 'center', color: COLOR.muted }}>
          Заявок не найдено.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {docs.docs.map((d: any) => (
            <OrderCard key={d.id} doc={d} basePath={basePath} isHoreca={isHoreca} />
          ))}
        </div>
      )}
    </div>
  )
}

function OrderCard({ doc, basePath, isHoreca }: { doc: any; basePath: string; isHoreca: boolean }) {
  const status: string = doc.status || 'new'
  const stripe = STATUS_STYLE[status]?.stripe ?? COLOR.border

  // Заголовок и подзаголовок зависят от коллекции
  const who = isHoreca
    ? `${doc.venueName || 'Заведение'}${doc.name ? ' · ' + doc.name : ''}`
    : doc.name || '—'

  // Метатеги (3-4 коротких поля)
  const meta: string[] = []
  if (isHoreca) {
    if (doc.city) meta.push(doc.city)
    if (doc.batchSize) meta.push(HORECA_BATCH_LABELS[doc.batchSize] ?? doc.batchSize)
    if (doc.timeline) meta.push(HORECA_TIMELINE_LABELS[doc.timeline] ?? doc.timeline)
  } else {
    if (doc.type) meta.push(ORDER_TYPE_LABELS[doc.type] ?? doc.type)
    if (doc.purpose) meta.push(PURPOSE_LABELS[doc.purpose] ?? doc.purpose)
    if (doc.budget) meta.push(BUDGET_LABELS[doc.budget] ?? doc.budget)
  }

  const message = isHoreca ? (doc.conceptDescription || '') : (doc.message || '')

  return (
    <Link
      href={`${basePath}/${doc.id}`}
      className="cer-admin-order-card"
      style={{
        background: COLOR.card,
        border: `1px solid ${COLOR.border}`,
        borderLeft: `3px solid ${stripe}`,
        padding: '20px 24px',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div>
        <div style={{ fontFamily: COLOR.font, fontSize: 17, marginBottom: 4, color: COLOR.text }}>
          {who}
          {isHoreca && (
            <span
              style={{
                marginLeft: 8,
                padding: '2px 8px',
                background: COLOR.text,
                color: '#fff',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 500,
                verticalAlign: 'middle',
              }}
            >
              HoReCa
            </span>
          )}
        </div>
        <div style={{ fontSize: 13, color: COLOR.light }}>{doc.email || '—'}</div>
      </div>
      <div>
        {meta.length > 0 && (
          <div style={{ display: 'flex', gap: 12, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLOR.accent, marginBottom: 6, flexWrap: 'wrap' }}>
            {meta.map((m, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ color: COLOR.light }}>·</span>}
                <span style={i === 0 ? undefined : { color: COLOR.light }}>{m}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        <div style={{ fontSize: 14, color: COLOR.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {message || '—'}
        </div>
      </div>
      <div style={{ fontSize: 12, color: COLOR.light, whiteSpace: 'nowrap' }}>{timeAgo(doc.createdAt)}</div>
      <StatusPill status={status} />
    </Link>
  )
}

function StatusPill({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? STATUS_STYLE.new
  return (
    <span
      style={{
        padding: '6px 14px',
        background: s.bg,
        color: s.color,
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}
