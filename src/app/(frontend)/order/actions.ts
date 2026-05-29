'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createOrder } from '@/lib/data'
import { rateLimit } from '@/lib/ratelimit'

async function clientIp(): Promise<string> {
  const h = await headers()
  // за Traefik реальный IP — первый в x-forwarded-for
  const fwd = h.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return h.get('x-real-ip') || 'unknown'
}

export async function submitOrder(formData: FormData) {
  const get = (k: string) => String(formData.get(k) ?? '').trim()

  const name = get('name')
  const email = get('email')
  const phone = get('phone')
  const message = get('message')
  const productSlug = get('product')
  const type = get('type')
  const purpose = get('purpose')
  const deadline = get('deadline')
  const budget = get('budget')
  const referenceLink = get('referenceLink')
  const honeypot = get('website') // honeypot: люди не видят это поле

  const withProduct = productSlug ? `&product=${productSlug}` : ''

  // Honeypot заполнен → бот. Делаем вид, что всё ок (не подсказываем боту), заявку не создаём.
  if (honeypot) redirect('/order?sent=1')

  // Rate-limit по IP — защита от флуда формы.
  if (!rateLimit(`order:${await clientIp()}`)) {
    redirect('/order?error=rate' + withProduct)
  }

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) {
    redirect('/order?error=1' + withProduct)
  }

  await createOrder({
    name, email, phone, message,
    productSlug: productSlug || undefined,
    type, purpose, deadline, budget, referenceLink,
  })
  redirect('/order?sent=1')
}
