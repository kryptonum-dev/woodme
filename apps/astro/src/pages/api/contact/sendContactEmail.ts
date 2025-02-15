export type Props = {
  email: string;
  message: string;
  legal: boolean;
  phone: string;
};

export async function sendContactEmail({ email, message, legal, phone }: Props): Promise<{ success: boolean }> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, message, legal, phone }),
  });

  return await response.json();
}
