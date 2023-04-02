import { Values } from '@/app/contactus/page';
import { mailOptions, transporter } from '@/app/lib/email';
import ejs from 'ejs';
import fs from 'fs';

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

  await transporter.sendMail(
    {
      ...mailOptions,
      to: data.email,
      // text: '',
      html: renderedTemplate,
    },
    (error, info) => {
      if (error) {
        console.error(error);
        return new Response('BAD REQUEST');
      } else {
        console.log('Email sent: ' + info.response);
        return new Response('OK');
      }
    }
  );

  return new Response(JSON.stringify({ hello: 'world' }));
}
