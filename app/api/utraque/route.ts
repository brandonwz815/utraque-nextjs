import ejs from 'ejs';
import fs from 'fs';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Values } from '@/app/contactus/page';
import sendEmail from '@/app/lib/email';

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
  const data: Values = await request.json();
  console.log(data);

  await dispatchEmail(data);
  return new Response(JSON.stringify({ hello: 'world' }));
}

async function dispatchEmail(data: Values): Promise<void> {
  const template = ejs.compile(fs.readFileSync('templates/inqueryReplyEmail.html', 'utf8'));
  const renderedTemplate = template({ to: data.email });
  // console.log(renderedTemplate);

  await sendEmail(
    {
      from: 'help@utraque.com',
      to: data.email,
      subject: 'Thank you for your inquery to Utraque',
      html: renderedTemplate,
    },
    (error: Error) => {
      console.error(error);
      return new Response('BAD REQUEST');
    },
    (info: SMTPTransport.SentMessageInfo) => {
      console.log('Email sent: ' + info.response);
      return new Response('OK');
    }
  );
}
