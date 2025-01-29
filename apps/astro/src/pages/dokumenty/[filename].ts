import sanityFetch from '@/src/utils/sanity.fetch';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, redirect }) => {
  const { filename } = params;

  try {
    const document = await sanityFetch<{ url: string }>({
      query: `
        *[extension == "pdf" && originalFilename == $filename]{
            url,
        }[0]
      `,
      params: { filename },
    });

    if (!document?.url) {
      return redirect('/404');
    }

    const response = await fetch(document.url);

    if (!response.ok) {
      return new Response('Error fetching PDF', { status: 500 });
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    return new Response('Error fetching PDF', { status: 500 });
  }
};
