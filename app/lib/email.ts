import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions: Mail.Options = {
  from: 'your-email@gmail.com',
  to: 'brandonwz815@gmail.com',
  subject: 'Test email from nodemailer for Utraque',
  text: 'Hello world!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
