'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createSubscriber } from '@/lib/data'
import { rateLimit } from '@/lib/ratelimit'

async function clientIp(): Promise<string> {
  const h = await headers()
  const fwd = h.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return h.get('x-real-ip') || 'unknown'
}

// Подписка на дневник. Идемпотентна (createSubscriber молча выходит, если email уже подписан).
export async function subscribe(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  const honeypot = String(formData.get('website') ?? '').trim()

  if (honeypot) redirect('/journal?sent=1')
  if (!rateLimit(`subscribe:${await clientIp()}`)) redirect('/journal?error=rate')
  if (!/^\S+@\S+\.\S+$/.test(email)) redirect('/journal?error=1')

  await createSubscriber(email, 'journal')
  redirect('/journal?sent=1')
}
