import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Gallery } from './collections/Gallery'
import { Orders } from './collections/Orders'
import { Projects } from './collections/Projects'
import { Subscribers } from './collections/Subscribers'
import { HorecaInquiries } from './collections/HorecaInquiries'
import { Pages } from './collections/Pages'
import { Homepage } from './globals/Homepage'
import { CarePage } from './globals/CarePage'
import { AboutPage } from './globals/AboutPage'
import { HorecaPage } from './globals/HorecaPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

export default buildConfig({
  serverURL: serverURL || undefined,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — Керамика' },
    // admin-overrides импортируются в src/app/(payload)/layout.tsx
    // (в Payload 3.84 нет поля admin.css — глобальные стили грузятся через Next layout)
    components: {
      graphics: {
        Logo: '@/admin/Logo',
        Icon: '@/admin/Icon',
      },
      views: {
        dashboard: { Component: '@/admin/Dashboard' },
        productWizard: {
          Component: '@/admin/ProductWizard',
          path: '/products/wizard',
        },
      },
    },
  },
  collections: [Users, Media, Categories, Products, Gallery, Orders, Projects, Subscribers, HorecaInquiries, Pages],
  globals: [Homepage, CarePage, AboutPage, HorecaPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  // за HTTPS-прокси (Traefik) admin шлёт запросы на свой домен — разрешаем его
  cors: serverURL ? [serverURL] : undefined,
  csrf: serverURL ? [serverURL] : undefined,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || '' } }),
  sharp,
})
