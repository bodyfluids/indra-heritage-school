import type { APIRoute } from 'astro';
import { site } from '../../site.config';

const routes = [
  '/',
  '/about',
  '/admissions',
  '/contact',
  '/gallery',
  '/mandatory-disclosures',
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (path) => `  <url>
    <loc>${site.url}${path === '/' ? '/' : path}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
