'use server';
import { readFile } from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

export const sendEmail = async (
  name: string,
  email: string,
  message: string,
) => {
  const templatePath = path.join(
    process.cwd(),
    'services',
    'mailTemplate.html',
  );
  let htmlTemplate;
  try {
    htmlTemplate = await readFileAsync(templatePath, 'utf-8');
  } catch (err) {
    console.error('Error reading HTML template:', err);
    throw new Error('Failed to read email template.');
  }

  htmlTemplate = htmlTemplate
    .replace('{name}', name)
    .replace('{message}', message);

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
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptionsToSelf);
  await transporter.sendMail(mailOptionsToUser);
};
