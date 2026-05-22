import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// SSR — чтобы данные тянулись из Pocketbase на каждый запрос
// (правишь в админке → обновляешь страницу → видишь изменения)
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: { port: 4321, host: true },
});
