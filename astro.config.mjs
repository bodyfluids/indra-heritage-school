// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://indraheritageschool.com',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
