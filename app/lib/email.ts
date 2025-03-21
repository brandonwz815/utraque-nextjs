import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass,
  },
});

export default async function sendEmail(
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
