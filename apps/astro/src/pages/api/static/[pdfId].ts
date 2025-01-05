import type { APIRoute } from 'astro';

export async function GET({ params, request }: { params: { pdfId: string }; request: Request }) {
  const { pdfId } = params;
  console.log(pdfId);
  const sanityCdnUrl = `https://cdn.sanity.io/files/7fuzao96/production/${pdfId}.pdf`;

  try {
    const response = await fetch(sanityCdnUrl);

    console.log(response);

    if (!response.ok) {
      return new Response('Error fetching PDF', { status: 500 });
    }

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');

    return new Response(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response('Error fetching PDF', { status: 500 });
  }
}
