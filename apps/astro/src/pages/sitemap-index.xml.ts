export const prerender = true;

import { DOMAIN } from '@/global/constants';
import sanityFetch from '@/utils/sanity.fetch';
import type { APIRoute } from 'astro';

const slugs = [
  ...(await sanityFetch<string[]>({
    query: `
      *[defined(slug.current) && _type != "NotFound_Page"].slug.current
    `,
  })),
  ...(await Promise.all([
    import('./blog/strona/[page].astro')
      .then((res) => res.getStaticPaths())
      .then((paths) => paths.map((path) => `/blog/strona/${path.params.page}`)),
    import('./blog/kategoria/[category].astro')
      .then((res) => res.getStaticPaths())
      .then((paths) => paths.map((path) => `/blog/kategoria/${path.params.category}`)),
    import('./blog/kategoria/[category]/strona/[page].astro')
      .then((res) => res.getStaticPaths())
      .then((paths) => paths.map((path) => `/blog/kategoria/${path.params.category}/strona/${path.params.page}`)),
    import('./realizacje/strona/[page].astro')
      .then((res) => res.getStaticPaths())
      .then((paths) => paths.map((path) => `/realizacje/strona/${path.params.page}`)),
    import('./realizacje/kategoria/[category].astro')
      .then((res) => res.getStaticPaths())
      .then((paths) => paths.map((path) => `/realizacje/kategoria/${path.params.category}`)),
    import('./realizacje/kategoria/[category]/strona/[page].astro')
      .then((res) => res.getStaticPaths())
      .then((paths) => paths.map((path) => `/realizacje/kategoria/${path.params.category}/strona/${path.params.page}`)),
  ]).then((paths) => paths.flat())),
];

const response = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${slugs.map((slug) => `<url><loc>${DOMAIN}${slug}</loc></url>`).join('\n  ')}
</urlset>`;

export const GET: APIRoute = () => {
  return new Response(response, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
