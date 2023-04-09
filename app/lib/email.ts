import ejs from 'ejs';
import fs from 'fs'
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { InqueryValues } from '../model/inqueryModel';

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass,
  },
});

async function sendEmail(
  allMailOptions: Mail.Options,
  handleError: (err: Error) => void,
  handleSuccess: (info: SMTPTransport.SentMessageInfo) => void
) {
  transporter.sendMail(allMailOptions, (error, info) => {
    if (error) {
      handleError(error);
    } else {
      handleSuccess(info);
    }
  });
}

export async function replyToInqueryEmail(data: InqueryValues): Promise<void> {
  const template = ejs.compile(
    fs.readFileSync('templates/inqueryReplyEmail.html', 'utf8')
  );
  console.log(data);
  const renderedTemplate = template(data);
  // console.log(renderedTemplate)

  await sendEmail(
    {
      from: 'help@utraque.com',
      to: data.email,
      subject: 'Thank you for your inquery to Utraque',
      html: renderedTemplate,
    },
    (error: Error) => {
      console.error(error);
    },
    (info: SMTPTransport.SentMessageInfo) => {
      console.log('Email sent: ' + info.response);
    }
  );
}
