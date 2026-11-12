import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { defaultLocale, locales } from './src/i18n/config';

// Yayın adresi ve alt yol ortam değişkeninden gelir (GitHub Pages bunları otomatik verir).
const SITE = process.env.SITE_URL || 'https://example.com';
const BASE = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  // Bağlantının üzerine gelince sayfa önceden yüklenir; tıklama anında açılır.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(
          Object.entries(locales).map(([code, meta]) => [code, meta.hreflang]),
        ),
      },
    }),
  ],
});
