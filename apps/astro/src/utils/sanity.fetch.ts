import { createClient, type QueryParams } from '@sanity/client';
import { isPreviewDeployment } from './is-preview-deployment';

const SANITY_API_TOKEN = import.meta.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN;

if (isPreviewDeployment && !SANITY_API_TOKEN) {
  console.warn('\x1b[33m%s\x1b[0m', 'The `SANITY_API_TOKEN` environment variable is required.');
}

export const client = createClient({
  projectId: '7fuzao96',
  dataset: 'production',
  apiVersion: '2024-12-30',
  useCdn: !isPreviewDeployment,
  perspective: isPreviewDeployment ? 'previewDrafts' : 'published',
  token: SANITY_API_TOKEN,
});

export default async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string;
  params?: QueryParams;
}): Promise<QueryResponse> {
  return await client.fetch<QueryResponse>(query, params);
}
