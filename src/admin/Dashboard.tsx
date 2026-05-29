// Кастомный дашборд админки — заменяет дефолтный list-of-collections.
// Server component: получает payload из initPageResult.req, делает агрегаты
// и отдаёт серверный HTML с inline-стилями (токены — из admin.css).
import React from 'react'
import Link from 'next/link'
import type { AdminViewServerProps } from 'payload'
import RevalidateButton from './RevalidateButton'

// --- утилиты форматирования ---
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
  const w = Math.floor(d / 7)
  if (w < 5) return `${w} нед назад`
  return new Date(iso).toLocaleDateString('ru-RU')
}

function greet(): string {
  const hr = new Date().getHours()
  if (hr < 5) return 'Доброй ночи'
  if (hr < 12) return 'Доброе утро'
  if (hr < 18) return 'Добрый день'
  return 'Добрый вечер'
}

// --- цвета токенов ---
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

export default async function Dashboard({ initPageResult }: AdminViewServerProps) {
  const { req } = initPageResult
  const { payload, user } = req

  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const [newOrders24h, newHoreca24h, productsCount, ordersCount, horecaCount, subscribersCount, lastOrders, lastHoreca, lastProducts] = await Promise.all([
    payload.count({ collection: 'orders', where: { and: [{ status: { equals: 'new' } }, { createdAt: { greater_than: since24h } }] } }),
    payload.count({ collection: 'horeca-inquiries', where: { and: [{ status: { equals: 'new' } }, { createdAt: { greater_than: since24h } }] } }),
    payload.count({ collection: 'products' }),
    payload.count({ collection: 'orders' }),
    payload.count({ collection: 'horeca-inquiries' }),
    payload.count({ collection: 'subscribers' }),
    payload.find({ collection: 'orders', sort: '-createdAt', limit: 5, depth: 0 }),
    payload.find({ collection: 'horeca-inquiries', sort: '-createdAt', limit: 5, depth: 0 }),
    payload.find({ collection: 'products', sort: '-createdAt', limit: 4, depth: 1 }),
  ])

  // merged recent — Orders + HoReCa, sorted by createdAt
  type Inbox = { id: number; who: string; msg: string; when: string; status: string; href: string; kind: 'order' | 'horeca' }
  const inbox: Inbox[] = [
    ...lastOrders.docs.map((d: any): Inbox => ({
      id: d.id,
      who: d.name || '—',
      msg: d.message || d.short_description || '',
      when: d.createdAt,
      status: d.status || 'new',
      href: `/admin/collections/orders/${d.id}`,
      kind: 'order',
    })),
    ...lastHoreca.docs.map((d: any): Inbox => ({
      id: d.id,
      who: `${d.venueName || 'Заведение'} · ${d.name || ''}`.trim(),
      msg: d.conceptDescription || '',
      when: d.createdAt,
      status: d.status || 'new',
      href: `/admin/collections/horeca-inquiries/${d.id}`,
      kind: 'horeca',
    })),
  ].sort((a, b) => +new Date(b.when) - +new Date(a.when)).slice(0, 5)

  const totalNew24h = (newOrders24h?.totalDocs ?? 0) + (newHoreca24h?.totalDocs ?? 0)
  const ordersBreakdown = `${ordersCount?.totalDocs ?? 0} — индивидуально, ${horecaCount?.totalDocs ?? 0} — рестораны`

  // имя для приветствия — email до @, если нет ничего другого
  const name = (user as any)?.email?.split('@')[0] ?? 'мастер'

  return (
    <div className="cer-admin-pad" style={{ background: COLOR.bg, minHeight: '100%' }}>
      <div className="cer-admin-dash-header">
        <h1 style={{ fontFamily: COLOR.font, fontSize: 32, fontWeight: 400, margin: 0, color: COLOR.text }}>
          {greet()}, {name}.
        </h1>
        <div className="cer-admin-dash-header__actions">
          <RevalidateButton />
          <Link
            href="/admin/products/wizard"
            style={{ padding: '12px 24px', background: COLOR.accent, color: '#fff', textDecoration: 'none', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-block' }}
          >
            + Добавить изделие
          </Link>
        </div>
      </div>

      {/* Срочная полоса */}
      {totalNew24h > 0 ? (
        <div
          className="cer-admin-urgent"
          style={{ background: COLOR.text, color: '#fff' }}
        >
          <div
            style={{
              width: 48, height: 48, borderRadius: '50%',
              background: COLOR.accent, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: COLOR.font, fontSize: 20, flex: '0 0 48px',
            }}
          >
            {totalNew24h}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: COLOR.font, fontSize: 22, marginBottom: 4 }}>
              Новые заявки за последние сутки
            </div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
              {newOrders24h?.totalDocs ?? 0} индивидуальн{(newOrders24h?.totalDocs ?? 0) === 1 ? 'ый заказ' : 'ых заказа'},{' '}
              {newHoreca24h?.totalDocs ?? 0} от ресторан{(newHoreca24h?.totalDocs ?? 0) === 1 ? 'а' : 'ов'}
            </div>
          </div>
          <Link
            href="/admin/collections/orders"
            style={{ background: '#fff', color: COLOR.text, padding: '12px 24px', textDecoration: 'none', fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase' }}
          >
            Открыть заявки →
          </Link>
        </div>
      ) : (
        <div style={{ background: COLOR.card, border: `1px solid ${COLOR.border}`, padding: '24px 32px', marginBottom: 32, color: COLOR.muted, fontSize: 14 }}>
          За последние сутки новых заявок не было — спокойный день.
        </div>
      )}

      {/* Дайджест-карточки */}
      <div className="cer-admin-digest">
        <DigestCard label="Изделий в каталоге" value={String(productsCount?.totalDocs ?? 0)} delta="—" />
        <DigestCard label="Заявок всего" value={String((ordersCount?.totalDocs ?? 0) + (horecaCount?.totalDocs ?? 0))} delta={ordersBreakdown} />
        <DigestCard label="Подписаны на дневник" value={String(subscribersCount?.totalDocs ?? 0)} delta="—" />
      </div>

      {/* Две колонки */}
      <div className="cer-admin-two-panel">
        <Panel
          title="Последние заявки"
          actionHref="/admin/collections/orders"
          actionText="Все заявки →"
        >
          {inbox.length === 0 && <EmptyState text="Пока тихо — заявок ещё нет." />}
          {inbox.map((it, i) => (
            <Link
              key={`${it.kind}-${it.id}`}
              href={it.href}
              style={{
                padding: '16px 24px',
                borderBottom: i < inbox.length - 1 ? `1px solid ${COLOR.border}` : 'none',
                display: 'grid',
                gridTemplateColumns: '6px 1fr auto',
                gap: 16,
                alignItems: 'start',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <span
                style={{
                  width: 6, height: 6, marginTop: 6, borderRadius: '50%',
                  background: it.status === 'new' ? COLOR.accent : COLOR.border,
                }}
              />
              <div>
                <div style={{ fontSize: 14, color: COLOR.text, marginBottom: 4, fontWeight: 500 }}>
                  {it.who}
                  {it.kind === 'horeca' && (
                    <span style={{
                      display: 'inline-block', marginLeft: 8,
                      fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                      background: 'rgba(183,121,90,0.12)', color: COLOR.accent,
                      padding: '2px 6px', borderRadius: 2, fontWeight: 600,
                    }}>HoReCa</span>
                  )}
                </div>
                <div style={{ fontSize: 13, color: COLOR.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {it.msg || '—'}
                </div>
              </div>
              <div style={{ fontSize: 12, color: COLOR.light, whiteSpace: 'nowrap' }}>{timeAgo(it.when)}</div>
            </Link>
          ))}
        </Panel>

        <Panel
          title="Последние изделия"
          actionHref="/admin/collections/products"
          actionText="Все изделия →"
        >
          {lastProducts.docs.length === 0 && <EmptyState text="Каталог пуст — добавьте первое изделие." />}
          <div className="cer-admin-products-grid">
            {lastProducts.docs.map((p: any) => {
              const photo = Array.isArray(p.photos) && p.photos[0]?.url
                ? p.photos[0].url
                : Array.isArray(p.images) && p.images[0]?.url
                  ? p.images[0].url
                  : null
              return (
                <Link
                  key={p.id}
                  href={`/admin/collections/products/${p.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden', marginBottom: 8, background: 'var(--cer-bg-alt)' }}>
                    {photo
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={photo} alt={p.name ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      : <div style={{ width: '100%', height: '100%' }} />
                    }
                  </div>
                  <div style={{ fontFamily: COLOR.font, fontSize: 14, color: COLOR.text }}>{p.name}</div>
                </Link>
              )
            })}
          </div>
        </Panel>
      </div>
    </div>
  )
}

function DigestCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div style={{ background: COLOR.card, border: `1px solid ${COLOR.border}`, padding: '24px 28px' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLOR.muted, marginBottom: 12 }}>
        {label}
      </div>
      <div style={{ fontFamily: COLOR.font, fontSize: 44, color: COLOR.text, lineHeight: 1, marginBottom: 8 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: COLOR.muted }}>{delta}</div>
    </div>
  )
}

function Panel({ title, actionHref, actionText, children }: { title: string; actionHref: string; actionText: string; children: React.ReactNode }) {
  return (
    <div style={{ background: COLOR.card, border: `1px solid ${COLOR.border}` }}>
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${COLOR.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontFamily: COLOR.font, fontSize: 20, fontWeight: 400, margin: 0, color: COLOR.text }}>{title}</h3>
        <Link
          href={actionHref}
          style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLOR.accent, textDecoration: 'none' }}
        >
          {actionText}
        </Link>
      </div>
      <div>{children}</div>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return <div style={{ padding: '40px 24px', textAlign: 'center', color: COLOR.muted, fontSize: 14 }}>{text}</div>
}
