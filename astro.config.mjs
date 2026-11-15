// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

const siteConfig = JSON.parse(
  readFileSync(new URL('./site.config.json', import.meta.url), 'utf8'),
);

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
