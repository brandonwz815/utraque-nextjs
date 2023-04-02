import { Values } from '@/app/contactus/page';
import { inqueryDefaultMailOptions, sendEmail } from '@/app/lib/email';
import ejs from 'ejs';
import fs from 'fs';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

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
  // const data: Request = await request.json();
  const data: Values = await request.json();
  console.log('typeof data: ', typeof data);
  console.log(data);

  const template = ejs.compile(fs.readFileSync('templates/email.html', 'utf8'));
  const renderedTemplate = template({ to: data.email });
  console.log(renderedTemplate);

  await sendEmail(
    { ...inqueryDefaultMailOptions, to: data.email, html: renderedTemplate },
    (error: Error) => {
      console.error(error);
      return new Response('BAD REQUEST');
    },
    (info: SMTPTransport.SentMessageInfo) => {
      console.log('Email sent: ' + info.response);
      return new Response('OK');
    }
  );

  return new Response(JSON.stringify({ hello: 'world' }));
}
