import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { wedding } from './src/config/wedding.ts';
import { dictionaries } from './src/i18n/dictionaries.ts';
import { pageDescription, pageTitle } from './src/lib/wedding.ts';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * index.html dagi sarlavha va ulashish (Open Graph) ma’lumotlarini
 * src/config/wedding.ts dan yozadi. Shunda ismlar va sana hamma joyda bir xil bo‘ladi.
 */
function weddingMeta(): Plugin {
  return {
    name: 'wedding-meta',
    transformIndexHtml(html) {
      const t = dictionaries[wedding.defaultLanguage] ?? dictionaries.uz;
      return html
        .replace(/__HTML_LANG__/g, t.htmlLang)
        .replace(/__TITLE__/g, escapeHtml(pageTitle(t)))
        .replace(/__DESCRIPTION__/g, escapeHtml(pageDescription(t)))
        .replace(/__SITE_NAME__/g, escapeHtml(t.meta.siteName))
        .replace(/__OG_LOCALE__/g, t.ogLocale);
    },
  };
}

export default defineConfig({
  plugins: [react(), weddingMeta()],
  server: {
    watch: { ignored: ['**/.qa/**'] },
  },
});
