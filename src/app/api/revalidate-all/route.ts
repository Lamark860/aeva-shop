import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

// Все ISR-страницы сайта. Динамические шаблоны (`/product/[slug]` и т.п.) указываются
// с типом 'page' — иначе Next ребилдит только конкретный путь без параметра.
const STATIC_PATHS = ['/', '/catalog', '/about', '/care', '/horeca', '/gallery', '/journal', '/order', '/projects']
const DYNAMIC_TEMPLATES: [string, 'page'][] = [
  ['/product/[slug]', 'page'],
  ['/projects/[slug]', 'page'],
  ['/pages/[slug]', 'page'],
]

export async function POST(req: Request) {
  const payload = await getPayload({ config })
  // auth через payload-token cookie в заголовке
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const revalidated: string[] = []
  for (const p of STATIC_PATHS) {
    revalidatePath(p)
    revalidated.push(p)
  }
  for (const [tpl, type] of DYNAMIC_TEMPLATES) {
    revalidatePath(tpl, type)
    revalidated.push(tpl)
  }

  return NextResponse.json({ ok: true, count: revalidated.length, revalidated })
}
