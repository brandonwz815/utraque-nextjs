import { mailOptions, transporter } from '@/app/lib/email';
import ejs from 'ejs';
import fs from 'fs';

const CONTACT_MESSAGE_FIELDS: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  subject: 'Subject',
  message: 'Message',
};

const generateEmailContent = (data: Request) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val}\n\n`),
    ''
  );

  /* const htmlData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `<h1 class='form-heading' align='left'>${CONTACT_MESSAGE_FIELDS[key]}</h1><p class='form-answer' align='left'>${val}<p>`),
    ''
  ); */

  return {
    text: stringData,
    html: '',
  };
};

const template = ejs.compile(fs.readFileSync('/templates/email.html', 'utf8'));
const renderedTemplate = template(generateEmailContent);
console.log(renderedTemplate);

export async function GET(request: Request) {
  return new Response('Hello, Next.js!');
}

export async function POST(request: Request) {
  const data: Request = await request.json();
  console.log(data);

  await transporter.sendMail(
    {
      ...mailOptions,
      ...generateEmailContent(data),
      subject: '',
      /* text: '',
      html: '', */
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
