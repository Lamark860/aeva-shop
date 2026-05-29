'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createHorecaInquiry } from '@/lib/data'
import { rateLimit } from '@/lib/ratelimit'

async function clientIp(): Promise<string> {
  const h = await headers()
  // за Traefik реальный IP — первый в x-forwarded-for
  const fwd = h.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return h.get('x-real-ip') || 'unknown'
}

// значения select из формы должны совпадать с enum коллекции horeca-inquiries
const PROJECT_TYPES = new Set(['new', 'update', 'expand', 'scouting'])
const BATCH_SIZES = new Set(['lt50', '50_150', '150_300', 'gt300', 'unknown'])
const TIMELINES = new Set(['flexible', 'quarter', 'opening', 'discuss'])

const pick = (v: string, allowed: Set<string>): string | undefined => (allowed.has(v) ? v : undefined)

export async function submitHoreca(formData: FormData) {
  const venueName = String(formData.get('venueName') ?? '').trim()
  const city = String(formData.get('city') ?? '').trim()
  const name = String(formData.get('name') ?? '').trim()
  const position = String(formData.get('position') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const projectType = pick(String(formData.get('projectType') ?? '').trim(), PROJECT_TYPES)
  const batchSize = pick(String(formData.get('batchSize') ?? '').trim(), BATCH_SIZES)
  const timeline = pick(String(formData.get('timeline') ?? '').trim(), TIMELINES)
  const conceptDescription = String(formData.get('conceptDescription') ?? '').trim()
  const honeypot = String(formData.get('website') ?? '').trim() // honeypot: люди не видят это поле

  // Honeypot заполнен → бот. Делаем вид, что всё ок, заявку не создаём.
  if (honeypot) redirect('/horeca?sent=1')

  // Rate-limit по IP — защита от флуда формы.
  if (!rateLimit(`horeca:${await clientIp()}`)) {
    redirect('/horeca?error=rate')
  }

  // Обязательны: заведение, контактное лицо, корректный email.
  if (!venueName || !name || !/^\S+@\S+\.\S+$/.test(email)) {
    redirect('/horeca?error=1')
  }

  await createHorecaInquiry({
    venueName, city: city || undefined, name, email,
    phone: phone || undefined, position: position || undefined,
    projectType, batchSize, timeline,
    conceptDescription: conceptDescription || undefined,
  })
  redirect('/horeca?sent=1')
}
