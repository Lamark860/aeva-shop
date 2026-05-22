'use server'

import { redirect } from 'next/navigation'
import { createOrder } from '@/lib/data'

export async function submitOrder(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const productSlug = String(formData.get('product') ?? '').trim()

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) {
    redirect('/order?error=1' + (productSlug ? `&product=${productSlug}` : ''))
  }

  await createOrder({ name, email, phone, message, productSlug: productSlug || undefined })
  redirect('/order?sent=1')
}
