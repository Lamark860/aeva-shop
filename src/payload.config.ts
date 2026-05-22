import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Gallery } from './collections/Gallery'
import { Orders } from './collections/Orders'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

export default buildConfig({
  serverURL: serverURL || undefined,
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  collections: [Users, Categories, Products, Gallery, Orders],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  // за HTTPS-прокси (Traefik) admin шлёт запросы на свой домен — разрешаем его
  cors: serverURL ? [serverURL] : undefined,
  csrf: serverURL ? [serverURL] : undefined,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || '' } }),
  sharp,
})
