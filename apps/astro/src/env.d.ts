/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly SANITY_API_TOKEN: string;
  readonly RESEND_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
