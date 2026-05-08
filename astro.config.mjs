import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sentinelman.com',
  build: {
    assets: 'assets'
  },
  integrations: [sitemap()],
});
