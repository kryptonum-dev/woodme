/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly SANITY_API_TOKEN: string;
  readonly SANITY_PROJECT_ID: string;
  readonly RESEND_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const fathom: {
  trackEvent: (
    name: string,
    data?: {
      _site_id?: string;
      _value?: number;
    }
  ) => void;
};
