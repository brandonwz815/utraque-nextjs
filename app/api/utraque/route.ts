import { replyToInqueryEmail } from '@/app/lib/email';
import { InqueryValues } from '@/app/model/inqueryModel';

const CONTACT_MESSAGE_FIELDS: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  subject: 'Subject',
  message: 'Message',
};

export async function GET(request: Request) {
  return new Response('Hello, Next.js!');
}

export async function POST(request: Request) {
  const data: InqueryValues = await request.json();

  await replyToInqueryEmail(data);
  return new Response(JSON.stringify({ hello: 'world' }));
}
