'use server';
import nodemailer from 'nodemailer';

export const sendEmail = async (
  name: string,
  email: string,
  message: string,
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptionsToSelf = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: `You have received a new message from: ${email}\n\n${message}`,
    replyTo: email,
  };

  const mailOptionsToUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for contacting us!',
    text: `Dear ${name},\n\n...`,
  };
  await transporter.sendMail(mailOptionsToSelf);
  await transporter.sendMail(mailOptionsToUser);
};
