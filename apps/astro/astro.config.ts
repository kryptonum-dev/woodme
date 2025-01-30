import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';
import redirects from './redirects';
import { DOMAIN } from './src/global/constants';
import { isPreviewDeployment } from './src/utils/is-preview-deployment';

export default defineConfig({
  site: DOMAIN,
  integrations: [preact({ compat: true })],
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
      noExternal: ['react-hook-form', 'react-international-phone', '@mux/mux-player', 'embla-carousel-react'],
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
  ...(!isPreviewDeployment && { adapter: vercel({ isr: { exclude: ['/api/contact'] } }) }),
});
