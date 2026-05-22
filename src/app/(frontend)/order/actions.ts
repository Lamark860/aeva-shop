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
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const productSlug = String(formData.get('product') ?? '').trim()
  const honeypot = String(formData.get('website') ?? '').trim() // honeypot: люди не видят это поле

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

  await createOrder({ name, email, phone, message, productSlug: productSlug || undefined })
  redirect('/order?sent=1')
}
