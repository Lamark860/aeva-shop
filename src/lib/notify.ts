// Уведомления о новой заявке: Telegram + email (SMTP).
// Оба канала включаются наличием env-переменных. Если не настроены —
// тихо логируем и пропускаем (dev / до подстановки кредов). Ошибки канала
// НИКОГДА не пробрасываются наружу — заявка важнее уведомления.
import nodemailer, { type Transporter } from 'nodemailer'

export interface OrderNotice {
  name: string
  email: string
  phone?: string
  message: string
  product?: string // имя изделия (если заявка по конкретному товару)
}

export interface HorecaNotice {
  venueName: string
  city?: string
  name: string
  email: string
  phone?: string
  position?: string
  projectType?: string
  batchSize?: string
  timeline?: string
  conceptDescription?: string
}

// Подписи enum'ов HoReCa для читаемых уведомлений (значения хранятся кодами).
const HORECA_LABELS: Record<string, Record<string, string>> = {
  projectType: { new: 'Новое заведение, открытие', update: 'Обновление концепции', expand: 'Расширение набора', scouting: 'Пока разведка' },
  batchSize: { lt50: 'до 50 единиц', '50_150': '50–150', '150_300': '150–300', gt300: '300+', unknown: 'Пока не знаю' },
  timeline: { flexible: 'не срочно', quarter: 'в течение квартала', opening: 'к открытию', discuss: 'обсудим' },
}
const label = (group: string, value?: string) => (value ? HORECA_LABELS[group]?.[value] ?? value : undefined)

// --- Telegram --------------------------------------------------------------
async function notifyTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    console.info('[notify] Telegram не настроен (нет TELEGRAM_BOT_TOKEN/CHAT_ID) — пропуск')
    return
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    })
    if (!res.ok) console.error('[notify] Telegram вернул', res.status, await res.text().catch(() => ''))
  } catch (e) {
    console.error('[notify] Telegram исключение:', e)
  }
}

// --- Email (SMTP) ----------------------------------------------------------
let transporter: Transporter | null | undefined // undefined = ещё не инициализирован
function getTransport(): Transporter | null {
  if (transporter !== undefined) return transporter
  const host = process.env.SMTP_HOST
  if (!host) return (transporter = null)
  const port = Number(process.env.SMTP_PORT ?? 587)
  const user = process.env.SMTP_USER
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit TLS, иначе STARTTLS
    auth: user ? { user, pass: process.env.SMTP_PASS } : undefined,
  })
  return transporter
}

async function notifyEmail(subject: string, text: string): Promise<void> {
  const t = getTransport()
  const to = process.env.ORDER_EMAIL_TO
  if (!t || !to) {
    console.info('[notify] Email не настроен (нет SMTP_HOST/ORDER_EMAIL_TO) — пропуск')
    return
  }
  try {
    await t.sendMail({
      from: process.env.SMTP_FROM || `Керамика <no-reply@${process.env.DOMAIN || 'localhost'}>`,
      to,
      subject,
      text,
    })
  } catch (e) {
    console.error('[notify] Email исключение:', e)
  }
}

// --- Публичный API ---------------------------------------------------------
export async function notifyNewOrder(o: OrderNotice): Promise<void> {
  const rows = [
    `Имя: ${o.name}`,
    `Email: ${o.email}`,
    o.phone ? `Телефон: ${o.phone}` : null,
    o.product ? `Изделие: ${o.product}` : null,
    '',
    o.message,
  ].filter((r): r is string => r !== null)

  const tgText = `🏺 <b>Новая заявка</b>\n\n${rows.join('\n')}`
  const mailText = `Новая заявка с сайта\n\n${rows.join('\n')}`

  // оба канала параллельно; allSettled — падение одного не валит другой
  await Promise.allSettled([
    notifyTelegram(tgText),
    notifyEmail('Новая заявка с сайта', mailText),
  ])
}

export async function notifyNewHoreca(o: HorecaNotice): Promise<void> {
  const rows = [
    `Заведение: ${o.venueName}`,
    o.city ? `Город: ${o.city}` : null,
    `Контакт: ${o.name}${o.position ? ` (${o.position})` : ''}`,
    `Email: ${o.email}`,
    o.phone ? `Телефон/Telegram: ${o.phone}` : null,
    label('projectType', o.projectType) ? `Тип проекта: ${label('projectType', o.projectType)}` : null,
    label('batchSize', o.batchSize) ? `Партия: ${label('batchSize', o.batchSize)}` : null,
    label('timeline', o.timeline) ? `Срок: ${label('timeline', o.timeline)}` : null,
    o.conceptDescription ? `\nКонцепция: ${o.conceptDescription}` : null,
  ].filter((r): r is string => r !== null)

  const tgText = `🍽️ <b>Новая HoReCa-заявка</b>\n\n${rows.join('\n')}`
  const mailText = `Новая HoReCa-заявка\n\n${rows.join('\n')}`

  await Promise.allSettled([
    notifyTelegram(tgText),
    notifyEmail('Новая HoReCa-заявка', mailText),
  ])
}
