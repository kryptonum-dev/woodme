import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';
import redirects from './redirects';
import { DOMAIN } from './src/global/constants';

export default defineConfig({
  site: DOMAIN,
  integrations: [sitemap(), preact({ compat: true })],
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  vite: {
    ssr: {
      noExternal: ['react-hook-form', 'react-international-phone'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
  prefetch: {
    prefetchAll: true,
  },
  redirects: redirects,
  output: 'server',
  adapter: vercel({
    isr: {
      bypassToken: process.env.VERCEL_DEPLOYMENT_ID,
    },
  }),
});
