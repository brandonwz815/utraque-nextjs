import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

const mailOptions: Mail.Options = {
  from: 'your-email@gmail.com',
  to: 'recipient@example.com',
  subject: 'Test email from nodemailer',
  text: 'Hello world!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
